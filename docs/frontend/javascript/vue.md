---
title: Vue
date: 2021.03.06 20:00:00
categories:
  - 前端
tags:
  - Vue
---

## 生命周期

1. 加载渲染过程：父 `beforeCreate` -> 父 `created` -> 父 `beforeMount`  -> 子 `beforeCreate` -> 子 `created` -> 子 `beforeMount` -> 子 `mounted` -> 父 `mounted`。
2. 子组件更新过程：父 `beforeUpdate` -> 子 `beforeUpdate` -> 子 `updated` -> 父 `updated`。
3. 父自建更新过程：父 `beforeUpdate` -> 父 `updated`。
4. 销毁过程：父 `beforeDestroy` -> 子 `beforeDestroy` -> 子 `destroyed` -> 父 `destroyed`。

## 组件通信

### 父子组件通信

1. props + emit
2. $refs + $parent
3. provider + inject

### 兄弟组件通信

1. vuex
2. eventBus
3. `$parent.$refs`

## computed VS watch

1. computed 是计算一个新的属性，并将该属性挂载到 vue 实例上，而 watch 是监听已经存在且已挂载到 vue 实例伤的数据，所以用 watch 同样可以监听 computed 计算属性的变化。
2. computed 本质是一个惰性求值的观察者，具有缓存性，只有当依赖变化后第一次访问 computed 值才会重新计算。而 watch 则是当数据发生变化便会调用执行函数。
3. 从使用场景上来说，computed 适用一个数据便诶对个数据影响，而 watch 适用一个数据影响多个数据。
