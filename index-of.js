function indexOf(arr, val, start = 0) {
    if (start < 0) {
        start = Math.max(arr.length + start, 0); // Handle negative start indices
    }
    for (let i = start; i < arr.length; i++) {
        if (arr[i] === val) {
            return i;  // Return the index when found
        }
    }
    return -1;  // Return -1 if not found
}

function lastIndexOf(arr, val, start = arr.length - 1) {
    if (start >= arr.length) {
        start = arr.length - 1;  // Handle start index beyond array length
    }
    if (start < 0) {
        start = Math.max(arr.length + start, 0); // Handle negative start indices
    }
    for (let i = start; i >= 0; i--) {
        if (arr[i] === val) {
            return i;  // Return the index when found
        }
    }
    return -1;  // Return -1 if not found
}

function includes(arr, val, start = 0) {
    return indexOf(arr, val, start) !== -1;  // Use indexOf to check inclusion
}

