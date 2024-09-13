<?php 
/*
This part down is for retrieving the data from the HTTP REQUESTS
//
///
/////
////////
*/


 if (isset($_SERVER['HTTP_ORIGIN'])) {
 
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}



/*
FROM THIS DOWN IS THE DATABASE RELATED STUFF
////
///////
////////
/////////////
*/                                                      
require 'C:\xamppp\htdocs\Licenta\src\app\auth.php';
$DoctorEmail = getCurrentUserEmail();
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE); 
 
$name = $input['name'];
$email = $input['email'];
$gender = $input['gender'];
$diagnosis = $input['diagnosis'];
$allergies = $input['allergies'];
$medication = $input['medication'];
$date = $input['date'];
$procedures = $input['procedures'];
$notes = $input['notes'];



$db_host = 'localhost';
$db_name = 'licenta';
$db_user = 'vladiasa';
$db_pass = 'darius2vlad';

$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);


$emailExistsSQL = "SELECT * FROM medicalForm WHERE email = ?";
$emailExistsStmt = mysqli_prepare($conn, $emailExistsSQL);
mysqli_stmt_bind_param($emailExistsStmt, 's', $email);
mysqli_stmt_execute($emailExistsStmt);
mysqli_stmt_store_result($emailExistsStmt);
$emailExists = mysqli_stmt_num_rows($emailExistsStmt) > 0;

if ($emailExists) {
    echo "Email already exists.";
} else {
    $insertSQL = "INSERT INTO medicalForm (DoctorEmail, name,email,gender, diagnosis, allergies, medication, date, procedures, notes)
    VALUES (?, ?, ?, ? ,?, ?,?, ?,?,?)";

    $insertStmt = mysqli_prepare($conn, $insertSQL);
    mysqli_stmt_bind_param($insertStmt, 'ssssssssss', $DoctorEmail, $name,$email,$gender, $diagnosis, $allergies, $medication, $date, $procedures, $notes);

    $results = mysqli_stmt_execute($insertStmt);

    if(!$results){
        echo mysqli_stmt_error($insertStmt);
    } else {
        echo 'Records inserted successfully';
    }
}

mysqli_close($conn);









?>