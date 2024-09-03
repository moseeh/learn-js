function sunnySunday(date) {
    // Create a reference date, 01/01/0001 (Monday)
    const referenceDate = new Date(1, 0, 1);
    
    // Calculate the difference in days between the input date and the reference date
    const diffInMs = date - referenceDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    // Adjust for the six-day week (Monday to Saturday)
    let adjustedDay = diffInDays % 6;
    
    // Ensure adjustedDay is always positive
    if (adjustedDay < 0) {
        adjustedDay += 6;
    }
    
    // Array of weekdays (without Sunday)
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    return weekdays[adjustedDay];
}