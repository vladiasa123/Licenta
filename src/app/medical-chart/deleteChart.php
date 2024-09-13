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
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
    
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

require 'C:\xamppp\htdocs\Licenta\src\app\auth.php';
$email = getCurrentUserEmail();

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

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    

$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
$id = $_GET['id'];

$SQL = "DELETE FROM medicalform  WHERE id = '$id'";
$stmt = mysqli_query($conn, $SQL);
mysqli_close($conn);

}




