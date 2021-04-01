---
title: React
date: 2021.03.26 20:00:00
categories:
  - FrontEnd
tags:
  - React
---

React 是一个优秀前端框架的典型，它在架构上融合了数据驱动视图、组件化、函数式编程、面向对象、Fiber 等经典设计“哲学”，在底层技术选型上涉及了 JSX、虚拟 DOM 等经典解决方案，在周边生态上至少涵盖了状态管理和前端路由两大领域的最佳实践。此外，它还自建了状态管理机制与事件系统，创造性地在前端框架中引入了 Hooks 思想等。

<!-- more -->

# 一、聊聊 JSX

1. 定义：JSX 是 JavaScript 的一种语法扩展，它和模板语言很接近，但是它充分具备 JavaScript 的能力
2. 作用：降低学习成本，提高开发体验和效率
3. 工作流程：JSX 会被 Babel 编译为 `React.createElement()`，`React.createElement()`将返回一个 ReactElement 的 JS 对象。即虚拟 DOM 的一个节点
4. `createElement` API 和 `ReactElement()` 构造函数的关系：`createElement(type, config, ...children)`，接收三个参数，type 可能是原生 HTML 标签字符串，也可能是 React Component 类型 或 React Fragment 类型，其中首先从 `config` 中提取出 `ref`、`key`、`source`、`__self`、`props` 等信息，其次是通过遍历 `type.defaultProps` 属性，对 `props` 设置默认值，最后将 `ref`、`key`、`source`、`__self`、`props` 等传递给 `ReactElement()` 构造函数生成 ReactElement 对象
5. 补充：虚拟 DOM 与真实 DOM 的链接者就是 `ReactDOM.render()`
```js
ReactDOM.render(
  element, // 需要渲染的元素（ReactElement）
  container, // 元素挂载的目标容器（一个真实DOM）
  [callback], // 回调函数，可选参数，可以用来处理渲染结束后的逻辑
)
```

# 二、设计理念

## 2.1 虚拟 DOM

1. 组件初始化：通过生命周期中的 render 方法生成虚拟 DOM，再通过 ReactDOM.render 实现虚拟 DOM 到真实 DOM 的转换
2. 组件更新时：通过生命周期中的 render 方法生成**新的虚拟 DOM**，再通过 diff 算法定位出两次虚拟 DOM 的差异，针对变化的真实 DOM 作定向更新

## 2.2 组件化

1. 封闭：每个组件内部只处理它内部的渲染逻辑，没有数据交互的情况下各自为政
2. 开放：基于“单向数据流”原则完成组件间通信，对渲染结果构成影响

## 2.3 生命周期

1. 灵魂：render 函数是 React 的“灵魂”，组件的初始化和更新都离不开 render
2. 躯干：生命周期函数是 React 的”躯干”，与 render 一起构成了 React 的“生命时间轴”

# 三、生命周期

## 3.1 React 15 生命周期函数

1. 组件挂载（初始化渲染）：`constructor()`>`componentWillMount`>`render()`>`componentDidMount()`
2. 组件更新（由父组件触发）：`componentWillReceiveProps()`>`shouldComponentUpdate()`>`componentWillUpdate()`><br/>
   `render()`>`componentDidUpdate()`
3. 组件更新（由自身触发）：`shouldComponentUpdate()`>`componentWillUpdate()`>`render()`>`componentDidUpdate()`
4. 组件卸载：`componentWillUnmount()`

> 注意：
> 1. `componentWillReceiveProps(nextProps)`，无论`props`有无变化，只要父组件更新，就会触发
> 2. `shouldComponentUpdate(nextProps, nextState)`，默认返回`true`，通过逻辑判断返回`false`阻止重新渲染，达到优化的目的，也可以使用`PureComponent`代替`Component`来实现“有条件的 re-render”
> 3. `componentWillUnmount()`，在父组件中被移除会触发，此外如果组件设置了 key，在父组件 render 过程中发现 key 值和上次不一致也会被卸载

## 3.2 React 16 生命周期函数

1. 组件挂载（初始化渲染）：`constructor()`>`static getDerivedStateFromProps()`>`render()`>`componentDidMount()`
2. 组件更新：`static getDerivedStateFromProps()`>`shouldComponentUpdate()`>`render()`><br/>
   `getSnapshotBeforeUpdate()`>`componentDidUpdate()`
3. 组件卸载：`componentWillUnmount()`

::: tip
### `static getDerivedStateFromProps(props, state)`

