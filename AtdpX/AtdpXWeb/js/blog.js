/**
 * Created by WangJun on 2016/3/3.
 */

var floorCode=1
$("#submit-button").click(function(){
    var title=$("#title-input").val();
    var body=$("#body-input").val();
    var ret = window.confirm("Are you sure to submit comments ?");
    if(ret){
        //do something 点确定
        var build=new building();
        build.title=title;
        build.body=body;
        build.setHtml(floorCode);
        floorCode+=1;
    }else{
        //do otherthing 点取消
    }

})

function building(){
    this.floorModel="<div class=\"floor\">{body}</div>";
    this.title;
    this.body;
    this.html=function(floorCode){
        var html="<a class=\"title\">"+floorCode+"#  </a>"+"<a class=\"title\">"+this.title+"</a><br><hr>";
        html+="<p class=\'body\'>"+this.body+"</p><br>";
        return this.floorModel.replace("{body}",html)
    };
    this.setHtml=function(floorCode){
        var testdiv = document.getElementById("word-box");
        testdiv.innerHTML+="<br>"+this.html(floorCode);
        //$("#word-box").innerHTML+=this.html();
    };
}