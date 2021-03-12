---
title: HTML5
date: 2021.03.01 19:00:00
categories:
  - 前端
tags:
  - HTML
---

## 一、语义化标记

::: tip
不完全统计，简单分类，如下。
:::

1. 片段：`article`、`header`、`footer`、`section`、`nav`、`aside`
2. 内嵌：`audio`、`video`、`canvas`、`iframe`
3. 标题：`hgroup`、`h1`
4. 交互：`button`、`textarea`
5. 元数据：`script`、`style`、`title`
6. 短语：`mark`、`kdb`、`sub`、`sup`
7. 流：`form`

## 二、Selectors API

| API                  | 描述                                                       | 示例                           | 结果                                 |
| -------------------- | ---------------------------------------------------------- | ------------------------------ | ------------------------------------ |
| `querySelector()`    | 根据指定的选择器规则，返回在页面中找到的**第一个**匹配元素 | `querySelector('input.error')` | 返回第一个类名为“error”的文本输入框  |
| `querySelectorAll()` | 根据指定的选择器规则，返回在页面中找到的**所有的**匹配元素 | `querySelector('#result td')`  | 返回ID为"result"的元素下所有的单元格 |

## 三、window.JSON

`JSON.stringify()`、`JSON.parse()`

## 四、DOM Level 3

`addEventListener()`、`dispatchEvent()`

## 五、Web Storage API

::: tip
`storage` 有 `localStorage` 和 `sessionStorage`，他们拥有相同的API，另外两者的差异是数据的保存时长和他们的共享方式。
:::

### 5.1 API

1. 设置：`storage.setItem()`
2. 获取：`storage.getItem()`
3. 移除：`storage.removeItem()`
4. 清除：`storage.clear()`

### 5.1 对比

| storage          | 生命周期                             | 共享方式                             |
| ---------------- | ------------------------------------ | ------------------------------------ |
| `localStorage`   | 数据会保存到存储他的窗口或标签关闭   | 数据只在构建他们的窗口或者标签内可见 |
| `sessionStorage` | 数据的生命期比窗口或浏览器的生命期长 | 数据可被同源的每个窗口或者标签页共享 |

### 5.3 事件

```ts
interface StorageEvent: Event {
  readonly key: string; // 被更新或者删除的键
  readonly oldValue: any; // 更新前的值，为 null 时表示新增数据
  readonly newValue: any; // 更新后的值，为 null 时表示删除数据
  readonly url: string; // Storage 事件发生的源
  readonly storageArea: Storage; // 指向 localStorage 或者 sessionStorage 的引用
}

window.addEventListener('storage', function (e: StorageEvent) {
  const {
    key,
    oldValue,
    newValue,
    url,
    storageArea
  } = e;
  // Do something ...
}, true );
```

## 六、XMLHttpRequest Level 2

::: tip
1. 增加了进度事件 `loadstart`、`progress`、`abort`、`error`、`load`、`loadend`。
2. 保留了 `readystate` 属性 和 `readystateChange` 事件。
3. `responseType` 支持 `text`、`document`、`arraybuffer`、`blob`。
4. 详见[MDN - XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)
:::

```js
class Upload {
  constructor() {
    this.progress = 'pending...';
  }

  setProgress(progress) {
    this.progress = progress;
  }

  upload() {
    const url = 'http://www.example.com/upload';
    const data = {};
    const xhr = new XMLHttpRequest();
    if (xhr.withCredentials === undefined) { // 兼容性判断
      return;
    }
    xhr.onprogress = function (e) {
      const ratio = e.loaded / e.total;
      this.setProgress(`${ratio}% downloaded.`);
    }
    xhr.onload = function (e) {
      this.setProgress(`finished.`);
    }
    xhr.onerror = function (e) {
      this.setProgress(`error.`);
    }
    xhr.open('POST', url, true);
    xhr.responseType = 'text';
    xhr.send(data);
  }
}
```

## 七、Canvas

1. [MDN - Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
2. [Canvas API中文文档](https://www.canvasapi.cn/)

## 八、Audio、Video

1. [MDN - `<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)
2. [MDN - `<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)

## 九、SVG

1. [MDN - SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG)
2. [初识SVG](../svg/node.md)

## 十、其他

::: tip
其他一些未成熟或者不常用的API请参阅 MDN 文档。
:::

1. WebSockets API
2. Web Workers API
3. Forms API
4. Geolocation API
5. Communication API
6. 拖放
