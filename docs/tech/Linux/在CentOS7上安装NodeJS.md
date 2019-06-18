---
title: 【Linux】在CentOS7上安装NodeJS
date: 2019-06-16 12:00:01
categories:
  - 技术篇
tags:
  - Linux
  - CentOS
  - NodeJS
---

## 一、yum 安装
直接 `yum` 命令安装。
```
$ yum install nodejs -y
```

这样安装下来的 `Node` 版本是 `v6.x`，可能不满足我们的需求，假设我们需要安装 `v10.x` 或者其他。
```
$ curl -sL https://rpm.nodesource.com/setup_10.x | bash -
$ yum install nodejs -y
```
::: tip 参考
[NodeSource's GitHub Page](https://github.com/nodesource/distributions)
:::

## 二、NVM 安装
NVM 是 Node 的版本管理工具，可以根据需要自由切换 Node 版本。
```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
$ source ~/.bash_profile
$ nvm install --lts
```

## 三、官网安装包安装
### 3.1 下载并解压安装包
```
$ mkdir /temp /usr/local/nodejs
$ tar -xvf https://npm.taobao.org/mirrors/node/v10.16.0/node-v10.16.0-linux-x64.tar.xz /temp
$ mv /temp/node-v10.16.0-linux-x64/* /usr/local/nodejs
```
::: tip
1. /temp 是存放安装包的临时目录，/usr/local/nodejs 是安装 nodejs 的目标目录
2. 这里我使用了淘宝镜像，当然也可以使用官方镜像
:::

### 3.2 建立软连接
```
$ ln -s /usr/local/nodejs/bin/node /usr/local/bin/
$ ln -s /usr/local/nodejs/bin/npm /usr/local/bin/
```

::: tip tar.xz 与 tar.gz
`tar.xz` 与 `tar.gz` 是两种压缩格式，同一文件 `tar.xz` 格式比 `tar.gz` 格式小约三分之一。
:::

## 四、源码安装
感觉没什么必要用这种即费时间又容易出错的方法了。

## 五、参考文献
1. [How To Install Node.js on a CentOS 7 server](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-a-centos-7-server)
2. [centos下安装nodejs的三种种方式](https://blog.csdn.net/bbwangj/article/details/82253785)
3. [NVM's GitHub Page](https://github.com/nvm-sh/nvm#installing-nvm-on-alpine-linux)
4. [NodeJS 淘宝镜像](https://nodejs.org/dist/)