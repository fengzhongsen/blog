/**
 * 快速排序
 * @param {Array} arr 
 * @returns 
 */
function quickSort(arr) {
  if (arr.length === 0) {
    return;
  }

  const little = [];
  const large = [];
  const datum = arr[0];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item < datum) {
      little.push(item);
    } else {
      large.push(item);
    }
  }

  return quickSort(little).concat(datum, quickSort(large));
}