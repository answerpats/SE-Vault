<?php
require_once __DIR__ . '/config.php';
$pdo = getDB();
$method = $_SERVER['REQUEST_METHOD'];

ensurePackageColumns($pdo);

/**
 * Adds the richer package columns to installations created before core
 * packages became editable. Safe to run on every request.
 */
function ensurePackageColumns($pdo) {
    static $done = false;
    if ($done) return;
    $done = true;

    try {
        $existing = [];
        foreach ($pdo->query("SHOW COLUMNS FROM packages")->fetchAll() as $col) {
            $existing[] = $col['Field'];
        }

        $additions = [
            'subtitle'    => "ALTER TABLE packages ADD COLUMN subtitle VARCHAR(255) DEFAULT ''",
            'features'    => "ALTER TABLE packages ADD COLUMN features TEXT",
            'icon'        => "ALTER TABLE packages ADD COLUMN icon VARCHAR(100) DEFAULT 'Package'",
            'highlighted' => "ALTER TABLE packages ADD COLUMN highlighted TINYINT(1) DEFAULT 0",
            'sort_order'  => "ALTER TABLE packages ADD COLUMN sort_order INT DEFAULT 0",
        ];

        foreach ($additions as $column => $sql) {
            if (!in_array($column, $existing, true)) {
                $pdo->exec($sql);
            }
        }
    } catch (PDOException $e) {
        // Table may not exist yet — setup.php will create it correctly.
    }
}

/** Normalises a features payload (JSON array or newline list) to a JSON array. */
function normaliseFeatures($raw) {
    if ($raw === null || $raw === '') return json_encode([]);

    if (is_array($raw)) {
        $list = $raw;
    } else {
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            $list = $decoded;
        } else {
            $list = preg_split('/\r\n|\r|\n/', (string)$raw);
        }
    }

    $clean = [];
    foreach ($list as $item) {
        if (!is_scalar($item)) continue;
        $item = trim((string)$item);
        if ($item !== '') $clean[] = $item;
    }
    return json_encode(array_values($clean));
}

/** Decodes stored features back into a real array for API consumers. */
function decodeFeatures($value) {
    if ($value === null || $value === '') return [];
    $decoded = json_decode($value, true);
    if (is_array($decoded)) return array_values(array_filter($decoded, 'is_scalar'));
    $list = preg_split('/\r\n|\r|\n/', (string)$value);
    return array_values(array_filter(array_map('trim', $list), fn($v) => $v !== ''));
}

if ($method === 'GET') {
    $rows = $pdo->query("SELECT * FROM packages ORDER BY sort_order ASC, created_at ASC")->fetchAll();
    foreach ($rows as &$row) {
        $row['features'] = decodeFeatures($row['features'] ?? '');
        $row['highlighted'] = (bool)($row['highlighted'] ?? false);
        $row['sort_order'] = (int)($row['sort_order'] ?? 0);
    }
    respond($rows);
}

// POST and PUT share one handler. Browsers cannot send a multipart PUT via
// XHR upload progress, so the client uploads images as POST with ?id= set —
// an id therefore always means "update", never "insert".
if ($method === 'POST' || $method === 'PUT') {
    requireAuth();

    // Multipart requests populate $_POST; a JSON PUT arrives in the raw body.
    $body = !empty($_POST) ? $_POST : jsonBody();
    $id = $_GET['id'] ?? null;

    $title       = trim($body['title'] ?? '');
    $subtitle    = $body['subtitle'] ?? '';
    $description = $body['description'] ?? '';
    $price       = $body['price'] ?? '';
    $icon        = $body['icon'] ?? 'Package';
    $features    = normaliseFeatures($body['features'] ?? '');
    $highlighted = filter_var($body['highlighted'] ?? false, FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
    $order       = (int)($body['order'] ?? 0);

    if ($title === '') respond(['error' => 'Title is required'], 400);

    $imageUrl = handleUpload('image', 'packages');

    if ($id) {
        $sql = "UPDATE packages SET title=?, subtitle=?, description=?, price=?, icon=?, features=?, highlighted=?, sort_order=?";
        $params = [$title, $subtitle, $description, $price, $icon, $features, $highlighted, $order];
        if ($imageUrl) {
            $sql .= ", image_url=?";
            $params[] = $imageUrl;
        }
        $sql .= " WHERE id=?";
        $params[] = $id;

        $pdo->prepare($sql)->execute($params);
        respond(['success' => true, 'id' => (int)$id]);
    }

    $stmt = $pdo->prepare(
        "INSERT INTO packages (title, subtitle, description, price, image_url, icon, features, highlighted, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $stmt->execute([$title, $subtitle, $description, $price, $imageUrl, $icon, $features, $highlighted, $order]);
    respond(['id' => $pdo->lastInsertId()], 201);
}

if ($method === 'DELETE') {
    requireAuth();
    $id = $_GET['id'] ?? null;
    if (!$id) respond(['error' => 'ID required'], 400);
    $pdo->prepare("DELETE FROM packages WHERE id=?")->execute([$id]);
    respond(['success' => true]);
}
