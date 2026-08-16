<?php
require_once __DIR__ . '/config.php';
$pdo = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $rows = $pdo->query("SELECT setting_key, setting_value FROM site_settings")->fetchAll();
    $settings = [];
    foreach ($rows as $row) {
        $val = $row['setting_value'];
        if ($val === 'true') $val = true;
        elseif ($val === 'false') $val = false;
        $settings[$row['setting_key']] = $val;
    }
    respond($settings);
}

if ($method === 'POST') {
    requireAuth();
    $body = jsonBody();
    foreach ($body as $key => $value) {
        $strVal = is_bool($value) ? ($value ? 'true' : 'false') : (string)$value;
        $pdo->prepare("INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value=?")
            ->execute([$key, $strVal, $strVal]);
    }
    respond(['success' => true]);
}
