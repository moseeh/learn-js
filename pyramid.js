function pyramid(str, num) {
    let str1 = "";
    const strLength = str.length;

    for (let i = 1; i <= num; i++) {
        let chars = str.repeat(2 * i - 1);
        let baseWidth = strLength * (2 * num - 1);
        let levelWidth = strLength * (2 * i - 1);
        let spaces = " ".repeat((baseWidth - levelWidth) / 2);
        if (i !== num) {
            str1 += spaces + chars + '\n';
        } else {
            str1 += spaces + chars  
        }
    }
    
    return str1;
}


console.log((pyramid('{}', 12)))