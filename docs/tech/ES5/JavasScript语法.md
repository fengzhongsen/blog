---
title: 【ES5】JavaScript 语法
date: 2017-07-03 12:00:00
categories:
  - 技术篇
tags:
  - 前端
  - JavaScript
  - ES5
---

## 一、JS输出
1. `window.alrt()`
2. `document.write()`
3. `innerHTML = ''`
4. `console.log()`

::: tip
JavaScript 是脚本语言。浏览器会在读取代码时，逐行地执行脚本代码。而对于传统编程来说，会在执行前对所有代码进行编译。
:::

## 二、变量
1. `var firefly;` // firefly 在使用前，她的值就是 `undefined`。
2. `var firefly = 'Mandy Wang'; var firefly;` // 重新定义后 firefly 的值依然是 `Mandy Wang`。

## 三、数据类型（typeof）
1. 字符串（string），
2. 数字（number），
3. 布尔（boolean），
4. 未定义（undefined），
5. 对象（object）{对象（Object），数组（Array），日期（Date），空（null）}
6. 方法（function）

## 四、Undefined 和 Null 的区别
```js
typeof undefined             // undefined
typeof null                  // object
null === undefined           // false
null == undefined            // true
```

## 五、constructor
1. `constructor` 属性返回所有 `JavaScript` 变量的构造函数。
```js
"John".constructor                 // 返回函数 String()  { [native code] }
(3.14).constructor                 // 返回函数 Number()  { [native code] }
false.constructor                  // 返回函数 Boolean() { [native code] }
[1,2,3,4].constructor              // 返回函数 Array()   { [native code] }
{name:'John', age:34}.constructor  // 返回函数 Object()  { [native code] }
new Date().constructor             // 返回函数 Date()    { [native code] }
function () {}.constructor         // 返回函数 Function(){ [native code] }
```

2. 判断对象是否为数组
```js
function isArray(myArray) {
    return myArray.constructor.toString().indexOf("Array") > -1;
}
```

## 六、类型转换
```js
var a = 0
```

1. 转换为String的两种方法：
```js
String(a)
a.toString()
```

2. 转换为数字的三种方法：
```js
// 1. Number(a)
Number("3.14")    // 返回 3.14
Number(" ")       // 返回 0 
Number("")        // 返回 0
Number("99 88")   // 返回 NaN
Number(false)     // 返回 0
Number(true)      // 返回 1

// 2. parseInt(a)
// 3. parseFloat(a)
```

3. 一元运算符 `+`
```js
var y = "5";      // y 是一个字符串
var x = + y;      // x 是一个数字
```

## 七、作用域
1. 局部变量：在函数中通过var声明的变量。
2. 全局变量：在函数外通过var声明的变量。
3. 没有声明就使用的变量，默认为全局变量，不论这个变量在哪被使用。

```js
// 此处可调用 carName 变量（变量提升）
function myFunction() {
    carName = "Volvo";
    // 此处可调用 carName 变量
}
```

## 八、运算符
```js
var result1 = 5+5+"abc";    //结果将是"10abc"
var result2 = ""+5+5+"abc"; //结果将是"55abc"

// 空文本 + 数字得到的运算结果都是把数字转成字符串，无论文本有多少个空格。
var result1=""+5;           // 得到的结果是"5"
var result2=" "+5;          // 得到的结果是"5"
var result3="       "+5  ;  // 得到的结果是"5"
```

## 九、For/In 循环
```js
var person={fname:"John",lname:"Doe",age:25}; 
for (x in person)
{
    txt=txt + person[x];
}
```

## 十、Break 和 Continue
1. `break` 语句可用于跳出循环。
2. `continue` 语句中断循环中的迭代，然后继续循环中的下一个迭代。

