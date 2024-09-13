<?php 
require 'C:/xamppp/htdocs/Licenta/vendor/autoload.php';  
/*
This part down is for retrieving the data from the HTTP REQUESTS
//
///
/////
////////
*/ 

 
 if (isset($_SERVER['HTTP_ORIGIN'])) {
 
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}




$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE); 
 
$FirstName = $input['FirstName'];
$SecondName = $input['SecondName'];
$password = $input['password'];
$DateOfBirth = $input['DateOfBirth'];
$BloodType = $input['BloodType'];
$hashed_password = password_hash($password, PASSWORD_BCRYPT);
$image = $_FILES['image'] ?? null;
$email = $input['email'];

/*
FROM THIS DOWN IS THE DATABASE RELATED STUFF
////
///////
////////
/////////////
*/


$db_host = 'localhost';
$db_name = 'licenta';
$db_user = 'vladiasa';
$db_pass = '';

$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);


if(mysqli_connect_error()){
    echo mysqli_connect_error($conn);
}else{
    echo 'Connected successfully'; 
}

$SQL = "INSERT INTO user (FirstName, LastName,email, BloodType, BirthDate, Password )
VALUES (?, ?, ? ,?, ?,?)";

$stmt = mysqli_prepare($conn, $SQL);

mysqli_stmt_bind_param($stmt, 'ssssss', $FirstName, $SecondName,$email, $BloodType, $DateOfBirth, $hashed_password);


$results = mysqli_stmt_execute($stmt);

if(!$results){
    echo mysqli_stmt_error($stmt);
}else{
    echo 'Records inserted succesfully';
}















?>