<?php
header("Content-Type: application/json");


include_once('server.php');

// Allow CORS for development
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

// Read JSON input
$input = json_decode(file_get_contents("php://input"), true);
$tx_ref = $input['tx_ref'] ?? '';


$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$password = trim($input['password'] ?? '');
$membershitype = trim($input['membershipType'] ?? '');
$bio = trim($input['bio'] ?? '');
$tx_ref = trim($input['tx_ref'] ?? '');


$membership_status = "Active";
$rating = 0.0;


$stmt = $connection->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Email is already registered."
    ]);
    exit;
}


$hashedPassword = password_hash($password, PASSWORD_DEFAULT);


$connection->begin_transaction();
try {
    // Insert into User table
    $stmt = $connection->prepare("INSERT INTO users (username, full_name, email, password, role, bio) VALUES (?, ?, ?, ?, 'writer', ?)");
    $stmt->bind_param("sssss", $name, $name, $email, $hashedPassword, $bio);
    $stmt->execute();
    $user_id = $connection->insert_id;

    // Insert into Writer table
     $stmt_writer = $connection->prepare("
        INSERT INTO writer (tx_ref, name, email, password, bio, membership_type, status, rating)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt_writer->bind_param("sssssssd", $tx_ref, $name, $email, $password, $bio, $membership_type, $membership_status, $rating);
    $stmt_writer->execute();

    $connection->commit();

     $stmt_delete = $connection->prepare("DELETE FROM temp_registrations WHERE tx_ref = ?");
    $stmt_delete->bind_param("s", $tx_ref);
    $stmt_delete->execute();

    echo json_encode([
        "success" => true,
        "message" => "Payment successful. Writer registered!"
    ]);

} catch (Exception $e) {
    $connection->rollback();
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>