---
title: 数据库设计
date: 2019.04.23 22:59:00
categories:
  - BackEnd
tags:
  - SQL
---

<img src="https://cdn.fblog.top/blog/images/db/db-01.png">

<!-- more -->

## 概述
### 1 什么是数据库设计
简单来说，数据库设计就是根据业务系统的具体需要，结合我们所选用的DBMS(数据库管理系统)，为这个业务系统构造出最优的数据存储模型。并建立好数据库中的表结构及表与表之间的关联关系的过程。使之能有效的对应用系统中的数据进行存储，并可以高效的对已存储的数据进行访问。

::: tip
SQL：MySQL、Oricle、SQLServer、PgSql<br>
NoSQL：Mongo、Redis、Memcache
:::

### 2 为什么要进行数据库设计
减少数据冗余、避免数据维护异常、节约存储空间、高效访问

### 3 数据库设计的步骤
<p>【需求分析】 数据是什么、数据有哪些属性、数据和属性各自的特点有哪些</p>
<p>【逻辑设计】 使用ER图对数据库进行逻辑建模</p>
<p>【物理设计】 根据数据库自身的特点把逻辑设计转换为物理设计</p>
<p>【优化维护】 新的需求进行建表、索引优化、大表拆分</p>

## 一、需求分析
### 1.1 为什么要进行需求分析？
1. 了解系统中所要存储的数据
2. 了解系统的存储特点
3. 了解数据的生命周期
### 1.2 需要搞清楚的一些问题
1. 实体及实体之间的关系(一对一、一对多、多对多)
2. 实体所包含的属性有什么
3. 哪些属性或属性的组合可以唯一标识一个实体
### 1.3 需求分析举例
以一个小型电商网站为例，在这个电商系统中包含几个核心模块：用户模块、商品模块、订单模块、购物车模块、供应商模块。

#### 1.3.1 用户模块
> 用于记录注册用户信息

<p><span class="red">包括属性：</span>用户名、密码、电话、邮箱、身份证号、地址、姓名、昵称...</p>
<p><span class="red">可唯一标识的属性：</span>用户名、身份证、电话</p>
<p><span class="red">存储特点：</span>随系统上线时间逐渐增加，需要永久存储</p>

#### 1.3.2 商品模块
> 用于记录网站中所销售的商品信息</p>

<p><span class="red">包括属性：</span>商品编码、商品名称、商品描述、商品品类、供应商名称、重量、有效期、价格...</p>
<p><span class="red">可唯一标识的属性：</span>（商品名称，供应商名称）、商品编码</p>
<p><span class="red">存储特点：</span>对于下线商品可以归档存储</p>

#### 1.3.3 订单模块
> 用于记录用户订购商品的信息

<p><span class="red">包括属性：</span>订单号、用户姓名、用户电话、收货地址、商品编号、商品名称、数量、价格、订单状态、支付状态、订单类型...</p>
<p><span class="red">可唯一标识的属性：</span>订单号</p>
<p><span class="red">存储特点：</span>永久存储（分表、分库存储）</p>

#### 1.3.4 购物车模块
> 用于保存用户购物时选对的商品

<p><span class="red">包括属性：</span>用户名、商品编号、商品名称、商品描述、商品价格、商品分类、加入时间、商品数量...</p>
<p><span class="red">可唯一标识的属性：</span>（用户名、商品编号、加入时间）、购物车编号</p>
<p><span class="red">存储特点：</span>不用永久存储（设置归档、清理规则）</p>

#### 1.3.5 供应商模块
> 用于保存所销售商品的供应商信息

<p><span class="red">包括属性：</span>供应商编号、供应商名称、联系人、电话、营业执照号、地址、法人...</p>
<p><span class="red">可唯一标识的属性：</span>供应商编号、营业执照号</p>
<p><span class="red">存储特点：</span>永久存储</p>

<img src="https://cdn.fblog.top/blog/images/db/db-02.png">

