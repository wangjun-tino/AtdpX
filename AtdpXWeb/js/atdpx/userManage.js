//调试用后期更换为
var UrlHeader=document.cookie.split(";")[1].split("=")[1];
//表格对象构造方法
function Table() {
    //表格数据源
    this.RowsColnumValues;
    //HTML代码
    this.html = "<br><table border=\"1\">";
    //构造表格HTML代码
    this.tags2header = function (page) {
        for (var key in this.RowsColnumValues[0]) {
            this.html += "<td>" + key + "</td>";
        }
        this.html += "</tr>";
        for (var i = 0; i < this.RowsColnumValues.length; i++) {
            this.html += "<tr id=\"button-" + String((page - 1) * 10 + i) + "-tr\" onclick=\"FindEditData('button-" + String((page - 1) * 10 + i) + "-tr')\">";
            for (key in this.RowsColnumValues[0]) {
                this.html += "<td>" + this.RowsColnumValues[i][key] + "</td>";
            }
            this.html += "</tr>";
        }
        this.html += "</table>";
    };
    //展示表格内容
    this.excut = function HtmlTable() {
        var testdiv = document.getElementById("user-table-box");
        testdiv.innerHTML += this.html;
    };
};
//表格数据按页面切片
function getValues(values, page, pageNum) {
    return values.slice(page * pageNum - pageNum, page * pageNum);
};
//读取cookie
//document.cookie="token="+"057065140";
var cookieToken=document.cookie.split(";")[0].split("=")[1];
//允许跨域参数
$.support.cors = true;
//获取名称的方法，参数为一个函数
$.ajax({
    type: "GET",
    data: {"token":cookieToken},
    dataType: 'json',
    async: false,//同异步方式
    cache: false,
    url: UrlHeader + "/AtdpX/userInfo/query/",
    success: function (data) {
        //alert(data['rows']);
        if (data['errcode']!=0)
        {
            alert(data['errmsg'])
        }
        else
            JsonData = data['data'];
    },
    error: function () {
        alert("Error:用户信息查询请求错误！！");
    }
});
//提交数据
function userUpdate(userData) {
    $.support.cors = true;
    $.ajax({
        type: "GET",
        data: {"parameter": JSON.stringify(userData)},
        dataType: 'json',
        async: false,//同异步方式
        //cache:false,
        url: UrlHeader + "/AtdpX/userInfo/update/",
        success: function (data) {
            alert(data['errmsg'])
        },
        error: function () {
            alert("页面提交出现异常");
        }
    });
}
function userDelete(userData) {
    $.support.cors = true;
    $.ajax({
        type: "GET",
        data: userData,
        dataType: 'json',
        async: false,//同异步方式
        cache: false,
        url: UrlHeader + "/AtdpX/userInfo/delete/",
        success: function (data) {
            alert(data['errmsg'])
        },
        error: function () {
            alert("页面删除出现异常");
        }
    });
}
//转json格式
function TrunJsonGroup(jsonDataArray) {
    var jsonArray = []
    for (var i = 0; i < jsonDataArray.length; i++) {
        jsonArray.push(JSON.parse(jsonDataArray[i]))
    }
    return jsonArray
}
//主加载
var values, JsonData, userId;
values = TrunJsonGroup(JsonData)
var userModel = {"userName": "wangjun", "age": "30", "password": "33333", "userId": 1, "realName": "王君"};
var pageNum = 10;
var page = 1;
//总页数
$("#table-page-count").html("共" + String(Math.ceil(values.length / pageNum)) + "页");
//当前页;
$("#now-page-count").html("第" + String(page) + "页");
//初始化表格对象、然后显示
var TableLsit = new Table()
var boxListInit = document.getElementById("user-table-box")
TableLsit.RowsColnumValues = getValues(values, page, pageNum)
TableLsit.tags2header(page)
TableLsit.excut();
//下一页
$("#next-button").click(function () {
    var boxList = $("#user-table-box")
    if (page < Math.ceil(values.length / pageNum))
        page += 1
    else
        alert("已经是尾页了")
    document.execCommand('Refresh')
    var TableLsit = new Table()
    TableLsit.RowsColnumValues = getValues(values, page, pageNum)
    TableLsit.tags2header(page)
    boxList.empty()
    TableLsit.excut();
    $("#now-page-count").html("第" + String(page) + "页")
});
//上一页
$("#praves-button").click(function () {
    var boxList = $("#user-table-box")
    if (page > 1)
        page -= 1
    else
        alert("已经是首页了")
    var TableLsit = new Table()
    TableLsit.RowsColnumValues = getValues(values, page, pageNum)
    TableLsit.tags2header(page)
    boxList.empty()
    TableLsit.excut();
    $("#now-page-count").html("第" + String(page) + "页")
});
//列表中按钮方法
function FindEditData(id) {
    var rowValues = $("#" + String(id)).find("td");
    var oldRowValues = {};
    var i = 0
    for (var key in userModel) {
        oldRowValues[key] = rowValues.eq(i).text();
        i++;
    }
    $("#user-edit-box2").show().center(350, 250)
    $("#username").val(oldRowValues["userName"])
    $("#password").val(oldRowValues['password'])
    $("#realname").val(oldRowValues['realName'])
    $("#uaerage").val(oldRowValues['age'])
    userId = oldRowValues['userId']
};
//d定位方法
$(document).ready(function () {
    jQuery.fn.extend({
        center: function (width, height) {
            return $(this).css("left", ($(window).width() - width) / 2 + $(window).scrollLeft()).
                css("top", ($(window).height() - height) / 2 + $(window).scrollTop()).
                css("width", width).
                css("height", height);
        }
    });
});
$("#submit-button").click(function () {
    var SubmitData = {}
    SubmitData["username"] = $("#username").val();
    SubmitData["password"] = $("#password").val();
    SubmitData["realname"] = $("#realname").val();
    SubmitData["age"] = $("#uaerage").val();
    SubmitData["userid"] = userId;
    $("#user-edit-box2").css("display", "none")
    location.reload();
});
$("#add-button").click(function () {
    $("#username").val(null);
    $("#password").val(null);
    $("#realname").val(null);
    $("#uaerage").val(null);
    userId = 1111;
    $("#user-edit-box2").show().center(350, 250)
});
$("#delete-button").click(function () {
    var SubmitData = {};
    SubmitData["userid"] = userId;
    userDelete(SubmitData)
    $("#user-edit-box2").css("display", "none");
    location.reload();
});
$("#cancel-button").click(function () {
    $("#user-edit-box2").css("display", "none");
});
//备份代码
//$("#now-page-count").click(function ()
//{
//    $("#user-edit-box2").show().center(350,250);//展现登陆框
//});
//function ClickEdie(){
//    this.ClickObject;
//    this.ValuesObject;
//    this.Model;
//    this.editData
//    function FindEditData(id){
//        $("#"+id).click(function(){
//            var rowValues=$("#"+id+"-tr").find("td");
//            var oldRowValues={};
//            var i=0
//            for(var key in Model) {
//                oldRowValues[key] = rowValues.eq(i).text();
//                i++;
//            }
//            this.editData=oldRowValues
//        })
//    };
//    function SetDivHtml(){
//        alert(this.editData.val())
//    }
//};
//var values=[
//    {"userId":1,"userName":"wangjun","AGE":"30","realName":"王君","password":"33333"},
//    {"userId":2,"userName":"wangjunru","age":"30","realName":"王君如","password":"33333"},
//    {"userId":3,"userName":"wangyan","age":"31","realName":"王艳","password":"33333"},
//    {"userId":4,"userName":"wangyi","age":"32","realName":"王毅","password":"33333"},
//    {"userId":5,"userName":"wangyinuo","age":"33","realName":"王一诺","password":"33333"},
//    {"userId":6,"userName":"wangguang","age":"31","realName":"王光","password":"33333"},
//    {"userId":7,"userName":"wangtai","age":"32","realName":"王涛","password":"33333"},
//    {"userId":8,"userName":"wangyucheng","age":"33","realName":"王雨辰","password":"33333"},
//    {"userId":9,"userName":"wangsong","age":"31","realName":"王松","password":"33333"},
//    {"userId":10,"userName":"wangyong","age":"32","realName":"王勇","password":"33333"},
//    {"userId":11,"userName":"wangyue","age":"33","realName":"王悦","password":"33333"}]