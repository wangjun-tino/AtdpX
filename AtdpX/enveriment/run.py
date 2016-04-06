#!/usr/bin/env python
#encoding=utf-8
__author__ = 'WangJun'
import json,os
from loader import testSuiteLoad
from common.logger import getDefaultLogger
from driver.drivers import *
from step import TestStep
def runner(list):
    Logging=getDefaultLogger()
    try:
        suites=testSuiteLoad(list)
        for suite in suites:
             suiteId=suite['test_suite_id']
             tester=suite['tester']
             suiteName=suite['test_suite_name']
             items=suite['test_item']
             Logging.info(suiteName+u'执行,测试员：'+tester+u' 执行测试项数：'+str(len(items)))
             testDriverFactory=TestDriverFactory()
             for item in items:
                 testenv={}
                 itemId=item['test_item_id']
                 itemName=item['item_name']
                 testDriverName=item['driver']
                 if item['environment']!=None:
                    environment=item['environment'].encode("utf-8")
                    print type(environment)
                    testenv['environment']={'mysql': {'name': 'atdpx_db','user': 'root','passwd': '', 'host': '127.0.0.1', 'port': 3306}}
                    #json.loads(environment)
                    print item
                 else:
                     testenv['environment']={'mysql': {'name': 'atdpx_db','user': 'root','passwd': '', 'host': '127.0.0.1', 'port': 3306}}
                 steps=item['test_step']
                 testenv['steps']=steps
                 testDriver = testDriverFactory(testDriverName)
                 testDriver.setup(testenv)
                 Logging.info(itemName+u'项执行'+u' 执行测试步骤数：'+str(len(steps)))
                 for teststep in steps:
                    teststepClass = TestStep(teststep, testDriver)
                    teststepClass.run()
        retResult="任务执行成功"
    except Exception as e:
        Logging.info(e)
        retResult=str(traceback.format_exc())
    return retResult