var luxReading = document.querySelector('.lux');
var lightBox = document.querySelector('.light-box');

window.addEventListener('devicelight', function(event) {
  var lux = event.value;

  luxReading.innerHTML = lux;
  lightBox.style.backgroundColor = `rgb(${lux}, ${lux}, ${lux})`;
});