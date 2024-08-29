function cutFirst(input) {
    let res = ""
    for (let i = 2; i < input.length; i++) {
        res += input[i]
    }
    return res
}

function cutLast(input) {
    let res = ""
    for (let i = 0; i < input.length -2; i++) {
        res += input[i]
    }
    return res

}

function cutFirstLast(input){
    let res = ""
    res = cutFirst(input)
    res = cutLast(res)
    return res
} 

function keepFirst(input) {
    let res = ""
    for (let i = 0; i < 2; i++) {
        res += input[i]
    }
    return res

}

function keepLast(input) {
    let res = ""
    for (let i = input.length-2; i < input.length; i++) {
        res += input[i]
    }
    return res

}

function keepFirstLast(input) {
    return keepFirst(input) + keepLast(input)
}

console.log(keepFirst('abcdef'))