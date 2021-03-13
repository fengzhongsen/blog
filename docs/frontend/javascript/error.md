---
title: 异常捕获于处理
date: 2018.11.22 12:00:00
categories:
  - FrontEnd
tags:
  - JavaScript
---

## 一、异常分类

1. Error：错误的基类，其他错误都继承自该类型
2. EvalError：Eval函数执行异常
3. RangeError：数组越界
4. ReferenceError：尝试引用一个未被定义的变量时，将会抛出此异常
5. SyntaxError：语法解析不合理
6. TypeError：类型错误，用来表示值的类型非预期类型时发生的错误
7. URIError：以一种错误的方式使用全局 URI 处理函数而产生的错误

## 二、异常捕获

1. 可疑区域增加 `try-catch`
2. 全局监控 JS 异常 `window.onerror`
3. 全局监控静态资源异常监听 error 事件
4. 捕获没有 catch 的 Promise 异常监听 unhandledrejection 事件
5. React componentDidCatch
6. Vue errorHandle
7. Axios 请求同一异常处理用拦截器 interceptors
8. 使用日志监控服务搜集用户错误信息

### 2.1 try-catch

::: tip
1. 当 `finally` 区块定义了 `return`，则会忽略 `try` 和 `catch` 区块内的 `return`。
2. 当 `try` 区块出现异常，则忽略 `try` 区块内的 `return`。
:::

```js
// 最终返回 ‘finally’
try {
  return 'try';
} catch (e) {
  return 'catch';
} finally {
  return 'finally';
}
```

### 2.2 全局监控JS异常

```js
/**
 * @param {String} message 错误信息
 * @param {String} source 出错文件
 * @param {Number} lineno 行号
 * @param {Number} colno 列号
 * @param {Object} error Error对象
 */
window.onerror = function handleError(message, source, lineno, colno, error) {
  console.log('捕获到异常', { message, source, lineno, colno, error })
}
```

### 2.3 静态资源异常

```html
<script>
  function errorHandler(error) {
    console.log("捕获到静态资源加载异常", error);
  }
</script>
<script src="http://cdn.xxx.com/js/test.js" onerror="errorHandler(this)"></script>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script>
    window.addEventListener('error', (error) => {
      console.log('捕获到异常：', error)
    }, true);
  </script>
</head>
<body>
  <script src="http://cdn.xxx.com/js/test.js"></script>
</body>
</html>
```

### 2.4 Promise异常

```js
window.addEventListener('unhandledrejection', (e) => {
  e.preventDefault();
  console.log('捕获到 promise 错误了');
  console.log('错误的原因是', e.reason);
  console.log('错误的对象是', e.promise);
});

Promise.reject('promise error');
new Promise((resolve, reject) => {
  reject('promise error');
});
new Promise((resolve) => {
  resolve();
}).then(() => {
  throw 'promise error';
});
```

### 2.5 React异常

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children;
  }
}
```

### 2.6 Vue异常

```js
Vue.config.errorHandler = (err, vm, info) => {
  console.log('通过 vue errorHandler 捕获的异常');
  console.log(err);
  console.log(vm);
  console.log(info);
}
```

### 2.7 请求异常

```js
axios.interceptors.response.use(
  function (success) {
    return success;
  },
  function (error) {
    const { response } = error;
    const { status, data: { message } } = response;
    if (status === 401) {
      goLogin();
    } else if (status === 502) {
      alert(message || '系统升级中，请稍后重试试');
    }
    return Promise.reject(response);
  }
)
```
