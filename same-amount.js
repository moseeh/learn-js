function sameAmount(str, regex1, regex2) {
    // Get the number of matches for both regular expressions
    const matches1 = (str.match(regex1) || []).length;
    const matches2 = (str.match(regex2) || []).length;
  
    // Compare the number of matches
    return matches1 === matches2;
  }
  