## 二、逻辑设计
::: tip 什么是逻辑设计
1. 将需求转化为数据库的逻辑模型
2. 通过ER图的型式对逻辑模型进行展示
3. 同所选用的具体的DBMS系统无关
:::
### 2.1 ER图

#### 2.1.1 名词解释
<p><span class="red">关系：</span>一个关系对应通常所说的一张表</p>
<p><span class="red">元组：</span>表中的一行即为一个元组</p>
<p><span class="red">属性：</span>表中的一列即为一个属性，每个属性都有一个属性名</p>
<p><span class="red">候选码：</span>表中的某个属性组，它可以唯一确定一个元组</p>
<p><span class="red">主码：</span>一个关系有多个候选码，选定其中一个为主码</p>
<p><span class="red">域：</span>属性的取值范围</p>
<p><span class="red">分量：</span>元组的一个属性值</p>

#### 2.1.2 图例说明
<p><span class="red">矩形：</span>标识实体集，矩形内写实体集的名字</p>
<p><span class="red">菱形：</span>表示联系关系</p>
<p><span class="red">椭圆：</span>表示实体的属性/p>
<p><span class="red">线段：</span>将属性连接到实体集，或将实体集连接到联系集</p>

<img src="https://cdn.fblog.top/blog/images/db/db-03.png">

### 2.2 设计范式概要
#### 2.2.1 什么是数据库设计范式
常见的数据库设计范式包括：第一范式、第二范式、第三范式、BC范式。当然还有第四范式、第五范式，但是目前我们大多数数据库设计所要遵循的都是第三范式。
#### 2.2.2 数据冗余
数据冗余是指相同的数据在多个地方存在，或者说表中的某个列可以有其他列计算得到，这样就说表中存在数据冗余。

### 2.3 第一范式(1NF)
定义：数据库表中的所有字段都是单一属性，不可再分的。这个单一属性是由基本的数据类型所构成的，如整数、浮点数、字符串等。换句话说<span class="red">第一范式要求数据库中的表都是二维表</span>。

#### 2.3.1 错误示例
<table>
  <tr><td>用户ID</td><td>用户名</td><td>密码</td><td colspan="2">用户信息</td></tr>
  <tr><td></td><td></td><td></td><td>姓名</td><td>电话</td></tr>
  <tr><td>1</td><td>Zhang3</td><td>******</td><td>张三</td><td>138888</td></tr>
</table>

#### 2.3.2 问题分析
几乎没有 DBMS 系统能够创建这样结构的表

#### 2.3.2 正确示例
<table>
  <tr><td>用户ID</td><td>用户名</td><td>密码</td><td>姓名</td><td>电话</td></tr>
  <tr><td>1</td><td>Zhang3</td><td>******</td><td>张三</td><td>138888</td></tr>
</table>

### 2.4 第二范式(2NF)
定义：数据库的表中不存在非关键字段对任一候选关键字段的部分函数依赖。部分函数依赖是指存在着组合关键字中的某一关键字决定非关键字的情况。<span class="red">换句话说：所有的单关键字段的表都符合第二范式。</span>

#### 2.4.1 错误示例
<table>
  <tr><td>商品名称</td><td>供应商名称</td><td>价格</td><td>描述</td><td>重量</td><td>供应商电话</td><td>有效期</td><td>分类</td></tr>
  <tr><td>可乐</td><td>饮料一厂</td><td>3.00</td><td></td><td>250g</td><td>8888888</td><td>2014.12</td><td>饮料</td></tr>
  <tr><td>可乐</td><td>饮料一厂</td><td>3.00</td><td></td><td>250g</td><td>6666666</td><td>2014.12</td><td>饮料</td></tr>
</table>

#### 2.4.2 问题分析
1. 商品和供应商是多对多的关系，所以这张表中使用了组合关键字（商品名称，供应商名称）
2. 存在部分函数依赖关系：商品名称-->（价格，描述，重量，有效期，分类），供应商名称-->供应商电话，所以不符合第二范式。
3. 存在问题：插入异常、删除异常、更新异常、数据冗余

