// Function to get all URLs from the dataSet
function getURL(dataSet) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return dataSet.match(urlRegex) || [];
  }
  
  // Function to get URLs with at least 3 query parameters
  function greedyQuery(dataSet) {
    const greedyRegex = /(https?:\/\/[^\s]+\?[^\s]+(&[^\s]+){2,})/g;
    return dataSet.match(greedyRegex) || [];
  }
  
  // Function to get URLs with exactly 2 or 3 query parameters
  function notSoGreedy(dataSet) {
    const urls = getURL(dataSet);
    return urls.filter(url => {
      const queryParts = url.split('?')[1];
      if (!queryParts) return false;
      const paramCount = queryParts.split('&').length;
      return paramCount === 2 || paramCount === 3;
    });
  }