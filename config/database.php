<?php
// ============================================================================
// PARTSPRO — Smart Database Configuration
// Works automatically on BOTH local XAMPP and live cPanel server.
// No manual editing needed after deployment — credentials switch by hostname.
// ============================================================================

// ── Error Reporting (always off — errors return JSON, not HTML) ──────────────
error_reporting(0);
ini_set('display_errors', 0);

// ── Session Setup ────────────────────────────────────────────────────────────
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_strict_mode', 1);
    ini_set('session.cookie_samesite', 'Lax');
    session_start();
}

// ── CORS Headers ─────────────────────────────────────────────────────────────
if (isset($_SERVER['HTTP_ORIGIN'])) {
    $origin = $_SERVER['HTTP_ORIGIN'];
    $allowed_origins = [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost',
        'https://torvotools.com',
        'https://www.torvotools.com',
    ];
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
        header("Access-Control-Allow-Credentials: true");
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ── Auto-Detect Environment & Set Credentials ────────────────────────────────
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$isLive = !in_array($host, ['localhost', '127.0.0.1']);

if ($isLive) {
    // ╔══════════════════════════════════════════════════════╗
    // ║  LIVE SERVER (cPanel — torvotools.com)               ║
    // ║  Update these with your actual cPanel DB credentials ║
    // ╚══════════════════════════════════════════════════════╝
    define('DB_HOST', 'localhost');
    define('DB_USER', 'hotelsunplaza_spair');   // ← your cPanel DB username
    define('DB_PASS', 'YourLivePassword123');   // ← your cPanel DB password
    define('DB_NAME', 'hotelsunplaza_spair');   // ← your cPanel DB name
} else {
    // ╔══════════════════════════════════════════════════════╗
    // ║  LOCAL XAMPP (localhost)                             ║
    // ╚══════════════════════════════════════════════════════╝
    define('DB_HOST', '127.0.0.1');
    define('DB_USER', 'root');
    define('DB_PASS', '');
    define('DB_NAME', 'spairparts_db');
}

define('DB_CHARSET', 'utf8mb4');
define('APP_NAME', 'PARTSPRO');

// ── Dynamic APP_URL Detection ─────────────────────────────────────────────────
$protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? 'https' : 'http';
$dir = str_replace('\\', '/', dirname(dirname($_SERVER['PHP_SELF'])));
$base_url = rtrim($protocol . '://' . $host . $dir, '/');
define('APP_URL', $base_url);

// ── Database Connection (Singleton) ──────────────────────────────────────────
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
            http_response_code(503);
            echo json_encode([
                'error'   => 'Database connection failed.',
                'message' => 'Please check server configuration.',
            ]);
            exit;
        }
    }
    return $pdo;
}

// ── Input Sanitizer ───────────────────────────────────────────────────────────
function sanitize(string $input): string {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}
