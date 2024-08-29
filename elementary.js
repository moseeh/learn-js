function multiply(a,b) {
    var result = 0
    for(var i = 1; i <= b; i++) {
        result += a
    }
    return result
}

function divide(a, b) {
    if (b === 0) {
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
