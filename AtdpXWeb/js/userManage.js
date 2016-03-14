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
var values=[
    {"ID":1,"NAME":"wangjun","AGE":"30","RNAME":"王君","PW":"33333"},
    {"ID":2,"NAME":"wangjunru","AGE":"30","RNAME":"王君如","PW":"33333"},
    {"ID":3,"NAME":"wangyan","AGE":"31","RNAME":"王艳","PW":"33333"},
    {"ID":4,"NAME":"wangyi","AGE":"32","RNAME":"王毅","PW":"33333"},
    {"ID":5,"NAME":"wangyinuo","AGE":"33","RNAME":"王一诺","PW":"33333"},
    {"ID":6,"NAME":"wangguang","AGE":"31","RNAME":"王光","PW":"33333"},
    {"ID":7,"NAME":"wangtai","AGE":"32","RNAME":"王涛","PW":"33333"},
    {"ID":8,"NAME":"wangyucheng","AGE":"33","RNAME":"王雨辰","PW":"33333"},
    {"ID":9,"NAME":"wangsong","AGE":"31","RNAME":"王松","PW":"33333"},
    {"ID":10,"NAME":"wangyong","AGE":"32","RNAME":"王勇","PW":"33333"},
    {"ID":11,"NAME":"wangyue","AGE":"33","RNAME":"王悦","PW":"33333"}]
var userModel={"ID":1,"NAME":"王君","AGE":"30","RNAME":"Man","PW":"33333"};
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
    $("#username").val(oldRowValues["NAME"])
    $("#password").val(oldRowValues['PW'])
    $("#realname").val(oldRowValues['RNAME'])
    $("#uaerage").val(oldRowValues['AGE'])
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
    SubmitData["user_name"]=$("#username").val()
    SubmitData["password"]=$("#password").val()
    SubmitData["real_name"]=$("#realname").val()
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