-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.6.24 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  9.1.0.4867
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出 atdpx_db 的数据库结构
CREATE DATABASE IF NOT EXISTS `atdpx_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `atdpx_db`;


-- 导出  表 atdpx_db.django_migrations 结构
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 正在导出表  atdpx_db.django_migrations 的数据：0 rows
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;


-- 导出  表 atdpx_db.sys_config 结构
CREATE TABLE IF NOT EXISTS `sys_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parameterName` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `parameterValues` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='系统参数表';

-- 正在导出表  atdpx_db.sys_config 的数据：~3 rows (大约)
/*!40000 ALTER TABLE `sys_config` DISABLE KEYS */;
INSERT INTO `sys_config` (`id`, `parameterName`, `parameterValues`) VALUES
	(1, 'swich', '0'),
	(2, 'hellow', '1'),
	(3, 'Test_Login', 'http://127.0.0.2:8000/AtdpX/userInfo/login/'),
	(4, 'Test_API_Login', 'http://127.0.0.2:8000/AtdpX/userInfo/login/');
/*!40000 ALTER TABLE `sys_config` ENABLE KEYS */;


-- 导出  表 atdpx_db.task_info 结构
CREATE TABLE IF NOT EXISTS `task_info` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `pars` longtext COLLATE utf8_bin,
  `task_name` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `task_type` varchar(45) COLLATE utf8_bin NOT NULL DEFAULT '1',
  `status` varchar(45) COLLATE utf8_bin NOT NULL DEFAULT '1',
  `begin_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1009 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='任务信息表';

-- 正在导出表  atdpx_db.task_info 的数据：~7 rows (大约)
/*!40000 ALTER TABLE `task_info` DISABLE KEYS */;
INSERT INTO `task_info` (`task_id`, `pars`, `task_name`, `task_type`, `status`, `begin_time`, `end_time`) VALUES
	(1000, '[1,2]', '调试任务', '0', '1', '2016-03-24 21:36:40', NULL),
	(1001, '[2,3]', 'test2', '', '', '0000-00-00 00:00:00', ''),
	(1003, '[1,2]', 'dfsdfds', '', '', '0000-00-00 00:00:00', ''),
	(1005, '[1,2]', 'safdsfa1', '1', '1', '0000-00-00 00:00:00', ''),
	(1006, 'wer', 'wer', '1', '1', '0000-00-00 00:00:00', ''),
	(1007, 'werew', 'erwe', '1', '1', '0000-00-00 00:00:00', ''),
	(1008, 'werwe', 'werwe', '1', '1', '0000-00-00 00:00:00', '');
/*!40000 ALTER TABLE `task_info` ENABLE KEYS */;


