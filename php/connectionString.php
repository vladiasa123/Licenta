<?php

$db_host = 'localhost';
$db_name = 'licenta';
$db_user = 'vladiasa';
$db_pass = 'darius2vlad';



$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

if (mysqli_connect_error()) {
  echo mysqli_connect_error();
  }
else{
  echo 'The connection to the database was succesfull';
}



?>



