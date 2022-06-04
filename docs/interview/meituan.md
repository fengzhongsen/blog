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

## 二面

平衡点问题: 一个数组中的元素，如果其前面的部分等于后面的部分，那么这个点的位序就是平衡点。
比如列表numbers = [1, 3, 5, 7, 8, 25, 4, 20]，25前面的总和为24，25，后面的总和也是24，那么25就是这个列表的平衡点。
要求编写程序，寻找并返回一个列表的所有平衡点。

```js
function balance1(array) {
    const result = [];
    for(let i = 0, l = array.length; i <l; i++) {
        const p = array[i];
        const arr1 = array.slice(0, i);
        const arr2 = array.slice(i + 1, l);
        let first = 0;
        let second = 0;
        arr1.forEach(item => {
            first += item;
        })
        arr2.forEach(item => {
            second += item;
        })
        if(first === second) {
            result.push(p);
        }
    }
    return result;
}

function balance2(array) {
    const result = [];
    const map1 = {};
    const map2 = {};
    let count1 = 0;
    let count2 = 0;
    for(let i = 0, l = array.length; i <l; i++) {
        count1 += array[i];
        map1[i] = count1;
    }
    for(let i = array.length - 1; i > 0; i--) {
        count2 += array[i];
        map2[i] = count2;
    }
    for(let i = 1, l = array.length; i <l; i++) {
        const p = array[i];
        if(map1[i-1] === map2[i+1]) {
            result.push(p);
        }
    }
    return result;
}

const numbers = [1, 3, 5, 7, 8, 25, 4, 20];
console.log(balance1(numbers));
console.log(balance2(numbers));

```