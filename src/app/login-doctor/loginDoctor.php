<?php
require 'C:/xamppp/htdocs/Licenta/vendor/autoload.php';
use \Firebase\JWT\JWT;
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
 
$password = $input['password'];
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
$db_pass = 'darius2vlad';



$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);



$sql = "SELECT id, FirstName, LastName, password, email FROM doctors WHERE email = ?";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, 's', $email );
mysqli_stmt_execute($stmt);

mysqli_stmt_bind_result($stmt, $id, $firstName, $lastName, $hashedpassword, $email);
mysqli_stmt_fetch($stmt);


if($email){
    if (password_verify($password , $hashedpassword)) {
        $secret_key = "bGS6lzFqvvSQ8ALbOxatm7/Vk7mLQyzqaS34Q4oR1ew=";
        $issuer_claim = "localhost"; 
        $audience_claim = "THE_AUDIENCE";
        $issuedat_claim = time(); // time issued 
        $expire_claim = $issuedat_claim + 60 * 60 * 5; 
        $token = array(
            "iss" => $issuer_claim,
            "aud" => $audience_claim,
            "iat" => $issuedat_claim, 
            "exp" => $expire_claim,
            "data" => array(
                "id" => $id,
                "firstName" => $firstName,
                "lastName" => $lastName,
                "userEmail" => $email,
                "AccountType" => '1'
               
        ));
        $jwtValue = JWT::encode($token, $secret_key, 'HS256');
        echo json_encode(
            array(
                "message" => "success",
                "token" => $jwtValue,
                "email_address" => $email,
                "expiry" => $expire_claim,
                "AccountType" => '1',
                "id" => $id
            ));
    } else {
        echo json_encode(array("success" => "false"));
    }
  
}
  else{
        echo 'email not found';
    }



















?>