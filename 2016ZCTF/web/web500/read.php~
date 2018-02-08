<?php  

$file=isset($_GET['file'])?$_GET['file']:'';
if(empty($file)){
exit('The file parameter is empty,Please input it');	
}

if( preg_match('/.php/',$_SERVER['QUERY_STRING']) && is_file($file) ){
	die("The parameter is not allow contain .php,Please input safe data");
}

if( preg_match('/admin_index|.\/|admin_xx_modify/i',$file) ){
	die('Error String!');
}

$realfile = 'aaaaaa/../'.$file;


$file1=fopen($realfile,"r");
header("Content-Type: application/octet-stream");
header("Accept-Ranges: bytes");
header("Accept-Length: ".filesize($realfile));
header("Content-Disposition: attachment; filename=$file");
echo fread($file1,filesize($realfile));
fclose($file1);
?>
