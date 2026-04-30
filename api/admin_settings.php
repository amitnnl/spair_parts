<?php
require_once '../config/database.php';
header('Content-Type: application/json');

$db = getDB();

// Auto-initialize settings table if missing
$db->exec("CREATE TABLE IF NOT EXISTS settings (
    setting_key VARCHAR(255) PRIMARY KEY,
    setting_value TEXT
)");

// Ensure defaults exist
$defaults = [
    'site_name' => 'PARTSPRO',
    'site_logo' => '',
    'currency' => '₹',
    'tax_percent' => '18',
    'contact_email' => 'support@partspro.in',
    'contact_phone' => '+91 70277 51544',
    'contact_address' => 'Phase 2, Industrial Estate, New Delhi, IN 110020',
    'hero_title' => 'THE RIGHT PART. EVERY TIME.',
    'hero_subtitle' => 'Premium B2B procurement portal for genuine power tool spare parts from the world\'s leading brands.',
    'hero_image' => 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000'
];
foreach ($defaults as $k => $v) {
    $stmt = $db->prepare("INSERT IGNORE INTO settings (setting_key, setting_value) VALUES (?, ?)");
    $stmt->execute([$k, $v]);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Settings are public-readable (needed for page load branding)
    $settings = $db->query("SELECT * FROM settings")->fetchAll(PDO::FETCH_KEY_PAIR);
    echo json_encode($settings);
} elseif ($method === 'POST') {
    // Only admin can update settings
    if (!isset($_SESSION['user_role']) || strtolower($_SESSION['user_role']) !== 'admin') {
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    $data = $_POST;
    
    // Handle file uploads
    $uploadDir = '../uploads/';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

    foreach ($_FILES as $key => $file) {
        if ($file['error'] === UPLOAD_ERR_OK) {
            $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
            $filename = 'setting_' . $key . '_' . uniqid() . '.' . $ext;
            if (move_uploaded_file($file['tmp_name'], $uploadDir . $filename)) {
                $data[$key] = 'uploads/' . $filename;
            } else {
                echo json_encode(['error' => 'Failed to move uploaded file to ' . $uploadDir]);
                exit;
            }
        } elseif ($file['error'] !== UPLOAD_ERR_NO_FILE) {
            echo json_encode(['error' => 'File upload error code: ' . $file['error']]);
            exit;
        }
    }

    $db->beginTransaction();
    try {
        foreach ($data as $key => $value) {
            // Fix: If this is an image/file field and the value is empty (no new upload), skip it
            if (($key === 'hero_image' || strpos($key, '_img') !== false) && empty($value)) {
                continue;
            }
            
            $stmt = $db->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?");
            $stmt->execute([$key, $value, $value]);
        }
        $db->commit();
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        $db->rollBack();
        echo json_encode(['error' => $e->getMessage()]);
    }
}
