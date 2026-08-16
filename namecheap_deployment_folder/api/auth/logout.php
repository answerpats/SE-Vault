<?php
require_once __DIR__ . '/../config.php';
// Token-based auth — logout is handled client-side by removing the token
respond(['success' => true]);
