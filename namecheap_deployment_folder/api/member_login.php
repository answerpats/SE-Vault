<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(['error' => 'Method not allowed'], 405);
}

$body  = jsonBody();
$phone = trim($body['phone'] ?? '');

if (!$phone) {
    respond(['error' => 'Phone number is required'], 400);
}

$pdo  = getDB();
$stmt = $pdo->prepare("SELECT id, name, status FROM members WHERE phone = ? LIMIT 1");
$stmt->execute([$phone]);
$member = $stmt->fetch();

if (!$member) {
    respond(['error' => 'No account found with that phone number. Please sign up for membership first.'], 404);
}

if ($member['status'] === 'pending') {
    respond(['error' => 'Your membership application is still under review. Please check back soon.'], 403);
}

if ($member['status'] === 'rejected') {
    respond(['error' => 'Your membership application was not approved. Please contact us for more information.'], 403);
}

if ($member['status'] !== 'approved') {
    respond(['error' => 'Access denied.'], 403);
}

respond(['success' => true, 'name' => $member['name'], 'id' => $member['id']]);
