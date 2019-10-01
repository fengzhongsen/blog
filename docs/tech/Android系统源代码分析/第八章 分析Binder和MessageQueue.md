---
title: 【Android系统源代码分析】第八章 分析Binder和MessageQueue
date: 2016.02.01 12:00:00
categories:
  - 技术篇
tags:
  - 读书笔记
  - Android
---

## 一、分析Binder
1. 在Android系统中，Client、Server、ServiceManager三者之间的交互关系如下：

	* Server进程要先注册一些Service到ServiceManager中，所以Server是ServiceManager的客户端，而ServiceManager就是服务端。
	* 如果某个Client进程要使用某个Service，必须先到ServiceManager中获取该Service的相关信息，所以Client是ServiceManager的客户端。
	* Client根据得到的Service信息与Service所在的Server进程建立通信的通路，然后就可以直接与Service交互，所以Client也是Server的客户端。

2. ServiceManager能集中管理系统内的所有服务，他能施加权限控制，并不是任何进程都能注册服务。ServiceManager支持通过字符串名称来查找对应的Service，Client只需要查询ServiceManager，就可以把握Server进程动向，得到最新消息。这正是ServiceManager存在的最大意义。

## 二、初始化Java层Binder框架
1. 在Android系统中，在Java初创时期，系统会提前注册一些JNI函数，其中只有一个函数专门负责搭建Java Binder和Native Binder的交互关系，该函数是register_android_os_Binder。
2. 函数int_register_android_os_Binder实现了Binder类的初始化工作；函数int_register_android_os_BinderProxy完成了类BinderProxy的初始化工作，还获取了WeakReference类和Error类的一些信息。
3. 整个Android系统中有一个Native的ServiceManager（简称SM）进程，它统筹管理Android系统中的所有Service。成为一个Service的必要条件是在SM中注册。
4. JavaBBinder仅是一个传声筒，它本身不实现任何业务函数，其工作流程如下：

	* 当它收到请求时，只是简单地调用它所绑定的Java层Binder对象的execTransact。
	* 该Binder对象的execTransact调用其子类实现的onTransact函数。
	* 子类的onTransact函数将业务又派发给其子类来完成。

## 三、分析MessageQueue
<p class="paragraph">类MessageQueue封装了与消息队列有关的操作，在一个以消息驱动的系统中，最重要的两部分就是消息队列和信息处理循环。</p>
