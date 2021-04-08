function limitLoad(urls, handler, limit) {
  const sequence = [].concat(urls);
  let promises = [];

  promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      return index;
    });
  });

  let p = Promise.race(promises);
  for (let i = 0; i < sequence.length; i++) {
    p = p.then((res) => {
      promises[res] = handler(sequence[i]).then(() => {
        return res;
      });
      return Promise.race(promises);
    })
  }
}