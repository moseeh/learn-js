let lastCircle = null;
let box = null;

export function createCircle() {
  document.addEventListener('click', (e) => {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.left = `${e.clientX - 25}px`;
    circle.style.top = `${e.clientY - 25}px`;
    circle.style.background = 'white';
    document.body.appendChild(circle);
    lastCircle = circle;
  });
}

export function moveCircle() {
  document.addEventListener('mousemove', (e) => {
    if (lastCircle) {
      const rect = box.getBoundingClientRect();
      let x = e.clientX - 25;
      let y = e.clientY - 25;

      if (isInsideBox(lastCircle, rect)) {
        x = Math.max(rect.left + 1, Math.min(x, rect.right - 51));
        y = Math.max(rect.top + 1, Math.min(y, rect.bottom - 51));
        lastCircle.style.background = 'var(--purple)';
      } else {
        lastCircle.style.background = 'white';
      }

      lastCircle.style.left = `${x}px`;
      lastCircle.style.top = `${y}px`;
    }
  });
}

export function setBox() {
  box = document.createElement('div');
  box.className = 'box';
  document.body.appendChild(box);
}

function isInsideBox(circle, boxRect) {
  const circleRect = circle.getBoundingClientRect();
  return (
    circleRect.left >= boxRect.left + 1 &&
    circleRect.right <= boxRect.right - 1 &&
    circleRect.top >= boxRect.top + 1 &&
    circleRect.bottom <= boxRect.bottom - 1
  );
}