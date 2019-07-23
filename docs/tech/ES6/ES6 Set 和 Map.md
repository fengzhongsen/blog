---
title: 【ES6】Set 和 Map
date: 2018.11.15 12:00:00
categories:
  - 技术篇
tags:
  - 前端
  - JavaScript
  - ES6
---

## 一、Set
1. `Set` 函数可以接受一个数组（或者具有 `iterable` 接口的其他数据结构）作为参数，用来初始化。
2. 在 `Set` 内部，两个NaN是相等，两个对象总是不相等的。
3. 四个操作方法：`add`、`delete`、`has`、`clear`。
4. 四个遍历方法：`keys`、`values`、`entries`、`forEach`。
5. `Array.from` 方法可以将 `Set` 结构转为数组。
6. 扩展运算符（`...`）内部使用 `for…of` 循环。

## 二、Map
1. 存储键值对，键可以是任意类型，包括 `undefined`、`null`、`NaN`、`对象`。
2. `new Map()` 接受 `[[key, value], [key, value]]` 模式的数组作为参数。
3. 五个操作方法：`set`、`get`、`has`、`delete`、`clear`。
4. 四个遍历方法：`keys`、`values`、`entries`、`forEach`。

::: tip Set 和 Map 的共同点
在Set 和 Map 中，“认为 NaN 和 NaN 是严格相等的”
:::

## 三、WeakSet
1. `WeakSet` 的成员只能是对象，而不能是其他类型的值。
2. `WeakSet` 可以接受一个 `[[key, value], [key, value]]` 模式的数组或类似数组的对象作为参数。
4. 四个操作方法：`add()`、`has()`、`delete()`。

## 四、WeakMap
1. `WeakMap` 只接受对象作为键名（`null` 除外），不接受其他类型的值作为键名。
2. 【重点】`WeakMap` 的键名所指向的对象，不计入垃圾回收机制。
3. 没有遍历操作（即没有 `keys()`、`values()` 和 `entries()` 方法），也没有 `size` 属性。
4. 四个操作方法：`get()`、`set()`、`has()`、`delete()`。

::: WeakSet 和 WeakMap 的共同点
没有遍历操作，没有 size 属性，没有 clear 方法，键名不计入垃圾回收机制
:::