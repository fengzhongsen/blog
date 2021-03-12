---
title: CSS3 Animation
date: 2021.03.03 22:00:00
categories:
  - FrontEnd
tags:
  - CSS
---

## 一、动画定义
::: tip
关键帧 `@keyframes` 通过在动画序列中定义关键帧的样式来控制CSS动画序列中的中间步骤。<br/>
和 `transition` 相比，关键帧 `@keyframes` 可以控制动画序列的中间步骤。<br/>
关键帧中出现的 `!important` 将会被忽略。
:::

```css
@keyframes putIn {
  from {
    opacity: 0;
    transform: scale(8);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shake {
  from {
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    transform: rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}
```

## 二、动画属性

### animation

::: tip
`animation` 是 `animation-name`，`animation-duration`, `animation-timing-function`，`animation-delay`，`animation-iteration-count`，`animation-direction`，`animation-fill-mode` 和 `animation-play-state` 属性的一个简写属性形式。
:::

```css
/* @keyframes duration | timing-function | delay |
   iteration-count | direction | fill-mode | play-state | name */
animation: 3s ease-in 1s 2 reverse both paused slidein;

/* @keyframes duration | timing-function | delay | name */
animation: 3s linear 1s slidein;

/* @keyframes duration | name */
animation: 3s slidein;
```

### animation-duration

::: tip
`animation-direction` 定义动画是否反向播放，通常在简写属性 `animation` 中设定。
:::

```css
/* Single animation */
animation-duration: 0s /* 初始值 */
animation-duration: 6s;
animation-duration: 120ms;

/* Multiple animations */
animation-duration: 1.64s, 15.22s;
animation-duration: 10s, 35s, 230ms;
```

### animation-timing-function

::: tip
`animation-timing-function` 定义动画在每一动画周期中执行的节奏。可能值为一或多个 `<timing-function>`。<br/>
对于关键帧动画来说，`<timing-function>` 作用于一个关键帧周期而非整个动画周期。<br/>
若关键帧没有定义缓动函数，则使用定义于整个动画的缓动函数。
:::

```css
/* Keyword values */
animation-timing-function: ease; /* 初始值 */
animation-timing-function: ease-in;
animation-timing-function: ease-out;
animation-timing-function: ease-in-out;
animation-timing-function: linear;
animation-timing-function: step-start;
animation-timing-function: step-end;

/* Function values */
animation-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
animation-timing-function: steps(4, end);
animation-timing-function: frames(10);

/* Multiple animations */
animation-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1);

/* Global values */
animation-timing-function: inherit;
animation-timing-function: initial;
animation-timing-function: unset;
```

### animation-delay

::: tip
`animation-delay` 定义动画于何时开始，即从动画应用在元素上到动画开始的这段时间的长度。
:::

```css
/* Single animation */
animation-delay: 0s; /* 初始值 */
animation-delay: 3s;
animation-delay: -1500ms; /* 动画从第1500ms的位置立即开始 */

/* Multiple animations */
animation-delay: 2.1s, 480ms;
```

### animation-iteration-count

::: tip
`animation-iteration-count` 定义动画在结束前运行的次数。<br/>
如果指定了多个值，每次播放动画时，将使用列表中的下一个值，在使用最后一个值后循环回第一个值。<br/>
通常在简写属性 `animation` 中设定。
:::

```css
/* Keyword value */
animation-iteration-count: infinite; /* 无限循环 */

/* <number> values */
animation-iteration-count: 3;
animation-iteration-count: 2.4;

/* Multiple values */
animation-iteration-count: 2, 0, infinite;
```

### animation-direction

::: tip
`animation-direction` 定义动画是否反向播放，通常在简写属性 `animation` 中设定。
:::

```css
/* Single animation */
animation-direction: normal; /* 初始值 */
animation-direction: reverse; /* 反向运行 */
animation-direction: alternate; /* 正反向交替运行，由正向开始 */
animation-direction: alternate-reverse; /* 正反向交替运行，由反向开始 */

/* Multiple animations */
animation-direction: normal, reverse;
animation-direction: alternate, reverse, normal;

/* Global values */
animation-direction: inherit;
animation-direction: initial;
animation-direction: unset;
```

### animation-fill-mode
::: tip
`animation-fill-mode` 定义动画在执行之前和之后如何将样式应用于其目标。<br/>
详见 [animation-fill-mode](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-fill-mode)
:::

```css
/* Single animation */
animation-fill-mode: none; /* 初始值 */
animation-fill-mode: forwards;
animation-fill-mode: backwards;
animation-fill-mode: both;

/* Multiple animations */
animation-fill-mode: none, backwards;
animation-fill-mode: both, forwards, none;
```

### animation-play-state

::: tip
`animation-play-state` 定义一个动画是运行或者暂停。<br/>
可以通过查询它来确定动画是否正在运行。还可以设置它的值来暂停和恢复动画。<br/>
恢复暂停的动画，是从它开始暂停的地方，而不是动画起点。
:::
```css
/* Single animation */
animation-play-state: running; /* 运行，初始值 */
animation-play-state: paused; /* 停止 */

/* Multiple animations */
animation-play-state: paused, running, running;

/* Global values */
animation-play-state: inherit;
animation-play-state: initial;
animation-play-state: unset;
```

### animation-name
::: tip
`animation-name` 定义目标的一系列动画，每个名称代表一个由 `@keyframes` 定义的动画。
:::

```css
/* Single animation */
animation-name: none; /* 初始值 */
animation-name: test_05;
animation-name: -specific;
animation-name: sliding-vertically;

/* Multiple animations */
animation-name: test1, animation4;
animation-name: none, -moz-specific, sliding;

/* Global values */
animation-name: initial
animation-name: inherit
animation-name: unset
```

## 参考
1. [MDN - CSS Animations](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations)
2. [Animate.css](https://animate.style/)