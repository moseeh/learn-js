function pyramid(str, num) {
    let str1 = "";
    for (let i = 1; i <= num; i++) {
   
        let spaces = " ".repeat(num - i);
   
        let chars = str.repeat(2 * i - 1);
        if (i !== num) {
            str1 += spaces + chars + '\n';
        } else {
            str1 += spaces + chars  
        }
    }
    return str1;
}

console.log(pyramid("*", 5));
