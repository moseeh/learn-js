function invert(obj) {
    const invertedobj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            invertedobj[obj[key]] = key;
        }
    }
    return invertedobj;
}
