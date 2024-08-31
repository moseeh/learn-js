const vowels = /[aeiou]/gi;

function vowelDots(str) {
  // Replace each vowel with the vowel followed by a '.'
  return str.replace(vowels, match => match + '.');
}