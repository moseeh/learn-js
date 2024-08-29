function cutFirst(input) {
    if (input.length < 2) return "";  // Return empty string if input has fewer than 2 characters
    let res = "";
    for (let i = 2; i < input.length; i++) {
        res += input[i];
    }
    return res;
}

function cutLast(input) {
    if (input.length < 2) return "";  // Return empty string if input has fewer than 2 characters
    let res = "";
    for (let i = 0; i < input.length - 2; i++) {
        res += input[i];
    }
    return res;
}

function cutFirstLast(input) {
    if (input.length < 4) return "";  // Return empty string if input has fewer than 4 characters
    let res = cutFirst(input);
    res = cutLast(res);
    return res;
}

function keepFirst(input) {
    if (input.length < 2) return input;  // If input has fewer than 2 characters, return the whole string
    let res = "";
    for (let i = 0; i < 2; i++) {
        res += input[i];
    }
    return res;
}

function keepLast(input) {
    if (input.length < 2) return input;  // If input has fewer than 2 characters, return the whole string
    let res = "";
    for (let i = input.length - 2; i < input.length; i++) {
        res += input[i];
    }
    return res;
}

function keepFirstLast(input) {
    if (input.length < 4) return input;  // If input has fewer than 4 characters, return the whole string
    return keepFirst(input) + keepLast(input);
}


