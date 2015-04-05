(function () {
  'use strict';

  // Find the element where we plan on displaying the current lux.
  var luxReading = document.querySelector('.lux');

  window.addEventListener('devicelight', function(event) {
    var lux = event.value;

    // Update that element we queried for with the current lux
    luxReading.innerHTML = lux;

    // Update the color of the text and background based on the current lux
    document.body.style.backgroundColor = `rgb(${lux}, ${lux}, ${lux})`;
    document.body.style.color = `rgb(${255 - lux}, ${255 - lux}, ${255 - lux})`;
  });

}());
