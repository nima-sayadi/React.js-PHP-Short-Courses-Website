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
    $level = 2;

    $sql = "SELECT * FROM courses WHERE teacher_phone = ?";
    if(!mysqli_stmt_prepare($stmt , $sql)){
        echo "SQLNotPrepare";
        exit();
    }
    else{
        mysqli_stmt_bind_param($stmt , "s" , $_SESSION['phone']);
        mysqli_stmt_execute($stmt);
        $res = mysqli_stmt_get_result($stmt);
        while($row = mysqli_fetch_assoc($res)){
            $sql = "SELECT * FROM users WHERE level = ?";
            if(!mysqli_stmt_prepare($stmt , $sql)){
                echo "SQLNotPrepare";
                exit();
            }
            else{
                mysqli_stmt_bind_param($stmt , "s" , $level);
                mysqli_stmt_execute($stmt);
                $res2 = mysqli_stmt_get_result($stmt);
                while($row2 = mysqli_fetch_assoc($res2)){
                    if(!empty($row2['courses'])){
                        $student_courses = unserialize($row2['courses']);
                        for($i = 0;$i<sizeof($student_courses);$i++){
                            if($student_courses[$i] == $row['title']){
                                $obj = [
                                    "id" => $row2['id'],
                                    "name" => $row2['name'],
                                    "phone" => $row2['phone'],
                                    "title" => $row['title'],
                                ];
                                array_push($data,$obj);
                            }
                        }
                    }
                }
            }
        }
        echo json_encode($data);
        exit();
    }
}
?>