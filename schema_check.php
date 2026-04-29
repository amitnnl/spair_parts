<?php
require_once 'config/database.php';
$db = getDB();
$stmt = $db->query("DESCRIBE invoices");
print_r($stmt->fetchAll(PDO::FETCH_ASSOC));
