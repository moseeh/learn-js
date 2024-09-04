function fold(arr, fn, accumulator) {
    for (let i = 0; i < arr.length; i++) {
      accumulator = fn(accumulator, arr[i]);
    }
    return accumulator;
}
function foldRight(arr, fn, accumulator) {
  for (let i = arr.length - 1; i >= 0; i--) {
    accumulator = fn(accumulator, arr[i]);
  }
  return accumulator;
}
function reduceRight(arr, fn) {
  if (arr.length < 1) {
    throw new Error("Array must have at least one element");
  }

  let accumulator = arr[arr.length - 1];  // Start with the last element as the initial accumulator
  for (let i = arr.length - 2; i >= 0; i--) {
    accumulator = fn(accumulator, arr[i]);
  }
  return accumulator;
}
function reduce(arr, fn) {
  if (arr.length < 1) {
    throw new Error("Array must have at least one element");
  }

  let accumulator = arr[0];  // Start with the first element as the initial accumulator
  for (let i = 1; i < arr.length; i++) {
    accumulator = fn(accumulator, arr[i]);
  }
  return accumulator;
}
