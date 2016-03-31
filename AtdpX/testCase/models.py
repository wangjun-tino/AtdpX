#coding=utf8
from django.db import models

# Create your models here.
class TestSuite(models.Model):
    test_suite_id=models.IntegerField(primary_key=True,db_column='test_suite_id',db_tablespace='atdpx_db')
    test_suite_name=models.CharField(null=False,db_column='test_suite_name',db_tablespace='atdpx_db',max_length=45)
    test_suite_describe=models.TextField(null=True,db_column='test_suite_describe',db_tablespace='atdpx_db')
    tester=models.CharField(null=False,db_column='tester',db_tablespace='atdpx_db',max_length=45)
    test_item=models.TextField(null=True,db_column='test_item',db_tablespace='atdpx_db')
    class Meta:
        db_table = 'test_suite'
class TestItem(models.Model):
    test_item_id=models.IntegerField(primary_key=True,db_column='test_item_id',db_tablespace='atdpx_db')
    item_name=models.CharField(null=False,db_column='item_name',db_tablespace='atdpx_db',max_length=45)
    test_item_desc=models.TextField(null=True,db_column='test_item_desc',db_tablespace='atdpx_db')
    suite_id=models.IntegerField(null=False,db_column='suite_id',db_tablespace='atdpx_db')
    driver=models.CharField(null=False,db_column='driver',db_tablespace='atdpx_db',max_length=45)
    test_step=models.TextField(null=True,db_column='test_step',db_tablespace='atdpx_db')
    environment=models.TextField(null=True,db_column='environment',db_tablespace='atdpx_db')
    item_sequence=models.IntegerField(null=False,db_column='item_sequence',db_tablespace='atdpx_db')
    class Meta:
        db_table = 'test_item'
        ordering = ['item_sequence']
class TestStep(models.Model):
    data_id=models.IntegerField(primary_key=True,db_column='data_id',db_tablespace='atdpx_db')
    data_desc=models.TextField(null=False,db_column='data_desc',db_tablespace='atdpx_db')
    data=models.TextField(null=True,db_column='data',db_tablespace='atdpx_db')
    expect_data=models.TextField(null=True,db_column='expect_data',db_tablespace='atdpx_db')
    type=models.CharField(null=False,db_column='type',db_tablespace='atdpx_db',max_length=50)
    item_id=models.IntegerField(null=False,db_column='item_id',db_tablespace='atdpx_db',max_length=11)
    result_log=models.TextField(null=True,db_column='result_log',db_tablespace='atdpx_db')
    step_sequence=models.IntegerField(null=False,db_column='step_sequence',db_tablespace='atdpx_db',max_length=13)
    class Meta:
        db_table = 'test_step'
        ordering = ['step_sequence']