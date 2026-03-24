<?php
header("Content-Type: application/json");
include_once('server.php');

// CORS for dev
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

// Get payment callback input
$input = json_decode(file_get_contents("php://input"), true);
$tx_ref = $input['tx_ref'] ?? '';


// Lookup temp registration
$stmt = $connection->prepare("SELECT * FROM temp_registrations WHERE tx_ref = ?");
$stmt->bind_param("s", $tx_ref);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows === 0) exit;

// Get data from temp registration
$data = $result->fetch_assoc();
$name = $data['name'];
$email = $data['email'];
$password = $data['password'];
$bio = $data['bio'];
$membership_type = $data['membership_type'];

$membership_status = "Active";
$rating = 0.0;

$connection->begin_transaction();
try {
    // Insert into writer table
    $stmt_writer = $connection->prepare("
        INSERT INTO writer (tx_ref, name, email, password, bio, membership_type, status, rating)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt_writer->bind_param("sssssssd", $tx_ref, $name, $email, $password, $bio, $membership_type, $membership_status, $rating);
    $stmt_writer->execute();

    $connection->commit();

    // Delete temp registration
    $stmt_delete = $connection->prepare("DELETE FROM temp_registrations WHERE tx_ref = ?");
    $stmt_delete->bind_param("s", $tx_ref);
    $stmt_delete->execute();

} catch (Exception $e) {
    $connection->rollback();
}
?>