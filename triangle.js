function triangle(str, num) {
    let str1 = ""
    for (let i = 1; i <= num; i++) {
        if (i !== num) {

            str1 += str.repeat(i) + '\n'
        } else {
            str1 += str.repeat(i)
        }
    }
    return str1
}