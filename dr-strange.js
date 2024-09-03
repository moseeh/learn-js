function addWeek(date) {
    const weekNames = [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
        "secondMonday", "secondTuesday", "secondWednesday", "secondThursday", "secondFriday", "secondSaturday", "secondSunday"
    ];

    // Normalize the date to UTC to avoid timezone issues
    const normalizedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    // Calculate the offset in days
    const dayOffset = Math.floor((normalizedDate.getTime() + 62135596800000) / 86400000) % 14;

    // Return the corresponding day name
    return weekNames[dayOffset];
}

function timeTravel({ date, hour, minute, second }) {
    const newDate = new Date(date);
    newDate.setHours(hour, minute, second);
    return newDate;
}
