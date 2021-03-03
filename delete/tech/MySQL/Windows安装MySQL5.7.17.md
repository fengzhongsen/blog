---
title: 【数据库】Windows 安装 MySQL5.7.17
date: 2018.06.13 12:59:00
categories:
  - 技术篇
tags:
  - 数据库
  - MySQL
---

1. 下载解压版解压到  `D:\MySQL`
2. 在 `D:\MySQL\mysql-5.7.17-winx64` 中 创建 一个文件夹 `data` 和一个文件 `my.ini`，并在文件中键入以下内容
```
[mysqld]
basedir = D:/MySQL/mysql-5.7.17-winx64
datadir = D:/MySQL/mysql-5.7.17-winx64/data
```

3. 以管理员身份运行 `cmd`，进入 `D:\MySQL\mysql-5.7.17-winx64\bin`，执行以下命令：
```
mysqld --initialize-insecure --user=mysql
mysqld -install
net start mysql
```