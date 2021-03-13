---
title: CSS 权重
date: 2021.03.02 22:00:00
categories:
  - FrontEnd
tags:
  - CSS
---

## 一、概述

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

## 三、CSS选择器权重计算规则

::: tip
CSS选择器权重就是其中所有选择器的权重相加得到的。
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

## 五、纠正错误

::: tip
不知道有没有人有疑问，权重值是在W3C里定义的吗？还是笔者为了理解创造的？那么我们就应该去W3C光访问当查一下，发现真的没有定义，是胡编乱造的。其实权重比较也不是上一节中说的加和计算的。
:::

### 5.1 统计各类选择器数量

1. 计算ID选择器的数量为 A
2. 计算类选择器、属性选择器、伪类选择器的数量为 B
3. 计算元素选择器、伪元素选择器数量为 C
4. 忽略通用选择器

> 特殊场景需要特别注意：
> 1. 伪类选择器 :is()、:not()、:has() 特异性为参数选择器列表中，特异性最高的选择器特异性
> 2. 伪类选择器 :nth-child(An+B [of S]?)、:nth-last-child(An+B [of S]?) 特异性为参数选择器列表中，特异性最高的选择器特异性叠加普通伪类选择器特异性
> 3. 伪类选择器 :where() 特异性为 0

### 5.2 比较CSS选择器权重

1. A值越大的权重值越强；
2. 如果两个A值相同，则B值越大的权重越高；
3. 如果两个B值也相同，则C值越大的权重越高；
4. 如果所有值都一样，则这两个权重相同。

需要特别注意的是，行内样式的权重最高。

### 5.3 属性来源优先级排序

1. Transition declarations (过渡)
2. Important user agent declarations (浏览器预设 !important)
3. Important user declarations (用户预设 !important)
4. Important author declarations (开发人员 !important)
5. Animation declarations (动画)
6. Normal author declarations (开发人员)
7. Normal user declarations (用户预设)
8. Normal user agent declarations (浏览器预设)

## 六、参考
1. [Calculating a selector’s specificity](https://www.w3.org/TR/selectors/#specificity-rules)
2. [Cascading Origins](https://www.w3.org/TR/css-cascade-4/#cascading-origins)
3. [CSS权重](https://juejin.cn/post/6844903810993750029)