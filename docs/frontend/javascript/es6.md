---
title: ES6 笔记
date: 2018.11.22 12:00:00
categories:
  - 前端
tags:
  - JavaScript
---

## 一、let 与 const

### 1.1 let
1. 不存在变量提升：必须先申明再使用。
2. 只在声明所在的块级作用域内有效，存在暂时性死区：只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。
3. 不允许重复申明：`let` 不允许在相同作用域内，重复声明同一个变量。
4. 块级作用域：在块级作用域中申明函数，相当于用 `var` 申明变量，会出现“变量提升”的现象。

### 1.2 const
1. `const` 和 `let` 的上述性质一样。
2. `const` 只能定义常量（必须初始化）。
3. `const` 定义的常量所指向的地址不可更改，但是地址里的内容是可以变得。
4. 可以使用 `Object.freeze()` 方法冻结对象。

## 二、Async

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

## 三、Class

### 3.1 ES5
1. 在实例中定义了与原型同名的属性，只是阻断了对原型中属性的访问，而并没有也不能修改原型中的属性。
2. 在 `for-in` 循环时，返回“可枚举”的属性，不管在实例中还是原型中。第一，根据规定，所有开发人员定义的属性都是可枚举的。第二、数据属性 `[[Enumerable]]` 为 `false`的属性都是不可枚举的。第三、默认不可枚举的属性和方法有：`constructor`、`prototype`、`hasOwnProperty()`、`propertyIsEnumerable()`、`toLocaleString()`、`toString()`、`valueOf()`，即这些方法的数据属性 `[[Enumerable]]` 默认为 `false`。
3. 无论属性存在于实例还是存在于原型中，使用 `in` 都会返回 `true`，但是 `hasOwnProperty` 方法只有在属性存在于 实例中才返回 `true`，那么结合这两个方法就能判断 属性是不是存在于原型中。

### 3.2 ES6
1. 类的内部所有定义的方法，都是不可枚举的（`non-enumerable`），但是可以将方法定义在 `constructor` 内就可以枚举了。也就是说 定义在 `class` 内（`construct` 外）的方法 都相当于定义在 ES5 中 构造函数 `Function.prototype` 里的，而定义在 `construct` 里的属性和方法都是 属于 `new` 出来的实例本身具有的属性和方法。说白了跟 ES5 还是“一模一样”的。
2. 必须使用 `new` 方法调用，否则会报错。这样比 ES5 更安全（ES5 的构造函数就是普通函数，直接调用的话，里边的 `this` 就指向了 全局，极有可能污染全局变量）。
3. 采用 `Class` 表达式，可以写出立即执行的 `Class`。
4. 类的定义不存在变量提升。
5. 关于设定私有属性，我推荐利用 `Symbol` 值的唯一性，将私有方法的名字命名为一个 `Symbol` 值。（不推荐 ES5 的骚操作，新的提案暂时忽略）
6. (1)类的方法内部如果含有 `this`，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。(2)一个比较简单的解决方法是，在构造方法中绑定 `this`，另一种解决方法是使用箭头函数。还有一种解决方法是使用 `Proxy`，获取方法的时候，自动绑定 `this`。
7. 由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被 `Class` 继承，包括 `name` 属性。
8. (1)如果在一个方法前，加上 `static` 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。(2)静态方法包含的 `this` 关键字指的是类。(3)静态方法可以与非静态方法重名。(4)父类的静态方法，可以被子类继承。静态方法也是可以从 `super` 对象上调用的。
9. `Class` 内部调用 `new.target`，返回当前 `Class`。需要注意的是，子类继承父类时，`new.target` 会返回子类。

### 3.3 Class 的继承
1. 子类必须在 `constructor` 方法中调用 `super` 方法，否则新建实例时会报错。这是因为子类自己的 `this` 对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用`super` 方法，子类就得不到 `this` 对象。
2. `Object.getPrototypeOf` 方法可以用来从子类上获取父类。
3. `super` 虽然代表了父类的构造函数，但是返回的是子类的实例。
4. `super` 这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。
5. `super` 作为函数调用时，代表父类的构造函数。并且只能用在子类的构造函数之中。
6. `super` 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
7. 由于对象总是继承其他对象的，所以可以在任意一个对象中，使用 `super` 关键字。
8. 子类的 `__proto__` 属性，表示构造函数的继承，总是指向父类。
9. 子类 `prototype` 属性的 `__proto__` 属性，表示方法的继承，总是指向父类的 `prototype` 属性。
10. 子类实例的 `__proto__` 属性的 `__proto__` 属性，指向父类实例的 `__proto__` 属性。也就是说，子类的原型的原型，是父类的原型。
11. ES5 不能实现原生构造函数的继承，ES6 的 `extends` 可以。

