<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database config — Namecheap production credentials
define('DB_HOST', 'localhost');
define('DB_PORT', '3306');
define('DB_NAME', 'shoplgkr_sevault');
define('DB_USER', 'shoplgkr_answerpats');
define('DB_PASS', '47[5#xMYZ&R~');

// Auth secret for token signing
define('AUTH_SECRET', 'se-associates-secret-change-in-production');

// Upload directory (relative to api/)
define('UPLOAD_DIR', __DIR__ . '/../uploads/');

function getDB() {
    static $pdo = null;

    if ($pdo === null) {
        try {
            $dsn = 'mysql:host=' . DB_HOST .
                   ';port=' . DB_PORT .
                   ';dbname=' . DB_NAME .
                   ';charset=utf8mb4';

            $pdo = new PDO(
                $dsn,
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ]
            );
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database connection failed', 'message' => $e->getMessage()]);
            exit;
        }
    }

    return $pdo;
}

function generateToken($userId, $email) {
    $payload = json_encode([
        'id'    => $userId,
        'email' => $email,
        'exp'   => time() + (86400 * 7), // 7 days
    ]);

    $encoded   = base64_encode($payload);
    $signature = hash_hmac('sha256', $encoded, AUTH_SECRET);

    return $encoded . '.' . $signature;
}

function verifyToken($token) {
    $parts = explode('.', $token);

    if (count($parts) !== 2) {
        return null;
    }

    [$encoded, $signature] = $parts;

    $expected = hash_hmac('sha256', $encoded, AUTH_SECRET);

    if (!hash_equals($expected, $signature)) {
        return null;
    }

    $payload = json_decode(base64_decode($encoded), true);

    if (!$payload || $payload['exp'] < time()) {
        return null;
    }

    return $payload;
}

function requireAuth() {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

    if (!preg_match('/^Bearer\s+(.+)$/i', $header, $matches)) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    $user = verifyToken($matches[1]);

    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid or expired token']);
        exit;
    }

    return $user;
}

function handleUpload($fieldName, $subfolder) {
    if (
        !isset($_FILES[$fieldName]) ||
        $_FILES[$fieldName]['error'] !== UPLOAD_ERR_OK
    ) {
        return '';
    }

    $file      = $_FILES[$fieldName];
    $directory = UPLOAD_DIR . $subfolder . '/';

    if (!is_dir($directory)) {
        mkdir($directory, 0755, true);
    }

    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'];

    if (!in_array($extension, $allowedExtensions)) {
        http_response_code(400);
        echo json_encode(['error' => 'File type not allowed']);
        exit;
    }

    $maxSize = ($extension === 'pdf') ? 10 * 1024 * 1024 : 5 * 1024 * 1024;

    if ($file['size'] > $maxSize) {
        http_response_code(400);
        echo json_encode(['error' => 'File too large']);
        exit;
    }

    $filename    = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '', $file['name']);
    $destination = $directory . $filename;

    if (!move_uploaded_file($file['tmp_name'], $destination)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to upload file']);
        exit;
    }

    return 'uploads/' . $subfolder . '/' . $filename;
}

function jsonBody() {
    return json_decode(file_get_contents('php://input'), true) ?? [];
}

function respond($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}
