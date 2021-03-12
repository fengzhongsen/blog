---
title: CSS3 新特性
date: 2021.03.03 20:00:00
sidebar: false
categories:
  - FrontEnd
tags:
  - CSS
---

## 一、选择器

::: tip
CSS3新增了很多选择器，更加方便！
1. 新增 `~` 一般兄弟选择器和伪类。
2. 增加属性选择器。
3. 规定伪元素选择器使用 :: 前缀。
:::

| 选择器               | 例子                  | 例子描述                                                 |
| -------------------- | --------------------- | -------------------------------------------------------- |
| [attribute^=value]   | a[href^="https"]      | 选择其 src 属性值以 "https" 开头的每个 `<a>` 元素。      |
| [attribute$=value]   | a[href$=".pdf"]       | 选择其 src 属性以 ".pdf" 结尾的所有 `<a>` 元素。         |
| [attribute*=value]   | a[href*="w3schools"]  | 选择其 href 属性值中包含 "abc" 子串的每个 `<a>` 元素。   |
| :root                | :root                 | 选择文档的根元素。                                       |
| :nth-child(n)        | p:nth-child(2)        | 选择属于其父元素的第二个子元素的每个 `<p>` 元素。        |
| :nth-last-child(n)   | p:nth-last-child(2)   | 选择属于其父元素的倒数第二个子元素的每个 `<p>` 元素。    |
| :nth-of-type(n)      | p:nth-of-type(2)      | 选择属于其父元素第二个 `<p>` 元素的每个 `<p>` 元素。     |
| :nth-last-of-type(n) | p:nth-last-of-type(2) | 选择属于其父元素倒数第二个 `<p>` 元素的每个 `<p>` 元素。 |
| :last-child          | p:last-child          | 选择属于其父元素最后一个子元素每个 `<p>` 元素。          |
| :first-of-type       | p:first-of-type       | 选择属于其父元素的首个 `<p>` 元素的每个 `<p>` 元素。     |
| :last-of-type        | p:last-of-type        | 选择属于其父元素的最后 `<p>` 元素的每个 `<p>` 元素。     |
| :only-child          | p:only-child          | 选择属于其父元素的唯一子元素的每个 `<p>` 元素。          |
| :only-of-type        | p:only-of-type        | 选择属于其父元素唯一的 `<p>` 元素的每个 `<p>` 元素。     |
| :empty               | p:empty               | 选择没有子元素的每个 `<p>` 元素（包括文本节点）。        |
| :target              | #news:target          | 选择当前活动的 `#news` 元素。                            |
| :disabled            | input:disabled        | 选择每个被禁用的 `<input>` 元素。                        |
| :enabled             | input:enabled         | 选择每个启用的 `<input>` 元素。                          |
| :checked             | input:checked         | 选择每个被选中的 `<input>` 元素。                        |
| :not(selector)       | :not(p)               | 选择非 `<p>` 元素的每个元素。                            |
| element1~element2    | p ~ ul                | 选择前面有 `<p>` 元素的每个 `<ul>` 元素。                |

## 二、属性

```css
/* 边框 */
border-radius
box-shadow
box-image

/* 背景图 */
background-image
background-size
background-origin
background-clip

/* 文本 */
text-shadow
text-overflow
word-wrap
word-break

/* 渐变 */
linear-gradient 
radial-gradient
repeating-linear-gradient
repeating-radial-gradient

/* 窗口 */
resize
box-sizing

/* 转换 */
transform
transform-origin
transform-style
translate
scale

/* 过渡 */
transition



/* 动画 */
animation
animation-duration
animation-timing-function
animation-delay
animation-iteration-count
animation-direction
animation-fill-mode
animation-play-state
animation-name
```

## 三、参考
1. [Selectors Level 3](https://drafts.csswg.org/selectors-3/)
2. [CSS 选择器参考手册](https://www.w3school.com.cn/cssref/css_selectors.asp)
3. [CSS3新特性](https://segmentfault.com/a/1190000010780991)
