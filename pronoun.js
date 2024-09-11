function pronoun(str) {
  const pronouns = ['i', 'you', 'he', 'she', 'it', 'they', 'we'];
  const result = {};

  // Convert to lowercase and split into words
  const words = str.toLowerCase().split(/\s+/);

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (pronouns.includes(word)) {
      if (!result[word]) {
        result[word] = { word: [], count: 0 };
      }
      result[word].count++;

      // Check for the next word
      if (i < words.length - 1) {
        const nextWord = words[i + 1];
        if (!result[word].word.includes(nextWord)) {
          result[word].word.push(nextWord);
        }
      }
    }
  }

  // Remove empty 'word' arrays
  for (const pronoun in result) {
    if (result[pronoun].word.length === 0) {
      delete result[pronoun].word;
    }
  }

  return result;
}
