---
title: 【SVG】初识SVG
date: 2019-06-14 12:00:00
categories:
  - 技术篇
tags: 
  - 前端
  - SVG
---

## 一、概述
> SVG 是一种基于 XML 语法的图像格式，全称是可缩放矢量图（Scalable Vector Graphics）。其他图像格式都是基于像素处理的，SVG 则是属于对图像的形状描述，所以它本质上是文本文件，体积较小，且不管放大多少倍都不会失真。

1. SVG 文件可以直接插入网页，成为 DOM 的一部分，然后用 JavaScript 和 CSS 进行操作。

```html
<!DOCTYPE html>
<html>
<head></head>
<body>
    <svg id="mysvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
        <circle id="mycircle" cx="400" cy="300" r="50" />
    </svg>
</body>
</html>
```

2. SVG 代码也可以写在一个独立文件中，然后用`<img>`、`<object>`、`<embed>`、`<iframe>`等标签插入网页。

```html
<img src="circle.svg">
<object id="object" data="circle.svg" type="image/svg+xml"></object>
<embed id="embed" src="icon.svg" type="image/svg+xml">
<iframe id="iframe" src="icon.svg"></iframe>
```

3. CSS 也可以使用 SVG 文件。

```css
.logo {
  background: url(icon.svg);
}
```

4. SVG 文件还可以转为 BASE64 编码，然后作为 Data URI 写入网页。

```html
<img src="data:image/svg+xml;base64,[data]">
```

## 二、语法

### 2.1 顶层标签`<svg>`

> SVG 代码都放在顶层标签`<svg>`之中。

```html
<svg width="100%" height="100%">
  <circle id="mycircle" cx="50" cy="50" r="50" />
</svg>
```

`<svg>`的`width`属性和`height`属性，指定了 SVG 图像在 HTML 元素中所占据的宽度和高度。除了相对单位，也可以采用绝对单位（单位：像素）。如果不指定这两个属性，SVG 图像默认大小是300像素（宽） x 150像素（高）。

如果只想展示 SVG 图像的一部分，就要指定viewBox属性。

```html
<svg width="100" height="100" viewBox="50 50 50 50">
  <circle id="mycircle" cx="50" cy="50" r="50" />
</svg>
```

`<viewBox>`属性的值有四个数字，分别是左上角的横坐标和纵坐标、视口的宽度和高度。上面代码中，SVG 图像是100像素宽 x 100像素高，`viewBox`属性指定视口从`(50, 50)`这个点开始。所以，实际看到的是右下角的四分之一圆。

注意，视口必须适配所在的空间。上面代码中，视口的大小是 50 x 50，由于 SVG 图像的大小是 100 x 100，所以视口会放大去适配 SVG 图像的大小，即放大了四倍。

如果不指定`width`属性和`height`属性，只指定`viewBox`属性，则相当于只给定 SVG 图像的长宽比。这时，SVG 图像的默认大小将等于所在的 HTML 元素的大小。

### 2.2 圆形标签`<circle>`

> `<circle>`标签代表圆形。

```html
<svg width="300" height="180">
  <circle cx="30"  cy="50" r="25" />
  <circle cx="90"  cy="50" r="25" class="red" />
  <circle cx="150" cy="50" r="25" class="fancy" />
</svg>
```

上面的代码定义了三个圆。`<circle>`标签的`cx`、`cy`、`r`属性分别为横坐标、纵坐标和半径，单位为像素。坐标都是相对于`<svg>`画布的左上角原点。

`class`属性用来指定对应的 CSS 类。

```css
.red {
  fill: red;
}

.fancy {
  fill: none;
  stroke: black;
  stroke-width: 3pt;
}
```

SVG 的 CSS 属性与网页元素有所不同。

```
fill：填充色
stroke：描边色
stroke-width：边框宽度
```

### 2.3 直线标签`<line>`

> `<line>`标签用来绘制直线。

```html
<svg width="300" height="180">
  <line x1="0" y1="0" x2="200" y2="0" style="stroke:rgb(0,0,0);stroke-width:5" />
</svg>
```

上面代码中，`<line>`标签的`x1`属性和`y1`属性，表示线段起点的横坐标和纵坐标；`x2`属性和`y2`属性，表示线段终点的横坐标和纵坐标；`style`属性表示线段的样式。

### 2.4 折线标签`<polyline>`

> `<polyline>`标签用于绘制一根折线。

```html
<svg width="300" height="180">
  <polyline points="3,3 30,28 3,53" fill="none" stroke="black" />
</svg>
```

`<polyline>`的`points`属性指定了每个端点的坐标，横坐标与纵坐标之间与逗号分隔，点与点之间用空格分隔。

### 2.5 矩形标签`<rect>`

> `<rect>`标签用于绘制矩形。

```html
<svg width="300" height="180">
  <rect x="0" y="0" height="100" width="200" style="stroke: #70d5dd; fill: #dd524b" />
</svg>
```

