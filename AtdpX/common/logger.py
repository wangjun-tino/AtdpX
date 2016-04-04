# -*- coding: utf-8 -*
__author__ = 'wangjun'

import logging.config
import os
#把引用AutoUrlTest的路径添加到环境变量中.否则会报ImportError: No module named



#获取默认的logger，文件被保存到fos.log文件中
def getDefaultLogger():
    logging.config.fileConfig(os.path.dirname(os.path.dirname(__file__))+"/common/logger.conf")
    return  logging.getLogger("Atdp")

#获取将log信息保存到指定文件名的logger
def getLogger(fileName):
    fh =  logging.FileHandler(fileName)
    formatter = logging.Formatter('[%(asctime)s](%(levelname)s)[funcname:%(funcName)s] [lineno:%(lineno)s] : %(message)s')
    fh.setFormatter(formatter)
    logger = getDefaultLogger()
    logger.addHandler(fh)
    return logger
