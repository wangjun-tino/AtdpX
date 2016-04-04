#!/usr/bin/env python
#encoding=utf-8
__author__ = 'WangJun'

import json,traceback,os
from testCase.models import TestStep,TestSuite,TestItem
from common.logger import getDefaultLogger
from django.forms.models import model_to_dict
def testSuiteLoad(suites):
    logging=getDefaultLogger()

    try:
        testSuites=TestSuite.objects.all()
        data={}
        queryResult=list()
        for testSuite in testSuites:
            if testSuite.test_suite_id not in suites:
                continue
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
            testSuite2Json=json.dumps(testSuite2Json,ensure_ascii=True)
            testSuite2Json=json.loads(testSuite2Json)
            print testSuite2Json
            queryResult.append(testSuite2Json)
    except Exception as e:
         logging.info(e)
    return queryResult