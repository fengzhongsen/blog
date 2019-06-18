---
title: 【Android系统源代码分析】第一章 Android系统介绍
date: 2016-01-25 12:00:00
categories:
  - 技术篇
tags:
  - 读书笔记
  - Android
---

## 一、智能手机的特点
1. 具备普通手机的全部功能，例如可使用户进行正常的通话和发短信等手机应用。
2. 是一个开放性的手机系统，在系统平台上可安装更多的应用程序，从而实现功能的无限扩充。
3. 具备上网功能。
4. 具备PDA功能，可实现个人信息管理、任务安排、多媒体应用、浏览网页。
5. 可根据个人的需要扩展设备的功能。
6. 扩展性能强，并且可支持更多第三方软件。

## 二、多种智能系统
1. 微软的 Windows Mobile
2. 塞班系统 Symbian
3. Palm
4. 黑莓 BlackBerry
5. iPhone
6. Android

## 三、Android 系统架构
1. 操作系统层（OS）——最底层
2. 各种库（Libraries）和 Android 运行环境（RunTIme）
3. 应用程序框架（Application Framework）
4. 应该程序（Application）

## 四、Android 应用程序的五大组件
一个典型的 Android 应用程序通常由五个组件组成，这五个组件构成了 Android 的核心功能。

1. 用 Activity 来表现界面
2. 用 Intent 和 Intent Filters 实现切换
3. Service 服务
4. 用 Broadcast Intent Receive 发送广播
5. 用 Content Provider 存储数据

## 五、线程
线程是通过 Java 的标准对象 Thread 来创建的，在 Android 中提供了如下方便地管理线程的方法。

1. Looper 在线程中运行一个消息循环。
2. Handler 传递一个消息。
3. HandlerThread 创一个带有消息循环的线程。
4. Android 让一个应用程序在单独的线程中，指导它创建自己的线程。
5. 应用程序组件（Activity、Service、Broadcast Recover）都在理想的主线程中实例化。
6. 没有一个组件应该执行长时间或阻塞的操作（例如网络呼叫或计算循环），当被系统调用时，这将中断所有在该进程的其他组件。
7. 可以创建一个新的线程来执行长期操作。

## 六、分析 Android 源码结构
获得 Android 源码后，可将源码的全部工程分为如下三个部分。

* Core Project：核心工程部分，这是建立Android系统的基础，保存在根目录的各个文件夹中。
* External Project：扩展工程部分，可使其他开源项目具有扩展功能，保存在external文件夹中。
* Package：包部分，提供Android的应用程序、内容提供者、输入法和服务，保存在package文件夹中。

在源代码目录中包含了原始Android的目标机代码、主机编译工具和仿真环境。