function adder(numbers, initialValue = 0) {
  return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
}

function sumOrMul(numbers, initialValue = 0) {
  return numbers.reduce((accumulator, currentValue) => {
    if (currentValue % 2 === 1) {
      // If the number is odd, add it
      return accumulator + currentValue;
    } else {
      // If the number is even, multiply it
      return accumulator * currentValue;
    }
  }, initialValue);
}

function funcExec(functions, initialValue) {
  return functions.reduce((accumulator, currentFunction) => {
    return currentFunction(accumulator);
  }, initialValue);
}