#!/usr/bin/env python
#encoding=utf-8
__author__ = 'WangJun'
import json,os
from loader import testSuiteLoad
from common.logger import getDefaultLogger
from driver.drivers import TestDriverFactory
from step import TestStep
def runner(list):
    Logging=getDefaultLogger()
    suites=testSuiteLoad(list)
    for suite in suites:
         suiteId=suite['test_suite_id']
         tester=suite['tester']
         suiteName=suite['test_suite_name']
         items=suite['test_item']
         Logging.info(suiteName+u'测试集合执行,测试员：'+tester+u' 执行测试项：'+str(items))
         print items
         for item in items:
             itemId=item['test_item_id']
             itemName=item['item_name']
             testDriverName=item['driver']
             if item['environment']!=None:
                testenv=json.loads(item['environment'])
             else:
                 testenv={'mysql': {'name': 'atdpx_db','user': 'root','password': '', 'host': '127.0.0.1', 'port': '3306'}}
             print item['test_step']
             steps=item['test_step']
             testenv['steps']=steps
             testDriver = TestDriverFactory(testDriverName)
             testDriver.setup(testenv)
             Logging.info(itemName+u'测试项执行'+u' 执行测试步骤：'+str(steps))
             for step in steps:
                teststepClass = TestStep(step, testDriver)
                teststepClass.run()