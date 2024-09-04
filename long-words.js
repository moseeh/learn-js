function longWords(words) {
    return words.every(element => typeof element === 'string' && element.length >= 5);
  }
  
  function oneLongWord(words) {
    return words.some(element => typeof element === 'string' && element.length >= 10);
  }
  
  function noLongWords(words) {
    return words.every(element => typeof element !== 'string' || element.length < 7);
  }