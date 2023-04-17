<?php session_start();

require "../cors.php";
cors();

if(!isset($_SESSION['user'])){
    echo "false";
    exit();
}
else{
    echo "true";
    exit();
}

?>