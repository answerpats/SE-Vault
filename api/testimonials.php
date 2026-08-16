<?php
require_once __DIR__ . '/config.php';
$pdo = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $limit = (int)($_GET['limit'] ?? 0);
    $sql = "SELECT * FROM testimonials ORDER BY created_at DESC";
    if ($limit > 0) $sql .= " LIMIT " . $limit;
    $rows = $pdo->query($sql)->fetchAll();
    respond($rows);
}

if ($method === 'POST') {
    requireAuth();
    $avatar = handleUpload('image', 'testimonials');
    $author = $_POST['author'] ?? '';
    $role = $_POST['role'] ?? '';
    $content = $_POST['content'] ?? '';

    $stmt = $pdo->prepare("INSERT INTO testimonials (author, role, content, avatar) VALUES (?, ?, ?, ?)");
    $stmt->execute([$author, $role, $content, $avatar]);
    respond(['id' => $pdo->lastInsertId()], 201);
}

if ($method === 'DELETE') {
    requireAuth();
    $id = $_GET['id'] ?? null;
    if (!$id) respond(['error' => 'ID required'], 400);
    $pdo->prepare("DELETE FROM testimonials WHERE id=?")->execute([$id]);
    respond(['success' => true]);
}
