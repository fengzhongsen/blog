class XhrHook {
  constructor(beforeHooks = {}, afterHooks = {}) {
    this.XHR = window.XMLHttpRequest;
    this.beforeHooks = beforeHooks;
    this.afterHooks = afterHooks;
    this.init();
  }

  init() {
    let _this = this;
    window.XMLHttpRequest = function () {
      this._xhr = new _this.XHR();
      this.overwrite(this);
    }
  }

  overwrite(proxyXHR) {
    for (const key in proxyXHR._xhr) {
      if (typeof proxyXHR._xhr[key] === 'function') {
        this, this.overwriteMethod(key, proxyXHR);
        continue;
      }
      this.overwriteAttributes(key, proxyXHR);
    }
  }

  overwriteMethod(key, proxyXHR) {
    let beforeHooks = this.beforeHooks; // 拦截行为
    let afterHooks = this.afterHooks;

    proxyXHR[key] = (...args) => {
      // 拦截
      if (beforeHooks[key]) {
        const res = beforeHooks[key].call(proxyXHR, args);
        if (res === false) {
          return;
        }
      }

      const res = proxyXHR._xhr[key].apply(proxyXHR._xhr, args);
      afterHooks[key] && afterHooks[key].apply(proxyXHR._xhr, res);
      return res;
    }
  }

  overwriteAttributes(key, proxyXHR) {
    Object.defineProperties(proxyXHR, key, this.setPropertyDescriptor(key, proxyXHR));
  }

  setPropertyDescriptor(key, proxyXHR) {
    let obj = Object.create(null);
    let _this = this;
    obj.set = function (val) {
      if (!key.startsWith('on')) {
        proxyXHR['__' + key] = val;
        return;
      }

      if (_this.beforeHooks[key]) {
        this._xhr[key] = function (...args) {
          _this.beforeHooks[key].call(proxyXHR);
          val.apply(proxyXHR, args);
        }
        return;
      }

      this._xhr[key] = val;
    }

    obj.get = function () {
      return proxyXHR['__' + key] || this._xhr[key];
    }
  }
}

new XhrHook({
  open: function () {
    console.log('open');
  },
  onload: function () {
    console.log('onload');
  },
  onreadystatechange: function () {
    console.log('onreadystatechange');
  },
  onerror: function () {
    console.log('error');
  }
})

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.baidu.com', true);
xhr.open();
xhr.send();
xhr.onreadystatechange = function (res) {
  console.log(res);
}