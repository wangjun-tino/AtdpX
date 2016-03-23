-- --------------------------------------------------------
-- 主机:                           172.23.25.56
-- 服务器版本:                        5.0.95 - Source distribution
-- 服务器操作系统:                      redhat-linux-gnu
-- HeidiSQL 版本:                  9.1.0.4867
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出 atdpx_db 的数据库结构
CREATE DATABASE IF NOT EXISTS `atdpx_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `atdpx_db`;


-- 导出  表 atdpx_db.django_migrations 结构
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` int(11) NOT NULL auto_increment,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 正在导出表  atdpx_db.django_migrations 的数据：0 rows
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;


-- 导出  表 atdpx_db.sys_config 结构
CREATE TABLE IF NOT EXISTS `sys_config` (
  `id` int(11) NOT NULL,
  `parameterName` varchar(50) collate utf8_bin default NULL,
  `parameterValues` varchar(500) collate utf8_bin default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='系统参数表';

-- 正在导出表  atdpx_db.sys_config 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `sys_config` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_config` ENABLE KEYS */;


-- 导出  表 atdpx_db.task_info 结构
CREATE TABLE IF NOT EXISTS `task_info` (
  `task_id` int(11) NOT NULL default '0',
  `pars` longtext collate utf8_bin,
  `task_name` varchar(45) collate utf8_bin default NULL,
  `task_type` varchar(45) collate utf8_bin default NULL,
  `status` varchar(45) collate utf8_bin default NULL,
  `begin_time` timestamp NULL default CURRENT_TIMESTAMP,
  `DATETIME` varchar(45) collate utf8_bin default NULL,
  PRIMARY KEY  (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='任务信息表';

-- 正在导出表  atdpx_db.task_info 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `task_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `task_info` ENABLE KEYS */;


-- 导出  表 atdpx_db.testcase_info 结构
CREATE TABLE IF NOT EXISTS `testcase_info` (
  `testcase_id` int(11) NOT NULL,
  `case_data` longtext collate utf8_bin,
  `case_descption` varchar(500) collate utf8_bin default NULL,
  `ExceptionResult` longtext collate utf8_bin,
  `last_Pass_or_fail` varchar(45) collate utf8_bin default NULL,
  `last_execute_userid` varchar(45) collate utf8_bin default NULL,
  `fail_log` varchar(45) collate utf8_bin default NULL,
  PRIMARY KEY  (`testcase_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='测试数据表';

-- 正在导出表  atdpx_db.testcase_info 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `testcase_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `testcase_info` ENABLE KEYS */;


-- 导出  表 atdpx_db.testFileData_info 结构
CREATE TABLE IF NOT EXISTS `testFileData_info` (
  `testFileData_id` int(11) NOT NULL,
  `testFileData_name` varchar(45) collate utf8_bin default NULL,
  PRIMARY KEY  (`testFileData_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='???????';

-- 正在导出表  atdpx_db.testFileData_info 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `testFileData_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `testFileData_info` ENABLE KEYS */;


-- 导出  表 atdpx_db.test_data 结构
CREATE TABLE IF NOT EXISTS `test_data` (
  `data_id` varchar(11) collate utf8_bin NOT NULL COMMENT '????ID',
  `data_desc` text collate utf8_bin COMMENT '????',
  `data` varchar(45) collate utf8_bin default NULL,
  `expect_data` longtext collate utf8_bin COMMENT '????',
  PRIMARY KEY  (`data_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='?????';

-- 正在导出表  atdpx_db.test_data 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `test_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_data` ENABLE KEYS */;


-- 导出  表 atdpx_db.test_info 结构
CREATE TABLE IF NOT EXISTS `test_info` (
  `test_id` varchar(20) collate utf8_bin NOT NULL,
  `test_name` varchar(50) collate utf8_bin default NULL,
  `test_descption` varchar(500) collate utf8_bin default NULL,
  `last_write_data` datetime default NULL,
  `wiriter_userid` varchar(45) collate utf8_bin default NULL,
  `last_write_userid` varchar(45) collate utf8_bin default NULL,
  `test_type` varchar(45) collate utf8_bin default NULL,
  PRIMARY KEY  (`test_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='??????';

-- 正在导出表  atdpx_db.test_info 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `test_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_info` ENABLE KEYS */;


-- 导出  表 atdpx_db.test_item 结构
CREATE TABLE IF NOT EXISTS `test_item` (
  `test_item_id` varchar(16) collate utf8_bin NOT NULL COMMENT '测试项ID',
  `item_name` varchar(45) collate utf8_bin default NULL COMMENT '测试项名称',
  `test_item_desc` text collate utf8_bin COMMENT '测试项描述',
  `driver` varchar(45) collate utf8_bin default NULL COMMENT '驱动名',
  `test_step` text collate utf8_bin COMMENT '测试步骤集',
  PRIMARY KEY  (`test_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='测试项表';

-- 正在导出表  atdpx_db.test_item 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `test_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_item` ENABLE KEYS */;


-- 导出  表 atdpx_db.test_suite 结构
CREATE TABLE IF NOT EXISTS `test_suite` (
  `test_suite_id` varchar(11) collate utf8_bin NOT NULL COMMENT '测试集合ID',
  `test_suite_name` varchar(45) collate utf8_bin default NULL COMMENT '测试集合名称',
  `test_suite_describe` text collate utf8_bin COMMENT '测试集合功能',
  `tester` varchar(45) collate utf8_bin default NULL COMMENT '测试员',
  `test_item` text collate utf8_bin COMMENT '测试项',
  PRIMARY KEY  (`test_suite_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='测试集合表';

-- 正在导出表  atdpx_db.test_suite 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `test_suite` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_suite` ENABLE KEYS */;


-- 导出  表 atdpx_db.user_info 结构
CREATE TABLE IF NOT EXISTS `user_info` (
  `userid` int(11) NOT NULL default '0',
  `username` varchar(45) collate utf8_bin default NULL,
  `password` varchar(45) collate utf8_bin default NULL,
  `realname` varchar(45) collate utf8_bin default NULL,
  `age` int(11) default '0',
  PRIMARY KEY  (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户信息表';

-- 正在导出表  atdpx_db.user_info 的数据：~11 rows (大约)
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` (`userid`, `username`, `password`, `realname`, `age`) VALUES
	(1000, 'wangjun', '123456', '王君', 30),
	(1001, 'wangyan', '123456', '王艳', 30),
	(1002, 'wangyinuo', '123456', '王一诺', 2),
	(1003, 'gaogao', '123456', '高高', 33),
	(1004, 'wangtao', '1', '王涛', 32),
	(1005, 'wangyi', '2', '王毅', 33),
	(1006, 'wangguang', '3', '王光', 33),
	(1007, 'wangjiayi', '3', '王佳怡', 5),
	(1008, 'wangjun2', '5', '王君2', 30),
	(1009, 'wangyon', '6', '王勇', 40),
	(1010, 'wangyue', '7', '王悦', 40);
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
