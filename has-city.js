function hasCity(country, cities) {

    const lowerCaseCities = cities.map(city => city.toLowerCase());
    return function(city) {
        const lowerCaseCity = city.toLowerCase();
        if (lowerCaseCities.includes(lowerCaseCity)) {
            return `${city} is a city from ${country}`;
        } else {
            return `${city} is not a city from ${country}`;
        }
    };
}
