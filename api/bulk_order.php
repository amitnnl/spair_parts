<?php
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Unauthorized.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['order_csv']) || $_FILES['order_csv']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['error' => 'No file uploaded or upload error.']);
        exit;
    }

    $file = $_FILES['order_csv']['tmp_name'];
    $handle = fopen($file, "r");
    if (!$handle) {
        echo json_encode(['error' => 'Failed to read CSV file.']);
        exit;
    }

    $cart = [];
    $count = 0;
    $db = getDB();

    // Skip header
    fgetcsv($handle);

    while (($row = fgetcsv($handle)) !== false) {
        if (count($row) < 2) continue;
        
        $sku = trim($row[0]);
        $qty = (int)trim($row[1]);
        
        if (empty($sku) || $qty <= 0) continue;

        // Search for the part by model name, part name, or note(SKU)
        $stmt = $db->prepare("
            SELECT sp.id, sp.cost, spn.name as part_name, b.name as brand_name, mm.name as machine_model 
            FROM spare_parts sp
            LEFT JOIN spare_part_names spn ON sp.part_name_id = spn.id
            LEFT JOIN brands b ON sp.brand_id = b.id
            LEFT JOIN machine_models mm ON sp.model_id = mm.id
            WHERE sp.note LIKE ? OR spn.name LIKE ? OR mm.name LIKE ?
            LIMIT 1
        ");
        $likeSku = "%$sku%";
        $stmt->execute([$likeSku, $likeSku, $likeSku]);
        $part = $stmt->fetch();

        if ($part) {
            $cart[] = [
                'id' => $part['id'],
                'part_name' => $part['part_name'],
                'brand' => $part['brand_name'],
                'machine_model' => $part['machine_model'],
                'cost' => $part['cost'],
                'quantity' => $qty
            ];
            $count++;
        }
    }
    fclose($handle);

    echo json_encode(['success' => true, 'count' => $count, 'cart' => $cart]);
} else {
    echo json_encode(['error' => 'Invalid request method.']);
}
