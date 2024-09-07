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
  
  if (isRemoving) {
    if (currentIndex > 0) {
      button.classList.remove(styles[currentIndex]);
      currentIndex--;
    } else {
      button.classList.remove(styles[0], 'unpimp');
      isRemoving = false;
    }
  } else {
    if (currentIndex < styles.length - 1) {
      currentIndex++;
      button.classList.add(styles[currentIndex]);
    } else {
      button.classList.add('unpimp');
      isRemoving = true;
    }
  }
}