<?php session_start();

require "../cors.php";
cors();

if(!isset($_SESSION['user'])){
    header("Location: http://localhost:3000");
    exit();
}
else{
    unset($_SESSION['user']);
    unset($_SESSION['name']);
    unset($_SESSION['phone']);
    unset($_SESSION['mail']);
    unset($_SESSION['level']);
    unset($_SESSION['start_time']);
    session_destroy();
    session_start();
    $_SESSION['start_time'] = time();
    header("Location: http://localhost:3000");
    exit();
}

?>