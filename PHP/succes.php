<?php
include_once ('server.php');
require __DIR__ . '/vendor/autoload.php';

$tx_ref = $_GET['tx_ref'];

$stmt = $connection->prepare("SELECT * FROM temp_registrations WHERE tx_ref = ?");
$stmt->bind_param("s", $tx_ref);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();

if (!$data) {
    die("No registration data found");
}

$name = $data['name'];
$email = $data['email'];
$password = $data['password'];
$bio = $data['bio'];
$membership_type = $data['membership_type'];
$tx_ref = $_GET['tx_ref'];
// fetch from DB instead
$membership_status = "Active";
$rating = 0.0;







$hashedPassword = password_hash($password, PASSWORD_DEFAULT);


$connection->begin_transaction();
try {

    // Insert into User table
    $stmt = $connection->prepare("INSERT INTO users (username, email, password, full_name, role, bio) VALUES (?, ?, ?, ?, 'writer', ?)");
    $stmt->bind_param("sssss", $name, $email, $hashedPassword, $name, $bio);
    $stmt->execute();
    $user_id = $connection->insert_id;


    // Insert into Writer table
     $stmt_writer = $connection->prepare("
        INSERT INTO writer (tx_ref, name, email, password, bio, membership_type, status, rating)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt_writer->bind_param("sssssssd", $tx_ref, $name, $email, $password, $bio, $membershiptype, $membership_status, $rating);
    $stmt_writer->execute();

    $connection->commit();

        $_SESSION['user'] = [
            "id" => $user_id,
            "name" => $name,
            "email" => $email
        ];

    $stmt_delete = $connection->prepare("DELETE FROM temp_registrations WHERE tx_ref = ?");
    $stmt_delete->bind_param("s", $tx_ref);
    $stmt_delete->execute();

    $connection->commit();

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
<!DOCTYPE html>
<html>
<head>
    <script src="js/sweetalert.min.js"></script>
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</head>
<body>

<script>
swal({
    title: "Payment Successful!",
    text: "Your transaction has been processed.",
    icon: "success",
    button: "OK"
}).then(function() {
    window.location.href = "http://localhost:5173";
});
</script>

</body>
</html>
<?php



?>