1. 接收两个参数分别代表来自父组件的`props`和自身的`state`，使用`props`来派生/更新`state`
2. 返回值之所以不可或缺，因为 React 需要用这个返回值来派生/更新组件的`state`。返回值对`state`的更新动作并非“覆盖”式的，而是针对某个属性的定向更新
3. 静态方法，内部不能访问 `this`
4. 意义：确保生命周期函数的行为更加可控可预测，从根源上帮开发者避免不合理的编程方式，避免生命周期的滥用（类似于`this.fetch()`、`this.setState`等可能会产生副作用的操作）；同时，也是在为新的 Fiber 架构铺路
:::

::: tip
### `getSnapshotBeforeUpdate(prevProps, prevState)`

1. 执行时机是在`render()`方法之后，真实 DOM 更新之前，可以同时获取到更新前的真实DOM和更新后的`state``props`信息
2. 返回值会作为第三个参数给到`componentDidUpdate(prevProps, prevState, valueFromSnapshot)`
3. 要想发挥作用，必须配合`componentDidUpdate()`使用
:::

> 注意：
> 1. React 16 之前`render()`只允许返回单个元素，而 React 16 可以返回数组和字符串
> 2. 废弃了`componentWillMount()`、`componentWillReceiveProps()`、`componentWillUpdate()`
> 3. 新增了`static getDerivedStateFromProps()`、`getSnapshotBeforeUpdate()`
> 4. 更新流程中，在 v16.3 版本时，只有父组件的更新才会触发`static getDerivedStateFromProps()`，在 v16.4 中，任何因素触发的组件更新流程（包括由`this.setState`和`forceUpdate`触发的更新流程）都会触发

## 3.3 Fiber 架构

1. React 16 改造生命周期的主要动机是为了配合 Fiber 架构带来的异步渲染机制
2. Fiber 会使原本同步的渲染过程变成异步的
3. Fiber 会将一个大的更新任务拆解为许多个小任务。每当执行完一个小任务时，渲染线程都会把主线程交回去，看看有没有优先级更高的工作要处理
4. 在 Fiber 机制下，render 阶段是允许暂停、终止和重启的，而且重启是重头执行的。`componentWillMount()`、`componentWillReceiveProps()`、`componentWillUpdate()`都处在render阶段，风险很大

# 四、组件通信

1. 组件：从概念上类似于JavaScript函数，它接受任意的入参（即`props`），并返回用于描述页面展示内容的React元素
2. 单向数据流：当组件的`state`以`props`的形式流动时，只能流向组件树中比自己层级更低的组件。只能从父到子，不能反过来
3. 父-子组件通信：`props`
4. 子-父组件通信：通过在`props`上传入函数，例如`onClick`
5. 兄弟组件通信：通过父组件作为中介者
6. 结偶的通信方式：发布-订阅模式，EventEmitter
7. Context API
8. Redux

# 五、Hooks

## 5.1 类组件和函数组件

### 类组件

1. 面向对象编程
2. 重

### 函数组件

1. 函数式编程
2. 轻

### 差异

1. 类组件需要继承 class，函数组件不能
2. 类组件可以访问生命周期方法，函数组件不能
3. 类组件可以获取到实例化后的 this，并基于这个this做各种事情，二函数组件不能
4. 类组件中可以定义并维护state（状态），而函数组件不可以
5. ......

## React-Hooks

1. 函数组件会捕获 render 内部的状态，这是两类组件最大的不同。所以函数组件更符合React的设计理念
2. React-Hooks 强化了函数组件的能力，帮助函数组件补全了生命周期、`state`管理等能力
3. 可以灵活定制

### 为什么选择 React-Hooks

1. 告别难以理解的 Class。比如 this 和 生命周期函数
2. 解决业务逻辑难以拆分的问题。比如在class组件里，订阅和卸载订阅这一组逻辑会分布在didMound 和 willUnmount 两个生命周期中。useEffect 则可以分组放在一起
3. 使状态逻辑复用变得简单可行
4. 函数组件设计思想上来看，更加契合React的理念

### 局限性

1. 尚未补齐类组件的全部能力，比如 getSnapshotBeforeUpdate、componentDidCatch
2. 在业务复杂的情况啊集，耦合内聚的边界很难把握
3. 有着严格的规则约束

### 使用原则

1. 只在 React 函数中调用 Hook
2. 不在循环、条件或嵌套函数中调用 Hook

### 原理

1. 首次渲染：`useState`>`mountState`>返回目标数组(如[state, setState]);
2. 更新阶段：`useState`>`updateState`>返回目标数组(如[state, setState]);

底层实现依赖于顺序链表。mountState（首次渲染）构建链表并渲染；updateState 依次遍历链表并渲染。

# 六、虚拟 DOM

