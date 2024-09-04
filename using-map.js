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
    // Trim and convert temperatures, capitalize states, and format the output.
    return arr.map((item) => {
      // Trim temperature string
      let temperature = item.temperature.trim();
  
      // Extract the numeric part of the temperature and convert to Celsius
      let fahrenheit = parseFloat(temperature);
      let celsius = ((fahrenheit - 32) * 5 / 9).toFixed(0);
  
      // Capitalize state name
      let state = item.state
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
  
      // Format the final output string
      return `${celsius}°Celsius in ${item.city}, ${state}`;
    });
  }