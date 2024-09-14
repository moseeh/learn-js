// Basic debounce function (unchanged)
function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Updated opDebounce function
function opDebounce(func, wait, options = {}) {
  let timeout;
  let lastCallTime = 0;
  
  return function executedFunction(...args) {
    const currentTime = Date.now();
    const isLeadingCall = options.leading && (currentTime - lastCallTime >= wait);

    const later = () => {
      timeout = null;
      if (!options.leading) func(...args);
      lastCallTime = Date.now();
    };

    if (isLeadingCall) {
      lastCallTime = currentTime;
      func(...args);
    } else {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}