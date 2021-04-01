---
title: webpack
date: 2019.06.14 12:00:00
categories:
  - FrontEnd
tags:
  - webpack
---

马步扎不稳，学会再多的招数也只是花拳绣腿
<!--  -->

# 设计思想

万物皆模块
A bundler for javascript and friends

## 功能

1. 打包散落文件
2. 兼容转译语法
3. 打包周边静态文件

## 思路

我们可以把应用初次加载所必需的模块打包到一起，其他的模块再单独打包，等到应用工作过程中实际需要用到某个模块，再异步加载该模块，实现增量加载，或者叫作渐进式加载，非常适合现代化的大型 Web 应用。

## Loader & Plugin

通过 Loader 处理特殊类型资源的加载，例如加载样式、图片；
通过 Plugin 实现各种自动化的构建任务，例如自动压缩、自动发布。

## 工作流程

1. webpack-cli 解析参数，找到对应的配置文件，按规则生成配置对象。
2. 载入Webpack核心模块，生成 Compiler 对象。
3. 入口文件开始解析依赖关系，生成依赖树。
4. 遍历依赖树，将不同的文件模块交给对应的loader处理。如果是静态文件，将文件拷贝到输出目录，并将资源目录作为导出成员暴露给外部。
5. 合并loader处理的结果，输出到dist目录。

## Dev Server

```js
// webpack.config.js
module.exports = {
  // ...
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: {
          '^/api:': '' // 替换掉代理地址中的 /api
        },
        changeOrigin: true, // 确保请求 GitHub 的主机名就是：api.github.com
      }
    }
  }
}
```

```bash
yarn add webpack-dev-server --dev
npx webpack serve --open
```

## Source Map

选择类型的三个纬度：性能、质量、是否可用于生产环境

```js
// webpack.config.js
module.exports = {
  devtool: 'eval-cheap-module-source-map', // build慢，rebuild快，能显示原始行号，不可用于生产环境
}
```

## HMR

```js
// webpack.config.js
module.exports = {
  devServer: {
    // 开启 HMR 特性，如果资源不支持 HMR 会 fallback 到 live reloading
    hot: true
    // 只使用 HMR，不会 fallback 到 live reloading
    // hotOnly: true
  }
}
```

js 模块需要自己实现 `module.hot.accept('./path', () => {})`

## Tree Shaking


