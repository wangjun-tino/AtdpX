#!/usr/bin/env python
#encoding=utf-8
# TestStep测试步骤类
__author__ = 'zhouguangming'

import os, sys,json
from common.logger import getDefaultLogger

class TestStep(object):
    '''测试步骤组合成为测试用例
                       测试步骤类：
       1、包含测试关键字，输入参数以及接口返回预期值；
       2、执行测试的最小粒度；
    '''
    def __init__(self, stepdata, testdriver):
        # 测试关键字
        self.__commandKey = stepdata['type']
        # 输入参数
        if not self.__commandKey.startswith('Test_'):
            if 'data' in stepdata and 'expect_data' in stepdata and {"data":json.loads(stepdata['data']),"expect_data":json.loads(stepdata['expect_data'])}:
                self.__param ={"data":json.loads(stepdata['data']),"expect_data":json.loads(stepdata['expect_data'])}
            elif  'data' in stepdata and 'expect_data' not in stepdata and {"data":json.loads(stepdata['data'])}:
                self.__param ={"data":json.loads(stepdata['data'])}
            else:
                self.__param = None
        # 接口返回预期值
        if self.__commandKey.startswith('Test_API_') or self.__commandKey.startswith('Test_Login') :
            if 'data' in stepdata and {"data":json.loads(stepdata['data'])}:
                self.__param =json.loads(stepdata['data'])
            if 'expect_data' in stepdata and json.loads(stepdata['expect_data']):
                self.__response=json.loads(stepdata['expect_data'])
            else:
                self.__response   = None
        else:
            self.__response=None
        # 所需的测试驱动
        self.__testdriver = testdriver
        
        self.Log=None
    
    def __del__(self):
        pass
    
    def run(self):
        self.Log=getDefaultLogger()
        '''根据测试关键字执行对应的操作：
        输入参数为：用例中的param参数或和接口返回值
        输出结果为：执行返回值：成功或失败
        '''
        ret = False
        try:
            if self.__commandKey.startswith('Test_API_'):
                testMethod = getattr(self.__testdriver, 'Test_Interface_Request1')
            else:
                testMethod = getattr(self.__testdriver, self.__commandKey)
            ret =  testMethod(self.__param, self.__commandKey, self.__response)
            if not ret:
                raise Exception('')
            else:
                self.Log.info("测试步骤【%s】执行成功" %self.__commandKey.encode('utf-8'))
        except Exception as e:
            errLog = "测试步骤【%s】执行失败" %self.__commandKey.encode('utf-8')
            if e.message: errLog += '，失败原因：%s' %e
            self.Log.info(errLog)
            getattr(self.__testdriver, "Util_RemoveData")(self.__param, None)
            #getattr(self.__testdriver, "Util_ApiMySqlRemoveData")(self.__param, None)
        finally:
            return ret