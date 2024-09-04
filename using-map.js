function citiesOnly(arrobjects) {
    let arr = []
    for (let i = 0; i<= arrobjects.length-1; i++) {
        arr.push(arrobjects[i].city)
    }
    return arr

}

function upperCasingStates(arr) {
    for (let i = 0; i <= arr.length-1; i++) {
        arr[i] = capitalizeFirstLetterOfEachWord(arr[i])
    }
    return arr
}

function capitalizeFirstLetterOfEachWord(sentence) {
    return sentence
      .split(' ')  
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))  
      .join(' ')
}

function fahrenheitToCelsius(arr) {
    for (let i = 0; i <= arr.length-1; i++) {
        arr[i] = fahreToCelsius(arr[i])
    }
    return arr
}
function fahreToCelsius(fahrenheitStr) {
    let fahrenheit = parseFloat(fahrenheitStr)
    let celsius = (fahrenheit - 32) * 5 / 9
    return celsius.toFixed(0) + "°C"
}

function trimTemp(arrobjects) {
    for (let i = 0; i< arrobjects.length; i++) {
        arrobjects[i].temperature = arrobjects[i].temperature.trim()
    }
    return arrobjects
}

function tempForecasts(arr) {
    return arr.map((item) => {
      const celsius = Math.floor((parseFloat(item.temperature) - 32) * (5 / 9));
      const formattedState = item.state
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
      return `${celsius}°Celsius in ${item.city}, ${formattedState}`;
    });
}