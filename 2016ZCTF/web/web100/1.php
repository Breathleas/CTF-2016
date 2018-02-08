<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
</head>
<body>
老大知道flag<br>
<script type="text/javascript">
function clearCookie(){ 
var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
if (keys) { 
for (var i = keys.length; i--;) 
document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString();
window.location.href="login.php";  
} 
} 
</script>
<input type="button" value="退出" onclick="clearCookie()" />
</body>
</html>