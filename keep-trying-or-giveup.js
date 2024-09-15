function retry(count, callback) {
  return async function(...args) {
    let attempts = 0;
    while (attempts <= count) {
      try {
        return await callback(...args);
      } catch (error) {
        attempts++;
        if (attempts > count) {
          throw new Error('Max retries reached');
        }
      }
    }
  };
}

function timeout(delay, callback) {
  return async function(...args) {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('timeout')), delay);
    });

    return Promise.race([
      callback(...args),
      timeoutPromise
    ]);
  };
}