function debounce(fn, delay) {
  let timer = null;
  return function () {
    let _this = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(_this, args);
    }, delay);
  }
}


function findByMap(array, target) {
  let result = [];
  const map = {};
  for (let i, l = array.length; i < l; i++) {
    let first = array[i];
    map[target - first] = first;
  }
  for (let i, l = array.length; i < l; i++) {
    let first = array[i];
    let second = map[target - first];
    if (first === second) {
      result = [i, target - first];
      break;
    }
  }
  return result;
}