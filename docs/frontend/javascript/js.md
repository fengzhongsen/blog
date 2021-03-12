---
title: JavaScript
date: 2021.03.05 20:00:00
categories:
  - 前端
tags:
  - JavaScript
---

## 一、事件模型

::: tip
DOM1级于1998年10月1日成为W3C推荐标准。DOM1级标准中并没有定义事件相关的内容，所以没有所谓的DOM1级事件模型。
:::

### 1.1 DOM0级事件

```html
<button onclick="doSomething()">点击</button>
<script>
  function doSomething() {}
</script>
```

或者

```html
<button id="btn">点击</button>
<script>
  const btn = document.getElementById('btn');
  btn.onclick = doSomething;
  function doSomething() {}
</script>
```

### 1.2 DOM2级事件

::: tip
W3C 将 DOM2 级事件模型的定义为三个阶段：**捕获阶段-目标阶段-冒泡阶段** <br/>
**捕获阶段：** 当用户对界面上的一个元素执行交互事件（比如点击），事件会从 document 对象开始向内传播，一层一层传递给目标元素，这个过程中，每层元素都能接受到这个事件。<br/>
**目标阶段：** 用户操作的目标元素<br/>
**冒泡阶段：** 当用户对界面上的一个元素执行交互事件（比如点击），事件会从目标元素对象开始向外传播，一层一层传递给 document 对象（部分浏览器会传递到 window 对象），这个过程中，每层元素都能接受到这个事件。
:::

1.2.1 相关API

```js
/*
 * eventType: 字符串，指定事件名
 * function: 指定要事件触发时执行的函数
 * useCapture: 布尔值，指定事件是否在捕获或冒泡阶段执行
 */

// 事件监听
element.addEventListener(eventType, function, useCapture);
// 移除事件监听
element.removeEventListener(eventType, function, useCapture);
```

1.2.2 事件对象

```ts
interface Event {
  type: string; // 事件类型
  target: Element; // 目标元素
  stopPropagation: function; // 阻止事件继续捕获或者冒泡
  preventDefault: function; // 阻止事件默认行为
  [propertyName]?: any; // 其他
}
```

1.2.3 案例

```html
<button id="btn">点击</button>
<script>
  const btn = document.getElementById('btn');
  btn.addEventListener('click', function(event) {
    event.stopPropagation();
    // Do something ...
  }, false);
  btn.addRemoveListener('click', function(event) {}, false);
</script>
```

::: details Internet Explorer 8 及更早IE版本只有 目标阶段-冒泡阶段 两个阶段

相关API:

```js
// 事件监听
element.attatchEvent(eventType, function);
// 移除事件监听
element.detachEvent(eventType, function);
```

事件对象

```ts
interface Event {
  type: string; // 事件类型
  srcElement: Element; // 目标元素
  cancelBubble: boolean; // 阻止事件继续冒泡
  returnValue: any; // 阻止事件默认行为
  [propertyName]?: any; // 其他
}
```
:::

### 1.3 事件委托/代理

::: tip
**优势**
1. 节省内存占用，减少事件注册
2. 新增子对象时无需再次对其绑定事件，适合动态添加元素
:::

