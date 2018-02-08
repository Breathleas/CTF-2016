define("a/sponsor.js",["biz_common/dom/event.js","appmsg/a_report.js","biz_common/utils/url/parse.js"],function(o){
"use strict";
function t(o){
var t=o.adData,e=o.pos_type,r=t.tid,a=t.type,p=(t.adid,t.outer_id,t.url),c=t.rl,s={};
o.report_param=o.report_param||"";
var d=o.adDetailBtn,l=o.adMoreBtn,u=o.adAbout,m=o.adImg;
n.on(d,"click",function(){
u.style.display="none"==window.getComputedStyle(u).display?"initial":"none";
}),n.on(window,"touchend",function(o){
o.target!=u&&o.target!=d&&(u.style.display="none");
}),n.on(m,"click",function(){
location.href=p;
}),n.on(l,"click",function(){
return s[r]||(s[r]=!0,i({
type:a,
report_type:2,
click_pos:0,
url:encodeURIComponent(p),
tid:r,
rl:encodeURIComponent(c),
__biz:biz,
pos_type:e,
pt:t.pt
},function(){
s[r]=!1,location.href=p;
})),!1;
});
}
var n=o("biz_common/dom/event.js"),e=o("appmsg/a_report.js"),i=(o("biz_common/utils/url/parse.js"),
e.AdClickReport);
return t;
});define("appmsg/a_report.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js"],function(t){
"use strict";
function o(t,o){
var a="https:"==top.location.protocol?1500:1200,e="/mp/advertisement_report?r="+Math.random()+"&",c=[],u=!1;
for(var _ in t)t.hasOwnProperty(_)&&c.push(_+"="+t[_]);
e+=c.join("&"),t.tid&&s.gtVersion("6.3.22",!0)&&p.invoke("adDataReport",{
ad_info:"trace_id="+t.tid+"&product_type="+t.pt+"&jump_url="+t.url
},function(){}),i({
url:e,
mayAbort:!0,
type:"GET",
success:function(){
r&&r(56+n);
},
error:function(){
r&&r(57+n);
},
complete:function(){
u||(u=!0,!!o&&o());
},
async:!0
}),setTimeout(function(){
u||(u=!0,window.__ajaxtest="1",!!o&&o());
},a);
}
var i=t("biz_wap/utils/ajax.js"),r=window.__report,a=top.location.protocol,n="https:"==a?5:0,p=t("biz_wap/jsapi/core.js"),s=t("biz_wap/utils/mmversion.js");
return{
AdClickReport:o
};
});define("biz_common/utils/wxgspeedsdk.js",[],function(){
"use strict";
function e(e){
if(!e.pid||!e.speeds)return-1;
if(!e.speeds.length>0){
var n=e.speeds;
e.speeds=[],e.speeds.push(n);
}
for(var t=d(e),o=0;o<e.speeds.length;o++){
var r=e.speeds[o];
r.time=parseInt(r.time),r.sid>20&&r.time>0&&i(t,r.sid,r.time);
}
}
function n(){
s(function(){
setTimeout(function(){
for(var e in p)r({
pid_uin_rid:e,
speeds:p[e]
},c);
p={};
},100);
});
}
function t(e){
s(function(){
if(!e.pid||!e.time)return-1;
var n=d(e);
i(n,9,e.time);
});
}
function o(e){
s(function(){
var n=d(e);
p[n]||(p[n]=[]);
var t=window.performance||window.msPerformance||window.webkitPerformance||{};
if(t&&t.timing){
var o=t.timing||{};
i(n,1,o.domainLookupEnd-o.domainLookupStart),i(n,2,"https:"==location.protocol&&0!=o.secureConnectionStart?o.connectEnd-o.secureConnectionStart:0),
i(n,3,o.connectEnd-o.connectStart),i(n,4,o.responseStart-o.requestStart),i(n,5,o.responseEnd-o.responseStart),
i(n,6,o.domContentLoadedEventStart-o.domLoading),i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),
i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart),function(){
setTimeout(function(){
o.loadEventEnd&&(i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart));
},0);
}(p),p[n][9]||i(n,9,o.domContentLoadedEventStart-o.navigationStart),i(n,10,o.redirectEnd-o.redirectStart),
i(n,11,o.domainLookupStart-o.fetchStart),i(n,12,o.domLoading-o.responseStart);
}
});
}
function i(e,n,t){
p[e]=p[e]||[],p[e][n]=p[e][n]||[],0>t||(21>n?p[e][n][0]=t:p[e][n].push(t));
}
function d(e){
return e&&e.pid?e.pid+"_"+(e.uin||0)+"_"+(e.rid||0):void(console&&console.error("Must provide a pid"));
}
function r(e,n){
var t=e.pid_uin_rid.split("_");
if(3!=t.length)return void(console&&console.error("pid,uin,rid, invalid args"));
for(var o="pid="+t[0]+"&uin="+t[1]+"&rid="+t[2],i=n+o+"&speeds=",d="",r=[],s=1;s<e.speeds.length;s++)if(e.speeds[s]){
for(var a=0;a<e.speeds[s].length;a++){
var p=s+"_"+e.speeds[s][a];
i.length+d.length+p.length<1024?d=d+p+";":(d.length&&r.push(i+d.substring(0,d.length-1)),
d=p+";");
}
s==e.speeds.length-1&&r.push(i+d.substring(0,d.length-1));
}
for(var s=0;s<r.length;s++)(new Image).src=r[s];
}
function s(e){
"complete"==document.readyState?e():u.push(e);
}
function a(){
for(var e in u)u[e]();
u=[];
}
var p={},c="https://badjs.weixinbridge.com/frontend/reportspeed?",u=[];
return window.addEventListener?window.addEventListener("load",a,!1):window.attachEvent&&window.attachEvent("onload",a),
{
saveSpeeds:e,
send:n,
setFirstViewTime:t,
setBasicTime:o
};
});define("biz_common/utils/http.js",[],function(){
"use strict";
function t(){
var t=document.getElementsByTagName("html");
if(t&&1==!!t.length){
t=t[0].innerHTML;
var e=t.replace(/[\x00-\xff]/g,""),n=t.replace(/[^\x00-\xff]/g,"");
return 1*n.length+3*e.length+"<!DOCTYPE html><html></html>".length;
}
return 0;
}
return{
htmlSize:t()
};
});define("appmsg/a.js",["biz_common/dom/event.js","biz_common/utils/url/parse.js","appmsg/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","a/card.js","a/mpshop.js","biz_wap/jsapi/core.js","a/profile.js","a/android.js","a/ios.js","a/gotoappdetail.js","a/sponsor.js"],function(require,exports,module,alert){
"use strict";
function ad_click(e,t,a,o,i,p,n,r,s,_,d,l,c,m,u,g){
if(!has_click[i]){
has_click[i]=!0;
var f=document.getElementById("loading_"+i);
f&&(f.style.display="inline"),AdClickReport({
click_pos:1,
report_type:2,
type:e,
url:encodeURIComponent(t),
tid:i,
rl:encodeURIComponent(a),
__biz:biz,
pos_type:_,
pt:s,
pos_x:c,
pos_y:m,
ad_w:u,
ad_h:g
},function(){
if(has_click[i]=!1,f&&(f.style.display="none"),"5"==e)location.href="/mp/profile?source=from_ad&tousername="+t+"&ticket="+p+"&uin="+uin+"&key="+key+"&__biz="+biz+"&mid="+mid+"&idx="+idx+"&tid="+i;else{
if("105"==s&&l)return void Card.openCardDetail(l.card_id,l.card_ext,l);
if("106"==s&&l)return void(location.href=ParseJs.join(t,{
outer_id:l.outer_id
}));
if(0==t.indexOf("https://itunes.apple.com/")||0==t.indexOf("http://itunes.apple.com/"))return JSAPI.invoke("downloadAppInternal",{
appUrl:t
},function(e){
e.err_msg&&-1!=e.err_msg.indexOf("ok")||(location.href="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(t)+"&ticket="+p+"&uin="+uin);
}),!1;
if(-1==t.indexOf("mp.weixin.qq.com"))t="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(t);else if(-1==t.indexOf("mp.weixin.qq.com/s")&&-1==t.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var a={
source:4,
tid:i,
idx:idx,
mid:mid,
appuin:biz,
pt:s,
aid:r,
ad_engine:d,
pos_type:_
},o=window.__report;
if("104"==s&&l||-1!=t.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var n="",c="";
l&&(n=l.pkgname&&l.pkgname.replace(/\./g,"_"),c=l.channel_id||""),a={
source:4,
traceid:i,
mid:mid,
idx:idx,
appuin:biz,
pt:s,
channel_id:c,
aid:r,
engine:d,
pos_type:_,
pkgname:n
};
}
t=URL.join(t,a),(0==t.indexOf("http://mp.weixin.qq.com/promotion/")||0==t.indexOf("https://mp.weixin.qq.com/promotion/"))&&(t=URL.join(t,{
traceid:i,
aid:r,
engine:d
})),!r&&o&&o(80,t);
}
location.href=t;
}
});
}
}
var js_bottom_ad_area=document.getElementById("js_bottom_ad_area"),js_top_ad_area=document.getElementById("js_top_ad_area"),js_sponsor_ad_area=document.getElementById("js_sponsor_ad_area"),pos_type=window.pos_type||0,adDatas=window.adDatas,__report=window.__report,total_pos_type=4,el_gdt_areas={
pos_3:js_sponsor_ad_area,
pos_1:js_top_ad_area,
pos_0:js_bottom_ad_area
},gdt_as={
pos_3:js_sponsor_ad_area.getElementsByClassName("js_ad_link"),
pos_1:js_top_ad_area.getElementsByClassName("js_ad_link"),
pos_0:js_bottom_ad_area.getElementsByClassName("js_ad_link")
};
if(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger"))return js_sponsor_ad_area.style.display="none",
js_top_ad_area.style.display="none",js_bottom_ad_area.style.display="none",!1;
var has_click={},DomEvent=require("biz_common/dom/event.js"),URL=require("biz_common/utils/url/parse.js"),AReport=require("appmsg/a_report.js"),AdClickReport=AReport.AdClickReport,ajax=require("biz_wap/utils/ajax.js"),position=require("biz_wap/utils/position.js"),Card=require("a/card.js"),MpShop=require("a/mpshop.js"),JSAPI=require("biz_wap/jsapi/core.js"),ParseJs=require("biz_common/utils/url/parse.js"),ping_apurl={
pos_0:!1,
pos_1:!1,
pos_3:!1
},ping_cpm_apurl={
pos_0:{},
pos_1:{},
pos_3:{}
},ping_test_apurl={
pos_0:[],
pos_1:[],
pos_3:[]
},ping_test_apurl_random=Math.random()<.3,innerHeight=window.innerHeight||document.documentElement.clientHeight,ad_engine=0;
if(adDatas.num>0){
var onScroll=function(){
for(var scrollTop=window.pageYOffset||document.documentElement.scrollTop,i=0;total_pos_type>i;++i)!function(i){
var pos_key="pos_"+i,gdt_a=gdt_as[pos_key];
if(gdt_a=!!gdt_a&&gdt_a[0],gdt_a&&gdt_a.dataset&&gdt_a.dataset.apurl){
var gid=gdt_a.dataset.gid,tid=gdt_a.dataset.tid,apurl=gdt_a.dataset.apurl,is_cpm=1*gdt_a.dataset.is_cpm,pos_type=adDatas.ads[pos_key].a_info.pos_type,gdt_area=el_gdt_areas[pos_key],offsetTop=gdt_area.offsetTop,adHeight=gdt_a.clientHeight,adOffsetTop=offsetTop+gdt_a.offsetTop;
adDatas.ads[pos_key].ad_engine=0,-1!=apurl.indexOf("ad.wx.com")&&(adDatas.ads[pos_key].ad_engine=1),
function(){
try{
var e=window.__report,t=ping_test_apurl[pos_key],a=new Date,o=a.getHours(),i=ping_test_apurl_random&&o>=12&&18>=o&&0==pos_type;
!t[0]&&i&&scrollTop+innerHeight>offsetTop&&(t[0]=!0,e(81)),!t[1]&&i&&scrollTop+innerHeight>offsetTop+40&&(t[1]=!0,
e(82));
}catch(p){}
}(),ping_apurl[pos_key]||(0==pos_type&&scrollTop+innerHeight>offsetTop||1==pos_type&&(10>=scrollTop||scrollTop-10>=offsetTop)||3==pos_type&&scrollTop+innerHeight>offsetTop)&&(ping_apurl[pos_key]=!0,
ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl)+"&__biz="+biz+"&pos_type="+pos_type+"&r="+Math.random(),
mayAbort:!0,
success:function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret?ping_apurl[pos_key]=!1:ping_apurl.pos_0&&ping_apurl.pos_1;
},
error:function(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_27_1";
},
async:!0
}));
var ping_cpm_apurl_obj=ping_cpm_apurl[pos_key];
if(is_cpm&&!ping_cpm_apurl_obj.hasPing){
var rh=.5;
scrollTop+innerHeight>=adOffsetTop+adHeight*rh&&adOffsetTop+adHeight*(1-rh)>=scrollTop?ping_cpm_apurl_obj.clk||(ping_cpm_apurl_obj.clk=setTimeout(function(){
ping_cpm_apurl_obj.hasPing=!0,ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl+"&viewable=true")+"&__biz="+biz+"&pos_type="+pos_type+"&r="+Math.random(),
mayAbort:!0,
success:function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret&&(ping_cpm_apurl_obj.hasPing=!1);
},
async:!0
});
},1001)):ping_cpm_apurl_obj.clk&&(clearTimeout(ping_cpm_apurl_obj.clk),ping_cpm_apurl_obj.clk=null);
}
}
}(i);
};
DomEvent.on(window,"scroll",onScroll),onScroll();
}
for(var keyOffset="https:"==top.location.protocol?5:0,i=0;total_pos_type>i;++i)!function(e){
var t="pos_"+e,a=el_gdt_areas[t];
if(!a)return!1;
if(!a.getElementsByClassName)return a.style.display="none",!1;
var o=a.getElementsByClassName("js_ad_link")||[],i=adDatas.ads[t];
if(i){
for(var p=i.adData,n=i.a_info,r=n.pos_type,s=i.ad_engine,_=0,d=o.length;d>_;++_)!function(e,t){
var a=o[e],i=a.dataset;
if(i&&3!=n.pos_type){
var p=i.type,_=i.url,d=i.rl,l=i.apurl,c=i.tid,m=i.ticket,u=i.group_id,g=i.aid,f=i.pt;
DomEvent.on(a,"click",function(e){
var a=!!e&&e.target;
if(!a||!a.className||-1==a.className.indexOf("js_ad_btn")){
var o,i,n,y;
return o=position.getX(a,"js_ad_link")+e.offsetX,i=position.getY(a,"js_ad_link")+e.offsetY,
n=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
y=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight,
ad_click(p,_,d,l,c,m,u,g,f,r,s,t,o,i,n,y),!1;
}
},!0);
}
}(_,p);
if(p){
p.adid=window.adid||p.adid;
var l="&tid="+p.traceid+"&uin="+uin+"&key="+key+"&ticket="+(p.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+p.adid+"&ad_engine="+s+"&pos_type="+r+"&r="+Math.random();
if(p.report_param=l,"100"==p.pt){
var c=require("a/profile.js");
return void new c({
btnViewProfile:document.getElementById("js_view_profile_"+r),
btnAddContact:document.getElementById("js_add_contact_"+r),
adData:p,
pos_type:r,
report_param:l
});
}
if("102"==p.pt){
var m=require("a/android.js"),u=15,g=p.pkgname&&p.pkgname.replace(/\./g,"_");
return void new m({
btn:document.getElementById("js_app_action_"+r),
adData:p,
report_param:l,
task_ext_info:[p.adid,p.traceid,g,source,u,s].join("."),
via:[p.traceid,p.adid,g,source,u,s].join(".")
});
}
if("101"==p.pt){
var f=require("a/ios.js");
return void new f({
btn:document.getElementById("js_app_action_"+r),
adData:p,
ticket:p.ticket,
report_param:l
});
}
if("103"==p.pt||"104"==p.pt){
var y=require("a/gotoappdetail.js"),u=15,g=p.pkgname&&p.pkgname.replace(/\./g,"_");
return void new y({
btn:document.getElementById("js_appdetail_action_"+r),
js_app_rating:document.getElementById("js_app_rating_"+r),
adData:p,
report_param:l,
pos_type:r,
url_scheme:p.url_scheme,
via:[p.traceid,p.adid,g,source,u,s].join("."),
ticket:p.ticket,
appdetail_params:["&aid="+p.adid,"traceid="+p.traceid,"pkgname="+g,"source="+source,"type="+u,"engine="+s,"appuin="+biz,"pos_type="+r,"ticket="+p.ticket,"scene="+scene].join("&")
});
}
if("105"==p.pt)return void new Card({
btn:document.getElementById("js_card_action_"+r),
adData:p,
report_param:l,
pos_type:r
});
if("106"==p.pt)return void new MpShop({
btn:document.getElementById("js_shop_action_"+r),
adData:p,
report_param:l,
pos_type:r
});
if("108"==p.pt||"109"==p.pt||"110"==p.pt){
var j=require("a/sponsor.js");
new j({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adData:p,
pos_type:r,
report_param:l
});
}
}
}
}(i);
});define("appmsg/sponsor_a_tpl.html.js",[],function(){
return'<div class="ct_mpda_area" id="js_ad_area">\n    <div class="ct_mpda_placeholder">\n        <p class="ct_mpda_tips">广告，也是生活的一部分</p>\n    </div>\n    <div class="ct_mpda_inner js_ad_link" id="js_ad_inner" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>" data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <div class="ct_mpda_hd">\n            <span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url(<#=image_url#>)"></span> \n        </div>\n        <div class="ct_mpda_bd js_ad_btn">\n            <span class="ct_mpda_logo img_bg_cover" style="background-image:url(<#=biz_info.head_img#>)"></span>\n            <div class="ct_mpda_desc_box" id="js_ad_desc">\n                <p class="ct_mpda_title"><#=biz_info.nick_name#></p>\n                <p class="ct_mpda_details" id="js_ad_detail">提供的广告</p>\n            </div>\n            <# if(pt== 108){ #>\n            <a class="ct_mpda_btn_more" id="js_ad_more">了解详情</a>\n            <# }else if(pt==109){ #>\n            <a class="ct_mpda_btn_more" id="js_ad_more">下载应用</a>\n            <# }else if(pt==110){ #>\n            <a class="ct_mpda_btn_more" id="js_ad_more">了解公众号</a>\n            <# } #>\n            <a class="ct_mpda_btn_about" id="js_btn_about" href="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/trade_about.html?aid=<#=aid#>&tid=<#=traceid#>#wechat_redirect">关于广告</a>\n        </div>\n    </div>\n</div>';
});define("appmsg/fereport.js",["biz_common/utils/wxgspeedsdk.js","biz_common/utils/http.js"],function(o){
"use strict";
function e(){
var o=window.performance||window.msPerformance||window.webkitPerformance;
if(o&&o.timing){
var e=o.timing,t=0,d=0,s=window.location.protocol,m=Math.random(),a=1>10*m,r=1>20*m,p=1>25*m,_=1>100*m,w=1>250*m,l=1>300*m,c=1>500*m,u=!0;
if("https:"==s?(t=18,d=27,u=!1):"http:"==s&&(t=9,d=19),window.__moonloadtime__){
var S,g=window.__moonloadtime__-e.navigationStart;
S=localStorage&&JSON.parse(localStorage.getItem("__WXLS__moonarg"))&&"fromls"==JSON.parse(localStorage.getItem("__WXLS__moonarg")).method?21:22,
(21==S||22==S&&_)&&i.saveSpeeds({
uin:uin,
pid:t,
speeds:{
sid:S,
time:g
}
});
}
window.__moondownloadtime&&(l&&u||_&&!u)&&i.saveSpeeds({
uin:uin,
pid:t,
speeds:{
sid:23,
time:window.__moondownloadtime
}
}),window.__moonmoddownloadtime&&(_&&u||r&&!u)&&i.saveSpeeds({
uin:uin,
pid:t,
speeds:{
sid:24,
time:window.__moonmoddownloadtime
}
});
var v=e.domContentLoadedEventStart-e.navigationStart;
if(v>3e3&&(a&&u||p&&!u)&&(i.setBasicTime({
uin:uin,
pid:d
}),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_28_1&lc=1&log0="+encodeURIComponent(location.href)),
(w&&u||_&&!u)&&i.setBasicTime({
uin:uin,
pid:t
}),n.htmlSize&&c){
var f=Math.ceil(n.htmlSize/1e3)/(e.responseEnd-e.responseStart);
i.saveSpeeds({
uin:uin,
pid:t,
speeds:{
sid:25,
time:Math.round(f)
}
});
}
i.send();
}
}
var i=o("biz_common/utils/wxgspeedsdk.js"),n=o("biz_common/utils/http.js");
e();
});define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/cookie.js","biz_common/utils/http.js","appmsg/cdn_img_lib.js","biz_wap/utils/storage.js"],function(e){
"use strict";
function t(e){
for(var t=5381,o=0;o<e.length;o++)t=(t<<5)+t+e.charCodeAt(o),t&=2147483647;
return t;
}
function o(e,t){
if(e&&!(e.length<=0))for(var o,n,i,a=/http(s)?\:\/\/([^\/\?]*)(\?|\/)?/,d=0,m=e.length;m>d;++d)o=e[d],
o&&(n=o.getAttribute(t),n&&(i=n.match(a),i&&i[2]&&(g[i[2]]=!0)));
}
function n(e){
for(var t=0,o=p.length;o>t;++t)if(p[t]==e)return!0;
return!1;
}
function i(){
g={},o(document.getElementsByTagName("a"),"href"),o(document.getElementsByTagName("link"),"href"),
o(document.getElementsByTagName("iframe"),"src"),o(document.getElementsByTagName("script"),"src"),
o(document.getElementsByTagName("img"),"src");
var e=[];
for(var t in g)g.hasOwnProperty(t)&&(window.networkType&&"wifi"==window.networkType&&!u&&n(t)&&(u=!0),
e.push(t));
return g={},e.join(",");
}
function a(){
var e,t=window.pageYOffset||document.documentElement.scrollTop,o=document.getElementById("js_content"),n=document.documentElement.clientHeight||window.innerHeight,a=document.body.scrollHeight||document.body.offsetHeight,d=Math.ceil(a/n),r=Math.ceil((o.scrollHeight||o.offsetHeight)/n),l=(window.logs.read_height||t)+n,w=document.getElementById("js_toobar3").offsetTop,_=o.getElementsByTagName("img")||[],g=Math.ceil(l/n)||1,p=document.getElementById("media"),f=50,h=0,y=0,b=0,v=0,T=l+f>w?1:0;
g>d&&(g=d);
var j=function(t){
if(t)for(var o=0,n=t.length;n>o;++o){
var i=t[o];
if(i){
h++;
var a=i.getAttribute("src"),d=i.getAttribute("data-type");
a&&0==a.indexOf("http")&&(y++,a.isCDN()&&(b++,-1!=a.indexOf("tp=webp")&&v++),d&&(e["img_"+d+"_cnt"]=e["img_"+d+"_cnt"]||0,
e["img_"+d+"_cnt"]++));
}
}
e.download_cdn_webp_img_cnt=v||0,e.download_img_cnt=y||0,e.download_cdn_img_cnt=b||0,
e.img_cnt=h||0;
},z=window.appmsgstat||{},O=window.logs.img||{},E=window.logs.pagetime||{},k=O.load||{},x=O.read||{},S=[],B=[],D=0,N=0,I=0;
for(var H in x)H&&0==H.indexOf("http")&&x.hasOwnProperty(H)&&B.push(H);
for(var H in k)H&&0==H.indexOf("http")&&k.hasOwnProperty(H)&&S.push(H);
for(var M=0,A=S.length;A>M;++M){
var P=S[M];
P&&P.isCDN()&&(-1!=P.indexOf("/0")&&D++,-1!=P.indexOf("/640")&&N++,-1!=P.indexOf("/300")&&I++);
}
var e={
__biz:biz,
title:msg_title.htmlDecode(),
mid:mid,
idx:idx,
read_cnt:z.read_num||0,
like_cnt:z.like_num||0,
screen_height:n,
screen_num:r,
idkey:"",
copyright_stat:"",
ori_article_type:"",
video_cnt:window.logs.video_cnt||0,
read_screen_num:g||0,
is_finished_read:T,
scene:source,
content_len:c.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime(),
img_640_cnt:N,
img_0_cnt:D,
img_300_cnt:I,
wtime:E.onload_time||0,
ftime:E.ftime||0,
ptime:E.ptime||0,
onload_time:E.onload_time||0,
reward_heads_total:window.logs.reward_heads_total||0,
reward_heads_fail:window.logs.reward_heads_fail||0,
outer_pic:window.logs.outer_pic||0,
publish_time:ct
};
if(window.networkType&&"wifi"==window.networkType&&(e.wifi_all_imgs_cnt=S.length,
e.wifi_read_imgs_cnt=B.length),window.logs.webplog&&4==window.logs.webplog.total){
var R=window.logs.webplog;
e.webp_total=1,e.webp_lossy=R.lossy,e.webp_lossless=R.lossless,e.webp_alpha=R.alpha,
e.webp_animation=R.animation;
}
if(e.copyright_stat=window._copyright_stat||"",e.ori_article_type=window._ori_article_type||"",
window.__addIdKeyReport&&window.moon&&(moon.hit_num>0&&moon.hit_num<1e3&&window.__addIdKeyReport(27613,30,moon.hit_num),
moon.mod_num>0&&moon.mod_num<1e3&&window.__addIdKeyReport(27613,31,moon.mod_num)),
window.logs.idkeys){
var Y=window.logs.idkeys,q=[];
for(var C in Y)if(Y.hasOwnProperty(C)){
var J=Y[C];
J.val>0&&q.push(C+"_"+J.val);
}
e.idkey=q.join(";");
}
j(!!p&&p.getElementsByTagName("img")),j(_);
var K=(new Date).getDay(),L=i();
(u||0!==user_uin&&Math.floor(user_uin/100)%7==K)&&(e.domain_list=L),u&&(e.html_content=s),
window.isSg&&(e.from="sougou"),e.source=window.friend_read_source||"",e.req_id=window.req_id||"",
e.recommend_version=window.friend_read_version||"",e.class_id=window.friend_read_class_id||"",
m({
url:"/mp/appmsgreport?action=page_time",
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
});
}
e("biz_common/utils/string/html.js");
var d=e("biz_common/dom/event.js"),m=e("biz_wap/utils/ajax.js"),r=(e("biz_common/utils/cookie.js"),
e("biz_common/utils/http.js"));
e("appmsg/cdn_img_lib.js");
var s,l=e("biz_wap/utils/storage.js"),w=new l("ad"),_=new l("page_pos"),c={};
!function(){
s=document.getElementsByTagName("html"),s&&1==!!s.length&&r&&(s=s[0].innerHTML,c.content_length=r.htmlSize),
window.logs.pageinfo=c;
}();
var g={},u=!1,p=["wap.zjtoolbar.10086.cn","125.88.113.247","115.239.136.61","134.224.117.240","hm.baidu.com","c.cnzz.com","w.cnzz.com","124.232.136.164","img.100msh.net","10.233.12.76","wifi.witown.com","211.137.132.89","qiao.baidu.com","baike.baidu.com"],f=null,h=0,y=msg_link.split("?").pop(),b=t(y);
!function(){
if(window.localStorage&&!localStorage.getItem("clear_page_pos")){
for(var e=localStorage.length-1;e>=0;){
var t=localStorage.key(e);
t.match(/^\d+$/)?localStorage.removeItem(t):t.match(/^adinfo_/)&&localStorage.removeItem(t),
e--;
}
localStorage.setItem("clear_page_pos","true");
}
}(),window.localStorage&&(d.on(window,"load",function(){
h=1*_.get(b);
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=(document.getElementById("img-content"),
document.getElementById("js_cmt_area"));
if(e&&t&&t.offsetTop){
var o=t.offsetTop;
window.scrollTo(0,o-25);
}else window.scrollTo(0,h);
}),d.on(window,"unload",function(){
if(_.set(o,h,+new Date+72e5),window.__ajaxtest="2",window._adRenderData&&"undefined"!=typeof JSON&&JSON.stringify){
var e=JSON.stringify(window._adRenderData),t=+new Date,o=[biz,sn,mid,idx].join("_");
w.set(o,{
info:e,
time:t
},+new Date+24e4);
}
a();
}),window.logs.read_height=0,d.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(f),f=setTimeout(function(){
h=window.pageYOffset,_.set(b,h,+new Date+72e5);
},500);
}),d.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(f),f=setTimeout(function(){
h=window.pageYOffset,_.set(b,h,+new Date+72e5);
},500);
}));
});define("appmsg/cdn_speed_report.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function i(){
function e(e){
var i=[];
for(var n in e)i.push(n+"="+encodeURIComponent(e[n]||""));
return i.join("&");
}
if(networkType){
var i=window.performance||window.msPerformance||window.webkitPerformance;
if(i&&"undefined"!=typeof i.getEntries){
var n,t,a=100,o=document.getElementsByTagName("img"),s=o.length,p=navigator.userAgent,m=!1;
/micromessenger\/(\d+\.\d+)/i.test(p),t=RegExp.$1;
for(var g=0,w=o.length;w>g;g++)if(n=parseInt(100*Math.random()),!(n>a)){
var d=o[g].getAttribute("src");
if(d&&!(d.indexOf("mp.weixin.qq.com")>=0)){
for(var f,u=i.getEntries(),c=0;c<u.length;c++)if(f=u[c],f.name==d){
var _=o[g].getAttribute("data-fail");
r({
type:"POST",
url:"/mp/appmsgpicreport?__biz="+biz+"#wechat_redirect",
data:e({
rnd:Math.random(),
uin:uin,
version:version,
client_version:t,
device:navigator.userAgent,
time_stamp:parseInt(+new Date/1e3),
url:d,
img_size:o[g].fileSize||0,
user_agent:navigator.userAgent,
net_type:networkType,
appmsg_id:window.appmsgid||"",
sample:s>100?100:s,
delay_time:parseInt(f.duration),
from:window.isSg?"sougou":"",
fail:_
})
}),m=!0;
break;
}
if(m)break;
}
}
}
}
}
var n=e("biz_common/dom/event.js"),t=e("biz_wap/jsapi/core.js"),r=e("biz_wap/utils/ajax.js"),a={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
t.invoke("getNetworkType",{},function(e){
networkType=a[e.err_msg],i();
}),n.on(window,"load",i,!1);
});define("appmsg/wxtopic.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","appmsg/topic_tpl.html.js"],function(t){
"use strict";
function e(t){
t.parentNode.removeChild(t);
}
function i(t,e){
var i=c;
e.img_url||(e.img_url=topic_default_img);
for(var o in e){
var a=new RegExp("{"+o+"}","g");
i=i.replace(a,e[o]);
}
var p=document.createElement("span");
p.className="db topic_area",p.innerHTML=i,t.parentNode.insertBefore(p,t),t.parentNode.removeChild(t),
p.onclick=function(){
var e=location.protocol+"//mp.weixin.qq.com/mp/topic?action=topic_detail_page&topic_id="+t.getAttribute("data-topic-id")+"&topic_type="+t.getAttribute("data-topic-type")+"&scene=101#wechat_redirect";
r.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
t&&-1!==t.err_msg.indexOf(":ok")||(location.href=e);
});
};
}
function o(t){
var o=t.getAttribute("data-topic-id"),a=t.getAttribute("data-topic-type");
p({
url:"/mp/topic?action=get_topic_info",
type:"post",
data:{
topic_id:o,
topic_type:a,
biz:biz
},
success:function(o){
if(console.log(o),o=JSON.parse(o),0!=o.base_resp.ret)return void e(t);
var a={
title:o.title,
author:o.author||o.leading_actor.replace(/\$\$/g," / "),
img_url:o.img_url,
msg_num:o.msg_num
};
i(t,a);
},
error:function(){
e(t);
}
});
}
function a(){
for(var t=document.getElementsByTagName("wxtopic"),e=0;e<t.length;e++)o(t[e]);
}
var p=t("biz_wap/utils/ajax.js"),r=t("biz_wap/jsapi/core.js"),c=t("appmsg/topic_tpl.html.js");
a();
});define("appmsg/voice.js",["biz_common/utils/string/html.js","pages/voice_tpl.html.js","pages/voice_component.js"],function(e){
"use strict";
function i(){
var e=p("js_content");
return e?(d._oElements=e.getElementsByTagName("mpvoice")||[],d._oElements.length<=0?!1:!0):!1;
}
function t(){
d.musicLen=d._oElements.length;
}
function n(){
for(var e=0,i=0;i<d.musicLen;i++){
var t=d._oElements[i],n={};
n.voiceid=a(decodeURIComponent(t.getAttribute("voice_encode_fileid")||"")),n.voiceid=n.voiceid.replace(/&#61;/g,"=").replace(/^\s/,"").replace(/\s$/,""),
n.src=d.srcRoot.replace("#meidaid#",n.voiceid),n.voiceid&&"undefined"!=n.voiceid&&(o(t,n,e),
e++);
}
}
function o(e,i,t){
i.duration=1*e.getAttribute("play_length")||0,i.duration_str=s(i.duration),i.posIndex=t,
i.title=a(decodeURIComponent(e.getAttribute("name")||"")).replace(/^\s/,"").replace(/\s$/,""),
m.renderPlayer(g,i,e),c(i),d.musicList[i.voiceid+"_"+i.posIndex]=i;
}
function c(e){
var i=e.voiceid+"_"+e.posIndex,t=r(e.title);
e.player=m.init({
type:2,
songId:e.voiceid,
comment_id:"",
src:e.src,
duration:1*(e.duration/1e3).toFixed(2),
title:t,
singer:window.nickname?window.nickname+"的语音":"公众号语音",
epname:"来自文章",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"playing",
playCssDom:p("voice_main_"+i),
playArea:p("voice_main_"+i),
progress:p("voice_progress_"+i)
});
}
function r(e){
return e=(e||"").replace(/&#96;/g,"`").replace(/&#61;/g,"=").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
}
function a(e){
return e=(e||"").replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/=/g,"&#61;").replace(/`/g,"&#96;");
}
function s(e){
if(isNaN(e))return"0:00";
var i=new Date(0),t=new Date(1*e),n=t.getHours()-i.getHours(),o=t.getMinutes()+60*n,c="i:ss".replace(/i|I/g,o).replace(/ss|SS/,l(t.getSeconds(),2));
return c;
}
function l(e,i){
for(var t=0,n=i-(e+"").length;n>t;t++)e="0"+e;
return e+"";
}
function p(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var g=e("pages/voice_tpl.html.js"),m=e("pages/voice_component.js"),d={
musicList:{},
musicLen:0,
srcRoot:location.protocol+"//res.wx.qq.com/voice/getvoice?mediaid=#meidaid#"
};
return i()?(t(),n(),d.musicList):void 0;
});define("appmsg/qqmusic.js",["biz_common/utils/string/html.js","pages/qqmusic_tpl.html.js","pages/voice_component.js"],function(e){
"use strict";
function i(){
var e=u("js_content");
return e?(p._oElements=e.getElementsByTagName("qqmusic")||[],p._oElements.length<=0?!1:!0):!1;
}
function t(){
p.musicLen=p._oElements.length;
}
function m(){
for(var e=0,i=0;i<p.musicLen;i++){
var t=p._oElements[i],m={};
m.musicid=r(t.getAttribute("musicid")||"").replace(/^\s/,"").replace(/\s$/,""),m.comment_id=r(t.getAttribute("commentid")||"").replace(/^\s/,"").replace(/\s$/,""),
m.musicid&&"undefined"!=m.musicid&&m.comment_id&&"undefined"!=m.comment_id&&(c(t,m,e),
e++);
}
}
function c(e,i,t){
i.media_id=r(e.getAttribute("mid")||"").replace(/^\s/,"").replace(/\s$/,""),i.duration=e.getAttribute("play_length")||0,
i.posIndex=t,i.musicImgPart=r(e.getAttribute("albumurl")||"").replace(/^\s/,"").replace(/\s$/,""),
i.music_img=p.imgroot+i.musicImgPart,i.audiourl=r(e.getAttribute("audiourl")||"").replace(/^\s/,"").replace(/\s$/,""),
i.singer=r(e.getAttribute("singer")||"").replace(/^\s/,"").replace(/\s$/,""),i.music_name=r(e.getAttribute("music_name")||"").replace(/^\s/,"").replace(/\s$/,""),
o.renderPlayer(l,i,e),n(i),p.musicList[i.musicid+"_"+i.posIndex]=i;
}
function n(e){
var i=e.musicid+"_"+e.posIndex,t=e.comment_id+"_"+e.posIndex,m=["http://i.y.qq.com/v8/playsong.html?songmid=",e.media_id,,"&ADTAG=weixin_gzh#wechat_redirect"].join(""),c=s(e.music_name);
e.player=o.init({
type:0,
comment_id:e.comment_id,
mid:e.media_id,
songId:e.musicid,
duration:1*(e.duration/1e3).toFixed(2),
title:c,
singer:window.nickname?window.nickname+"推荐的歌":"公众号推荐的歌",
epname:"QQ音乐",
coverImgUrl:e.music_img,
playingCss:"qqmusic_playing",
playCssDom:u("qqmusic_main_"+t),
playArea:u("qqmusic_play_"+i),
detailUrl:m,
detailArea:u("qqmusic_home_"+i)
});
}
function s(e){
return e=(e||"").replace(/&#96;/g,"`").replace(/&#61;/g,"=").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
}
function r(e){
return e=(e||"").replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/=/g,"&#61;").replace(/`/g,"&#96;");
}
function a(){}
function u(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var l=e("pages/qqmusic_tpl.html.js"),o=e("pages/voice_component.js"),p={
imgroot:"https://imgcache.qq.com/music/photo/mid_album_68",
musicList:{},
musicLen:0
};
return i()?(t(),m(),a(),p.musicList):void 0;
});define("appmsg/review_image.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","appmsg/log.js","appmsg/cdn_img_lib.js"],function(e){
"use strict";
function t(e,t){
a.invoke("imagePreview",{
current:e,
urls:t
},function(){
window.__addIdKeyReport&&window.__addIdKeyReport("28307","2");
}),n("[Appmsg] click image, src: "+e);
}
function i(e){
var i=[],a=e.container,n=e.imgs||[];
if(a)for(var p=a.getElementsByTagName("img")||[],o=0,m=p.length;m>o;o++)n.push(p.item(o));
for(var o=0,m=n.length;m>o;o++){
var c=n[o],d=c.getAttribute("data-src")||c.getAttribute("src"),g=c.getAttribute("data-type");
if(d&&!d.isGif()){
for(;-1!=d.indexOf("?tp=webp");)d=d.replace("?tp=webp","");
c.dataset&&c.dataset.s&&d.isCDN()&&(d=d.replace(/\/640$/,"/0"),d=d.replace(/\/640\?/,"/0?")),
d.isCDN()&&(d=r.addParam(d,"wxfrom","3",!0)),e.is_https_res&&(d=d.http2https()),
g&&(d=r.addParam(d,"wxtype",g,!0)),i.push(d),function(e){
s.on(c,"click",function(){
return t(e,i),!1;
});
}(d);
}
}
}
var s=e("biz_common/dom/event.js"),a=e("biz_wap/jsapi/core.js"),r=e("biz_common/utils/url/parse.js"),n=e("appmsg/log.js");
return e("appmsg/cdn_img_lib.js"),i;
});define("appmsg/async.js",["biz_common/utils/string/html.js","appmsg/a_tpl.html.js","appmsg/sponsor_a_tpl.html.js","appmsg/img_copyright_tpl.html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/dom/class.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","biz_wap/utils/storage.js","rt/appmsg/getappmsgext.rt.js","pages/version4video.js","appmsg/cdn_img_lib.js","biz_common/utils/url/parse.js","appmsg/a.js","appmsg/like.js","appmsg/comment.js","appmsg/reward_entry.js","appmsg/iframe.js"],function(require,exports,module,alert){
"use strict";
function saveCopy(e){
var t={};
for(var i in e)if(e.hasOwnProperty(i)){
var r=e[i],a=typeof r;
r="string"==a?r.htmlDecode():r,"object"==a&&(r=saveCopy(r)),t[i]=r;
}
return t;
}
function img_copyright(e){
if(e&&e.img_copy_info&&e.img_copy_info.list){
for(var t={},i=e.img_copy_info.list,r=window.__appmsgCgiData.copyright_stat,a=window.__appmsgCgiData.source_biz,n=0,o=i.length;o>n;n++){
var s=i[n];
if(2==s.type){
if(2==r&&a==s.source_uin)continue;
t[s.img_url]={
source_nickname:s.source_nickname,
source_uin:s.source_uin,
source_encode_biz:s.source_encode_biz||""
};
}
}
for(var p=document.getElementsByTagName("img"),n=0,o=p.length;o>n;n++){
var s=p[n],d=s.getAttribute("data-src")||s.getAttribute("data-backsrc")||"";
if(t[d]){
var m=document.createElement("div");
m.innerHTML=TMPL.tmpl(img_copyright_tpl,t[d]);
{
var _=m.children[0],c=s.parentNode,l=c.insertBefore(_,s),f=l.childNodes[0];
(function(e){
DomEvent.on(l,"click",function(){
var t="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene=112#wechat_redirect";
-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?location.href=t:JSAPI.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
});
});
})(t[d]);
}
l.insertBefore(s,f);
}
}
}
}
function fillVedio(e){
if(vedio_iframes&&vedio_iframes.length>0)for(var t,i,r,a=0,n=vedio_iframes.length;n>a;++a)t=vedio_iframes[a],
i=t.iframe,r=t.src,e&&(r=r.replace(/\&encryptVer=[^\&]*/gi,""),r=r.replace(/\&platform=[^\&]*/gi,""),
r=r.replace(/\&cKey=[^\&]*/gi,""),r=r+"&encryptVer=6.0&platform=61001&cKey="+e),
i.setAttribute("src",r);
}
function fillData(e){
var t=e.adRenderData||{
advertisement_num:0
};
if(!t.flag&&t.advertisement_num>0){
var i=t.advertisement_num,r=t.advertisement_info;
window.adDatas.num=i;
for(var a=0;i>a;++a){
var n=null,o=r[a];
if(o.is_cpm=o.is_cpm||0,o.biz_info=o.biz_info||{},o.app_info=o.app_info||{},o.pos_type=o.pos_type||0,
o.logo=o.logo||"",100==o.pt)n={
usename:o.biz_info.user_name,
pt:o.pt,
url:o.url,
traceid:o.traceid,
adid:o.aid,
ticket:o.ticket,
is_appmsg:!0
};else if(102==o.pt)n={
appname:o.app_info.app_name,
versioncode:o.app_info.version_code,
pkgname:o.app_info.apk_name,
androiddownurl:o.app_info.apk_url,
md5sum:o.app_info.app_md5,
signature:o.app_info.version_code,
rl:o.rl,
traceid:o.traceid,
pt:o.pt,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};else if(101==o.pt)n={
appname:o.app_info.app_name,
app_id:o.app_info.app_id,
icon_url:o.app_info.icon_url,
appinfo_url:o.app_info.appinfo_url,
rl:o.rl,
traceid:o.traceid,
pt:o.pt,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};else if(103==o.pt||104==o.pt||2==o.pt&&o.app_info){
var s=o.app_info.down_count||0,p=o.app_info.app_size||0,d=o.app_info.app_name||"",m=o.app_info.category,_=["万","百万","亿"];
if(s>=1e4){
s/=1e4;
for(var c=0;s>=10&&2>c;)s/=100,c++;
s=s.toFixed(1)+_[c]+"次";
}else s=s.toFixed(1)+"次";
p>=1024?(p/=1024,p=p>=1024?(p/1024).toFixed(2)+"MB":p.toFixed(2)+"KB"):p=p.toFixed(2)+"B",
m=m?m[0]||"其他":"其他";
for(var l=["-","(",":",'"',"'","：","（","—","－","“","‘"],f=-1,u=0,g=l.length;g>u;++u){
var w=l[u],h=d.indexOf(w);
-1!=h&&(-1==f||f>h)&&(f=h);
}
-1!=f&&(d=d.substring(0,f)),o.app_info._down_count=s,o.app_info._app_size=p,o.app_info._category=m,
o.app_info.app_name=d,n={
appname:o.app_info.app_name,
app_rating:o.app_info.app_rating||0,
app_id:o.app_info.app_id,
channel_id:o.app_info.channel_id,
md5sum:o.app_info.app_md5,
rl:o.rl,
pkgname:o.app_info.apk_name,
url_scheme:o.app_info.url_scheme,
androiddownurl:o.app_info.apk_url,
versioncode:o.app_info.version_code,
appinfo_url:o.app_info.appinfo_url,
traceid:o.traceid,
pt:o.pt,
url:o.url,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};
}else if(105==o.pt){
var v=o.card_info.card_id||"",y=o.card_info.card_ext||"";
y=y.htmlDecode();
try{
y=JSON.parse(y),y.outer_str=o.card_info.card_outer_id||"",y=JSON.stringify(y);
}catch(j){
y="{}";
}
n={
card_id:v,
card_ext:y,
pt:o.pt,
ticket:o.ticket||"",
url:o.url,
rl:o.rl,
tid:o.traceid,
traceid:o.traceid,
type:o.type,
adid:o.aid,
is_appmsg:!0
};
}else if(106==o.pt){
var x=o.mp_shop_info.pid||"",b=o.mp_shop_info.outer_id||"";
n={
pid:x,
outer_id:b,
pt:o.pt,
url:o.url,
rl:o.rl,
tid:o.traceid,
traceid:o.traceid,
type:o.type,
adid:o.aid,
is_appmsg:!0
};
}else(108==o.pt||109==o.pt||110==o.pt)&&(n={
pt:o.pt,
ticket:o.ticket||"",
url:o.url,
traceid:o.traceid,
adid:o.aid,
is_appmsg:!0
});
var k=o.image_url;
require("appmsg/cdn_img_lib.js");
var q=require("biz_common/utils/url/parse.js");
k&&k.isCDN()&&(k=k.replace(/\/0$/,"/640"),k=k.replace(/\/0\?/,"/640?"),o.image_url=q.addParam(k,"wxfrom","50",!0)),
adDatas.ads["pos_"+o.pos_type]={
a_info:o,
adData:n
};
}
var E=function(e){
var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
"undefined"!=typeof e&&(t=e);
10>=t&&(D.style.display="block",DomEvent.off(window,"scroll",E));
},z=function(){
var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,t=document.documentElement.clientHeight||window.innerHeight;
O.clientHeight+O.offsetTop<=e+t&&(Class.addClass(document.getElementById("js_ad_area"),"show"),
DomEvent.off(window,"scroll",z));
},I=document.getElementById("js_bottom_ad_area"),D=document.getElementById("js_top_ad_area"),O=document.getElementById("js_sponsor_ad_area"),T=adDatas.ads;
for(var M in T)if(0==M.indexOf("pos_")){
var n=T[M],o=!!n&&n.a_info;
if(n&&o)if(0==o.pos_type)I.innerHTML=TMPL.tmpl(a_tpl,o);else if(1==o.pos_type){
D.style.display="none",D.innerHTML=TMPL.tmpl(a_tpl,o),DomEvent.on(window,"scroll",E);
var B=0;
window.localStorage&&(B=1*localStorage.getItem(M)||0),window.scrollTo(0,B),E(B);
}else if(3==o.pos_type){
O.innerHTML=TMPL.tmpl(sponsor_a_tpl,o),O.style.display="block";
var S=O.clientWidth;
document.getElementById("js_main_img").style.height=S/1.77+"px",DomEvent.on(window,"scroll",z),
z(0);
}
}
require("appmsg/a.js");
}
var C=e.appmsgstat||{};
window.appmsgstat||(window.appmsgstat=C),C.show&&(!function(){
var e=document.getElementById("js_read_area3"),t=document.getElementById("like3");
e.style.display="block",t.style.display="inline",C.liked=window.is_temp_url?window.liked:C.liked,
C.liked&&Class.addClass(t,"praised"),t.setAttribute("like",C.liked?"1":"0");
var i=document.getElementById("likeNum3"),r=document.getElementById("readNum3"),a=window.is_temp_url?window.read_num:C.read_num,n=window.is_temp_url?window.like_num:C.like_num;
a||(a=1),n||(n="赞"),parseInt(a)>1e5?a="100000+":"",parseInt(n)>1e5?n="100000+":"",
r&&(r.innerHTML=a),i&&(i.innerHTML=n);
}(),require("appmsg/like.js")),1==e.comment_enabled&&(window.can_fans_comment_only=e.only_fans_can_comment,
require("appmsg/comment.js")),-1==ua.indexOf("WindowsWechat")&&-1!=ua.indexOf("MicroMessenger")&&e.reward&&(rewardEntry=require("appmsg/reward_entry.js"),
rewardEntry.handle(e.reward,getCountPerLine()));
}
function getAsyncData(){
var is_need_ticket="";
vedio_iframes&&vedio_iframes.length>0&&(is_need_ticket="&is_need_ticket=1");
var is_need_ad=1,_adInfo=null;
if(window.localStorage)try{
var key=[biz,sn,mid,idx].join("_"),_ad=adLS.get(key);
_adInfo=_ad.info;
try{
_adInfo=eval("("+_adInfo+")");
}catch(e){
_adInfo=null;
}
var _adInfoSaveTime=_ad.time,_now=+new Date;
_adInfo&&18e4>_now-1*_adInfoSaveTime&&1*_adInfo.advertisement_num>0?is_need_ad=0:adLS.remove(key);
}catch(e){
is_need_ad=1,_adInfo=null;
}
(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger")||inwindowwx)&&(is_need_ad=0);
var screen_num=Math.ceil(document.body.scrollHeight/(document.documentElement.clientHeight||window.innerHeight)),both_ad=screen_num>=2?1:0;
ajax({
url:"/mp/getappmsgext?__biz="+biz+"&appmsg_type="+appmsg_type+"&mid="+mid+"&sn="+sn+"&idx="+idx+"&scene="+source+"&title="+encodeURIComponent(msg_title.htmlDecode())+"&ct="+ct+"&devicetype="+devicetype.htmlDecode()+"&version="+version.htmlDecode()+"&f=json&r="+Math.random()+is_need_ticket+"&is_need_ad="+is_need_ad+"&comment_id="+comment_id+"&is_need_reward="+is_need_reward+"&both_ad="+both_ad+"&reward_uin_count="+(is_need_reward?3*getCountPerLine():0)+(window.send_time?"&send_time="+send_time:"")+"&ct="+ct+"&msg_daily_idx="+msg_daily_idx,
data:{
is_only_read:is_only_read,
req_id:window.req_id||"",
is_temp_url:window.is_temp_url||0
},
type:"POST",
dataType:"json",
rtId:"27613",
rtKey:"50",
rtDesc:rtGetAppmsgExt,
async:!0,
success:function(e){
if(e)try{
if(e&&e.base_resp&&e.base_resp.wxtoken&&(window.wxtoken=e.base_resp.wxtoken),window.fromWeixinCached&&require("appmsg/iframe.js"),
fillVedio(e.appmsgticket?e.appmsgticket.ticket:""),img_copyright(e),e.ret)return;
var t={};
if(0==is_need_ad)t=_adInfo,t||(t={
advertisement_num:0
});else{
if(e.advertisement_num>0&&e.advertisement_info){
var i=e.advertisement_info;
t.advertisement_info=saveCopy(i);
}
t.advertisement_num=e.advertisement_num;
}
1==is_need_ad&&(window._adRenderData=t),window.wx_user_can_reward=e.user_can_reward,
fillData({
adRenderData:t,
appmsgstat:e.appmsgstat,
comment_enabled:e.comment_enabled,
only_fans_can_comment:e.only_fans_can_comment,
reward:{
reward_total:e.reward_total_count,
reward_head_imgs:e.reward_head_imgs||[],
can_reward:e.can_reward,
timestamp:e.timestamp
}
});
}catch(r){
var a=new Image;
return a.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(r.toString())+"&r="+Math.random()).substr(0,1024),
void(console&&console.error(r));
}
},
error:function(){
var e=new Image;
e.src="http://mp.weixin.qq.com/mp/jsreport?1=1&key=2&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key2]ajax_err&r="+Math.random();
}
});
}
function getCountPerLine(){
return DomEvent.on(window,"resize",function(){
onResize(),rewardEntry&&rewardEntry.render(getCountPerLine());
}),onResize();
}
function onResize(){
var e=window.innerWidth||document.documentElement.clientWidth;
try{
var t=document.getElementById("page-content").getBoundingClientRect();
t.width&&(e=t.width);
}catch(i){}
var r=30,a=34,n=Math.floor(.9*(e-r)/a);
return document.getElementById("js_reward_inner")&&(document.getElementById("js_reward_inner").style.width=n*a+"px"),
getCountPerLine=function(){
return n;
},n;
}
require("biz_common/utils/string/html.js");
var a_tpl=require("appmsg/a_tpl.html.js"),sponsor_a_tpl=require("appmsg/sponsor_a_tpl.html.js"),img_copyright_tpl=require("appmsg/img_copyright_tpl.html.js"),iswifi=!1,ua=navigator.userAgent,in_mm=-1!=ua.indexOf("MicroMessenger"),inwindowwx=-1!=navigator.userAgent.indexOf("WindowsWechat"),DomEvent=require("biz_common/dom/event.js"),offset=200,ajax=require("biz_wap/utils/ajax.js"),Class=require("biz_common/dom/class.js"),JSAPI=require("biz_wap/jsapi/core.js"),TMPL=require("biz_common/tmpl.js"),LS=require("biz_wap/utils/storage.js"),rtGetAppmsgExt=require("rt/appmsg/getappmsgext.rt.js"),rewardEntry,adLS=new LS("ad"),iframes=document.getElementsByTagName("iframe"),iframe,js_content=document.getElementById("js_content"),vedio_iframes=[],w=js_content.offsetWidth,h=3*w/4;
window.logs.video_cnt=0;
for(var i=0,len=iframes.length;len>i;++i){
iframe=iframes[i];
var src=iframe.getAttribute("data-src")||"",realsrc=iframe.getAttribute("src")||src;
if(realsrc){
var Version4video=require("pages/version4video.js");
if(!Version4video.isShowMpVideo()&&(0==realsrc.indexOf("http://v.qq.com/iframe/player.html")||0==realsrc.indexOf("https://v.qq.com/iframe/player.html")||0==realsrc.indexOf("http://v.qq.com/iframe/preview.html")||0==realsrc.indexOf("https://v.qq.com/iframe/preview.html"))||0==realsrc.indexOf("http://z.weishi.com/weixin/player.html")){
-1==realsrc.indexOf("http://z.weishi.com/weixin/player.html")&&-1==src.indexOf("http://z.weixin.com/weixin/player.html")&&(src=src.replace(/^https:/,location.protocol),
src=src.replace(/^http:/,location.protocol),src=src.replace(/preview.html/,"player.html"),
realsrc=realsrc.replace(/^https:/,location.protocol),realsrc=realsrc.replace(/^http:/,location.protocol),
realsrc=realsrc.replace(/preview.html/,"player.html")),realsrc=realsrc.replace(/width=\d+/g,"width="+w),
realsrc=realsrc.replace(/height=\d+/g,"height="+h),in_mm&&(0==realsrc.indexOf("http://v.qq.com/iframe/player.html")||0==realsrc.indexOf("https://v.qq.com/iframe/player.html"))||in_mm&&(0==realsrc.indexOf("http://v.qq.com/iframe/preview.html")||0==realsrc.indexOf("https://v.qq.com/iframe/preview.html"))?vedio_iframes.push({
iframe:iframe,
src:realsrc
}):iframe.setAttribute("src",realsrc),iframe.width=w,iframe.height=h,iframe.style.setProperty&&(iframe.style.setProperty("width",w+"px","important"),
iframe.style.setProperty("height",h+"px","important")),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10),
window.logs.video_cnt++;
continue;
}
}
}
window.adDatas={
ads:{},
num:0
};
var js_toobar=document.getElementById("js_toobar3"),innerHeight=window.innerHeight||document.documentElement.clientHeight,onScroll=function(){
var e=window.pageYOffset||document.documentElement.scrollTop,t=js_toobar.offsetTop;
e+innerHeight+offset>=t&&(getAsyncData(),DomEvent.off(window,"scroll",onScroll));
};
iswifi?(DomEvent.on(window,"scroll",onScroll),onScroll()):getAsyncData();
});define("biz_wap/ui/lazyload_img.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/dom/attr.js","biz_common/ui/imgonepx.js"],function(t){
"use strict";
function i(){
var t=this.images;
if(!t||t.length<=0)return!1;
var i=window.pageYOffset||document.documentElement.scrollTop,e=window.innerHeight||document.documentElement.clientHeight,o=e+40,n=this.offset||20,r=0;
if("wifi"==window.networkType){
var m={
bottom:1,
top:1
};
this.lazyloadHeightWhenWifi&&(m=this.lazyloadHeightWhenWifi()),n=Math.max(m.bottom*e,n),
r=Math.max(m.top*e,r);
}
for(var l=+new Date,c=[],u=this.sw,f=this,g=-1,w=0,p=t.length;p>w;w++)!function(t,e){
var m=t.el.offsetTop,l=t.src;
if(l){
(l.match(/\:\/\/[^\/]+\/mmbiz\//)&&l.indexOf("wx_fmt=gif")>-1||l.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&g++;
var f=r,w=n;
(l.match(/\:\/\/[^\/]+\/mmbiz\//)&&l.indexOf("wx_fmt=gif")>-1||l.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&d&&(f=0,
w=20),!t.show&&(i>=m&&i<=m+t.height+f||m>i&&i+o+w>m)&&(e.inImgRead&&(i>=m&&i<=m+t.height||m>i&&i+o>m)&&e.inImgRead(l,networkType),
e.changeSrc&&(l=e.changeSrc(t.el,l,g)),t.el.onerror=function(){
var t=this;
!!e.onerror&&e.onerror(l,t);
},t.el.onload=function(){
var t=this;
h(t,"height","auto","important"),t.getAttribute("_width")?h(t,"width",t.getAttribute("_width"),"important"):h(t,"width","auto","important"),
!!e.onload&&e.onload(l,t);
},s(t.el,"src",l),c.push(l),t.show=!0,h(t.el,"visibility","visible","important")),
a.isWp&&1*t.el.width>u&&(t.el.width=u);
}
}(t[w],f);
c.length>0&&this.detect&&this.detect({
time:l,
loadList:c,
scrollTop:i
});
}
function e(){
var t=document.getElementsByTagName("img"),e=[],o=this.container,n=this.attrKey||"data-src",a=o.offsetWidth,r=0,m=this.imgOccupied||!1;
o.currentStyle?r=o.currentStyle.width:"undefined"!=typeof getComputedStyle&&(r=getComputedStyle(o).width),
this.sw=1*r.replace("px","");
for(var c=0,d=t.length;d>c;c++){
var u=t.item(c),f=s(u,n);
if(f){
var g=100;
if(u.dataset&&u.dataset.ratio){
var w=1*u.dataset.ratio,p=1*u.dataset.w||a;
"number"==typeof w&&w>0?(p=a>=p?p:a,g=p*w,m||(u.style.width&&u.setAttribute("_width",u.style.width),
h(u,"width",p+"px","important"),h(u,"visibility","visible","important"),u.setAttribute("src",l))):h(u,"visibility","hidden","important");
}else h(u,"visibility","hidden","important");
m||h(u,"height",g+"px","important"),e.push({
el:u,
src:f,
height:g,
show:!1
});
}
}
this.images=e,i.call(this);
}
function o(t){
var e=this,o=e.timer;
clearTimeout(o),e.timer=setTimeout(function(){
i.call(e,t);
},300);
}
function n(t){
r.on(window,"scroll",function(i){
o.call(t,i);
}),setTimeout(function(){
e.call(t,{});
},0),r.on(document,"touchmove",function(i){
o.call(t,i);
}),o.call(t,{});
}
var a=t("biz_wap/utils/mmversion.js"),r=t("biz_common/dom/event.js"),m=t("biz_common/dom/attr.js"),s=m.attr,h=m.setProperty,l=t("biz_common/ui/imgonepx.js"),c=new Date,d=(c.getHours(),
!0);
return n;
});define("appmsg/share.js",["biz_common/utils/string/html.js","appmsg/cdn_img_lib.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","biz_wap/utils/mmversion.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function i(e,i){
var n="";
""!=tid&&(n="tid="+tid+"&aid=54");
var t=e.split("?")[1]||"";
if(t=t.split("#")[0],""!=t){
var o=[t,"mpshare=1","scene="+i,"srcid="+srcid];
return""!=n&&o.push(n),t=o.join("&"),e.split("?")[0]+"?"+t+"#"+(e.split("#")[1]||"");
}
}
function n(e,i,n){
var t=e.split("?").pop();
if(t=t.split("#").shift(),""!=t){
var o=[t,"action=share","action_type="+n,"scene="+window.source,"req_id="+(window.req_id||""),"vid="+("undefined"!=typeof window.reportVid?window.reportVid.join(";"):""),"musicid="+("undefined"!=typeof window.reportMid?window.reportMid.join(";"):""),"voiceid="+("undefined"!=typeof window.reportVoiceid?window.reportVoiceid.join(";"):"")].join("&");
m({
url:"/mp/appmsgreport",
type:"POST",
data:o
});
}
}
function t(e,i){
return e.isCDN()&&(e=o.addParam(e,"wxfrom",i,!0)),e;
}
e("biz_common/utils/string/html.js"),e("appmsg/cdn_img_lib.js");
var o=(e("biz_common/dom/event.js"),e("biz_common/utils/url/parse.js")),s=e("biz_wap/utils/mmversion.js"),m=e("biz_wap/utils/ajax.js"),r=e("biz_wap/jsapi/core.js");
r.call("hideToolbar"),r.call("showOptionMenu");
var a=msg_title.htmlDecode(),d=(msg_source_url.htmlDecode(),""),u=msg_cdn_url||round_head_img,c=msg_link.htmlDecode(),a=msg_title.htmlDecode(),l=msg_desc.htmlDecode();
l=l||c,l=l.replace(/<br\/>/g,"\n"),idx>1&&document.getElementById("js_content")&&1446652800>ct&&(l=document.getElementById("js_content").innerHTML.replace(/<\/?[^>]*\/?>/g,"").htmlDecode().replace(/^(\s*)|(\s*)$/g,"").substr(0,54)),
u.isCDN()&&(u=u.replace(/\/0$/,"/300"),u=u.replace(/\/0\?/,"/300?")),"1"==is_limit_user&&r.call("hideOptionMenu"),
window.is_temp_url&&r.invoke("hideMenuItems",{
menuList:["menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:facebook","menuItem:share:qzone","menuitem:share:weibo","menuItem:share:WeiboApp","menuItem:share:QZone","menuitem:facebook","menuItem:copyUrl","menuItem:share:email","menuitem:copy_url"]
},function(){}),r.on("menu:share:appmessage",function(e){
var o=1,s=t(u,"1");
e&&"favorite"==e.scene&&(o=24,s=t(u,"4")),r.invoke("sendAppMessage",{
appid:d,
img_url:s,
img_width:"640",
img_height:"640",
link:i(c,o),
desc:l,
title:a
},function(){
n(c,fakeid,o);
});
}),r.on("menu:share:timeline",function(){
var e=u;
s.isIOS||(e=t(u,"2")),n(c,fakeid,2),r.invoke("shareTimeline",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(c,2),
desc:l,
title:a
},function(){});
});
r.on("menu:share:weiboApp",function(){
r.invoke("shareWeiboApp",{
img_url:u,
link:i(c,3),
title:a
},function(){
n(c,fakeid,3);
});
}),r.on("menu:share:facebook",function(){
n(c,fakeid,4),r.invoke("shareFB",{
img_url:u,
img_width:"640",
img_height:"640",
link:i(c,4),
desc:l,
title:a
},function(){});
}),r.on("menu:share:QZone",function(){
var e=t(u,"6");
n(c,fakeid,5),r.invoke("shareQZone",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(c,22),
desc:l,
title:a
},function(){});
}),r.on("menu:share:qq",function(){
var e=t(u,"7");
n(c,fakeid,5),r.invoke("shareQQ",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(c,23),
desc:l,
title:a
},function(){});
}),r.on("menu:share:email",function(){
n(c,fakeid,5),r.invoke("sendEmail",{
content:i(c,5),
title:a
},function(){});
});
});define("appmsg/cdn_img_lib.js",[],function(){
"use strict";
function t(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=gif")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_gif\//);
}
function n(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=png")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_png\//);
}
function i(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=jpg")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_jpg\//);
}
function r(t){
return t.indexOf("tp=webp")>-1;
}
String.prototype.http2https=function(){
return this.replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qlogo.cn/");
},String.prototype.https2http=function(){
return this.replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/");
},String.prototype.isCDN=function(){
return 0==this.indexOf("http://mmbiz.qpic.cn/")||0==this.indexOf("https://mmbiz.qlogo.cn/");
},String.prototype.nogif=function(){
var n=this.toString();
return t(n)?n.replace("/0?","/s640?").replace("wx_fmt=gif",""):n;
},String.prototype.isGif=function(){
var n=this.toString();
return t(n);
},String.prototype.getImgType=function(){
var p=this.toString();
return t(p)?"gif":r(p)?"webp":n(p)?"png":i(p)?"jpg":"unknow";
};
});