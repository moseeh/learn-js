// Helper function to select elements
const select = (selector) => document.querySelectorAll(selector);
const selectOne = (selector) => document.querySelector(selector);

export function getArchitects() {
  return [
    select('body a'),
    select('body span')
  ];
}

export function getClassical() {
  return [
    select('a.classical'),
    select('a:not(.classical)')
  ];
}

export function getActive() {
  return [
    select('a.classical.active'),
    select('a.classical:not(.active)')
  ];
}

export function getBonannoPisano() {
  return [
    selectOne('#BonannoPisano'),
    select('a.classical.active')
  ];
}