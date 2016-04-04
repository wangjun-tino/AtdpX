# Create your views here.
#-*- coding:utf8 -*-
import json,traceback
from common.commonUtil import getParamFromRequest
from common.response import errResponse,sucResponse
from models import SysConfig
from userInfo.models import UserInfo
from django.http import HttpResponse
from django.forms.models import model_to_dict
from common.token import *
from common.logger import getDefaultLogger

def sysConfigQuery(request):
    logging=getDefaultLogger()
    token=getParamFromRequest(request,'token')
    print token
    tokenUserid=tokenToUserid(token)
    userInfoName=UserInfo.objects.filter(userId=tokenUserid)
    if not userInfoName:
        return errResponse(U"登录票据验证失败，请更换登录用户！！！")
    try:
        sysConfigs=SysConfig.objects.all()
        data={}
        queryResult=list()
        for sysConfig in sysConfigs:
            logging.info(str(sysConfig.parameterName))
            queryResultRow=json.dumps(model_to_dict(sysConfig),ensure_ascii=True)
            logging.info(str(queryResultRow))
            queryResult.append(queryResultRow)
    except:
         return errResponse(U"未找到用户列表")
    return sucResponse(queryResult)
def sysConfigUpdate(request):
     logging=getDefaultLogger()
     parameter=getParamFromRequest(request,'parameter')
     parameter=json.loads(parameter)
     print type(parameter)
     try:
        if not parameter['parameterName']:
            return errResponse(u"参数名不能为空")
        sysParameterName=SysConfig.objects.filter(parameterName=parameter['parameterName'])
        if not parameter['id']:
            if sysParameterName:return HttpResponse(U"parameterName已存在创建参数信息失败！！")
            SysConfig.objects.create(parameterName=parameter['parameterName'],parameterValues=parameter['parameterValues'])
            response=errResponse(U"参数ID为空,新增成功",0)
        sysConfig=SysConfig.objects.filter(id=parameter['id'])
        if not sysConfig and not sysParameterName and  parameter['id'] :
            logging.info(u'修改系统参数信息不存在')
            SysConfig.objects.create(parameterName=parameter['parameterName'],parameterValues=parameter['parameterValues'])
            response=errResponse(U"系统参数信息不存在,新增成功",0)
        elif not sysConfig and  sysParameterName :
            return errResponse(U"系统参数Name已存在创建系统参数信息失败！！")
        else:
            SysConfig.objects.filter(id=parameter['id']).update(parameterName=parameter['parameterName'],parameterValues=parameter['parameterValues'])
            response=errResponse(U"系统参数信息修改成功",0)
     except Exception as e:
        logging.info(e)
        return errResponse(traceback.format_exc())
     return response
def sysConfigDelete(request):
     logging=getDefaultLogger()
     id=getParamFromRequest(request,'id')
     try:
        if not id:
            return errResponse(u"参数ID为空，不能删除，请确认")
        sysConfig=SysConfig.objects.get(id=id)
        if not sysConfig:
            response=errResponse(U"请求删除的参数信息不存在")
        else:
            SysConfig.objects.filter(id=id).delete()
            response=errResponse(U"参数删除成功",0)
     except Exception as e:
        logging.info(e)
        return errResponse(traceback.format_exc())
     return response