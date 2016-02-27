#-*- coding:utf8 -*-
#__author__ = 'zhangxiaoyi'
import sys


class Static_con():
    response_success=0
    response_error=-1

    token_error=-1 #token无效,md5不对
    token_expired=-2 #token无效，过期了
    token_right=0 #token有效

    default_page_size=sys.maxint#20 #分页查询默认每页查询的数量

    '''#0127 user_info中没有组的概念了
    user_type_group=1 #用户类型为组 user_id小于等于10000
    user_type_normal=2 #用户类型为个人用户 user_id大于10000
    user_group_max=10000 #user_groupId的最大值'''
if __name__ == '__main__':
    print sys.maxint    