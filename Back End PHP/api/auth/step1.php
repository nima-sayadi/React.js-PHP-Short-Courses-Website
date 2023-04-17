<?php session_start();

require "../cors.php";
cors();

if(isset($_SESSION['user'])){
    echo "logged in";
    exit();
}
elseif(!isset($_POST['phone'])){
    echo "access Denied";
    exit();
}
else {
    require "../../DB/db.php";
    $stmt = mysqli_stmt_init($conn);

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
        $codeAlphabet = "0123456789";
        $max = strlen($codeAlphabet);
    
        for ($i=0; $i < $length; $i++) {
            $token .= $codeAlphabet[crypto_rand_secure(0, $max-1)];
        }
    
        return $token;
    }

    $phone = trim(htmlspecialchars($_POST['phone']));
    $token = getToken(6);
    if(empty($phone)){
        echo "emptyField";
        exit();
    }
    else{
        $sql = "SELECT * FROM users WHERE phone = ?";
        if(!mysqli_stmt_prepare($stmt , $sql)){
            echo "SQLNotPrepare";
            exit();
        }
        else{
            mysqli_stmt_bind_param($stmt , "s" , $phone);
            mysqli_stmt_execute($stmt);
            $res = mysqli_stmt_get_result($stmt);
            if($row = mysqli_fetch_assoc($res)){
                $sql = "SELECT * FROM sms WHERE phone = ?";
                if(!mysqli_stmt_prepare($stmt , $sql)){
                    echo "SQLNotPrepare";
                    exit();
                }
                else{
                    mysqli_stmt_bind_param($stmt , "s" , $phone);
                    mysqli_stmt_execute($stmt);
                    mysqli_stmt_store_result($stmt);
                    $sms_num = mysqli_stmt_num_rows($stmt);
                    if($sms_num > 0){
                        $sql = "DELETE FROM sms WHERE phone = ?";
                        if(!mysqli_stmt_prepare($stmt , $sql)){
                            echo "SQLNotPrepare";
                            exit();
                        }
                        else{
                            mysqli_stmt_bind_param($stmt , "s" , $phone);
                            mysqli_stmt_execute($stmt);   
                        }
                    }
                    $sql = "INSERT INTO sms(code,phone) VALUES(?,?)";
                    if(!mysqli_stmt_prepare($stmt , $sql)){
                        echo "SQLNotPrepare";
                        exit();
                    }
                    else{
                        mysqli_stmt_bind_param($stmt , "ss" , $token,$phone);
                        mysqli_stmt_execute($stmt);
                        if($row['level'] == "0"){
                            echo "admin";
                            exit();
                        }
                        else if($row['level'] == "1"){
                            echo "teacher";
                            exit();
                        }
                        else if($row['level'] == "2"){
                            echo "student";
                            exit();
                        }
                        else{
                            echo "error";
                            exit();
                        }
                    }
                }
            }
            else{
                echo "guest";
                exit();
            }
        }
    }
}

?>