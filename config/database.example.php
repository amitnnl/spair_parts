<?php
// ============================================
// Database Configuration for PARTSPRO
// ============================================
// INSTRUCTIONS FOR DEPLOYMENT:
// 1. Copy this file to config/database.php on your live server
// 2. Fill in your actual cPanel database credentials
// 3. NEVER commit the actual database.php to git
// ============================================

// Error reporting - Disable for production
error_reporting(0);
ini_set('display_errors', 0);

if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_strict_mode', 1);
    ini_set('session.cookie_samesite', 'Lax');
    session_start();
}

// ============================================
// CORS Headers
// For LOCAL dev: add 'http://localhost:5173'
// For PRODUCTION: add your live domain
// ============================================
if (isset($_SERVER['HTTP_ORIGIN'])) {
    $origin = $_SERVER['HTTP_ORIGIN'];
    $allowed_origins = [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'https://torvotools.com',          // <-- your live domain
        'https://www.torvotools.com',      // <-- with www
    ];
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
        header("Access-Control-Allow-Credentials: true");
    }
}

// Handle Preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// ============================================
// DATABASE CREDENTIALS
// LOCAL: use root / empty password
// PRODUCTION: use your cPanel MySQL credentials
// ============================================
define('DB_HOST', 'YOUR_DB_HOST');       // Usually 'localhost' on cPanel
define('DB_USER', 'YOUR_DB_USERNAME');   // e.g. hotelsunplaza_user
define('DB_PASS', 'YOUR_DB_PASSWORD');   // Your cPanel DB password
define('DB_NAME', 'YOUR_DB_NAME');       // e.g. hotelsunplaza_spairparts
define('DB_CHARSET', 'utf8mb4');

define('APP_NAME', 'PARTSPRO');

// Dynamic APP_URL Detection
$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
$host = $_SERVER['HTTP_HOST'];
$dir = str_replace('\\', '/', dirname(dirname($_SERVER['PHP_SELF'])));
$base_url = rtrim($protocol . "://" . $host . $dir, '/');
define('APP_URL', $base_url);

function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Connection services are currently unavailable.']);
            exit;
        }
    }
    return $pdo;
}

function sanitize(string $input): string {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}
