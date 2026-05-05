<?php
require_once 'config/database.php';
$db = getDB();
$stmt = $db->query("SELECT id, email, role FROM users");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>
