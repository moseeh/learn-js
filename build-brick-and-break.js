// Helper function to create a brick element
const createBrick = (id, content, isFoundation) => {
  const brick = document.createElement('div');
  brick.id = `brick-${id}`;
  brick.textContent = content;
  if (isFoundation) {
    brick.dataset.foundation = true;
  }
  return brick;
};

export function build(totalBricks) {
  let brickCount = 1;
  let foundationCounter = 2;

  const interval = setInterval(() => {
    const isFoundation = foundationCounter === 3;
    const brick = createBrick(brickCount, brickCount, isFoundation);
    
    document.body.appendChild(brick);
    console.log(brick);

    brickCount++;
    foundationCounter = isFoundation ? 1 : foundationCounter + 1;

    if (brickCount > totalBricks) {
      clearInterval(interval);
    }
  }, 100);
}

export function repair(...repairIds) {
  repairIds.forEach(id => {
    const brick = document.getElementById(id);
    if (!brick) return;

    const brickNumber = parseInt(id.replace('brick-', ''));
    const isInProgress = brickNumber % 3 === 2;

    brick.dataset.repaired = isInProgress ? 'in progress' : 'true';
    brick.textContent = brickNumber;
  });
}

export function destroy() {
  const bricks = document.querySelectorAll('div[id^="brick"]');
  const lastBrick = bricks[bricks.length - 1];
  if (lastBrick) {
    lastBrick.remove();
  }
}