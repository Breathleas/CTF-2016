<?php
	/*
	author:MagicBlue
	*/
	error_reporting(0);
	class MagicBlue
	{
		public function __construct($filepath)
		{
			$this->filepath = $filepath;
			$this->header = array();		
		}

		public function Flow()
		{
			$arr = array('HTTP_HOST','HTTP_USER_AGENT','HTTP_ACCEPT','HTTP_ACCEPT_LANGUAGE','HTTP_ACCEPT_ENCODING','HTTP_REFERER','HTTP_COOKIE','HTTP_X_FORWARDED_FOR','HTTP_CONNECTION');
			$HTTP_Method = $_SERVER['REQUEST_METHOD'];
			$server = $_SERVER;
			if(!file_exists($this->filepath))
			{
				mkdir($this->filepath,0777);
			}
			$filename = date('Y-m-d-h');
			$Allfilepath = $this->filepath.'/'.$filename;
			foreach($arr as $value)
			{
				$this->header[$value] = $server[$value];
			}
			$head = '';
			foreach ($this->header as $key => $value)
			{
				if(stripos($key, 'HTTP_') == -1)
				{
					$key = ucwords(strtolower($key));
				}else
				{
					$key = ucwords(strtolower(substr($key, 5)));
				}
				$head.= $key.': '.$value."\r\n";
			}
			$request_url = $_SERVER['REQUEST_URI'];
			$protocol = $_SERVER['SERVER_PROTOCOL'];
			if(isset($_POST))
			{
				$post = file_get_contents('php://input');
			}
			$ip = $_SERVER['REMOTE_ADDR'];
			$time = date('Y/m/d h:i:s');
			$content = $ip."\t".$time."\t\n".$HTTP_Method.' '.$request_url.' '.$protocol."\r\n".$head."\n\n".$post."\n\n";
			$this->WriteFile($Allfilepath,$content,FILE_APPEND);
		}

		public function WriteFile($filepath,$content,$FILE_APPEND=FILE_APPEND)
		{
			file_put_contents($filepath,$content,$FILE_APPEND);
		}

		public function waf(){
			$get = $_GET;
			$post = $_POST;
			$cookie = $_COOKIE;
			$files = $_FILES;
			$server = $_SERVER;
			$input = array("Get"=>$get, "Post"=>$post, "Cookie"=>$cookie, "File"=>$files,"server"=>$_SERVER);
    		// $pattern = "select|insert|update|delete|and|or|\'|\/\*|\*|\.\.\/|\.\/|union|into|load_file|outfile|dumpfile|sub|hex";
    		$pattern = "file_put_contents|fwrite|curl|system|eval|assert|HTTP_HI|axuesheng";
   			// $pattern .="|passthru|exec|system|chroot|scandir|chgrp|chown|shell_exec|proc_open|proc_get_status|popen|ini_alter|ini_restore";
    		// $pattern .="|`|dl|openlog|syslog|readlink|symlink|popepassthru|stream_socket_server|assert|pcntl_exec";
    		#$pattern = "assert";
    		$vpattern = explode("|",$pattern);
    		$bool = false;
    		$filepath = "/var/www/html/expexpexp.txt";
    		foreach ($input as $k => $v) {
        		foreach($vpattern as $value){
            		foreach ($v as $kk => $vv) {
                		if (preg_match( "/$value/i", $vv )){
                   		 	$bool = true;
                   		 	$exp = print_r($input,true)."\r\n";
                    		$this->WriteFile($filepath,$exp,FILE_APPEND);
                    		die();
                    		break;
                		}
            		}
            		if($bool) break;
       		 }
       		 if($bool) break;
    		}
	}
}

	$Catchs = new MagicBlue('/var/www/html/log23333');
	$Catchs->Flow();
	$Catchs->waf();
?>
