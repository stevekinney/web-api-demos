(function(){
  'use strict';

  // Find the element where we plan on displaying the current lux.
  var $luxReading = $('.lux');

  window.addEventListener('devicelight', function(event) {
    var lux = event.value;

    // Update that element we queried for with the current lux
    $luxReading.text(lux);

    // Update the color of the text and background based on the current lux
    $('body').css('backgroundColor', `rgb(${lux}, ${lux}, ${lux})`)
             .css('color', `rgb(${255 - lux}, ${255 - lux}, ${255 - lux})`);
  });

}());
