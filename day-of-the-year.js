function dayOfTheYear(date) {
    const currentDate = new Date(date);
    const startOfYear = new Date(currentDate.getFullYear(), 0, 0);
    const diff = currentDate - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day
    return Math.floor(diff / oneDay);
}