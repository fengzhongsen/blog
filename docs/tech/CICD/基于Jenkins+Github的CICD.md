---
title: 【CI/CD】基于Jenkins+Github的CI/CD
date: 2019.06.17 00:00:00
categories:
  - 技术篇
tags:
  - CI/CD
  - Jenkins
---

## 一、引言
老冯最近打算整理下做前端工程师这两年总结的笔记，以前用Hexo写博客，并部署到GitPage上，加载速度相当慢。最近VuePress兴起，老冯决定一探究竟，同时将新项目部署到自己的服务器上，顺带搞一下CI/CD。

::: tip CI/CD 解释
CI：Continuous Integration，也就是持续集成<br/>
CD：Continuous Delivery 和 Continuous Deployment，也就是持续交付、持续部署
:::

::: tip 工作流程
1. 前提: 开发人员提交代码到 `GitHub` (也可以是 `Gitlab` 或者 `SVN` )
2. 触发: `Jenkins` 通过 `WebHock/人工/定时器` 触发构建
3. 构建: `Jenkins` 根据配置自动拉取代码、编译并打包项目
4. 部署: `Jenkins` 根据配置自动部署到服务器
:::

## 二、搭建CI/CD环境

购买阿里云服务器( `ECS` 和 `轻应用服务器` 都行，我的是之前搞活动低价购买的 `轻应用服务器` )，系统镜像选用 `CentOS7` ;

::: tip
1. 安装 `Git`
2. 安装 `Jenkins`
3. 安装 `Nginx`
4. 安装 `NodeJS`
:::

### 2.1 安装 Git

安装 `git` 是为了 `Jenkins` 拉取代码

```
$ yum install git -y
```

想知道git安装在了什么位置可以使用以下命令
```
$ whereis git
```

### 2.2 安装 Jenkins

`Jenkins` 依赖 `jdk`，所以需要先[在CentOS7上安装Java8](/tech/在CentOS7上安装Java8)，再继续下列步骤。

1. 安装自动选择最快源的插件
```
yum install yum-fastestmirror -y
```
2. 添加 `Jenkins` 源
```
$ wget -O /etc/yum.repos.d/jenkins.repo http://jenkins-ci.org/redhat/jenkins.repo
$ rpm --import http://pkg.jenkins-ci.org/redhat/jenkins-ci.org.key
```
3. 安装 `Jenkins`
```
$ yum install jenkins -y
```
4. 启动 `Jenkins`
```
$ service jenkins start
```
5. 安装 `Jenkins` 插件
::: warning
这里你可能会遇到一些问题，Jenkins 默认端口是 8080，但阿里云默认不开启 8080 端口，需要手动添加。

<img src="/images/jenkins/aliyun-port-config-01.png">

:::

（1）假设服务器IP是 `120.130.140.150`，在浏览器中输入 `http://120.130.140.150:8080`，根据提示获取指定文件中的密码，这里你可能需要[在本地登录远程服务器](/tech/在本地登录远程服务器/)后执行下述命令。

<img src="/images/jenkins/1.png" />

```
$ cat /var/lib/jenkins/secrets/initialAdminPassword
```

（2）安装推荐的插件，成功（或部分插件安装失败）后创建第一个管理员用户，输入 `用户名` 、`密码`、`全名`、`邮箱` 后点两次`完成并保存` 就OK了。

<img src="/images/jenkins/2.png" />

### 2.3 安装 Nginx
1. 安装 `Nginx`
```
$ yum install nginx -y
```

2. 启动 `Nginx`
```
$ service nginx start
```

3. 配置 `Nginx`
```
$ vim /etc/nginx/nginx.conf
```
将root修改为前端代码部署的路径
```
location / {
    root /usr/local/feng-blog-vuepress/dist;
    index index.html;
}
```

3. 检查配置文件是否有错误
```
$ nginx -t
```

4. 刷新 `Nginx` 配置
```
$ nginx -s reload
```

### 2.4 安装 NodeJS
参考[在CentOS7上安装NodeJS](/tech/在CentOS7上安装NodeJS/)中的方法。

::: tip
推荐方法一，理由是最简单最快最不容易出错，另外要注意自己项目依赖的 Node 版本。
:::

## 三、Jenkins 全局配置