## 十一、Date
```js
var date = new Date()
date.getDate()	              从 Date 对象返回一个月中的某一天 (1 ~ 31)。
date.getDay()	              从 Date 对象返回一周中的某一天 (0 ~ 6)。
date.getFullYear()	      从 Date 对象以四位数字返回年份。
date.getHours()	      返回 Date 对象的小时 (0 ~ 23)。
date.getMilliseconds()   返回 Date 对象的毫秒(0 ~ 999)。
date.getMinutes()	      返回 Date 对象的分钟 (0 ~ 59)。
date.getMonth()	      从 Date 对象返回月份 (0 ~ 11)。
date.getSeconds()	      返回 Date 对象的秒数 (0 ~ 59)。
date.getTime()	 /   Number(date)      返回 1970 年 1 月 1 日至今的毫秒数。
```

## 十二、错误
```js
function myFunction() {
    var message, x;
    message = document.getElementById("message");
    message.innerHTML = "";
    x = document.getElementById("demo").value;
    try { 
        if(x == "")  throw "值为空";
        if(isNaN(x)) throw "不是数字";
        x = Number(x);
        if(x < 5)    throw "太小";
        if(x > 10)   throw "太大";
    }
    catch(err) {
        message.innerHTML = "错误: " + err;
    }
}
```

## 十三、调试
```js
debugger
```

## 十四、JSON
### 14.1 JSON.stringify(value, replacer, space)
1. value：js对象。
2. replacer：替换对象，可以是一个方法、对象或数组，将value按照替换规则展示。
3. space：填充参数，可以是数字或字符串，将value按照参数进行格式化展示。

4. 参数为 `function(key,value)`，会根据函数返回值替换 `value` 中的值。
```js
var testArr = [{  
    name:"张三",  
    age:20,  
    gender:"gril"  
}, {
    name:"李思",  
    age:28,  
    gender:"gril"  
}];

$("#arrTest").text(JSON.stringify(testArr, testReplacer, 4));  

// key 为对象属性名，value 为对象属性值，会遍历 testObj 或 testArr 来执行该函数 
function testReplacer(key, value){ 
    if(key=="gender"){  
        value = value.toUpperCase();  
    }  
    return value;  
}
```

结果：
```js
[{  
    name:"张三",  
    age:20,  
    gender:"GIRL"  
}, {  
    name:"李思",  
    age:28,  
    gender:"GIRL"  
}] 
```

5. 参数为数组时，会遍历数组的值，以数组的值作为 `value` 的属性。如果 `value` 原本包含该属性，那么显示该属性，如果不包含则不显示。
```js
var name = ["name","gril","gender"];          
var testArr = [{  
    name:"张三",  
    age:20,  
    gender:"gril"  
}, {  
    name:"李思",  
    age:28,  
    gender:"gril"  
}]  
$("#arrTest").text(JSON.stringify(testArr, name, '\t'));
```

结果：
```js
[{
    name:"张三",
    gender:"gril"  
}, {  
    name:"李思",  
    gender:"gril"  
}]
```

### 14.2JSON.parse(text[, reviver])
1. text: 必需， 一个有效的 JSON 字符串。
2. reviver: 可选，一个转换结果的函数， 将为对象的每个成员调用此函数。

```js
JSON.parse('{"1": 1, "2": 2, "3": {"4": 4, "5": {"6": 6}}}', (key, value) => {
  console.log(key); // log the current property name, the last is "".
  return value;     // return the unchanged property value.
});
```

结果：
```js
1
2
4
6
5
3 
""
```

## 十五、void
`href="#"` 与 `href="javascript:void(0)"` 的区别？
1. 在页面很长的时候会使用 `#` 来定位页面的具体位置，格式为：`# + id`。
2. 如果你要定义一个死链接请使用 `javascript:void(0)`。

## 十六、代码规范
1. 命名法：推荐驼峰法，因为js其他库都是用驼峰法，还可以使用：下划线命名法(如：`date_of_birth`）或者帕斯卡拼写法（PascalCase）
2. 变量名：变量和函数为驼峰法（`camelCase`），全局变量为大写 (`UPPERCASE`)，常量 (如 `PI`) 为大写 (`UPPERCASE`)
3. 提示：(1)不要以$开头以防一 `JQuery` 冲突；(2)禁止使用短线命名法，防止 `-` 被 `js` 误认为减号。