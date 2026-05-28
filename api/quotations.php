<?php
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Unauthorized.']);
    exit;
}

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$user_id = $_SESSION['user_id'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $items = $data['items'] ?? [];

    if (empty($items)) {
        echo json_encode(['error' => 'No items in quotation.']);
        exit;
    }

    // Check if user has completed their profile
    $stmtUser = $db->prepare("SELECT email, phone, address, company_name, gst_number FROM users WHERE id = ?");
    $stmtUser->execute([$user_id]);
    $userProfile = $stmtUser->fetch();
    
    if (empty($userProfile['phone']) || empty($userProfile['address']) || empty($userProfile['email']) || empty($userProfile['company_name']) || empty($userProfile['gst_number'])) {
        echo json_encode(['error' => 'Please complete your profile (Company Name, GST/Tax ID, Contact No, Address) before placing an order.']);
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
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        // Fetch specific quotation
        $stmt = $db->prepare("SELECT * FROM quotations WHERE id = ? AND user_id = ?");
        $stmt->execute([$id, $user_id]);
        $quotation = $stmt->fetch();
        
        if (!$quotation) {
            echo json_encode(['error' => 'Quotation not found.']);
            exit;
        }
        
        // Fetch items
        $stmt = $db->prepare("SELECT qi.*, spn.name as part_name, b.name as brand, mn.name as machine_model 
                            FROM quotation_items qi 
                            JOIN spare_parts sp ON qi.part_id = sp.id 
                            LEFT JOIN brands b ON sp.brand_id = b.id
                            LEFT JOIN machine_names mn ON sp.machine_name_id = mn.id
                            LEFT JOIN spare_part_names spn ON sp.part_name_id = spn.id
                            WHERE qi.quotation_id = ?");
        $stmt->execute([$id]);
        $quotation['items'] = $stmt->fetchAll();
        
        echo json_encode($quotation);
    } else {
        // Fetch user's quotations list with item count
        $stmt = $db->prepare("SELECT q.*, (SELECT COUNT(*) FROM quotation_items WHERE quotation_id = q.id) as item_count 
                            FROM quotations q 
                            WHERE q.user_id = ? 
                            ORDER BY q.created_at DESC");
        $stmt->execute([$user_id]);
        echo json_encode($stmt->fetchAll());
    }
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $quotation_id = $data['quotation_id'];

    try {
        $stmt = $db->prepare("UPDATE quotations SET status = 'approved' WHERE id = ? AND user_id = ? AND status = 'priced'");
        $stmt->execute([$quotation_id, $user_id]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Quotation not found or not in priced status.']);
        }
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} elseif ($method === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];

    try {
        // Only allow deleting pending quotations
        $stmt = $db->prepare("DELETE FROM quotations WHERE id = ? AND user_id = ? AND status = 'pending'");
        $stmt->execute([$id, $user_id]);
        
        if ($stmt->rowCount() > 0) {
            // Also delete items (if not using ON DELETE CASCADE)
            $db->prepare("DELETE FROM quotation_items WHERE quotation_id = ?")->execute([$id]);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Cannot delete quotation (must be pending)']);
        }
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
