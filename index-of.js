function indexOf(arr, val) {
    let index = -1
    for (const [i, v] of arr.entries()) {
        if (v === val) {
            index = i
            break
        }
    }
    return index
}

function lastIndexOf(arr, val) {
    let index = -1
    for (const [i, v] of arr.entries()) {
        if (v === val) {
            index = i
        }
    }
    return index
}

function includes(arr, val) {
    return indexOf(arr,val) !== -1
}
