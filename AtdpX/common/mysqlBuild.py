__author__ = 'WangJun'
import json
from common.logger import getDefaultLogger
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
        logging.info('构建测试用SQL语句失败：%s' %e)
        return ''
        logging.info('测试用SQL语句: %s' %retSQL.encode('utf-8'))
    return retSQL