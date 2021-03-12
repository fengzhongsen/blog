---
title: CSS REM
date: 2021.03.04 20:00:00
categories:
  - 前端
tags:
  - CSS
---

## 一、REM原理

`rem` 是 `CSS3` 新增的相对长度单位，是只相对于根元素 `html` 的 `font-size` 计算值的大小。<br/>
默认根元素的 `font-size` 都是 `16px` 的。如果想要设置 `12px` 的字体大小也可以是 `12px/16px = 0.75rem`。<br/>
1. 由于 px 是相对固定单位，字号大小直接被定死，无法随着浏览器进行缩放；
2. rem 直接相对于根元素 html，避开层级关系，移动端新型浏览器对其支持较好；

## 二、REM适配方案

### viewport

```html
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
```

### 初始字号

```css
html {
  font-size: 100px;
}
```

### 单位转换

不管你拿到的设计稿宽度是 `640px` 还是 `750px`，多大都一样。和我们平时做 PC 页面的做法基本一杨，只需要把单位 `px` 换算成 `rem`，所以设计稿的元素大小全除以 100 单位换成 `rem`，例如设计稿上某个文字的大小为 `30px`，直接写 `font-size: 0.3rem`。

### 示例代码

用 `onorientationchange` 函数来检测屏幕旋转，在一些APP或游戏内嵌页面会有该函数不会执行、`orientation` 获取不到的情况。所以如果是游戏 app 内嵌页建议使用 `resize` 事件，检查宽高变化来检测屏幕是否旋转。

```html
<script>
  //屏幕适应 
  (function (win, doc) {
    if (!win.addEventListener) return;
    function setFont() {
      var html = document.documentElement;
      var k = 640;
      html.style.fontSize = html.clientWidth / k * 100 + 'px';
    }
    setFont();
    setTimeout(function () {
      setFont();
    }, 300);
    doc.addEventListener('DOMContentLoaded', setFont, false);
    win.addEventListener('resize', setFont, false);
    win.addEventListener('load', setFont, false);
  })(window, document);
</script>
```

### 注意事项

使用 rem 方式布局有以下几点需要注意：

1. 大小为 `1px` 的元素不要使用 `rem`，直接用 `px`
2. 多栏多列布局优先使用百分比%或是 `display: flex`
3. 因为小于1px浏览器支持不够好会导致计算误差，背景图使用雪碧图时，图标之间多留5px的空隙，同时图片的 background-size 属性最好写上图片的宽高

## 四、参考
1. [rem布局](https://tgideas.qq.com/doc/frontend/spec/m/layout.html)