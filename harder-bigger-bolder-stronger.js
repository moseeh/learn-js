const generateLetters = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontWeights = [
      ...Array(40).fill(300),
      ...Array(40).fill(400),
      ...Array(40).fill(600)
    ];
    
    const fragment = document.createDocumentFragment();
    
    [...Array(120)].forEach((_, index) => {
      const letterDiv = document.createElement('div');
      letterDiv.textContent = alphabet[Math.floor(Math.random() * alphabet.length)];
      letterDiv.style.cssText = `
        font-size: ${11 + index}px;
        font-weight: ${fontWeights[index]};
      `;
      fragment.appendChild(letterDiv);
    });
    
    document.body.appendChild(fragment);
  };
  
  export { generateLetters };