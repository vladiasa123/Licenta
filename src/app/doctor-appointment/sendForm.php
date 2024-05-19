<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'C:/xamppp/htdocs/Licenta/vendor/autoload.php';
require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

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

$DoctorId = $input['DoctorId'];
$email = $input['email']; 
$requests = $input['requests'];
$problems = $input['problem'];

$UserId = getCurrentUserId(); 
var_dump($UserId);

$db_host = 'localhost';
$db_name = 'licenta';
$db_user = 'vladiasa';
$db_pass = 'darius2vlad';

$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

if(mysqli_connect_error()){
    echo mysqli_connect_error($conn);
} else {
    echo 'Connected successfully'; 
}

$SQL = "INSERT INTO appointments (UserID, DoctorID, Email, Requests, Problems)
VALUES (?, ?, ? ,?, ?)";

$stmt = mysqli_prepare($conn, $SQL);

mysqli_stmt_bind_param($stmt, 'sssss', $UserId, $DoctorId, $email, $requests, $problems);

$results = mysqli_stmt_execute($stmt);

if(!$results){
    echo mysqli_stmt_error($stmt);
} else {
    echo 'Records inserted successfully';
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.mailersend.net'; // SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'MS_ZWnc8l@trial-351ndgwyrzqlzqx8.mlsender.net'; // SMTP username
        $mail->Password   = 'owqSyFdcPSyzqgi9'; // SMTP password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587; // TCP port to connect to

        //Recipients
        $mail->setFrom('corpodeanvladvlad@gmail.com', 'Your Name');
        $mail->addAddress($email); 

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Appointment Confirmation';
        $mail->Body    = 'Your appointment has been successfully scheduled.';

        $mail->send();
        echo 'Email has been sent successfully';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
