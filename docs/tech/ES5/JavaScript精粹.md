---
title: 【ES5】JavaScript 精粹
date: 2017-07-06 12:00:00
categories:
  - 技术篇
tags:
  - 前端
  - JavaScript
  - ES5
  - 读书笔记
---

## 一、精华与糟粕
1. 精华：函数、弱类型、动态对象、对象字面量表示法
2. 糟粕：(1)基于全局变量的编程模型; (2)本应该保留而没有保留的（关键字）`undefined`、`NaN`、`Infinity`

## 二、语法
1. 原型继承
2. 无类型（`class-free`）对象系统
3. `NaN` 是一个数值，表示一个不能产生正常结果的运算结果，`NaN` 不等于任何值，包括他本身。
4. `Math.floor(number)` 把一个数字转换成整数。
5. 字符串：两个包含着完全相同的字符且字符顺序也相同的字符串被认为是相同的字符串，所以：`'c' + 'a' + 't' === 'cat'` 
6. 判断语句中的假值：`false`、`null`、`undefined`、`空字符串' '`、`数字0`、`数字NaN`<br>
   判断语句中的真值：`true`、`字符串"false"`、`其他所有值`、`其他所有对象`
7. `switch` 的值可能是 `数字` 或者 `字符串`
8. `try { } catch ( expression ) { }`, 通过 `expression` 接收抛出的异常对象。
9. `JavaScript` 不允许在 `return` 关键字和表达式之间换行。
10. 运算符：`delete`、`new`、`typeof`。
    `typeof` 运算符产生的值：`'number'`、`'string'`、`'boolean'`、`'undefined'`、`'function'`、`'object'`<br>
    如果运算是一个数组或者 `null` ，那么结果是 `'object'`。
11. `/` 运算符可能会产生一个非整数结果，即使两个运算数都是整数。
12. 对象属性名可以是标识符或者字符串。

## 三、对象
1. 值类型：`数字`、`字符串`、`布尔值`、`null`、`undefined`
2. 引用类型：`数组`、`函数`、`正则表达式`、`对象`
3. 对象是属性的容器，每个属性都有名字和值。名字可以是包括空字符串在内的任意字符串，属性值可以使除 `undefined` 值之外的任何值。
4. `||` 运算符可以用来填充默认值
```js
var middle = stooge["middle-name"] || "[none]"
```

5. 尝试从 `undefined` 的成员属性中取值将会导致 `TypeError` 异常，这是可以通过 `&&` 元素安抚来避免错误。
```js
flight.equipment                                   //undefined
flight.equipment.model                             //throw "TypeError"
flight.equipment && flight.equipment.model         //undefined
```

6. 对象通过应用来传递，永远不会被复制
```js
var x = stooge
x.nickname = "Curly"
var nick = stooge..nickname  //因为 x 和 stooge 是指向同一个对象引用，所以nick为“Curly”
var a = {}, b = {}, c = {};  //a, b, c 每个都引用一个不同的空对象。
a = b = c = {};              //a, b, c 都引用同一个空对象。
```

7. 所有通过对象字面量创建的对象都连接到 `Object.prototype`，他是 `JavaScript` 中的标配对象。
8. 原型关系是一种动态关系。如果我们添加一个属性到原型中，该属性会立即对所有基于该原型创建的对象可见。
9. 使用 `hasOwnProperty` 方法检测对象独有的属性
```js
flight.hasOwnProperty("number")              //true
flight.hasOwnProperty("constructor")         //false
```

10. `for in` 用来遍历一个对象中的所有属性名，会列出原型属性在内的所有属性，可以使用 `hasOwnProperty` 方法或者 `typeof` 来排除；
```js
var name;
for ( name in another_stooge ) { 
    if( typeof another_stooge[name] !== 'function' ) { ... }
}

// 列出来的属性名顺序不确定，可以使用数组和for循环处理。
var properties = ['first-name','middle-name','last-name','profession']
for(var i = 0; i<properties;i++){
    document.writeln(properties[i] + ":"+another_stooge[properties[i]])
}
```

11. `delete` 运算符用来删除对象属性，不会触及原型链中任何对象。删除对象属性后可能会使原型链中的属性透现出来。
12. 全局变量会消弱程序的灵活性，应尽量避免使用，最小化的使用全局变量的方法之一是为当前应用创建为一个全局变量。
```js
var APP = {}  //当前应用容器
APP.stooge = { ...... }
APP.flight = { ....... }
```

## 四、函数
1. 对象是“键/值”对的集合并拥有一个连接到原型对象的隐藏连接。对象字面量产生的对象连接到 `Object.prototyoe`。 
2. 函数对象连接到 `Function.prototype`（该源性对象本身连接到 `Object.prototype`）。 
3. 每个函数除了参数列表还会接收两个附加的参数：`this`、`arguments`。参数 `this` 的值取决于调用模式。
4. 在 `JavaScritp` 中一共有四种调用模式：方法调用模式、函数调用模式、构造器调用模式和 `apply` 调用模式。 
5. 形参个数可以与实参个数不配，若发生，长出的参数将被忽略，少了的参数将被设置成 `undefined`。 
6. `arguments` 是一个 `类数组对象`，用来存放参数列表。 
7. `return` 被执行时，函数立即返回。一个函数总有一个返回值，如果没有则返回 `undefined`。
8. `throw` 语句中断函数执行，抛出一个 `exception` 对象 `{name：''，message：''}`。
9. 作用域的好处是函数可以访问定义他们的外部函数的参数和变量，除了 `this` 和 `arguments`。