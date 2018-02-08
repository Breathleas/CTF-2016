<?php
include('common.php'); 
session_start();
header('Content-type:text/html;charset=utf-8');
mysql_conn();

if($_SESSION[login]==1){
	header('Location:controller/admin_index.php');
}

if($_SESSION[checkcode]==1){
?>
	<h2>The website support uname,email and id to login,You only need to input one to login!</h2>
	<form action="login.php" method="POST">
	username:<input type="text" name="username"> or 
	email:<input type="text" name="email"> or
	id:<input type="text" name="id"><br><br>
	password:<input type="password" name="password"><br><br>
	<input type="submit" value="Submit to login">
	</form>
	<!--hint:read.php~ -->
<?php

	if((empty($email) and empty($username) and empty($id)) or empty($password)){
		exit('<script>alert("Please input some data")</script>');
	}else{

	if ($email&&!preg_match("/[-a-zA-Z0-9_\.]+\@([0-9A-Za-z][0-9A-Za-z-]+\.)+[A-Za-z]{2,5}$/",$email)){  // 禁止用户输入非法的邮箱地址
		exit("Email Wrong!");
	}

	if($DengerId){
		$id=preg_replace('#[^a-z0-9_-]#i','',$id); 
	}

	if(strlen($username)>20){
		$username=substr($username,1,20);
	}
 
	if($act=='login'){
		$sql="select * from admin where (username='$username' or email = '$email' or id = '$id')";//支持使用帐号,邮箱,id登录。
		$result=@mysql_fetch_array(mysql_query($sql));
		mysql_close();
		if($result){
			if( md5($password) == $result[password]){
				$_SESSION['login']=1;
				$_SESSION['auth'] =1;
				echo "<center style=\"font-size:36px; color:red\"><a href=\"./controller/admin_index.php\">Hey,Admin.Welcome to back~</a></center>";
				echo "<center style=\"font-size:36px; color:red\"><a href=\"./controller/admin_index.php\">Click jump to the Backstage</a></center>";
				mysql_close();
			}else{
				exit('<script>alert("Password of the account is not right")</script>');
			}
		}
		else{
			exit('<script>alert("Account is not exists")</script>');	
		}
	}	
	else{
		exit('<script>alert("Please login!login!login!login!login!login!login!login!login!login!login!login!")</script>');
	}
}
}
else{
?>
<p>上次老总来巡视,对维护这个系统的小明说:"这个系统是一个非常重要的系统,对公司非常的重要,小明要好好维护,密码之类的要多加几层,干脆就把我的qq当作第一层密码把."</p>
<p>然后老总啪啪啪的敲了几行代码就把自己的qq小号设置成了入口密码了。</p>
<center style="font-size:36px; color:red">请输入认证码</center>
<?php
	$result = mysql_fetch_array(mysql_query("select qq from qq"));
	mysql_close();
	$qq = $result[qq];?>

	<form action="login.php" method="GET">
	认证码:<input type="text" name="admincode">
	<input type="submit" value="check">
	</form>
<?php
	if(!empty($admincode)){
		if($admincode!=$qq){
			echo '<script>alert("认证码错误")</script>';	
			echo '<script language=javascript>window.location.href="search.php"</script>';
		}else{
			$_SESSION[checkcode]=1;
			echo '<script language=javascript>window.location.href="login.php"</script>';
		}
	}
}
?>


