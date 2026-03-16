<?php
header ('Access-control-Allow-origin: http://localhost:5173');

$conn = new mysqli("localhost", "root","","mawu");

if(mysqli_connect_error()){
    echo mysqli_connect_error();
    exit();
}else{
    $username = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "INSERT INTO users(username,email,password) VALUES('$username','$email','$password');";
    $result = mysqli_query($conn,$sql);

    if($result){
        echo "sucessfully connected to database";
    }
    else{
        echo "error connecting to database";
    }
}




?>