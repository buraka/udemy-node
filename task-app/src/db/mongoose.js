const mongoose = require('mongoose');
const connectionUrl = process.env.MONGODB_URL;

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useCreateIndex: true
});








// const burak = new User({
//   name: 'Burak',
//   age: 24,
//   drink: 'Kahve',
//   email: '    ABC@ME.abc '
// });
//
// burak.save().then(user => console.log(user));


//Task modeli olustur
//description string ve done boolean alanlarini ekleyin
//2 tane yeni obje olustur
//bunlari dbye kaydet ve ekrana logla
//en son kontrol et


// const task1 = new Task({
//   description: 'Evi temizle',
//   done: true
// });
//
// const task2 = new Task({
//   description: 'Odevini yap.',
//   done: false
// });
//
// task1.save().then(t => console.log(t)).catch(e => console.log(e));
// task2.save().then(t => console.log(t)).catch(e => console.log(e));
