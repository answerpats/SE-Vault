<?php
require_once __DIR__ . '/config.php';

$pdo = getDB();

$queries = [
    "CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",

    "CREATE TABLE IF NOT EXISTS hero_slides (
        id INT AUTO_INCREMENT PRIMARY KEY,
        heading VARCHAR(255) NOT NULL,
        subtext TEXT,
        cta_text VARCHAR(255) DEFAULT '',
        cta_link VARCHAR(255) DEFAULT '',
        image_url VARCHAR(500) DEFAULT '',
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",

    "CREATE TABLE IF NOT EXISTS packages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255) DEFAULT '',
        description TEXT,
        price VARCHAR(100) DEFAULT '',
        image_url VARCHAR(500) DEFAULT '',
        icon VARCHAR(100) DEFAULT 'Package',
        features TEXT,
        highlighted TINYINT(1) DEFAULT 0,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",

    "CREATE TABLE IF NOT EXISTS updates_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(500) DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",

    "CREATE TABLE IF NOT EXISTS gallery (
        id INT AUTO_INCREMENT PRIMARY KEY,
        caption VARCHAR(255) DEFAULT '',
        image_url VARCHAR(500) DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",

    "CREATE TABLE IF NOT EXISTS value_vault (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        content TEXT,
        image_url VARCHAR(500) DEFAULT '',
        pdf_url VARCHAR(500) DEFAULT '',
        category VARCHAR(100) DEFAULT 'Business Templates',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",

    "CREATE TABLE IF NOT EXISTS faqs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",

    "CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        author VARCHAR(255) NOT NULL,
        role VARCHAR(255) DEFAULT '',
        content TEXT NOT NULL,
        avatar VARCHAR(500) DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",

    "CREATE TABLE IF NOT EXISTS members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        status ENUM('pending','approved','rejected') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",

    "CREATE TABLE IF NOT EXISTS site_settings (
        setting_key VARCHAR(100) PRIMARY KEY,
        setting_value TEXT
    )",
];

$results = [];
foreach ($queries as $sql) {
    try {
        $pdo->exec($sql);
        preg_match('/CREATE TABLE IF NOT EXISTS (\w+)/', $sql, $m);
        $results[] = "Created table: " . ($m[1] ?? 'unknown');
    } catch (PDOException $e) {
        $results[] = "Error: " . $e->getMessage();
    }
}

// Upgrade older `value_vault` tables that predate category or content columns
try {
    $vvCols = [];
    foreach ($pdo->query("SHOW COLUMNS FROM value_vault")->fetchAll() as $col) {
        $vvCols[] = $col['Field'];
    }
    if (!in_array('category', $vvCols, true)) {
        $pdo->exec("ALTER TABLE value_vault ADD COLUMN category VARCHAR(100) DEFAULT 'Business Templates'");
        $results[] = "Added value_vault column: category";
    }
    if (!in_array('content', $vvCols, true)) {
        $pdo->exec("ALTER TABLE value_vault ADD COLUMN content TEXT");
        $results[] = "Added value_vault column: content";
    }
} catch (PDOException $e) {
    $results[] = "Value vault migration error: " . $e->getMessage();
}

// Upgrade older `packages` tables that predate editable core packages
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
            $results[] = "Added packages column: $column";
        }
    }
} catch (PDOException $e) {
    $results[] = "Packages migration error: " . $e->getMessage();
}

// Seed the four core service packages so they are editable from the admin.
// Only runs on an empty table, so admin edits are never overwritten.
if ($pdo->query("SELECT COUNT(*) FROM packages")->fetchColumn() == 0) {
    $corePackages = [
        [
            'title' => 'Starter Package',
            'subtitle' => 'Small Business Support',
            'description' => 'Essential business support services designed for startups and small enterprises looking to build a strong operational foundation.',
            'icon' => 'Briefcase',
            'features' => ['Business registration & compliance', 'Basic bookkeeping & tax filing', 'Administrative support', 'Monthly advisory sessions'],
            'highlighted' => 0,
        ],
        [
            'title' => 'Portfolio Package',
            'subtitle' => 'Brand & Portfolio Management',
            'description' => 'Build and showcase your professional identity with a compelling digital presence that attracts clients and opportunities.',
            'icon' => 'Palette',
            'features' => ['Professional portfolio website', 'Brand identity & design', 'Social media setup & strategy', 'Content creation support'],
            'highlighted' => 1,
        ],
        [
            'title' => 'Commerce Suite',
            'subtitle' => 'E-Commerce Solutions',
            'description' => 'End-to-end e-commerce solutions to help you sell online with confidence — from storefront to payment processing.',
            'icon' => 'ShoppingCart',
            'features' => ['Online store development', 'Payment gateway integration', 'Inventory management setup', 'Digital marketing & SEO'],
            'highlighted' => 0,
        ],
        [
            'title' => 'Enterprise Systems',
            'subtitle' => 'Business Systems',
            'description' => 'Comprehensive systems integration and digital transformation consulting for established businesses ready to scale.',
            'icon' => 'Server',
            'features' => ['ERP & CRM implementation', 'Financial systems setup', 'Process automation', 'Staff training & onboarding'],
            'highlighted' => 0,
        ],
    ];

    $stmt = $pdo->prepare(
        "INSERT INTO packages (title, subtitle, description, price, image_url, icon, features, highlighted, sort_order)
         VALUES (?, ?, ?, '', '', ?, ?, ?, ?)"
    );
    foreach ($corePackages as $i => $pkg) {
        $stmt->execute([
            $pkg['title'],
            $pkg['subtitle'],
            $pkg['description'],
            $pkg['icon'],
            json_encode($pkg['features']),
            $pkg['highlighted'],
            $i,
        ]);
    }
    $results[] = "Seeded " . count($corePackages) . " core service packages (now editable in admin)";
}

// Insert default admin user if none exists
$stmt = $pdo->query("SELECT COUNT(*) FROM admin_users");
if ($stmt->fetchColumn() == 0) {
    $hash = password_hash('admin123', PASSWORD_DEFAULT);
    $pdo->prepare("INSERT INTO admin_users (email, password_hash) VALUES (?, ?)")
        ->execute(['admin@seandassociates.com', $hash]);
    $results[] = "Created default admin: admin@seandassociates.com / admin123";
}

// Insert default site settings
$defaults = [
    'phone' => '0761 140132',
    'email' => 'Seandassociates@gmail.com',
    'announcementText' => '',
    'announcementEnabled' => 'false',
];
foreach ($defaults as $key => $val) {
    $pdo->prepare("INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES (?, ?)")
        ->execute([$key, $val]);
}
$results[] = "Default site settings initialized";

respond(['success' => true, 'results' => $results]);