### 3.1 GitHub 生成 Personal Access Token
进入 [Github - Setting - Developer Setting - Personal Access Token](https://github.com/settings/tokens)，点击 `Generate new token` （可能需要输入 `GitHub` 密码）后开始创建：
1. 在 `Note` 一栏输入描述信息，看自己心情就好，比如：`Jenkins-hook`
2. 在 `Select scopes` 一项中勾选 `repo` 和 `admin:repo_hook`
3. 点击最下方 `Generate token` 完成创建
4. 创建完成后，找个地方手动记录下生成的 `Secret text`，大概长这样：`aa406d89b16c37d73e2beaec5e9bf8bdfcb52982`

<img src="/images/jenkins/github-config-01.png">

### 3.2 配置 GitHub 选项
进入 `Manage Jenkins - Config System` 配置 `GitHub - Github 服务器`。
1. 添加一个服务器，名称看心情，可为空。

<img src="/images/jenkins/4.png">

2. 添加一个 `Secret text` **类型**的 `全局凭证`。**Secret**中填入 3.1 中的 `Secret text`： `aa406d89b16c37d73e2beaec5e9bf8bdfcb52982`，**描述**简单写一下。

<img src="/images/jenkins/5.png">

### 3.3 配置 Git 选项
进入 `Manage Jenkins - Global Tool Configuration` 配置 `Git - Path to Git executable`。

<img src="/images/jenkins/3.png">

::: tip 提示
可使用 `whereis git` 命令查看 `Git` 的位置。
:::

## 四、自由风格项目的配置
创建一个新的项目，输入一个任务名称，选择 `Freestyle project`

<img src="/images/jenkins/project-config-00.png">

### 4.1 General
分别配置 `描述`、`GitHub项目`、`丢弃旧的构建策略` 三个选项

<img src="/images/jenkins/project-config-01.png">

### 4.2 源码管理
分别配置 `Git`、`源码库浏览器` 两个选项

<img src="/images/jenkins/project-config-02.png">

这里需要添加一个 `Username with password` **类型**的`全局凭证`，**用户名**和**密码**分别是 `GitHub` 的用户名和密码，**描述**简单写一下。

<img src="/images/jenkins/project-config-03.png">

### 4.3 构建触发器
> 该部分可以独立于本节之外，单独配置 

详见[Jenkins与Github集成webhook配置](https://blog.csdn.net/qq_21768483/article/details/80177920)

### 4.4 构建环境
> 到目前为止，我们一共创建了两个 `全局凭证`，一个是 `Secret text` **类型**的，一个是 `Username with password` **类型**的。

1. 勾选 `Use secret text(s) or file(s)`，并新增一个 `Secret text` **类型**的**绑定**。

<img src="/images/jenkins/project-config-05.png">

2. 凭证选择已有的 `Secret text` **类型**的 `全局凭证`。

<img src="/images/jenkins/project-config-06.png">

### 4.5 构建
新增一个`执行shell` 类型的构建，并编写编译和部署项目的shell脚本。

<img src="/images/jenkins/project-config-07.png">

::: warning
一、到目前为止我们对服务器的操作都是以 root 用户的身份进行的，但是 Jenkins 的默认用户是 jenkins，而 jenkins 没有权限操作属于 root 的文件，所以我们需要修改 Jenkins 配置文件，将Jenkins 的默认用户 jenkins 改成 root<br/>
1. 将配置文件中的 `JENKINS_USER` 的值修改为 `root`
```
$ vim /etc/sysconfig/jenkins
```
2. 重启 Jenkins
```
$ service jenkins restart
```

二、此外我用了包管理工具 yarn，而不是 npm，故还需要全局安装一个 yarn
```
$ npm install yarn -g
```
:::

<span id="github-config"></span>

::: tip 拓展：其他集成工具
除了 `Jenkins CI` 还有 [Travis CI](https://travis-ci.org)、[Circle CI](https://circleci.com/) 等 [GitHub 十大 CI 工具](https://www.jianshu.com/p/64fc783568b1)，其中

1. `Travis CI` 是基于 `GitHub` 的 `CI` 托管解决方案之一，由于和 `GitHub` 的紧密集成，在开源项目中被广泛使用。
2. `CircleCI` 是一款很有特色，也是比较流行的云端持续集成管理工具，目前仅支持 `GitHub` 和 `bitbucket`，它和其他工具的区别在于他提供服务的方式不同，`CircleCI` 需要付费的资源主要是它的容器。
:::

## 五、参考文献
1. [从零搭建web前端持续集成环境: github+jenkins+nodejs+nginx](https://blog.csdn.net/liang526011569/article/details/88120378#23_nodejs_65)
2. [How To Install Node.js on a CentOS 7 server](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-a-centos-7-server)
3. [CentOS7使用yum命令安装Java1.8](https://www.cnblogs.com/zdz8207/p/CentOS-yum-java.html)
4. [NVM's GitHub Page](https://github.com/nvm-sh/nvm#installing-nvm-on-alpine-linux)
5. [Jenkins执行脚本提示没有权限的解决办法](https://www.jianshu.com/p/fa546f723724)
6. [Jenkins与Github集成webhook配置](https://blog.csdn.net/qq_21768483/article/details/80177920)
7. [GitHub 十大 CI 工具](https://www.jianshu.com/p/64fc783568b1)