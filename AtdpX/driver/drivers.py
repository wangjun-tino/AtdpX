#!/usr/bin/env python
#encoding=utf-8
__author__ = 'WangJun'
from _ast import Pass
import json,traceback
import time
from common.mysqlUtil import MysqldbHelper
from common.logger import getDefaultLogger
from sysConfig.models import SysConfig
class TestDriverFactory(object):
    def __init__(self):
        pass

    def __del__(self):
        pass

    def createTestDriver(self, driverType):
        '''根据不同的驱动程序'''
        if driverType == 'InterFaceDriver':
            from InterFaceDriver import InterFaceDriver
            return InterFaceDriver()
        else:
            raise ValueError('未知测试驱动类型：%s' %driverType)

    def __call__(self, driverType):
        return self.createTestDriver(driverType)


class TestDriverBase(object):
    def __init__(self):
        self.steps=None
        self.Log=None
        self.Mysqlhander=None
        self.verifyData=[]
        self.caseData=[]
        self.sysConfigKey=[]

    def setup(self, testenv):
        '''测试驱动的属性配置'''
        print testenv
        self.Mysqlhander=MysqldbHelper(testenv['environment']['mysql'])
        self.steps=testenv['steps']
        self.Log=getDefaultLogger()
        sysConfigKeys=SysConfig.objects.filter(parameterName__contains='Test_API_').values('parameterName','parameterValues')
        for sysConfigKey in sysConfigKeys:
            self.sysConfigKey.append({sysConfigKey['parameterName']:sysConfigKey['parameterValues']})

    def Util_AddMysqlData(self, param, *args):
        '''根据不同的数据模型，插入对应的测试用数据'''
        assert(param)
        retLog="Pass"
        if param.get('data')==None:
            retLog="data对象不存在"
            return False,retLog
        sql=self.CreatMySqlSentence(param['data'],'insert')
        if not sql:
            retLog="语句生成结果为空"
            return False,retLog
        try:
            self.Mysqlhander.executeSQL(sql)
        except Exception as e:
            self.Log.info(e)
            retLog=e
        if param.get('data')!=None and param['data']!=None:
            self.caseData.append(param['data'])
        if param.get('expect_data')!=None and param['expect_data']!=None:
            self.verifyData.append(param['expect_data'])
        return True,retLog

    def Util_RemoveMysqlData(self,params,*args):
        '''根据不同的数据模型，插入对应的测试用数据'''
        retLog="Pass"
        for param in self.caseData:
            sql=self.CreatMySqlSentence(param,'delete')
            if not sql:
                retLog="语句生成结果为空"
                return False,retLog
            try:
                self.Mysqlhander.executeSQL(sql)
            except Exception as e:
                self.Log.info(e)
        for expect in self.verifyData:
            if not expect:
                continue
            sql2=self.CreatMySqlSentence(expect,'KeyDelete')
            if not sql2:
                retLog="语句生成结果为空"
                return False,retLog
            try:
                self.Mysqlhander.executeSQL(sql2)
            except Exception as e:
                self.Log.info(e)
                retLog=e
        return True,retLog

    def CreatMySqlSentence(self,caseData,type='insert'):
        '''根据测试数据构建测试用SQL语句'''
        logging=getDefaultLogger()
        retSQL = ''

        aa=json.dumps(caseData,ensure_ascii=True)
        caseData=json.loads(aa, encoding="utf-8")
        if 'table' not in caseData:
            raise ValueError('输入参数中无table属性，请检查输入参数的正确性')

        try:
            if type=='insert':
                if 'testData' not in caseData:
                    raise ValueError('输入参数中无testData属性，请检查输入参数的正确性')
                colnumlist=[];valuelist=[];
                for key in caseData['testData']:
                    Colvalue = caseData['testData'][key]
                    try:
                        if isinstance(caseData['testData'][key],unicode):
                            Colvalue=caseData['testData'][key].encode("utf-8")
                        else:
                            Colvalue=caseData['testData' ][key]
                        if isinstance(Colvalue,str):
                            Colvalue="\'"+Colvalue+"\'"
                        else:
                            Colvalue=str(Colvalue)
                    except Exception as e:
                        raise
                    colnumlist.append(key);valuelist.append(Colvalue)
                try:
                    colnum=",".join(colnumlist);value=",".join(valuelist)
                except Exception as e:
                    raise
                if value: retSQL = 'insert into %s ( %s ) values ( %s )' % (caseData['table'],colnum,value)
            elif type=='delete':
                if 'testData' not in caseData:
                    raise ValueError('输入参数中无testData属性，请检查输入参数的正确性')
                conditionlist=[]
                for key in caseData['testData' ]:
                    try:
                        if isinstance(caseData['testData'][key],unicode):
                            Colvalue=caseData['testData'][key].encode("utf-8")
                        else:
                            Colvalue=caseData['testData' ][key]
                        if isinstance(Colvalue,str):
                            Colvalue= " %s = \'%s\' "%(key,Colvalue)
                        else:
                            Colvalue=" %s = %s " %(key,str(Colvalue))
                    except Exception as e:
                        raise
                    conditionlist.append(Colvalue)
                condition="and".join(conditionlist)#+="and `"+key+"`="+value+" "
                if condition:
                    retSQL='delete from `%s` where %s' %(caseData['table'],condition)
            elif type=='select':
                if 'expect' not in caseData:
                    raise ValueError('输入参数中无expect属性，请检查输入参数的正确性')
                if 'verifyKey' not in caseData:
                    raise ValueError('输入参数中无verifyKey属性，请检查输入参数的正确性')
                if 'exits' in caseData['expect']:
                    caseData['expect']['count(1)']=1
                    caseData['expect'].pop('exits')
                conditionlist=[]
                targetKey=[]
                try:
                    for key in caseData['verifyKey' ]:
                        try:
                            if isinstance(caseData['verifyKey'][key],unicode):
                                Colvalue=caseData['verifyKey'][key].encode("utf-8")
                            else:
                                Colvalue=caseData['verifyKey' ][key]
                            if isinstance(Colvalue,str):
                                Colvalue= " %s = \'%s\' "%(key,Colvalue)
                            else:
                                Colvalue=" %s = %s " %(key,str(Colvalue))
                        except Exception as e:
                            raise
                        conditionlist.append(Colvalue)
                    condition="and".join(conditionlist)
                except Exception as e:
                    raise
                try:
                    for expectKey in caseData['expect']:
                        targetKey.append(expectKey)
                    targetKeys=",".join(targetKey)
                except Exception as e:
                    raise
                if condition and  targetKeys :
                    retSQL='select '+targetKeys+' from `'+caseData['table']+'` where '+condition
            elif type=='KeyDelete':
                if 'expect' not in caseData:
                    raise ValueError('输入参数中无expect属性，请检查输入参数的正确性')
                if 'verifyKey' not in caseData:
                    raise ValueError('输入参数中无verifyKey属性，请检查输入参数的正确性')
                conditionlist=[]
                targetKey=[]
                for key in caseData['verifyKey' ]:
                    try:
                        if isinstance(caseData['verifyKey'][key],unicode):
                            Colvalue=caseData['verifyKey'][key].encode("utf-8")
                        else:
                            Colvalue=caseData['verifyKey' ][key]
                        if isinstance(Colvalue,str):
                            Colvalue= " %s = \'%s\' "%(key,Colvalue)
                        else:
                            Colvalue=" %s = %s " %(key,str(Colvalue))
                    except Exception as e:
                        raise
                    conditionlist.append(Colvalue)
                condition="and".join(conditionlist)
                if condition:
                     retSQL='delete from `%s` where %s' %(caseData['table'],condition)
        except Exception as e:
            self.Log.info('构建测试用SQL语句失败：%s' %e)
            return ''
        self.Log.info('测试用SQL语句: %s' %retSQL.encode('utf-8'))
        return retSQL
    def DiffM(self,DictOne,DictTwo):
        try:
            DictOne=json.loads(json.dumps(DictOne));DictTwo=json.loads(json.dumps(DictTwo))
            VerificationResult={}
            keys = set(DictOne.keys() + DictTwo.keys())
            for k in keys:
                    #初始化两个对象存储变量
                    DefualtValuesE=None;DefualtValuesA=None;DiffResult={}
                    #逐KEY对比Values的值类型
                    #字典类型
                    if DictOne.get(k)!=None and DictTwo.get(k)!=None and type(DictOne.get(k))==dict and type(DictTwo.get(k))==dict:
                        DiffResult=self.DiffM(DictOne.get(k),DictTwo.get(k))
                        VerificationResult[k]=DiffResult
                    #列表类型
                    elif DictOne.get(k)!=None and DictTwo.get(k)!=None and type(DictOne.get(k))==list and type(DictTwo.get(k))==list:
                        Re=[];Ra=[];
                        if DictOne.get(k)==[] and DictTwo.get(k)==[]:
                            continue
                        else:
                            if DictOne.get(k)==DictTwo.get(k):continue
                            else:
                                for x in DictOne.get(k):
                                    if x not in DictTwo.get(k):
                                        Re.append(x)
                                for y in DictTwo.get(k):
                                    if y not in DictOne.get(k):
                                        Ra.append(y)
                                    DiffResult['Expect']=x
                                    DiffResult['Actual']=y
                                VerificationResult[k]=DiffResult
                    #其他类型
                    else:
                        if cmp(DictOne.get(k), DictTwo.get(k)):
                            #记录数据值
                            DefualtValuesE=DictOne.get(k);DefualtValuesA=DictTwo.get(k)
                            #整理输出格式
                            DiffResult['Expect']=DefualtValuesE
                            DiffResult['Actual']=DefualtValuesA
                            #写入最终结果
                            VerificationResult[k]=DiffResult
                    for kk in VerificationResult.keys():
                        if VerificationResult[kk]=={}:
                            del VerificationResult[kk]
        except Exception as exception:
            self.Log.info('Traceback：%s',traceback.format_exc())
            VerificationResult={'Msg':'Execut failed!!'}
        return VerificationResult