## 四、Generator

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

## 五、Iterator

1. 遍历器是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 `Iterator` 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
2. `Iterator` 的三个作用：<br>
    (1)为各种数据结构提供统一的访问接口。<br>
    (2)使数据结构的成员能够按照某种次序排列。<br>
    (3)供 `for…of` 消费。<br>

3. 遍历器对象本质上，就是一个指针对象。
4. 由于 `Iterator` 只是把接口规格加到数据结构之上，所以，遍历器与它所遍历的那个数据结构，实际上是分开的，完全可以写出没有对应数据结构的遍历器对象，或者说用遍历器对象模拟出数据结构。
5. 一种数据结构只要部署了 `Iterator` 接口，我们就称这种数据结构是“可遍历的”（iterable）。
6. 对于类似数组的对象（存在数值键名和 `length` 属性），部署 `Iterator` 接口，有一个简便方法，就是 `Symbol.iterator` 方法直接引用数组的 `Iterator` 接口。

7. `Iterator` 的应用场景：<br>
    (1)解构赋值：对 `数组` 和 `Set` 结构进行解构赋值时，会默认调用 `Symbol.iterator` 方法。<br>
    (2)扩展运算符：扩展运算符（`...`）也会调用默认的 `Iterator` 接口。<br>
    (3)`yield*`：`yield*` 后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。<br>
    (4)任何接受数组作为参数的场合，其实都调用了遍历器接口。`for…of`、`Array.from()`、`Map()`、 `Set()`、 `WeakMap()`、 `WeakSet()`、`Promise.all()`、`Promise.race()`。<br>

8. 可以覆盖原生的 `Symbol.iterator` 方法，达到修改遍历器行为的目的。
9. 遍历器的 `return` 方法有点像 `try - catch -finally` 中的 `finally`。
10. `for…of` 循环可以代替数组实例的 `forEach`方法。
11. `JavaScript` 原有的 `for…in` 循环，只能获得对象的键名，不能直接获取键值。ES6 提供 `for...of` 循环，允许遍历获得键值。
12. `for…of` 循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟 `for…in` 循环也不一样。
13. 计算 `set` 时 返回一个值，计算 `map` 时返回一个数组，保存键和值。
14. ES6 的数组、`Set`、`Map` 都部署了 `entries()`、`keys()`、`values()` 三个方法，但是 `Set` 的后两个方法效果一模一样。
15. `for…of` 还可以用于循环字符串、`DOM NodeList` 对象、`arguments` 对象这些类似数组结构的数据。
16. 对于字符串来说，`for…of` 循环还有一个特点，就是会正确识别 `32` 位 `UTF-16` 字符。
17. `for…in` 循环主要是为遍历对象而设计的，不适用于遍历数组。因为 `for…in` 循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
18. `for…of` 可以与 `break`、`continue` 和 `return` 配合使用。可以摒弃 `forEach` 了。舒服！

## 六、Promise

### 6.1 Example1
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

### 6.2 Example2
```js
const p1 = Promise.all([p1, p2, p3]);
const p2 = Promise.race([p1, p2, p3]);
```

1. `Promise.all`：只有 `p1`、`p2`、`p3` 的状态都变成 `fulfilled`，`p1` 的状态才会变成 `fulfilled`，此时`p1`、`p2`、`p3` 的返回值组成一个数组，传递给 `p1` 的回调函数。
2. `Promise.race`：只要 `p1`、`p2`、`p3`之中有一个被 `rejected`，`p1` 的状态就变成 `rejected`，此时第一个被 `reject`的实例的返回值，会传递给p2的回调函数。
3. 只要 `p1`、`p2`、`p3` 之中有一个实例率先改变状态，`p2`的状态就跟着改变。那个率先改变的 `Promise` 实例的返回值，就传递给 `p2` 的回调函数。

