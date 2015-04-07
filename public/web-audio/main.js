var WIDTH = window.innerWidth;

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();
var currentOscillator;

var initialFrequency = 0;
var maximumFrequency = 800;

var currentFrequencyMeter = $('#current-frequency');

function createOscillator() {
  var oscillator = audioContext.createOscillator();
  oscillator.connect(audioContext.destination);
  oscillator.type = 'square';
  oscillator.frequency.value = initialFrequency;
  return oscillator;
}

var startAudioButton = $('#start-audio');
var stopAudioButton = $('#stop-audio');

function toggleButtons() {
  startAudioButton.toggle();
  stopAudioButton.toggle();
}

startAudioButton.on('click', function () {
  toggleButtons();
  currentOscillator = createOscillator();
  currentOscillator.start(0);
  var currentX;
  document.onmousemove = function (e) {
    currentX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    currentOscillator.frequency.value = (currentX / WIDTH) * maximumFrequency;
    currentFrequencyMeter.text(currentOscillator.frequency.value);
  };
});

stopAudioButton.on('click', function () {
  toggleButtons();
  currentOscillator.stop();
  document.onmousemove = null;
  currentFrequencyMeter.text('Off');
});
