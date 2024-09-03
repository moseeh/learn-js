function firstDayWeek(weekNumber, year) {
    // Special case: Week 1 always starts on January 1st.
    if (weekNumber === 1) {
        return `01-01-${year}`;
    }

    // Parse the year as an integer
    const parsedYear = parseInt(year, 10);

    // Create a Date object for January 1st of the given year
    const januaryFirst = new Date(parsedYear, 0, 1);
   
    // Calculate the day of the week for January 1st (0 = Sunday, 1 = Monday, etc.)
    let dayOfWeekJanuaryFirst = januaryFirst.getDay();

    // Adjust Sunday from 0 to 7 (so Monday is 1, Sunday is 7)
    if (dayOfWeekJanuaryFirst === 0) {
        dayOfWeekJanuaryFirst = 7;
    }
    
    // Calculate the offset (in days) to the first Monday of the year
    const offsetToMonday = dayOfWeekJanuaryFirst <= 1 ? 0 : 8 - dayOfWeekJanuaryFirst;

    // Calculate the day of the year for the first Monday
    const firstMondayDayOfYear = 1 + offsetToMonday;
    
    // Calculate the day of the year for the first day of the desired week
    const dayOfYearForWeek = firstMondayDayOfYear + (weekNumber - 2) * 7;

    // Create a new Date object for the first day of the desired week
    const firstDayOfWeek = new Date(parsedYear, 0, dayOfYearForWeek);

    // If the first day of the week is before January 1st, adjust to January 1st
    if (firstDayOfWeek.getFullYear() < parsedYear) {
        return `01-01-${parsedYear}`;
    }

    // Format the date as dd-mm-yyyy
    const day = String(firstDayOfWeek.getDate()).padStart(2, '0');
    const month = String(firstDayOfWeek.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const formattedDate = `${day}-${month}-${parsedYear}`;

    return formattedDate;
}

console.log(firstDayWeek(37, "2024"));  // Should correctly output "22-12-1000"
