function multiply(a,b) {
    var neg = false 
    if (a< 0 || b< 0) {
        neg = true 
    }
    if (a<0 && b < 0) {
        neg = false
    }
    a = abs(a)
    b = abs(b)
    
    var result = 0
    for(var i = 1; i <= b; i++) {
        result += a
    }
    if (neg === true) {
        result = -result
    }
    return result
}

function divide(a, b) {
    if (divisor === 0) {
        throw new Error("Division by zero");
    }

    let sign = (a < 0) !== (b < 0) ? -1 : 1;

    let quotient = 0;
    while (a >= b) {
        a -= b;
        quotient++;
    }

    return multiply(sign,  quotient);
}

function modulus(a, b) {
    if (b === 0) {
        throw new Error("Division by zero");
    }

    let sign = a < 0 ? -1 : 1;

    while (a >= b) {
        a -= b;
    }

    return multiply(sign , a);
}

function abs(num) {
    if (num < 0) {
        return -num
    } else {
        return num 
    }
}

console.log(multiply(20,0))