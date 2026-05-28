<?php
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Unauthorized.']);
    exit;
}

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// Migration: Ensure tracking columns exist
try {
    $db->exec("ALTER TABLE invoices ADD COLUMN status VARCHAR(50) DEFAULT 'processing'");
    $db->exec("ALTER TABLE invoices ADD COLUMN tracking_number VARCHAR(255) DEFAULT NULL");
    $db->exec("ALTER TABLE invoices ADD COLUMN dispatched_at DATETIME DEFAULT NULL");
    $db->exec("ALTER TABLE invoices ADD COLUMN delivered_at DATETIME DEFAULT NULL");
} catch (Exception $e) { /* Columns likely exist */ }

if ($method === 'POST') {
    if (!isset($_SESSION['user_role']) || strtolower($_SESSION['user_role']) !== 'admin') {
        echo json_encode(['error' => 'Unauthorized. Admin access required to generate invoices.']);
        exit;
    }
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
        
        $stmtInv = $db->prepare("INSERT INTO invoices (quotation_id, invoice_number, total_amount, status) VALUES (?, ?, ?, 'processing')");
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
} elseif ($method === 'PUT') {
    // Update order status (Dispatch/Delivery)
    if ($_SESSION['user_role'] !== 'admin') {
        echo json_encode(['error' => 'Unauthorized.']);
        exit;
    }
    $data = json_decode(file_get_contents('php://input'), true);
    $invoice_id = $data['invoice_id'];
    $status = $data['status']; // 'dispatched' or 'delivered'
    $tracking = $data['tracking_number'] ?? null;

    try {
        if ($status === 'dispatched') {
            $stmt = $db->prepare("UPDATE invoices SET status = ?, tracking_number = ?, dispatched_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute(['dispatched', $tracking, $invoice_id]);
        } elseif ($status === 'delivered') {
            $stmt = $db->prepare("UPDATE invoices SET status = ?, delivered_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute(['delivered', $invoice_id]);
        }
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} elseif ($method === 'GET') {
    if (isset($_GET['id'])) {
        // Fetch detailed invoice with items
        $id = $_GET['id'];
        $isAdmin = isset($_SESSION['user_role']) && strtolower($_SESSION['user_role']) === 'admin';
        
        $sql = "
            SELECT i.*, u.name as user_name, u.email as user_email, q.id as q_id, q.created_at as q_date
            FROM invoices i 
            JOIN quotations q ON i.quotation_id = q.id 
            JOIN users u ON q.user_id = u.id 
            WHERE i.id = ?
        ";
        
        if (!$isAdmin) {
            $sql .= " AND u.id = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$id, $_SESSION['user_id']]);
        } else {
            $stmt = $db->prepare($sql);
            $stmt->execute([$id]);
        }
        
        $invoice = $stmt->fetch();
        
        if (!$invoice) {
            echo json_encode(['error' => 'Invoice not found or unauthorized.']);
            exit;
        }
        
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
        if (isset($_SESSION['user_role']) && strtolower($_SESSION['user_role']) === 'admin') {
            $stmt = $db->query("SELECT i.*, u.name as user_name FROM invoices i JOIN quotations q ON i.quotation_id = q.id JOIN users u ON q.user_id = u.id ORDER BY i.created_at DESC");
        } else {
            $stmt = $db->prepare("SELECT i.* FROM invoices i JOIN quotations q ON i.quotation_id = q.id WHERE q.user_id = ? ORDER BY i.created_at DESC");
            $stmt->execute([$_SESSION['user_id']]);
        }
        echo json_encode($stmt->fetchAll());
    }
}
