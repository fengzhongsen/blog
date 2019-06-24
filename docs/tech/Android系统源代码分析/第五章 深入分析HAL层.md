---
title: 【Android系统源代码分析】第五章 深入分析HAL层
date: 2016-01-29 12:00:00
categories:
  - 技术篇
tags:
  - 读书笔记
  - Android
---

## 一、初识HAL层
1. HAL层（硬件抽象层）是位于操作系统内核与硬件之间的接口层，其目的在于将硬件抽象化。它隐藏了特定平台的硬件接口细节，为操作系统提供虚拟硬件平台，使其具有硬件无关性，这样就可以在多种平台上进行移植。从软件测试角度看，软硬件的测试工作都可分别基于硬件的抽象层来完成，从此是软硬件测试工作的并行进行成为可能。
2. 提供硬件抽象层，Android系统分两层来支持硬件设备，其中一层实现在用户空间中，另一层是现在内核空间中。这样做是为了保护移动设备厂商的利益。
3. HAL的功能是将Android Framework与Linux Kernel 隔离，这样做的目的是让Android不过度依赖Linux Kernel，从儿让Android Framework开发可以在不考虑驱动程序的前提下进行。在HAL层主要包含了GPS、Vibrator、Wi-Fi、Copybit、Audio、Camera、Lights、Ril、Overlay等模块。
4. Android硬件抽象层可以分为如下6中HAL：

* 上层软件
* 内部以太网
* 内部通信CLIENT
* 用户接入口
* 虚拟驱动，设置管理模块
* 内部通信SERBER

## 二、分析HAL层源码
HAL module主要分为如下三个结构体，这三个抽象概念在文件hardware.c 中进行了具体描述：

* struct hw_module_t
* struct hw_module_methods_t
* struct hw_device_t

### 2.1 文件hardware.c

1. 函数hw_get_module()<br>
该函数能够根据模块ID寻找模块动态链接库的地址，然后调研load打开动态链接库，并从中获取硬件模块结构体地址。
2. 数组variant_keys<br>
在函数hw_get_module()中需要用到该数组
3. 将路径和文件名保存到path
4. 载入相应的库，并将它们的HML保存到module中
5. 打开相应的库并获得hw_module_t结构体

## 三、硬件访问服务
1. 开发硬件抽象层模块完成后，通常还需要在应用程序框架中实现一个硬件访问服务。
2. 硬件访问服务使用C++语言开发的，硬件访问服务使用Java语言开发的，因此硬件访问必须通过JNI来调用硬件抽象成模块的接口。
3. Android系统提供了一种描述语言来定义具有跨进程访问能力的服务接口，这种描述语言称为Android接口描述语言（Android Interface Definition Language，AIDL）。