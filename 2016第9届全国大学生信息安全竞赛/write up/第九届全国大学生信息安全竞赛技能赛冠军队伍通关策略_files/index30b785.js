define("appmsg/index.js",["biz_wap/jsapi/a8key.js","biz_wap/utils/device.js","biz_common/dom/class.js","appmsg/log.js","biz_common/dom/attr.js","appmsg/max_age.js","biz_wap/utils/mmversion.js","appmsg/test.js","biz_common/utils/url/parse.js","appmsg/cdn_img_lib.js","appmsg/share.js","biz_common/log/jserr.js","biz_wap/ui/lazyload_img.js","appmsg/async.js","appmsg/cache.js","appmsg/copyright_report.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","appmsg/outer_link.js","appmsg/review_image.js","appmsg/iframe.js","appmsg/qqmusic.js","appmsg/voice.js","appmsg/wxtopic.js","appmsg/cdn_speed_report.js","appmsg/page_pos.js","appmsg/report_and_source.js","appmsg/report.js","appmsg/fereport.js","biz_wap/safe/mutation_observer_report.js","sougou/index.js"],function(e){
"use strict";
function o(){
function o(e,o){
var t={
lossy:"UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
lossless:"UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
alpha:"UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
animation:"UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
},n=new Image;
n.onload=function(){
var t=n.width>0&&n.height>0;
o(e,t);
},n.onerror=function(){
o(e,!1);
},n.src="data:image/webp;base64,"+t[e];
}
function t(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e.timing){
var o=e.timing;
a("[Appmsg] dns:"+(o.domainLookupEnd-o.domainLookupStart)+"^^^ ssl:"+(0==o.secureConnectionStart?0:o.connectEnd-o.secureConnectionStart)+"^^^ tcp:"+(o.connectEnd-o.connectStart)+"^^^ request:"+(o.responseStart-o.requestStart)+"^^^ getPackageTime:"+(o.responseEnd-o.responseStart)+"^^^ domCententLoaded:"+(o.domContentLoadedEventStart-o.domLoading)+"^^^ domComplete:"+(o.domComplete-o.domLoading)+"^^^ firstViewTime:"+(real_show_page_time-o.navigationStart)+"^^^ interactiveTime:"+(page_endtime-o.navigationStart)),
setTimeout(function(){
o.loadEventEnd&&a("[Appmsg] onload:"+(o.loadEventEnd-o.loadEventStart));
},100);
}
}
var r=document.getElementsByTagName("body");
if(!r||!r[0])return!1;
r=r[0],function(){
var e=(new Date).getHours(),o=function(e,o){
o=o||"",window.isSg?(o=["uin:sougou","resp:"+o].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+o+"&r="+Math.random()+"&from=sougou"):(o=["uin:"+top.window.user_uin,"resp:"+o].join("|"),
(new Image).src="/mp/jsreport?key="+e+"&content="+o+"&r="+Math.random());
},t=function(e,o,t){
var n=e+"_"+o;
t=t||1,window.logs.idkeys[n]||(window.logs.idkeys[n]={
val:0
}),window.logs.idkeys[n].val+=t;
},n=e>=11&&17>=e&&Math.random()<1,i=function(e,t){
n&&o(e,t);
};
window.__report=o,window.__commonVideoReport=i,window.__addIdKeyReport=t;
}();
var p=/^http(s)?:\/\/mp\.weixin\.qq\.com\//g;
try{
if(top!=window&&(!top||top&&top.location.href&&p.test(top.location.href))&&!window.isSg)throw new Error("in iframe");
}catch(m){
var l="",g=new Image;
g.src=("http://mp.weixin.qq.com/mp/jsreport?key=4&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key4]"+l+"&r="+Math.random()).substr(0,1024);
}
window.isInWeixinApp()&&/#rd$/.test(location.href)&&!window.isWeixinCached&&location.replace(location.href.replace(/#rd$/,"#wechat_redirect"));
var w=e("biz_common/utils/url/parse.js");
e("appmsg/cdn_img_lib.js"),window.page_endtime=+new Date;
{
var u=e("biz_wap/utils/mmversion.js"),_=!u.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger");
-1!=navigator.userAgent.indexOf("WindowsWechat");
}
if(e("appmsg/share.js"),window.isSg||"mp.weixin.qq.com"==location.host){
var f=e("biz_common/log/jserr.js");
f({
key:0,
reporturl:"http://mp.weixin.qq.com/mp/jsreport?1=1",
replaceStr:/http(s)?:(.*?)js\//g
});
}
window.logs.webplog={
lossy:0,
lossless:0,
alpha:0,
animation:0,
total:0
};
var A=-1!=navigator.userAgent.indexOf("TBS/"),h=function(e,t){
o(e,function(e,o){
if(window.logs.webplog[e]=o?1:0,window.logs.webplog.total++,4==window.logs.webplog.total){
var n=window.logs.webplog,i=Math.random();
A&&1>=i&&(n.lossy=n.lossless=n.alpha=1,window.logs.webplog=n);
var a=n.lossy&n.lossless&n.alpha;
t(!!a);
}
});
},y=function(e){
h("lossy",e),h("lossless",e),h("alpha",e),h("animation",e);
};
window.webp=!1,y(function(o){
function t(e,o,t){
if(5>t)return e;
var n=1e3*window.svr_time||+new Date;
n=new Date(n);
var i=n.getHours(),a=(60*i+n.getMinutes(),e),r=document.createElement("span");
r.className="gif_img_wrp",r.innerHTML='<span class="gif_img_tips" style="display:none;"><i class="gif_img_play_arrow"></i>动图</span><span class="gif_img_tips loading" style="display:none;"><i class="weui_loading gif_img_loading"></i>加载中</span>';
var s="click",c=function(){
if(r){
r.children.item(0).style.display="none",r.children.item(1).style.display="";
var e=o.onload;
o.onload=function(){
r&&(r.children.item(1).style.display="none",b.off(r,s,c),r=null),e&&e.apply(o,arguments);
};
var t=o.onerror;
o.onerror=function(){
r&&(r.children.item(0).style.display="",r.children.item(1).style.display="none",
b.off(r,s,c),r=null),t&&t.apply(o,arguments);
},o.src=a,o.loadGif=!0,window.__addIdKeyReport("28307",15);
}
};
return o.autoTap=function(){
o.src=a,o.loadGif=!0,o.autoTap=null,b.off(r,s,c),window.__addIdKeyReport("28307",26);
},(window.user_uin&&70>(user_uin/100|0)%100&&"MzI5NjExODQ4OA=="!==window.biz||location.href.indexOf("gif=1")>-1)&&(e=e.nogif(),
o.gray=!0,o.parentNode.insertBefore(r,o),r.appendChild(o),b.on(r,s,c),window.__addIdKeyReport("28307",16)),
e;
}
window.webp=o,o&&window.localStorage&&window.localStorage.setItem&&window.localStorage.setItem("webp","1"),
window.logs.img={
download:{},
read:{},
load:{}
};
var n=document.getElementById("js_cover");
if(n){
var i=n.getAttribute("data-src");
if(i){
if(i.isCDN()){
var r=new Date;
for(r.setFullYear(2014,9,1);-1!=i.indexOf("?tp=webp");)i=i.replace("?tp=webp","");
for(;-1!=i.indexOf("&tp=webp");)i=i.replace("&tp=webp","");
1e3*ct>=r.getTime()&&""!=img_format&&"gif"!=img_format&&(i=i.replace(/\/0$/,"/640"),
i=i.replace(/\/0\?/,"/640?"),n.dataset&&(n.dataset.s="300,640")),o&&(i=w.addParam(i,"tp","webp",!0)),
i=w.addParam(i,"wxfrom","5",!0),is_https_res?i=i.http2https():("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(i=i.https2http());
}
setTimeout(function(){
n.onload=function(){
s(n,"height","auto","important"),s(n,"visibility","visible","important");
},n.setAttribute("src",i);
},0),window.logs.img.read[i]=!0,window.logs.img.load[i]=!0,n.removeAttribute("data-src");
}
}
var c=e("biz_wap/ui/lazyload_img.js"),d=1;
window.logs.outer_pic=0,new c({
attrKey:"data-src",
imgOccupied:!0,
lazyloadHeightWhenWifi:function(){
var e,o=1,t=1;
e=window.svr_time?new Date(1e3*window.svr_time):new Date;
var n=e.getHours();
return n>=20&&23>n&&(o=.5,t=0),{
bottom:o,
top:t
};
},
inImgRead:function(e){
e&&(window.logs.img.read[e]=!0);
},
changeSrc:function(e,o,n){
if(!o)return"";
for(var i=o;-1!=i.indexOf("?tp=webp");)i=i.replace("?tp=webp","");
for(;-1!=i.indexOf("&tp=webp");)i=i.replace("&tp=webp","");
if(o.isCDN())(e.dataset&&e.dataset.s||-1!=o.indexOf("wx_fmt=")&&-1==o.indexOf("wx_fmt=gif"))&&(i=i.replace(/\/0$/,"/640"),
i=i.replace(/\/0\?/,"/640?")),window.webp&&(i=w.addParam(i,"tp","webp",!0)),i=w.addParam(i,"wxfrom","5",!0),
is_https_res?i=i.http2https():("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(i=i.https2http());else try{
var r=new RegExp("^http(s)?://((mmbiz.qpic.cn/.*)|(m.qpic.cn/.*)|(mmsns.qpic.cn/.*)|(shp.qpic.cn/.*)|(wx.qlogo.cn/.*)|(mmbiz.qlogo.cn/.*)|((a|b)[0-9]*.photo.store.qq.com/.*)|(mp.weixin.qq.com/.*)|(res.wx.qq.com/.*))");
r.test(o)||(window.__addIdKeyReport("28307",9),window.logs.outer_pic++);
}catch(s){}
var c=/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g;
return i=i.replace(c,"http://m.qpic.cn"),i=w.addParam(i,"wx_lazy","1",!0),o.isGif()&&(i=t(i,e,n)),
window.logs.img.load[i]=!0,a("[Appmsg] image_load_event_change_src. originsrc:"+o+"  ^^^ newsrc : "+i),
i;
},
onerror:function(e,o){
var t=o?o.__retryload||0:0;
if(e&&!(t>d)&&(window.__addIdKeyReport("28307",4),window.__addIdKeyReport("28307",6+2*t),
d>t&&(t++,o.__retryload=t,o.src=w.addParam(e,"retryload",t,!0)),e.isCDN())){
a("[Appmsg] image_load_event_on_error. src:"+e),o.setAttribute("data-fail",1);
var n=10;
/tp\=webp/.test(e)&&(n=11);
var i=new Image;
i.src="http://mp.weixin.qq.com/mp/jsreport?key="+n+"&content="+(encodeURIComponent(e)+"["+uin+"]")+"&r="+Math.random();
}
},
onload:function(e,o){
o.gray&&!o.loadGif&&(o.naturalWidth<120||o.naturalHeight<120?o.autoTap&&o.autoTap():o.parentNode.children&&o.parentNode.children.item(0)&&(o.parentNode.children.item(0).style.display=""));
var t=o?o.__retryload||0:0;
t>d||(a("[Appmsg] image_load_event_onload_image. src:"+e+"  ^^^  retryloadtimes: "+t),
o.setAttribute("data-fail",0),window.__addIdKeyReport("28307",3),window.__addIdKeyReport("28307",5+2*t));
},
detect:function(e){
if(e&&e.time&&e.loadList){
var o=e.time,t=e.loadList;
window.logs.img.download[o]=t;
}
},
container:document.getElementById("page-content")
});
}),e("appmsg/async.js"),window.isSg||e("appmsg/cache.js");
var v=e("appmsg/copyright_report.js"),b=e("biz_common/dom/event.js"),j=e("biz_wap/jsapi/core.js");
!function(){
var e=document.getElementById("post-user"),o=document.getElementById("copyright_info"),t=[];
if(e){
var n="57";
"26"==window.source&&(n="95"),"28"==window.source&&(n="96"),"29"==window.source&&(n="39"),
"15"==window.source&&(n="121"),t.push({
dom:e,
username:user_name_new||user_name,
scene:n
});
}
o&&source_encode_biz&&t.push({
dom:o,
source_encode_biz:source_encode_biz,
scene:"110"
});
for(var i=0,r=t.length;r>i;i++)!function(e){
b.on(e.dom,"click",function(){
if("copyright_info"==e.dom.id&&source_encode_biz){
v.card_click_report({
scene:"0"
});
var o="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene="+e.scene+"#wechat_redirect";
-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?location.href=o:j.invoke("openUrlWithExtraWebview",{
url:o,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=o);
});
}else a("[Appmsg] profile_click_before_loadprofile: username:"+e.username+", scene:"+e.scene),
j.invoke("profile",{
username:e.username,
scene:e.scene
},function(o){
window.__addIdKeyReport("28307","1"),a("[Appmsg] profile_click_after_loadprofile: username:"+e.username+", scene:"+e.scene+", res.err_msg:"+o.err_msg);
});
return!1;
}),u.isWp&&e.dom.setAttribute("href","weixin://profile/"+e.username);
}(t[i]);
}(),function(){
location.href.match(/fontScale=\d+/)&&u.isIOS&&j.on("menu:setfont",function(e){
e.fontScale<=0&&(e.fontScale=100),document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=e.fontScale+"%",
document.getElementsByTagName("html").item(0).style.lineHeight=160/e.fontScale;
});
}();
var x=e("appmsg/outer_link.js");
if(new x({
container:document.getElementById("js_content"),
changeHref:function(e,o){
if(e&&0==e.indexOf("http://mp.weixin.qq.com/s"))e=e.replace(/#rd\s*$/,""),e=e.replace(/#wechat_redirect\s*$/,""),
e=e.replace(/[\?&]scene=21/,""),e+="&scene=21#wechat_redirect";else{
if(18==ban_scene)return"/mp/ban?action=check&__biz="+biz+"&mid="+mid+"&idx="+idx+"&scene="+ban_scene+"#wechat_redirect";
if(0!=e.indexOf("http://mp.weixinbridge.com/mp/wapredirect"))return"http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&type="+o+"&scene=0";
}
return e;
}
}),!_){
var q=e("appmsg/review_image.js"),E=document.getElementById("js_cover"),I=[];
E&&I.push(E),new q({
container:document.getElementById("js_content"),
is_https_res:is_https_res,
imgs:I
});
}
!function(){
try{
var e=document.getElementById("js_content");
if(!e||!e.querySelectorAll)return;
for(var o=e.querySelectorAll("*"),t="list-paddingleft-2,selectTdClass,noBorderTable,ue-table-interlace-color-single,ue-table-interlace-color-double".split(","),n=function(e){
if(e&&e.className){
for(var o=e.className.split(/\s+/),n=[],i=0,a=o.length;a>i;++i){
var r=o[i];
r&&-1!=t.indexOf(r)&&n.push(r);
}
e.className=n.join(" ");
}
},i=0,a=o.length;a>i;++i){
var r=o[i];
r.tagName&&"iframe"!=r.tagName.toLowerCase()&&n(r);
}
}catch(s){}
}(),window.fromWeixinCached||e("appmsg/iframe.js"),e("appmsg/qqmusic.js"),e("appmsg/voice.js"),
e("appmsg/wxtopic.js"),e("appmsg/cdn_speed_report.js"),e("appmsg/page_pos.js"),setTimeout(function(){
if(window.article_improve_combo_css){
var e=document.createElement("link");
e.rel="stylesheet",e.type="text/css",e.async=!0,e.href=window.article_improve_combo_css;
var o=document.getElementsByTagName("head")[0];
o.appendChild(e);
}
},0),setTimeout(function(){
b.tap(document.getElementById("copyright_logo"),function(){
location.href="http://kf.qq.com/touch/sappfaq/150211YfyMVj150326iquI3e.html";
}),c(),d(),e("appmsg/report_and_source.js"),function(){
if(_){
i.addClass(r,"not_in_mm");
var e=document.createElement("link");
e.rel="stylesheet",e.type="text/css",e.async=!0,e.href=not_in_mm_css;
var o=document.getElementsByTagName("head")[0];
o.appendChild(e);
var t=document.getElementById("js_pc_qr_code_img");
if(t){
var n=10000004,a=document.referrer;
if(0==a.indexOf("http://weixin.sogou.com")?n=10000001:0==a.indexOf("https://wx.qq.com")&&(n=10000003),
window.isSg)t.setAttribute("src",sg_qr_code);else{
t.setAttribute("src","/mp/qrcode?scene="+n+"&size=102&__biz="+biz);
var s=new Image;
s.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+n+"&r="+Math.random();
}
document.getElementById("js_pc_qr_code").style.display="block";
}
var c=document.getElementById("js_profile_qrcode"),d=document.getElementById("js_profile_arrow_wrp"),p=document.getElementById("post-user");
if(c&&p&&d){
var m=function(){
var e=10000005,o=document.referrer;
0==o.indexOf("http://weixin.sogou.com")?e=10000006:0==o.indexOf("https://wx.qq.com")&&(e=10000007);
var t=document.getElementById("js_profile_qrcode_img");
if(t)if(window.isSg)t.setAttribute("src",sg_qr_code);else{
t.setAttribute("src","/mp/qrcode?scene="+e+"&size=102&__biz="+biz);
var n=new Image;
n.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+e+"&r="+Math.random();
}
return c.style.display="block",d.style.left=p.offsetLeft-c.offsetLeft+p.offsetWidth/2-8+"px",
!1;
};
b.on(p,"click",m),b.on(c,"click",m),b.on(document,"click",function(e){
var o=e.target||e.srcElement;
o!=p&&o!=c&&(c.style.display="none");
});
}
}else{
var l=document.getElementById("js_report_article3");
!!l&&(l.style.display="");
}
}(),function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,o=document.getElementById("img-content");
if(e&&o&&o.getBoundingClientRect){
var t=o.getBoundingClientRect().height;
window.scrollTo(0,t);
}
}(),e("appmsg/report.js");
for(var o=document.getElementsByTagName("map"),t=0,n=o.length;n>t;++t)o[t].parentNode.removeChild(o[t]);
if(v.card_pv_report(),Math.random()<.01)try{
var a="https://js.aq.qq.com/js/aq_common.js",s=document.createElement("script");
s.src=a;
var p=document.getElementsByTagName("head")[0];
p.appendChild(s);
}catch(m){}
var l=document.getElementById("js_close_temp");
b.on(l,"click",function(){
l.parentNode.parentNode.removeChild(l.parentNode),i.removeClass(document.getElementById("js_article"),"preview_appmsg");
});
},1e3),function(){
if(n.os.ios&&"onorientationchange"in window){
var e=[],o="onorientationchange"in window?"orientationchange":"resize",t=function(){
return 90===Math.abs(window.orientation)?1:2;
};
e.push({
ori:t(),
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
var i=(new Date).getHours();
b.on(window,o,function(){
var o=e.length-2,n=t();
if(o>=0){
var a=e[o],r=a.ori;
r!==n||e[e.length-1].istouchmove||(i>=11&&17>=i&&window.__report(63),window.scrollTo(0,a.scroll));
}
e.push({
ori:n,
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
}),b.on(window,"scroll",function(){
var o=e.length-1;
e[o].ori==t()&&(e[o].scroll=window.pageYOffset||document.documentElement.scrollTop,
e[o].istouchmove=!0);
});
}
}(),a("[Appmsg] href:"+location.href+"^^^ ua:"+window.navigator.userAgent),window.addEventListener?window.addEventListener("load",t,!1):window.attachEvent&&window.attachEvent("onload",t),
e("appmsg/fereport.js"),function(){
document.getElementsByTagName("body")[0].addEventListener("copy",function(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_18_1",
u.isIOS&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_19_1"),
u.isAndroid&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_20_1");
},!1);
}(),function(){
window.__observer&&window.__observer_data&&e("biz_wap/safe/mutation_observer_report.js");
}(),"undefined"!=typeof isSg&&e("sougou/index.js");
}
var t=e("biz_wap/jsapi/a8key.js"),n=e("biz_wap/utils/device.js"),i=e("biz_common/dom/class.js"),a=e("appmsg/log.js"),r=e("biz_common/dom/attr.js"),s=r.setProperty,c=e("appmsg/max_age.js"),d=(e("biz_wap/utils/mmversion.js"),
e("appmsg/test.js"));
t.config({
onOutOfWeixinApp:function(){
console.log("onOutOfWeixinApp");
},
onNoCacheFuncWeixin:function(){
console.log("isWeixinCached == false");
},
onAlreadyHasA8Key:function(){
console.log("URL已有A8Key");
},
onJSAPIGetA8KeyStart:function(){
console.log("onJSAPIGetA8KeyStart");
},
onJSAPIGetA8KeyEnd:function(){
console.log("onJSAPIGetA8KeyEnd");
},
onJSAPIGetA8KeyTimeout:function(){
console.log("onJSAPIGetA8KeyTimeout");
}
}),t.onReady(function(){
window.logs.pagetime.jsapi_ready_time=+new Date,window.logs.idkeys={},console.log("进入index.js init"),
o();
});
});