-- 导出  表 atdpx_db.testcase_info 结构
CREATE TABLE IF NOT EXISTS `testcase_info` (
  `testcase_id` int(11) NOT NULL,
  `case_data` longtext COLLATE utf8_bin,
  `case_descption` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `ExceptionResult` longtext COLLATE utf8_bin,
  `last_Pass_or_fail` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `last_execute_userid` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `fail_log` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`testcase_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='测试数据表';

-- 正在导出表  atdpx_db.testcase_info 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `testcase_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `testcase_info` ENABLE KEYS */;


-- 导出  表 atdpx_db.testfiledata_info 结构
CREATE TABLE IF NOT EXISTS `testfiledata_info` (
  `testFileData_id` int(11) NOT NULL,
  `testFileData_name` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`testFileData_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='???????';

-- 正在导出表  atdpx_db.testfiledata_info 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `testfiledata_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `testfiledata_info` ENABLE KEYS */;


-- 导出  表 atdpx_db.test_info 结构
CREATE TABLE IF NOT EXISTS `test_info` (
  `test_id` varchar(20) COLLATE utf8_bin NOT NULL,
  `test_name` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `test_descption` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `last_write_data` datetime DEFAULT NULL,
  `wiriter_userid` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `last_write_userid` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `test_type` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`test_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='??????';

-- 正在导出表  atdpx_db.test_info 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `test_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_info` ENABLE KEYS */;


-- 导出  表 atdpx_db.test_item 结构
CREATE TABLE IF NOT EXISTS `test_item` (
  `test_item_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '测试项ID',
  `item_name` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '测试项名称',
  `test_item_desc` text COLLATE utf8_bin COMMENT '测试项描述',
  `suite_id` int(11) NOT NULL,
  `driver` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '驱动名',
  `test_step` text COLLATE utf8_bin COMMENT '测试步骤集',
  `environment` longtext COLLATE utf8_bin,
  `item_sequence` int(13) NOT NULL DEFAULT '0',
  PRIMARY KEY (`test_item_id`),
  KEY `FK_test_item_test_suite` (`suite_id`),
  CONSTRAINT `FK_test_item_test_suite` FOREIGN KEY (`suite_id`) REFERENCES `test_suite` (`test_suite_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='测试项表';

-- 正在导出表  atdpx_db.test_item 的数据：~2 rows (大约)
/*!40000 ALTER TABLE `test_item` DISABLE KEYS */;
INSERT INTO `test_item` (`test_item_id`, `item_name`, `test_item_desc`, `suite_id`, `driver`, `test_step`, `environment`, `item_sequence`) VALUES
	(1, 'XX平台登录', '用于测试XX平台登录功能的测试项', 1, 'InterFaceDiver', '[]', '"\\"\\\\\\"\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"null\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\"\\\\\\"\\""', 105),
	(11, ' 正常登录测试', '用于测试用户名密码正确时，登录接口的响应结果', 2, 'InterFaceDriver', '[]', '"{}"', 105);
/*!40000 ALTER TABLE `test_item` ENABLE KEYS */;


-- 导出  表 atdpx_db.test_step 结构
CREATE TABLE IF NOT EXISTS `test_step` (
  `data_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '测试数据ID',
  `data_desc` text COLLATE utf8_bin COMMENT '数据描述',
  `data` longtext COLLATE utf8_bin,
  `expect_data` longtext COLLATE utf8_bin,
  `type` varchar(50) COLLATE utf8_bin NOT NULL,
  `item_id` int(11) NOT NULL,
  `result_log` longtext COLLATE utf8_bin NOT NULL,
  `step_sequence` int(13) unsigned zerofill NOT NULL,
  PRIMARY KEY (`data_id`),
  KEY `FK_test_data_test_item` (`item_id`),
  CONSTRAINT `FK_test_data_test_item` FOREIGN KEY (`item_id`) REFERENCES `test_item` (`test_item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='测试步骤表';

-- 正在导出表  atdpx_db.test_step 的数据：~6 rows (大约)
/*!40000 ALTER TABLE `test_step` DISABLE KEYS */;
INSERT INTO `test_step` (`data_id`, `data_desc`, `data`, `expect_data`, `type`, `item_id`, `result_log`, `step_sequence`) VALUES
	(1, '测试数据1', '{"aa":1}', 'null', 'Util_AddMysqlData', 1, '', 0000000000105),
	(2, '测试数据2', 'null', 'null', 'Util_RemoveData', 1, '', 0000000000205),
	(4, '测试数据3', 'null', 'null', 'Test_Login', 1, '', 0000000000305),
	(5, '测试数据4', 'null', 'null', 'Test_UserQuery', 1, '', 0000000000405),
	(12, '登录数据构建', '\n{"table":"user_info","data":{"username":"wangsan","password":"123456"}}', '{}', 'Util_AddMysqlData', 11, '', 0000000000105),
	(13, '测试登录接口', '{"param":{"username":"wangjun","password":"123456"}}', '{}', 'Test_Login', 11, '', 0000000000205),
	(14, '排序测试', 'null', 'null', 'Selected', 1, '', 0000000000204);
/*!40000 ALTER TABLE `test_step` ENABLE KEYS */;


-- 导出  表 atdpx_db.test_suite 结构
CREATE TABLE IF NOT EXISTS `test_suite` (
  `test_suite_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '测试集合ID',
  `test_suite_name` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '测试集合名称',
  `test_suite_describe` text COLLATE utf8_bin COMMENT '测试集合功能',
  `tester` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '测试员',
  `test_item` text COLLATE utf8_bin COMMENT '测试项',
  PRIMARY KEY (`test_suite_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='测试集合表';

-- 正在导出表  atdpx_db.test_suite 的数据：~3 rows (大约)
/*!40000 ALTER TABLE `test_suite` DISABLE KEYS */;
INSERT INTO `test_suite` (`test_suite_id`, `test_suite_name`, `test_suite_describe`, `tester`, `test_item`) VALUES
	(1, 'TestSuite集', '用于测试AtdpX平台对测试用例管理的测试用例集合1', 'wangjun', '[]'),
	(2, 'Atdp登录测试集', '用于测试Atdp测试平台登录测试', 'wangjun', '[]');
/*!40000 ALTER TABLE `test_suite` ENABLE KEYS */;


-- 导出  表 atdpx_db.user_info 结构
CREATE TABLE IF NOT EXISTS `user_info` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `realname` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `age` int(11) DEFAULT '0',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=1014 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户信息表';

-- 正在导出表  atdpx_db.user_info 的数据：~12 rows (大约)
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` (`userid`, `username`, `password`, `realname`, `age`) VALUES
	(1000, 'wangjun', '123456', '王君', 30),
	(1001, 'wangyan', '1234561', '王艳', 30),
	(1002, 'wangyinuo', '123456', '王一诺', 2),
	(1003, 'gaogao', '123456', '高高', 33),
	(1004, 'wangtao', '123456', '王涛', 32),
	(1005, 'wangyi', '2', '王毅', 33),
	(1006, 'wangguang', '3', '王光', 33),
	(1007, 'wangjiayi', '3', '王佳怡', 5),
	(1008, 'wangjun2', '5', '王君2', 30),
	(1009, 'wangyon', '6', '王勇', 40),
	(1010, 'wangyue', '7', '王悦', 40),
	(1013, 'wangbing', '123456', '王兵', 31);
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
