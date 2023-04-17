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
    $courseId = trim(htmlspecialchars($_POST['course']));
    $title = trim(htmlspecialchars($_POST['title']));
    $title = "آزمون $title";
    $hour = trim(htmlspecialchars($_POST['hour']));
    $minute = trim(htmlspecialchars($_POST['minute']));
    $period = trim(htmlspecialchars($_POST['period']));
    $points = trim(htmlspecialchars($_POST['points']));
    $dates = $_POST['dates'];
    $questions = $_POST['questions'];
    if(empty($courseId) || empty($hour) || empty($minute) || empty($period) || empty($points) || empty($dates) || empty($questions)){
        echo "emptyField";
        exit();
    }
    for($i=1;$i<sizeof($questions);$i++){
        if(sizeof($questions[$i]) == 7){
            $ext = pathinfo(basename($questions[$i][6]->name), PATHINFO_EXTENSION);
            $pic_name = getToken(10);
            $pic_name = "q$i" . "_$pic_name" . $ext;
            $target = "D:/IAU Project/public/media/$pic_name";
            move_uploaded_file($questions[$i][6]->tmp_name,$target);
            $questions[$i][6] = $pic_name;
        }
    }

    $period = $period * 60;
    $start_hour = "$hour:$minute";
    $timestamp = $dates[0] - 86399;
    $h = $hour * 3600;
    $m = $minute * 60;
    $hm = $h + $m;
    $start_timestamp = $timestamp + $hm;
    $questions = serialize($questions);

    $sql = "INSERT INTO tests(title,start_date,start_timestamp,start_hour,course,questions,period,points,teacher)
     VALUES(?,?,?,?,?,?,?,?,?)";
    if(!mysqli_stmt_prepare($stmt , $sql)){
        echo "SQLNotPrepare";
        exit();
    }
    else{
        mysqli_stmt_bind_param($stmt , "sssssssss" , $title,$dates[1],$start_timestamp,$start_hour,$courseId,$questions,$period,$points,$_SESSION['name']);
        mysqli_stmt_execute($stmt);
        echo "success";
        exit();
    }


}
?>