<?php 
require 'C:/xamppp/htdocs/Licenta/vendor/autoload.php';

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

header('Content-Type: application/json');

$response = [];

$FirstName = $_POST['firstName'] ?? '';
$SecondName = $_POST['secondName'] ?? '';
$password = $_POST['password'] ?? '';
$DoctorType = $_POST['doctorType'] ?? '';
$faculty = $_POST['faculty'] ?? '';
$email = $_POST['email'] ?? '';
$image = $_FILES['image'] ?? null;

if ($image && $image['error'] === UPLOAD_ERR_OK) {
    $target_save = $_SERVER['DOCUMENT_ROOT'] . "/Licenta/src/app/uploads/";  
    $target_file = $target_save . $FirstName . "_" . basename($image["name"]);
    if (!move_uploaded_file($image["tmp_name"], $target_file)) {
        $response['status'] = 'error';
        $response['message'] = 'Failed to move uploaded file.';
        echo json_encode($response);
        exit;
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'File upload error: ';
    switch ($image['error']) {
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            $response['message'] .= 'File too large.';
            break;
        case UPLOAD_ERR_PARTIAL:
            $response['message'] .= 'File upload was only partially completed.';
            break;
        case UPLOAD_ERR_NO_FILE:
            $response['message'] .= 'No file was uploaded.';
            break;
        case UPLOAD_ERR_NO_TMP_DIR:
            $response['message'] .= 'Missing a temporary folder.';
            break;
        case UPLOAD_ERR_CANT_WRITE:
            $response['message'] .= 'Failed to write file to disk.';
            break;
        case UPLOAD_ERR_EXTENSION:
            $response['message'] .= 'A PHP extension stopped the file upload.';
            break;
        default:
            $response['message'] .= 'Unknown error.';
            break;
    }
    echo json_encode($response);
    exit;
}

$hashed_password = password_hash($password, PASSWORD_BCRYPT);

use thiagoalessio\TesseractOCR\TesseractOCR;
$text = (new TesseractOCR($target_file))->lang('ron')->run();

$idrouPosition = strpos($text, "IDROU");

if ($idrouPosition !== false) {
    $extractedText = substr($text, $idrouPosition + strlen("IDROU"));
    $extractedText = trim(strip_tags($extractedText));
} else {
    $response['status'] = 'error';
    $response['message'] = "No match found for 'IDROU'.";
    echo json_encode($response);
    exit;
}

$savedFile = "http://localhost/Licenta/src/app/uploads/" . $FirstName . "_" . basename($image["name"]);

$db_host = 'localhost';
$db_name = 'licenta';
$db_user = 'vladiasa';
$db_pass = '';

$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

if (mysqli_connect_error()) {
    $response['status'] = 'error';
    $response['message'] = 'Database connection error: ' . mysqli_connect_error();
    echo json_encode($response);
    exit;
}

if (isset($extractedText) && isset($FirstName)) {
    $extractedText = trim($extractedText);
    $FirstName = trim($FirstName);
    $extractedTextLower = strtolower($extractedText);
    $FirstNameLower = strtolower($FirstName);

    if ($extractedTextLower === $FirstNameLower) {
        $emailExistsSQL = "SELECT * FROM doctors WHERE email = ?";
        $emailExistsStmt = mysqli_prepare($conn, $emailExistsSQL);
        mysqli_stmt_bind_param($emailExistsStmt, 's', $email);
        mysqli_stmt_execute($emailExistsStmt);
        mysqli_stmt_store_result($emailExistsStmt);
        $emailExists = mysqli_stmt_num_rows($emailExistsStmt) > 0;

        if ($emailExists) {
            $response['status'] = 'error';
            $response['message'] = 'Email already exists.';
        } else {
            $SQL = "INSERT INTO doctors (FirstName, LastName, email, DoctorType, faculty, password, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $SQL);
            mysqli_stmt_bind_param($stmt, 'sssssss', $FirstName, $SecondName, $email, $DoctorType, $faculty, $hashed_password, $savedFile);
            $results = mysqli_stmt_execute($stmt);

            if (!$results) {
                $response['status'] = 'error';
                $response['message'] = mysqli_stmt_error($stmt);
            } else {
                $response['status'] = 'success';
                $response['message'] = 'Records inserted successfully';
                $response['message'] = 'Id check completed succesfully';
            }
        }

        mysqli_close($conn);
    } else {
        $response['status'] = 'error';
        $response['message'] = 'First Name doesn\'t match. Expected: ' . $FirstName . ', Found: ' . $extractedText;
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Variables $extractedText and $FirstName are not set';
}

echo json_encode($response);
?>
