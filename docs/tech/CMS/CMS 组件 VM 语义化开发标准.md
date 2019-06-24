---
title: 【规范】CMS 组件 VM 语义化开发标准
date: 2018.12.21 12:00:00
categories:
  - 技术篇
tags:
  - 前端
  - CSS
  - 规范
---

- [1 语义化标签定义](#1-语义化标签定义)
- [2 VM模版开发示例](#2-vm模版开发示例)


## 一、语义化标签定义

> 以下是已经定义好的语义化标签，后续会根据需要而新增

```css
/* 组件 */
cms-module {
  display: block;
  overflow: hidden;
  background: #fff;
}

/* 组件头 */
module-header {
  display: block;
  overflow: hidden;
  padding: 40px;
  text-align: center;
}

/* 组件标题 */
module-title {
  display: block;
  overflow: hidden;
  font: 32px/1 PingFangSC-Regular;
  color: #333;
}

/* 组件副标题 */
module-subtitle {
  display: block;
  overflow: hidden;
  margin-top: 10px;
  font: 24px/1 PingFangSC-Regular;
  color: #999;
}

/* 组件主体 */
module-main {
  display: block;
  overflow: hidden;
}

/* 商品 */
goods-cont {
  display: block;
  overflow: hidden;
}

/* 商品图片 */
goods-img {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

goods-img img {
  width: auto;
  max-width: 100%;
  max-height: 100%;
}

/* 商品信息 */
goods-info {
  display: block;
  overflow: hidden;
  padding: 16px 20px 20px 20px;
}

/* 商品信息-商品名称 */
goods-name {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font: 26px/34px PingFangSC-Regular;
  color: #333;
}

/* 商品信息-商品名称-视频图标 */
video-tag {
  display: inline-block;
  background: #b2b2b2;
  width: 34px;
  height: 34px;
  border-radius: 100%;
  vertical-align: text-bottom;
}

video-tag:before {
  content: "";
  margin: 6px 13px;
  display: inline-block;
  border-left: #fff 12px solid;
  border-top: transparent 11px solid;
  border-bottom: transparent 11px solid;
  border-radius: 1px;
}

/* 商品信息-商品描述 */
goods-desc {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-top: 6px;
  font: 24px/32px PingFangSC-Regular;
  color: #999;
}

/* 商品信息-商品价格 */
goods-price {
  display: block;
  overflow: hidden;
  margin-top: 10px;
}

/* 商品信息-商品价格-售价 */
sale-price {
  display: inline-block;
  overflow: hidden;
  font: 34px/1 PingFangSC-Regular;
  color: #ad0e11;
}

sale-price:before {
  content: "¥";
  font-size: 28px;
}

/* 商品信息-商品价格-划价 */
daily-price {
  display: inline-block;
  overflow: hidden;
  margin-left: 6px;
  font: 24px/26px PingFangSC-Regular;
  text-decoration: line-through;
  color: #ccc;
}

daily-price:before {
  content: "¥";
}

/* 商品信息-商品VIP价格 */
goods-vipprice {
  margin-top: 10px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

goods-vipprice:before {
  content: "VIP";
  display: inline-block;
  border: 1px solid #E0CE94;
  border-radius: 4px;
  padding: 2px 4px;
  margin-right: 6px;
  font: 20px/1 PingFangSC-Regular;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#faf9f1), to(#eee4c0));
  background-image: -webkit-linear-gradient(top, #faf9f1 0%, #eee4c0 100%);
  background-image: linear-gradient(-180deg, #faf9f1 0%, #eee4c0 100%);
  color: #ac8849;
  position: relative;
  top: -2px;
}

/* 商品信息-商品VIP价格-VIP价格 */
vip-price {
  display: inline-block;
  font: 28px/1 PingFangSC-Regular;
  color: #ac8849;
}

vip-price:before {
  content: "¥";
}

/* 商品信息-标签列表 */
goods-tag-list {
  display: block;
  overflow: hidden;
  margin-top: 10px;
}

/* 商品信息-标签列表-标签 */
goods-tag {
  display: inline-block;
  overflow: hidden;
  border-radius: 4px;
  padding: 0 5px;
  height: 26px;
  font: 20px/26px PingFangSC-Regular;
  letter-spacing: -0.71px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: #D87672;
  color: #ffffff;
}

/* 组件脚 */
module-footer {
  display: block;
  overflow: hidden;
}
```

## 二、VM模版开发示例

> 下面以“猜你喜欢”组件为例，给出了VM书写模版。开发新组件只需要复制以下代码并在此基础上开发即可。例如开发的组件名为 `h5DaliyHot`:
> - 修改 <cms-module> 上的 `h5-guess-like` 为 `h5-daliy-hot`
> - 修改 <module-main> 上的 `guess-like-cont` 为 `daliy-hot-cont`
> - 主体内容写在 <module-main> 内
> - ***加载更多*** 等操作写在 <module-footer> 内

```html
<cms-module class="h5-guess-like" style="
    #if($!{cms_module_marginBottom}!='')margin-bottom: $!{cms_module_marginBottom}px;#end
    #if($!{cms_module_backgroundUrl}!='') background-image: url($!{cms_module_backgroundUrl});#end
    #if($!{cms_module_backgroundColor}!='') background-color: $!{cms_module_backgroundColor}#end">

    #if($!{cms_module_title}!='')
    <module-header>
        <module-title style="#if($!{cms_module_titleColor}!='')color:$!{cms_module_titleColor}#end">
        $!{cms_module_title
        </module-title>
        #if$!{cms_module_subtitle}!='')
        <module-subtitle>$!{cms_module_subtitle}</module-subtitle>
        #end
    </module-header>
    #end

    <module-main class="guess-like-cont">
        <!-- 主体内容 -->
        <goods-cont class="guess-like" data-href="{{h5link}}" data-id="{{id}}" data-spm="{{spm}}">
            <goods-img>
                <img src="{{imgUrl}}?imageView2/0/w/360" alt="商品图片">
            </goods-img>
            <goods-info>
                <goods-name class="ellipsis"><video-tag></video-tag> {{name}}</goods-name>
                <goods-desc class="ellipsis3">{{subName}}</goods-desc>
                <goods-price>
                    <sale-price>{{price}}</sale-price>
                    <daily-price>{{dailyPrice}}</daily-price>
                </goods-price>
                <goods-vipprice>
                    <vip-price>{{vipPrice}}</vip-price>
                </goods-vipprice>
                <goods-tag-list>
                    <goods-tag style="background-color: {{color}}">{{label}}</goods-tag>
                    <goods-tag style="background-color: {{color}}">{{label}}</goods-tag>
                </goods-tag-list>
            </goods-info>
            <section class="guess-like__mask hidden">
                <section class="mask-btn-cont">
                    <section class="similarity-btn__yes hidden">看相似</section>
                    <section class="similarity-btn__no">暂无相似</section>
                    <section class="dislike-btn">不喜欢</section>
                </section>
            </section>
        </goods-cont>
    </module-main>

    <!-- <module-footer></module-footer> -->

</cms-module>
```