---
title: JavaScript初级概论
date: 2017-12-04 15:29:32
categories:
  - 技术篇
tags:
  - 前端
  - JavaScript
---
:::tip
这篇博客旨在告诉**初级前端工程师**需要掌握的知识范围，但是不包括基础语法。
:::

## 二、JavaScript基础

### 2.1 对变量提升的理解
变量定义和函数声明会被提升到当前作用域的顶部

### 2.2 this的应用场景
  1. 作为构造函数执行
  2. 作为对象属性执行
  3. 作为普通函数执行
  4. `call`、`apply`、`bind`

### 2.3 如何理解作用域
  1. 自由变量
  2. 作用域链，及自由变量的查找
  3. 闭包的两个应用场景：参数作为返回值、函数作为参数传递

### 2.4 如何理解闭包
主要用于封装变量、收敛权限

### 2.5 同步和异步有什么区别
同步会阻塞代码执行，而异步不会。alert是同步，setTimeout是异步。

### 2.6 前端使用异步的场景
  1. 定时任务：setTimeout、setInterval
  2. 网络请求：ajax请求、动态`<img>`加载
  3. 事件绑定

## 三、Web-API

### 3.1 W3C标准中关于JavaScript的规定
  1. DOM操作
  2. BOM操作
  3. 事件绑定
  4. ajax请求（包括http协议）
  5. 存储

### 3.2 DOM（Document Object Model）
  1. 本质：为浏览器把HTML代码结构化成浏览器可识别并且js可操作的一个模型。
  2. 基本数据结构：树
  3. 常用API：1、获取DOM节点，以及节点的property和Attribute，2、获取父节点、获取子节点，3、新增节点、删除节点
  4. Attribute是HTML标签的属性，property是js对象的属性

### 3.3 BOM（Browser Object Model）
  1. navigator：检测浏览器类型 navigator.userAgent
  2. screen：screen.width  、screen.height
  3. location：herf、protocol（http:  、 https:）、host、pathname、search、hash
  4. history：history.back() 、 history.forward()

### 3.4 事件
  1. 通用的事件监听函数
  ```js
  function bindEvent(elem, type, selector, fn) {
      if(fn == null) {
          fn = selector
          selector = null
      }
      elem.addEventListener(type, function(e) {
          var target
          if(selector) {
              target = e.target
              if(target.matches(selector)) {
                  fn.call(target, e)
              }
          } else {
              fn(e)
          }
      })
  }
  ```
  2. 事件冒泡流程：DOM树形结构、时间冒泡、阻止冒泡、冒泡应用
  3. 事件代理：代码简洁、渲染压力小

### 3.5 Ajax
  1. 手动编写ajax请求，不依赖第三方库
  ```js
  var xhr = new XMLHttpRequest()
  xhr.open("GET", "/api", false)
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
          if(xhr.status == 200) {
              alert(xhr.responseText)
          }
      }
  }
  xhr.send(null)
  ```

  2. XMLHttpRequest的状态码说明
  ```
  readyState:
    0 - （未初始化）还没调用send()方法
    1 - （载入）已调用send()方法，正在发送请求
    3 - （载入完成）send()方法执行完成，已经接收到全部响应内容
    4 - （交互）正在解析响应内容
    5 - （完成）响应内容解析完成，可以在客户端调用了

  status:
    2xx - 表示成功处理请求
    3xx - 需要重定向，浏览器直接跳转
    4xx - 客户端请求错误
    5xx - 服务器端错误
  ```

### 3.6 跨域
  1. 跨域概念：1、浏览器有同源策略，不允许Ajax访问其他域接口。2、协议、域名、端口，有一个不同就算跨域。
  2. 可以跨域的三个标签：`<img src=xxx>` 、`<link herf=xxx>`、`<script src=xxx>`
  3. 跨域的几种实现方式：JSONP、服务器端设置http header

### 3.7 存储
  1. cookie概念：(1)本身用于客户端和服务器端通信，但它有本地存储的功能，所以被借用; (2)使用document.cookie = ... 获取和修改。
  2. cookie特点：(1)存储量小，只有4kb; (2)所有http请求都会携带cookie，会影响获取资源的效率; (3)需要封装才能使用
  3. `localStorage`和`sessionStorage`：HTML5专门为存储而设计，最大容量为5M，API简单易用，`localStorage.setItem(key, value)`  ， `localStorage.getItem(key)`
  ::: warning
  IOS safari 隐藏模式下 `localStorage.getItem`会报错，建议使用`try-catch`封装
  :::

## 四、开发环境
  1. AMD：require.js、全局define函数、全局require函数、依赖的js自动异步加载
  2. CommonJS：nodejs模块化规范，现在被大量使用，原因：1、前端开发依赖的插件和库都可以从npm中获取，2、构建工具的高度自动化，使得使用npm的成本非常低，3、CommonJS不会异步加载js，而是同步一次性加载出来
  3. AMD和CommonJS的应用场景：需要异步加载js使用AMD，使用了npm之后使用CommonJS
  4. 上线流程：1、将测试完成的代码体骄傲到git版本库的master分支，2、将当前服务器的代码全部打包并记录版本号，备份，3、将master分支的代码提交覆盖到线上服务器，生成新版本号
  5. 回滚流程：1、将当前服务器的代码打包并记录版本号，备份，2、将备份的上一个版本号解压，覆盖到线上服务器，并生成新的版本号

## 五、运行环境
### 5.1 加载资源的形式
  1. 输入url（或跳转页面）加载html
  2. 加载html中的静态资源

### 5.2 加载资源的过程
  1. 浏览器根据DNS服务器得到域名的IP地址
  2. 向这个IP的机器发送http请求
  3. 服务器收到、处理并返回http请求
  4. 浏览器得到返回内容
  
### 5.3 浏览器渲染页面的过程
  1. 根据 HTML 结构生成 DOMTree
  2. 根据 CSS 生成 CSSOM
  3. 将 DOM 和 CSSOM 整合形成 RenderTree
  4. 根据 RenderTree 开始渲染和展开
  5. 遇到`<script>`时会执行并阻塞渲染
  
### 5.4 `window.onload`和`DOMContentLoaded`的区别
  1. `window.onload`只有全部资源加载完（包括图片、视频等异步资源）才会执行
  2. `DOMContentLoaded`是再 DOM 渲染完（图片、视频可能还没加载完）就执行

### 5.5 性能优化
#### 5.5.1 性能优化原则
  1. 多使用内存、缓存
  2. 减少CPU计算、减少网络请求

#### 5.5.2 性能优化方法
  1. 加载资源优化（a、静态资源压缩合并，b、静态资源缓存，c、使用CDN让资源加载更快，d、使用SSR后端渲染，让数据直接输出到HTML中）
  2. 渲染优化（a、CSS放前面、JS放后面，b、懒加载，c、缓存查询，即减少DOM查询，对DOM查询做缓存，d、合并插入，即减少DOM操作，多个操作尽量放一起执行，e、事件节流，d、尽早执行操作，如DOMContentLoaded）













