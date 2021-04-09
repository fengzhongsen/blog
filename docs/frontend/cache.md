---
title: Cache
date: 2021.04.09 20:00:00
categories:
  - FrontEnd
tags:
  - Cache
---

# 一、Cookie

# 二、Storage

localStorage && sessionStorage

# 三、IndexedDB

# 四、浏览器缓存

## 4.1 Memory Cache && Disk Cache

1. 当前Tab请求的资源会优先放在 Memory Cache 中，当Tab关闭，缓存失效
2. 当前Tab请求的资源过大时会优先放在 Disk Cache 中

## 4.2 Service Worker Cache

PWA就是利用了 Service Worker Cache，Service Worker 需要先注册，然后在监听到 install 事件后可以开始缓存资源。当用户再次访问，如果命中缓存就拿缓存，如果没命中则发请求，然后缓存下来。

## 4.3 HTTP Cache

Http 缓存分为强缓存和协商缓存。优先级较高的是强缓存，在命中强缓存失败的情况下，才会走协商缓存。

### 4.3.1 强制缓存

强缓存中，当请求再次发出时，浏览器会根据第一次请求响应头中的 expires 和 cache-control 判断目标资源是否“命中”强缓存，若命中则直接从缓存中获取资源，不会再与服务端发生通信。

```
Expires: Wed, 11 Sep 2019 16:12:18 GMT
Cache-Control: max-age=3600, s-maxage=31536000
```

#### Expires

服务端绝对时间戳，再次请求时如果`浏览器本地时间 < Expires`，直接从缓存里读取资源

#### Cache-Control

资源有效时间，Http1.1 提出，优先级高于 Expires
max-age 只允许客户端缓存
s-maxage 允许中间代理服务器缓存，优先级高于 max-age
public 所有内容都将被缓存（客户端和代理服务器都可缓存）
private 所有内容只有客户端可以缓存，Cache-Control 的默认取值
no-cache 浏览器在使用缓存数据时，需要先确认一下数据是否还跟服务器保持一致
no-store 所有内容都不会被缓存，不使用强制缓存，也不使用协商缓存

### 4.3.2 协商缓存

协商缓存机制下，浏览器需要向服务器去询问缓存的相关信息，进而判断是重新发起请求、下载完整的响应，还是从本地获取缓存的资源。如果服务端（304 Not Modified）即缓存资源未改动，资源会被重定向到浏览器缓存。

#### Last-Modified && If-Modified-Since
1. 首次请求 Response Header

```
Last-Modified: Fri, 27 Oct 2017 06:35:57 GMT
```

2. 再次请求 Request Header

```
If-Modified-Since: Fri, 27 Oct 2017 06:35:57 GMT // Last-Modified 中的值
```

若资源未改动，返回304，则响应头不再携带 Last-Modified。

> 两个弊端：
> 1. 编辑文件，但内容没变化，会被认为是修改过了
> 2. If-Modified-Since 是以秒为单位的，如果修改文件时间小于1秒，则无法判断出文件修改了

#### ETag && If-None-Match

1. 首次请求 Response Header

```
ETag: ETag: W/"2a3b-1602480f459"
```

2. 再次请求 Request Header

```
If-None-Match: W/"2a3b-1602480f459" // ETag 中的值
```

## Push Cache

Http2 的新特性