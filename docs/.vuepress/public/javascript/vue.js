/**
 * Dep 的作用是作为 Observer 与 Watcher 的中转站,
 * 接收 Observer 发出的变化通知，转告给 Watcher 并进行变化后相应的处理
 */
class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
  notify(val, oldVal) {
    for (const watcher of this.subs) {
      watcher.update(val, oldVal);
    }
  }
}

/**
 * Watcher 的作用是接收变化的通知，并且执行相应的函数
 */
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    this.get();
  }
  update(val, oldVal) {
    this.cb.call(this.vm, val, oldVal);
  }
  get() {
    Dep.target = this;
    let value = this.vm[this.key];
    Dep.target = null;
  }
}

/**
 * Observer 的作用将数据进行 getter 与 setter 的转化，使其变为可响应的
 */
class Observer {
  constructor(data) {
    this.data = data;
    this.init(this.data);
  }
  init(data) {
    // init 方法使用核心的 Object.defineProperty 进行实际的转化操作
    if (!data || typeof data !== 'object') return;
    for (const key in data) {
      this.defiReactive(data, key, data[key]);
    }
  }
  defiReactive(data, key, val) {
    let oldVal = val;
    let dep = new Dep();
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 为保证不会重复添加依赖，使用 Dep.target 进行判断
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return oldVal;
      },
      set(val) {
        // 进行简单的值对比，相同就不触发后续操作
        if (oldVal === val) return;
        dep.notify(val, oldVal);
        oldVal = val;
      }
    })
  }
}

/**
 *  Compile 是用于进行模板解析的（这部分和源码完全不同，纯粹是为了简单实现渲染）
 */
class Compile {
  constructor(vm, el, data) {
    this.vm = vm;
    this.el = el;
    this.data = data;
    let nodes = document.querySelector(el).childNodes;
    this.compileNodes(nodes);
  }
  compileNodes(nodes) {
    for (const node of nodes) {
      // 判断节点的类型，1为标签类型，3为文本类型
      switch (node.nodeType) {
        case 1:
          this.compileNodes(node);
          break;
        case 3:
          this.compileText(node);
        default:
          break;
      }
      // 这里判断是否有标签嵌套情况，然后进行递归
      node.childNodes && node.childNodes.length && this.compileNodes(node.childNodes);
    }
  }
  // 对于文本类型，我们需要解析内部的属性，用来填充内部的文本
  compileText(node) {
    let reg = /\{\{(.*)\}\}/;
    if (node.textContent !== '' && reg.test(node.textContent)) {
      // 获取文本绑定的 data 属性的 key
      let key = reg.exec(node.textContent)[1];
      node.textContent = this.vm[key];
      // new Watcher 用来进行依赖的收集，当我绑定的这个值发生改变的时候再执行相应的函数
      new Watcher(this.vm, key, (val) => {
        node.textContent = val;
      })
    }
  }
  // 对于标签类型，我们需要解析 attr 属性用来获取标签上监听了什么事件
  compileNode(node) {
    let attrs = node.attributes;
    for (const attr of attrs) {
      if (attr.name.indexOf('@') > -1) {
        let event = attr.name.split('@')[1];
        let key = attr.value;
        node.addEventListener(event, () => {
          this.vm[key]();
        })
      }
      if (attr.name.indexOf('v-model') > -1) {
        let key = attr.value;
        node.value = this.vm[key];
        node.addEventListener('input', (event) => {
          this.vm[key] = event.target.value;
        });
        new Watcher(this.vm, key, (val) => {
          node.value = val;
        })
      }
    }
  }
}

class Vue {
  constructor({ el, data, methods, watch, created, mounted }) {
    this.el = el;
    this.data = data();
    this.methods = methods;
    this.watch = watch;
    // 用来代理 vue 的各种属性
    this.proxy();
    // 进行数据劫持
    new Observer(this.data);
    created && created.call(this);
    // 初始化 watch
    this.initWatch()
    // 模板解析
    new Compile(this, el, this.data);
    mounted && mounted.call(this);
  }
  initWatch() {
    for (const key in this.watch) {
      new Watcher(this, key, this.watch[key]);
    }
  }
  proxy() {
    for (const key in this.data) {
      Object.defineProperty(this, key, {
        enumerable: false,
        configurable: true,
        get() {
          return this.data[key]
        },
        set(val) {
          this.data[key] = val;
        }
      })
    }
    for (const key in this.methods) {
      Object.defineProperty(this, key, {
        enumerable: false,
        configurable: true,
        get() {
          return this.methods[key];
        },
        set(val) {
          this.methods[key] = val;
        }
      })
    }
  }
}