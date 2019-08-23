const socket = io();

//Elemanlar
const sendLocationButton = document.querySelector('#sendLocation');
const sendButton = document.querySelector('#send');
const messageInput = document.querySelector('#message');
const receivedMessage = document.querySelector('#receivedMessage');

//Template
const receivedMessageTemplate = document.querySelector('#receivedMessageTemplate').innerHTML;

sendButton.addEventListener('click', () => {
  sendButton.setAttribute('disabled', 'disabled');
  const messageText = messageInput.value;
  socket.emit('sendMessage', messageText, (isDelivered) => {
    if (isDelivered) {
      console.log('Gonderildi.');
    } else {
      console.log('Gonderilemedi.')
    }
    messageInput.value = '';
    messageInput.focus();
    sendButton.removeAttribute('disabled');

  });
});

socket.on('receivedMessage', (messageObj) => {
  const { message, createdAt } = messageObj;
  const template = Handlebars.compile(receivedMessageTemplate);
  receivedMessage.insertAdjacentHTML('beforeend', template({
    message,
    createdAt: moment().format('H:mm')
  }));
});

sendLocationButton.addEventListener('click', () => {
  //deactive et - disabled
  sendLocationButton.setAttribute('disabled', 'disabled')
  if (!navigator.geolocation) {
    console.log('hata')
    //tekrar aktif et
    sendLocationButton.removeAttribute('disabled');
    return;
  }
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    socket.emit('sendLocation', {
      latitude,
      longitude
    })
    //tekrar aktif et
    sendLocationButton.removeAttribute('disabled');
    const template = Handlebars.compile(receivedMessageTemplate);
    receivedMessage.insertAdjacentHTML('beforeend', template({
      url: `http://maps.google.com?q=${latitude},${longitude}`
    }));
  });
});


// socket.on('count', (count) => {
//   console.log(`count ${count}`);
// });

// document.querySelector('#inc').addEventListener('click', () => {
//   socket.emit('inc');
// })