`<rect>`的`x`属性和`y`属性，指定了矩形左上角端点的横坐标和纵坐标；`width`属性和`height`属性指定了矩形的宽度和高度（单位像素）。

### 2.6 椭圆标签`<ellipse>`

> `<ellipse>`标签用于绘制椭圆。

```
<svg width="300" height="180">
  <ellipse cx="60" cy="60" ry="40" rx="20" stroke="black" stroke-width="5" fill="silver"/>
</svg>
```

`<ellipse>`的`cx`属性和`cy`属性，指定了椭圆中心的横坐标和纵坐标（单位像素）；`rx`属性和`ry`属性，指定了椭圆横向轴和纵向轴的半径（单位像素）。

### 2.7 多边形标签`<polygon>`

> `<polygon>`标签用于绘制多边形。

```html
<svg width="300" height="180">
  <polygon fill="green" stroke="orange" stroke-width="1" points="0,0 100,0 100,100 0,100 0,0"/>
</svg>
```

`<polygon>`的`points`属性指定了每个端点的坐标，横坐标与纵坐标之间与逗号分隔，点与点之间用空格分隔。

### 2.8 路径标签`<path>`

> `<path>`标签用于制路径，`d`属性表示绘制顺序，它的值是一个长字符串。

```html
<svg width="100" height="100">
  <!-- 下面这两条路径重合，或者说一条路径的两种表示方法 -->
  <path d="M10 10 H 90 V 90 H 10 Z" fill="transparent" stroke="black"/>
  <path d="M10 10 h 80 v 80 h -80 Z" fill="transparent" stroke="black"/>
</svg>
```

`<path>`元素里有5个画直线的命令（M、L、H、V、Z），顾名思义，直线命令就是在两个点之间画直线。绘制平滑曲线的命令有三个，其中两个用来绘制贝塞尔曲线（C、Q，C 和 Q 分别有其简易命令 S 和 T ），另外一个用来绘制弧形或者说是圆的一部分（A）。每一个命令都有两种表示方式，一种是用***大写字母***，表示采用绝对定位。另一种是用***小写字母***，表示采用相对定位（例如：从上一个点开始，向上移动10px，向左移动7px）。

```
// 1、直线命令
M = moveto // M x y (or m dx dy)
L = lineto // L x y (or l dx dy)
H = horizontal lineto // H x (or h dx)
V = vertical lineto // V y (or v dy)
Z = closepath // Z (or z) 不区分大小写

// 2、曲线命令
// 2.1 三次贝塞尔曲线
C = curveto // C x1 y1, x2 y2, x y (or c dx1 dy1, dx2 dy2, dx dy)
S = smooth curveto // S x2 y2, x y (or s dx2 dy2, dx dy)
// 2.2 二次贝塞尔曲线
Q = quadratic Bézier curve // Q x1 y1, x y (or q dx1 dy1, dx dy)
T = smooth quadratic Bézier curveto // T x y (or t dx dy)
// 2.3 弧形曲线
A = elliptical Arc // A rx ry x-axis-rotation large-arc-flag sweep-flag x y (OR a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy)
```
详情参考 [路径-SVG | MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths)

