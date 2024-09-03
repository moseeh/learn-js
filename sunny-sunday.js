function sunnySunday(date) {
    const referenceDate = new Date(1, 0, 1);
    const diffInMs = date - referenceDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const adjustedDay = diffInDays % 6;
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    return weekdays[adjustedDay];
}

