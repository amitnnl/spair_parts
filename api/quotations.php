<?php
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$user_id = $_SESSION['user_id'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $items = $data['items'] ?? [];

    if (empty($items)) {
        echo json_encode(['error' => 'No items in quotation']);
        exit;
    }

    try {
        $db->beginTransaction();

        $stmt = $db->prepare("INSERT INTO quotations (user_id, status) VALUES (?, 'pending')");
        $stmt->execute([$user_id]);
        $quotation_id = $db->lastInsertId();

        $stmtItem = $db->prepare("INSERT INTO quotation_items (quotation_id, part_id, quantity) VALUES (?, ?, ?)");
        foreach ($items as $item) {
            $stmtItem->execute([$quotation_id, $item['part_id'], $item['quantity']]);
        }

        $db->commit();
        echo json_encode(['success' => true, 'quotation_id' => $quotation_id]);
    } catch (Exception $e) {
        $db->rollBack();
        echo json_encode(['error' => $e->getMessage()]);
    }
} elseif ($method === 'GET') {
    // Fetch user's quotations
    $stmt = $db->prepare("SELECT * FROM quotations WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$user_id]);
    echo json_encode($stmt->fetchAll());
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $quotation_id = $data['quotation_id'];

    try {
        $stmt = $db->prepare("UPDATE quotations SET status = 'approved' WHERE id = ? AND user_id = ? AND status = 'priced'");
        $stmt->execute([$quotation_id, $user_id]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Quotation not found or not in priced status']);
        }
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
