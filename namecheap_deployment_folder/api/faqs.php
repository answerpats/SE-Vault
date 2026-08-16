<?php
require_once __DIR__ . '/config.php';
$pdo = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $rows = $pdo->query("SELECT * FROM faqs ORDER BY sort_order ASC")->fetchAll();
    respond($rows);
}

if ($method === 'POST') {
    requireAuth();
    $body = jsonBody();
    $question = $body['question'] ?? '';
    $answer = $body['answer'] ?? '';
    $order = (int)($body['order'] ?? 0);

    $stmt = $pdo->prepare("INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)");
    $stmt->execute([$question, $answer, $order]);
    respond(['id' => $pdo->lastInsertId()], 201);
}

if ($method === 'PUT') {
    requireAuth();
    $id = $_GET['id'] ?? null;
    if (!$id) respond(['error' => 'ID required'], 400);
    $body = jsonBody();
    $question = $body['question'] ?? '';
    $answer = $body['answer'] ?? '';
    $order = (int)($body['order'] ?? 0);

    $pdo->prepare("UPDATE faqs SET question=?, answer=?, sort_order=? WHERE id=?")->execute([$question, $answer, $order, $id]);
    respond(['success' => true]);
}

if ($method === 'DELETE') {
    requireAuth();
    $id = $_GET['id'] ?? null;
    if (!$id) respond(['error' => 'ID required'], 400);
    $pdo->prepare("DELETE FROM faqs WHERE id=?")->execute([$id]);
    respond(['success' => true]);
}
