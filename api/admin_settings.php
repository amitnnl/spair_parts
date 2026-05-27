<?php
require_once '../config/database.php';
header('Content-Type: application/json');

$db = getDB();

// Auto-initialize settings table if missing
$db->exec("CREATE TABLE IF NOT EXISTS settings (
    setting_key VARCHAR(255) PRIMARY KEY,
    setting_value TEXT
)");

// Ensure defaults exist and settings.json is created
$jsonFile = '../config/settings.json';
if (!file_exists($jsonFile)) {
    $defaults = [
        'site_name'         => 'PARTSPRO',
        'site_logo'         => '',
        'currency'          => '₹',
        'tax_percent'       => '18',
        'contact_email'     => 'support@torvotools.com',
        'contact_phone'     => '+91 70277 51544',
        'whatsapp_number'   => '+917027751544',
        'contact_address'   => 'Phase 2, Industrial Estate, New Delhi, IN 110020',
        'footer_desc'       => 'The premium B2B platform for genuine power tool spare parts procurement and industrial maintenance solutions.',
        'footer_copyright'  => '© 2026 PARTSPRO B2B Division. All rights reserved.',
        // Home page
        'hero_title'        => 'THE RIGHT PART. EVERY TIME.',
        'hero_subtitle'     => 'Premium B2B procurement portal for genuine power tool spare parts from the world\'s leading brands.',
        'hero_image'        => 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000',
        'hero_image_2'      => 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=1000',
        'hero_image_3'      => 'https://images.unsplash.com/photo-1530124566582-a618bc2615ad?auto=format&fit=crop&q=80&w=1000',
        // Brands page
        'brands_title'      => 'Our Trusted Brands',
        'brands_subtitle'   => 'We partner exclusively with the world\'s most trusted power tool manufacturers.',
        'brand1_name' => 'BOSCH', 'brand1_tag' => 'Power Tools', 'brand1_desc' => 'German engineering excellence for industrial professionals.', 'brand1_logo' => '',
        'brand2_name' => 'MAKITA', 'brand2_tag' => 'Power Tools', 'brand2_desc' => 'Japanese precision for demanding trade environments.', 'brand2_logo' => '',
        'brand3_name' => 'DEWALT', 'brand3_tag' => 'Industrial', 'brand3_desc' => 'Built tough for the construction industry worldwide.', 'brand3_logo' => '',
        'brand4_name' => 'HIKOKI', 'brand4_tag' => 'Power Tools', 'brand4_desc' => 'Formerly Hitachi Power Tools — innovation-first engineering.', 'brand4_logo' => '',
        'brand5_name' => 'MILWAUKEE', 'brand5_tag' => 'Heavy Duty', 'brand5_desc' => 'Designed for the trades — maximum power and durability.', 'brand5_logo' => '',
        'brand6_name' => 'HILTI', 'brand6_tag' => 'Professional', 'brand6_desc' => 'Professional construction and installation solutions.', 'brand6_logo' => '',
        'cat1_title'        => 'Electrical Spares',
        'cat1_desc'         => 'Switches, Carbon Brushes, Armatures & Field Coils built for high thermal endurance.',
        'cat1_img'          => 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800',
        'cat2_title'        => 'Mechanical Units',
        'cat2_desc'         => 'Precision Gears, Bearings, Shafts & Housing Assemblies ensuring seamless kinetic transfer.',
        'cat2_img'          => 'https://images.unsplash.com/photo-1530124566582-a618bc2615ad?auto=format&fit=crop&q=80&w=800',
        'cat3_title'        => 'Power Attachments',
        'cat3_desc'         => 'Chucks, SDS Adaptors, Cutting Discs & Drill Bits engineered for brutal workloads.',
        'cat3_img'          => 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800',
        'cat4_title'        => 'Maintenance Kits',
        'cat4_desc'         => 'Complete Service Kits for Industrial Hammer Drills & Saws. Minimize your downtime.',
        'cat4_img'          => 'https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?auto=format&fit=crop&q=80&w=800',
        'cats_page_title'    => 'Core Categories',
        'cats_page_subtitle' => 'Precision-engineered spares for every industrial tool in your fleet.',
        'support_title'    => 'Expert Support Center',
        'support_subtitle' => 'Need technical assistance with a part? Our specialist engineers are available 24/7 to help your business stay operational.',
        'support_form_cta' => 'Submit Technical Ticket',
    ];
    if (!is_dir('../config')) mkdir('../config', 0755, true);
    file_put_contents($jsonFile, json_encode($defaults, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}

// Read settings.json and synchronize it into the database ONLY if the table is empty (fresh install)
$count = $db->query("SELECT COUNT(*) FROM settings")->fetchColumn();
if ($count == 0 && file_exists($jsonFile)) {
    $jsonSettings = json_decode(file_get_contents($jsonFile), true);
    if (is_array($jsonSettings)) {
        $db->beginTransaction();
        try {
            foreach ($jsonSettings as $k => $v) {
                $stmt = $db->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?");
                $stmt->execute([$k, $v, $v]);
            }
            $db->commit();
        } catch (Exception $e) {
            $db->rollBack();
        }
    }
}


$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $settings = $db->query("SELECT * FROM settings")->fetchAll(PDO::FETCH_KEY_PAIR);
    echo json_encode($settings);
} elseif ($method === 'POST') {
    // Only admin can update settings
    // Verify admin: check session role OR verify user_id against DB
    $isAdmin = false;
    if (isset($_SESSION['user_role']) && strtolower($_SESSION['user_role']) === 'admin') {
        $isAdmin = true;
    } elseif (isset($_SESSION['user_id'])) {
        // Fallback: verify role from database using stored user_id
        $authStmt = $db->prepare("SELECT role FROM users WHERE id = ? LIMIT 1");
        $authStmt->execute([$_SESSION['user_id']]);
        $authUser = $authStmt->fetch(PDO::FETCH_ASSOC);
        if ($authUser && strtolower($authUser['role']) === 'admin') {
            $isAdmin = true;
            $_SESSION['user_role'] = $authUser['role']; // repair session
        }
    }
    
    if (!$isAdmin) {
        echo json_encode(['error' => 'Unauthorized — admin session required. Please log out and log back in.']);
        exit;
    }

    $data = $_POST;
    
    // Handle file uploads
    $uploadDir = '../uploads/';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

    foreach ($_FILES as $key => $file) {
        if ($file['error'] === UPLOAD_ERR_OK) {
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];
            $fileInfo = finfo_open(FILEINFO_MIME_TYPE);
            $mimeType = finfo_file($fileInfo, $file['tmp_name']);
            $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

            if (!in_array($ext, $allowedExtensions) || (strpos($mimeType, 'image/') !== 0 && $mimeType !== 'image/svg+xml')) {
                echo json_encode(['error' => 'Invalid file format. Only images are allowed.']);
                exit;
            }

            // Delete old file if exists
            $stmt = $db->prepare("SELECT setting_value FROM settings WHERE setting_key = ?");
            $stmt->execute([$key]);
            $oldValue = $stmt->fetchColumn();
            if ($oldValue && !filter_var($oldValue, FILTER_VALIDATE_URL)) {
                $oldPath = '../' . $oldValue;
                if (file_exists($oldPath)) unlink($oldPath);
            }

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
        file_put_contents('../debug_log.txt', date('Y-m-d H:i:s') . " - Received POST: " . json_encode($data) . "\n", FILE_APPEND);

        foreach ($data as $key => $value) {
            $isImageField = (strpos($key, 'image') !== false || strpos($key, 'img') !== false || strpos($key, 'logo') !== false);
            if ($isImageField && empty($value)) {
                continue;
            }
            
            $stmt = $db->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?");
            $stmt->execute([$key, $value, $value]);
        }
        $db->commit();

        // ── SYNC BACK TO SETTINGS.JSON ──
        $updatedSettings = $db->query("SELECT * FROM settings")->fetchAll(PDO::FETCH_KEY_PAIR);
        file_put_contents($jsonFile, json_encode($updatedSettings, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        $db->rollBack();
        file_put_contents('../debug_log.txt', date('Y-m-d H:i:s') . " - DB Error: " . $e->getMessage() . "\n", FILE_APPEND);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
