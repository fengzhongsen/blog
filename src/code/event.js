class EventEmitter {
  constructor(maxListeners = 10) {
    this.events = {};
    this.maxListeners = maxListeners;
  }

  emit(event, ...args) {
    const cbs = this.events[event];
    if (!cbs) {
      console.log('没有这个事件');
      return this;
    }
    cbs.forEach(cb => cb.apply(this, args));
    return this;
  }

  on(event, cb) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    if (this.maxListeners != Infinity && this.events[event].length >= this.maxListeners) {
      console.warn(`当前事件${event}超过最大监听数`);
      return this;
    }
    this.events[event].push(cb);
    return this;
  }

  once(event, cb) {
    const func = (...args) => {
      this.off(event, func);
      cb.apply(this, args);
    }
    this.on(event, func);
    return this;
  }

  off(event, cb) {
    if (!cb) {
      this.events[event] = null;
    } else {
      this.events[event] = this.events[event].filter(item => item !== cb);
    }
    return this;
  }
}