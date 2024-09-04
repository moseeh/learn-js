function forEach(array, callback) {
    if (!Array.isArray(array)) {
      throw new TypeError('First argument must be an array');
    }
    if (typeof callback !== 'function') {
      throw new TypeError('Second argument must be a function');
    }
  
    for (let i = 0; i < array.length; i++) {
      callback(array[i], i, array);
    }
  }