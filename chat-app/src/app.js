const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const { getMessage } = require('./utils/message');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.port || 3000;

const publicPathDirectory = path.join(__dirname, '../public');

app.use(express.static(publicPathDirectory));

// let count = 0;

io.on('connection', (socket) => {

  socket.broadcast.emit('receivedMessage', getMessage('Yeni kullanici geldi.'));

  socket.on('sendMessage', (messageText, callback) => {
    if (messageText === 'Merhaba') {
      return callback(false);
    }
    io.emit('receivedMessage', getMessage(messageText));
    callback(true);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('receivedMessage', getMessage('Kullanici gitti.'))
  });

  socket.on('sendLocation', coords => {
    socket.broadcast.emit('receivedMessage',
          `Koordinatlar geld'. Enlem ${coords.latitude}, boylam: ${coords.longitude}`);
  })


  // console.log('web socket olusturuldu.');
  // socket.emit('count', ++count);
  //
  // socket.on('inc', () => {
  //   io.emit('count', ++count)
  // })
});

server.listen(port, () => {
  console.log(`Serverimizi ${port} portunda hazir...`)
})
