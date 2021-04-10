---
title: 美团
date: 2021.04.10 15:00:00
sidebar: false
categories:
  - Interview
tags:
  - Interview
---

## 一面

1. 给定一个数组 array，找到其中和为 target 的一对数字组合的索引。

```js
function find(array, target) {
  let result = [];
  for (let i, l = array.length; i < l; i++) {
    let first = array[i];
    let second = target - first;
    const index = array.indexOf(second);
    if (index > -1) {
      result = [i, index];
    }
  }
  return result;
}

function findByMap(array, target) {
  let result = [];
  const map = {};
  for (let i, l = array.length; i < l; i++) {
    let first = array[i];
    map[target - first] = first;
  }
  for (let i, l = array.length; i < l; i++) {
    let first = array[i];
    let second = map[target - first];
    if (first === second) {
      result = [i, target - first];
      break;
    }
  }
  return result;
}
```

> 实现了第一种，问复杂度，问有没有其他方法？
> 知道哪些数据结构？
> 再用 map 实现一下？然后写了第二种解法。

2. 实现flat。

```js
function isArray(array) {
  return Array.isArray(array);
}

function _flat(array) {
  let result = [];
  for (let i = 0, l = array.length; i < l; i++) {
    let item = array[i];
    if (isArray(item)) {
      result.push(..._flat(item))
    } else {
      result.push(item);
    }
  }
  return result;
}
console.log(_flat([1, [2, 3, 4], [4, 5], 6, 7, 8]))
```

3. async 和 defer 区别，defer 在 DOMContentLoaded 事件之前还是之后执行
4. preload 和 prefetch 区别，preload 一定会执行吗
5. 实现一个下拉搜索，需要考虑哪些问题？防抖，样式。
6. vue watch 和 computed 区别
7. vue nextTick 作用和原理
8. 微任务和宏任务，与 node loop 区别
9. redux 原理
10. 前端优化：首屏、缓存、图片、交互、React代码层面
11. 如何判断浏览器是否支持 webp
12. babel-loader 原理与实现
13. webpack 优化，插件实现
14. 异常处理上报
15. 缓存：强制缓存、协商缓存
16. http2.0 push 和 websocket 区别，push 是谁主动的，push有什么劣势
17. 网络七层协议
18. 图片分片上传