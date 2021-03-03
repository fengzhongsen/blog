---
title: 【Python3】字符编码
date: 2018.03.09 12:00:00
categories:
  - 技术篇
tags: 
  - Python
  - 后端
---

## 一、字符编码
1. `8bit = 1字节`
2. `ASCLL` 编码一共有 `127` 个字符，包含大小写英文字母、数字和一些符号。
3. 中国制定了 `GB2312编码`，用来把中文编进去。日本把日文编到 `Shift_JIS` 里，韩国把韩文编到 `Euc-kr` 里。
4. `Unicode` 把所有语言都统一到一套编码里，避免了乱码的出现。
5. `ASCII编码` 和 `Unicode编码` 的区别：`ASCII编码` 是1个字节，而 `Unicode编码` 通常是2个字节（如果要用到非常偏僻的字符，就需要4个字节）。
6. “可变长编码”的 `UTF-8编码`。`UTF-8编码` 把一个 `Unicode` 字符根据不同的数字大小编码成1-6个字节，常用的英文字母被编码成1个字节，汉字通常是3个字节，只有很生僻的字符才会被编码成4-6个字节。
7. `ASCII编码`实际上可以被看成是 `UTF-8编码` 的一部分。
8. 现在计算机系统通用的字符编码工作方式：在计算机内存中，统一使用 `Unicode编码`，当需要保存到硬盘或者需要传输的时候，就转换为 `UTF-8编码`。

## 二、字符串
1. 在最新的 `Python 3` 版本中，字符串是以 `Unicode` 编码的。

2. `Python` 提供了 `ord()` 函数获取字符的整数表示，`chr()` 函数把编码转换为对应的字符。如果知道字符的整数编码，还可以用十六进制这么写。例如：
```python
ord('中')  // 20013
chr(25991)  // '文'
'\u4e2d\u6587' //'中文'
```

3. Python对bytes类型的数据用带b前缀的单引号或双引号表示。例如：b’ABC’。

4. 以Unicode表示的str通过encode()方法可以编码为指定的bytes。要把bytes变为str，就需要用decode()方法。例如：
```python
'中文'.encode('utf-8') // b'\xe4\xb8\xad\xe6\x96\x87'
b'\xe4\xb8\xad\xe6\x96\x87'.decode('utf-8') // '中文' 。
```

5. 如果bytes中只有一小部分无效的字节，可以传入errors='ignore'忽略错误的字节。例如：
```python
b'\xe4\xb8\xad\xff'.decode('utf-8', errors='ignore') // '中'
```

6. `len()` 函数计算的是 `str` 的字符数，如果换成 `bytes`，`len()` 函数就计算字节数。例如：
```python
len('中文’) // 2
len('中文'.encode('utf-8’)) // 6
```
7. `#!/usr/bin/env python3` 是为了告诉 `Linux/OS X` 系统，这是一个 `Python` 可执行程序。
8. `# -*- coding: utf-8 -*-` 是为了告诉 `Python`解释器，按照 `UTF-8`编码读取源代码。