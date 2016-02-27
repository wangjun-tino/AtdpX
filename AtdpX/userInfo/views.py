# Create your views here.
#-*- coding:utf8 -*-
import json
from common.commonUtil import getParamFromRequest
from common.response import errResponse,sucResponse
from models import UserInfo
from django.http import HttpResponse
from django.forms.models import model_to_dict

def userlistQuery(request):
    try:
        selfUsers=UserInfo.objects.all()
        queryResult=list()
        for selfUser in selfUsers:
            print (selfUser.realName)
            queryResultRow=json.dumps(model_to_dict(selfUser),ensure_ascii=True)
            print queryResultRow
            queryResult.append(queryResultRow)
        print queryResult
    except:
        return  HttpResponse(U"未找到用户列表")
    return HttpResponse(queryResult)