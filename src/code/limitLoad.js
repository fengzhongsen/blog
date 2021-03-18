function limitLoad(urls, handler, limit) {
  const sequence = [].concat(urls);
  let promisees = [];

  promisees = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      return index;
    });
  });

  let p = Promise.race(promisees);
  for (let i = 0; i < sequence.length; i++) {
    p = p.then((res) => {
      promisees[res] = handler(sequence[i]).then(() => {
        return res;
      });
      return Promise.race(promisees);
    })
  }
}