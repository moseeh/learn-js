function flow(functions) {
    return function(...args) {
        return functions.reduce((result, fn) => {
            return Array.isArray(result) ? fn(...result) : fn(result);
        }, args);
    };
}
