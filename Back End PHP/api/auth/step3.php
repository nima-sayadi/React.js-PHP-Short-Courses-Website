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
    $name = trim(htmlspecialchars($_POST['name']));
    $mail = trim(htmlspecialchars($_POST['mail']));
    $level = trim(htmlspecialchars($_POST['level']));
    $code = trim(htmlspecialchars($_POST['code']));
    if(empty($name) || empty($mail) || empty($level) || empty($phone) || empty($code)){
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
            mysqli_stmt_store_result($stmt);
            $user_num = mysqli_stmt_num_rows($stmt);
        }
        if($user_num > 0){
            echo "Access Denied";
            exit();
        }
        else{
            $sql = "SELECT * FROM sms WHERE phone = ?";
            if(!mysqli_stmt_prepare($stmt , $sql)){
                echo "SQLNotPrepare";
                exit();
            }
            else{
                mysqli_stmt_bind_param($stmt , "s" , $phone);
                mysqli_stmt_execute($stmt);
                $res = mysqli_stmt_get_result($stmt);
                if($row = mysqli_fetch_assoc($res)){
                    if($row['code'] == $code){
                        $sql = "DELETE FROM sms WHERE phone = ?";
                        if(!mysqli_stmt_prepare($stmt , $sql)){
                            echo "SQLNotPrepare";
                            exit();
                        }
                        else{
                            mysqli_stmt_bind_param($stmt , "s" , $phone);
                            mysqli_stmt_execute($stmt);   
                        }
                        $sql = "INSERT INTO users(name,mail,phone,level) VALUES(?,?,?,?)";
                        if(!mysqli_stmt_prepare($stmt , $sql)){
                            echo "SQLNotPrepare";
                            exit();
                        }
                        else{
                            mysqli_stmt_bind_param($stmt , "ssss" , $name,$mail,$phone,$level);
                            mysqli_stmt_execute($stmt);
                            $_SESSION['name'] = $name;
                            $_SESSION['phone'] = $phone;
                            $_SESSION['mail'] = $mail;
                            $_SESSION['level'] = $level;
                            $_SESSION['user'] = getToken(20);
                            echo "success";
                            exit();
                        }
                    }
                    else{
                        echo "wrongCode";
                        exit();
                    }
                }
                else{
                    echo "Access Denied";
                    exit();
                }
            }
        }
    }
}

?>