---
title: CSS 盒模型
date: 2021.03.01 20:00:00
categories:
  - 前端
tags:
  - CSS
---

<img src="https://cdn.fblog.top/blog/images/css/box.png">

## 一、组成

由外向内依次是：

1. Margin(外边距) - 清除边框外的区域，外边距是透明的。
2. Border(边框) - 围绕在内边距和内容外的边框。
3. Padding(内边距) - 清除内容周围的区域，内边距是透明的。
4. Content(内容) - 盒子的内容，显示文本和图像。

## 二、分类

#### 标准盒模型

width/height 指 content 的宽/高。

#### 怪异盒模型（存在于IE9以前的版本）

width/height 指 content 的宽/高 + padding + border 的和。

## 三、模式切换

```css
box-sizing: content-box; /* 标准盒模型 */
box-sizing: border-box; /* IE盒模型 */
```

## 四、参考
1. [CSS 基础框盒模型介绍](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)
2. [box-sizing](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)
3. [css的两种盒模型](https://blog.csdn.net/zwkkkk1/article/details/79678177)