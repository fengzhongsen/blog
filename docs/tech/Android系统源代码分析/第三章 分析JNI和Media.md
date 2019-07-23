---
title: 【Android系统源代码分析】第三章 分析JNI和Media
date: 2016.01.27 12:00:00
categories:
  - 技术篇
tags:
  - 读书笔记
  - Android
---

## 一、JNI基础
1. JNI 是 Java Native Interface 的缩写，译为 Java 本地接口。
2. JNI 中的各个文件，实际上是普通的C++源文件。
3. 在 Android 中实现的 JNI库，需要连接动态库libnativehelper.so。
4. Android平台本质上是由arm-linux操作系统和dalvik组成的。所有在Android模拟器上看到的那些华丽的界面都是用Java编写的。dalvik只是提供了一个标准的支持JNI调用的Java虚拟机环境。Android平台中所有的与硬件相关的操作均是采用JNI技术进行了封装，由Java去调用JNI模块，而JNI模块使用C/C++调用Android本身的arm-linux底层驱动。

## 二、分析Java层
### 2.1 JNI调用层次
<p class="paragraph">JNI调用层次主要分为三层，在Android系统中这三层从上到下依次是：Java——JNI——C/C++（SO库），Java可以访问C/C++中的方法，同样C/C++可以修改Java对象。</p>

以MediaScanner为实例，则调用关系如下：
```java
MediaScanner——libmedia_jni.so——libmedia.so
```

### 2.2 JNI中的异常处理
JNI提供了一套异常处理机制函数集来检查、分析和处理异常情况，例如在”jni.h“中，定义了主要的异常函数，具体代码如下：
```java
//抛出异常
jint  (*Throw) (JNIEnv *, jthrowable);
//抛出新的异常
jint  (*ThrowNew) (JNIEnv *, jclass, const char *);
//异常产生
jthrowable  (*ExceptionOccurred) (JNIEnv *);
void  (*ExceptionDescribe) (JNIEnv *);
//清楚异常
void  (*ExceptionClear) (JNIEnv *);
void  (*FatalError) (JNIEnv *,const char *);
```