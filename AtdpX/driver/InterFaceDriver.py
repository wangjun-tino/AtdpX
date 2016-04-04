#!/usr/bin/env python
#encoding=utf-8
'''
Created on 2016-2-4
@author: WangJun
'''
import os, sys
import json,time
from common.httpUtil import sendRequest
from drivers import TestDriverBase
from sysConfig.models import SysConfig

class InterFaceDriver(TestDriverBase):
    def __init__(self):
        TestDriverBase.__init__(self)
        self.__token = None
    def Test_Login(self, param, *args):
        '''登陆返回access_token'''
        assert(param)

        url = SysConfig.object.filter(parameterKey='Test_Login').values('parameterValues')[0]['parameterValues']
        retResult = sendRequest(url, param,Log=self.Log)
        if not retResult: return False
        response = json.loads(retResult)
        if response and response.get('errmsg','')== 'success' :
            if 'data' in response:
                self.__token = response['data'].get('token','')
                return True
            else:
                errInfo = 'URL: %s返回值中缺少【data】必要字段' %url.encode('utf-8')
                self.Log.info(errInfo)
                outputResult = {
                                'execTime':time.strftime('%Y%m%d%H%M%S',time.localtime(time.time())), \
                                'testStatus':False, \
                                'failLog':[errInfo]}
                self.Log.info(outputResult)
                return False
        else:
            errInfo = 'URL: %s执行失败：%s' %(url.encode('utf-8'),\
                                         json.dumps(response,ensure_ascii=False).encode('utf-8'))
            self.Log.info(errInfo)
            outputResult = {
                            'execTime':time.strftime('%Y%m%d%H%M%S',time.localtime(time.time())), \
                            'testStatus':False, \
                            'failLog':[errInfo]}
            self.Log.info(outputResult)
            return False

    def Test_Interface_Request(self, param,*args):
        assert(param)
        if param.get('token')!=None:
            param['token']=self.__token
        #获取自定义参数
        if args[0] not in self.sysConfigKey:
            self.Log.info('未在测试规则库中找到行编批处理URL请求')
            return None
        url = self.sysConfigKey[args[0]]
        urlType = 'GET'
        retResult = sendRequest(url, param,type=urlType,Log=self.Log)
        if not retResult: return None
        response = json.loads(retResult)
        if args[1] == None:
            if response and response.get('errmsg','') == 'success':
                return response
            else:
                errInfo = 'URL：%s执行失败：%s' %(url.encode('utf-8'), \
                                            json.dumps(response,ensure_ascii=False).encode('utf-8'))
                self.Log.info(errInfo)
                outputResult = {'ExpectData':args[1], \
                                'execTime':time.strftime('%Y%m%d%H%M%S',time.localtime(time.time())), \
                                'testStatus':False, \
                                'failLog':[errInfo]}
                self.Log.info(outputResult)
                return None
        else:
            diffResult=self.DiffM(args[1],response)
            if len(diffResult)==0 :
                retPass = True
            else:
                retPass = False
                outputResult = {
                            'execTime':time.strftime('%Y%m%d%H%M%S',time.localtime(time.time())), \
                            'testStatus':retPass, \
                            'failLog':diffResult, \
                            'ExpectData':args[1]}
                self.Log.info('测试数据验证失败，详细信息：'+json.dumps(outputResult, ensure_ascii=False).encode('utf-8'))
                self.Log.info(outputResult)
            return retPass


