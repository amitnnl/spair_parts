<?php
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'admin') {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // List users (pending first)
    $stmt = $db->query("SELECT id, name, email, role, status, discount_tier, created_at FROM users WHERE role != 'admin' ORDER BY CASE WHEN status = 'pending' THEN 0 ELSE 1 END, created_at DESC");
    echo json_encode($stmt->fetchAll());
} elseif ($method === 'PUT') {
    // Update user status or discount tier
    $data = json_decode(file_get_contents('php://input'), true);
    $user_id = $data['id'];
    
    try {
        if (isset($data['status'])) {
            $stmt = $db->prepare("UPDATE users SET status = ? WHERE id = ?");
            $stmt->execute([$data['status'], $user_id]);
        }
        
        if (isset($data['discount_tier'])) {
            $stmt = $db->prepare("UPDATE users SET discount_tier = ? WHERE id = ?");
            $stmt->execute([$data['discount_tier'], $user_id]);
        }
        
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
