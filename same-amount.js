function sameAmount(str, regex1, regex2) {
    // Get all matches for both regular expressions, defaulting to an empty array if no matches are found
    const matches1 = str.match(regex1) || [];
    const matches2 = str.match(regex2) || [];
  
    // Compare the number of matches
    return matches1.length === matches2.length;
  }