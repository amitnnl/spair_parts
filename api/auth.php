<?php
require_once '../config/database.php';

header('Content-Type: application/json');

$db = getDB();

// Ensure user profile columns exist
try { $db->exec("ALTER TABLE users ADD COLUMN phone VARCHAR(20) DEFAULT NULL"); } catch(Exception $e){}
try { $db->exec("ALTER TABLE users ADD COLUMN whatsapp VARCHAR(20) DEFAULT NULL"); } catch(Exception $e){}
try { $db->exec("ALTER TABLE users ADD COLUMN address TEXT DEFAULT NULL"); } catch(Exception $e){}
try { $db->exec("ALTER TABLE users ADD COLUMN company_name VARCHAR(255) DEFAULT NULL"); } catch(Exception $e){}
try { $db->exec("ALTER TABLE users ADD COLUMN gst_number VARCHAR(100) DEFAULT NULL"); } catch(Exception $e){}

$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'] ?? '';

if ($action === 'login') {
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    $stmt = $db->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        if ($user['status'] !== 'active') {
            echo json_encode(['error' => 'Your account is pending approval from the administrator.']);
            exit;
        }
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_role'] = $user['role'];
        $profile_complete = !empty($user['phone']) && !empty($user['address']) && !empty($user['company_name']) && !empty($user['gst_number']);
        
        echo json_encode(['success' => true, 'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'role' => $user['role'],
            'profile_complete' => $profile_complete
        ]]);
    } else {
        echo json_encode(['error' => 'Invalid credentials']);
    }
} elseif ($action === 'register') {
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($name) || empty($email) || empty($password)) {
        echo json_encode(['error' => 'All fields are required']);
        exit;
    }

    // Check if user exists
    $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode(['error' => 'Email already registered']);
        exit;
    }

    $hashed = password_hash($password, PASSWORD_BCRYPT);
    try {
        $stmt = $db->prepare("INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, 'user', 'pending')");
        $stmt->execute([$name, $email, $hashed]);
        echo json_encode(['success' => true, 'message' => 'Registration successful. Your account is awaiting admin approval.']);
    } catch (Exception $e) {
        echo json_encode(['error' => 'Registration failed: ' . $e->getMessage()]);
    }
} elseif ($action === 'logout') {
    session_destroy();
    echo json_encode(['success' => true]);
} elseif ($action === 'check') {
    if (isset($_SESSION['user_id'])) {
        $stmt = $db->prepare("SELECT phone, address, company_name, gst_number FROM users WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        $u = $stmt->fetch();
        $profile_complete = $u && !empty($u['phone']) && !empty($u['address']) && !empty($u['company_name']) && !empty($u['gst_number']);
        
        echo json_encode(['logged_in' => true, 'user' => [
            'id' => $_SESSION['user_id'],
            'name' => $_SESSION['user_name'],
            'role' => $_SESSION['user_role'],
            'profile_complete' => $profile_complete
        ]]);
    } else {
        echo json_encode(['logged_in' => false]);
    }
}
