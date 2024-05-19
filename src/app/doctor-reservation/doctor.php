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
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        // may also be using PUT, PATCH, HEAD etc
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

$db_host = 'localhost';
$db_name = 'licenta';
$db_user = 'vladiasa';
$db_pass = 'darius2vlad';

$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);


if (($_GET['doctorType']) != null) {
    $doctorType = $_GET['doctorType'];
    $SQL = "SELECT id, FirstName, LastName, DoctorType, image FROM doctors WHERE DoctorType = '$doctorType'";
} else if(($_GET['doctorType']) == 'All') {
    $SQL = "SELECT id, FirstName, LastName, DoctorType, image FROM doctors";
}

$stmt = mysqli_query($conn, $SQL);

$doctors = array();

while ($row = mysqli_fetch_assoc($stmt)) {
    $doctors[] = $row;
}

mysqli_close($conn);

header('Content-Type: application/json');
print json_encode($doctors);
?>
