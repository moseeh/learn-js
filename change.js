function get(key) {
    return sourceObject[key];
}

// Function to set a value for a given key
function set(key, value) {
    sourceObject[key] = value;
    return value;
}