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


const personnel = {
  lukeSkywalker: { id: 5, pilotingScore: 98, shootingScore: 56, isForceUser: true },
  sabineWren:    { id: 82, pilotingScore: 73, shootingScore: 99, isForceUser: false },
  zebOrellios:   { id: 22, pilotingScore: 20, shootingScore: 59, isForceUser: false },
  ezraBridger:   { id: 15, pilotingScore: 43, shootingScore: 67, isForceUser: true },
  calebDume:     { id: 11, pilotingScore: 71, shootingScore: 85, isForceUser: true },
};


const result = reduceScore(personnel);
console.log(result); // Output should be 208

