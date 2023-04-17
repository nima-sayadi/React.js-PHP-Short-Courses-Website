<?php session_start();
require "../cors.php";
cors();
require "../../DB/db.php";
$stmt = mysqli_stmt_init($conn);

$data = [];

$sql = "SELECT * FROM courses ORDER BY registered DESC LIMIT 3 ";
if(!mysqli_stmt_prepare($stmt , $sql)){
    echo "SQLNotPrepare";
    exit();
}
else{
    mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);
    while($row = mysqli_fetch_assoc($res)){
        $obj = [
            "id" => $row['id'],
            "title" => $row['title'],
            "des" => $row['des'],
            "pic" => $row['pic'],
            "from_date" => $row['from_date'],
            "to_date" => $row['to_date'],
            "period" => $row['period'],
            "days" => unserialize($row['days']),
            "teacher" => $row['teacher'],
        ];
        array_push($data,$obj);
    }
    echo json_encode($data);
    exit();
}

?>