<?php session_start();
require "../cors.php";
cors();
if(!isset($_SESSION['user'])){
    echo "access Denied";
    exit();
}
else{
    echo json_encode([
        "name" => $_SESSION['name'],
        "mail" => $_SESSION['mail'],
        "phone" => $_SESSION['phone'],
        "level" => $_SESSION['level'],
    ], JSON_UNESCAPED_UNICODE);
}
?>