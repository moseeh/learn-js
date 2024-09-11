function defaultCurry(obj1) {
  return function(obj2) {
    return { ...obj1, ...obj2 };
  };
}

function mapCurry(fn) {
  return function(obj) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => fn([k, v]))
    );
  };
}

function filterCurry(fn) {
  return function(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([k, v]) => fn([k, v]))
    );
  };
}

function reduceCurry(fn) {
  return function(obj, initialValue) {
    return Object.entries(obj).reduce((acc, entry) => fn(acc, entry), initialValue);
  };
}

function reduceScore(personnel, initialValue = 0) {
    return reduceCurry((acc, [k, v]) => v.isForceUser ? acc + v.shootingScore : acc)(personnel, initialValue);
  }
  

function filterForce(personnel) {
  return filterCurry(([k, v]) => v.isForceUser && v.shootingScore >= 80)(personnel);
}

function mapAverage(personnel) {
  return mapCurry(([k, v]) => [k, { ...v, averageScore: (v.pilotingScore + v.shootingScore) / 2 }])(personnel);
}
