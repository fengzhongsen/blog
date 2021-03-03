---
title: CSS 块格式化上下文 BFC
date: 2021.03.05 20:00:00
categories:
  - 前端
tags:
  - CSS
---

## 一、概念

1. MDN概念：块格式化上下文（Block Formatting Context，BFC）是Web页面的可视CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。
2. 说人话就是：块格式化上下文，CSS渲染规则的一部分，具有BFC特性的块盒子可以看做是独立的容器，其内部元素布局不受外部影响，同时浮动元素与其他元素有特别的作用规则。

## 三、触发条件

html标签或者设置了一下任一属性的其他元素将具备BFC特性。

```html
<!--1. 根元素-->
<html>
<head>
  <style>
    div {
      /* 2. float 不是 none */
      float: left;

      /* 3. overflow 不是 visible */
      overflow: auto;

      /* 4. 绝对定位 */
      position: absolute;
      position: fixed;

      /* 5. display */
      display: flow-root;
      display: inline-block;
      display: flex;
      display: inline-flex;
      display: grid;
      display: inline-grid;
      display: table;
      display: inline-table;
      display: table-row;
      display: table-row-group;
      display: table-header-group;
      display: table-footer-group;

      /* 6. 多列容器 */
      /* column-width 或者 column-count 不是 auto */
      column-width: 12em;
      column-count: 1;
      /* column-span 为 all 始终会创建一个新的BFC */
      column-span: all;
    }
  </style>
</head>
</html>
```

## 二、特性及应用

### 2.1 同一BFC区域内垂直方向上两个相邻元素外边距发生重叠（边距塌陷问题）

::: tip
相邻元素包括“兄弟元素”和“父子元素”<br/>
解决同一BFC区域内相邻元素外边距重叠的问题的原则就是使它们分别处在两个不同的BFC中<br/>
:::

```html
<html>
  <head>
    <style>
      .box {
        width: 300px;
        background-color: cadetblue;
      }
      .cont {
          width: 100px;
          height: 100px;
          background: lightblue;
          margin: 100px;
      }
      .bfc {
        display: flow-root;
      }
    </style>
  </head>
  <body>
    <section class="box">
      <div class="cont">1</div>
      <div class="cont">2</div>
    </section>
  </body>
</html>
```

<div style="display: flex;">
  <img src="https://cdn.fblog.top/blog/images/css/bfc-0.1.png"/>
  <img src="https://cdn.fblog.top/blog/images/css/bfc-0.2.png"/>
</div>

看代码，看左图，发现两个问题
1. 问题一：垂直方向上两个相邻div相距100px
2. 问题二：section随着第一个div向下移动了100px

#### 解决问题一

方案一：第一个元素设置BFC特性

```html
<section class="box">
  <div class="bfc">
    <div class="cont">1.1.1</div>
  </div>
  <div class="cont">1.1.2</div>
</section>
```

方案二：第二个元素设置BFC特性

```html
<section class="box">
  <div class="cont">1.2.1</div>
  <div class="bfc">
    <div class="cont">1.2.2</div>
  </div>
</section>
```

方案三：两个元素都设置BFC特性

```html
<section class="box" title="方案3：两个个元素都设置BFC特性">
  <div class="bfc">
    <div class="cont">1.3.1</div>
  </div>
  <div class="bfc">
    <div class="cont">1.3.2</div>
  </div>
</section>
```

效果依次如下

<div style="display: flex;">
  <img src="https://cdn.fblog.top/blog/images/css/bfc-1.1.png"/>
  <img src="https://cdn.fblog.top/blog/images/css/bfc-1.2.png"/>
  <img src="https://cdn.fblog.top/blog/images/css/bfc-1.3.png"/>
</div>

#### 解决问题二

方案一：父元素都设置BFC特性

```html
<section class="box bfc">
  <div class="cont">2.1.1</div>
  <div class="cont">2.1.2</div>
</section>
```

方案二：同问题一的方案一（或者问题一的方案三）

方案三：父元素设置 padding-top

```html
<section class="box" style="padding-top: 1px">
  <div class="cont">2.1.1</div>
  <div class="cont">2.1.2</div>
</section>
```

效果依次如下

<div style="display: flex;">
  <img src="https://cdn.fblog.top/blog/images/css/bfc-2.1.png"/>
  <img src="https://cdn.fblog.top/blog/images/css/bfc-2.2.png"/>
  <img src="https://cdn.fblog.top/blog/images/css/bfc-2.3.png"/>
</div>



### 2.2 BFC在计算高度的时候会把浮动元素计算进去（清除浮动）

```html
<html>
  <head>
    <style>
      .box {
        border: 1px solid #000;
      }
      .cont {
        width: 100px;
        height: 100px;
        background: lightblue;
        float: left;
      }
      .bfc {
        display: flow-root;
      }
    </style>
  </head>
  <body>
    <!-- 容器塌陷 -->
    <section class="box">
      <div class="cont">1</div>
    </section>

    <!-- 元素撑开容器 -->
    <section class="box bfc">
      <div class="cont">2</div>
    </section>
  </body>
</html>
```
<div style="display: flex;">
  <img src="https://cdn.fblog.top/blog/images/css/bfc-3.png"/>
  <img src="https://cdn.fblog.top/blog/images/css/bfc-4.png"/>
</div>

### 3.3 BFC元素和浮动元素不发生重叠

```html
<html>
  <head>
    <style>
      .float-cont {
       height: 100px;
       width: 100px;
       background: lightblue;
       float: left;
      }
      .text-cont {
        width: 200px;
        height: 200px;
        background: #eee;
      }
      .bfc {
        display: flow-root;
      }
    </style>
  </head>
  <body>
    <!-- text-cont 环绕 float-cont -->
    <section>
      <div class="float-cont">1</div>
      <div class="text-cont">2</div>
    </section>

    <!-- text-cont 单独成列 -->
    <section>
      <div class="float-cont">3</div>
      <div class="text-cont bfc">4</div>
    </section>
  </body>
</html>
```
<div style="display: flex;">
  <img src="https://cdn.fblog.top/blog/images/css/bfc-5.png"/>
  <img src="https://cdn.fblog.top/blog/images/css/bfc-6.png"/>
</div>

## 四、参考
1. [块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
2. [10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)