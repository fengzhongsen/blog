const toString = Object.prototype.toString;

function isUndefined(val) {
  return typeof val === 'undefined';
}

function isString(val) {
  return typeof val === 'string';
}

function isNumber(val) {
  return typeof val === 'number';
}

function isArray(val) {
  return toString.call(val) === '[object Array]';
}

function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

function isDate(val) {
  return toString.call(val) === '[object Date]';
}

function isFile(val) {
  return toString.call(val) === '[object File]';
}

function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

function isObject(val) {
  return val !== null && typeof val === 'object';
}

function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

function isBuffer(val) {
  return val !== null
    && !isUndefined(val)
    && val.constructor !== null
    && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function'
    && val.constructor.isBuffer(val);
}

function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}
