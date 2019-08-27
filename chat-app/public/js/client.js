const socket = io();

//Elemanlar
const sendLocationButton = document.querySelector('#sendLocation');
const sendButton = document.querySelector('#send');
const messageInput = document.querySelector('#message');
const receivedMessage = document.querySelector('#receivedMessage');
const sidebarInfo = document.querySelector('#sidebarInfo');

//Template
const receivedMessageTemplate = document.querySelector('#receivedMessageTemplate').innerHTML;
const sidebarInfoTemplate = document.querySelector('#sidebarInfoTemplate').innerHTML;

const { username, channel } = Qs.parse(location.search, { ignoreQueryPrefix: true });

socket.emit('join', { username, channel }, (error, user) => {
  if (error) {
    alert(error);
  }
});

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
  const { username, message, url, createdAt } = messageObj;
  const template = Handlebars.compile(receivedMessageTemplate);
  receivedMessage.insertAdjacentHTML('beforeend', template({
    username,
    message,
    url,
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
  });
});

socket.on('sidebarInfo', ({ channel, users }) => {
  const template = Handlebars.compile(sidebarInfoTemplate);
  sidebarInfo.innerHTML = template({
    channel,
    users
  })
});
