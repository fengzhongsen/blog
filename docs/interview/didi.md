---
title: 滴滴
date: 2021.04.09 23:00:00
sidebar: false
categories:
  - Interview
tags:
  - Interview
---

# 一面

## 笔试题

1. 用 JS 实现二分查找（折半查找）算法，并写出时间复杂度。

```js
/**
 * 时间复杂度 O(logn)
 */
function binary(arr, data) {
  let start = 0;
  let end = arr.length - 1;
  while (end >= start) {
    const point = Math.floor((end + start) / 2);
    if (data > arr[point]) {
      start = point;
    } else if (data < arr[point]) {
      end = point;
    } else {
      return point;
    }
  }
  return -1;
}
```

2. 用 JS 实现深拷贝。

```js
function deepCopy(obj, cache = []) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const hit = cache.find(item => item.o === obj);
  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};

  cache.push({
    original: abj,
    copy: copy
  });

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy;
}
```

3. 如下代码，分别弹出什么信息？

```js
// 题目1
var a = 100
function create() {
  var a = 200
  return function () {
    alert(a)
  }
}
var fn = create()
fn()
// 200

// 题目2
var a= 100
function invoke(fn) {
  var a = 200
  fn()
}
function fn() {
  alert(a)
}
invoke(fn)
// 100
```

4. 用 flex 实现下图效果。容器宽高不定，子元素宽高固定？

<img src="https://cdn.fblog.top/blog/images/interview/didi-01.png" />

```html
<style>
  .parent {
    border: 2px solid gray;
  }

  .row {
    display: flex;
  }

  .row div {
    width: 100px;
    height: 50px;
    background-color: gray;
  }

  .row1 {
    justify-content: flex-start;
  }

  .row2 {
    justify-content: center;
  }

  .row3 {
    justify-content: flex-end;
  }
</style>
<section class="parent">
  <section class="row row1">
    <div></div>
  </section>
  <section class="row row2">
    <div></div>
  </section>
  <section class="row row3">
    <div></div>
  </section>
</section>
```

5. 现有瀑布流式图片页面（页面下拉时无限加载图片），用 JS 监听每个图片的点击事件。

```html
<section id="root">
  <img />
  <img />
  <img />
</section> 
<script>
  // 事件代理
  const root = document.querySelector('#root');
  root.addEventListener('click', function (event) {
    const element = event.target.tagName === 'IMG';
    console.log(element);
  })
</script>
```

6. HTTP 常用状态码及其含义。

```
200 成功
301 永久重定向
302 暂时重定向
401 未登录
403 没有权限
404 未找到资源
500 服务端错误
503 服务不可用
...
```

7. Git 常用命令有哪些？

```bash
git pull
git add .
git commit -m "message"
git push
git rebase -i HEAD~3
git rebase continue
git rebase --abort
git merge <brach-name>
git merge --abort
git checkout <brach-name>
git checkout .
git checkout -b <new-brach-name>
git status
git diff
git log
```

8. Linux 基础命令有哪些？

```bash
mkdir <dir> 
cd <dir>
ll -a
mp
mv
rm -rf node_modules
```

9. 执行如下代码，然后点击每个 <a> 标签分别弹出什么信息？并写明原因。

```js
let $body = $('body')
let arr = [1, 2, 3, 4, 5]
let i, length = arr.length, $a
for (i = 0; i < length; i++) {
  $a = $(`<a>${i}</a>`)
  $body.append($a)
  $a.click(function () {
    alert(i)
  })
}
// 结果：5 5 5 5 5
// 原因：竟然有坑
```

10. 执行下面代码会输出什么信息

```js
const obj = {
  a: 100
}
const obj1 = obj;
let a1 = obj.a;

obj1.a = 200;
console.log(obj.a);
console.log(a1);
a1 = 300;
console.log(obj.a);
console.log(obj1.a);
// 200
// 100
// 200
// 200
```

11. 执行如下代码，会输出什么信息？

```js

async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(() => {
  console.log('settimeout');
}, 0);
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
})
console.log('script end');
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// settimeout
```

12. 执行如下代码，abc 会是什么颜色？并且说明原因。

```html
<style>
  #p1 {
    color: red;
  }

  p.container {
    color: blue;
  }

  .p {
    color: yellow;
  }
</style>
<p id="p1" class="container p">abc</p>
<!-- red，ID选择器重要性更大 -->
```

13. 执行如下代码，分别打印出什么？
```js
123 instanceof Number
new Number(123) instanceof Number
Number(123) instanceof Number
// false
// true
// false
```

## 问答题

1. vue生命周期
2. vue组件通信
3. vue中key的作用
4. vue的diff算法
5. 小程序的生命周期
6. webpack打包流程
