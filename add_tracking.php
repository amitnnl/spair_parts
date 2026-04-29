<?php
require_once 'config/database.php';
try {
    $db = getDB();
    $db->exec("ALTER TABLE invoices ADD COLUMN tracking_number VARCHAR(100) DEFAULT NULL");
    $db->exec("ALTER TABLE invoices ADD COLUMN shipping_provider VARCHAR(50) DEFAULT NULL");
    $db->exec("ALTER TABLE invoices ADD COLUMN shipping_status VARCHAR(50) DEFAULT 'Processing'");
    echo "Columns added successfully";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
