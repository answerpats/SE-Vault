<?php
require_once __DIR__ . '/config.php';
$pdo = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    requireAuth();
    $rows = $pdo->query("SELECT * FROM members ORDER BY created_at DESC")->fetchAll();
    respond($rows);
}

if ($method === 'PUT') {
    requireAuth();
    $id = $_GET['id'] ?? null;
    if (!$id) respond(['error' => 'ID required'], 400);
    $body = jsonBody();
    $status = $body['status'] ?? '';
    if (!in_array($status, ['pending', 'approved', 'rejected'])) {
        respond(['error' => 'Invalid status'], 400);
    }
    $pdo->prepare("UPDATE members SET status=? WHERE id=?")->execute([$status, $id]);
    respond(['success' => true]);
}

if ($method === 'DELETE') {
    requireAuth();
    $id = $_GET['id'] ?? null;
    if (!$id) respond(['error' => 'ID required'], 400);
    $pdo->prepare("DELETE FROM members WHERE id=?")->execute([$id]);
    respond(['success' => true]);
}
