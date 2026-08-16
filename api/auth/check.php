<?php
require_once __DIR__ . '/../config.php';

$user = requireAuth();
respond(['authenticated' => true, 'email' => $user['email']]);
