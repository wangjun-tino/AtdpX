/**
 * Created by WangJun on 2016/3/13.
 */
$("#left-test-li").click(function(){
    window.open("login.html","newwindows","height=400,width=500,top=100,left=50,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no")
});
$("#left-user-li").click(function(){
    var boxHtml=document.getElementById("put-on-box");
    boxHtml.innerHTML="<iframe src='userManage.html'></iframe>"
})