function pick(obj, str) {
    let newObj = {};
    
    // Ensure str is always an array
    const keysToPick = Array.isArray(str) ? str : [str];

    for (const key in obj) {
        if (obj.hasOwnProperty(key) && keysToPick.includes(key)) {
            newObj[key] = obj[key];
        }
    }
    
    return newObj;
}

function omit(obj, str) {
    let newObj = {};

    // Ensure str is always an array
    const keysToOmit = Array.isArray(str) ? str : [str];

    for (const key in obj) {
        if (obj.hasOwnProperty(key) && !keysToOmit.includes(key)) {
            newObj[key] = obj[key];
        }
    }
    
    return newObj;
}
