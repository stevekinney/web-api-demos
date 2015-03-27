var luxReading = document.querySelector('.lux');

window.addEventListener('devicelight', function(event) {
  var lux = event.value;
  luxReading.innerHTML = lux;

  document.body.style.backgroundColor = `rgb(${lux}, ${lux}, ${lux})`;
  document.body.style.color = `rgb(${255 - lux}, ${255 - lux}, ${255 - lux})`
});