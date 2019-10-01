---
title: 【ES6】Promise
date: 2018.11.16 12:00:00
categories:
  - 技术篇
tags:
  - 前端
  - JavaScript
  - ES6
---

## Example1
```js
const p1 = new Promise((resolve, reject) => {
    If(…) {resolve(…)} else {reject(...)}
}).then(success=>{}, error=>{});
const p2 = new Promise((resolve, reject) => {
    If(…) {resolve(…)} else {reject(...)}
}).then(success=>{}).catch(error=>{});
```

1. `Promise.resove()` 将参数包装成一个新的 `Promise` 实例，`Promise.prototype.then()` 处理，可以实现链式调用。
2. `Promise.resove()` 接收的参数有 `Promise` 实例、`thenable` 对象、不是对象的、没有参数。并且后三种情况会立即 `then` 方法，立即 `resolve` 的 `Promise` 对象，是在本轮“事件循环”（`event loop`）的结束时，而不是在下一轮“事件循环”的开始时。
3. `Promise.reject()` 返回一个新的 `Promise` 实例，该实例的状态为 `rejected`。
4. `Promise.reject()` 的参数，会原封不动地作为 `reject` 的理由，变成后续方法的参数。
5. `Promise.prototype.catch()` 是 `Promise.prototype.then()` 的别名函数，只是第一个参数是 `null`。
6. `Promise.prototype.finally()` 不依赖于 `Promise` 的执行结果，也是 `then` 的特例。

## Example2
```js
const p1 = Promise.all([p1, p2, p3]);
const p2 = Promise.race([p1, p2, p3]);
```

1. `Promise.all`：只有 `p1`、`p2`、`p3` 的状态都变成 `fulfilled`，`p1` 的状态才会变成 `fulfilled`，此时`p1`、`p2`、`p3` 的返回值组成一个数组，传递给 `p1` 的回调函数。
2. `Promise.race`：只要 `p1`、`p2`、`p3`之中有一个被 `rejected`，`p1` 的状态就变成 `rejected`，此时第一个被 `reject`的实例的返回值，会传递给p2的回调函数。
3. 只要 `p1`、`p2`、`p3` 之中有一个实例率先改变状态，`p2`的状态就跟着改变。那个率先改变的 `Promise` 实例的返回值，就传递给 `p2` 的回调函数。

## Example3
```js
Promise.try(database.users.get({id: userId})).then(...).catch(...)
```

1. `Promise.try`：同步代码同步执行，异步代码异步执行，异常也已在 `catch` 函数中捕获。
2. `Promise.try` 就是模拟 `try` 代码块，就像 `promise.catch` 模拟的是 `catch` 代码块。