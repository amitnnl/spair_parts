<?php
require_once 'config/database.php';
$db = getDB();
try {
    $stmt = $db->prepare("UPDATE users SET status = 'active' WHERE email = 'testpartner@example.com'");
    $stmt->execute();
    echo "User approved successfully.";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
