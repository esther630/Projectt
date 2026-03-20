<?php
header("Content-Type: application/json");


include_once('server.php');

// Allow CORS for development
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();
$input = json_decode(file_get_contents("php://input"), true);

$tx_ref = $input['tx_ref'] ?? '';
$name = $input['name'] ?? '';
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';
$bio = $input['bio'] ?? '';
$membershipType = $input['membershipType'] ?? '';

$stmt = $connection->prepare("INSERT INTO temp_registrations (tx_ref, name, email, password, bio, membership_type) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $tx_ref, $name, $email, $password, $bio, $membershipType);
$stmt->execute();

echo json_encode(["success" => true]);
?>