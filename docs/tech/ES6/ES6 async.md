---
title: 【ES6】async
date: 2018.11.20 12:00:00
categories:
  - 技术篇
tags:
  - 前端
  - JavaScript
  - ES6
---

1. `async` 函数对 `Generator` 函数的改进，体现在四点：(1)内置执行器。(2)更好的语义。(3)更广的适用性。(4)返回值是 Promise。
2. `async` 函数返回一个 `Promise` 对象。其内部 `return` 语句返回的值，会成为 `then` 方法回调函数的参数。
3. 只有 `async` 函数内部的所有异步操作执行完，才会执行 `then` 方法指定的回调函数。
4. 正常情况下，`await` 命令后面是一个 `Promise` 对象，返回该对象的结果。如果不是 `Promise` 对象，就直接返回对应的值。
5. 任何一个 `await` 语句后面的 `Promise` 对象变为 `reject` 状态，那么整个 `async` 函数都会中断执行。解决方案(1)使用 `try…catch` ，(2) `await` 后面的 `Promise` 对象再跟一个 `catch` 方法。
6. 多个 `await` 命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
7. `await` 命令只能用在 `async` 函数之中。
8. 一个对象的同步遍历器的接口，部署在 `Symbol.iterator` 属性上面。同样地，对象的异步遍历器接口，部署在 `Symbol.asyncIterator` 属性上面。不管是什么样的对象，只要它的 `Symbol.asyncIterator` 属性有值，就表示应该对它进行异步遍历。
9. 一个对象的同步遍历器的接口，部署在 `Symbol.iterator` 属性上面。同样地，对象的异步遍历器接口，部署在 `Symbol.asyncIterator` 属性上面。不管是什么样的对象，只要它的 `Symbol.asyncIterator` 属性有值，就表示应该对它进行异步遍历。
10. 如果 `next` 方法返回的 `Promise` 对象被 `reject`，`for await...of` 就会报错，要用 `try...catch` 捕捉。
11. `for await...of` 循环也可以用于同步遍历器。
12. `Node v10` 支持异步遍历器。