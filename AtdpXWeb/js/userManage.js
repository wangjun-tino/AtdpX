//表格对象构造方法
function Table() {
    //表格数据源
    this.RowsColnumValues;
    //HTML代码
    this.html = "<br><table border=\"1\">";
    //构造表格HTML代码
    this.tags2header=function(){
        for(var key in this.RowsColnumValues[0])
        {
            this.html+="<td>" +key+"</td>";
        }
        this.html+="<td>Button</td></tr>";
        for (var i=0;i<this.RowsColnumValues.length;i++)
        {
            this.html+="<tr id=\"button-"+String(i)+"-tr\">";
            for( key in this.RowsColnumValues[i])
            {
                this.html+="<td>" +this.RowsColnumValues[i][key]+"</td>";
            }
            this.html+="<td><button id=\"button-"+String(i)+"\" onclick=\"FindEditData('button-"+String(i)+"')\">Edit</button></td></tr>";
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
    {"ID":1,"NAME":"王君","AGE":"30","SEX":"Man","TEL":"33333"},
    {"ID":2,"NAME":"王艳","AGE":"30","SEX":"Woman","TEL":"33333"},
    {"ID":3,"NAME":"王艳1","AGE":"31","SEX":"Woman","TEL":"33333"},
    {"ID":4,"NAME":"王艳2","AGE":"32","SEX":"Woman","TEL":"33333"},
    {"ID":5,"NAME":"王艳3","AGE":"33","SEX":"Woman","TEL":"33333"},
    {"ID":6,"NAME":"王艳1","AGE":"31","SEX":"Woman","TEL":"33333"},
    {"ID":7,"NAME":"王艳2","AGE":"32","SEX":"Woman","TEL":"33333"},
    {"ID":8,"NAME":"王艳3","AGE":"33","SEX":"Woman","TEL":"33333"},
    {"ID":9,"NAME":"王艳1","AGE":"31","SEX":"Woman","TEL":"33333"},
    {"ID":10,"NAME":"王艳2","AGE":"32","SEX":"Woman","TEL":"33333"},
    {"ID":11,"NAME":"王艳3","AGE":"33","SEX":"Woman","TEL":"33333"}]
    var userModel={"ID":1,"NAME":"王君","AGE":"30","SEX":"Man","TEL":"33333"};
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
    TableLsit.tags2header()
    TableLsit.excut();
//下一页
$("#next-button").click(function(){
    var boxList=$("#user-table-box")
    if(page<Math.ceil(values.length/pageNum))
        page+=1
    else
        alert("已经是尾页了")
    var TableLsit=new Table()
    TableLsit.RowsColnumValues=getValues(values,page,pageNum)
    TableLsit.tags2header()
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
    TableLsit.tags2header()
    boxList.empty()
    TableLsit.excut(boxList);
    $("#now-page-count").html("第"+String(page)+"页")
});
function FindEditData(id){
        var rowValues=$("#"+String(id)+"-tr").find("td");
        var oldRowValues={};
        var i=0
        for(var key in userModel) {
            oldRowValues[key] = rowValues.eq(i).text();
            i++;
            alert(oldRowValues[key]);
        }
    };
//备份代码
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