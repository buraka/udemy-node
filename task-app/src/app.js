const express = require('express');
const taskRouter = require('./router/task');
const userRouter = require('./router/user');
require('./db/mongoose');

const app = express();

// const SendEmail = require('./emails/sendEmail');
//
// SendEmail('Burak');

// const multer = require('multer');
// const upload = multer({
//   dest: 'files',
//   limits: {
//     fileSize: 1000000
//   },//.jpg .jpeg .png, RegEx
//   fileFilter(req, file, callback) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       callback(new Error('Sadece resim dosyasi gonderiniz.'));
//     }
//     callback(undefined, true);
//     // callback(undefined, true);
//     // callback(new Error('Sadece pdf dosyasi kabul edilir.'));
//     // callback(undefined, false);
//   }
// });
//
// // const mw = (req, res, next) => {
// //   throw new Error('MW\'den gelen hata mesaji.');
// // }
//
// app.post('/upload', upload.single('file'), (req, res) => {
//   res.send();
// }, (error, req, res, next) => {
//   res.status(400).send({
//     message: error.message
//   })
// });


// app.use((req, res, next) => {
//   console.log(req.method, req.url);
//   if (req.method === 'GET') {
//     next();
//   } else {
//       res.status(500).send('Su an sadece get istekleri atabilirsiniz.')
//   }
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log('Server ayakta... ', port);
});

// const Task = require('./models/task');
// const User = require('./models/user');
//
// const abc = async () => {
//   const user = await User.findById('5d443c27e5fec101be5445c5');
//   await user.populate('tasks').execPopulate();
//   console.log(user.tasks);
//
//   // const task = await Task.findById('5d443c49e5fec101be5445c7');
//   // await task.populate('user').execPopulate();
//   // console.log(task);
// }
//
// abc();
