<?php
require_once '../config/database.php';

// Allow POST from anywhere for the webhook
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Determine data source (Mailgun uses form-data, some use JSON)
    $data = $_POST;
    if (empty($data)) {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
    }
    
    // Fallback names for different providers
    $sender = $data['sender'] ?? $data['From'] ?? $data['from'] ?? '';
    $subject = $data['subject'] ?? $data['Subject'] ?? '';
    $body = $data['stripped-text'] ?? $data['body-plain'] ?? $data['text'] ?? '';
    
    if (empty($sender) || empty($body)) {
        echo json_encode(['success' => false, 'error' => 'Missing required fields']);
        exit;
    }
    
    // Extract just the email address from formats like "John Doe <john@doe.com>"
    if (preg_match('/<([^>]+)>/', $sender, $matches)) {
        $sender = $matches[1];
    }
    $sender = trim(strtolower($sender));
    
    try {
        $db = getDB();
        
        // Find if this user has an open ticket.
        // In a real system, you might match a reference ID in the subject.
        // For now, we find the most recent pending ticket from this email.
        $stmt = $db->prepare("SELECT id FROM support_tickets WHERE email = ? ORDER BY created_at DESC LIMIT 1");
        $stmt->execute([$sender]);
        $ticket = $stmt->fetch();
        
        if ($ticket) {
            // Add as a message to the existing ticket
            $stmt = $db->prepare("INSERT INTO support_messages (ticket_id, sender_type, message) VALUES (?, 'customer', ?)");
            $stmt->execute([$ticket['id'], trim($body)]);
            
            // Re-open ticket if it was resolved
            $stmt = $db->prepare("UPDATE support_tickets SET status = 'pending' WHERE id = ?");
            $stmt->execute([$ticket['id']]);
        } else {
            // Create a brand new ticket from the email
            $stmt = $db->prepare("INSERT INTO support_tickets (name, email, subject, message) VALUES (?, ?, ?, ?)");
            // Use the local part of email as name if not available
            $name = explode('@', $sender)[0];
            $cleanSubject = empty($subject) ? 'New Email Inquiry' : $subject;
            $stmt->execute([$name, $sender, $cleanSubject, trim($body)]);
        }
        
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        // Log the error but return 200 so the provider doesn't retry infinitely
        error_log("Webhook Error: " . $e->getMessage());
        echo json_encode(['success' => false, 'error' => 'Database error']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request']);
}
