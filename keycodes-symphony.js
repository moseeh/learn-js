export function compose() {
  document.addEventListener('keydown', handleKeyPress);

  function handleKeyPress(event) {
    event.preventDefault(); // Prevent default for all keys

    if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
      createNote(event.key.toLowerCase());
    } else if (event.key === 'Backspace') {
      deleteLastNote();
    } else if (event.key === 'Escape') {
      clearAllNotes();
    }
  }

  function createNote(key) {
    const note = document.createElement('div');
    note.className = 'note';
    note.textContent = key;
    note.style.backgroundColor = generateColor(key);
    document.body.appendChild(note);
  }

  function deleteLastNote() {
    const notes = document.querySelectorAll('.note');
    if (notes.length > 0) {
      notes[notes.length - 1].remove();
    }
  }

  function clearAllNotes() {
    document.body.innerHTML = '';
  }

  function generateColor(key) {
    const hue = ((key.charCodeAt(0) - 97) / 26) * 360;
    return `hsl(${hue}, 70%, 50%)`;
  }
}