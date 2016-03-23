__author__ = 'WangJun'
from AtdpX.settings import TokenKey
def useridToToken(userid):
    token=oct(userid*TokenKey)
    print token
    return token
def tokenToUserid(token):
    userid=int(token,8)/TokenKey
    return userid
