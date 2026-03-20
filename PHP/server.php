<?php
header("Access-Control-Allow-Origin: http://localhost:5173");


$host="localhost";
$username="root";
$password="";
$database="mawu";

$connection=mysqli_connect($host,$username,$password);

if($connection){
    //echo "connection successful<br>";
} else{
    die("connection unsucceful" .mysqli_connect_error());
} 


$query="CREATE DATABASE IF NOT EXISTS $database";
mysqli_query($connection,$query); 

$ret=mysqli_query($connection,$query);
if($ret){
    //echo"database created successfully <br>";
    }
    else{
        echo"error creating database".mysqli_error($connection);
    }

mysqli_select_db($connection,$database);
?>