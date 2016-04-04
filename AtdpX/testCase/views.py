# Create your views here.
#-*- coding:utf8 -*-
import json,traceback
from common.commonUtil import getParamFromRequest
from common.response import errResponse,sucResponse
from userInfo.models import UserInfo
from models import TestSuite,TestItem,TestStep
from django.http import HttpResponse
from django.forms.models import model_to_dict
from common.token import *
from common.logger import getDefaultLogger

def testSuiteQuery(request):
    logging=getDefaultLogger()
    token=getParamFromRequest(request,'token')
    tokenUserid=tokenToUserid(token)
    userInfoName=UserInfo.objects.filter(userId=tokenUserid)
    if not userInfoName:
        return errResponse(U"登录票据验证失败，请更换登录用户！！！")
    try:
        testSuites=TestSuite.objects.all()
        data={}
        queryResult=list()
        for testSuite in testSuites:
            testItemRows=[]
            testItems=TestItem.objects.filter(suite_id=testSuite.test_suite_id).order_by("item_sequence")
            for testItem in testItems:
                testStepRows=[]
                testSteps=TestStep.objects.filter(item_id=testItem.test_item_id).order_by("step_sequence")
                for testStep in testSteps:
                    stepListRow=model_to_dict(testStep)
                    testStepRows.append(stepListRow)
                testItem2Json=model_to_dict(testItem)
                testItem2Json['test_step']=testStepRows
                itemListRow=testItem2Json
                testItemRows.append(itemListRow)
            testSuite2Json=model_to_dict(testSuite)
            testSuite2Json['test_item']=testItemRows
            print testSuite2Json
            queryResult.append(json.dumps(testSuite2Json,ensure_ascii=True))
            print queryResult
    except Exception as e:
         logging.info(e)
         return errResponse(U"未找到Suite列表")
    return sucResponse(queryResult)
def testSuiteSubmit(request):
    logging=getDefaultLogger()
    parameter=getParamFromRequest(request,'parameter')
    suiteData=json.loads(parameter)
    try:
        if suiteData["test_suite_id"]==-1:
            TestSuite.objects.create(test_suite_name=suiteData['test_suite_name'],test_suite_describe=suiteData['test_suite_describe'],tester=suiteData['tester'],test_item="[]")
            TestSuiteid=TestSuite.objects.filter(test_suite_name=suiteData['test_suite_name'],test_suite_describe=suiteData['test_suite_describe'],tester=suiteData['tester'],test_item="[]").values("test_suite_id")
            TestSuiteid=TestSuiteid[0]['test_suite_id']
            if type(TestSuiteid)!=long:
                return errResponse(U"新增suite获取id错误")
            else:
                testItems=suiteData['test_item']
                for item in testItems:
                    TestItem.objects.create(
                       item_name=item['item_name'],test_item_desc=item['test_item_desc'], suite_id=TestSuiteid,driver=item['driver'],\
                       test_step="[]",environment=item['environment'],item_sequence=item['item_sequence'])
                    TestItemid=  TestItem.objects.filter(  item_name=item['item_name'],test_item_desc=item['test_item_desc'], suite_id=TestSuiteid,driver=item['driver'],\
                       item_sequence=item['item_sequence']).values("test_item_id")
                    TestItemid=TestItemid[0]['test_item_id']
                    if type(TestItemid)!=long:
                        return errResponse(U"新增item获取id错误")
                    else:
                        testSteps=item['test_step']
                        for step in testSteps:
                             TestStep.objects.create(data_desc=step['data_desc'],data=step['data'],expect_data=step['expect_data'],\
                                                    type=step['type'],result_log=step['result_log'],step_sequence=step['step_sequence'],item_id=TestItemid
                             )
        else:
            suiteNone=TestSuite.objects.filter(test_suite_id=suiteData['test_suite_id'])
            if not suiteNone:
               return errResponse(U"suite_id不存在")
            TestSuite.objects.filter(test_suite_id=suiteData['test_suite_id']).update(test_suite_name=suiteData['test_suite_name'],test_suite_describe=suiteData['test_suite_describe'],tester=suiteData['tester'],test_item="[]")
            testItems=suiteData['test_item']
            testItemIds={}
            for item in testItems:
                if item['test_item_id']==-1:
                    TestItem.objects.create(
                       item_name=item['item_name'],test_item_desc=item['test_item_desc'], suite_id=suiteData['test_suite_id'],driver=item['driver'],\
                       test_step="[]",environment=item['environment'],item_sequence=item['item_sequence'])
                    TestItemid=TestItem.objects.filter(  item_name=item['item_name'],test_item_desc=item['test_item_desc'], suite_id=suiteData['test_suite_id'],driver=item['driver'],\
                       item_sequence=item['item_sequence']).values("test_item_id")
                    TestItemid=TestItemid[0]
                    if type(TestItemid["test_item_id"])!=long:
                        return errResponse(U"新增item获取id错误")
                    else:
                        testSteps=item['test_step']
                        item['test_item_id']=int(TestItemid["test_item_id"])
                        for step in testSteps:
                             TestStep.objects.create(data_desc=step['data_desc'],data=step['data'],expect_data=step['expect_data'],\
                                                    type=step['type'],result_log=step['result_log'],step_sequence=step['step_sequence'],item_id=TestItemid["test_item_id"]
                             )
                else:
                    TestItem.objects.filter(test_item_id=item['test_item_id']).update(
                       item_name=item['item_name'],test_item_desc=item['test_item_desc'], suite_id=suiteData['test_suite_id'],driver=item['driver'],\
                       test_step="[]",environment=json.dumps(item['environment']),item_sequence=item['item_sequence'])
                    testSteps=item['test_step']
                    testStepIds=[]
                    for step in testSteps:
                        if step['data_id']==-1:
                            TestStep.objects.create(data_desc=step['data_desc'],data=step['data'],expect_data=step['expect_data'],\
                                                    type=step['type'],result_log=step['result_log'],step_sequence=step['step_sequence'],item_id=item['test_item_id'])
                            stepIds=TestStep.objects.filter(data_desc=step['data_desc'],data=step['data'],expect_data=step['expect_data'],\
                                                    type=step['type'],result_log=step['result_log'],step_sequence=step['step_sequence'],item_id=item['test_item_id']).values('data_id')
                            step['data_id']=int(stepIds[0]['data_id'])
                        else:
                            TestStep.objects.filter(data_id=step['data_id']).update(data_desc=step['data_desc'],data=step['data'],expect_data=step['expect_data'],\
                                                    type=step['type'],result_log=step['result_log'],step_sequence=step['step_sequence'])
                        testStepIds.append(step['data_id'])
                    testItemIds.setdefault(item['test_item_id'],testStepIds)
            print testItemIds
            for testItemId in testItemIds:
                 deleteSteps=TestStep.objects.filter(item_id=int(testItemId))
                 for deleteStep in deleteSteps:
                     if deleteStep.data_id in testItemIds[testItemId]:
                         continue
                     else:
                         TestStep.objects.filter(data_id=deleteStep.data_id).delete()
            deleteItems=TestItem.objects.filter(suite_id=suiteData['test_suite_id'])
            for deleteItem in deleteItems:
                 if deleteItem.test_item_id in testItemIds:
                     continue
                 else:
                     TestStep.objects.filter(item_id=deleteItem.test_item_id).delete()
                     TestItem.objects.filter(test_item_id=deleteItem.test_item_id).delete()
    except Exception as e:
         logging.info(e)
         return errResponse(U"提交suite失败！！")
    return errResponse(U"提交suite成功！！",0)