#### 2.4.2 正确示例
<table>
    <tr><td>商品ID</td><td>商品名称</td><td>价格</td><td>描述</td><td>重量</td><td>有效期</td><td>分类</td></tr>
    <tr><td>1</td><td>可乐</td><td>3.00</td><td></td><td>250g</td><td>2014.12</td><td>饮料</td></tr>
  </table>
  <table>
    <tr><td>供应商ID</td><td>供应商名称</td><td>供应商电话</td></tr>
    <tr><td>1</td><td>饮料一厂</td><td>8888888</td></tr>
    <tr><td>2</td><td>饮料二厂</td><td>6666666</td></tr>
  </table>
  <table>
    <tr><td>商品ID</td><td>供应商ID</td></tr>
    <tr><td>1</td><td>1</td></tr>
    <tr><td>2</td><td>1</td></tr>
  </table>
 
### 2.5 第三范式(3NF)
定义：第三范式是在第二范式的基础上定义的，如果数据表中不存在非关键字段对任任意候选关键字段的传递函数依赖则符合第三范式。

#### 2.5.1 错误示例
<table>
  <tr><td>商品名称</td><td>价格</td><td>描述</td><td>重量</td><td>有效期</td><td>分类</td><td>分类描述</td></tr>
  <tr><td>可乐</td><td>3.00</td><td></td><td>250g</td><td>2014.12</td><td>酒水饮料</td><td>碳酸饮料</td></tr>
  <tr><td>苹果</td><td>8.00</td><td></td><td>500g</td><td></td><td>生鲜食品</td><td>水果</td></tr>
</table>

#### 2.5.2 问题分析
1. 存在传递函数依赖：商品名称-->分类-->分类描述，也就是说存在非关键字段“分类描述”对关键字段“商品名称”的传递函数依赖
2. （分类，分类描述）对于每一个商品都会进行记录
3. 存在问题：插入异常、删除异常、更新异常、数据冗余

#### 2.5.3 正确示例
<table>
  <tr><td>商品ID</td><td>商品名称</td><td>价格</td><td>描述</td><td>重量</td><td>有效期</td></tr>
  <tr><td>1</td><td>可乐</td><td>3.00</td><td></td><td>250g</td><td>2014.12</td></tr>
</table>

<table>
  <tr><td>分类ID</td><td>分类</td><td>分类描述</td></tr>
  <tr><td>1</td><td>酒水饮料</td><td>碳酸饮料</td></tr>
</table>

<table>
  <tr><td>商品ID</td><td>分类ID</td></tr>
  <tr><td>1</td><td>1</td></tr>
</table>

### 2.6 Boyce.Codd范式(BCNF)
定义：在第三范式的基础之上，数据库表中如果不存在任何字段对对任一候选关键字的传递函数依赖则符合BC范式。也就是说如果是复合关键字，则复合关键字之间也不能存在函数依赖关系。

#### 2.6.1 错误示例
<table>
  <tr><td>供应商</td><td>商品ID</td><td>供应商联系人</td><td>商品数量</td></tr>
  <tr><td>饮料一厂</td><td>1</td><td>张三</td><td>10</td></tr>
  <tr><td>饮料一厂</td><td>2</td><td>李四</td><td>20</td></tr>
  <tr><td>饮料二厂</td><td>1</td><td>王五</td><td>20</td></tr>
</table>

#### 2.6.2 问题分析
1. 假定供应商联系人只能受雇于一家供应商，每家供应商可以供应多个商品
2. 存在决定关系：（供应商，商品ID）-->（联系人，商品数量），（供应商联系人，商品ID）-->（供应商，商品数量），供应商-->供应商联系人，供应商联系人-->供应商
3. 存在问题：插入异常、删除异常、更新异常、数据冗余

#### 2.6.3 正确示例
<table>
  <tr><td>供应商</td><td>商品ID</td><td>商品数量</td></tr>
  <tr><td>饮料一厂</td><td>1</td><td>10</td></tr>
  <tr><td>饮料一厂</td><td>2</td><td>20</td></tr>
  <tr><td>饮料二厂</td><td>1</td><td>20</td></tr>
</table>

