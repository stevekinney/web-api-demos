var WIDTH = window.innerWidth;

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();
var currentOscillator;

var initialFrequency = 0;
var maximumFrequency = 800;

var currentFrequencyMeter = document.getElementById('current-frequency');

function createOscillator() {
  var oscillator = audioCtx.createOscillator();
  oscillator.connect(audioCtx.destination);
  oscillator.type = 'square';
  oscillator.frequency.value = initialFrequency;
  return oscillator;
}

var startAudioButton = document.getElementById('start-audio');
var stopAudioButton = document.getElementById('stop-audio');

function toggleButtons() {
  startAudioButton.disabled = !startAudioButton.disabled;
  stopAudioButton.disabled = !stopAudioButton.disabled;
}

startAudioButton.addEventListener('click', function () {
  toggleButtons();
  currentOscillator = createOscillator();
  currentOscillator.start(0);
  var currentX;
  document.onmousemove = function (e) {
    currentX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    currentOscillator.frequency.value = (currentX / WIDTH) * maximumFrequency;
    currentFrequencyMeter.textContent = currentOscillator.frequency.value;
  };
});

stopAudioButton.addEventListener('click', function () {
  toggleButtons();
  currentOscillator.stop();
  document.onmousemove = null;
  currentFrequencyMeter.textContent = 'Off';
});
