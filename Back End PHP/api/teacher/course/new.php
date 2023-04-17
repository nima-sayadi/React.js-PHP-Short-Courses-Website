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

    function crypto_rand_secure($min, $max)
    {
        $range = $max - $min;
        if ($range < 1) return $min;
        $log = ceil(log($range, 2));
        $bytes = (int) ($log / 8) + 1;
        $bits = (int) $log + 1;
        $filter = (int) (1 << $bits) - 1;
        do {
            $rnd = hexdec(bin2hex(openssl_random_pseudo_bytes($bytes)));
            $rnd = $rnd & $filter;
        } while ($rnd > $range);
        return $min + $rnd;
    }
    
    function getToken($length)
    {
        $token = "";
        $codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $codeAlphabet.= "abcdefghijklmnopqrstuvwxyz";
        $codeAlphabet.= "0123456789";
        $max = strlen($codeAlphabet);
    
        for ($i=0; $i < $length; $i++) {
            $token .= $codeAlphabet[crypto_rand_secure(0, $max-1)];
        }
    
        return $token;
    }

    require "../../../DB/db.php";
    $stmt = mysqli_stmt_init($conn);
    $title = trim(htmlspecialchars($_POST['title']));
    $dates_start = $_POST['dates_start'];
    $dates_end = $_POST['dates_end'];
    $time = $_POST['time'];
    $des = trim(htmlspecialchars($_POST['des']));
    if(empty($title) || empty($dates_start) || empty($dates_end) || empty($time) || empty($des)){
        echo "emptyField";
        exit();
    }
    if(empty($_FILES['image']['name'])){
        echo "emp";
        exit();
    }
    $ext = pathinfo(basename($_FILES['image']['name']), PATHINFO_EXTENSION);
    $ext = strtolower($ext);
    if($ext != "jpg" && $ext != "png" && $ext != "jpeg" && $ext != "tif" && $ext != "tiff" && $ext != "pdf"){
        echo "invalidFormat";
        exit();
    }
    $pic_name = getToken(10);
    $pic_name = $pic_name."".".$ext";
    $pic_name = "course_".$pic_name;
    $target = "D:/IAU Project/public/media/$pic_name";

    $period = $dates_end[0] - ($dates_start[0] - 86399);
    $period = (($period + 1) / 86400) - 1;
    $time = serialize($time);
    $ds = $dates_start[0]-86399;
    $registered = 0;

    $sql = "INSERT INTO courses(title,des,pic,from_timestamp,to_timestamp,from_date,to_date,period,days,teacher,teacher_phone,registered)
     VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    if(!mysqli_stmt_prepare($stmt , $sql)){
        echo "SQLNotPrepare";
        exit();
    }
    else{
        mysqli_stmt_bind_param($stmt , "sssssssssssi" , $title,$des,$pic_name,$ds,$dates_end[0],
        $dates_start[1],$dates_end[1],$period,$time,$_SESSION['name'],$_SESSION['phone'],$registered);
        mysqli_stmt_execute($stmt);
        move_uploaded_file($_FILES['image']['tmp_name'],$target);
        echo "success";
        exit();
    }


}
?>