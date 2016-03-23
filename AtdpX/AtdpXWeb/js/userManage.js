//表格对象构造方法
function Table() {
    //表格数据源
    this.RowsColnumValues;
    //HTML代码
    this.html = "<br><table border=\"1\">";
    //构造表格HTML代码
    this.tags2header=function(page){
        for(var key in this.RowsColnumValues[0])
        {
            this.html+="<td>" +key+"</td>";
        }
        this.html+="</tr>";
        for (var i=0;i<this.RowsColnumValues.length;i++)
        {
            this.html+="<tr id=\"button-"+String((page-1)*10+i)+"-tr\" onclick=\"FindEditData('button-"+String((page-1)*10+i)+"-tr')\">";
            for( key in this.RowsColnumValues[i])
            {
                this.html+="<td>" +this.RowsColnumValues[i][key]+"</td>";
            }
            this.html+="</tr>";
        }
        this.html+="</table>";
    };
    //展示表格内容
    this.excut=function HtmlTable(){
        var testdiv=document.getElementById("user-table-box");
        testdiv.innerHTML+=this.html;
    };
};
//表格数据按页面切片
function getValues(values,page,pageNum){
    return values.slice(page*pageNum-pageNum,page*pageNum);
};
//$.ajax({
//    type:"POST",
//    data:"",
//    //dataType:'html',
//    cache:false,
//    dataType: "jsonp",
//    url: "http://127.0.0.1:8000/AtdpX/userInfo/query/",
//    success:function (data){
//        alert(data);
//    },
//    error:function (data){
//        alert(data['rows']);
//    }
//});
//获取名称的方法，参数为一个函数
$.ajax({
    type:"GET",
    data:"",
    dataType:'jsonp',
    cache:false,
    url: "http://localhost:8080/AtdpX/userInfo/query/",
    success:function (data){
        alert(data);
    },
    error:function (){
        alert("Error:http://172.23.44.52:8080/AtpXdemo/AtpXWeb/Switch/");
    }
});
var values
$.get("/AtdpX/userInfo/query/",function(content){

    console.log("success ajax");
    values=conten['rows'];

});

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
var userModel={"userId":1,"userName":"wangjun","AGE":"30","realName":"王君","password":"33333"};
var pageNum=10;
var page=1;
//总页数
$("#table-page-count").html("共"+String(Math.ceil(values.length/pageNum))+"页");
//当前页;
$("#now-page-count").html("第"+String(page)+"页");
//初始化表格对象、然后显示
var TableLsit=new Table()
var boxListInit=document.getElementById("user-table-box")
TableLsit.RowsColnumValues=getValues(values,page,pageNum)
TableLsit.tags2header(page)
TableLsit.excut();
//下一页
$("#next-button").click(function(){
    var boxList=$("#user-table-box")
    if(page<Math.ceil(values.length/pageNum))
        page+=1
    else
        alert("已经是尾页了")
    document.execCommand('Refresh')
    var TableLsit=new Table()
    TableLsit.RowsColnumValues=getValues(values,page,pageNum)
    TableLsit.tags2header(page)
    boxList.empty()
    TableLsit.excut();
    $("#now-page-count").html("第"+String(page)+"页")
});
//上一页
$("#praves-button").click(function(){
    var boxList=$("#user-table-box")
    if(page>1)
        page-=1
    else
        alert("已经是首页了")
    var TableLsit=new Table()
    TableLsit.RowsColnumValues=getValues(values,page,pageNum)
    TableLsit.tags2header(page)
    boxList.empty()
    TableLsit.excut();
    $("#now-page-count").html("第"+String(page)+"页")
});
//列表中按钮方法
function FindEditData(id){
    var rowValues=$("#"+String(id)).find("td");
    var oldRowValues={};
    var i=0
    for(var key in userModel) {
        oldRowValues[key] = rowValues.eq(i).text();
        i++;
    }
    $("#user-edit-box2").show().center(350,250)
    $("#username").val(oldRowValues["userName"])
    $("#password").val(oldRowValues['password'])
    $("#realname").val(oldRowValues['realName'])
    $("#uaerage").val(oldRowValues['age'])
};
//d定位方法
$(document).ready(function()
{
    jQuery.fn.extend({
        center:function(width,height)
        {
            return $(this).css("left", ($(window).width()-width)/2+$(window).scrollLeft()).
                css("top", ($(window).height()-height)/2+$(window).scrollTop()).
                css("width",width).
                css("height",height);
        }
    });
});
$("#submit-button").click(function(){
    alert("提交成功")
    var SubmitData={}
    SubmitData["username"]=$("#username").val()
    SubmitData["password"]=$("#password").val()
    SubmitData["realname"]=$("#realname").val()
    SubmitData["age"]=$("#uaerage").val()
    $("#user-edit-box2").css("display","none")
    location.reload();
})

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