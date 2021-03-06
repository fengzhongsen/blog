---
title: 【Android系统源代码分析】第十章 分析WindowManagerService
date: 2016.02.03 12:00:00
categories:
  - 技术篇
tags:
  - 读书笔记
  - Android
---

## 一、WindowManagerService概述
1. 在Android系统中，同一时刻只有一个Activity窗口是激活的但是对于WindowManagerService服务来说，这并不是说它每次只需要管理一个Activity窗口。例如在两个Activity窗口切换过程中，前后两个Activity窗口实际都是可见的。即使只有一个Activity窗口可见，WindowManagerService服务仍然需要同时管理多个窗口 ，这是因为可见的Activity窗口可能还会背设置为如下窗口：

	* 壁纸窗口（Wallpaper Window）
	* 子窗口（Sub Window）
	* 状态栏（Status Bar）
	* 输入法窗口（Input Method Window）

## 二、分析计算Activity窗口大小的过程
1. 在Android系统中，Activity窗口大小是由WindowManagerService计算的。WindowManagerService会根据屏幕及其装饰区大小来决定Activity窗口的大小。一个Activity窗口只有知道自己的大小之后，才能对它里面的UI元素进行测量、布局及绘制。
2. Android应用程序进程是从类ViewRoot的成员函数performTraversals开始，向WindowManagerService服务请求计算一个Activity窗口的大小的。

## 三、分析WindowManagerService对窗口的组织方式
1. 应用程序中的每一个Activity组件在ActivityManagerService中都对应有一个ActivityRecord对象。ActivityManagerService中每一个ActivityRecord对象在WindowManagerService中都对应有一个AppWindowToken对象。
2. 在InputMethodManagerService中，每一个输入法窗口都对应一个Binder对象，该Binder对象在WindowManagerService中又对应有一个WindowToken对象。
3. 在Wallpaper ManagerService中，每一个壁纸窗口都对应一个Binder对象，该Binder对象在WindowManagerService中又对应有一个WindowToken对象。
4. WindowManagerService服务维护一个AppWindowToken堆栈和一个WindowState堆栈，它们与ActivityManagerService服务维护的Activity堆栈是有关相同的Z轴位置关系的。
5. ActivityManagerService服务中的每一个ActivityRecord对象在WindowManagerService服务中都对应有一个AppWindowToken对象，而WindowManagerService服务中的每一个AppWindowToken对象都对应有一组WindowState对象。
6. 在WindowState堆栈中，AppWindowToken堆栈中的第i+1个AppWindowToken对象所对应的WindowState对象都位于第i个AppWindowToken对象所对应的WindowState对象的上面。