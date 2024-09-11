function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }

function replica(target, ...sources) {
    for (const source of sources) {
        const keys = Object.keys(source);
        for (const key of keys) {
            const sourceValue = source[key];
            if (isObject(sourceValue)) {
                if (!target.hasOwnProperty(key) || !isObject(target[key])) {
                    target[key] = {};
                }
                replica(target[key], sourceValue);
            } else {
                target[key] = sourceValue;
            }
        }
    }
    return target;
}
