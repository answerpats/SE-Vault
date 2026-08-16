<?php
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(['error' => 'Method not allowed'], 405);
}

$body = jsonBody();
$email = trim($body['email'] ?? '');
$password = $body['password'] ?? '';

if (!$email || !$password) {
    respond(['error' => 'Email and password required'], 400);
}

$pdo = getDB();
$stmt = $pdo->prepare("SELECT id, email, password_hash FROM admin_users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    respond(['error' => 'Invalid credentials'], 401);
}

$token = generateToken($user['id'], $user['email']);
respond(['token' => $token, 'email' => $user['email']]);
