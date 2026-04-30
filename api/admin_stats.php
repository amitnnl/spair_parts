<?php
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_role']) || strtolower($_SESSION['user_role']) !== 'admin') {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$db = getDB();

try {
    // 1. Active Quotations (pending or priced)
    $stmt = $db->query("SELECT COUNT(*) FROM quotations WHERE status IN ('pending', 'priced')");
    $active_quotations = $stmt->fetchColumn();

    // 2. Total Partners (active or pending)
    $stmt = $db->query("SELECT COUNT(*) FROM users WHERE LOWER(role) = 'user'");
    $total_partners = $stmt->fetchColumn();
    
    // 3. Pending Approvals (Partners only)
    $stmt = $db->query("SELECT COUNT(*) FROM users WHERE status = 'pending' AND LOWER(role) = 'user'");
    $pending_partners = $stmt->fetchColumn();

    // 4. Total SKUs
    $stmt = $db->query("SELECT COUNT(*) FROM spare_parts");
    $total_skus = $stmt->fetchColumn();

    // 5. Total Brands
    $stmt = $db->query("SELECT COUNT(*) FROM brands");
    $total_brands = $stmt->fetchColumn();

    // 6. Revenue (Sum of all invoices)
    $stmt = $db->query("SELECT SUM(total_amount) FROM invoices");
    $revenue = $stmt->fetchColumn() ?: 0;

    echo json_encode([
        'active_quotations' => (int)$active_quotations,
        'total_partners' => (int)$total_partners,
        'pending_partners' => (int)$pending_partners,
        'total_skus' => (int)$total_skus,
        'total_brands' => (int)$total_brands,
        'revenue' => (float)$revenue
    ]);

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
