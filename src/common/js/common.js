/**
 * Created by zeng on 2017/2/27.
 */
//判断是浏览器还是APP中
var isAppClient= function(){
  var ua = navigator.userAgent;
  var isAppClient = ((ua.indexOf('AndroidOpinionClient')>-1) || (ua.indexOf('iOSOpinionClient')>-1));
  if(isAppClient) {
    return true;
  }else {
    return false;
  }
}()
//判断是浏览器还是APP中
var isAndorid= function(){
  var ua = navigator.userAgent;
  var isAndorid = (ua.indexOf('AndroidOpinionClient')>-1);
  if(isAndorid) {
    return true;
  }else {
    return false;
  }
}()
var isIOS= function(){
  var ua = navigator.userAgent;
  var isAndorid = (ua.indexOf('iOSOpinionClient')>-1);
  if(isAndorid) {
    return true;
  }else {
    return false;
  }
}()
// global.version=function (ver) {
//   return '<var>new</var>'+ver;
// };

global.checkInstall=function (isQQ,isWechat) {
  if(isWechat==0&&isQQ==0){
    document.getElementById("shareTu").style.display="none";
    return;
  }
  if(isQQ==0){
    document.getElementById("isQQ").parentNode.removeChild(document.getElementById("isQQ"));
    document.getElementById("isQQzone").parentNode.removeChild(document.getElementById("isQQzone"));
  }
  if(isWechat==0){
    document.getElementById("isWechat").parentNode.removeChild(document.getElementById("isWechat"));
    document.getElementById("isWechatFri").parentNode.removeChild(document.getElementById("isWechatFri"));
  }
};
global.isupdate=function (type,ver){//0、无更新1、有更新
  if(type==0){
    alert('无更新')
  }else {
    let version='<var style="color:red">new</var>&nbsp;&nbsp;&nbsp;'+ver;
    document.getElementById("chupdaate").innerHTML=version;
    alert('有更新，版本号为：'+ver)
  }
}

// setTimeout(function () {
//   global.isupdate(1,"2.00")
//   // global.checkInstall(0,0)
// },5000)

export {isAppClient,isAndorid,isIOS}


