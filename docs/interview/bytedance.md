---
title: 字节跳动
date: 2021.04.08 23:00:00
sidebar: false
categories:
  - Interview
tags:
  - Interview
---

# 一面

1. 自我介绍，聊项目
2. js数据类型
3. 原型继承和原型链
4. 事件循环机制，绑定的事件在哪个环节执行
5. css水平垂直居中
6. css实现扇形
7. vue的diff算法
8. http请求头都有哪些，都有什么作用
9. 前端用到的缓存，知道多少说多少
10. 读程序，聊函数提升

```js
var a = 1;
function b() {
  a = 10;
  return;
  function a() { }
}
b();
console.log(a);
```

11.  promise.all 实现

```js
function all(promises) {
  return new Promise((resolve, reject) => {
    const result = [];
    for (let i = 0, l = promises.length; i < l; i++) {
      const p = promises[i];
      p.then(resp => {
        result.push(resp);
        if (result.length === l) {
          resolve(result);
        }
      }).catch(err => {
        reject(err);
      })
    }
  })
}
```

12.   用数组的reduce方法实现map方法

```js
Array.prototype._map = function _map(fn) {
  const array = this;
  if (array.length === 0) {
    return;
  }
  let index = 0;
  array.reduce((pre, cur) => {
    fn(cur, index, array);
    index += 1;
  }, array[0])
};
```

# 二面

1. 自我介绍，聊项目，聊前端制定规范的细节
2. 登录和退出登录的原理，为什么后来用storage来存token
3. 前端安全
4. 聊 React 类组件和函数组件创建组件的区别
5. 聊 JSX
6. 聊 React Hooks 原理
7. 读程序

```js
function Foo() {
    this.getName = function(){ alert(1); };
    return this;
}
Foo.getName = function() { alert(2); };
Foo.prototype.getName = function(){ alert(3); };
var getName = function() { alert(4); };
function getName(){ alert(5); };

Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new (Foo.getName)(); //  2
(new Foo()).getName(); // 1
```

8. 写代码：实现一个 fetchLimit

```ts
function get(url) : Promise<string> {}
function fetchLimit(urls, limit, timeout): Promise<string[]> {
}
```

```js
function fetch(url) {
    return Promise.resolve(url);
}
// 没写完
function fetchLimit(urls, limit, timeout) {
    return new Promise((resolve, reject) => {
        const len = urls.length;
        const result = new Array(len);
        let count = 0;

        function request() {
            const index = len - urls.length - 1;
            if(urls.length === 0) {
                return;
            }
            const url = urls.shift();
            fetch(url).then(resp=>{
                result[index] = resp;
                if(++count === len){
                    resolve(result);
                } else {
                  request();
                }
            }).catch(err=>{
                reject(err);
            })
        }

        for(let i = 0; i < limit; i++) {
            request();
        }
    })
}
```
