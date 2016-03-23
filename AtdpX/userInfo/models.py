#coding=utf8
from django.db import models

# Create your models here.
class UserInfo(models.Model):
    userId = models.IntegerField(primary_key=True,db_column='userid',db_tablespace='atdp_db')
    userName = models.TextField(null=False,db_column='username',db_tablespace='atdpx_db')
    realName = models.TextField(null=False,db_column='realname',db_tablespace='atdpx_db')
    password = models.TextField(null=False,db_column='password',db_tablespace='atdpx_db')
    age=models.ImageField(null=True,db_column='age',db_tablespace='atdpx_db')
    class Meta:
        db_table = 'user_info'