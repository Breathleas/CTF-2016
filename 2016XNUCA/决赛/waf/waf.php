<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

/*
** ���¹���php�汾waf
**
** Author: ��
*/

/*
�������ʽ������get��post֮������������д��־��
*/
if($_SERVER['REQUEST_METHOD'] != 'POST' && $_SERVER['REQUEST_METHOD'] != 'GET'){
    write_attack_log("method");
}
$url = $_SERVER['REQUEST_URI']; //��ȡuri�����м��

$data = file_get_contents('php://input'); //��ȡpost��data�������Ƿ���mutipart

$headers = get_all_headers(); //��ȡheader

filter_attack_keyword(filter_invisible(urldecode(filter_0x25($url)))); //��URL���м�⣬�������������ز���¼
filter_attack_keyword(filter_invisible(urldecode(filter_0x25($data)))); //��POST�����ݽ��м�⣬�����������ز���¼

/*
���������������м򵥹���
*/
foreach ($_GET as $key => $value) {
    $_GET[$key] = filter_dangerous_words($value);
}
foreach ($_POST as $key => $value) {
    $_POST[$key] = filter_dangerous_words($value);
}
foreach ($_COOKIE as $key => $value){
	$_COOKIE[$key] = filter_dangerous_words($value);
}
foreach ($headers as $key => $value) {
    filter_attack_keyword(filter_invisible(urldecode(filter_0x25($value)))); //��http����ͷ���м�⣬�����������ز���¼
    $_SERVER[$key] = filter_dangerous_words($value); //�򵥹���
}

/*
��ȡhttp����ͷ��д������
*/
function get_all_headers() { 
    $headers = array(); 
 
    foreach($_SERVER as $key => $value) { 
        if(substr($key, 0, 5) === 'HTTP_') { 
            $headers[$key] = $value; 
        } 
    } 
 
    return $headers; 
} 


/*
��ⲻ�ɼ��ַ���ɵĽضϺ��ƹ�Ч����ע����վ�����������Ҫ���޸�
*/
function filter_invisible($str){
    for($i=0;$i<strlen($str);$i++){
        $ascii = ord($str[$i]);
        if($ascii>126 || $ascii < 32){ //����������Ҫ�޸�
            if(!in_array($ascii, array(9,10,13))){
                write_attack_log("interrupt");
            }else{
                $str = str_replace($ascii, " ", $str);
            }
        }
    }
    $str = str_replace(array("`","|",";",","), " ", $str);
    return $str;
}

/*
�����վ������ڶ��α����ƹ�©����ɵ�%25�ƹ����˴���ѭ����%25�滻��%��ֱ��������%25
*/
function filter_0x25($str){
    if(strpos($str,"%25") !== false){
        $str = str_replace("%25", "%", $str);
        return filter_0x25($str);
    }else{
        return $str;
    }
}

/*
�����ؼ��ּ�⣬�˴�����֮ǰ�������ַ��滻�ɿո񣬼�ʹ�����ƹ�����Ҳ�Ʋ��������\b
*/
function filter_attack_keyword($str){
    if(preg_match("/select\b|insert\b|update\b|drop\b|delete\b|dumpfile\b|outfile\b|load_file|rename\b|floor\(|extractvalue|updatexml|name_const|multipoint\(/i", $str)){
        write_attack_log("sqli");
    }

    //�˴��ļ������ļ������Ĳ���д�ˣ������ָ�㡣����
    if(substr_count($str,$_SERVER['PHP_SELF']) < 2){
        $tmp = str_replace($_SERVER['PHP_SELF'], "", $str);
        if(preg_match("/\.\.|.*\.php[35]{0,1}/i", $tmp)){ 
            write_attack_log("LFI/LFR");;
        }
    }else{
        write_attack_log("LFI/LFR");
    }
    if(preg_match("/base64_decode|eval\(|assert\(/i", $str)){
        write_attack_log("EXEC");
    }
    if(preg_match("/flag/i", $str)){
        write_attack_log("GETFLAG");
    }

}

/*
�򵥽��׳���������ַ��滻������
*/
function filter_dangerous_words($str){
    $str = str_replace("'", "��", $str);
    $str = str_replace("\"", "��", $str);
	$str = str_replace("\\","\\\\",$str);
    $str = str_replace("<", "&lt;", $str);
    $str = str_replace(">", "&gt;", $str);
    return $str;
}

/*
��ȡhttp����������������ڻ�ȡ���˵Ĺ���payload
*/
function get_http_raw() { 
    $raw = ''; 

    $raw .= $_SERVER['REQUEST_METHOD'].' '.$_SERVER['REQUEST_URI'].' '.$_SERVER['SERVER_PROTOCOL']."\r\n"; 
     
    foreach($_SERVER as $key => $value) { 
        if(substr($key, 0, 5) === 'HTTP_') { 
            $key = substr($key, 5); 
            $key = str_replace('_', '-', $key); 
            $raw .= $key.': '.$value."\r\n"; 
        } 
    } 
    $raw .= "\r\n"; 
    $raw .= file_get_contents('php://input'); 
    return $raw; 
}

/*
�������ز���¼����payload
*/
function write_attack_log($alert){
    $data = date("Y/m/d H:i:s")." -- [".$alert."]"."\r\n".get_http_raw()."\r\n\r\n";
    $ffff = fopen('log_is_a_secret_file.txt', 'a'); //��־·�� 
    fwrite($ffff, $data);  
    fclose($ffff);
    if($alert == 'GETFLAG'){
        echo "HCTF{aaaa}"; //����������flag�ؼ��֣���ʾ�ٵ�flag����2333333��
    }else{
        sleep(15); //����ǰ��ʱ15��
    }
}

?>
