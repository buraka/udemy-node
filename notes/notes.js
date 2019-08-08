const fs = require('fs');
const chalk = require('chalk');
const NOTES_FILE_NAME = 'notes.json';

const getNotes = () => {
  try {
    const notes = fs.readFileSync(NOTES_FILE_NAME).toString();
    return JSON.parse(notes);
  } catch (e) {
    return [];
  }
}

//not ekleme fonksiyonu
const addNote = (title, body) => {
  //onceki kayitli notlari cek
  const notes = getNotes();

  debugger;

  //title kontrolu
  const duplicatedNotes = notes.filter(note => note.title === title);

  if (duplicatedNotes.length !== 0) {
    console.log(chalk.red.inverse('Ayni title ile kayit etmeye calistiniz.'));
    return;
  }

  // { title, body } notlara ekleme
  notes.push({
    title,
    body
  });
  console.log(chalk.green.inverse('Notunuz eklendi.'));

  console.log(notes);

  //yeni diziyi kayit edelim.
  saveNotes(notes);
}

const saveNotes = (notes) => {
  const notesJson = JSON.stringify(notes);
  fs.writeFileSync(NOTES_FILE_NAME, notesJson);
}

//remove Note
const removeNote = (title) => {
  // onceki kayitli notlari cek
  const notes = getNotes();

  //notu bul ve sil
  const newNoteList = notes.filter(note => note.title !== title);
  console.log(chalk.red.inverse('Notunuz silindi.'));

  //yeni not dizisini kayit et
  saveNotes(newNoteList);
}

const getNote = (title) => {
  //tum notlari cek
  const notes = getNotes();

  //title a gore bul.
  const noteList = notes.filter(note => note.title === title);

  return noteList.length === 0 ? {} : noteList[0];
}

module.exports = {
  getNotes,
  addNote,
  removeNote,
  getNote
}
