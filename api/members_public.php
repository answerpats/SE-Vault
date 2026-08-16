<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(['error' => 'Method not allowed'], 405);
}

$body = jsonBody();
$name = trim($body['name'] ?? '');
$phone = trim($body['phone'] ?? '');

if (!$name || !$phone) {
    respond(['error' => 'Name and phone are required'], 400);
}

$pdo = getDB();
$stmt = $pdo->prepare("INSERT INTO members (name, phone, status) VALUES (?, ?, 'pending')");
$stmt->execute([$name, $phone]);
respond(['success' => true, 'id' => $pdo->lastInsertId()], 201);
