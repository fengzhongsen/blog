---
title: 【ES5】JavaScript DOM
date: 2017-07-05 12:00:00
categories:
  - 技术篇
tags:
  - 前端
  - JavaScript
  - ES5
---

## 一、概括
1. `JavaScript` 能够改变页面中的所有 `HTML 元素`
2. `JavaScript` 能够改变页面中的所有 `HTML 属性`
3. `JavaScript` 能够改变页面中的所有 `CSS 样式`
4. `JavaScript` 能够对页面中的所有事件做出反应

## 二、功能
1. 改变 HTML 属性
```js
// document.getElementById(id).attribute = 新属性值
document.getElementById("image").src="landscape.jpg";
```

2. 改变 HTML 样式
```js
// document.getElementById(id).style.property = 新样式
document.getElementById("p2").style.fontSize = "larger";
```
3. 事件
(1)事件属性：
```html
<button onclick="displayDate()">点这里</button>
```

或者
```js
document.getElementById("myBtn").onclick=function(){displayDate()};
```

(2)添加事件句柄
```js
element.addEventListener(event, function, useCapture);
```
第一个参数是事件的类型 (如 "click" 或 "mousedown")。<br>
第二个参数是事件触发后调用的函数。<br>
第三个参数是个布尔值用于描述事件是冒泡还是捕获。该参数是可选的。<br>
```js
element.addEventListener("mouseover", myFunction);
element.addEventListener("click", mySecondFunction);
element.addEventListener("mouseout", myThirdFunction);
window.addEventListener("resize", function(){
    document.getElementById("demo").innerHTML = sometext;
});
```

(3)移除事件句柄
```js
element.removeEventListener("mousemove", myFunction);
```

4. 操作 DOM
(1)创建新的 HTML 元素
```html
<div id="div1">
    <p id="p1">这是一个段落。</p>
    <p id="p2">这是另一个段落。</p>
</div>

<script>
    var para=document.createElement("p");
    var node=document.createTextNode("这是一个新段落。");
    para.appendChild(node);

    var element=document.getElementById("div1");
    element.appendChild(para);
</script>
```

(2)删除已有的 HTML 元素
```html
<div id="div1">
    <p id="p1">这是一个段落。</p>
    <p id="p2">这是另一个段落。</p>
</div>
<script>
    var parent=document.getElementById("div1");
    var child=document.getElementById("p1");
    parent.removeChild(child);
</script>
```