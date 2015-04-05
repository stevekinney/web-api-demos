/* globals io */

(function () {
  'use strict';

  // Initialize the WebSocket connection.
  var socket = io();

  // Grab some DOM element that we're going to be using throughout the application.
  var author = document.getElementById('author');
  var message = document.getElementById('message');
  var submitButton = document.getElementById('submit');

  var messages = document.querySelector('.messages');
  var statusMessage = document.querySelector('.status');

  // Send a message over the WebSocket when the form is submitted.
  submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    socket.send('message', {
      author: author.value,
      message: message.value
    });
  });

  // Handle received message from the WebSocket server.
  socket.on('new message', addMessageToPage);
  socket.on('new connection', updateStatus.bind(null, 'A new user has connected.'));
  socket.on('lost connection', updateStatus.bind(null, 'Someone has disconnected.'));

  // Utility functions to modifying the page when an event is received over the
  // WebSocket connection.
  function addMessageToPage(data) {
    var messageAuthor = document.createElement('strong')
                                .appendChild(document.createTextNode(`${data.author}: `));
    var messageContent = document.createTextNode(data.message);
    var newMessage = document.createElement('div');
    newMessage.className = 'message';
    newMessage.appendChild(messageAuthor);
    newMessage.appendChild(messageContent);
    messages.appendChild(newMessage);
  }

  function updateStatus(connectionMessage, data) {
    var users = data.connections === 1 ? 'user' : 'users';
    statusMessage.textContent = `${connectionMessage}
                                 There are now ${data.connections} ${users}.`;
  }
}());
