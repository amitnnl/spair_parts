<?php
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Generate invoice from approved quotation
    $data = json_decode(file_get_contents('php://input'), true);
    $quotation_id = $data['quotation_id'];

    try {
        $db->beginTransaction();

        // Verify quotation is approved
        $stmt = $db->prepare("SELECT * FROM quotations WHERE id = ? AND status = 'approved'");
        $stmt->execute([$quotation_id]);
        $quotation = $stmt->fetch();

        if (!$quotation) {
            throw new Exception("Quotation not found or not approved");
        }

        $invoice_no = 'INV-' . date('Ymd') . '-' . sprintf('%04d', $quotation_id);
        
        $stmtInv = $db->prepare("INSERT INTO invoices (quotation_id, invoice_number, total_amount) VALUES (?, ?, ?)");
        $stmtInv->execute([$quotation_id, $invoice_no, $quotation['total_amount']]);

        // Update quotation status to 'completed'
        $stmtUpdate = $db->prepare("UPDATE quotations SET status = 'completed' WHERE id = ?");
        $stmtUpdate->execute([$quotation_id]);

        $db->commit();
        echo json_encode(['success' => true, 'invoice_number' => $invoice_no]);
    } catch (Exception $e) {
        $db->rollBack();
        echo json_encode(['error' => $e->getMessage()]);
    }
} elseif ($method === 'GET') {
    if (isset($_GET['id'])) {
        // Fetch detailed invoice with items
        $id = $_GET['id'];
        $stmt = $db->prepare("
            SELECT i.*, u.name as user_name, u.email as user_email, q.id as q_id, q.created_at as q_date
            FROM invoices i 
            JOIN quotations q ON i.quotation_id = q.id 
            JOIN users u ON q.user_id = u.id 
            WHERE i.id = ?
        ");
        $stmt->execute([$id]);
        $invoice = $stmt->fetch();
        
        $stmtItems = $db->prepare("
            SELECT qi.*, spn.name as part_name, b.name as brand, mm.name as machine_model 
            FROM quotation_items qi
            JOIN spare_parts sp ON qi.part_id = sp.id
            JOIN brands b ON sp.brand_id = b.id
            JOIN spare_part_names spn ON sp.part_name_id = spn.id
            JOIN machine_models mm ON sp.model_id = mm.id
            WHERE qi.quotation_id = ?
        ");
        $stmtItems->execute([$invoice['quotation_id']]);
        $invoice['items'] = $stmtItems->fetchAll();
        
        echo json_encode($invoice);
    } else {
        // Fetch invoices list (admin sees all, user sees own)
        if ($_SESSION['user_role'] === 'admin') {
            $stmt = $db->query("SELECT i.*, u.name as user_name FROM invoices i JOIN quotations q ON i.quotation_id = q.id JOIN users u ON q.user_id = u.id ORDER BY i.created_at DESC");
        } else {
            $stmt = $db->prepare("SELECT i.* FROM invoices i JOIN quotations q ON i.quotation_id = q.id WHERE q.user_id = ? ORDER BY i.created_at DESC");
            $stmt->execute([$_SESSION['user_id']]);
        }
        echo json_encode($stmt->fetchAll());
    }
}