<table>
  <tr><td>供应商</td><td>供应商联系人</td></tr>
  <tr><td>饮料一厂</td><td>张三</td></tr>
  <tr><td>饮料一厂</td><td>李四</td></tr>
  <tr><td>饮料二厂</td><td>王五</td></tr>
</table>

## 三、物理设计
### 3.1 数据库物理设计要做什么
1. 选择合适的数据库管理系统。
2. 定义数据库、表及字段的命名规范。
3. 根据所选的DBMS系统选择合适的字段类型。
4. 反范式化设计。

### 3.2 选择哪种数据库

<img src="https://cdn.fblog.top/blog/images/db/db-04.png">

1. 对于商业数据库考虑成本。
2. Oracle 适合大的事务操作，性能相对较高。
3. SQLServer 只适用于 Windos 系统，适合跟.NET项目配合使用。

### 3.3 MYSQL常用存储引擎
只要符合MySQL的存储协议，任何厂商都可以实现自己的存储引擎，以下是常用的几种存储引擎。

存储引擎 | 事务 | 锁粒度 | 主要应用 | 忌用
-| -| - | - | -
MyISAM | 不支持 | 支持并发插入的表级锁 | SELECT，INSERT | 读写操作频繁
MIRG_MyISAM | 不支持 | 支持并发插入的表级锁 | 分段归档，数据仓库 | 全局查找过多的操作
Innodb | 支持 | 支持多版本并发控制（MVCC）的行级锁 | 事务处理 | 无
Aechive | 不支持 | 行级锁 | 日志记录，只支持INSERT和SELECT | 需要随机读取、更新、删除
Ndb cluster | 支持 | 行级锁 | 高可用性 | 大部分应用

1. MyISAM 适合于读很多而写很少的应用场景。
2. MIRG_MyISAM 可以把多个结构相同的 MyISAM 表合并成一个表进行处理，比较像视图或者分区的功能。
3. Innodb 是 MySQL5.5 之后的默认存储引擎，也是目前在大多数互联网应用中建议使用的存储引擎。
4. Aechive 的优势是占用空间小，但是只支持 INSERT 和 SELECT，适合日志记录。
5. Ndb cluster 是 MySQL 集群（内存型的集群）所使用的存储引擎。

### 3.4 数据库表及字段的命名规则
#### 3.4.1 可读性原则
是用大写和小写来格式化的库对象名字以获得良好的可读性。例如：使用 CustAddres 而不是 custaddress 来提高可读性。这里需要注意有些 DBMS 系统对表明的大小写是敏感的。

#### 3.4.2 表意性原则
对象的名字应该能够描述它所标识的对象。例如：对于表，表的名称应该能够体现表中存储的数据内容；对于存储过程，存储过程的名称应该能够体现存储过程的功能。

#### 3.4.3 长名原则
尽可能少使用或者不适用缩写，适用于数据库（DATEBASE）名之外的任一对象。

### 3.5 数据库字段类型选择原则

<img src="https://cdn.fblog.top/blog/images/db/db-05.png">

#### 3.5.1 考虑因素
字段类型选择原则主要是从下面两个角度考虑：
1. 在对数据进行比较（查询条件、JOIN条件及排序）操作时：<span class="red">同样的数据，字符串的处理往往比数字处理慢。</span>
2. 在数据库中，数据处理以页为单位，<span class="red">列的长度越小，利于性能提升。</span>

::: tip
不同的关系型数据库中页的大小是不一样的，例如：SQLServer 每页是 8K，MySQL 的 Innodb 中默认每页是 16K。而列的长度越小，我们在一个页中所能存储的数据量越多。这样的话，在加载相同的数据量是，列的长度越小则加载的页数就越少，使得 IO 的性能得到提升，而数据库的性能瓶颈正式 IO 层面的性能。
:::

#### 3.5.2 选择原则
<p class="paragraph">列的数据类型一方面影响数据存储空间的开销，另一方面也会影响数据查询性能。当一个列可以选择多个数据类型时，应该优先考虑数据类型，其次是日期或二进制类型，最后是字符串类型。对于相同级别的数据类型，应该优先选择占用空间小的数据类型。</p>

