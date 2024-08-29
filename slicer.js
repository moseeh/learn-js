function slice(input , start, end){
    if (end === undefined) {
        end = input.length
    }
    if (start < 0) {
        start = input.length + start
    }
    if (end < 0) {
        end = input.length + end
    }
    for (let i = start; i < input.length; i++) {

    }
    let result

    if (typeof input === "string") {
        res = ""
        for (let i = start; i < end; i++) {
            res += input[i]
        }
    }
    if (Array.isArray(input)) {
        res = []
        for (let i = start; i < end; i++) {
            res.push(input[i])
        }
    }
    return res
}