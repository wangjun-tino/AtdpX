//请求函数区
//调试用后期更换为
//document.cookie="token="+"057065140";
var UrlHeader=document.cookie.split(";")[1].split("=")[1];
//当前网页地址
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
    url: UrlHeader + "/AtdpX/testCase/suiteQuery/",
    success: function (data) {
        //alert(data['rows']);
        if (data['errcode']!=0)
        {
            alert(data['errmsg'])
        }
        else
            jsonData = data['data'];
    },
    error: function () {
        alert("Error:测试用例查询请求错误！！！");
    }
});
//提交测试集
function suiteSubmit(suiteData) {
    $.support.cors = true;
    $.ajax({
        type: "POST",
        data: {"parameter": JSON.stringify(suiteData)},
        dataType: 'json',
        async: false,//同异步方式
        cache: false,
        url: UrlHeader + "/AtdpX/testCase/suiteSubmit/",
        success: function (data) {
            alert(data['errmsg'])
        },
        error: function () {
            alert("页面提交出现异常");
        }
    });
}
//公共函数区
    //转json格式
    function TrunJsonGroup(jsonDataArray) {
        var jsonArray = []
        for (var i = 0; i < jsonDataArray.length; i++) {
            jsonArray.push(JSON.parse(jsonDataArray[i]))
        }
        return jsonArray
    }
    //构建表单
function Table() {
    //表格数据源
    this.RowsColnumValues;
    //事件关键字
    this.actionKey;
    //id关键字
    this.idKey;
    //pageNum
    this.pageNum;
    //目标展示元素id
    this.rountLagId;
    //隐藏显示字段
    this.hideKey;
    //HTML代码
    this.html = "<br><table border=\"1\">";
    //初始化属性
    this.setupSelf=function(RowsColnumValues,actionKey,idKey,pageNum,rountLagId,hideKey){
        this.RowsColnumValues=RowsColnumValues;
        this.actionKey=actionKey;
        this.idKey=idKey;
        this.pageNum=pageNum;
        this.rountLagId=rountLagId
        this.hideKey=hideKey
    };
    //构造表格HTML代码
    this.tags2header = function (page) {
        this.RowsColnumValues=this.RowsColnumValues.slice(page * this.pageNum - this.pageNum, page * this.pageNum);
        for (var key in this.RowsColnumValues[0]) {
            if (key in this.hideKey)
                this.html += "<td hidden=\"hidden\">" + key + "</td>";
            else
                this.html += "<td>" + key + "</td>";
        };
        if(this.html=="<br><table border=\"1\">")
            this.html += "<td id=\""+this.actionKey+"Add()\">+</td>";
        this.html += "</tr>";
        for (var i = 0; i < this.RowsColnumValues.length; i++) {
            var idTemp=this.idKey+"-" + String((page - 1) * this.pageNum + i)
            this.html += "<tr id=\""+idTemp+ "-tr\" onclick=\""+this.actionKey+"('"+idTemp+ "-tr')\" ondblclick=\""+this.actionKey+"D2('"+idTemp+ "-tr')\">";
            for (key in this.RowsColnumValues[0]) {
                if (key in this.hideKey)
                    this.html += "<td hidden=\"hidden\">" + this.RowsColnumValues[i][key] + "</td>";
                else
                    this.html += "<td>" + this.RowsColnumValues[i][key] + "</td>";
            }
            this.html += "</tr>";
        }
        if(i<=this.pageNum)
            this.html += "<td onclick=\""+this.actionKey+"Add()\">+</td>";
        this.html += "</table>";
    };
    //展示表格内容
    this.excut = function HtmlTable() {
        var testdiv = document.getElementById(this.rountLagId);
        testdiv.innerHTML = this.html;
    };
};
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
//事件绑定区
    //初始化加载：
    function Iinit(){
        var suite=new Table();
        suite.setupSelf(values,'FindSuiteData',"suite-button",suitePageNum,"suite-table",hideKeySuite);
        suite.tags2header(suitePage);
        suite.excut();
        $("#suite-table-now-page-count").html("第" + String(suitePage) + "页");
        $("#suite-table-table-page-count").html("共" + String(Math.ceil(values.length / suitePageNum)) + "页");
    }
    //展开item信息
    function FindSuiteData(id){
        var idcode;
        itemPage=1;
        idcode=parseInt(id.split("-")[2]);
        itemTempCollection["itemValues"]=values[idcode].test_item;
        itemTempCollection["suiteCode"]=idcode;
        var item=new Table();
        item.setupSelf(itemTempCollection.itemValues,'FindItemData',"item-button-"+String(idcode),itemPageNum,"item-table",hideKeyItem);
        item.tags2header(itemPage);
        item.excut();
        $("#item-table-now-page-count").html("第" + String(itemPage) + "页");
        $("#item-table-table-page-count").html("共" + String(Math.ceil(itemTempCollection["itemValues"].length / itemPageNum)) + "页")
    }
    //展开step信息
    function FindItemData(id){
        stepPage=1;
        var suiteIdcode=0;
        var itemIdcode=0;
        suiteIdcode=parseInt(id.split("-")[2]);
        itemIdcode=parseInt(id.split("-")[3]);
        stepTempCollection["stepValues"]=values[suiteIdcode].test_item[itemIdcode].test_step
        stepTempCollection["suiteCode"]=suiteIdcode;
        stepTempCollection["itemCode"]=itemIdcode;
        var item=new Table();
        item.setupSelf(stepTempCollection.stepValues,'FindStepData',"step-button-"+String(suiteIdcode)+"-"+String(itemIdcode),stepPageNum,"step-table",hideKeyStep)
        item.tags2header(stepPage);
        item.excut();
        $("#step-table-now-page-count").html("第" + String(stepPage) + "页");
        $("#step-table-table-page-count").html("共" + String(Math.ceil(stepTempCollection["stepValues"].length / stepPageNum)) + "页");
    }
    //选页绑定区
