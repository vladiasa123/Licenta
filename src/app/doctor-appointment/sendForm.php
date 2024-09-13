<?php
require 'C:/xamppp/htdocs/Licenta/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}


$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE); 

$DoctorId = $input['DoctorId'];
$email = $input['email']; 
$requests = $input['requests'];
$problems = $input['problem'];
$firstName = $input['FirstName'];
$secondName = $input['SecondName'];

include 'C:/xamppp/htdocs/Licenta/src/app/auth.php';
$UserId = getCurrentUserId(); 

var_dump($email);
var_dump($UserId);

$db_host = 'localhost';
$db_name = 'licenta';
$db_user = 'vladiasa';
$db_pass = '';

$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

if(mysqli_connect_error()){
    echo mysqli_connect_error($conn);
    exit();
} else {
    echo 'Connected successfully'; 
}


$SQL = "INSERT INTO appointments (UserID, DoctorID, Email, Requests, Problems)
VALUES (?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $SQL);
mysqli_stmt_bind_param($stmt, 'sssss', $UserId, $DoctorId, $email, $requests, $problems);
$results = mysqli_stmt_execute($stmt);

if ($results) {
    echo 'Data inserted successfully';

    $mail = new PHPMailer(true);

    try {
        $mail->SMTPDebug = 0;                      
        $mail->isSMTP();                          
        $mail->Host       = 'smtp.sendgrid.net';    
        $mail->SMTPAuth   = true;                 
        $mail->Username   = 'apikey'; 
        $mail->Password   = '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';      
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
        $mail->Port       = 587;                 
        $mail->setFrom('corpodeanvladvlad@gmail.com', 'Mailer');
        $mail->addAddress($email);                

        $mail->isHTML(true);                       
        $mail->Subject = 'Appointment Confirmation';
        $mail->Body = '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Appointment Notification</title>
    <style>
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            border: 1px solid #ddd;
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }

        .header {
            text-align: center;
        }

        .content {
            text-align: center;
            padding: 20px 0;
        }

        .buttonDiv {
            text-align: center;
            padding-top: 30px;
        }

        .yes, .no {
            width: 150px;
            height: 50px;
            font-size: 16px;
            border: 0px;
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px;
        }

        .yes {
            background-color: #AAFF00;
        }
        .no {
            background-color: #EE4B2B;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="h1">You received a new appointment</h1>
        </div>
        <div class="content">
            <h3>'. $firstName . ' ' . $secondName .' just made an appointment with you</h3>
            <h4>Do you wish to accept?</h4>
            <h4>'.$DoctorId.'<h4>
        </div>
        <div class="buttonDiv">
            <table align="center">
                <tr>
                    <td><a href="http://localhost:4200/acceptEmail?doctorId='.$DoctorId.'" class="yes">Yes</a></td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>';

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo 'Error inserting data';
}

mysqli_stmt_close($stmt);
mysqli_close($conn);


?>
