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
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS,PUT");
    
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


$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE); 
 
$id = $input['id'];
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


$SQL = "UPDATE medicalForm 
        SET name = ?, 
            email = ?, 
            gender = ?, 
            diagnosis = ?, 
            allergies = ?, 
            medication = ?, 
            date = ?, 
            procedures = ?, 
            notes = ? 
        WHERE id = ?";

$SQL .= ";"; 

$stmt = mysqli_prepare($conn, $SQL);

mysqli_stmt_bind_param($stmt, 'ssssssssss', $name, $email, $gender, $diagnosis, $allergies, $medication, $date, $procedures, $notes, $id);

$results = mysqli_stmt_execute($stmt);

if (!$results) {
    echo mysqli_stmt_error($stmt);
} else {
    echo 'Records updated successfully';
}
?>