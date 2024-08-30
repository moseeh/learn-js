function nasa(N) {
    let str = ""
    for (let i = 1; i <= N; i++) {
        if (i % 3 === 0 && i % 5 === 0 ) {
            str += "NASA"
        } else if (i % 3 === 0) {
            str += "NA"
        } else if ( i % 5 === 0) {
            str += "SA"
        } else {
            str += String(i)
        }
        if (i !== N) {
            str += " "
        }
    }
    return str
}