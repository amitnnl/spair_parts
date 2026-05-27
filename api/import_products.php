<?php
require_once '../config/database.php';

header('Content-Type: application/json');

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    if (isset($_FILES['csv_file']) && $_FILES['csv_file']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['csv_file']['tmp_name'];
        $handle = fopen($file, "r");
        
        // Skip header
        fgetcsv($handle);
        
        $imported = 0;
        $errors = [];
        
        $db->beginTransaction();
        try {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                // Expected CSV format: Brand, Machine Name, Part Name, Model, Cost, Stock
                $brand_name = trim($data[0]);
                $machine_name = trim($data[1]);
                $part_name_str = trim($data[2]);
                $model_name = trim($data[3]);
                $cost = (float)$data[4];
                $stock = (int)$data[5];

                // 1. Get or Create Brand
                $stmt = $db->prepare("SELECT id FROM brands WHERE name = ?");
                $stmt->execute([$brand_name]);
                $brand = $stmt->fetch();
                if (!$brand) {
                    $db->prepare("INSERT INTO brands (name) VALUES (?)")->execute([$brand_name]);
                    $brand_id = $db->lastInsertId();
                } else {
                    $brand_id = $brand['id'];
                }

                // 2. Get or Create Machine Name
                $stmt = $db->prepare("SELECT id FROM machine_names WHERE name = ?");
                $stmt->execute([$machine_name]);
                $mname = $stmt->fetch();
                if (!$mname) {
                    $db->prepare("INSERT INTO machine_names (name) VALUES (?)")->execute([$machine_name]);
                    $machine_name_id = $db->lastInsertId();
                } else {
                    $machine_name_id = $mname['id'];
                }

                // 3. Get or Create Part Name
                $stmt = $db->prepare("SELECT id FROM spare_part_names WHERE name = ?");
                $stmt->execute([$part_name_str]);
                $pname = $stmt->fetch();
                if (!$pname) {
                    $db->prepare("INSERT INTO spare_part_names (name) VALUES (?)")->execute([$part_name_str]);
                    $part_name_id = $db->lastInsertId();
                } else {
                    $part_name_id = $pname['id'];
                }

                // 4. Get or Create Model
                $stmt = $db->prepare("SELECT id FROM machine_models WHERE brand_id = ? AND machine_name_id = ? AND name = ?");
                $stmt->execute([$brand_id, $machine_name_id, $model_name]);
                $model = $stmt->fetch();
                if (!$model) {
                    $db->prepare("INSERT INTO machine_models (brand_id, machine_name_id, name) VALUES (?, ?, ?)")->execute([$brand_id, $machine_name_id, $model_name]);
                    $model_id = $db->lastInsertId();
                } else {
                    $model_id = $model['id'];
                }

                // 5. Insert Spare Part
                $stmt = $db->prepare("INSERT INTO spare_parts (brand_id, machine_name_id, part_name_id, model_id, cost, stock_quantity) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->execute([$brand_id, $machine_name_id, $part_name_id, $model_id, $cost, $stock]);
                
                $imported++;
            }
            $db->commit();
            echo json_encode(['success' => true, 'count' => $imported]);
        } catch (Exception $e) {
            $db->rollBack();
            echo json_encode(['error' => $e->getMessage()]);
        }
        fclose($handle);
    } else {
        echo json_encode(['error' => 'No file uploaded']);
    }
}
