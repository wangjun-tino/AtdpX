# Create your views here.
#-*- coding:utf8 -*-
import json,traceback
from common.commonUtil import getParamFromRequest
from common.response import errResponse,sucResponse
from models import TaskInfo
from userInfo.models import UserInfo
from django.http import HttpResponse
from django.forms.models import model_to_dict
from common.token import *

def taskQuery(request):
    token=getParamFromRequest(request,'token')
    print token
    tokenUserid=tokenToUserid(token)
    userInfoName=UserInfo.objects.filter(userId=tokenUserid)
    if not userInfoName:
        return errResponse(U"登录票据验证失败，请更换登录用户！！！")
    try:
        taskInfos=TaskInfo.objects.all()
        data={}
        queryResult=list()
        for taskInfo in taskInfos:
            print (taskInfo.begin_time)
            taskInfo.begin_time=str(taskInfo.begin_time)
            queryResultRow=json.dumps(model_to_dict(taskInfo),ensure_ascii=True)
            print queryResultRow
            queryResult.append(queryResultRow)
    except Exception as e:
         print e
         return errResponse(U"未找到任务列表")
    return sucResponse(queryResult)
def taskUpdate(request):
     parameter=getParamFromRequest(request,'parameter')
     parameter=json.loads(parameter)
     print type(parameter)
     try:
        if not parameter['task_name']:
            return errResponse(u"任务名不能为空")
        TaskInfoName=TaskInfo.objects.filter(task_name=parameter['task_name'])
        if not parameter['task_id']:
            if TaskInfoName:return HttpResponse(U"任务名已存在创建任务失败！！")
            TaskInfo.objects.create(pars=parameter['pars'],task_name=parameter['task_name'],task_type=1,status=1)
            response=errResponse(U"任务ID为空,新增成功",0)
        taskInfo=TaskInfo.objects.filter(task_id=parameter['task_id'])
        if not taskInfo and not TaskInfoName and  parameter['task_id'] :
            print '修改任务信息不存在'
            TaskInfo.objects.create(pars=parameter['pars'],task_name=parameter['task_name'],task_type=1,status=1)
            response=errResponse(U"任务信息不存在,新增成功",0)
        elif not taskInfo and  TaskInfoName :
            return errResponse(U"任务Name已存在创建任务失败！！")
        else:
            TaskInfo.objects.filter(task_id=parameter['task_id']).update(pars=parameter['pars'],task_name=parameter['task_name'])
            response=errResponse(U"任务信息修改成功",0)
     except Exception as e:
        return errResponse(traceback.format_exc())
     return response
def taskDelete(request):
     id=getParamFromRequest(request,'task_id')
     try:
        if not id:
            return errResponse(u"任务ID为空，不能删除，请确认")
        taskInfo=TaskInfo.objects.get(task_id=id)
        if not taskInfo:
            response=errResponse(U"请求删除的任务不存在")
        else:
            TaskInfo.objects.filter(task_id=id).delete()
            response=errResponse(U"任务删除成功",0)
     except Exception as e:
        return errResponse(traceback.format_exc())
     return response