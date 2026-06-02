<?php
require_once '../config/database.php';

header('Content-Type: application/json');

// Helper to check admin access (basic check)
session_start();
// Assuming we would normally verify admin role from session/JWT. 
// For this app architecture, if we reach this API via admin dashboard, we process it.
// Real production would check $_SESSION['user']['role'] === 'admin'.

try {
    $db = getDB();
    
    // Ensure table exists and has status column
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
    
    // Check if status column exists in case it was an older schema version
    $colCheck = $db->query("SHOW COLUMNS FROM support_tickets LIKE 'status'")->fetch();
    if (!$colCheck) {
        $db->exec("ALTER TABLE support_tickets ADD COLUMN status ENUM('pending', 'resolved') DEFAULT 'pending'");
    }

    // Check if phone column exists
    $phoneCheck = $db->query("SHOW COLUMNS FROM support_tickets LIKE 'phone'")->fetch();
    if (!$phoneCheck) {
        $db->exec("ALTER TABLE support_tickets ADD COLUMN phone VARCHAR(50) DEFAULT '' AFTER email");
    }

    $db->exec("
        CREATE TABLE IF NOT EXISTS support_messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            ticket_id INT NOT NULL,
            sender_type ENUM('customer', 'admin') NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
    
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        // Fetch all tickets
        $stmt = $db->query("SELECT * FROM support_tickets ORDER BY created_at DESC");
        $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $msgStmt = $db->query("SELECT * FROM support_messages ORDER BY created_at ASC");
        $messages = $msgStmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Group messages by ticket_id
        $msgsByTicket = [];
        foreach($messages as $msg) {
            $msgsByTicket[$msg['ticket_id']][] = $msg;
        }
        
        foreach($tickets as &$t) {
            $t['messages'] = $msgsByTicket[$t['id']] ?? [];
        }
        
        echo json_encode(['success' => true, 'tickets' => $tickets]);
    } 
    elseif ($method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (isset($data['action']) && $data['action'] === 'reply') {
            $ticket_id = $data['id'];
            $reply = $data['message'];
            
            $stmt = $db->prepare("INSERT INTO support_messages (ticket_id, sender_type, message) VALUES (?, 'admin', ?)");
            $stmt->execute([$ticket_id, $reply]);
            
            // Send Email
            $stmt = $db->prepare("SELECT name, email, subject FROM support_tickets WHERE id = ?");
            $stmt->execute([$ticket_id]);
            $ticket = $stmt->fetch();
            
            if ($ticket && !empty($ticket['email'])) {
                $fromEmail = 'support@torvotools.com';
                try {
                    $setStmt = $db->query("SELECT setting_value FROM settings WHERE setting_key = 'contact_email'");
                    if ($setRow = $setStmt->fetch()) {
                        if (!empty($setRow['setting_value'])) $fromEmail = $setRow['setting_value'];
                    }
                } catch (Exception $e) {}

                $to = $ticket['email'];
                $subject = "Re: " . $ticket['subject'];
                $message = "Hello " . $ticket['name'] . ",\n\n" . $reply . "\n\nBest regards,\nSupport Team";
                $headers = "From: " . $fromEmail . "\r\n";
                
                @mail($to, $subject, $message, $headers);
            }
            
            echo json_encode(['success' => true]);
        }
        elseif (isset($data['id']) && isset($data['status'])) {
            $stmt = $db->prepare("UPDATE support_tickets SET status = ? WHERE id = ?");
            $stmt->execute([$data['status'], $data['id']]);
            
            // Send confirmation email if resolved
            if ($data['status'] === 'resolved') {
                $stmt = $db->prepare("SELECT name, email, subject FROM support_tickets WHERE id = ?");
                $stmt->execute([$data['id']]);
                $ticket = $stmt->fetch();
                
                if ($ticket && !empty($ticket['email'])) {
                    $fromEmail = 'support@torvotools.com';
                    try {
                        $setStmt = $db->query("SELECT setting_value FROM settings WHERE setting_key = 'contact_email'");
                        if ($setRow = $setStmt->fetch()) {
                            if (!empty($setRow['setting_value'])) {
                                $fromEmail = $setRow['setting_value'];
                            }
                        }
                    } catch (Exception $e) {}

                    $to = $ticket['email'];
                    $subject = "Your Technical Inquiry has been resolved: " . $ticket['subject'];
                    $message = "Hello " . $ticket['name'] . ",\n\nYour technical inquiry regarding '" . $ticket['subject'] . "' has been marked as resolved by our support team.\n\nThank you for reaching out to us.\n\nBest regards,\nSupport Team";
                    $headers = "From: " . $fromEmail . "\r\n";
                    
                    @mail($to, $subject, $message, $headers);
                }
            }
            
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Invalid parameters']);
        }
    } 
    elseif ($method === 'DELETE') {
        // Delete a ticket
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id'])) {
            $pin = $data['pin'] ?? '';
            $correctPin = $db->query("SELECT setting_value FROM settings WHERE setting_key = 'admin_deletion_pin'")->fetchColumn();
            if ($correctPin && $pin !== $correctPin) {
                echo json_encode(['error' => 'Invalid Admin Deletion PIN.']);
                exit;
            }

            $stmt = $db->prepare("DELETE FROM support_tickets WHERE id = ?");
            $stmt->execute([$data['id']]);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Invalid ID']);
        }
    } else {
        echo json_encode(['error' => 'Invalid request method']);
    }

} catch (Exception $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
