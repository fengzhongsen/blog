function checkWebp() {
  try {
    return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
  } catch (e) {
    return false;
  }
}

const supportWebp = checkWebp();

export function getWebpImageUrl(url) {
  if (!url) {
    throw Error('url 不能为空');
  }

  if (url.startsWith('data')) {
    return url;
  }

  if (!supportWebp) {
    return url;
  }

  return url + '?'
}