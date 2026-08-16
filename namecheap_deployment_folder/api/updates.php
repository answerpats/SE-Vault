<?php
require_once __DIR__ . '/config.php';
$pdo = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $limit = (int)($_GET['limit'] ?? 0);
    $sql = "SELECT * FROM updates_posts ORDER BY created_at DESC";
    if ($limit > 0) $sql .= " LIMIT " . $limit;
    $rows = $pdo->query($sql)->fetchAll();
    respond($rows);
}

if ($method === 'POST') {
    requireAuth();
    $imageUrl = handleUpload('image', 'updates');
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';

    $stmt = $pdo->prepare("INSERT INTO updates_posts (title, description, image_url) VALUES (?, ?, ?)");
    $stmt->execute([$title, $description, $imageUrl]);
    respond(['id' => $pdo->lastInsertId()], 201);
}

if ($method === 'DELETE') {
    requireAuth();
    $id = $_GET['id'] ?? null;
    if (!$id) respond(['error' => 'ID required'], 400);
    $pdo->prepare("DELETE FROM updates_posts WHERE id=?")->execute([$id]);
    respond(['success' => true]);
}
