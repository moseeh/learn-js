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

function tempForecasts(forecasts) {
    return forecasts.map(forecast => {
      let fahrenheit = parseFloat(forecast.temperature.trim())
      let celsius = ((fahrenheit - 32) * 5 / 9).toFixed(0)
      let capitalizedState = forecast.state.charAt(0).toUpperCase() + forecast.state.slice(1)
      return `${celsius}°Celsius in ${forecast.city}, ${capitalizedState}`;
    });
  }