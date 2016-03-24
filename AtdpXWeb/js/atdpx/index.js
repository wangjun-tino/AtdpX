/**
 * Created by WangJun on 2016/3/13.
 */
var boxHtml=document.getElementById("put-on-box");
boxHtml.innerHTML="<iframe src='mainPage.html'></iframe>"

$("#left-user-li").click(function(){
    var boxHtml=document.getElementById("put-on-box");
    boxHtml.innerHTML="<iframe src='userManage.html'></iframe>"
    $("#main-box-title").html($("#left-user-li").text())
})
$("#left-test-li").click(function(){
    var boxHtml=document.getElementById("put-on-box");
    boxHtml.innerHTML="<iframe src='testCaseManage.html'></iframe>"
    $("#main-box-title").html($("#left-test-li").text())
})
$("#left-config-li").click(function(){
    var boxHtml=document.getElementById("put-on-box");
    boxHtml.innerHTML="<iframe src='systemConfigManage.html'></iframe>"
    $("#main-box-title").html($("#left-config-li").text())
})
$("#left-link-li").click(function(){
    var boxHtml=document.getElementById("put-on-box");
    boxHtml.innerHTML="<iframe src='Link.html'></iframe>"
    $("#main-box-title").html($("#left-link-li").text())
})
$("#left-Task-li").click(function(){
    var boxHtml=document.getElementById("put-on-box");
    boxHtml.innerHTML="<iframe src='taskManage.html'></iframe>"
    $("#main-box-title").html($("#left-Task-li").text())
})
$("#home-li").click(function(){
    var boxHtml=document.getElementById("put-on-box");
    boxHtml.innerHTML="<iframe src='mainPage.html'></iframe>"
})
$("#user-li").click(function(){
    var boxHtml=document.getElementById("put-on-box");
    boxHtml.innerHTML="<iframe src='userManage.html'></iframe>"
    $("#main-box-title").html($("#left-user-li").text())
})
$("#test-li").click(function(){
    var boxHtml=document.getElementById("put-on-box");
    boxHtml.innerHTML="<iframe src='testCaseManage.html'></iframe>"
    $("#main-box-title").html($("#left-test-li").text())
})
$("#config-li").click(function(){
    var boxHtml=document.getElementById("put-on-box");
    boxHtml.innerHTML="<iframe src='systemConfigManage.html'></iframe>"
    $("#main-box-title").html($("#left-test-li").text())
})
$("#Task-li").click(function(){
    var boxHtml=document.getElementById("put-on-box");
    boxHtml.innerHTML="<iframe src='taskManage.html'></iframe>"
    $("#main-box-title").html($("#Task-li").text())
})
$("#exit-img").click(function(){
    setCookie("token", "", -1)
    window.location.href = "login.html";
})