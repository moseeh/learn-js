function filterValues(obj, func) {
    const result = {};
    for ( const [key, value] of Object.entries(obj)) {
        if (func(value)) {
            result[key] = value
        }
    }
    return result
}

function mapValues(obj, func ) {
    const result = {};
    for ( const [key, value] of Object.entries(obj)) {
       result[key] = func(value) 
    }
    return result

}

function reduceValues(obj, func, initialValue = 0) {
    let result = initialValue
    for ( const value of Object.values(obj)) {
        result = func(result, value)
    }
    return result;

}
