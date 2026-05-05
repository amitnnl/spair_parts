<?php
require_once '../config/database.php';

header('Content-Type: application/json');

// Check if admin
$isAdmin = isset($_SESSION['user_role']) && strtolower($_SESSION['user_role']) === 'admin';

if (!$isAdmin) {
    http_response_code(403);
    echo json_encode(['error' => 'Administrative privileges required']);
    exit;
}

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        // Fetch specific quotation items
        $stmt = $db->prepare("
            SELECT qi.*, spn.name as part_name, b.name as brand, mn.name as machine_name, mm.name as machine_model 
            FROM quotation_items qi
            JOIN spare_parts sp ON qi.part_id = sp.id
            LEFT JOIN brands b ON sp.brand_id = b.id
            LEFT JOIN spare_part_names spn ON sp.part_name_id = spn.id
            LEFT JOIN machine_names mn ON sp.machine_name_id = mn.id
            LEFT JOIN machine_models mm ON sp.model_id = mm.id
            WHERE qi.quotation_id = ?
        ");
        $stmt->execute([$id]);
        $items = $stmt->fetchAll();
        
        // Fetch user discount tier
        $uStmt = $db->prepare("SELECT u.discount_tier FROM quotations q JOIN users u ON q.user_id = u.id WHERE q.id = ?");
        $uStmt->execute([$id]);
        $discount_tier = $uStmt->fetchColumn();
        
        echo json_encode(['items' => $items, 'discount_tier' => $discount_tier]);
    } else {
        // List all quotations with user info
        $stmt = $db->query("
            SELECT q.*, u.name as user_name, u.email as user_email, u.discount_tier 
            FROM quotations q 
            LEFT JOIN users u ON q.user_id = u.id 
            ORDER BY q.created_at DESC
        ");
        echo json_encode($stmt->fetchAll());
    }
} elseif ($method === 'PUT') {
    // Update prices for a quotation
    $data = json_decode(file_get_contents('php://input'), true);
    $quotation_id = $data['quotation_id'];
    $items = $data['items']; // Array of {item_id, unit_price}

    try {
        $db->beginTransaction();

        $stmt = $db->prepare("UPDATE quotation_items SET unit_price = ? WHERE id = ? AND quotation_id = ?");
        $total = 0;
        foreach ($items as $item) {
            $stmt->execute([$item['unit_price'], $item['item_id'], $quotation_id]);
            
            // Get quantity to calculate total
            $qStmt = $db->prepare("SELECT quantity FROM quotation_items WHERE id = ?");
            $qStmt->execute([$item['item_id']]);
            $qty = $qStmt->fetchColumn();
            $total += ($qty * $item['unit_price']);
        }

        // Update quotation status to 'priced' and set total
        $stmtStatus = $db->prepare("UPDATE quotations SET status = 'priced', total_amount = ? WHERE id = ?");
        $stmtStatus->execute([$total, $quotation_id]);

        $db->commit();
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        $db->rollBack();
        echo json_encode(['error' => $e->getMessage()]);
    }
}
