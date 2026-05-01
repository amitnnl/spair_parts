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
    'site_name'         => 'PARTSPRO',
    'site_logo'         => '',
    'currency'          => '₹',
    'tax_percent'       => '18',
    'contact_email'     => 'support@partspro.in',
    'contact_phone'     => '+91 70277 51544',
    'contact_address'   => 'Phase 2, Industrial Estate, New Delhi, IN 110020',
    'footer_desc'       => 'The premium B2B platform for genuine power tool spare parts procurement and industrial maintenance solutions.',
    'footer_copyright'  => '© 2026 PARTSPRO B2B Division. All rights reserved.',
    // Home page
    'hero_title'        => 'THE RIGHT PART. EVERY TIME.',
    'hero_subtitle'     => 'Premium B2B procurement portal for genuine power tool spare parts from the world\'s leading brands.',
    'hero_image'        => 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000',
    // Brands page
    'brands_title'      => 'Our Trusted Brands',
    'brands_subtitle'   => 'We partner exclusively with the world\'s most trusted power tool manufacturers.',
    'brand1_name' => 'BOSCH', 'brand1_tag' => 'Power Tools', 'brand1_desc' => 'German engineering excellence for industrial professionals.', 'brand1_logo' => '',
    'brand2_name' => 'MAKITA', 'brand2_tag' => 'Power Tools', 'brand2_desc' => 'Japanese precision for demanding trade environments.', 'brand2_logo' => '',
    'brand3_name' => 'DEWALT', 'brand3_tag' => 'Industrial', 'brand3_desc' => 'Built tough for the construction industry worldwide.', 'brand3_logo' => '',
    'brand4_name' => 'HIKOKI', 'brand4_tag' => 'Power Tools', 'brand4_desc' => 'Formerly Hitachi Power Tools — innovation-first engineering.', 'brand4_logo' => '',
    'brand5_name' => 'MILWAUKEE', 'brand5_tag' => 'Heavy Duty', 'brand5_desc' => 'Designed for the trades — maximum power and durability.', 'brand5_logo' => '',
    'brand6_name' => 'HILTI', 'brand6_tag' => 'Professional', 'brand6_desc' => 'Professional construction and installation solutions.', 'brand6_logo' => '',
    // Categories page
    'cats_page_title'    => 'Core Categories',
    'cats_page_subtitle' => 'Precision-engineered spares for every industrial tool in your fleet.',
    // Support page
    'support_title'    => 'Expert Support Center',
    'support_subtitle' => 'Need technical assistance with a part? Our specialist engineers are available 24/7 to help your business stay operational.',
    'support_form_cta' => 'Submit Technical Ticket',
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
