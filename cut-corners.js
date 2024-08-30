function round(num) {
    let neg = false;
    if (num < 0) {
        neg = true;
        num = -num;
    }
    
    let integerPart = num - (num % 1);
    let decimalPart = num % 1;
    
    if (decimalPart < 0.5) {
        return neg ? -integerPart : integerPart;
    } else {
        return neg ? -integerPart - 1 : integerPart + 1;
    }
}
function ceil(num) {
    let neg = false;
    if (num < 0) {
        neg = true;
        num = -num;
    }
    
    let integerPart = num - (num % 1);
    let decimalPart = num % 1;
    
    if (decimalPart > 0) {
        return neg ? -integerPart : integerPart + 1;
    } else {
        return neg ? -integerPart : integerPart;
    }
}
function floor(num) {
    let neg = false;
    if (num < 0) {
        neg = true;
        num = -num;
    }
    
    let integerPart = num - (num % 1);
    
    return neg ? -integerPart - 1 : integerPart;
}
function trunc(num) {
    let neg = false;
    if (num < 0) {
        neg = true;
        num = -num;
    }
    
    let integerPart = num - (num % 1);
    
    return neg ? -integerPart : integerPart;
}
