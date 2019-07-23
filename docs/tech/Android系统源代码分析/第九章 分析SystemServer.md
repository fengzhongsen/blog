---
title: 【Android系统源代码分析】第九章 分析SystemServer
date: 2016.02.02 12:00:00
categories:
  - 技术篇
tags:
  - 读书笔记
  - Android
---

## 一、SystemServer
1. SystemServer是Android Java的两大支柱之一，另一个是专门负责孵化Java进程的Zygote。如果这两大支柱中的任何一个崩溃了，都会导致Android中Java层的崩溃。如果Java层崩溃了，则Linux系统中的init会重新启动SystemServer和Zygote，以重新建立Android的Java层。
2. SystemServer是由Zygote孵化而来的一个进程，通过ps命令。
3. 在Android平台中，共有七大类43个Server，这七大类服务主要包括如下内容：

	* 第一大类：是Android的核心服务，如ActivityManagerService、WindowManagerService等。
	* 第二大类：是和通信相关的服务，如Wifi相关服务、Telephone相关服务。
	* 第三大类：是和系统功能相关的服务，如AudioService、MountService、UsbService等。
	* 第四大类：是BatteryService、VibratorService等服务。
	* 第五大类：是EntropyService、DiskStatsService、Watchdog等相对独立的服务。
	* 第六大类：是蓝牙服务。
	* 第七大类：是和UI紧密相关的服务，如状态栏服务、通知管理服务。

## 二、EntropyService
1. EntropyService是SystemServer启动的一个Service，它周期性地加载和保存熵池（/dev/urandom）。但是由于/dev/urandom本身的安全性要比/dev/random相对差些，所以每隔三小时，Android系统在kernel的熵池中增加一些附加信息，这些信息对提高随机数的质量有帮助。
2. 根据物理学基本原理，一个系统的熵越大，该系统就越不稳定。

## 三、DropBoxManagerService
1. 在Android系统中ropBoxManagerService（DBMS）用于生成和管理系统运行时的一些日志文件。这些日志文件大多记录的是系统或者某个应用程序出错时的信息。
2. DBMS运行依赖一些配置项，这些配置项都是通过SettingsProvider操作Setting数据库设置和查询的。

## 四、DeviceStorageManagerService、ClipboardService
1. 在Android4.2版本中，DeviceStorageManagerService（DSMS）用于监测系统内部存储空间的状态。
2. 在Android系统中，ClipboardService（CBS）是元老级服务了，从Android1.0版本起就支持剪贴功能。在Android4.2的源码中，类content.ClipboardManager继承自类text.ClipboardManager。显然早期剪贴功能只支持文本，而目前支持三种类型的数据（Text、Intent、URL列表）。