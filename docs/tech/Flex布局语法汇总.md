---
title: Flex布局语法汇总
date: 2018-03-16 22:59:00
categorys:
  - 技术篇
tags:
  - 前端
  - CSS
---
### 前言：Flex 布局分为多个版本，以下为最新版本语法汇总。
>其中注释所示皆假设主轴为水平方向，且从左到右。

```
/* Flex 布局 属性 总结 */
.box {
    display: flex;                    /* 弹性布局 */
    display: inline-flex;             /* 行内元素 */
    display: -webkit-flex;            /* [Safari] */

    /* 属性决定主轴的方向（即项目的排列方向）。 */
    flex-direction: row;              /* [默认值] 主轴为水平方向，起点在左端。 */
    flex-direction: row-reverse;      /* 主轴为水平方向，起点在右端。 */
    flex-direction: column;           /* 主轴为垂直方向，起点在上沿。 */
    flex-direction: column-reverse;   /* 主轴为垂直方向，起点在下沿。 */

    /* 定义如果一条轴线排不下，如何换行。 */
    flex-wrap: nowrap;                /* [默认值] 不换行。 */
    flex-wrap: wrap;                  /* 换行，第一行在上方。 */
    flex-wrap: wrap-reverse;          /* 换行，第一行在下方。 */

    /* 定义项目在主轴上如何对齐。 */
    justify-content: flex-start;      /* [默认值] 左对齐 */
    justify-content: flex-end;        /* 右对齐 */
    justify-content: center;          /* 居中 */
    justify-content: space-between;   /* 两端对齐，项目之间的间隔都相等。 */
    justify-content: space-around;    /* 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。 */

    /* 定义项目在交叉轴上如何对齐。 */
    align-items: stretch;             /* [默认值] 如果项目未设置高度或设为auto，将占满整个容器的高度。 */
    align-items: flex-start;          /* 交叉轴的起点对齐。 */
    align-items: flex-end;            /* 交叉轴的终点对齐。 */
    align-items: center;              /* 交叉轴的中点对齐。 */
    align-items: baseline;            /* 项目的第一行文字的基线对齐。 */

    /* 多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。 */
    align-content: flex-start;        /* 与交叉轴的起点对齐。 */
    align-content: flex-end;          /* 与交叉轴的终点对齐。 */
    align-content: center;            /* 与交叉轴的中点对齐。 */
    align-content: space-between;     /* 与交叉轴两端对齐，轴线之间的间隔平均分布。 */
    align-content: space-around;      /* 每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。 */
}

.item {
    order: 0;                          /* [默认值 0] 定义项目的排列顺序。数值越小，排列越靠前，默认为0。 */

    flex-grow: 0;                      /* [默认值 0] 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。 */
    flex-shrink: 1;                    /* [默认值 1] 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。 */
    flex-basis: auto;                  /* [默认值 auto] 定义了在分配多余空间之前，项目占据的主轴空间（main size） */

    flex: 0 1 auto;                    /* flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。 */

    /* 允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。 */
    align-self: auto;                  /* [默认值] 表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。 */
    align-self: flex-start;            /* 与 align-items 一致 */
    align-self: flex-end;              /* 与 align-items 一致 */
    align-self: center;                /* 与 align-items 一致 */
    align-self: baseline;              /* 与 align-items 一致 */
    align-self: stretch;               /* 与 align-items 一致 */
}

```
