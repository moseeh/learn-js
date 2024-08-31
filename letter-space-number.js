function letterSpaceNumber(str) {
    return str.match(/\b[a-zA-Z] \d(?![a-zA-Z])/g) || [];
  }