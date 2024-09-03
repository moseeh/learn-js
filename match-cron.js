function matchCron(cron, date) {
    const [cronMin, cronHour, cronDay, cronMonth, cronWeekday] = cron.split(' ');
    
    const dateMin = date.getMinutes();
    const dateHour = date.getHours();
    const dateDay = date.getDate();
    const dateMonth = date.getMonth() + 1; // getMonth() is 0-indexed
    const dateWeekday = date.getDay() === 0 ? 7 : date.getDay(); // getDay() returns 0 for Sunday

    // Check each part of the cron pattern
    const check = (cronPart, datePart) => cronPart === '*' || parseInt(cronPart) === datePart;

    return check(cronMin, dateMin) &&
           check(cronHour, dateHour) &&
           check(cronDay, dateDay) &&
           check(cronMonth, dateMonth) &&
           check(cronWeekday, dateWeekday);
}

// Example usage:
console.log(matchCron('9 * * * *', new Date('2020-05-30 18:09:00'))); // true
console.log(matchCron('9 * * * *', new Date('2020-05-30 19:09:00'))); // true
console.log(matchCron('9 * * * *', new Date('2020-05-30 19:21:00'))); // false
