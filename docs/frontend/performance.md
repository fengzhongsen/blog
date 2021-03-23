---
title: HTTP
date: 2021.03.08 20:00:00
categories:
  - FrontEnd
tags:
  - HTTP
publish: false
---

## 2021⼤大⼚厂前端核⼼心⾯面试题详解 ⼆


## 一. 有做过前端加载优化相关的⼯工作吗? 都做过哪些努⼒

做新能优化的目的是什么？

1. 首屏时间
2. 首次交互时间
3. 首次有意义内容渲染时间

⻚面性能检测: https://developers.google.com/speed/pagespeed/insights/
polyfill的优化 https://polyfill.io/v3/url-builder/

1. 只请求当前需要的资源
   
   异步加载, 懒加载, polyfill的优化 https://polyfill.io/v3/url-builder/

2. 缩减资源体积
   
   打包压缩 webpack 4
   gzip
   图⽚片格式优化, 压缩, 根据屏幕分辨率展示不不同分辨率的图⽚，webp
   尽量量控制cookie⼤小 request header，coolie

3. 时序优化
   
   js中promise.all
   ssr，seo
   prefetch、prerender、preload
  <link rel=“dns-prefetch” href=“xxxxxx” />
  <link rel=“preconnect” href=“xxxxxxx” />
  <link rel=“preload” as=“image” href=“xxxxxxxxx” />

4. 合理理利利⽤用缓存
   
   cdn cdn预热 cdn刷新
   http缓存
   localStorage, sessionStorage