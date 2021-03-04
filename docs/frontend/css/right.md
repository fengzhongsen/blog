---
title: CSS 权重
date: 2021.03.02 22:00:00
categories:
  - 前端
tags:
  - CSS
---

## 一、概念

::: tip
每一类选择器都有自己的权重值，我们通常理解为优先级。权重值越高，则优先级越大。<br/>
CSS规则权重就是CSS规则中的选择器的权重相加得到的。<br/>
浏览器通过CSS规则权重比较，来计算出最终的层叠样式，以作用于目标元素。
:::

举个例子

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: blue;
  }

  div {
    background-color: red;
  }
</style>

<section id="root">
  <div class="box"></div>
</section>
```

<img src="https://cdn.fblog.top/blog/images/css/right-1.png"/>

如上图，我们发现：CSS样式最终层叠出了蓝色的背景，我们如何让它呈现红色呢？

## 二、CSS选择器权重

::: tip
我们知道 CSS样式优先级是这样的，即 `!important > 内联样式 > ID > 类、伪类、属性 > 元素、伪元素 > 继承 > 通配符` 。那么他们分别对应的权重值如下表。
:::

| 选择器/关键字                    | 例子                                      | 权重值 |
| -------------------------------- | ----------------------------------------- | ------ |
| `!important` 关键字              | `background-color: red !important;`       | +∞      |
| 内联样式                         | `style="background-color: red;"`          | 1000   |
| ID选择器                         | `#root{}`                                 | 100    |
| 类选择器、伪类选择器、属性选择器 | `.red{}`、`:active{}`、`[title='name']{}` | 10     |
| 标签选择器、伪元素选择器         | `div{}`、`::first-line{}`                 | 1      |
| 通配符、子选择器符、相邻选择器符 | `*{}`、`>`、`+`                           | 0      |

## 三、CSS规则权重计算规则

::: tip
CSS规则权重就是CSS规则中的选择器的权重相加得到的。
:::

```
style=""                    => 1000(行内样式)
#title{}                    => 100(一个ID)
.root                       => 10(一个类)
[title]                     => 10(一个属性)
div                         => 1(一个标签)
*{}                         => 0(通配符)
div span {}                 => 1+1=2(两个标签)
div h1+span {}              => 1+1+1=2(三个标签，一个子选择器符)
div:first-child             => 1+10=11(一个标签，一个伪类)
div [title]                 => 1+10=11(一个标签，一个属性)
body #title .root p {}      => 1+100+10+1=112(两个标签，一个Id，一个类)
```

## 四、总结

回头看第一小节的问题，我们有一千种方式让小方块呈现出红色。其原则就是通过设置更高权重值的CSS规则。

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: blue;
  }

  div {
    background-color: red;
  }
</style>
```
题目中 .box 规则的权重值是 10，div 规则的权重值是 1，所以小方块最终呈现出了蓝色。

1. 通过添加`ID选择器`如下，权重值为 100+1=101

```html
<style>
  #root div {
    background-color: red;
  }
</style>
```

2. 通过添加 `!important`关键字如下，权重值为 1+∞=∞

```html
<style>
  div {
    background-color: red !important;
  }
</style>
```

3. 通过添加 `行内样式` 如下，权重值为 1000

```html
<section id="root">
  <div class="box" style="background-color: red;"></div>
</section>
```

因为如上三种方案的权重值都超过了 .box 规则的权重，所以小方块呈现出了红色。

<img src="https://cdn.fblog.top/blog/images/css/right-2.png"/>

## 五、参考

1.[CSS权重](https://juejin.cn/post/6844903810993750029)