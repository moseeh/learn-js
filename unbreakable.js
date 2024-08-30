function split(str, delimiter) {
    var result = [];
    var temp = "";
    var matchIndex = 0;

    if (delimiter === "") {
        for (var i = 0; i < str.length; i++) {
            result.push(str[i])
        }
        return result
    }

    for (var i = 0; i < str.length; i++) {
        if (str[i] === delimiter[matchIndex]) {
            matchIndex++;
            // If we've matched the entire delimiter, push temp to result
            if (matchIndex === delimiter.length) {
                result.push(temp);
                temp = ""; // Reset temp
                matchIndex = 0; // Reset matchIndex
            }
        } else {
            // If we're in the middle of matching and it fails, append all characters matched so far
            if (matchIndex > 0) {
                temp += delimiter.slice(0, matchIndex);
                matchIndex = 0;
            }
            // Add the current character to temp
            temp += str[i];
        }
    }

    // Push the last segment if there's any
    result.push(temp);

    return result;
}
function join(arr, delimiter) {
    var result = "";
    
    for (var i = 0; i < arr.length; i++) {
        result += arr[i]; // Add the current element
        // If it's not the last element, add the delimiter
        if (i < arr.length - 1) {
            result += delimiter;
        }
    }
    
    return result;
}