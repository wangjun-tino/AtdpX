#!/usr/bin/env python
# -*- coding: utf-8 -*
import httplib

__author__ = 'wangjun'

import urllib, urllib2
import json
from common.logger import getDefaultLogger
def sendRequest(url, param, data=None, type='GET',Log=None):
    '''发送URL请求，并返回请求结果'''
    logging=getDefaultLogger()
    retResponse = None
    try:
        req = None
        if type == 'GET':
            params = urllib.urlencode(param).replace("u%27", "%22").replace("%27","%22").replace("None", "null")
            req = urllib2.Request(url, params)
            logging.info("http请求内容：%s"%(url+"?"+params).encode('utf-8'))
        elif type == 'POST':
            #req = urllib2.Request(url, data)
            params=json.dumps(param)
            httpClient = None
            try:
                httpClient = httplib.HTTPConnection("192.168.4.189", 80, timeout=1000)
                headers = {"Content-type": "application/x-www-form-urlencoded", "Accept": "text/plain"}
                httpClient.request("POST", url, params, headers)
                response = httpClient.getresponse()
                retResponse = response.read()
            except Exception as e:
                logging.info('发送HTTP请求【%s】失败: %s' %(url.encode('utf-8'),e))
            finally:
                if httpClient:
                    httpClient.close()
        else:
            logging.info('暂不支持的请求类型：%s' %type.encode('utf-8'))
        if req:
            retResponse = urllib2.urlopen(req)
    except Exception as e:
        print e
        logging.info('发送HTTP请求【%s】失败: %s' %(url.encode('utf-8'),e))
    return retResponse and retResponse.read() or None

if __name__ == '__main__':
    # 登陆web    
    url = 'http://fs.navinfo.com/fos/user/login/'#'http://fs.navinfo.com/fos/editsupport/poi/save'
    param = {"id":"liusha02925",\
             "secret":"029250"}
    #data = {"access_token":"0000029900O0MPFODA2F5043FF0200CABD2ACC8515D9904D","projectId":2015062102,"phase":4,"fid":"01200420141223161820","featcode":"poi","validationMethod":1,"data":{"relateParent":None,"attachments":[],"auditStatus":2,"indoor":{"open":1,"type":0,"floor":None},"pid":73360862,"checkResults":[{"errorCode":"FM-14Win-01-02","errorMsg":"重新确认成果中的设施名称是否正确","fields":[{"0":"n","1":"a","2":"m","3":"e"}],"status":1},{"errorCode":"FM-14Win-01-04","errorMsg":"加油站需要采集电话，请补充电话号码","fields":[{"0":"t","1":"e","2":"l","3":"e","4":"p","5":"h","6":"o","7":"n","8":"e"}],"status":1}],"phaseHistory":[{"date":"20151130200829","phaseId":3,"sequenceNum":1}],"synchronizeDate":None,"regionInfo":"D","sportsVenues":None,"projectHistory":[],"freshnessVerification":0,"ckException":[],"operateDate":"20151019181709","srcInformation":{"s_project":"2015062102","s_sourceType":None,"s_sourceId":None,"s_sourceCode":5},"contacts":[],"batchModifyStatus":0,"hospital":None,"kindCode":"230215","chargingStation":None,"attraction":None,"handler":"2925","location":{"latitude":39.82629,"longitude":116.452},"fid":"01200420141223161820","editHistory":[{"mergeDate":"20151130200829","sourceName":"Web","sourceProject":"2015062102","sourceTask":"","validationMethod":1,"mergeContents":[],"operator":{"role":0,"user":2925},"operation":2}],"sourceFlags":{"chiAddress":None,"standardChiName":"003000010000","portugueseName":None,"record":"001000010000","contact":None,"englishName":"002000060000"},"website":None,"open24H":2,"evaluateComment":[],"importance":0,"parkings":None,"evaluatePlanning":2,"airportCode":None,"evaluateQuality":0,"brands":[],"foodtypes":None,"chargingPole":[],"rawFields":None,"rental":None,"lifecycle":2,"submitStatus":0,"gasStation":{"payment":None,"service":"1","oilType":"92|95","mgType":None,"egType":None,"fuelType":"0|1","servicePro":None,"openHour":None},"name":"加油站１","meshid":"595653","evaluateIntegrity":0,"adminReal":0,"hotel":None,"level":"B1","relateChildren":[{"childRowkey":"005956530073361116","type":2,"childPid":73361116,"childFid":"01200420141223161901"}],"rowkey":"005956530073360862","postCode":None,"adminCode":"110105","latestMergeDate":"20151019181709","checkResultNum":2,"guide":{"latitude":39.82615,"linkPid":320238,"longitude":116.45181},"address":None}}
    response = sendRequest(url, param)
    print response