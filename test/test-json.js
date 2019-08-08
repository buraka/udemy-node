const fs = require('fs');

// const note = {
//   title: 'Alis veris',
//   body: 'Patates (1kg)'
// };
//
// const noteStr = JSON.stringify(note);
//
// fs.writeFileSync('test-json.json', noteStr);
//
// console.log(noteStr);

const noteFile = fs.readFileSync('test-json.json'); //Buffer objesi aliyoruz
const noteStr = noteFile.toString();

const note = JSON.parse(noteStr);

console.log(note.body);
