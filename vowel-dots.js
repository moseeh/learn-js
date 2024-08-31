function vowelDots(str) {

    const vowels = /[aeiou]/g;
    
    return str.replace(vowels, match => match + '.');
  }