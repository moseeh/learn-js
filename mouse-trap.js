let lastCircle = null;
let box = null;
let hasEntered = false;

export function createCircle() {
  document.addEventListener('click', (e) => {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.left = `${e.clientX - 25}px`;
    circle.style.top = `${e.clientY - 25}px`;
    circle.style.background = 'white';
    document.body.appendChild(circle);
    lastCircle = circle;
    hasEntered = false;
  });
}

export function moveCircle() {
  document.addEventListener('mousemove', (e) => {
    if (lastCircle && box) {
      const rect = box.getBoundingClientRect();
      const circleRadius = 25;
      let x = e.clientX - circleRadius;
      let y = e.clientY - circleRadius;

      const isInside = isInsideBox(x + circleRadius, y + circleRadius, rect, circleRadius);

      if (isInside) {
        hasEntered = true;
      }

      if (hasEntered) {
        x = Math.max(rect.left + 1, Math.min(x, rect.right - circleRadius * 2 - 1));
        y = Math.max(rect.top + 1, Math.min(y, rect.bottom - circleRadius * 2 - 1));
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

function isInsideBox(x, y, boxRect, circleRadius) {
  return (
    x > boxRect.left + circleRadius &&
    x < boxRect.right - circleRadius &&
    y > boxRect.top + circleRadius &&
    y < boxRect.bottom - circleRadius
  );
}