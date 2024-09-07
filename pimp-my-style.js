const styles = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen'
];

let currentIndex = -1;
let isRemoving = false;

export function pimp() {
  const button = document.querySelector('.button');
  
  if (!isRemoving) {
    if (currentIndex < styles.length - 1) {
      currentIndex++;
      button.classList.add(styles[currentIndex]);
    } 
    if (currentIndex === styles.length - 1) {
      isRemoving = true;
      button.classList.add('unpimp');
    }
  } else {
    if (currentIndex >= 0) {
      button.classList.remove(styles[currentIndex]);
      currentIndex--;
    }
    if (currentIndex === -1) {
      isRemoving = false;
      button.classList.remove('unpimp');
    }
  }
}