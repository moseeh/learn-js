function filterKeys(obj, func) {
    let newobj = {}
    for (const key in obj) {
        if (func(key)) {
            newobj[key] = obj[key]
        }
    }
    return newobj
}

function mapKeys(obj, func) {
    let newobj = {}
    for (const key in obj) {
        newobj[func(key)] = obj[key]
        
    }
    return newobj
}

function reduceKeys(obj, func, initialValue) {
    let str
    if (initialValue === undefined) {
        str = ""
    } else {
        str = initialValue
    }
    
    for(const key in obj) {
        if (str === "") {
            str = key
        } else {
            str = func(str, key)
        }
    }
    return str
}
const nutrients = { carbohydrates: 12, protein: 20, fat: 5 }
console.log(filterKeys(nutrients, (key) => /protein/.test(key)))
console.log(mapKeys(nutrients, (k) => `-${k}`))
console.log(reduceKeys(nutrients, (acc, cr) =>acc.concat(', ', cr)))


