---
title: 【ES6】Generator
date: 2018.11.19 12:00:00
categories:
  - 技术篇
tags:
  - 前端
  - JavaScript
  - ES6
---

1. 执行 `Generator` 函数会返回一个遍历器对象，也就是说，`Generator` 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 `Generator` 函数内部的每一个状态。
2. 一个函数里面，只能执行一次（或者说一个）`return` 语句，但是可以执行多次（或者说多个）`yield` 表达式。
3. `Generator` 函数可以不用 `yield` 表达式，这时就变成了一个单纯的暂缓执行函数。另外需要注意，`yield` 表达式只能用在 `Generator` 函数里面，用在其他地方都会报错。
4. `yield` 表达式如果用在另一个表达式之中，必须放在圆括号里面。用作函数参数或放在赋值表达式的右边，可以不加括号。
5. `Generator` 函数执行后，返回一个遍历器对象。该对象本身也具有 `Symbol.iterator` 属性，执行后返回自身。
6. `yield` 表达式本身没有返回值，或者说总是返回 `undefined`。`next` 方法可以带一个参数，该参数就会被当作上一个`yield` 表达式的返回值。 
7. 由于 `next` 方法的参数表示上一个 `yield` 表达式的返回值，所以在第一次使用 `next` 方法时，传递参数是无效的。
8. `for…of` 循环可以自动遍历 `Generator` 函数时生成的 `Iterator` 对象，且此时不再需要调用 `next` 方法。但是 只能遍历 `yield` 状态，不能返回 `return` 状态。
9. 除了 `for...of` 循环以外，扩展运算符（`...`）、解构赋值和 `Array.from` 方法内部调用的，都是遍历器接口。这意味着，它们都可以将 `Generator` 函数返回的 `Iterator` 对象，作为参数。
10. `Generator` 函数返回的遍历器对象，都有一个 `throw` 方法，可以在函数体外抛出错误，然后在 `Generator` 函数体内捕获。
11. `throw` 方法抛出的错误要被内部捕获，前提是必须至少执行过一次 `next` 方法。
12. `throw` 方法被捕获以后，会附带执行下一条 `yield` 表达式。也就是说，会附带执行一次 `next` 方法，不影响下一次遍历。
13. 一旦 `Generator` 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用 `next` 方法，将返回一个 `value` 属性等于 `undefined`、`done` 属性等于 `true` 的对象，即 `JavaScript` 引擎认为这个 `Generator` 已经运行结束了。
14. `Generator` 函数返回的遍历器对象，还有一个 `return` 方法，可以返回给定的值，并且终结遍历 `Generator` 函数。
15. 如果 `Generator` 函数内部有 `try…finally` 代码块，且正在执行 `try` 代码块，那么 `return` 方法会推迟到 `finally` 代码块执行完再执行。
16. `next()`、`throw()`、`return()` 这三个方法本质上是同一件事：`next()` 是将 `yield` 表达式替换成一个值、`throw()` 是将 `yield` 表达式替换成一个 `throw` 语句、`return()` 是将 `yield` 表达式替换成一个 `return` 语句。
17. `yield*` 表达式，用来在一个 `Generator` 函数里面执行另一个 `Generator` 函数。
18. `yield*` 后面的 `Generator` 函数（没有 `return` 语句时），等同于在 `Generator` 函数内部，部署一个 `for...of` 循环。
19. 如果被代理的 `Generator` 函数有 `return` 语句，那么就可以向代理它的 `Generator` 函数返回数据。
20. 在内存中，子例程只使用一个栈（`stack`），而协程是同时存在多个栈，但只有一个栈是在运行状态，也就是说，协程是以多占用内存为代价，实现多任务的并行。
21. `Generator` 函数执行产生的上下文环境，一旦遇到 `yield` 命令，就会暂时退出堆栈，但是并不消失，里面的所有变量和对象会冻结在当前状态。等到对它执行 `next` 命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。
