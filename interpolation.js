function interpolation({ step, start, end, callback, duration }) {
  const points = step + 1; // Including start, not including end
  const stepSize = (end - start) / step;
  const delayBetweenSteps = duration / step;

  for (let i = 0; i < step; i++) {
    const x = i / (step - 1); // Normalize distance to [0, 1]
    const y = start + i * stepSize;

    setTimeout(() => {
      callback([x, y]);
    }, i * delayBetweenSteps);
  }
}