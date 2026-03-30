<?php
session_start();
include_once('server.php');
require __DIR__ . '/vendor/autoload.php';

$tx_ref = $_GET['tx_ref'] ?? '';
$error  = null;
$user   = null;

if (empty($tx_ref)) {
    $error = "Missing transaction reference.";
} else {
    $stmt = $connection->prepare("SELECT * FROM temp_registrations WHERE tx_ref = ?");
    $stmt->bind_param("s", $tx_ref);
    $stmt->execute();
    $data = $stmt->get_result()->fetch_assoc();

    if (!$data) {
        $error = "No registration data found.";
    } else {
        $name              = $data['name'];
        $email             = $data['email'];
        $password          = $data['password'];
        $bio               = $data['bio'];
        $membership_type   = $data['membership_type'];
        $membership_status = "Active";
        $rating            = 0.0;

        $stmt = $connection->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();

        if ($stmt->get_result()->num_rows > 0) {
            $error = "This email is already registered.";
        } else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $connection->begin_transaction();

            try {
                $stmt = $connection->prepare(
                    "INSERT INTO users (username, email, password, full_name, role, bio) VALUES (?, ?, ?, ?, 'writer', ?)"
                );
                $stmt->bind_param("sssss", $name, $email, $hashedPassword, $name, $bio);
                $stmt->execute();
                $user_id = $connection->insert_id;

                $stmt_writer = $connection->prepare(
                    "INSERT INTO writer (tx_ref, name, email, password, bio, membership_type, status, rating)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
                );
                $stmt_writer->bind_param(
                    "sssssssd",
                    $tx_ref, $name, $email, $hashedPassword, $bio, $membership_type, $membership_status, $rating
                );
                $stmt_writer->execute();

                $stmt_delete = $connection->prepare("DELETE FROM temp_registrations WHERE tx_ref = ?");
                $stmt_delete->bind_param("s", $tx_ref);
                $stmt_delete->execute();

                $connection->commit();

                $_SESSION['user'] = [
                    'id'    => $user_id,
                    'name'  => $name,
                    'email' => $email,
                    'role'  => 'writer'
                ];

                $user = [
                    'id'    => $user_id,
                    'name'  => $name,
                    'email' => $email,
                    'role'  => 'writer'
                ];

            } catch (Exception $e) {
                $connection->rollback();
                $error = "Database error: " . $e->getMessage();
            }
        }
    }

    $connection->close();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Payment Status</title>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</head>
<body>
<script>
<?php if ($error): ?>
    swal({
        title: "Registration Failed",
        text: <?= json_encode($error) ?>,
        icon: "error",
        button: "OK"
    });
<?php else: ?>
    localStorage.setItem("user", <?= json_encode(json_encode($user)) ?>);

    swal({
        title: "Payment Successful!",
        text: "Welcome, <?= htmlspecialchars($user['name']) ?>! Your account is ready.",
        icon: "success",
        button: "Go to Dashboard"
    }).then(function() {
        window.location.href = "http://localhost:5173/writer/Writerstudio";
    });
<?php endif; ?>
</script>
</body>
</html>