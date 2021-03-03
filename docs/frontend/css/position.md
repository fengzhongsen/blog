---
title: CSS 定位属性 position
date: 2021.03.04 20:00:00
categories:
  - 前端
tags:
  - CSS
---

## position: static

默认值。元素出现在正常的流中，此时 top, right, bottom, left 和 z-index 属性无效。

## position: relative

该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。position:relative 对 table-*-group, table-row, table-column, table-cell, table-caption 元素无效。

## position: absolute

元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。

## position: fixed

元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。

## position: sticky

元素根据正常文档流进行定位，然后相对它的最近滚动祖先（nearest scrolling ancestor）和 containing block (最近块级祖先 nearest block-level ancestor)，包括table-related元素，基于top, right, bottom, 和 left的值进行偏移。偏移值不会影响任何其他元素的位置。

## position: inherit

从父元素继承 position 属性的值。

## 参考
1. [position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)
2. [CSS position(定位)属性](https://www.cnblogs.com/guolao/p/9048308.html)