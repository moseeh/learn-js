function triangle(str, num) {
    let str = ""
    for (let i = 1; i <= num; i++) {
        str += str.repeat(i) + "\n"
    }
    return str
}