#### 3.5.3 MySQL 的数据类型

列类型 | 存储空间（单位：字节）
- | -
TINYINT | 1
SMALLINT | 2
MEDIUMINT | 3
INT | 4
BIGINT | 8
DATE | 3
DATETIME | 8
TIMESTEMP | 4
CHAR(M) | M，1 <= M <= 255
VARCHAR(M) | L + 1，L <= M && 1 <= M <= 255



### 3.6 数据库如何具体选字段类型
#### 3.6.1 char 和 varchar 如何选择
1. 如果列中要存储的数据长度差不多是一致的，则应该考虑用 char；否则应该考虑 carchar。
2. 如果列中的最大数据长度小于 50Byte，则一般也考虑用 char。（当然，如果这个列很少用，则基于节省空间和减少 I/O 的考虑，还是可以选择用 varchar 的。）
3. 一般不宜定义大于 50Byte 的 char 类型列。

#### 3.6.2 decimal 和 float 如何选择
1. decimal 用于存储精确数据，而 float 只能用于存储非精确数据。故精确数据只能选用 decimal 类型。
2. 由于 float 的存储空间开销一般比 decimal 小，故非精确数据优先选择 float 类型。

::: tip
float 精确到7位小数只需要4个字节，而精确到15位小数只需要8个字节。
::: 

#### 3.6.3 时间类型如何存储
1. 使用 int 来存储时间字段的优缺点<br>
优点：字段长度比 datetime 小<br>
缺点：使用不方便，需要进行函数转换<br>
限制：只能存储到 2038-1-19 11:14:07 即 2^32 为 2147483648

2. 需要存储的时间粒度<br>
年、月、日、时、分、秒、周

::: tip
1. 如果时间经常被使用，建议使用 datetime 进行存储，如果知识进行存储而很少被查询和使用则建议使用 int 存储。比如：生日很少被使用则可以使用 int 存储，而订单时间则经常需要查询，并且订单状态经常需要进行时间判断，则建议使用 datetime 存储。
2. 根据需要存储的时间粒度选择类型，如果需要存储“年月日时分秒”则可以选择 datetime，如果只需要存储“年”则可以选择 year 类型（只需要1个字节）。
:::

### 3.7 数据库设计其他注意事项
#### 3.7.1 如何选择主键
1. 区分业务主键和数据库主键<br>
业务主键用于标识业务数据，进行表与表之间的关联；<br>
数据库主键为了优化数据库存储（Innodb 会生成6个字节的隐含主键）。

::: tip 知识延展
- 在 Innodb 引擎中只能有一个聚集索引，我们知道，聚集索引的叶子节点上直接存有行数据，所以聚集索引列尽量不要更改，而Innodb 表在有主键时会自动将主键设为聚集索引，如果不显式定义主键，会选第一个没有null值的唯一索引作为聚集索引，唯一索引涉及到的列内容难免被修改引发存储碎片且可能不是递增关系，存取效率低，所以最好显式定义主键且采用与业务无关的列以避免修改；如果这个条件也不符合，就会自动添加一个不可见不可引用的 6byte 大小的 rowid 作为聚集索引。

- 需采用自增列来使数据顺序插入，新增数据顺序插入到当前索引的后面，符合叶子节点的分裂顺序，性能较高；若不用自增列，数据的插入近似于随机，插入时需要插入到现在索引页的某个中间位置，需要移动数据，造成大量的数据碎片，索引结构松散，性能很差。

- 在主键插入时，会判断是否有重复值，所以尽量采用较小的数据类型，以减小比对长度提高性能，且可以减小存储需求，磁盘占用小，进而减少磁盘IO和内存占用；而且主键存储占用小，普通索引的占用也相应较小，减少占用，减少IO，且存储索引的页中能包含较多的数据，减少页的分裂，提高效率。
:::

2. 根据数据库的类型，考虑主键是否需要顺序增长<br>
有些数据库是按照主键的逻辑顺序存储的。

