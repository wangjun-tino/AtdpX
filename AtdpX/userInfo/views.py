# Create your views here.
#-*- coding:utf8 -*-
import json,traceback
from common.commonUtil import getParamFromRequest
from common.response import errResponse,sucResponse
from models import UserInfo
from django.http import HttpResponse
from django.forms.models import model_to_dict
from common.token import *

def userlistQuery(request):
    token=getParamFromRequest(request,'token')
    print token
    tokenUserid=tokenToUserid(token)
    userInfoName=UserInfo.objects.filter(userId=tokenUserid)
    if not userInfoName:
        return errResponse(U"登录票据验证失败，请更换登录用户！！！")
    try:
        selfUsers=UserInfo.objects.all()
        data={}
        queryResult=list()
        for selfUser in selfUsers:
            print (selfUser.realName)
            queryResultRow=json.dumps(model_to_dict(selfUser),ensure_ascii=True)
            print queryResultRow
            queryResult.append(queryResultRow)
    except:
         return errResponse(U"未找到用户列表")
    return sucResponse(queryResult)
def userUpdate(request):
     parameter=getParamFromRequest(request,'parameter')
     parameter=json.loads(parameter)
     print type(parameter)
     try:
        if not parameter['username']:
            return errResponse(u"用户名不能为空")
        if not parameter['password']:
            return errResponse(u"密码不能为空")
        userInfoName=UserInfo.objects.filter(userName=parameter['username'])
        if not parameter['userid']:
            if userInfoName:return HttpResponse(U"用户Name已存在创建用户信息失败！！")
            UserInfo.objects.create(password=parameter['password'],userName=parameter['username'],realName=parameter['realname'],age=parameter['age'])
            response=errResponse(U"用户ID为空,新增成功",0)
        userInfo=UserInfo.objects.filter(userId=parameter['userid'])
        if not userInfo and not userInfoName :
            print '修改用户信息不存在'
            UserInfo.objects.create(password=parameter['password'],userName=parameter['username'],realName=parameter['realname'],age=parameter['age'])
            response=errResponse(U"用户信息不存在,新增成功",0)
        elif not userInfo and  userInfoName :
            return errResponse(U"用户Name已存在创建用户信息失败！！")
        else:
            UserInfo.objects.filter(userId=parameter['userid']).update(password=parameter['password'],userName=parameter['username'],realName=parameter['realname'],age=parameter['age'])
            response=errResponse(U"用户信息修改成功",0)
     except Exception as e:
        return errResponse(traceback.format_exc())
     return response
def userDelete(request):
     userid=getParamFromRequest(request,'userid')
     try:
        if not userid:
            return errResponse(u"用户ID为空，不能删除，请确认")
        userInfo=UserInfo.objects.get(userId=userid)
        if not userInfo:
            response=errResponse(U"请求删除的用户信息不存在")
        else:
            UserInfo.objects.filter(userId=userid).delete()
            response=errResponse(U"用户删除成功",0)
     except Exception as e:
        return errResponse(traceback.format_exc())
     return response
def userLogin(request):
    password=getParamFromRequest(request,'password')
    username=getParamFromRequest(request,'username')
    userInfo=UserInfo.objects.filter(userName=username,password=password).values()
    if not userInfo:
        return errResponse(u"用户名或密码错误")
    else:
        token=useridToToken(userInfo[0]['userId'])
        print token
        data={"token":token}
    return sucResponse(data)