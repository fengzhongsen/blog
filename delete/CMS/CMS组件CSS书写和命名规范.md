---
title: 【规范】CMS组件CSS书写和命名规范
date: 2018.12.20 12:00:00
categories:
  - 技术篇
tags:
  - 前端
  - CSS
  - 规范
---

## 一、概述

本规范旨在对 `CMS组件开发` 形成规范性约束，达到多人写作开发时编写出可维护性高、可读性强的 `CSS代码`。**该规规范同样适用于其其他页面的开发**。
- `编码风格` 借鉴了百度的 [CSS编码规范](https://github.com/fex-team/styleguide/blob/master/css.md)。
- `命名规范` 以 [BEM](https://mp.weixin.qq.com/s/_1DTPgoSqXIRfAXqMC30lg?) 和 [NEC](http://nec.netease.com/standard/css-sort.html) 为基础，为 `CMS组件` 而定制。

## 二、编码风格


### 2.1 缩进

【强制】使用 `4` 个空格做为一个缩进层级，不允许使用 `2` 个空格 或 `tab` 字符。

### 2.2 选择器

【强制】如非必要，不使用 `标签选择器`（可以作为最后一层子选择器）和 `ID选择器`。<br>
【强制】属性选择器中的值必须用双引号包围。<br>
【强制】当一个规则包含多个选择器时，每个选择器声明必须独占一行。<br>
【建议】选择器的嵌套层级应不大于 3 级，位置靠后的限定条件应尽可能精确。<br>

```css
.post,
.page,
.comment {
    line-height: 1.5;
}
```

### 2.3 属性

【强制】属性定义必须另起一行。<br>
【建议】在可以使用缩写的情况下，尽量使用属性缩写。<br>
【建议】使用 `border` / `margin` / `padding` 等缩写时，尽量不要覆盖不需要覆盖的设定。<br>
【建议】同一规则下的属性在书写时，应按功能进行分组，并以 `Formatting Model（布局方式、位置） > Box Model（尺寸） > Typographic（文本相关） > Visual（视觉效果）` 的顺序书写，以提高代码的可读性。<br>

> - 如果包含 `content` 属性，应放在最前面。
> - Formatting Model 相关属性包括：`position` / `top` / `right` / `bottom` / `left` / `float` / `display` / `overflow` 等
> - Box Model 相关属性包括：`border` / `margin` / `padding` / `width` / `height` 等
> - Typographic 相关属性包括：`font` / `line-height` / `text-align` / `word-wrap` 等
> - Visual 相关属性包括：`background` / `color` / `transition` / `list-style` 等

```css
.sidebar {
    /* formatting model: positioning schemes / offsets / z-indexes / display / ...  */
    position: absolute;
    top: 50px;
    left: 0;
    overflow-x: hidden;

    /* box model: sizes / margins / paddings / borders / ...  */
    width: 200px;
    padding: 5px;
    border: 1px solid #ddd;

    /* typographic: font / aligns / text styles / ... */
    font-size: 14px;
    line-height: 20px;

    /* visual: colors / shadows / gradients / ... */
    background: #f5f5f5;
    color: #333;
    -webkit-transition: color 1s;
       -moz-transition: color 1s;
            transition: color 1s;
}
```

### 2.4 值与单位

【强制】RGB颜色值必须使用十六进制记号形式 `#rrggbb`。带有alpha的颜色信息可以使用 `rgba()`。<br>
【强制】颜色值可以缩写时，必须使用缩写形式。<br>
【强制】颜色值中的英文字符采用小写。<br>
【强制】`url()` 函数中的路径不加引号。<br>
【强制】当数值为 0 - 1 之间的小数时，省略整数部分的 `0`。<br>
【强制】长度为 `0` 时须省略单位。<br>
【强制】文本内容必须用双引号包围。<br>

> `content 属性`、`font-famliy 属性` 以及 `属性选择器`。

```css
html[lang|="zh"] q:before {
    font-family: "Microsoft YaHei", sans-serif;
    content: "“";
}
```

【强制】2D位置必须同时给出水平和垂直方向的位置。

```css
body {
    background-position: center top; /* 50% 0% */
}
```


### 2.5 !important

【建议】尽量不使用 `!important` 声明。<br>
【建议】当需要强制指定样式且不允许任何场景覆盖时，通过标签内联和 `!important` 定义样式。<br>

> 必须注意的是，仅在设计上 `确实不允许任何其它场景覆盖样式` 时，才使用内联的 `!important` 样式。通常在第三方环境的应用中使用这种方案。下面的 z-index 章节是其中一个特殊场景的典型样例。

### 2.6 z-index

【建议】将 `z-index` 进行分层，对文档流外绝对定位元素的视觉层级关系进行管理。<br>
【建议】在可控环境下，期望显示在最上层的元素，`z-index` 指定为 `999999`。<br>
【建议】在第三方环境下，期望显示在最上层的元素，通过标签内联和 `!important`，将 `z-index` 指定为 `2147483647`。<br>

> - 建议每层包含100个 `z-index` 来容纳足够的元素，如果每层元素较多，可以调整这个数值。
> - 可控环境分成两种，一种是自身产品线环境；还有一种是可能会被其他产品线引用，但是不会被外部第三方的产品引用。
> - 第三方环境对于开发者来说完全不可控。在第三方环境下的元素，为了保证元素不被其页面其他样式定义覆盖，需要采用此做法。

### 2.7 文本编排

【强制】font-family 属性中的字体族名称应使用字体的英文 Family Name，其中如有空格，须放置在引号中（见2.4）。<br>
【强制】font-family 不区分大小写，但在同一个项目中，同样的 Family Name 大小写必须统一。<br>
【强制】font-weight 属性必须使用数值方式描述。<br>
【建议】line-height 在定义文本段落时，应使用数值。<br>
【强制】使用 transition 时应指定 transition-property。<br>

> - CSS 的字重分 100 – 900 共九档，但目前受字体本身质量和浏览器的限制，实际上支持 400 和 700 两档，分别等价于关键词 normal 和 bold。
> - 浏览器本身使用一系列启发式规则来进行匹配，在 <700 时一般匹配字体的 Regular 字重，>=700 时匹配 Bold 字重。
> - 但已有浏览器开始支持 =600 时匹配 Semibold 字重 (见此表)，故使用数值描述增加了灵活性，也更简短。

```css
.box {
    transition: color 1s, border-color 1s;
}
```

### 2.8 其他

【建议】当元素需要撑起高度以包含内部的浮动元素时，通过对伪类设置 `clear` 或触发 `BFC` 的方式进行 `clearfix`。尽量不使用增加空标签的方式。<br>
【强制】禁止使用 `Expression`。<br>
【强制】使用 autoprefixer 工具保证兼容性。<br>


## 三、命名规范

以猜你喜欢组件 `h5GuessLike` 为例。

```html
<cms-module class="h5-guess-like">
    <!-- 标题部分 -->
    <module-header>
        <module-title>猜你喜欢</module-title>
        <module-subtitle>猜你喜欢</module-subtitle>
    </module-header>

    <!-- 主体部分 -->
    <module-main class="guess-like-cont">
        <!-- 可循环部分 start -->
        <goods-cont class="guess-like">
            <goods-img>
                <img src="https://img01.yit.com/media/9c0e67ad-c79b-4293-9109-4c3397c2cf21.jpeg" alt="商品图片">
            </goods-img>
            <goods-info>
                <goods-name><video-tag></video-tag>加厚羊毛贝雷帽</goods-name>
                <goods-desc>优雅复古的经典款贝雷帽，厚实温暖、柔软舒适，款式时髦、4色可选</goods-desc>
                <goods-price>
                    <sale-price>168</sale-price>
                    <daily-price>188</daily-price>
                </goods-price>
                <goods-vipprice>
                    <vip-price>151.2</vip-price>
                </goods-vipprice>
                <goods-tag-list>
                    <goods-tag>限时特惠</goods-tag>
                    <goods-tag>第二件半价</goods-tag>
                </goods-tag-list>
            </goods-info>
        </goods-cont>
        <!-- ··· -->
        <!-- 可循环部分 end -->
    </module-main>

    <!-- 查看更多 -->
    <module-footer></module-footer>
    <!-- 本组件没有“查看更多” -->

</cms-module>
```

> 已经定义了部分公共语义化标签，[查看文档](http://confluence.yit.com/pages/viewpage.action?pageId=6007145)。

### 3.1 名词解释

1. 组件名称：h5GuessLike
2. 组件前缀：`h5` 、`sdp` 、`sdpshop`
3. 组件主容器：`<cms-module/>`
4. 组件头部：`<module-header/>`
5. 组件主体：`<module-main/>`
6. 组件脚部：`<module-footer/>`
7. 循环单位：`<goods-cont/>`
8. 主容器选择器：`.h5-guess-like`
9. 主体选择器：`.guess-like-cont`
10. 循环单位选择器：`.guess-like`
11. 主要元素：组件中不可缺失的部分，一旦缺失就会影响组件的整体结构和意义。
12. 次要元素：缺失后不影响组件的整体结构和意义。

> `组件主容器`、`组件主体`、`循环单位` 的选择器分别对应 `主容器选择器`、`主体选择器`、`循环单位选择器`。

### 3.2 规则描述

1. 组件的 `主要元素` 的类选择器都必须遵循 [BEM](https://mp.weixin.qq.com/s/_1DTPgoSqXIRfAXqMC30lg?) 命名规则。`次要元素` 可以采用语义明确的单个单词进行定义。
2. 如果元素明确是其父元素的一部分，则将其父元素作为 `B` ，而本身作为 `E` 。否则将元素本身作为 `B`。
3. `B` 尽量采用两个单词定义，而避免单个单词。
4. `E` 尽量采用语义明确的单个单词的简写形式（参见3.3语义词典），必要情况下可以采用 `B` 的定义规则。
5. `M` 一定是语义明确的单个单词或单词简写。例如：`red`、`blue`、`big`、`small` 等。


### 3.3 语义词典

语义 | 命名 | 简写
---|---|---
根容器 | container | cont
盒容器 | wrap/box | wrap/box
头部 | head/header | hd
尾部 | foot/footer | ft
主体 | body/main | bd/mn
侧栏 | side | sd
导航 | nav | nav
子导航 | subnav | snav
顶导航 | topnav | tnav
边导航 | sidebar | sbar
左导航 | leftbar | lbar
右导航 | rightbar | rbar
菜单 | menu | menu
子菜单 | submenu | smenu
面包屑 | crumb | crm
选项卡 | tab | tab
标题 | title | tt
子标题 | subtitle | stt
内容 | content | ct
摘要 | summary | smy
列表 | list | lst
表格 | table | tb
表单 | form | fm
输入 | input | ipt
按钮 | button | btn
搜索 | search | sch
登录 | login | log
注册 | regist/regsiter | reg
下载 | download | dld
滚动 | scroll | scr
提示 | tips | tips
注释 | note | note
图标 | icon | icon
标志 | logo | logo
广告 | advertise/banner | ad/bn
热点 | hot | hot
排行 | top | top
幻灯 | slide | sld
帮助 | help | help
服务 | service | ser
指南 | guilde | gui
伙伴 | partner | part
链接 | link | link
新闻 | news | news
投票 | vote | vote
版权 | copyright | cprt
结果 | result | rst
浮动清除 | clearboth | cb
向左浮动 | floatleft | fl
向右浮动 | floatright | fr
内联块级 | inlineblock | ib
文本居中 | textaligncenter | tac
文本居右 | textalignright | tar
文本居左 | textalignleft | tal
垂直居中 | verticalalignmiddle | vam
溢出隐藏 | overflowhidden | oh
完全消失 | displaynone | dn
字体大小 | fontsize | fs
字体粗细 | fontweight | fw
字体颜色 | fontcolor | fc
背景 | background | bg
背景颜色 | backgroundcolor | bgc
背景图片 | backgroundimage | bgi
背景定位 | backgroundposition | bgp
边框颜色 | bordercolor | bdc
选中 | selected | sel
当前 | current | crt
显示 | show | show
隐藏 | hide | hide
打开 | open | open
关闭 | close | close
出错 | error | err
不可用 | disabled | dis