3. 主键的字段类型所占空间要尽可能的小<br>
对于使用聚集索引存储的表，每个索引后都会附加主键信息。

#### 3.7.2 避免使用外键约束
1. 降低数据导入的效率，高并发场景很明显
2. 增加维护成本
3. 虽然不建议使用外键约束，但是相关联的列上一定要建立索引

#### 3.7.3 避免使用触发器
1. 降低数据导入的效率
2. 可能会出现意想不到的数据异常
3. 是业务逻辑变得复杂

#### 3.7.4 关于预留字段
1. 无法准确的知道预留字段的类型
2. 无法准确的知道预留字段中所存储的内容
3. 后期维护预留字段所要的成本，同增加一个字段所要的成本是相同的
4. <span class="red">严禁</span>使用预留字段

### 3.8 反范式化表设计
<p class="paragraph"><span class="red">反范式化</span>是针对范式化而言的，在前面介绍了数据库设计的第三范式，所谓的反范式化就是为了<span class="red">性能</span>和<span class="red">读取效率</span>考虑而适当的对第三范式的要求进行<span class="red">违反</span>，而允许存在少量的数据冗余。换句话说反范式化就是使用空间换取时间。</p>

#### 3.8.1 为什么反范式化
1. 减少表的关联数量
2. 提高数据的读取效率

::: warning
反范式化一定要适度
:::

#### 3.8.2 符合范式化的设计

表名 | 包含字段
- | -
用户表<br>(User) | 用户ID、姓名、电话、地址、邮编<br>(user_id、user_name、phone、address、postcode)
订单表<br>(Order) | 订单ID、用户ID、下单时间、支付类型、订单状态<br>(order_id、user_id、order_time、payment_type、order_status)
订单商品表<br>(OrderProduct) | 订单ID()、商品ID、商品数量、商品价格<br>(order_id、product_id、product_num、product_price)
商品表<br>(Product) | 商品ID、商品名称、描述、过期时间<br>(product_id、product_name、product_desc、product_express)

```sql
-- 查询订单信息
SELECT b.user_name, b.phone, b.address, a.order_id
       , SUM(c.product_price * c.product_num) AS order_price
FROM `Order` a
JOIN `User` b ON a.user_id = b.user_id
JOIN `OrderProduct` c ON c.order_id = b.order_id
GROUP BY b.user_name, b.phone, b.adderss, a.order_id

-- 查询订单详情
SELECT b.user_name, b.phone, b.address, a.order_id
       , SUM(c.product_price * c.product_num) AS order_price
       , c.product_price
FROM `Order` a
JOIN `User` b ON b.user_id = a.user_id
JOIN `OrderProduct` c ON c.order_id = b.order_id
JOIN `Product` d ON d.product_id = c.product_id
```

#### 3.8.3 反范式化设计

表名 | 包含字段
- | -
用户表<br>(User) | 用户ID、姓名、电话、地址、邮编<br>(user_id、user_name、phone、address、postcode)
订单表<br>(Order) | 订单ID、用户ID、下单时间、支付类型、订单状态、<span class="red">订单价格、姓名、电话、地址</span><br>(order_id、user_id、order_time、payment_type、order_status、<span class="red">order_price、user_name、phone、address</span>)
订单商品表<br>(OrderProduct) | 订单ID、商品ID、商品数量、商品价格、<span class="red">商品名称、过期时间<br></span>(order_id、product_id、product_num、product_price、<span class="red">product_name、product_express</span>)
商品表<br>(Product) | 商品ID、商品名称、描述、过期时间<br>(product_id、product_name、product_desc、product_express)

```sql
-- 查询订单信息
SELECT a.user_name, a.phone, a.address, a.order_id, a.order_price
FROM `Order` a

-- 查询订单详情
SELECT b.user_name, b.phone, b.address
       , a.order_id
       , c.product_name, c.product_express, c.product_num, c.product_price
FROM `Order` a
JOIN `User` b ON a.user_id = b.user_id
JOIN `OrderProduct` c ON c.order_id = b.order_id
```

