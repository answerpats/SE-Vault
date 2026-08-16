<?php
require_once __DIR__ . '/config.php';
$pdo = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $limit = (int)($_GET['limit'] ?? 0);
    $sql = "SELECT * FROM gallery ORDER BY created_at DESC";
    if ($limit > 0) $sql .= " LIMIT " . $limit;
    $rows = $pdo->query($sql)->fetchAll();
    respond($rows);
}

if ($method === 'POST') {
    requireAuth();
    $imageUrl = handleUpload('image', 'gallery');
    $caption = $_POST['caption'] ?? '';

    $stmt = $pdo->prepare("INSERT INTO gallery (caption, image_url) VALUES (?, ?)");
    $stmt->execute([$caption, $imageUrl]);
    respond(['id' => $pdo->lastInsertId()], 201);
}

if ($method === 'DELETE') {
    requireAuth();
    $id = $_GET['id'] ?? null;
    if (!$id) respond(['error' => 'ID required'], 400);
    $pdo->prepare("DELETE FROM gallery WHERE id=?")->execute([$id]);
    respond(['success' => true]);
}
