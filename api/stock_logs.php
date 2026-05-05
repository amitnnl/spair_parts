<?php
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$isAdmin = isset($_SESSION['user_role']) && strtolower($_SESSION['user_role']) === 'admin';
$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// Migration: ensure stock_logs table and spare_parts.stock_quantity column exist
try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS stock_logs (
            id          INT AUTO_INCREMENT PRIMARY KEY,
            part_id     INT NOT NULL,
            type        ENUM('in','out') NOT NULL,
            quantity    INT NOT NULL,
            note        VARCHAR(500) DEFAULT NULL,
            user_id     INT NOT NULL,
            created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_part (part_id),
            INDEX idx_created (created_at)
        )
    ");
    try { $db->exec("ALTER TABLE spare_parts ADD COLUMN stock_quantity INT DEFAULT 0"); } catch(Exception $e){}
} catch (Exception $e) {}

if ($method === 'GET') {
    if (!$isAdmin) {
        echo json_encode(['error' => 'Admin only']);
        exit;
    }

    $partId = $_GET['part_id'] ?? null;
    $limit  = (int)($_GET['limit'] ?? 50);

    if ($partId) {
        // History for a specific part
        $stmt = $db->prepare("
            SELECT sl.*, spn.name as part_name, b.name as brand_name, u.name as logged_by
            FROM stock_logs sl
            JOIN spare_parts sp ON sl.part_id = sp.id
            JOIN spare_part_names spn ON sp.part_name_id = spn.id
            JOIN brands b ON sp.brand_id = b.id
            JOIN users u ON sl.user_id = u.id
            WHERE sl.part_id = ?
            ORDER BY sl.created_at DESC
            LIMIT ?
        ");
        $stmt->execute([$partId, $limit]);
    } else {
        // Full global log
        $stmt = $db->prepare("
            SELECT sl.*, spn.name as part_name, b.name as brand_name, u.name as logged_by
            FROM stock_logs sl
            JOIN spare_parts sp ON sl.part_id = sp.id
            JOIN spare_part_names spn ON sp.part_name_id = spn.id
            LEFT JOIN brands b ON sp.brand_id = b.id
            JOIN users u ON sl.user_id = u.id
            ORDER BY sl.created_at DESC
            LIMIT ?
        ");
        $stmt->execute([$limit]);
    }

    $logs = $stmt->fetchAll();

    // Also return low-stock items
    $lowStock = $db->query("
        SELECT sp.id, spn.name as part_name, b.name as brand, sp.stock_quantity
        FROM spare_parts sp
        JOIN spare_part_names spn ON sp.part_name_id = spn.id
        LEFT JOIN brands b ON sp.brand_id = b.id
        WHERE sp.stock_quantity <= 5
        ORDER BY sp.stock_quantity ASC
    ")->fetchAll();

    echo json_encode(['logs' => $logs, 'low_stock' => $lowStock]);

} elseif ($method === 'POST') {
    if (!$isAdmin) {
        echo json_encode(['error' => 'Admin only']);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    $part_id  = (int)($data['part_id']  ?? 0);
    $type     = $data['type']     ?? '';  // 'in' or 'out'
    $quantity = (int)($data['quantity'] ?? 0);
    $note     = $data['note']     ?? '';

    if (!$part_id || !in_array($type, ['in', 'out']) || $quantity <= 0) {
        echo json_encode(['error' => 'Invalid input. part_id, type (in/out), and quantity are required.']);
        exit;
    }

    try {
        $db->beginTransaction();

        // Get current stock
        $stmt = $db->prepare("SELECT stock_quantity FROM spare_parts WHERE id = ?");
        $stmt->execute([$part_id]);
        $current = (int)$stmt->fetchColumn();

        if ($type === 'out' && $current < $quantity) {
            throw new Exception("Insufficient stock. Only {$current} units available.");
        }

        $newQty = $type === 'in' ? $current + $quantity : $current - $quantity;

        // Update stock
        $db->prepare("UPDATE spare_parts SET stock_quantity = ? WHERE id = ?")->execute([$newQty, $part_id]);

        // Insert log entry
        $db->prepare("INSERT INTO stock_logs (part_id, type, quantity, note, user_id) VALUES (?, ?, ?, ?, ?)")
           ->execute([$part_id, $type, $quantity, $note, $_SESSION['user_id']]);

        $db->commit();
        echo json_encode(['success' => true, 'new_stock' => $newQty]);

    } catch (Exception $e) {
        $db->rollBack();
        echo json_encode(['error' => $e->getMessage()]);
    }
}
