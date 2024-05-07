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


$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE); 
 
$FirstName = $_POST['firstName'];
$SecondName = $_POST['secondName'];
$password = $_POST['password'];
$DoctorType = $_POST['doctorType'];
$faculty = $_POST['faculty'];
$hashed_password = password_hash($password, PASSWORD_BCRYPT);
$email = $_POST['email'];
$image = $_FILES['image'];


$target_dir = $_SERVER['DOCUMENT_ROOT'] . "/Licenta/src/app/uploads/"; 
$target_file = $target_dir . $FirstName . "_" . basename($_FILES["image"]["name"]);
move_uploaded_file($_FILES["image"]["tmp_name"], $target_file);


$savedFile = $target_file;

echo $savedFile;




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

if(mysqli_connect_error()){
    echo mysqli_connect_error($conn);
}else{
    echo 'Connected successfully'; 
}

$SQL = "INSERT INTO doctors (FirstName, LastName,email, DoctorType, faculty, password, image)
VALUES (?, ?, ? ,?, ?,?, ?)";

$stmt = mysqli_prepare($conn, $SQL);

mysqli_stmt_bind_param($stmt, 'sssssss', $FirstName, $SecondName,$email, $DoctorType, $faculty, $hashed_password, $target_file);


$results = mysqli_stmt_execute($stmt);

if(!$results){
    echo mysqli_stmt_error($stmt);
}else{
    echo 'Records inserted succesfully';
}















?>