---
title: 【Android系统源代码分析】第三章 分析JNI和Media
date: 2016.01.28 12:00:00
categories:
  - 技术篇
tags:
  - 读书笔记
  - Android
---

## 一、init基础
1. init是一个命令行程序，其主要工作之一就是建立与内核空间交互的文件所在的目录。当LInux内核加载完成后，要做的第一件事就是调用init程序，也就是说init是用户控件执行的第一个程序。
2. init除了建立一些目录外，还需要做如下工作：

* 初始化属性
* 处理配置文件的命令（主要是init.rc文件），包括处理各种action
* 性能分析（使用bootchart工具）
* 无限循环执行command（启动其他程序）

## 二、分析入口函数
1. 进程init入口函数是main
2. 使用for循环无限循环建立子进程

## 三、分析配置文件
### 3.1 init.rc简介
<p class="paragraph">在init进程中，配置文件是指文件“init.rc”。该文件中包含4种状态类别，分别是Action、Command、Service和Option，当声明一个Service或者Action时，它将隐式声明一个section，之后跟随的Service或者Option都将属于这个section。另外，Action和Service不能重名，否则忽略为error。</p>

### 3.2 分析init过程
1. 在for循环中对文件“init.rc”解析，并一行一行进行读取。
2. 每读取完一行内容换行到下一行时，使用函数lookup_keyword分析已经读取的一行的第一个参数。
3. 在“keywords.h”中定义了init使用的关键字、定义了如do_class_start、do_class_stop之类的函数、定义了枚举。