## 四、维护优化
::: tip 数据库维护和优化要做什么
1. 维护数据字典
2. 维护索引
3. 维护表结构
4. 在适当的时候对表进行水平拆分或垂直拆分
:::

### 4.1 数据库如何维护数据字典
#### 4.1.1 使用第三方工具对数据字典进行维护
#### 4.1.2 利用数据库本身的备注字段来维护数据字典
以 MySQL 为例：
```sql
-- 创建表的时候使用 COMMENT 功能进行备注
CREATE TABLE customer(
  cust_id INT AUTO_INCREMENT NOT NULL COMMENT '自增ID',
  cust_name VARCHAR(10) NOT NULL COMMENT '客户姓名',
  PRIMARY KEY (cust_id)
) COMMENT '客户表'

-- 导出数据字典
SELECT a.table_name, b.TABLE_COMMENT, a.COLUMN_NAME, a.COLUMN_TYPE, a.COLUMN_COMMENT
FROM information_schema.COLUMNS a
JOIN informatuon_schema.TABLES b ON a.table_schema = b.table_schema AND a.table_name = b.table_name
WHERE a.table_name = 'customer'
```

### 4.2 数据库如何维护索引
#### 4.2.1 如何选择合适的列建立索引
1. 出现在 WHERE 从句，GROUP BY 从句，ORDER BY 从句中的列
2. 可选择性高的列要放到索引前面
3. 索引中不要包括太长的数据类型

#### 4.2.2 注意事项
1. 索引并不是越多越好，过多的索引不但会降低写效率而且会降低读效率
2. 定期维护索引碎片
3. 在 SQL 语句中不要使用强制索引关键字

### 4.3 如何维护表结构
#### 4.3.1 使用在线变更表结构的工具
1. MySQL5.5 之前可以使用 pt-online-schema-change
2. MySQL5.6 之后本身支持在线表结构的变更

#### 4.3.2 同时对数据字典进行维护
#### 4.3.3 控制表的宽度和大小


### 4.4 数据库中适合的操作
#### 4.4.1 批量操作 VS 逐条操作
数据库更适合批量操作

#### 4.4.2 禁止使用 SELECT * 这样的查询
1. 防止查询不必要的字段造成资源浪费
2. 避免程序出错

#### 4.4.3 控制使用用户自定义的函数
如果使用了函数，这个列中的索引就会不起作用

#### 4.4.4 不要使用数据库中的全文索引
1. 全文索引会另外创建索引文件对索引进行维护
2. 对中文不是很友好
3. 如果需要的话，建议使用专业的搜索引擎代替数据库中的全文索引功能

### 4.5 数据库表的垂直和水平拆分
#### 4.5.1 表的垂直拆分
::: tip 为了控制表的宽度可以进行表的垂直拆分
1. 经常一起查询的列放在一起
2. text、blob 等大字段拆分出来放到附加表中
:::

拆分前
列1 | 列2 | 列 3| 列4 | 列5 | 列6 | 列7
- | - | - | - | - | - | -

拆分后
列1 | 列2 | 列 3| 列4
- | - | - | -

列1 | 列5 | 列6 | 列7
 - | - | - | -

#### 4.5.2 表的水平拆分
::: tip 为了控制表的大小可以进行表的水平拆分
1. 可以通过组建哈希的方法
2. 拆分后的表结构是相同的
:::

<img src="https://cdn.fblog.top/blog/images/db/db-06.png">

拆分前
列1 | 列2 | 列 3| 列4 | 列5 | 列6 | 列7
- | - | - | - | - | - | -

拆分后
列1 | 列2 | 列 3| 列4 | 列5 | 列6 | 列7
- | - | - | - | - | - | -

列1 | 列2 | 列 3| 列4 | 列5 | 列6 | 列7
- | - | - | - | - | - | -

完毕！

## 五、参考文献
1. [数据库设计 | 慕课网](https://www.imooc.com/video/1938)
2. [MySQL中innodb表主键设计原则](https://www.cnblogs.com/xiaoyanger/p/5511529.html)