//<li id="suite-table-next-button">Next</li>
//    <li id="suite-table-praves-button">Previous</li>
    //Suite下一页
        $("#suite-table-next-button").click(function () {
            var boxList = $("#suite-table")
            if (suitePage < Math.ceil(values.length / suitePageNum))
                suitePage += 1
            else
                alert("已经是尾页了")
            document.execCommand('Refresh')
            var suite=new Table();
            suite.setupSelf(values,'FindSuiteData',"suite-button",suitePageNum,"suite-table",hideKeySuite);
            suite.tags2header(suitePage);
            suite.excut();
            $("#suite-table-now-page-count").html("第" + String(suitePage) + "页");
        });
    //Suite上一页
        $("#suite-table-praves-button").click(function () {
            var boxList = $("#suite-table")
            if (suitePage >1)
                suitePage -= 1
            else
                alert("已经是首页了")
            document.execCommand('Refresh')
            var suite=new Table();
            suite.setupSelf(values,'FindSuiteData',"suite-button",suitePageNum,"suite-table",hideKeySuite);
            suite.tags2header(suitePage);
            suite.excut();
            $("#suite-table-now-page-count").html("第" + String(suitePage) + "页");
        });
        //item下一页
        $("#item-table-next-button").click(function () {
            var boxList = $("#item-table")
            if (itemPage < Math.ceil(itemTempCollection.itemValues.length / itemPageNum))
                itemPage += 1
            else
                alert("已经是尾页了")
            var item=new Table();
            item.setupSelf(itemTempCollection.itemValues,'FindItemData',"item-button-"+String(itemTempCollection.suiteCode),itemPageNum,"item-table",hideKeyStep);
            item.tags2header(itemPage);
            item.excut();
            $("#item-table-now-page-count").html("第" + String(itemPage) + "页");
        });
        //item上一页
        $("#item-table-praves-button").click(function () {
            var boxList = $("#item-table")
            if (itemPage >1)
                itemPage -= 1
            else
                alert("已经是首页了")
            var item=new Table();
            item.setupSelf(itemTempCollection.itemValues,'FindItemData',"item-button-"+String(itemTempCollection.suiteCode),itemPageNum,"item-table",hideKeyStep);
            item.tags2header(itemPage);
            item.excut();
            $("#item-table-now-page-count").html("第" + String(itemPage) + "页");
        });
        //step下一页
        $("#step-table-next-button").click(function () {
            var boxList = $("#step-table")
            if (stepPage < Math.ceil(stepTempCollection.stepValues.length/stepPageNum))
                stepPage += 1
            else
                alert("已经是尾页了")
            var item=new Table();
            item.setupSelf(stepTempCollection.stepValues,'FindStepData',"step-button-"+String(stepTempCollection.suiteCode)+"-"+String(stepTempCollection.itemCode),stepPageNum,"step-table",hideKeyStep)
            item.tags2header(stepPage);
            boxList.empty()
            item.excut();
            $("#step-table-now-page-count").html("第" + String(stepPage) + "页");
        });
        //step上一页
        $("#step-table-praves-button").click(function () {
            var boxList = $("#step-table")
            if (stepPage >1)
                stepPage -= 1
            else
                alert("已经是首页了")
            var item=new Table();
            item.setupSelf(stepTempCollection.stepValues,'FindStepData',"step-button-"+String(stepTempCollection.suiteCode)+"-"+String(stepTempCollection.itemCode),stepPageNum,"step-table",hideKeyStep)
            item.tags2header(stepPage);
            item.excut();
            $("#step-table-now-page-count").html("第" + String(stepPage) + "页");
        });
    //双击修改事件
    //Suite双击
    function FindSuiteDataD2(id){
        var rowValues = $("#" + String(id)).find("td");
        var oldRowValues = {};
        var i = 0
        for (var key in values[0]) {
            oldRowValues[key] = rowValues.eq(i).text();
            i++;
        }
        $("#suite-edit-box").css("display","block");
        $("#test_suite_name").val(oldRowValues["test_suite_name"])
        $("#test_suite_describe").val(oldRowValues['test_suite_describe'])
        $("#tester").val(oldRowValues['tester'])
        $("#test_suite_id").val(oldRowValues['test_suite_id'])
    };
    //Item双击
    function FindItemDataD2(id){
        var itemIdcode=parseInt(id.split("-")[3]);
        itemTempCollection['itemCode']=itemIdcode
        var rowValues = $("#" + String(id)).find("td");
        var oldRowValues = {};
        var i = 0
        for (var key in itemTempCollection.itemValues[0]) {
            oldRowValues[key] = rowValues.eq(i).text();
            i++;
        }
        $("#item-edit-box").css("display","block");
        $("#item_name").val(oldRowValues["item_name"])
        $("#test_item_desc").val(oldRowValues["test_item_desc"])
        $("#driver").val(oldRowValues["driver"])
        $("#environment").val(oldRowValues["environment"])
        $("#item_sequence").val(oldRowValues["item_sequence"])
        $("#test_item_id").val(oldRowValues['test_item_id'])
    };
    //step双击
    function FindStepDataD2(id){
        var stepIdcode=parseInt(id.split("-")[4]);
        stepTempCollection['stepCode']=stepIdcode
        var rowValues = $("#" + String(id)).find("td");
        var oldRowValues = {};
        var i = 0
        for (var key in stepTempCollection.stepValues[0]) {
            oldRowValues[key] = rowValues.eq(i).text();
            i++;
        }
        $("#step-edit-box").css("display","block");
        $("#data_desc").val(oldRowValues['data_desc'])
        $("#data").val(oldRowValues['data'])
        $("#expect_data").val(oldRowValues['expect_data'])
        $("#type").val(oldRowValues['type'])
        $("#step_sequence").val(oldRowValues['step_sequence'])
        $("#data_id").val(oldRowValues['data_id'])
    };
    //新增suite事件
    function FindSuiteDataAdd(){
        $("#suite-edit-box").css("display","block");
        $("#test_suite_name").val(null)
        $("#test_suite_describe").val(null)
        $("#tester").val()
        $("#test_suite_id").val(0)
    };
    //新增item事件
    function FindItemDataAdd(){
        $("#item-edit-box").css("display","block");
        $("#item_name").val(null)
        $("#test_item_desc").val(null)
        $("#driver").val(null)
        $("#environment").val(null)
        $("#item_sequence").val(null)
        $("#test_item_id").val(0)
    };
    //新增step事件
    function FindStepDataAdd(){
        $("#step-edit-box").css("display","block");
        $("#data_desc").val(null)
        $("#data").val(null)
        $("#expect_data").val(null)
        $("#type").val(null)
        $("#step_sequence").val(null)
        $("#data_id").val(0)
    };
    //按钮事件绑定
    //cancle
    $("#suite-cancel-button").click(function () {
        $("#suite-edit-box").css("display", "none");
    });
    $("#item-cancel-button").click(function () {
        $("#item-edit-box").css("display", "none");
    });
    $("#step-cancel-button").click(function () {
        $("#step-edit-box").css("display", "none");
    });
    //submit
    $("#suite-submit-button").click(function () {
        //if (values[itemTempCollection.stepIdcode]["test_suite_name"]=$("#test_suite_name").val())
        if ($("#test_suite_id").val()!=0) {
            values[itemTempCollection.suiteCode]["test_suite_name"] = $("#test_suite_name").val();
            values[itemTempCollection.suiteCode]["test_suite_describe"] = $("#test_suite_describe").val();
            values[itemTempCollection.suiteCode]["tester"] = $("#tester").val();
        }
        else if($("#test_suite_id").val()==0)
        {
            suiteModel["test_suite_name"] = $("#test_suite_name").val();
            suiteModel["test_suite_describe"] = $("#test_suite_describe").val();
            suiteModel["tester"] = $("#tester").val();
            values.push(suiteModel)
            suiteModel={"test_suite_id": -1, "test_suite_name": "", "test_suite_describe": "", "tester": "", "test_item":""}
        }
        $("#suite-edit-box").css("display", "none")
        var suite=new Table();
        suite.setupSelf(values,'FindSuiteData',"suite-button",suitePageNum,"suite-table",hideKeySuite);
        suite.tags2header(suitePage);
        suite.excut();
    });
    $("#item-submit-button").click(function () {
        //if (values[itemTempCollection.stepIdcode]["test_suite_name"]=$("#test_suite_name").val())
        if ($("#test_item_id").val()!=0) {
            values[itemTempCollection.suiteCode]['test_item'][itemTempCollection.itemCode]["item_name"] = $("#item_name").val();
            values[itemTempCollection.suiteCode]['test_item'][itemTempCollection.itemCode]["test_item_desc"] = $("#test_item_desc").val();
            values[itemTempCollection.suiteCode]['test_item'][itemTempCollection.itemCode]["driver"] = $("#driver").val();
            values[itemTempCollection.suiteCode]['test_item'][itemTempCollection.itemCode]["environment"] = $("#environment").val();
            values[itemTempCollection.suiteCode]['test_item'][itemTempCollection.itemCode]["item_sequence"] = $("#item_sequence").val();
        }
        else if($("#test_item_id").val()==0)
        {
            itemModel["item_name"] = $("#item_name").val();
            itemModel["test_item_desc"] = $("#test_item_desc").val();
            itemModel["driver"] = $("#driver").val();
            itemModel["environment"] = $("#environment").val();
            itemModel["item_sequence"] = $("#item_sequence").val();
            values[itemTempCollection.suiteCode]['test_item'].push(itemModel)
            itemModel={"test_item_id": -1, "item_name": "", "test_item_desc": "", "suite_id": 0, "driver": "", "test_step": "", "environment": "{}", "item_sequence": 0}
        }
        $("#item-edit-box").css("display", "none")
        var item=new Table();
        item.setupSelf(values[itemTempCollection.suiteCode]['test_item'],'FindItemData',"item-button-"+String(itemTempCollection.suiteCode),itemPageNum,"item-table",hideKeyItem);
        item.tags2header(itemPage);
        item.excut();
    });
    $("#step-submit-button").click(function () {
        //if (values[itemTempCollection.stepIdcode]["test_suite_name"]=$("#test_suite_name").val())
        if ($("#data_id").val()!=0) {
            values[stepTempCollection.suiteCode]['test_item'][stepTempCollection.itemCode]['test_step'][stepTempCollection.stepCode]["data_desc"] = $("#data_desc").val();
            values[stepTempCollection.suiteCode]['test_item'][stepTempCollection.itemCode]['test_step'][stepTempCollection.stepCode]["data"] = $("#data").val();
            values[stepTempCollection.suiteCode]['test_item'][stepTempCollection.itemCode]['test_step'][stepTempCollection.stepCode]["expect_data"] = $("#expect_data").val();
            values[stepTempCollection.suiteCode]['test_item'][stepTempCollection.itemCode]['test_step'][stepTempCollection.stepCode]["type"] = $("#type").val();
            values[stepTempCollection.suiteCode]['test_item'][stepTempCollection.itemCode]['test_step'][stepTempCollection.stepCode]["step_sequence"] = $("#step_sequence").val();
          }
        else if($("#data_id").val()==0)
        {
            stepModel["data_desc"] = $("#data_desc").val();
            stepModel["data"] = $("#data").val();
            stepModel["expect_data"] = $("#expect_data").val();
            stepModel["type"] = $("#type").val();
            stepModel["step_sequence"] = $("#step_sequence").val();
            values[stepTempCollection.suiteCode]['test_item'][stepTempCollection.itemCode]['test_step'].push(stepModel)
            stepModel={"data_id": -1, "data_desc": "", "data": "{}", "expect_data": "{}", "type": 1, "item_id": 0, "result_log": "", "step_sequence": 0}
        }
        $("#step-edit-box").css("display", "none")
        var item=new Table();
        item.setupSelf(values[stepTempCollection.suiteCode]['test_item'][stepTempCollection.itemCode]['test_step'],'FindStepData',"step-button-"+String(stepTempCollection.suiteCode)+"-"+String(stepTempCollection.itemCode),stepPageNum,"step-table",hideKeyStep)
        item.tags2header(stepPage);
        item.excut();
    });
    //删除数据
    $("#suite-delete-button").click(function () {
        values.splice([itemTempCollection.suiteCode])
        $("#suite-edit-box").css("display", "none")
        var suite=new Table();
        suite.setupSelf(values,'FindSuiteData',"suite-button",suitePageNum,"suite-table",hideKeySuite);
        suite.tags2header(suitePage);
        suite.excut();
    });
    $("#item-delete-button").click(function () {
        values[itemTempCollection.suiteCode]['test_item'].splice([itemTempCollection.itemCode]);
        $("#item-edit-box").css("display", "none")
        var item=new Table();
        item.setupSelf(values[itemTempCollection.suiteCode]['test_item'],'FindItemData',"item-button-"+String(itemTempCollection.suiteCode),itemPageNum,"item-table",hideKeyItem);
        item.tags2header(itemPage);
        item.excut();
    });
    $("#step-delete-button").click(function () {
        values[stepTempCollection.suiteCode]['test_item'][stepTempCollection.itemCode]['test_step'].splice([stepTempCollection.stepCode]);
        $("#step-edit-box").css("display", "none")
        var item=new Table();
        item.setupSelf(values[stepTempCollection.suiteCode]['test_item'][stepTempCollection.itemCode]['test_step'],'FindStepData',"step-button-"+String(stepTempCollection.suiteCode)+"-"+String(stepTempCollection.itemCode),stepPageNum,"step-table",hideKeyStep)
        item.tags2header(stepPage);
        item.excut();
    });
    //提交数据集事件
    $("#submit").click(function(){
        var data=values[itemTempCollection.suiteCode]
        suiteSubmit(data)
    })
