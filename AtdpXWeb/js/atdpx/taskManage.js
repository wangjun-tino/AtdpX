//��������
//�����ú��ڸ���Ϊ
//cookieToken="057065140";
//UrlHeader="http://127.0.0.1:8000"
//document.cookie="token="+"057065140";
var UrlHeader=document.cookie.split(";")[1].split("=")[1];
////��ǰ��ҳ��ַ
var cookieToken=document.cookie.split(";")[0].split("=")[1];
//����������
$.support.cors = true;
//��ȡ���Ƶķ���������Ϊһ������
    $.ajax({
        type: "GET",
        data: {"token":cookieToken},
        dataType: 'json',
        async: false,//ͬ�첽��ʽ
        cache: false,
        url: UrlHeader + "/AtdpX/task_info/query/",
        success: function (data) {
            //alert(data['rows']);
            if (data['errcode']!=0)
            {
                alert(data['errmsg'])
            }
            else
                jsonData =data['data'];
        },
        error: function () {
            alert("Error:�û���Ϣ��ѯ������󣡣�");
        }
    });
//�ύ����
    function configUpdate(configData) {
        $.support.cors = true;
        $.ajax({
            type: "GET",
            data: {"parameter": JSON.stringify(configData)},
            dataType: 'json',
            async: false,//ͬ�첽��ʽ
            //cache:false,
            url: UrlHeader + "/AtdpX/task_info/update/",
            success: function (data) {
                alert(data['errmsg'])
            },
            error: function () {
                alert("ҳ���ύ�����쳣");
            }
        });
    }
    //ɾ������
    function configDelete(configData) {
        $.support.cors = true;
        $.ajax({
            type: "GET",
            data: configData,
            dataType: 'json',
            async: false,//ͬ�첽��ʽ
            cache: false,
            url: UrlHeader + "/AtdpX/task_info/delete/",
            success: function (data) {
                alert(data['errmsg'])
            },
            error: function () {
                alert("ҳ��ɾ�������쳣");
            }
        });
    }
//����������
    //תjson��ʽ
    function TrunJsonGroup(jsonDataArray) {
        var jsonArray = []
        for (var i = 0; i < jsonDataArray.length; i++) {
            jsonArray.push(JSON.parse(jsonDataArray[i]))
        }
        return jsonArray
    }
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
        this.RowsColnumValues=this.RowsColnumValues.slice(page * this.pageNum - this.pageNum, page * this.pageNum);
        for (var key in this.RowsColnumValues[0]) {
            if (key in this.hideKey)
                this.html += "<td hidden=\"hidden\">" + key + "</td>";
            else
                this.html += "<td>" + key + "</td>";
        };
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
        this.html += "</table>";
    };
    //չʾ�������
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
//�¼�����
    //��ʼ�����أ�
    function Iinit(){
        var config=new Table();
        config.setupSelf(values,'FindConfigData',"config-button",configPageNum,"config-table-box",hideKeySuite);
        config.tags2header(configPage);
        config.excut();
        $("#config-table-now-page-count").html("��" + String(configPage) + "ҳ");
        $("#config-table-table-page-count").html("��" + String(Math.ceil(values.length / configPageNum)) + "ҳ");
    }
    //ѡҳ����
    //config-table-box��һҳ
        $("#config-table-next-button").click(function () {
            var boxList = $("#config-table-box")
            if (configPage < Math.ceil(values.length / configPageNum))
                configPage += 1
            else
                alert("�Ѿ���βҳ��")
            document.execCommand('Refresh')
            var config=new Table();
            config.setupSelf(values,'FindConfigData',"config-button",configPageNum,"config-table-box",hideKeySuite);
            config.tags2header(configPage);
            config.excut();
            $("#config-table-now-page-count").html("��" + String(configPage) + "ҳ");
        });
    //config-table-box��һҳ
        $("#config-table-praves-button").click(function () {
            var boxList = $("#config-table-box")
            if (configPage >1)
                configPage -= 1
            else
                alert("�Ѿ�����ҳ��")
            document.execCommand('Refresh')
            var config=new Table();
            config.setupSelf(values,'FindConfigData',"config-button",configPageNum,"config-table-box",hideKeySuite);
            config.tags2header(configPage);
            config.excut();
            $("#config-table-now-page-count").html("��" + String(configPage) + "ҳ");
        });
    //˫���޸��¼�
    function FindConfigDataD2(id){
        alert('ִ���У�����')
    };
    //config����
    function FindConfigData(id){
        var rowValues = $("#" + String(id)).find("td");
        var oldRowValues = {};
        var i = 0
        for (var key in values[0]) {
            oldRowValues[key] = rowValues.eq(i).text();
            i++;
        }

        $("#config-edit-box2").show().center(350, 150)
        $("#task_name").val(oldRowValues["task_name"])
        $("#pars").val(oldRowValues["pars"])
        Configid=oldRowValues['task_id']
    };
    //��ť�¼���
    //add
    $("#add-button").click(function(){
        $("#task_name").val(null)
        $("#pars").val(null)
        Configid=0
    })
    //cancle
    $("#cancel-button").click(function () {
        $("#config-edit-box2").css("display", "none");
    });
    //submit
    $("#submit-button").click(function () {
        var ConfigValues={};
        ConfigValues["task_name"]=$("#task_name").val()
        ConfigValues["pars"]=$("#pars").val()
        ConfigValues["task_id"]=Configid
        configUpdate(ConfigValues)
        $("#config-edit-box2").css("display", "none");
        location.reload();
    });
//ɾ������
    $("#delete-button").click(function () {
        var ConfigValues = {};
        ConfigValues["task_id"] = Configid;
        configDelete(ConfigValues)
        $("#config-edit-box2").css("display", "none");
        location.reload();
    });
//��ʼ��������
//    var values;
//    var valuesa=[{"task_id":1000,"pars":[1,2],"task_name":"��������","task_type":'1',"status":'1',"begin_time":"2016-3-25","begin_time":""}]
    var values;
    var jsonData;
    values=TrunJsonGroup(jsonData);
    for (var i=0;i<values.length;i++)
    {
        if (values[i]['status']=='1')
        {
            values[i]['status']="����"
        }
        else if (values[i]['status']=='2')
        {
            values[i]['status']="ִ����"
        }
        else if(values[i]['status']=='3')
        {
            values[i]['status']="ִ�гɹ�"
        }
        else
        {
            values[i]['status']="ִ��ʧ��"
        }
    }
    var hideKeySuite={}
    //{"id":1}
    var configPage=1;
    var configPageNum=6;
    var Configid=0
    Iinit()


//var values=[{"id":1,"parameterName":"config1","parameterValues":1},{"id":2,"parameterName":"config2","parameterValues":2},{"id":2,"parameterName":"config2","parameterValues":2}
//    ,{"id":2,"parameterName":"config2","parameterValues":2}
//    ,{"id":2,"parameterName":"config2","parameterValues":2}
//    ,{"id":2,"parameterName":"config2","parameterValues":2}
//    ,{"id":2,"parameterName":"config2","parameterValues":2}
//    ,{"id":2,"parameterName":"config2","parameterValues":2}
//    ,{"id":2,"parameterName":"config2","parameterValues":2}
//    ,{"id":2,"parameterName":"config2","parameterValues":2}
//    ,{"id":2,"parameterName":"config2","parameterValues":2}
//    ,{"id":2,"parameterName":"config2","parameterValues":2}]