点击 `<li>` 标签，`console` 出对应的 `innerText`

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
```

解法一（不实用事件代理）

```js
const list = document.querySelectorAll('li');
for (let i = 0; i < list.length; i++) {
  const item = list[i];
  item.onclick = function () {
    console.log(item.innerText);
  }
}
```

解法二（事件代理到 `ul` 元素）：

```js
const list = document.querySelector('ul');
list.onclick = function (event) {
  const target = event.target;
  if (target && target.tagName === 'LI') {
    console.log(target.innerText);
  }
}
```

或者

```js
const list = document.querySelector('ul');
list.addEventListener('click', function (event) {
  const target = event.target;
  if (target && target.tagName === 'LI') {
    console.log(target.innerText);
  }
})
```

### 1.4 不会冒泡的事件

`scroll`、`focus`、`blur`、`mouseleave`、`mouseenter`、`pause`、`play`等
这些事件都不支持冒泡，若需要事件委托，需要在捕获阶段进行处理。
:::warning
此外 `mouseout` 和 `mouseover` 会触发冒泡。
:::
参考 [JavaScript 中那些不会冒泡的事件](https://zhuanlan.zhihu.com/p/164844013)

## 二、防抖节流

### 2.1 防抖

::: tip
在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
:::

```js
// 防抖函数
function debounce(fn, delay) {
  let timer = null;
  return function () {
    let _this = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(_this, args);
    }, delay);
  }
}
```

### 2.2 节流

::: tip
每隔一段时间，只执行一次函数。
:::

```js
// 节流函数 throttle
function throttle(fn, interval) {
  let last = 0;
  return function () {
    let _this = this;
    let args = arguments;
    let now = +new Date;
    if (now - last >= interval) {
      last = now;
      fn.apply(_this, args);
    }
  }
}
```

## 三、深拷贝

### 3.1 JSON方法

```js
function deepCopy(source) {
  if (source === null || typeof source !== 'object') {
    return source;
  }
  return JSON.parse(JSON.stringify(source));
}
```

那么问题来了，我们知道如果对象中包含了值为 `undefined`、`function`、`symbol` 类型的属性，在 `JSON.stringify()` 中将会被忽略，所以这个方法简单粗暴，但是也不能满足所有应用场景。

### 3.2 递归

```js
function deepCopy(source) {
  if (source == null || typeof source !== 'object') {
    return source;
  }

  const target = Array.isArray(source) ? [] : {};

  Object.keys(source).forEach(key => {
    target[key] = deepCopy(source[key]);
  })

  return target;
}
```

这样子看起开就好多了，适应了属性包含各种类型的对象的深拷贝，但是也存在了隐藏风险，当属性中存在循环引用的时候，会导致死循环，如何解决？

```js
function deepCopy(source, cache = []) {
  if (source == null || typeof source !== 'object') {
    return source;
  }

  const hit = cache.find(item => item.original === source);
  if (hit) {
    return hit.target;
  }

  const target = Array.isArray(source) ? [] : {};
  cache.push({
    original: source,
    target
  });

  Object.keys(source).forEach(key => {
    target[key] = deepCopy(source[key], cache);
  })

  return target;
}
```

完美！

## 四、箭头函数

箭头函数是普通函数的简写，和普通函数相比有以下几点差异：
1. 函数体内的 `this` 对象，就是定义时所在的对象，而不是使用时所在的对象
2. 不可以使用 `arguments` 对象，该对像在函数体内不存在
3. 不能用作 `generator` 函数，所以不可使用 `yield` 命令
4. 不可以使用 `new` 命令，因为
   1. 没有自己的 `this`，无法调用 `call`、`apply`
   2. 没有 `prototype` 属性，而 `new` 命令在执行是需要将构造函数的 `prototype` 赋值给新的对象的 `__proto__`

## 五、bind、call、apply

1. `bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
2. `call()` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。
3. `apply()` 方法调用一个具有给定 `this` 值的函数，以及以一个数组（或类数组对象）的形式提供的参数。

### 5.1 差异
  1. `call()`和`bind()`的剩余参数是一个或多个，`apply()`则是使用数组（或类数组对象）提供参数。
  2. `bind()` 只指定 `this` 和参数，不自动调用函数。

### 5.2 实现

```js
Function.prototype.myCall = function call(context, ...args) {
  context.fn = this;
  const result = content.fn(...args);
  delete context.fn;
  return result;
}

Function.prototype.myApply = function apply(context, args) {
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
}

Function.prototype.myBind = function bind(context, ...args) {
  return function () {
    context.myCall(context, ...args);
  }
}
```

## 六、Promise

### 6.1 手写 promise

```js
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

class MyPromise {
  constructor(fn) {
    this.state = PENDING;
    this.resolvedHandlers = [];
    this.rejectedHandlers = [];
    fn(this.resolve.bind(this), this.reject.bind(this));
    return this;
  }

  resolve(props) {
    setTimeout(() => {
      this.state = RESOLVED;
      const resolveHandler = this.resolvedHandlers.shift();
      if (!resolveHandler) return;
      const result = resolveHandler(props);
      if (result && result instanceof MyPromise) {
        result.then(...this.resolvedHandlers);
      }
    });
  }

  reject(error) {
    setTimeout(() => {
      this.state = REJECTED;
      const rejectHandler = this.rejectedHandlers.shift();
      if (!rejectHandler) return;
      const result = rejectHandler(error);
      if (result && result instanceof MyPromise) {
        result.catch(...this.rejectedHandlers);
      }
    });
  }

  then(...handlers) {
    this.resolvedHandlers = [...this.resolvedHandlers, ...handlers];
    return this;
  }

  catch(...handlers) {
    this.rejectedHandlers = [...this.rejectedHandlers, ...handlers];
    return this;
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        promise.then(res => {
          results.push(res);
          if (results.length === promises.length) {
            resolve(results);
          }
        }).catch(reject);
      }
    })
  }

  static race() {
    return new MyPromise((promises, reject) => {
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        promise.then(resolve).catch(reject);
      }
    })
  }
}
```

## 执行上下文

## 事件循环
