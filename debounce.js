// Basic debounce function
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

// Debounce function with 'leading' option
function opDebounce(func, wait, options = {}) {
  let timeout;
  let isLeadingCall = true;
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!options.leading) func(...args);
    };

    const callNow = options.leading && isLeadingCall;
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) {
      isLeadingCall = false;
      func(...args);
    }
  };
}