function invert(obj) {
    const invertedobj = {};
    for (const key in obj) {
            invertedobj[obj[key]] = key;
    }
    return invertedobj;
}