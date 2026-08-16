<?php
require_once __DIR__ . '/config.php';
$pdo = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $rows = $pdo->query("SELECT * FROM hero_slides ORDER BY sort_order ASC")->fetchAll();
    respond($rows);
}

if ($method === 'POST') {
    requireAuth();
    $imageUrl = handleUpload('image', 'hero');
    $heading = $_POST['heading'] ?? '';
    $subtext = $_POST['subtext'] ?? '';
    $ctaText = $_POST['ctaText'] ?? '';
    $ctaLink = $_POST['ctaLink'] ?? '';
    $order = (int)($_POST['order'] ?? 0);

    $stmt = $pdo->prepare("INSERT INTO hero_slides (heading, subtext, cta_text, cta_link, image_url, sort_order) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$heading, $subtext, $ctaText, $ctaLink, $imageUrl, $order]);
    respond(['id' => $pdo->lastInsertId()], 201);
}

if ($method === 'PUT') {
    requireAuth();
    $id = $_GET['id'] ?? null;
    if (!$id) respond(['error' => 'ID required'], 400);

    // PUT with file upload uses multipart — parse from POST
    $imageUrl = handleUpload('image', 'hero');
    $heading = $_POST['heading'] ?? '';
    $subtext = $_POST['subtext'] ?? '';
    $ctaText = $_POST['ctaText'] ?? '';
    $ctaLink = $_POST['ctaLink'] ?? '';
    $order = (int)($_POST['order'] ?? 0);

    $sql = "UPDATE hero_slides SET heading=?, subtext=?, cta_text=?, cta_link=?, sort_order=?";
    $params = [$heading, $subtext, $ctaText, $ctaLink, $order];
    if ($imageUrl) {
        $sql .= ", image_url=?";
        $params[] = $imageUrl;
    }
    $sql .= " WHERE id=?";
    $params[] = $id;
    $pdo->prepare($sql)->execute($params);
    respond(['success' => true]);
}

if ($method === 'DELETE') {
    requireAuth();
    $id = $_GET['id'] ?? null;
    if (!$id) respond(['error' => 'ID required'], 400);
    $pdo->prepare("DELETE FROM hero_slides WHERE id=?")->execute([$id]);
    respond(['success' => true]);
}
