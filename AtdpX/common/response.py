#-*- coding:utf8 -*-
from django.http import HttpResponse
from conf import Static_con
import json
from modelsEncoder import DateEncoder

class errResponse(HttpResponse):
	def __init__(self,errmsg,errcode=Static_con.response_error,dataList=None):
		response_data = {}
		response_data['errcode'] = errcode
		response_data['data'] = dataList
		if 'unicode'==type(errmsg).__name__.lower():
			response_data['errmsg'] = errmsg
		else:
			response_data['errmsg'] = str(errmsg)
		

		#	跨域访问设置
		self['Access-Control-Allow-Origin'] = '*'
		self['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS,DELETE,PUT'
		
class sucResponse(HttpResponse):
	def __init__(self, dataList = None):		
		data = {}
		data['errcode'] = Static_con.response_success
		data['errmsg'] = "success"
		data['data'] = dataList
		super(sucResponse, self).__init__(
            content = json.dumps(data,ensure_ascii=False,cls=DateEncoder),
            mimetype = 'application/json',
        )

		
		#	跨域访问设置
		#self['Access-Control-Allow-Origin'] = '*'
		#self['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS,DELETE,PUT'