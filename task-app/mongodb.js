const { MongoClient, ObjectID } = require('mongodb');

const connectionUrl = 'mongodb://localhost:27017';
const dbName = 'task-app';

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Baglanti hatasi olustu.');
  }

  const db = client.db(dbName);
  db.collection('users').insertOne({
    name: 'Ali',
    lastname: 'Alp',
    age: 38
  }, (err, result) => {
    if (err) {
      return console.log('kayit islemi sirasinda bir hata olustu.');
    }
    console.log(result.ops);
  });

  // db.collection('tasks').insertMany([
  //   {
  //     description: 'Pazara git.',
  //     done: true
  //   },
  //   {
  //     description: 'Okuldan kitabini al',
  //     done: false
  //   }
  // ], (err, result) => {
  //   if (err) {
  //     return console.log('bir hata olustu');
  //   }
  //   console.log(result.ops);
  // })

  // db.collection('users').insertMany([
  //   {
  //     name: 'Ayse',
  //     lastname: 'Abc',
  //     age: 33
  //   },
  //   {
  //     name: 'Zeynep',
  //     lastname: 'Abc',
  //     age: 38
  //   }
  // ]);

  //query find
  // db.collection('users').findOne({
  //   lastname: 'Abc'
  // }, (err, user) => {
  //   if (err) {
  //     return console.log('bir hata olustu.');
  //   }
  //   console.log(user);
  // });

  // db.collection('users').find({ age: 38 }).toArray((err, users) => {
  //   if (err) {
  //     return console.log('bir hata olustu.');
  //   }
  //   console.log(users);
  // });
  //
  // db.collection('users').find({ age: 38 }).count((err, count) => {
  //   if (err) {
  //     return console.log('bir hata olustu.');
  //   }
  //   console.log(count);
  // });

  //odev
  //task collection'indan done: true cekin.
  //console'a hem count fonksiyonunu hem de toArray fonksiyonunu kullanarak degerleri yazdirin.

  // db.collection('tasks').find({ done: true }).toArray((err, tasks) => {
  //   if (err) {
  //     return console.log('bir hata olustu.');
  //   }
  //   console.log(tasks);
  // });
  //
  // db.collection('tasks').find({ done: true }).count((err, c) => {
  //   if (err) {
  //     return console.log('bir hata olustu.');
  //   }
  //   console.log(c);
  // });

  //update documents
  //updateOne updateMany

  // db.collection('users').updateOne({
  //   _id: new ObjectID('5d402e0b82dcca515ef11a22')
  // }, {
  //   $set: {
  //     lastname: 'Alparslan'
  //   }
  // }).then(result => {
  //   console.log(result);
  // }).catch(error => {
  //   console.log(error);
  // });

  //users herkesin yasini 1 artiran kodu yazin.

  // db.collection('users').updateMany({}, {
  //   $inc: {
  //     age: 1
  //   }
  // }).then(result => {
  //   console.log(result.modifiedCount);
  // }).catch(error => {
  //   console.log(error);
  // });

  //delete fonksiyonlari
  //deleteOne deleteMany

  // db.collection('users').deleteOne({
  //   _id: new ObjectID('5d4044d1dece0f59b7cfb3d3')
  // }).then(result => {
  //   console.log(result);
  // }).catch(error => {
  //   console.log(error);
  // });

  // db.collection('users').deleteOne({
  //   age: 39
  // }).then(result => {
  //   console.log(result);
  // }).catch(error => {
  //   console.log(error);
  // });

  //3 tane tasks dokumani ekleyin
  //bunlardan 2sinin done'i true olsun. 1 i false
  //mongodb compass uzerinden kontrol edin. kayitlar olmus mu diye.
  //done olan tum dokumanlari silin. deleteMany kullanarak.
  //tekrar kontrol et.

  // db.collection('tasks').insertMany([
  //   {
  //     description: 'abcd',
  //     done: true
  //   },
  //   {
  //     description: 'cdef',
  //     done: false
  //   },
  //   {
  //     description: 'hhkasd',
  //     done: true
  //   }
  // ]).then(result => console.log(result.ops)).catch(e => console.log(e));

  // db.collection('tasks').deleteMany({
  //   done: true
  // }).then(result => console.log(result.deletedCount)).catch(e => console.log(e));

});
