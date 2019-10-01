---
title: 【Android系统源代码分析】第六章 分析 Android 的内存机制
date: 2016.01.30 12:00:00
categories:
  - 技术篇
tags:
  - 读书笔记
  - Android
---

## 一、内存与进程的关系
1. 在Android中进程和程序是两回事。程序可以一直保留在系统里，但是没有任何进程在后台“运行”，不会消耗任何系统资源，而且有助于更快的再次启动程序并回到之前的状态。当内存用完了，系统会自动关闭不用的任务。
2. 在Android中，RAM被用满时间“好”事。当用户发现RAM占满了就会认为这导致手机变慢，实际使手机变慢的是CPU，而不是RAM。所以市场上的进程管理工具好多都是起到了相反的作用。
3. 当系统变慢是可以手动关闭一些进程，但是没必要经常关闭所有进程，可以完全交给系统自行处理，这是Android的一个优势。
4. Android的应用切换到后台是，起就会被暂停，所以不会消耗系统资源。但是像音乐播放器这样的程序是通过另外开启了一个新的服务，所以在后台消耗资源的只有带服务的应用。
5. 用户不应该受Windows系统的影响而去保持Android系统的空余内存，因为Android系统不需要空余内存，反而内存被占满了是“好”事。

## 二、分析Android的进程通信机制
1. 在AT&T的Unix系统V中，除了传统的管道（Pipe）、信号（Signal）和跟踪（Trace）这三项局限于父子进程和兄弟进程的通信手段外，又增加了被称为“System V IPC”的报文队列（Message）、共享内存（Share Memory）和信号量（Semaphone）三种。后来再次扩充，增加了一种称为插口（Socket）的进程间通信机制。
2. Android的进程通信机制是Binder机制。该机制由系统组件组成，分别是Client、Service、Service Manager和Binder Driver，且Binder Driver 是核心组件。其关系具体说明如下：
    （1）Client、Service、Service Manager 运行在用户空间中，Biner Driver运行在内核空间。
    （2）Service Manager和Binder Driver在Android中已经实现，开发者只要在用户空间实现自己的Client和Service。
    （3）Binder Driver提供设备文件“/dev/binder”与用户空间交互，Client、Service、Service Manager通过文件操作函数open()和ioctl()与Binder Driver进行通信。
    （4）Client和Service之间的进程间通信通过Binder Driver间接实现。
    （5）Service Manager是一个守护进程，用来管理Service，并向Client提供查询Service接口的能力。

## 三、分析Android系统匿名共享内存C++调用接口
1. 在Android系统中，提供了独特的匿名共享内存子系统Ashmem（Anonymous Share Memory），它以驱动程序的形式实施在内核空间中。Ashmem有如下两个特点：

* 能够辅助内存管理系统有效管理不再使用的内存块。
* 通过Binder进程间通信机制来实现进程间的内存共享。

2. 应用程序框架层的Java调用接口是通过JNI方法调用系统运行时库层的C/C++调用接口，最后进入内核空间的Ashmem驱动层序中。


## 四、内存优化
1. 在Android系统中，使用垃圾回收机制的方式达到节约内存的目的，并最终实现提高手机的处理效率的目的。
2. 在Android系统中，sp（strong pointer）和wp（weak pointer）称为智能指针（android refbase类），具体到内部实施，sp和wp是实现垃圾回收功能的接口。
3. 新建出来一个CameraHal对象，赋值给sp`<CameraHardwareInterface>`时，它的强引用计数就会从0变为1.因此每次将对象赋值给一个sp指针时，对象的强引用计数都会加1；每删除一个sp对象时，sp指针指向的对象的强引用计数就会减1，当对象的强引用计数为0时，这个对象就会被自动释放掉。
4. wp和sp一样，对象本身会增加一个对自身的弱引用计数，同时wp还包含了一个m_ref指针，这个指针主要在将wp升级为sp时使用。
5. 在C++编程中，有两个难题，一是忘记释放动态申请的对象从而造成内存泄露，二是对象在一个地方释放后又在别的地方被使用而引起内存访问错误。使用智能指针后，动态申请的内存会被自动释放，同时解决了上述两个问题，即减少了程序编写工作，也大大提高了程序的稳定性。

