#!/usr/bin/env python
# -*- coding: utf-8 -*
# 用于访问MySQL数据库的公共方法
__author__ = 'wangjun'

import MySQLdb
from common.logger import getDefaultLogger

class MysqldbHelper(object):
	'''用于Mysql数据交互访问'''
	def __init__(self,MysqlConf):
		logging=getDefaultLogger()
		try:
			if MysqlConf:
				host = MysqlConf.get("host")
				port = MysqlConf.get("port")
				user = MysqlConf.get("user")
				passwd = MysqlConf.get("passwd")
				name = MysqlConf.get("name")
				self.__conn = MySQLdb.connect(host=host, \
											  port=port, \
											  user=user, \
											  passwd=passwd, \
											  db=name, \
											  charset='utf8')
				self.__Log=logging
				self.__cursor = self.__conn.cursor(MySQLdb.cursors.DictCursor)
			else:
				self.__Log.info('MySQL Configuration must not be empty')
				exit(0)
		except Exception as e:
			logging.info('Connect to %s:%s/%s failed: %s' %(host, port, name, e.message))
			exit(0)
	
	@property
	def conn(self):
		return self.__conn
	
	@property
	def cursor(self):
		return self.__cursor

	def __del__(self):
		try:
			if self.cursor: self.cursor.close()
		except Exception, e:
			self.__Log.info("Close cursor failed: %s" %e)
		try:
			if self.conn: self.conn.close()
		except Exception, e:
			self.__Log.info("Close mysql conn failed: %s" %e)
	
	def executeSQL(self, sqlcomment):
		'''执行指定sql语句'''
		assert(self.conn)
		assert(self.cursor)
		retResults = None
#  		if sqlcomment.lower().startswith('select'):
# 			self.cursor = self.conn.cursor(MySQLdb.cursors.DictCursor)
# # 		
		self.cursor.execute(sqlcomment)
		# 若为SELECT语句，则返回查询的结果集
		if sqlcomment.lower().startswith('select'):
			retResults = self.cursor.fetchall()
		# 否则提交执行
		else: 
			self.conn.commit()
		return retResults

if __name__ == '__main__':
	mysqlHelper = MysqldbHelper()
	result = mysqlHelper.executeSQL('SELECT * FROM project_info WHERE project_id = 100')
	print result[0][3]
		