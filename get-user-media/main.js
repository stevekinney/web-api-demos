(function () {
  'use strict';

  // Normalize vendor prefixes
  navigator.getUserMedia = navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia;

  // Find the video element
  var video = document.querySelector('video');

  // Check if the browser actually supports getUserMedia
  if (navigator.getUserMedia) {

    // Go ahead and get grab a MediaStream from the camera
    navigator.getUserMedia({audio: false, video: true}, function(stream) {
      video.src = window.URL.createObjectURL(stream);
    }, function (error) {
      // If they reject access, do something here.
      console.log('Rejected', error);
    });
  } // Ideally, you'd put a fallback for browsers that don't support
    // getUserMedia here.
}());
