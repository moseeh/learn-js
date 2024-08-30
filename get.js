function get(src, path) {
    // Split the path into keys
    const keys = path.split('.');

    // Start with the source object
    let result = src;

    // Go through each key
    for (let key of keys) {
        // Check if the current result has this key
        if (result && result[key] !== undefined) {
            result = result[key]; // Move to the next level
        } else {
            return undefined; // Key not found
        }
    }

    // Return the final result
    return result;
}