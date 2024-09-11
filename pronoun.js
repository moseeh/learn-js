function pronoun(str) {
  const pronouns = ['i', 'you', 'he', 'she', 'it', 'they', 'we'];
  const result = {};

  // Convert to lowercase and split into words
  const words = str.toLowerCase().split(/\s+/);

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const cleanWord = word.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

    if (pronouns.includes(cleanWord)) {
      if (!result[cleanWord]) {
        result[cleanWord] = { count: 0 };
      }
      result[cleanWord].count++;

      // Check for the next word
      if (i < words.length - 1) {
        const nextWord = words[i + 1].replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
        if (nextWord && !pronouns.includes(nextWord)) {
          if (!result[cleanWord].word) {
            result[cleanWord].word = [];
          }
          if (!result[cleanWord].word.includes(nextWord)) {
            result[cleanWord].word.push(nextWord);
          }
        }
      }
    }
  }

  // Remove empty 'word' arrays
  for (const pronoun in result) {
    if (result[pronoun].word && result[pronoun].word.length === 0) {
      delete result[pronoun].word;
    }
  }

  return result;
}
