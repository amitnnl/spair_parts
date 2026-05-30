<?php
require_once '../config/database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $part_no = trim($_POST['part_no'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (empty($name) || empty($email) || empty($phone) || empty($subject) || empty($message)) {
        echo json_encode(['error' => 'All required fields must be filled.']);
        exit;
    }

    try {
        $db = getDB();
        
        // Ensure table and phone column exist
        $db->exec("
            CREATE TABLE IF NOT EXISTS support_tickets (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(50) DEFAULT '',
                subject VARCHAR(150) NOT NULL,
                part_no VARCHAR(100) DEFAULT '',
                message TEXT NOT NULL,
                status ENUM('pending', 'resolved') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ");
        
        $phoneCheck = $db->query("SHOW COLUMNS FROM support_tickets LIKE 'phone'")->fetch();
        if (!$phoneCheck) {
            $db->exec("ALTER TABLE support_tickets ADD COLUMN phone VARCHAR(50) DEFAULT '' AFTER email");
        }

        $stmt = $db->prepare("INSERT INTO support_tickets (name, email, phone, subject, part_no, message) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $email, $phone, $subject, $part_no, $message]);
        
        $ticketId = $db->lastInsertId();
        $reference = '#TV-' . str_pad($ticketId, 5, '0', STR_PAD_LEFT);
        
        echo json_encode(['success' => true, 'reference' => $reference]);
    } catch (Exception $e) {
        echo json_encode(['error' => 'Failed to submit ticket: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid request method.']);
}
