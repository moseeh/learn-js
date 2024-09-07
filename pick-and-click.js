export function pick() {
  const body = document.body;
  const hslDiv = createDiv('hsl');
  const hueDiv = createDiv('hue text');
  const luminosityDiv = createDiv('luminosity text');
  
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const axisX = createSVGLine('axisX');
  const axisY = createSVGLine('axisY');
  svg.appendChild(axisX);
  svg.appendChild(axisY);
  body.appendChild(svg);

  function updateColor(event) {
    const x = event.clientX;
    const y = event.clientY;
    const hue = Math.round((x / window.innerWidth) * 360);
    const luminosity = Math.round((1 - y / window.innerHeight) * 100);
    const hslColor = `hsl(${hue}, 50%, ${luminosity}%)`;

    body.style.background = hslColor;
    hslDiv.textContent = hslColor;
    hueDiv.textContent = `hue\n${hue}`;
    luminosityDiv.textContent = `luminosity\n${luminosity}`;

    axisX.setAttribute('x1', x);
    axisX.setAttribute('x2', x);
    axisY.setAttribute('y1', y);
    axisY.setAttribute('y2', y);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(hslDiv.textContent)
      .then(() => console.log('Color copied to clipboard'))
      .catch(err => console.error('Failed to copy: ', err));
  }

  body.addEventListener('mousemove', updateColor);
  body.addEventListener('click', copyToClipboard);
}

function createDiv(className) {
  const div = document.createElement('div');
  div.className = className;
  document.body.appendChild(div);
  return div;
}

function createSVGLine(id) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.id = id;
  line.setAttribute('x1', '0');
  line.setAttribute('y1', '0');
  line.setAttribute('x2', '100%');
  line.setAttribute('y2', '100%');
  return line;
}