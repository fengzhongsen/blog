Function.prototype._call = function call(context, ...args) {
  context.fn = this;
  const result = content.fn(...args);
  delete context.fn;
  return result;
}

Function.prototype._apply = function apply(context, args) {
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
}

Function.prototype._bind = function bind(context, ...args) {
  return function () {
    context._call(context, ...args);
  }
}
