<?php
header("Content-Type: application/json");

// CORS headers for development
$allowedOrigin = "http://localhost:5173";
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); // must be true if sending cookies

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

session_start();
include_once('server.php');

// Make sure user is logged in
$user_id = $_SESSION['user_id'] ?? null;
if (!$user_id) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

// Get form data
$title = trim($_POST['title'] ?? '');
$description = trim($_POST['description'] ?? '');
$language = trim($_POST['language'] ?? '');
$is_premium = intval($_POST['is_premium'] ?? 0);
$price_coins = intval($_POST['price_coins'] ?? 0);
$status = trim($_POST['status'] ?? 'draft'); // draft or review
$tags = $_POST['tags'] ?? []; // array of tag IDs

// Handle cover image upload
$cover_path = null;
if (isset($_FILES['cover_image']) && $_FILES['cover_image']['error'] === 0) {
    $fileName = time() . "_" . basename($_FILES['cover_image']['name']);
    $uploadPath = "uploads/" . $fileName;
    if (move_uploaded_file($_FILES['cover_image']['tmp_name'], $uploadPath)) {
        $cover_path = $uploadPath;
    }
}

// Insert into books and book_tags
$connection->begin_transaction();

try {
    $stmt = $connection->prepare("
        INSERT INTO books (title, description, language, cover_image, is_premium, price_coins, user_id, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->bind_param(
        "ssisiiss",
        $title,
        $description,
        $language,
        $cover_path,
        $is_premium,
        $price_coins,
        $user_id,
        $status
    );
    $stmt->execute();
    $book_id = $connection->insert_id;

    if (!empty($tags)) {
        $stmtTag = $connection->prepare("INSERT INTO book_tags (book_id, tag_id) VALUES (?, ?)");
        foreach ($tags as $tag_id) {
            $tag_id = intval($tag_id);
            $stmtTag->bind_param("ii", $book_id, $tag_id);
            $stmtTag->execute();
        }
    }

    $connection->commit();

    echo json_encode([
        "success" => true,
        "message" => "Book created successfully",
        "book_id" => $book_id
    ]);

} catch (Exception $e) {
    $connection->rollback();
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}