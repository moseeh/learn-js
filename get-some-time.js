function firstDayWeek(weekNumber, year) {
  
    const parsedYear = parseInt(year, 10);
  
    weekNumber = Math.max(1, Math.min(53, weekNumber));
    if (weekNumber === 1) {
        return `01-01-${String(parsedYear).padStart(4, '0')}`;
    }

    function createDate(year, month, day) {
      const date = new Date(year, month, day);
      if (year < 100) {
        date.setFullYear(year);
      }
      return date;
    }
    const januaryFirst = createDate(parsedYear, 0, 1);
  
    // Calculate the day of the week for January 1st (0 = Sunday, 1 = Monday, etc.)
    let dayOfWeekJanuaryFirst = januaryFirst.getDay();
  
    // Adjust Sunday from 0 to 7 (so Monday is 1, Sunday is 7)
    if (dayOfWeekJanuaryFirst === 0) {
      dayOfWeekJanuaryFirst = 7;
    }
  
    // Calculate the offset to the first day (Monday) of week 1
    const offsetToFirstMonday = (8 - dayOfWeekJanuaryFirst) % 7;
  
    // Calculate the date of the first day of the specified week
    const firstDayOfWeek = createDate(parsedYear, 0, 1 + offsetToFirstMonday + (weekNumber - 1) * 7);
  
    // If the calculated date is in the previous year, return January 1st
    if (firstDayOfWeek.getFullYear() < parsedYear) {
      return `01-01-${String(parsedYear).padStart(4, '0')}`;
    }
  
    // Format the date as dd-mm-yyyy
    const day = String(firstDayOfWeek.getDate()).padStart(2, '0');
    const month = String(firstDayOfWeek.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const formattedYear = String(firstDayOfWeek.getFullYear()).padStart(4, '0');
  
    return `${day}-${month}-${formattedYear}`;
}

console.log(firstDayWeek(1, "1000"))