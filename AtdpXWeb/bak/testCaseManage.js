/**
 * Created by WangJun on 2016/3/18.
 */

//��������
//����������
    //������
function Table() {
    //�������Դ
    this.RowsColnumValues;
    //�¼��ؼ���
    this.actionKey;
    //id�ؼ���
    this.idKey;
    //pageNum
    this.pageNum;
    //Ŀ��չʾԪ��id
    this.rountLagId;
    //������ʾ�ֶ�
    this.hideKey;
    //HTML����
    this.html = "<br><table border=\"1\">";
    //��ʼ������
    this.setupSelf=function(RowsColnumValues,actionKey,idKey,pageNum,rountLagId,hideKey){
        this.RowsColnumValues=RowsColnumValues;
        this.actionKey=actionKey;
        this.idKey=idKey;
        this.pageNum=pageNum;
        this.rountLagId=rountLagId
        this.hideKey=hideKey
    };
    //������HTML����
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
    //չʾ�������
    this.excut = function HtmlTable() {
        var testdiv = document.getElementById(this.rountLagId);
        testdiv.innerHTML = this.html;
    };
};
//�¼�����

//��ʼ��������
        //��������
var values=[{
    "test_suite_id": 1,
    "test_suite_name": "TestSuite��",
    "test_suite_describe": "���ڲ���AtdpXƽ̨�Բ�����������Ĳ�����������",
    "tester": "wangjun",
    "test_item": [
        {
            "test_item_id": 1,
            "item_name": "XXƽ̨��¼",
            "test_item_desc": "XXƽ̨��¼",
            "suite_id": 1,
            "driver": "InterFaceDriver",
            "test_step": [
                {
                    "data_id": 1,
                    "data_desc": "��������",
                    "data": "{}",
                    "expect_data": "{}",
                    "type": 1,
                    "item_id": 1,
                    "result_log": "",
                    "step_sequence": 105
                },
                {
                    "data_id": 2,
                    "data_desc": "����",
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
//��ʼ�����أ�
var suite=new Table();
suite.setupSelf(values,'FindSuiteData',"suite-button",1,"suite-table",hideKeySuite)
suite.tags2header(1)
suite.excut()
var item=new Table();
item.setupSelf(values[0]['test_item'],'FindSuiteData',"item-button",1,"item-table",hideKeyItem)
item.tags2header(1)
item.excut()