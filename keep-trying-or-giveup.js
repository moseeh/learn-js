function retry(count = 3, callback = async () => {}) {
  return async function (...args) {
    try {
      const result = await callback(...args);
      return result;
    } catch (error) {
      if (count > 0) {
        return retry(count - 1, callback)(...args);
      } else {
        throw error;
      }
    }
  };
}

function timeout(delay = 0, callback = async () => {}) {
  return async function (...args) {
    const timeoutPromise = new Promise((resolve) =>
      setTimeout(() => resolve(new Error('timeout')), delay)
    );
    const functionCall = new Promise((resolve) =>
      resolve(callback(...args))
    );
    
    const result = await Promise.race([timeoutPromise, functionCall]);
    
    if (result instanceof Error) {
      throw result;
    }
    return result;
  };
}