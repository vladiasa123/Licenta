<?php
require 'C:/xamppp/htdocs/Licenta/vendor/autoload.php';
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

if (! preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
    header('HTTP/1.0 400 Bad Request');
    echo 'Token not found in request';
    exit;
}

$jwt = $matches[1];
if (! $jwt) {
    header('HTTP/1.0 400 Bad Request');
    exit;
}

$secretKey  = 'bGS6lzFqvvSQ8ALbOxatm7/Vk7mLQyzqaS34Q4oR1ew=';
$token = JWT::decode($jwt, new Key($secretKey, 'HS256'));
$now = new DateTimeImmutable();
$serverName = "localhost";




if ($token->iss !== $serverName ||
    $token->exp < $now->getTimestamp())
{
    header('HTTP/1.1 401 Unauthorized');
    exit;
}

function getCurrentUserEmail() {
    if (! preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
        header('HTTP/1.0 400 Bad Request');
        echo 'Token not found in request';
        exit;
    }
    
    $jwt = $matches[1];
    
    $secretKey  = 'bGS6lzFqvvSQ8ALbOxatm7/Vk7mLQyzqaS34Q4oR1ew=';
    $token = JWT::decode($jwt, new Key($secretKey, 'HS256'));
    return $token->data->userEmail;
}

function getCurrentUserId() {
    if (! preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
        header('HTTP/1.0 400 Bad Request');
        echo 'Token not found in request';
        exit;
    }
    
    $jwt = $matches[1];
    
    $secretKey  = 'bGS6lzFqvvSQ8ALbOxatm7/Vk7mLQyzqaS34Q4oR1ew=';
    $token = JWT::decode($jwt, new Key($secretKey, 'HS256'));
    return $token->data->id;
}



?>
