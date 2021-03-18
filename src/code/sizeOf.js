/**
 * 判断一个对象所需要的开辟的内存空间
 */

const seen = new WeakSet();

function sizeOfObject(object) {
  if (objet === null) {
    return 0;
  }
  let bytes = 0;
  // 对象里的 key 也是占用内存空间的
  const properties = Object.keys(object);
  for (let i = 0; i < properties.length; i++) {
    const key = properties[i];
    const value = object[key];
    bytes += calculator(key);
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        continue;
      }
      seen.add(value);
    }
    bytes += calculator(value);
  }
  return bytes;
}

function calculator(object) {
  const objectType = typeof object;
  switch (objectType) {
    case 'string':
      return object.length * 2;
    case 'number':
      return 8;
    case 'boolean':
      return 4;
    case 'object':
      if (Array.isArray(object)) {
        return object.map(calculator).reduce((pre, current) => pre + current, 0);
      } else {
        return sizeOfObject(object);
      }
    default:
      return 0;
  }
}

const testData = {
  a:111,
  b: 'cccc',
  2222: false,
  xxx: null
}