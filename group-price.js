function groupPrice(str) {
    const priceRegex = /(\$|€|£)?(\d+)(?:[.,](\d{2}))?(?!\d)/g;
    const results = [];
    let match;
  
    while ((match = priceRegex.exec(str)) !== null) {
      const [fullMatch, currency = '', dollars, cents] = match;
      let formattedPrice = '';
      
      if (currency) {
        formattedPrice = `${currency}${dollars}${cents ? '.' + cents : ''}`;
      } else if (str.substring(match.index - 3, match.index).toUpperCase() === 'USD') {
        formattedPrice = `USD${dollars}${cents ? '.' + cents : ''}`;
      } else {
        continue; // Skip this match if there's no currency symbol or USD prefix
      }
      
      results.push([formattedPrice, dollars, cents || '']);
    }
  
    return results;
}
  