//初始化加载区
        //调试数据
//var values=[{
//    "test_suite_id": 1,
//    "test_suite_name": "TestSuite集",
//    "test_suite_describe": "用于测试AtdpX平台对测试用例管理的测试用例集合",
//    "tester": "wangjun",
//    "test_item": [
//        {
//            "test_item_id": 1,
//            "item_name": "XX平台登录",
//            "test_item_desc": "XX平台登录",
//            "suite_id": 1,
//            "driver": "InterFaceDriver",
//            "test_step": [
//                {
//                    "data_id": 1,
//                    "data_desc": "测试数据",
//                    "data": "{}",
//                    "expect_data": "{}",
//                    "type": 1,
//                    "item_id": 1,
//                    "result_log": "",
//                    "step_sequence": 105
//                },
//                {
//                    "data_id": 2,
//                    "data_desc": "测试",
//                    "data": "{}",
//                    "expect_data": "{}",
//                    "type": 1,
//                    "item_id": 2,
//                    "result_log": "",
//                    "step_sequence": 205
//                },
//                {
//                    "data_id": 3,
//                    "data_desc": "测试",
//                    "data": "{}",
//                    "expect_data": "{}",
//                    "type": 1,
//                    "item_id": 2,
//                    "result_log": "",
//                    "step_sequence": 205
//                }
//            ],
//            "environment": "{}",
//            "item_sequence": 105
//        }
//    ]
//}]
    var values,jsonData;
    values=TrunJsonGroup(jsonData);
    //获取测试数据集
    function getValues(){

    }
    var hideKeySuite={"test_item":1,"test_suite_describe":1}
    var hideKeyItem={"test_step":1,"suite_id":1,"driver":1,"environment":1,"test_item_desc":1}
    var hideKeyStep={"data":1,"expect_data":1,"item_id":1}
    var itemTempCollection={};
    var stepTempCollection={};
    var suitePage=1;
    var itemPage=1;
    var stepPage=1;
    var suitePageNum=itemPageNum=2;
    var stepPageNum=2;
    var suiteModel={"test_suite_id": -1, "test_suite_name": "", "test_suite_describe": "", "tester": "", "test_item":[]}
    var itemModel={"test_item_id": -1, "item_name": "", "test_item_desc": "", "suite_id": 0, "driver": "", "test_step": "", "environment": "{}", "item_sequence": 0}
    var stepModel={"data_id":-1, "data_desc": "", "data": "{}", "expect_data": "{}", "type": 1, "item_id": 0, "result_log": "", "step_sequence": 0}
    Iinit()
