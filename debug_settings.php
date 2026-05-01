<?php
require 'config/database.php';
$settings = getDB()->query("SELECT * FROM settings")->fetchAll(PDO::FETCH_KEY_PAIR);
echo json_encode($settings, JSON_PRETTY_PRINT);
