#coding=utf8
from django.db import models

# Create your models here.
class TaskInfo(models.Model):
    task_id=models.IntegerField(primary_key=True,db_column='task_id',db_tablespace='atdpx_db')
    pars = models.TextField(null=False,db_column='pars',db_tablespace='atdpx_db')
    task_type=models.CharField(null=False,db_column='task_type',db_tablespace='atdpx_db',max_length=45)
    task_name=models.CharField(null=False,db_column='task_name',db_tablespace='atdpx_db',max_length=45)
    status=models.CharField(null=False,db_column='status',db_tablespace='atdpx_db',max_length=45)
    begin_time=models.CharField(null=False,db_column='begin_time',db_tablespace='atdpx_db',max_length=45)
    end_time=models.CharField(null=False,db_column='end_time',db_tablespace='atdpx_db',max_length=45)
    class Meta:
        db_table = 'task_info'
