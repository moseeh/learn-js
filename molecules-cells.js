function RNA(str) {
    let newstr = ""
    for (let i = 0; i <= str.length -1; i++) {
        if (str[i]=== "G") {
            newstr += "C"
        } else if (str[i] === "C") {
            newstr += "G"
        } else if (str[i]=== "T") {
            newstr += "A"
        } else if (str[i]=== "A") {
            newstr += "U"
        }
    }
    return newstr
}

function DNA(str) {
    let newstr = ""
    for (let i = 0; i <= str.length -1; i++) {
        if (str[i]=== "G") {
            newstr += "C"
        } else if (str[i] === "C") {
            newstr += "G"
        } else if (str[i]=== "U") {
            newstr += "A"
        } else if (str[i]=== "A") {
            newstr += "T"
        }
    }
    return newstr
}