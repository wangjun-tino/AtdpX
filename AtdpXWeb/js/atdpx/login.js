/**
 * Created by WangJun on 2016/3/17.
 */
//�����ú��ڸ���Ϊ
//UrlHeader="http://127.0.0.2:8000"
$(function () {
    //���������
    $(window).bind("resize", function () {
        resizeWindow();
    });
});

$("#login_buttom").click(function () {
    submit();
});
function submit() {
    $.support.cors = true;
    $.ajax({
        type: "GET",
        url: UrlHeader+ "/AtdpX/userInfo/login/",
        data: { username: $("#username").val(), password: $("#userpassword").val()},
        async: false,//ͬ�첽��ʽ
        cache: false,
        dataType: "json",
        success: function (data) {
            if (data.errcode == 0) {
                document.cookie="token="+parseInt(data['data']['token']);
                document.cookie="UrlHeader="+UrlHeader;
                window.location.href = "index.html"
            }
            else {
                alert(data['errmsg'])
                }
            },
        error: function( ) {
                alert("��¼�쳣")
            }
    });
}

function resizeWindow(){
    var tmpHeight = $(document).height() - $("#input-dis").offset().top -70;
    $("#input-dis").css("height", tmpHeight);
    var formLeft = $(document.body).width() / 2 - 150;
    var formTop = tmpHeight / 2 - 70;
    $("#login_index").css("left", formLeft).css("top", formTop);}

