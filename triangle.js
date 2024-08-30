function triangle(str, num) {
    let str1 = ""
    for (let i = 1; i <= num; i++) {
        str1 += str.repeat(i) + '\n'
    }
    return str1
}

console.log(triangle("*", 6))