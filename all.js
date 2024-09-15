function all(obj) {

    const entries = Object.entries(obj);
    const keys = entries.map(([key]) => key);
    const values = entries.map(([_, value]) => value);
    return Promise.all(values).then(resolvedValues => {

      return Object.fromEntries(keys.map((key, index) => [key, resolvedValues[index]]));
    });
  }