拓展阅读 [维基百科](https://zh.wikipedia.org/wiki/%E8%B2%9D%E8%8C%B2%E6%9B%B2%E7%B7%9A)、[简书博客](https://www.jianshu.com/p/0c9b4b681724)

### 2.9 文本标签`<text>`

> `<text>`标签用于绘制文本。

```html
<svg width="300" height="180">
  <text x="50" y="25">Hello World</text>
</svg>
```

`<text>`的`x`属性和`y`属性，表示文本区块基线（baseline）起点的横坐标和纵坐标。文字的样式可以用`class`或`style`属性指定。

### 2.10 图片标签`<image>`

> `<image>`标签用于插入图片文件。

```html
<svg viewBox="0 0 100 100" width="100" height="100">
  <image xlink:href="path/to/image.jpg"
    width="50%" height="50%"/>
</svg>
```

上面代码中，`<image>`的`xlink:href`属性表示图像的来源。

### 2.11 复制标签`<use>`

> `<use>`标签用于复制一个形状。

```html
<svg viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
  <circle id="myCircle" cx="5" cy="5" r="4"/>

  <use href="#myCircle" x="10" y="0" fill="blue" />
  <use href="#myCircle" x="20" y="0" fill="white" stroke="blue" />
</svg>
```

`<use>`的`href`属性指定所要复制的节点，`x`属性和`y`属性是`<use>`左上角的坐标。另外，还可以指定`width`和`height`坐标。

### 2.12 分组标签`<g>`

> `<g>`标签用于将多个形状组成一个组（group），方便复用。

```html
<svg width="300" height="100">
  <g id="myCircle">
    <text x="25" y="20">圆形</text>
    <circle cx="50" cy="50" r="20"/>
  </g>

  <use href="#myCircle" x="100" y="0" fill="blue" />
  <use href="#myCircle" x="200" y="0" fill="white" stroke="blue" />
</svg>
```

### 2.13 仅供引用标签`<defs>`

> `<defs>`标签用于自定义形状，它内部的代码不会显示，仅供引用。

```html
<svg width="300" height="100">
  <defs>
    <g id="myCircle">
      <text x="25" y="20">圆形</text>
      <circle cx="50" cy="50" r="20"/>
    </g>
  </defs>

  <use href="#myCircle" x="0" y="0" />
  <use href="#myCircle" x="100" y="0" fill="blue" />
  <use href="#myCircle" x="200" y="0" fill="white" stroke="blue" />
</svg>
```

### 2.14 自定义形状标签`<pattern>`

> `<pattern>`标签用于自定义一个形状，该形状可以被引用来平铺一个区域。

```html
<svg width="500" height="500">
  <defs>
    <pattern id="dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <circle fill="#bee9e8" cx="50" cy="50" r="35" />
    </pattern>
  </defs>
  <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
</svg>
```

上面代码中，`<pattern>`标签将一个圆形定义为`dots`模式。`patternUnits="userSpaceOnUse"`表示`<pattern>`的宽度和长度是实际的像素值。然后，指定这个模式去填充下面的矩形。

### 2.15 动效标签`<animate>`

> `<animate>`标签用于产生动画效果。

```html
<svg width="500px" height="500px">
  <rect x="0" y="0" width="100" height="100" fill="#feac5e">
    <animate attributeName="x" from="0" to="500" dur="2s" repeatCount="indefinite" />
  </rect>
</svg>
```

上面代码中，矩形会不断移动，产生动画效果。

`<animate>`的属性含义如下。

```
attributeName：发生动画效果的属性名。
from：单次动画的初始值。
to：单次动画的结束值。
dur：单次动画的持续时间。
repeatCount：动画的循环模式。
```

可以在多个属性上面定义动画。

```html
<animate attributeName="x" from="0" to="500" dur="2s" repeatCount="indefinite" />
<animate attributeName="width" to="500" dur="2s" repeatCount="indefinite" />
```

### 2.16 变形标签`<animateTransform>`

> `<animate>`标签对 CSS 的transform属性不起作用，如果需要变形，就要使用`<animateTransform>`标签。

```html
<svg width="500px" height="500px">
  <rect x="250" y="250" width="50" height="50" fill="#4bc0c8">
    <animateTransform attributeName="transform" type="rotate" begin="0s" dur="10s" from="0 200 200" to="360 400 400" repeatCount="indefinite" />
  </rect>
</svg>
```

上面代码中，`<animateTransform>`的效果为旋转（`rotate`），这时`from`和`to`属性值有三个数字，第一个数字是角度值，第二个值和第三个值是旋转中心的坐标。`from="0 200 200"`表示开始时，角度为0，围绕`(200, 200)`开始旋转；`to="360 400 400"`表示结束时，角度为360，围绕`(400, 400)`旋转。

## 三、JavaScript 操作

### 3.1 DOM 操作

> 如果 SVG 代码直接写在 HTML 网页之中，它就成为网页 DOM 的一部分，可以直接用 DOM 操作。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <style>
        circle {
            stroke-width: 5;
            stroke: #f00;
            fill: #ff0;
        }

        circle:hover {
            stroke: #090;
            fill: #fff;
        }
    </style>
</head>

<body>
    <svg id="mysvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
        <circle id="mycircle" cx="400" cy="300" r="50" />
    </svg>
    <script>
        // 点击图形，就改写circle元素的r属性。
        var mycircle = document.getElementById('mycircle');

        mycircle.addEventListener('click', function (e) {
            console.log('circle clicked - enlarging');
            mycircle.setAttribute('r', 60);
        }, false);
    </script>
</body>

</html>
```

### 3.2 获取 SVG DOM

> 使用`<object>`、`<iframe>`、`<embed>`标签插入 SVG 文件，可以获取 SVG DOM。

```js
var svgObject = document.getElementById('object').contentDocument;
var svgIframe = document.getElementById('iframe').contentDocument;
var svgEmbed = document.getElementById('embed').getSVGDocument();
```

注意，如果使用`<img>`标签插入 SVG 文件，就无法获取 SVG DOM。

### 3.3 读取 SVG 源码

> 由于 SVG 文件就是一段 XML 文本，因此可以通过读取 XML 代码的方式，读取 SVG 源码。

```js
// 使用`XMLSerializer`实例的`serializeToString()`方法，获取 SVG 元素的代码。
var svgString = new XMLSerializer()
  .serializeToString(document.querySelector('svg'));
```

### 3.4 SVG 图像转为 Canvas 图像

```js
// 首先，需要新建一个Image对象，将 SVG 图像指定到该Image对象的src属性。
var img = new Image();
var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});

var DOMURL = self.URL || self.webkitURL || self;
var url = DOMURL.createObjectURL(svg);

img.src = url;

// 然后，当图像加载完成后，再将它绘制到<canvas>元素。
img.onload = function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
};
```