1. 定义：虚拟 DOM 本质是 JS 和 DOM 之间的一个映射缓存，它在形态上表现为一个能够描述 DOM 结构及其属性信息的 JS 对象。
2. 工作：组件初始化：通过生命周期中的 render 方法生成虚拟 DOM，再通过 ReactDOM.render 实现虚拟 DOM 到真实 DOM 的转换。组件更新时：通过生命周期中的 render 方法生成**新的虚拟 DOM**，再通过 diff 算法定位出两次虚拟 DOM 的差异，针对变化的真实 DOM 作定向更新。
3. 优劣：优势在于减少了DOM操作，劣势在于JS大量的计算非常耗时。因为DOM操作和JS计算的能耗不在一个量级，所以说在一般的场景下，虚拟DOM是具有性能优势的。
4. 价值：提高了开发体验和效率，虚拟DOM的概念被应用到各个前端的框架。

# 七、Diff

## React 15 的栈调和算法

1. 分层对比；
2. 类型一致才有继续Diff的必要；
3. key属性的设置，尽可能重用节点。

# 八、setState 同步还是异步

setState 并不是单纯同步/异步的，它的表现会因调用场景的不同而不同：在 React 钩子函数及合成事件中，它表现为异步；而在 setTimeout、setInterval 等函数中，包括DOM原生事件中，它都表现为同步。这种差异，本质上是由React事务机制和批量更新机制的工作方式决定的。

# 九、Fiber

特点：可中断、可恢复、优先级

# 十、Redux

## 10.1 认识 Flux

Flux 不是一个具体的框架，是由 Facebook 技术团队提出的应用架构，这套架构约束的是**“应用处理数据的模式”**。

# 十一、ReactRouter

```js
window.addEventListener('hashchange', function(e) {
  console.log(e)
});
window.addEventListener('popstate', function(e) {
  console.log(e)
});
```
# 十二、性能优化

1. 使用 shouldComponentUpdate 规避冗余的更新逻辑
2. PureComponent + Immutable.js
3. React.memo 与 useMemo

## 12.1 shouldComponentUpdate

1. 返回 false 阻止更新
2. 可以比较 props，也可以比较 state

```js
import React from "react";
export default class Child extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // 判断 text 属性在父组件更新前后有没有发生变化，若没有发生变化，则返回 false
    if(nextProps.text === this.props.text) {
      return false
    }
    // 只有在 text 属性值确实发生变化时，才允许更新进行下去
    return true
  }

  render() {
    return (
      <div>
        {this.props.text}
      </div>
    );
  }
}

```

## 12.2 PureComponent + Immutable.js

1. 无须手写`shouldComponentUpdate`，对组件更新前后的`props`和`state`进行浅比较。
2. Immutable，我们对当前数据的任何修改动作，都会导致一个新的对象的返回。

```js
import React from "react";
export default class Child extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.text}
      </div>
    );
  }
}
```

```js
import { Map } from 'immutable';
const baseMap = Map({
  name: '修言',
  career: '前端',
  age: 99
});
const changedMap = baseMap.set({
  age: 100
});
console.log('baseMap === changedMap', baseMap === changedMap); // false
```

## 12.3 React.memo

1. 将在`shouldComponentUpdate`里边做的事情，放到`areEqual`里边。
2. 当`areEqual`不传的时候会对`props`执行浅比较。但不会感知`state`的变化。

```js
import React from "react";
// 将 Child 改写为 function 组件
function Child(props) {
  return (
    <div>
      {props.text}
    </div>
  );
}
// areEqual 用于对比 props 的变化
function areEqual(prevProps, nextProps) {
  if(prevProps.text === nextProps.text) {
    return true;
  }
  return false;
}
// 使用 React.memo 来包装 ChildB
export default React.memo(Child, areEqual);
```

## 12.4 useMemo

1. 精细的控制部分逻辑的重渲染。
2. 如下`props.text`的改变不会触发`renderCount`。

```js
function ChildB({ text, count }) {
  const renderText = (text) => {
    return <p>{text}</p>;
  }
  const renderCount = (count) => {
    return <p>{count}</p>;
  }
  const textContent = useMemo(() => renderText(text), [text])
  const countContent = useMemo(() => renderCount(count), [count])
  return (
    <div className="childB">
      {textContent}
      {countContent}
    </div>
  );
}
```

# 十三、设计模式

## 13.1 高阶组件(HOC)

高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。——React 官方

```js
function checkUserAccess() {
  return true;
}
const withCheckAccess = (WrappedComponent) => {
  // Do some common logic
  const isAccessible = checkUserAccess();
  const targetComponent = (props) => (
    <div className="childC">
      <WrappedComponent {...props} isAccessible={isAccessible} />
    </div>
  )
  return targetComponent;
}
const ChildC = withCheckAccess(ChildB);
```

## 13.2 Render Props

术语“render prop”是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术。——React 官方
