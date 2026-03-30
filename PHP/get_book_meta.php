<?php
include 'server.php';

$languages = $connection->query("SELECT * FROM languages")->fetch_all(MYSQLI_ASSOC);
$tags = $connection->query("SELECT * FROM tags")->fetch_all(MYSQLI_ASSOC);

echo json_encode([
    "languages" => $languages,
    "tags" => $tags
]);