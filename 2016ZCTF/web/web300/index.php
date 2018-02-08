<?php
//../flag.txt
$args = $_POST['args'];
if(!isset($args))
        exit('no define');
$time=time()+rand(0,100);
srand($time);
$token=ttr_random(32);
setcookie('token',$token);

$path=ttr_random(16);
$dir = '/var/sec2016/www/mrk/'.$path ;
if ( !file_exists($dir) )
        @mkdir($dir);
@chdir($dir);
for ( $i=0; $i<count($args); $i++ ){
        if ( !preg_match('/^\w+$/', $args[$i]) )
            exit();
	if (preg_match('/mk/i', $args[$i]))
	   exit();
        else echo $args[$i];
}

@exec("/home/sec2016/zctf " . implode(" ", $args));

function ttr_random($len, $alpha='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
{
    $alphalen = strlen($alpha) - 1;
    $key = '';
    for($i = 0; $i < $len; $i++)
    {
        $key .= $alpha[rand(0, $alphalen)];
    }
    return $key;
}

?>
