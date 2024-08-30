function round(num) {
    let neg = false;
    if (num < 0) {
        neg = true;
        num = -num;
    }
    
    let count = 0;
    while (!(num < 1 && num > -1)) {
        num -= 1;
        count++;
    }
    
    if (num < 0.5) {
        return neg ? -count : count;
    } else {
        return neg ? -count - 1 : count + 1;
    }
}

function ceil(num) {
    let neg = false;
    if (num < 0) {
        neg = true;
        num = -num;
    }
    
    let count = 0;
    while (!(num < 1 && num > -1)) {
        num -= 1;
        count++;
    }
    
    if (num > 0) {
        return neg ? -count - 1 : count + 1;
    } else {
        return neg ? -count : count;
    }
}

function floor(num) {
    let neg = false;
    if (num < 0) {
        neg = true;
        num = -num;
    }
    
    let count = 0;
    while (!(num < 1 && num > -1)) {
        num -= 1;
        count++;
    }
    
    return neg ? -count - 1 : count;
}

function trunc(num) {
    let neg = false;
    if (num < 0) {
        neg = true;
        num = -num;
    }
    
    let count = 0;
    while (!(num < 1 && num > -1)) {
        num -= 1;
        count++;
    }
    
    return neg ? -count : count;
}
