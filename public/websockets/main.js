/* globals io */

var socket = io();

var author = document.getElementById('author');
var message = document.getElementById('message');
var submitButton = document.getElementById('submit');

var messages = document.querySelector('.messages');
var statusMessage = document.querySelector('.status');

submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  socket.send('message', {
    author: author.value,
    message: message.value
  });
});

socket.on('new message', addMessageToPage);
socket.on('new connection', updateStatus.bind(null, 'Someone has disconnected.'));
socket.on('lost connection', updateStatus.bind(null, 'Someone has disconnected.'));

// Utility functions to modifying the page when an event is received over the
// WebSocket connection.
function addMessageToPage(data) {
  var newMessage = document.createElement('div');
  newMessage.className = 'message';
  newMessage.innerHTML = `<p><strong>${data.author}</strong>: ${data.message}</p>`
  messages.appendChild(newMessage);
}

function updateStatus(message, data) {
  var users = data.connections === 1 ? 'user' : 'users';
  statusMessage.textContent = `${message} There are now ${data.connections} ${users}.`;
}
