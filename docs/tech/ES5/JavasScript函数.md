---
title: 【ES5】JavaScript 函数
date: 2017.07.04 12:00:00
categories:
  - 技术篇
tags:
  - 前端
  - JavaScript
  - ES5
---

## 一、几个概念
1. 函数声明
2. 函数表达式：实质是一个匿名函数，可以存储在变量中;
```js
var x = function (a, b) {return a * b};
```

3. 构造函数
```js
var myFunction = new Function("a", "b", "return a * b");
```

4. 函数提升：类似于变量提升，即函数可以先调用后声明。
5. 自调用函数：匿名函数自我调用
```js
(function() { return "Hello!";})()
```

6. 函数是对象
```js
function myFunction(a, b) {return arguments.length;}  // 返回函数参数个数
```

## 二、函数参数
1. 分为显式参数和隐式参数
2. 通过值传递参数：获取参数的值，在函数内改变参数值，对函数外不可见，即不会修改显式参数的初始值。
3. 通过对象传递参数：引用对象的值，在函数内部修改对象的属性就会修改其初始的值，对函数外可见

## 三、函数调用
1. 全局对象
```js
function myFunction() {
    return this;
}
myFunction();                // 返回 window 对象，[object Window]
```

2. 函数作为方法调用
```js
var myObject = {
    firstName:"John",
    lastName: "Doe",
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
}
myObject.fullName();         // 返回 "John Doe"

var myObject = {
    firstName:"John",
    lastName: "Doe",
    fullName: function () {
        return this;
    }
}
myObject.fullName();          // 返回 [object Object] (所有者对象)
```

3. 使用构造函数调用函数
```js
// 构造函数:
function myFunction(arg1, arg2) {
    this.firstName = arg1;
    this.lastName  = arg2;
}
 
// 创建一个新对象
var x = new myFunction("John","Doe");
x.firstName;  // 返回 "John"
```

4. 作为函数方法调用函数
```js
function myFunction(a, b) {
    return a * b;
}
myObject = myFunction.call(myObject, 10, 2);     // 返回 20

function myFunction(a, b) {
    return a * b;
}
myArray = [10, 2];
myObject = myFunction.apply(myObject, myArray);  // 返回 20
```

::: tip
apply 传入的是一个参数数组，而 call 则作为 call 的参数传入（从第二个参数开始）。
:::

### 四、闭包
```js
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
}
var myFunc = makeFunc();
myFunc();
```

myFunc 变成一个闭包了。闭包是一种特殊的对象。它由两部分构成：函数以及创建该函数的环境。环境由闭包创建时在作用域中的任何局部变量组成。在我们的例子中，myFunc 是一个闭包，由 `displayName` 函数和闭包创建时存在的 `"Mozilla"` 字符串形成。
例：
```js
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}
var add5 = makeAdder(5);
var add10 = makeAdder(10);
console.log(add5(2));  // 7
console.log(add10(2)); // 12
```