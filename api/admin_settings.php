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
} elseif ($method === 'PUT') {
    // Only admin can update settings
    if (!isset($_SESSION['user_role']) || strtolower($_SESSION['user_role']) !== 'admin') {
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    $db->beginTransaction();
    try {
        foreach ($data as $key => $value) {
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
