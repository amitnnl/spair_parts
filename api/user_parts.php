<?php
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Unauthorized.']);
    exit;
}

$db = getDB();
$user_id = $_SESSION['user_id'];
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        $stmt = $db->prepare("
            SELECT upl.id as saved_id, sp.id, spn.name as part_name, b.name as brand, mm.name as machine_model, sp.stock_quantity 
            FROM user_parts_list upl
            JOIN spare_parts sp ON upl.part_id = sp.id
            LEFT JOIN spare_part_names spn ON sp.part_name_id = spn.id
            LEFT JOIN brands b ON sp.brand_id = b.id
            LEFT JOIN machine_models mm ON sp.model_id = mm.id
            WHERE upl.user_id = ?
            ORDER BY upl.created_at DESC
        ");
        $stmt->execute([$user_id]);
        $parts = $stmt->fetchAll();
        
        echo json_encode(['success' => true, 'parts' => $parts]);
    } catch (Exception $e) {
        echo json_encode(['error' => 'Failed to fetch parts list: ' . $e->getMessage()]);
    }
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $part_id = $data['part_id'] ?? null;
    
    if (!$part_id) {
        echo json_encode(['error' => 'Part ID is required.']);
        exit;
    }
    
    try {
        $stmt = $db->prepare("INSERT IGNORE INTO user_parts_list (user_id, part_id) VALUES (?, ?)");
        $stmt->execute([$user_id, $part_id]);
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['error' => 'Failed to add part: ' . $e->getMessage()]);
    }
} elseif ($method === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $part_id = $data['part_id'] ?? null;
    
    if (!$part_id) {
        echo json_encode(['error' => 'Part ID is required.']);
        exit;
    }
    
    try {
        $stmt = $db->prepare("DELETE FROM user_parts_list WHERE user_id = ? AND part_id = ?");
        $stmt->execute([$user_id, $part_id]);
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['error' => 'Failed to remove part: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid request method.']);
}
