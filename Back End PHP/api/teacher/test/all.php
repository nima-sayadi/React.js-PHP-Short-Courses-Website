<?php session_start();
require "../../cors.php";
cors();
if(!isset($_SESSION['user'])){
    echo "access Denied";
    exit();
}
elseif($_SESSION['level'] != 0 && $_SESSION['level'] != 1){
    echo "access Denied";
    exit();
}
else{
    require "../../../DB/db.php";
    $stmt = mysqli_stmt_init($conn);

    $data = [];

    $sql = "SELECT * FROM tests WHERE teacher = ?";
    if(!mysqli_stmt_prepare($stmt , $sql)){
        echo "SQLNotPrepare";
        exit();
    }
    else{
        mysqli_stmt_bind_param($stmt , "s" , $_SESSION['name']);
        mysqli_stmt_execute($stmt);
        $res = mysqli_stmt_get_result($stmt);
        while($row = mysqli_fetch_assoc($res)){
            $obj = [
                "id" => $row['id'],
                "title" => $row['title'],
                "start_date" => $row['start_date'],
                "start_timestamp" => $row['start_timestamp'],
                "start_hour" => $row['start_hour'],
                "course" => $row['course'],
                "questions" => unserialize($row['questions']),
                "period" => $row['period'],
                "points" => $row['points'],
                "teacher" => $row['teacher'],
            ];
            array_push($data,$obj);
        }
        echo json_encode($data);
        exit();
    }
}
?>