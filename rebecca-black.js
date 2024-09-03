function isFriday(date) {
    return new Date(date).getDay() === 5
}

function isWeekend(date) {
    return (new Date(date).getDay()=== 0 || new Date(date).getDay() === 6)
}

function isLeapYear(date) {
    return new Date(date).getFullYear() %4 === 0
}

function isLastDayOfMonth(date) {
    var day = new Date(date)
    var year = day.getFullYear()
    var month = day.getMonth()
    var d = day.getDate()

    if (month === 1 && isLeapYear(year)&& d === 29) {
        return true
    }
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        if (d === 31) {
            return true
        } 
    }
    if (month === 3 || month === 5 || month === 8 || month === 10 ) {
        if (d === 30) {
            return true
        } 
    }
    return false 
}