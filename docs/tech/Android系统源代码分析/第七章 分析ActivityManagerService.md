---
title: 【Android系统源代码分析】第七章 分析ActivityManagerService
date: 2016-01-31 12:00:00
categories:
  - 技术篇
tags:
  - 读书笔记
  - Android
---

## 一、AMS基础
1. AMS的主要功能：统一调度各应用程序的Activity、内存管理、进程管理。
2. 在AMS中使用HistoryRecord数据类来保存每个Activity的信息，Activity本身用HistoryRecord来保存Activity的信息，而不直接使用Activity的原因是Activity为具体的功能类。HistoryRecord也是一个Binder，基于IApplicationToken.Stub类，因此可以被IPC调用，一般在WmS中进行该对象的IPC调用。
3. 在AMS中，使用任务的概念确保Activity启动和退出的顺序。

## 二、Activity的调度
1. 在Android系统中，Activity的调度机制如下：

    * 各应用进程要启动新的Activity或者停驶当前的Activity，都要首先报告给AMS，AMS在内部为所有的应用进程都做了记录。
    * 当AMS接到启动或者停止报告时，首先更新内部记录，然后再通知相应客户进程运行或者停止指定的Activity。由于AMS内部有所有的Activity的记录，也就理所当然地能够调度这些Activity，并根据Activity和系统内存的状态自动结束后台的Activity。

2. 在Android系统中，有如下4种启动Activity的方式：

    * 在应用程序中调用startActivity()启动指定的Activity
    * 在Home程序中单击一个应用图标，启动新的Activity
    * 按Back键，结束当前Activity，自动启动上一个Activity
    * 长按Home键，显示出当前任务列表，从中选择一个启动