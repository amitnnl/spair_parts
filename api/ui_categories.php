<?php
require_once '../config/database.php';
header('Content-Type: application/json');

$db = getDB();

$db->exec("CREATE TABLE IF NOT EXISTS ui_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    icon_svg TEXT,
    sort_order INT DEFAULT 0
)");

// Migrate default categories if table is empty
$count = $db->query("SELECT COUNT(*) FROM ui_categories")->fetchColumn();
if ($count == 0) {
    // Try to pull existing categories from settings table
    $settings = $db->query("SELECT * FROM settings")->fetchAll(PDO::FETCH_KEY_PAIR);
    $defaults = [
        [
            'title' => $settings['cat1_title'] ?? 'Electrical Spares',
            'desc'  => $settings['cat1_desc'] ?? 'Switches, Carbon Brushes, Armatures & Field Coils built for high thermal endurance.',
            'img'   => $settings['cat1_img'] ?? 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800',
            'icon'  => 'M13 10V3L4 14h7v7l9-11h-7z',
            'sort'  => 10
        ],
        [
            'title' => $settings['cat2_title'] ?? 'Mechanical Units',
            'desc'  => $settings['cat2_desc'] ?? 'Precision Gears, Bearings, Shafts & Housing Assemblies ensuring seamless kinetic transfer.',
            'img'   => $settings['cat2_img'] ?? 'https://images.unsplash.com/photo-1530124566582-a618bc2615ad?auto=format&fit=crop&q=80&w=800',
            'icon'  => 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
            'sort'  => 20
        ],
        [
            'title' => $settings['cat3_title'] ?? 'Power Attachments',
            'desc'  => $settings['cat3_desc'] ?? 'Chucks, SDS Adaptors, Cutting Discs & Drill Bits engineered for brutal workloads.',
            'img'   => $settings['cat3_img'] ?? 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800',
            'icon'  => 'M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5',
            'sort'  => 30
        ],
        [
            'title' => $settings['cat4_title'] ?? 'Maintenance Kits',
            'desc'  => $settings['cat4_desc'] ?? 'Complete Service Kits for Industrial Hammer Drills & Saws. Minimize your downtime.',
            'img'   => $settings['cat4_img'] ?? 'https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?auto=format&fit=crop&q=80&w=800',
            'icon'  => 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
            'sort'  => 40
        ]
    ];
    $stmt = $db->prepare("INSERT INTO ui_categories (title, description, image_url, icon_svg, sort_order) VALUES (?, ?, ?, ?, ?)");
    foreach ($defaults as $cat) {
        $stmt->execute([$cat['title'], $cat['desc'], $cat['img'], $cat['icon'], $cat['sort']]);
    }
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $cats = $db->query("SELECT * FROM ui_categories ORDER BY sort_order ASC")->fetchAll();
    echo json_encode(['success' => true, 'categories' => $cats]);
    exit;
}

if ($method === 'POST') {
    // Verify admin
    $isAdmin = false;
    if (isset($_SESSION['user_role']) && strtolower($_SESSION['user_role']) === 'admin') {
        $isAdmin = true;
    } elseif (isset($_SESSION['user_id'])) {
        $authStmt = $db->prepare("SELECT role FROM users WHERE id = ? LIMIT 1");
        $authStmt->execute([$_SESSION['user_id']]);
        $authUser = $authStmt->fetch(PDO::FETCH_ASSOC);
        if ($authUser && strtolower($authUser['role']) === 'admin') {
            $isAdmin = true;
            $_SESSION['user_role'] = $authUser['role'];
        }
    }
    
    if (!$isAdmin) {
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    $action = $_POST['action'] ?? '';
    
    if ($action === 'delete') {
        $id = $_POST['id'] ?? 0;
        
        // Remove image if exists
        $stmt = $db->prepare("SELECT image_url FROM ui_categories WHERE id = ?");
        $stmt->execute([$id]);
        $img = $stmt->fetchColumn();
        if ($img && !filter_var($img, FILTER_VALIDATE_URL)) {
            $path = '../' . $img;
            if (file_exists($path)) unlink($path);
        }

        $db->prepare("DELETE FROM ui_categories WHERE id = ?")->execute([$id]);
        echo json_encode(['success' => true]);
        exit;
    }

    if ($action === 'create' || $action === 'update') {
        $title = $_POST['title'] ?? '';
        $desc = $_POST['description'] ?? '';
        $icon = !empty($_POST['icon_svg']) ? $_POST['icon_svg'] : 'M13 10V3L4 14h7v7l9-11h-7z';
        $sort = $_POST['sort_order'] ?? 0;
        
        $image_url = null;
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];
            $fileInfo = finfo_open(FILEINFO_MIME_TYPE);
            $mimeType = finfo_file($fileInfo, $_FILES['image']['tmp_name']);
            $ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));

            if (in_array($ext, $allowedExtensions) && (strpos($mimeType, 'image/') === 0 || $mimeType === 'image/svg+xml')) {
                $uploadDir = '../uploads/';
                if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
                $filename = 'uicat_' . uniqid() . '.' . $ext;
                if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $filename)) {
                    $image_url = 'uploads/' . $filename;
                }
            } else {
                echo json_encode(['error' => 'Invalid image format.']);
                exit;
            }
        }

        if ($action === 'create') {
            $stmt = $db->prepare("INSERT INTO ui_categories (title, description, image_url, icon_svg, sort_order) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$title, $desc, $image_url, $icon, $sort]);
        } else {
            $id = $_POST['id'];
            if ($image_url) {
                // Delete old image
                $stmt = $db->prepare("SELECT image_url FROM ui_categories WHERE id = ?");
                $stmt->execute([$id]);
                $oldImg = $stmt->fetchColumn();
                if ($oldImg && !filter_var($oldImg, FILTER_VALIDATE_URL)) {
                    $path = '../' . $oldImg;
                    if (file_exists($path)) unlink($path);
                }

                $stmt = $db->prepare("UPDATE ui_categories SET title=?, description=?, image_url=?, icon_svg=?, sort_order=? WHERE id=?");
                $stmt->execute([$title, $desc, $image_url, $icon, $sort, $id]);
            } else {
                $stmt = $db->prepare("UPDATE ui_categories SET title=?, description=?, icon_svg=?, sort_order=? WHERE id=?");
                $stmt->execute([$title, $desc, $icon, $sort, $id]);
            }
        }
        echo json_encode(['success' => true]);
        exit;
    }
}
?>
