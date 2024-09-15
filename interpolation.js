function interpolation({ step, start, end, callback, duration }) {
  const stepSize = (end - start) / step;
  
  const interpolate = (currentStep) => {
    if (currentStep < step) {
      const x = currentStep / (step - 1); // Normalize distance to [0, 1]
      const y = start + currentStep * stepSize;
      
      callback([x, y]);
      
      setTimeout(() => interpolate(currentStep + 1), duration / step);
    }
  };
  
  setTimeout(() => interpolate(0), 0);
}