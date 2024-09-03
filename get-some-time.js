function firstDayWeek(week, year) {
    // Parse the year as an integer
    const parsedYear = parseInt(year, 10);
  
    // Ensure week is between 1 and 53
    week = Math.max(1, Math.min(53, week));
  
    // Function to create date, handling years below 100
    function createDate(year, month, day) {
      const date = new Date(year, month, day);
      if (year < 100) {
        date.setFullYear(year);
      }
      return date;
    }
  
    // Create a Date object for January 1st of the given year
    let time = createDate(parsedYear, 0, 1);
  
    // Special case for Week 1 starting on January 1st
    if (week === 1) {
      return formattedDate(time);
    }
  
    // Calculate the number of days to add to reach the desired week
    let dayPlus = (week - 1) * 7;
    time.setDate(time.getDate() + dayPlus);
  
    // Find the first Monday of the desired week
    while (getWeekDay(time) !== 'Monday') {
      time.setDate(time.getDate() - 1);
    }
  
    // If the calculated date is in the previous year, return January 1st
    if (time.getFullYear() < parsedYear) {
      return formattedDate(createDate(parsedYear, 0, 1));
    }
  
    return formattedDate(time);
  }
  
  function getWeekDay(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }
  
  function formattedDate(d) {
    let month = String(d.getMonth() + 1).padStart(2, '0');
    let day = String(d.getDate()).padStart(2, '0');
    let year = String(d.getFullYear()).padStart(4, '0');
    return `${day}-${month}-${year}`;
  }
  