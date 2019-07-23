---
title: 【数据库】Windows 安装 MySQL8.0.11
date: 2018.06.14 12:00:00
categories:
  - 技术篇
tags:
  - 数据库
  - MySQL
---

1. 下载解压版解压到  `D:\Develop\Mysql`
2. 在 `D:\Develop\Mysql\mysql-8.0.16-winx64` 中创建一个文件 `my.ini`，并在文件中键入以下内容
```shell
[mysqld]
# 设置3306端口
port=3306
# 设置mysql的安装目录
basedir=D:\Develop\Mysql\mysql-8.0.16-winx64
# 设置mysql数据库的数据的存放目录
datadir=D:\Develop\Mysql\mysql-8.0.16-winx64\data
# 允许最大连接数
max_connections=200
# 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10
# 服务端使用的字符集默认为utf8mb4
character-set-server=utf8mb4
#使用–skip-external-locking MySQL选项以避免外部锁定。该选项默认开启
external-locking = FALSE
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB 
# 默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password

[mysqld_safe]
log-error=D:\programs\MySQL\mysql_oldboy.err
pid-file=D:\programs\MySQL\mysqld.pid
# 定义mysql应该支持的sql语法，数据校验
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8mb4
[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=utf8mb4
```

3. 配置环境变量
path 下配置 D:\Develop\Mysql\mysql-8.0.16-winx64\bin

4. 初始化数据库
以管理员身份运行cmd, 执行如下命令：
```shell
mysqld --initialize --console
```

执行完成后，会打印 root 用户的初始默认密码，比如：
```shell
A temporary password is generated for root@localhost: APWCY5ws&hjQ
```

5. 安装数据库服务
以管理员身份运行 `cmd`, 执行如下命令：
```shell
# 服务名缺省值为 mysql 
mysqld --install [服务名]
```

6. 启动 mysql 数据库服务
```shell
net start [服务名]
```

7. 修改初始化密码
```shell
# 登录
mysql -uroot -p 初始化密码
# 修改密码
alter user 'root'@'localhost' identified by 'xxxxx';
```

8. 补充
```shell
# 停止服务
net stop mysql
# 卸载服务
mysqld -remove
```