/**
 * Created by WangJun on 2016/3/18.
 */

//请求函数区
//公共函数区
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
        for (var key in this.RowsColnumValues[0]) {
            if (key in this.hideKey)
                continue;
            else
                this.html += "<td>" + key + "</td>";
        }
        this.html += "</tr>";
        for (var i = 0; i < this.RowsColnumValues.length; i++) {
            this.html += "<tr id=\""+this.idKey+"-" + String((page - 1) * this.pageNum + i) + "-tr\" onclick=\""+this.actionKey+"('"+this.idKey+"-" +
                String((page - 1) * this.pageNum + i) + "-tr')\">";
            for (key in this.RowsColnumValues[0]) {
                if (key in this.hideKey)
                    continue;
                else
                    this.html += "<td>" + this.RowsColnumValues[i][key] + "</td>";
            }
            this.html += "</tr>";
        }
        this.html += "</table>";
    };
    //展示表格内容
    this.excut = function HtmlTable() {
        var testdiv = document.getElementById(this.rountLagId);
        testdiv.innerHTML = this.html;
    };
};
//事件绑定区

//初始化加载区
        //调试数据
var values=[{
    "test_suite_id": 1,
    "test_suite_name": "TestSuite集",
    "test_suite_describe": "用于测试AtdpX平台对测试用例管理的测试用例集合",
    "tester": "wangjun",
    "test_item": [
        {
            "test_item_id": 1,
            "item_name": "XX平台登录",
            "test_item_desc": "XX平台登录",
            "suite_id": 1,
            "driver": "InterFaceDriver",
            "test_step": [
                {
                    "data_id": 1,
                    "data_desc": "测试数据",
                    "data": "{}",
                    "expect_data": "{}",
                    "type": 1,
                    "item_id": 1,
                    "result_log": "",
                    "step_sequence": 105
                },
                {
                    "data_id": 2,
                    "data_desc": "测试",
                    "data": "{}",
                    "expect_data": "{}",
                    "type": 1,
                    "item_id": 2,
                    "result_log": "",
                    "step_sequence": 205
                }
            ],
            "environment": "{}",
            "item_sequence": 105
        }
    ]
}]
var hideKeySuite={"test_item":1,"test_suite_describe":1}
var hideKeyItem={"test_step":1}
//初始化加载：
var suite=new Table();
suite.setupSelf(values,'FindSuiteData',"suite-button",1,"suite-table",hideKeySuite)
suite.tags2header(1)
suite.excut()
var item=new Table();
item.setupSelf(values[0]['test_item'],'FindSuiteData',"item-button",1,"item-table",hideKeyItem)
item.tags2header(1)
item.excut()