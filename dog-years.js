function dogYears(planet, seconds) {
    // Orbital periods for each planet in Earth years
    const orbitalPeriods = {
        earth: 1.0,
        mercury: 0.2408467,
        venus: 0.61519726,
        mars: 1.8808158,
        jupiter: 11.862615,
        saturn: 29.447498,
        uranus: 84.016846,
        neptune: 164.79132
    };

    // Earth year in seconds
    const earthYearInSeconds = 31557600;

    // Calculate age in Earth years
    const earthYears = seconds / earthYearInSeconds;

    // Calculate age in the given planet's years
    let planetYears;
    switch (planet) {
        case 'earth':
            planetYears = earthYears;
            break;
        case 'mercury':
        case 'venus':
        case 'mars':
        case 'jupiter':
        case 'saturn':
        case 'uranus':
        case 'neptune':
            planetYears = earthYears / orbitalPeriods[planet];
            break;
        default:
            return "Unknown planet";
    }

    // Convert planet years to dog years
    const dogYears = planetYears * 7;

    // Round the result to two decimal places
    return Number(dogYears.toFixed(2));
}
