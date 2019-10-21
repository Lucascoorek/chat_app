const socket = io();
const $form = document.querySelector('form');
const $inputForm = $form.message;
const $buttonForm = $form.querySelector('button');
const $buttonLocation = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');
const $aside = document.querySelector('#aside');

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;
const asideTemplate = document.querySelector('#aside-template').innerHTML;

// Options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const autoscroll = () => {
  document.querySelector('section').scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'nearest'
  });
};

socket.on('message', msg => {
  console.log(msg);
  const html = Mustache.render(messageTemplate, {
    username: msg.username,
    txt: msg.txt,
    createdAt: moment(msg.createdAt).format('HH:mm')
  });
  $messages.insertAdjacentHTML('beforeend', html);
  autoscroll();
});

socket.on('locationMessage', location => {
  console.log(location);
  const html = Mustache.render(locationTemplate, {
    username: location.username,
    locationURL: location.url,
    createdAt: moment(location.createdAt).format('HH:mm')
  });
  $messages.insertAdjacentHTML('beforeend', html);
  autoscroll();
});
socket.on('usersData', ({ room, users }) => {
  const html = Mustache.render(asideTemplate, {
    room,
    users
  });
  $aside.innerHTML = html;
});

$form.addEventListener('submit', e => {
  e.preventDefault();
  $buttonForm.disabled = true;
  socket.emit('sendMessage', $inputForm.value, error => {
    $buttonForm.disabled = false;
    $inputForm.value = '';
    $inputForm.focus();
    if (error) {
      return console.log(error);
    }
    console.log(`The message was delivered`);
  });
});

$buttonLocation.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('No support for geoloacation');
  }
  $buttonLocation.disabled = true;
  navigator.geolocation.getCurrentPosition(position => {
    const coords = {
      lat: position.coords.latitude,
      long: position.coords.longitude
    };
    socket.emit('sendLocation', coords, () => {
      console.log('Location was shared');
      $buttonLocation.disabled = false;
    });
  });
});

socket.emit('join', { username, room }, error => {
  if (error) {
    alert(error);
    location.href = '/';
  }
});
