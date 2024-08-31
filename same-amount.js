function sameAmount(str, regExp1, regExp2) {
    // Ensure the regular expressions have the global flag
    const re1 = new RegExp(regExp1, 'g');
    const re2 = new RegExp(regExp2, 'g');
    
    // Count the matches for each regular expression
    const count1 = (str.match(re1) || []).length;
    const count2 = (str.match(re2) || []).length;
    
    // Return true if the counts are the same, false otherwise
    return count1 === count2;
  }