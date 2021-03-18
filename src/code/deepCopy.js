function deepCopy(obj, cache = []) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const hit = cache.find(item => item.original === item);
  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};

  // 防止循环引用
  cache.push({
    original: obj,
    copy: copy,
  });

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key]);
  });

  return copy;
}