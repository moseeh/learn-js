function multiply(a, b) {
    var neg = false;
    if (a < 0) {
        a = abs(a);
        neg = !neg;
    }
    if (b < 0) {
        b = abs(b);
        neg = !neg;
    }

    var result = 0;
    for (var i = 0; i < b; i++) {
        result += a; // Adding 'a', 'b' times
    }

    if (neg) {
        result = -result;
    }

    return result;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero");
    }
    
    let sign = (a < 0) !== (b < 0) ? -1 : 1;

    a = abs(a);
    b = abs(b);

    let quotient = 0;
    while (a >= b) {
        a -= b;
        quotient++;
    }

    return multiply(sign, quotient); // Using 'multiply' to adjust the sign
}

function modulo(a, b) {
    if (b === 0) {
        throw new Error("Division by zero");
    }

    let sign = a < 0 ? -1 : 1;

    a = abs(a);
    b = abs(b);

    while (a >= b) {
        a -= b;
    }

    return multiply(sign, a); // Returning remainder with correct sign
}

function abs(num) {
    return num < 0 ? -num : num;
}

