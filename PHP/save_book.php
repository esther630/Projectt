<?php
include 'server.php';

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];
$title = $data['title'];
$category = $data['category'];
$language = $data['language'];
$description = $data['description'];
$status = $data['status'];
$chapters = $data['chapters'];
$tags = $data['tags'];

$connection->begin_transaction();

try {

    // 1. Insert book
    $stmt = $connection->prepare("
        INSERT INTO books (user_id, title, category, language, description, status)
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->bind_param("isssss", $user_id, $title, $category, $language, $description, $status);
    $stmt->execute();

    $book_id = $connection->insert_id;

    // 2. Insert chapters
    foreach ($chapters as $ch) {
        $stmt_ch = $connection->prepare("
            INSERT INTO chapters (book_id, title, content)
            VALUES (?, ?, ?)
        ");
        $stmt_ch->bind_param("iss", $book_id, $ch['title'], $ch['content']);
        $stmt_ch->execute();
    }

    // 3. Insert tags
    foreach ($tags as $tag_id) {
        $stmt_tag = $connection->prepare("
            INSERT INTO book_tags (book_id, tag_id)
            VALUES (?, ?)
        ");
        $stmt_tag->bind_param("ii", $book_id, $tag_id);
        $stmt_tag->execute();
    }

    $connection->commit();

    echo json_encode(["success" => true]);

} catch (Exception $e) {
    $connection->rollback();
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>