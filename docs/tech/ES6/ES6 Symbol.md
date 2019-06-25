---
title: 【ES6】Symbol
date: 2018-11-17 12:00:00
categories:
  - 技术篇
tags:
  - 前端
  - JavaScript
  - ES6
---

1. `ES6` 中定义了第七种数据类型 `Symbol` ，使用 `Symbol(“description”)` 进行定义，`description` 字符串用来描述当前值，可以不传。
2. `Symbol` 定义的值是独一无二的，相同参数的 `Symbol` 函数的返回值也是不相等的。
3. 如果 `Symbol` 的参数是一个对象，就会调用该对象的 `toString` 方法，将其转为字符串，然后才生成一个 `Symbol` 值。
4. `Symbol` 值可以显式的转换成 `String` 和 `Boolean`，但是不能转换成 `Number`，也不能进行计算。
5. `Symbol` 值作为对象属性名时，不能用点运算符，必须放在方括号之中。
6. `Symbol` 作为属性名，该属性不会出现在 `for...in`、`for...of` 循环中，也不会被 `Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()` 返回。但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols` 方法，可以获取指定对象的所有 `Symbol` 属性名。
7. 另一个新的 `API`，`Reflect.ownKeys` 方法可以返回所有类型的键名，包括常规键名和 `Symbol` 键名。