function groupPrice(str) {
    const priceRegex = /(\$|€|£|\s)(\d+)(?:[.,](\d{2}))?(?!\d)/g;
    const results = [];
    let match;
  
    while ((match = priceRegex.exec(str)) !== null) {
      const [fullMatch, currency, dollars, cents] = match;
      const formattedPrice = `${currency.trim()}${dollars}${cents ? '.' + cents : ''}`;
      results.push([formattedPrice, dollars, cents || '']);
    }
  
    return results;
}