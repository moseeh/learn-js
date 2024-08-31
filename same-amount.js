function sameAmount(str, regex1, regex2) {
    const matches1 = str.match(regex1) || [];
    const matches2 = str.match(regex2) || [];
    return matches1.length === matches2.length;
  }