function throttle(fn, interval) {
  let last = 0;
  return function () {
    let _this = this;
    let args = arguments;
    let now = +new Date();
    if (now - last >= interval) {
      last = now;
      fn.apply(_this, args);
    }
  }
}