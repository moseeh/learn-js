function chunk(arr, size) {
    let arrayofArrays = []
    
    for (let i = 0; i < arr.length; i+=size) {
      arrayofArrays.push(arr.slice(i, i+size))
    }
    return arrayofArrays
}