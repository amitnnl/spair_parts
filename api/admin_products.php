<?php
require_once '../config/database.php';

header('Content-Type: application/json');

// Check if admin
if (!isset($_SESSION['user_role']) || strtolower($_SESSION['user_role']) !== 'admin') {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = $_POST;
    $action = $data['action'] ?? 'add_product';

    if ($action === 'add_product') {
        $brand_id = !empty($data['brand_id']) ? $data['brand_id'] : null;
        $machine_name_id = !empty($data['machine_name_id']) ? $data['machine_name_id'] : null;
        $part_name_id = !empty($data['part_name_id']) ? $data['part_name_id'] : null;
        $model_id = !empty($data['model_id']) ? $data['model_id'] : null;

        if (!$brand_id || !$machine_name_id || !$part_name_id || !$model_id) {
            echo json_encode(['error' => 'Please select Brand, Machine, Part Name, and Model.']);
            exit;
        }

        $cost = $data['cost'] ?? 0;
        $stock_quantity = $data['stock_quantity'] ?? 0;
        $note = $data['note'] ?? '';
        
        // Handle photo upload
        $photo = '';
        if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = '../uploads/';
            if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
            
            $ext = pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);
            $filename = uniqid() . '.' . $ext;
            if (move_uploaded_file($_FILES['photo']['tmp_name'], $uploadDir . $filename)) {
                $photo = 'uploads/' . $filename;
            }
        } else if (isset($data['photo_url'])) {
            $photo = $data['photo_url'];
        }

        try {
            $stmt = $db->prepare("INSERT INTO spare_parts (brand_id, machine_name_id, part_name_id, model_id, photo, cost, stock_quantity, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$brand_id, $machine_name_id, $part_name_id, $model_id, $photo, $cost, $stock_quantity, $note]);
            echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
        } catch (Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    } elseif ($action === 'add_lookup') {
        $type = $data['type']; // 'brand', 'machine_name', 'part_name', 'model'
        $name = trim($data['name']);
        $brand_id = $data['brand_id'] ?? null;
        $machine_name_id = $data['machine_name_id'] ?? null;

        try {
            if ($type === 'brand') {
                $stmt = $db->prepare("SELECT id FROM brands WHERE name = ?");
                $stmt->execute([$name]);
                $id = $stmt->fetchColumn();
                if (!$id) {
                    $db->prepare("INSERT INTO brands (name) VALUES (?)")->execute([$name]);
                    $id = $db->lastInsertId();
                }
            } elseif ($type === 'machine_name') {
                $stmt = $db->prepare("SELECT id FROM machine_names WHERE name = ?");
                $stmt->execute([$name]);
                $id = $stmt->fetchColumn();
                if (!$id) {
                    $db->prepare("INSERT INTO machine_names (name) VALUES (?)")->execute([$name]);
                    $id = $db->lastInsertId();
                }
            } elseif ($type === 'part_name') {
                $stmt = $db->prepare("SELECT id FROM spare_part_names WHERE name = ?");
                $stmt->execute([$name]);
                $id = $stmt->fetchColumn();
                if (!$id) {
                    $db->prepare("INSERT INTO spare_part_names (name) VALUES (?)")->execute([$name]);
                    $id = $db->lastInsertId();
                }
            } elseif ($type === 'model') {
                $stmt = $db->prepare("SELECT id FROM machine_models WHERE brand_id = ? AND machine_name_id = ? AND name = ?");
                $stmt->execute([$brand_id, $machine_name_id, $name]);
                $id = $stmt->fetchColumn();
                if (!$id) {
                    $db->prepare("INSERT INTO machine_models (brand_id, machine_name_id, name) VALUES (?, ?, ?)")->execute([$brand_id, $machine_name_id, $name]);
                    $id = $db->lastInsertId();
                }
            }
            echo json_encode(['success' => true, 'id' => $id]);
        } catch (Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    } elseif ($action === 'save_fitment') {
        $part_id = $data['part_id'];
        $model_id = $data['model_id'];

        try {
            // Check if fitment already exists
            $stmt = $db->prepare("SELECT id FROM part_fitments WHERE part_id = ? AND machine_model_id = ?");
            $stmt->execute([$part_id, $model_id]);
            if (!$stmt->fetch()) {
                $stmt = $db->prepare("INSERT INTO part_fitments (part_id, machine_model_id) VALUES (?, ?)");
                $stmt->execute([$part_id, $model_id]);
            }
            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
} elseif ($method === 'GET') {
    $action = $_GET['action'] ?? 'lookups';

    if ($action === 'lookups') {
        $brands = $db->query("SELECT * FROM brands ORDER BY name")->fetchAll();
        $machine_names = $db->query("SELECT * FROM machine_names ORDER BY name")->fetchAll();
        $part_names = $db->query("SELECT * FROM spare_part_names ORDER BY name")->fetchAll();
        $models = $db->query("SELECT * FROM machine_models ORDER BY name")->fetchAll();
        
        echo json_encode([
            'brands' => $brands,
            'machine_names' => $machine_names,
            'part_names' => $part_names,
            'models' => $models
        ]);
    } elseif ($action === 'get_fitments') {
        $part_id = $_GET['part_id'];
        $stmt = $db->prepare("SELECT f.*, m.name as model_name, b.name as brand_name, n.name as machine_name 
                              FROM part_fitments f 
                              JOIN machine_models m ON f.machine_model_id = m.id
                              JOIN brands b ON m.brand_id = b.id
                              JOIN machine_names n ON m.machine_name_id = n.id
                              WHERE f.part_id = ?");
        $stmt->execute([$part_id]);
        echo json_encode(['fitments' => $stmt->fetchAll()]);
    }
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $brand_id = $data['brand_id'];
    $machine_name_id = $data['machine_name_id'];
    $part_name_id = $data['part_name_id'];
    $model_id = $data['model_id'];
    $cost = $data['cost'] ?? 0;
    $note = $data['note'] ?? '';
    
    try {
        $stmt = $db->prepare("UPDATE spare_parts SET brand_id = ?, machine_name_id = ?, part_name_id = ?, model_id = ?, cost = ?, note = ? WHERE id = ?");
        $stmt->execute([$brand_id, $machine_name_id, $part_name_id, $model_id, $cost, $note, $id]);
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} elseif ($method === 'DELETE') {
    $action = $_GET['action'] ?? 'delete_product';
    $id = $_GET['id'];

    try {
        if ($action === 'delete_product') {
            // Get photo path before deletion
            $stmt = $db->prepare("SELECT photo FROM spare_parts WHERE id = ?");
            $stmt->execute([$id]);
            $photo = $stmt->fetchColumn();

            // Delete from DB
            $stmt = $db->prepare("DELETE FROM spare_parts WHERE id = ?");
            $stmt->execute([$id]);

            // Remove file from server if it exists and is local
            if ($photo && !filter_var($photo, FILTER_VALIDATE_URL)) {
                $filePath = '../' . $photo;
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
            }
        } elseif ($action === 'delete_fitment') {
            $stmt = $db->prepare("DELETE FROM part_fitments WHERE id = ?");
            $stmt->execute([$id]);
        }
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
