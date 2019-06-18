---
title: 在CentOS7上安装Java8
date: 2019-06-18 17:44:00
categories:
  - 技术篇
tags:
  - Linux
  - CentOS
  - Java
---

## 一、查看可用的 `JDK` 软件包列表
```
$ yum search java | grep -i --color JDK
```

## 二、安装 `JAVA SDK`
```
$ yum install java-1.8.0-openjdk java-1.8.0-openjdk-devel -y
```

## 三、配置环境变量
### 3.1. 查看jdk版本
```
$ ls /usr/lib/jvm/
```
记录下类似 `java-1.8.0-openjdk-1.8.0.212.b04-0.el7_6.x86_64` 这样的目录名，设置 `JAVA_HOME` 时用。

### 3.2. 修改配置文件
```
$ vim /etc/profile
```

将下面三行添加到 `/etc/profile` 末尾后保存退出
```
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.212.b04-0.el7_6.x86_64
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$PATH:$JAVA_HOME/bin
```

### 3.3. 刷新配置文件
```
$ source /etc/profile
```



