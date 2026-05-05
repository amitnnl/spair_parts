<?php
require_once 'config/database.php';
$db = getDB();
try {
    $pass = password_hash('password123', PASSWORD_DEFAULT);
    
    // Update Admin
    $stmt = $db->prepare("UPDATE users SET password = ?, status = 'active' WHERE email = 'admin@gmail.com'");
    $stmt->execute([$pass]);
    
    // Update Test Partner
    $stmt = $db->prepare("UPDATE users SET password = ?, status = 'active' WHERE email = 'testpartner@example.com'");
    $stmt->execute([$pass]);
    
    echo "Passwords updated successfully.";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
