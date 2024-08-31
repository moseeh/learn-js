function ionOut(str) {
    // Regular expression to match words ending with 'tion'
    const regex = /\b(\w+t)ion\b/g;
    
    // Find all matches and process them
    return (str.match(regex) || []).map(word => word.slice(0, -3));
  }