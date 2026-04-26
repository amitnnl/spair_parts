<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once '../config/database.php';

header('Content-Type: application/json');

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        // Fetch products with their primary fitment and all other fitments
        $query = "
            SELECT 
                sp.id, 
                sp.brand_id,
                sp.machine_name_id,
                sp.part_name_id,
                sp.model_id,
                b.name as brand, 
                spn.name as part_name, 
                mm_primary.name as machine_model,
                sp.photo,
                sp.note,
                sp.cost
            FROM spare_parts sp
            LEFT JOIN brands b ON sp.brand_id = b.id
            LEFT JOIN spare_part_names spn ON sp.part_name_id = spn.id
            LEFT JOIN machine_models mm_primary ON sp.model_id = mm_primary.id
        ";
        
        $stmt = $db->query($query);
        $products = $stmt->fetchAll();
        
        // Fetch all fitments for each product
        foreach ($products as &$p) {
            $fitStmt = $db->prepare("
                SELECT mm.name 
                FROM part_fitments pf
                JOIN machine_models mm ON pf.machine_model_id = mm.id
                WHERE pf.part_id = ?
            ");
            $fitStmt->execute([$p['id']]);
            $p['other_fitments'] = $fitStmt->fetchAll(PDO::FETCH_COLUMN);
        }

        // Fetch brands and models for filters
        $brands = $db->query("SELECT name FROM brands ORDER BY name")->fetchAll(PDO::FETCH_COLUMN);
        $models = $db->query("SELECT name FROM machine_models ORDER BY name")->fetchAll(PDO::FETCH_COLUMN);
        
        echo json_encode([
            'products' => $products,
            'brands' => $brands,
            'models' => $models
        ]);
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
