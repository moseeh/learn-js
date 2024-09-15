async function isWinner(countryName, targetContinent = 'Europe', minWins = 3) {
    try {
        const country = await db.getWinner(countryName);
        
        if (country.continent !== targetContinent) {
            return `${country.name} is not what we are looking for because of the continent`;
        }
        
        const results = await db.getResults(country.id);
        
        if (results.length < minWins) {
            return `${country.name} is not what we are looking for because of the number of times it was champion`;
        }
        
        const years = results.map(result => result.year).join(', ');
        const scores = results.map(result => result.score).join(', ');
        
        return `${country.name} won the FIFA World Cup in ${years} winning by ${scores}`;
    } catch (e) {
        if (e.message === 'Country Not Found' || e.message === 'Results Not Found') {
            return `${countryName} never was a winner`;
        }
        throw e; // Re-throw unexpected errors
    }
}