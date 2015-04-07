/* globals io */

(function(){
  'use strict';

  // Initialize the WebSocket connection.
  var socket = io();

  // Grab some DOM element that we're going to be using throughout the application.
  var author = $('#author');
  var message = $('#message');
  var submitButton = $('#submit');

  var messages = $('.messages');
  var statusMessage = $('.status');

  // Send a message over the WebSocket when the form is submitted.
  submitButton.on('click', function (event) {
    event.preventDefault();
    socket.send('message', {
      author: author.val(),
      message: message.val()
    });
  });

  // Handle received message from the WebSocket server.
  socket.on('new message', addMessageToPage);
  socket.on('new connection', updateStatus.bind(null, 'A new user has connected.'));
  socket.on('lost connection', updateStatus.bind(null, 'Someone has disconnected.'));

  // Utility functions for modifying the page when an event is received over the
  // WebSocket connection.
  function addMessageToPage(data) {
    $(`<p></p>`).text(`${data.author}: ${data.message}`)
                .appendTo(messages);
  }

  function updateStatus(connectionMessage, data) {
    var numberOfUsers;
    // Grammar is hard.
    if (data.connections === 1) {
      numberOfUsers = `You are the only user in the room.`;
    } else {
      numberOfUsers = `There are now ${data.connections} users.`;
    }
    statusMessage.text(`${connectionMessage} ${numberOfUsers}`);
  }
}());
