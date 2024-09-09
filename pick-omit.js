function pick(obj, str) {
    let newobj = {}
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (str.includes(key)) {
                newobj[key] = obj[key]
            }
        }
    }
    return newobj
}

function pomit(obj, str) {
    let newobj = {}
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (!str.includes(key)) {
                newobj[key] = obj[key]
            }
        }
    }
    return newobj
}