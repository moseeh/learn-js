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
  
  // Function to get URLs with at least 2 but not more than 3 query parameters
  function notSoGreedy(dataSet) {
    const notSoGreedyRegex = /(https?:\/\/[^\s]+\?[^\s]+&[^\s]+(&[^\s]+)?(?!&))/g;
    return dataSet.match(notSoGreedyRegex) || [];
  }