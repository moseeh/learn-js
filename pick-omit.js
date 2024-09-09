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
            if (Array.isArray(str) &&!str.includes(key)) {
                newobj[key] = obj[key]
            }
            if (typeof str === "string" && str !== key) {
                newobj[key] = obj[key]
            }
        }
    }
    return newobj
}