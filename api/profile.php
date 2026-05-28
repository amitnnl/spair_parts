<?php
require_once '../config/database.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Unauthorized.']);
    exit;
}

$db = getDB();
$userId = $_SESSION['user_id'];
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $db->prepare("SELECT id, name, email, phone, whatsapp, address, company_name, gst_number, role, status FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch();
    echo json_encode($user);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'] ?? '';
    $phone = $data['phone'] ?? '';
    $whatsapp = $data['whatsapp'] ?? '';
    $address = $data['address'] ?? '';

    $company_name = $data['company_name'] ?? '';
    $gst_number = $data['gst_number'] ?? '';

    if (empty($name) || empty($company_name) || empty($gst_number) || empty($phone) || empty($address)) {
        echo json_encode(['error' => 'Company Name, GST/Tax ID, Phone, and Address are required.']);
        exit;
    }

    try {
        $stmt = $db->prepare("UPDATE users SET name = ?, phone = ?, whatsapp = ?, address = ?, company_name = ?, gst_number = ? WHERE id = ?");
        $stmt->execute([$name, $phone, $whatsapp, $address, $company_name, $gst_number, $userId]);
        
        // Update session name if changed
        $_SESSION['user_name'] = $name;
        
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