### 6.3 Example3
```js
Promise.try(database.users.get({id: userId})).then(...).catch(...)
```

1. `Promise.try`：同步代码同步执行，异步代码异步执行，异常也已在 `catch` 函数中捕获。
2. `Promise.try` 就是模拟 `try` 代码块，就像 `promise.catch` 模拟的是 `catch` 代码块。

## 七、Symbol

1. `ES6` 中定义了第七种数据类型 `Symbol` ，使用 `Symbol(“description”)` 进行定义，`description` 字符串用来描述当前值，可以不传。
2. `Symbol` 定义的值是独一无二的，相同参数的 `Symbol` 函数的返回值也是不相等的。
3. 如果 `Symbol` 的参数是一个对象，就会调用该对象的 `toString` 方法，将其转为字符串，然后才生成一个 `Symbol` 值。
4. `Symbol` 值可以显式的转换成 `String` 和 `Boolean`，但是不能转换成 `Number`，也不能进行计算。
5. `Symbol` 值作为对象属性名时，不能用点运算符，必须放在方括号之中。
6. `Symbol` 作为属性名，该属性不会出现在 `for...in`、`for...of` 循环中，也不会被 `Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()` 返回。但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols` 方法，可以获取指定对象的所有 `Symbol` 属性名。
7. 另一个新的 `API`，`Reflect.ownKeys` 方法可以返回所有类型的键名，包括常规键名和 `Symbol` 键名。

## 八、Set Map WeakSet WeakMap

### 8.1 Set
1. `Set` 函数可以接受一个数组（或者具有 `iterable` 接口的其他数据结构）作为参数，用来初始化。
2. 在 `Set` 内部，两个NaN是相等，两个对象总是不相等的。
3. 四个操作方法：`add`、`delete`、`has`、`clear`。
4. 四个遍历方法：`keys`、`values`、`entries`、`forEach`。
5. `Array.from` 方法可以将 `Set` 结构转为数组。
6. 扩展运算符（`...`）内部使用 `for…of` 循环。

### 8.2 Map
1. 存储键值对，键可以是任意类型，包括 `undefined`、`null`、`NaN`、`对象`。
2. `new Map()` 接受 `[[key, value], [key, value]]` 模式的数组作为参数。
3. 五个操作方法：`set`、`get`、`has`、`delete`、`clear`。
4. 四个遍历方法：`keys`、`values`、`entries`、`forEach`。

::: tip Set 和 Map 的共同点
在Set 和 Map 中，“认为 NaN 和 NaN 是严格相等的”
:::

### 8.3 WeakSet
1. `WeakSet` 的成员只能是对象，而不能是其他类型的值。
2. `WeakSet` 可以接受一个 `[[key, value], [key, value]]` 模式的数组或类似数组的对象作为参数。
4. 四个操作方法：`add()`、`has()`、`delete()`。

### 8.4 WeakMap
1. `WeakMap` 只接受对象作为键名（`null` 除外），不接受其他类型的值作为键名。
2. 【重点】`WeakMap` 的键名所指向的对象，不计入垃圾回收机制。
3. 没有遍历操作（即没有 `keys()`、`values()` 和 `entries()` 方法），也没有 `size` 属性。
4. 四个操作方法：`get()`、`set()`、`has()`、`delete()`。

::: WeakSet 和 WeakMap 的共同点
没有遍历操作，没有 size 属性，没有 clear 方法，键名不计入垃圾回收机制
:::

## 九、编程风格

1. 建议不再使用 `var` 命令，而是使用 `let` 命令取代。 在 `let` 和 `const` 之间，建议优先使用 `const`，尤其是在全局环境，不应该设置变量，只应设置常量。
2. 静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。
3. 单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写。
4. 使用扩展运算符（`...`）拷贝数组。使用 `Array.from` 方法，将类似数组的对象转为数组。
5. 简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。
6. 只有模拟现实世界的实体对象时，才使用 `Object`。如果只是需要 `key: value` 的数据结构，使用 `Map` 结构。因为 `Map` 有内建的遍历机制。
7. 如果模块默认输出一个函数，函数名的首字母应该小写。如果模块默认输出一个对象，对象名的首字母应该大写。