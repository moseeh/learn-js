function filter(arr, predicate) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}
function reject(arr, predicate) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!predicate(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}
function partition(arr, predicate) {
  const pass = [];
  const fail = [];
  
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      pass.push(arr[i]);
    } else {
      fail.push(arr[i]);
    }
  }
  
  return [pass, fail];
}
