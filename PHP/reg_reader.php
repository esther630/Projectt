<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

session_start();
include_once('server.php');

$input = json_decode(file_get_contents("php://input"), true);

$name     = trim($input['name']     ?? '');
$email    = trim($input['email']    ?? '');
$password = trim($input['password'] ?? '');

if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

// Check if email already exists
$stmt = $connection->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->get_result()->num_rows > 0 && die(json_encode([
    "success" => false,
    "message" => "Email is already registered."
]));

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Fixed: use fully parameterized query (no string interpolation)
$stmt = $connection->prepare("INSERT INTO users (username, full_name, email, password, role) VALUES (?, ?, ?, ?, 'reader')");
$stmt->bind_param("ssss", $name, $name, $email, $hashedPassword);

if ($stmt->execute()) {
    $user_id = $connection->insert_id;

    // Set session so frontend knows who is logged in
    $_SESSION['user'] = [
        'id'    => $user_id,
        'name'  => $name,
        'email' => $email,
        'role'  => 'reader'
    ];

    echo json_encode([
        "success" => true,
        "message" => "User registered successfully",
        "user" => [
            "id"    => $user_id,
            "name"  => $name,
            "email" => $email,
            "role"  => "reader"
        ]
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Database error: " . $stmt->error]);
}

$stmt->close();
$connection->close();
?>