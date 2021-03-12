---
title: CSS 居中布局
date: 2021.03.01 21:00:00
categories:
  - FrontEnd
tags:
  - CSS
---

## 一、元素水平垂直居中

### 1.1 绝对定位 + `transform:translate()`

```html
<style>
  .box {
    width: 300px;
    height: 300px;
    background-color: orange;
    position: relative;
  }

  .sun {
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50px) translateY(-50px);
    /* transform: translateX(-50%) translateY(-50%); */
    /* transform: translate(-50%, -50%); */
  }
</style>
<div class="box">
  <div class="sun"></div>
</div>
```

### 1.2 绝对定位 + `margin:负值`

```html
<style>
  .box {
    width: 300px;
    height: 300px;
    background-color: orange;
    position: relative;
  }
  .sun {
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -50px;
    margin-left: -50px;
  }
</style>
<div class="box">
  <div class="sun"></div>
</div>
```

### 1.3 绝对定位 + `margin:auto`

```html
<style>
  .box {
    width: 300px;
    height: 300px;
    background-color: orange;
    position: relative;
  }

  .sun {
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    /* 四个方向值在一定范围内相等即可 */
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
</style>
<div class="box">
  <div class="sun"></div>
</div>
```

### 1.4 绝对定位 + `calc()`

```html
<style>
  .box {
    width: 300px;
    height: 300px;
    background-color: orange;
    position: relative;
  }

  .sun {
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    left: calc(50% - 50px);
    top: calc(50% - 50px);
  }
</style>
<div class="box">
  <div class="sun"></div>
</div>
```

### 1.5 弹性布局 flex

```html
<style>
  .box {
    width: 300px;
    height: 300px;
    background-color: orange;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sun {
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>
<div class="box">
  <div class="sun"></div>
</div>
```

### 1.6 网格布局 grid

::: waring
考虑兼容性，故不推荐Grid
:::

```html
<style>
  .box {
    width: 300px;
    height: 300px;
    background-color: orange;
    display: grid;
  }

  .sun {
    width: 100px;
    height: 100px;
    background-color: red;
    justify-self: center;
    align-self: center;
  }

  /* .sun {
    width: 100px;
    height: 100px;
    background-color: red;
    margin: auto;
  } */
</style>
<div class="box">
  <div class="sun"></div>
</div>
```

### 1.7 其他（...）

```html
<style>
  .box {
    width: 300px;
    height: 300px;
    background-color: orange;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .sun {
    width: 100px;
    height: 100px;
    background-color: red;
    display: inline-block;
  }
</style>
<div class="box">
  <div class="sun"></div>
</div>
```

## 二、文本水平垂直居中

```html
<style>
  .box {
    width: 300px;
    height: 300px;
    background-color: orange;
    text-align: center;
    line-height: 300px;
  }
</style>
<div class="box">
  <span>文本在这里</span>
</div>
```
