<?php
require_once __DIR__ . '/config.php';
$pdo = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $rows = $pdo->query("SELECT * FROM value_vault ORDER BY created_at DESC")->fetchAll();
    respond($rows);
}

if ($method === 'POST') {
    requireAuth();
    $imageUrl = handleUpload('image', 'vault');
    $pdfUrl = handleUpload('pdf', 'vault');
    $title       = $_POST['title']       ?? '';
    $description = $_POST['description'] ?? '';
    $content     = $_POST['content']     ?? '';
    $category    = $_POST['category']    ?? 'Business Templates';

    $allowed = ['Business Templates', 'Member Resources', 'Innovation & R&D'];
    if (!in_array($category, $allowed)) $category = 'Business Templates';

    $stmt = $pdo->prepare("INSERT INTO value_vault (title, description, content, image_url, pdf_url, category) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$title, $description, $content, $imageUrl, $pdfUrl, $category]);
    respond(['id' => $pdo->lastInsertId()], 201);
}

if ($method === 'DELETE') {
    requireAuth();
    $id = $_GET['id'] ?? null;
    if (!$id) respond(['error' => 'ID required'], 400);
    $pdo->prepare("DELETE FROM value_vault WHERE id=?")->execute([$id]);
    respond(['success' => true]);
}
