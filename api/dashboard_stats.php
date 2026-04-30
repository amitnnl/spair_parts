<?php
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$db = getDB();
$user_id = $_SESSION['user_id'];

try {
    // 1. Total Procured (Sum of all user's invoices)
    $stmt = $db->prepare("
        SELECT SUM(i.total_amount) 
        FROM invoices i 
        JOIN quotations q ON i.quotation_id = q.id 
        WHERE q.user_id = ?
    ");
    $stmt->execute([$user_id]);
    $total_procured = $stmt->fetchColumn() ?: 0;

    // 2. Active Orders (Quotations that aren't completed or rejected)
    $stmt = $db->prepare("
        SELECT COUNT(*) 
        FROM quotations 
        WHERE user_id = ? AND status IN ('pending', 'priced', 'approved')
    ");
    $stmt->execute([$user_id]);
    $active_orders = $stmt->fetchColumn();

    // 3. Saved Items (Placeholder - can be linked to a future favorites table)
    $saved_items = 0;

    // 4. Total Savings (Placeholder - can be calculated if original price is stored)
    $total_savings = $total_procured * 0.15; // Realistic 15% estimated B2B savings

    echo json_encode([
        'total_procured' => (float)$total_procured,
        'active_orders' => (int)$active_orders,
        'saved_items' => (int)$saved_items,
        'total_savings' => (float)$total_savings
    ]);

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
