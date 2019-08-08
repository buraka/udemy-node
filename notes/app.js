// const fs = require('fs');

// console.log('merhaba Node JS');
//
// console.log('Benim adim: %s soyadim: %s', 'Burak', 'Alparslan')
//
// const name = 'Ali';
//
// console.log(`Merhaba ${name}`);

// fs.appendFileSync('notes.txt', 'React JS\n');
// fs.appendFileSync('notes.txt', 'Docker\n');

//append
// ---------------------
const { name, deduct } = require('./helper');

console.log(`Merhaba ${name}`);

const result = deduct(5, 3);
console.log(result);

//notes.js dosyasini olustur.
//getNotes fonksiyon yazin. [{ note: 'ilk notum' }]
//app.js icinden cagirip console.log ile ekrana yazdiralim.

const { getNotes } = require('./notes');

const result2 = getNotes();
console.log(result2[0].note);
