// Check if a date is valid
function isValid(date) {
    if (new Date(date).toString() === "Invalid Date") {
        return false;
    }
    if (!(date instanceof Date) && typeof date !== "number") {
        return false;
    }
    return true;
}

// Check if the first date is after the second date
function isAfter(date1, date2) {
    if (!isValid(date1) || !isValid(date2)) return false;
    return date1 > date2;
}

// Check if the first date is before the second date
function isBefore(date1, date2) {
    if (!isValid(date1) || !isValid(date2)) return false;
    return date1 < date2;
}

// Check if the date is in the future
function isFuture(date) {
    if (!isValid(date)) return false;
    const now = new Date();
    return date > now;
}

// Check if the date is in the past
function isPast(date) {
    if (!isValid(date)) return false;
    const now = new Date();
    return date < now;
}
