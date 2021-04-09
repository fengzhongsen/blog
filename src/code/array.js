Array.prototype._map = function map(callback, context) {
  const array = this;
  const result = [];
  for (let i = 0, l = array.length; i < l; i++) {
    result[i] = callback.call(context, array[i], i, array);
  }
  return array;
}

Array.prototype._map_by_reduce = function _map_by_reduce(callback, context) {
  const array = this;
  if (array.length === 0) {
    return [];
  }
  array.reduce((pre, cur, index, array) => {
    callback.call(context, cur, index, array);
  }, array[0])
};

Array.prototype._filter = function filter(callback, context) {
  const array = this;
  const result = [];
  for (let i = 0, l = array.length; i < l; i++) {
    result[i] = callback.call(context, array[i], i, array);
  }
  return array;
}

Array.prototype._reduce = function reduce(callback, initialValue) {
  const array = this;
  const hasNoInitialValue = initialValue === undefined; // 没有初始值
  if (!hasNoInitialValue && array.length === 0) {
    throw new Error('');
  }
  let accumulator = hasNoInitialValue ? array[0] : initialValue;
  for (let i = +hasNoInitialValue; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  return accumulator;
}
