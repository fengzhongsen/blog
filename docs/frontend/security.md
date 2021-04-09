---
title: Security
date: 2021.03.09 20:00:00
categories:
  - FrontEnd
tags:
  - Security
publish: false
---

## 一、XSS 跨站脚本攻击

1. 存在形式：DOM型XSS、存储型的XSS
2. 解决方法：过滤或转义特殊字符、cookie设置httpOnly

## 二、CSRF 跨站伪造请求

1. 指攻击者冒充用户发起请求（在用户不知情的情况下），完成一些违背用户意愿的事情。
2. 解决方案：token验证、referer验证、验证码验证
