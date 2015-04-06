var startRecognitionButton = document.getElementById('start-recognition');
var stopRecognitionButton = document.getElementById('stop-recognition');
var transcriptions = document.querySelector('.transcripts');

var SpeechRecognition = window.SpeechRecognition ||
                        window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();
recognition.continuous = false; // This is the default.
recognition.interimResults = false;  // This is the default.

recognition.onresult = function (event) {
  var each = Array.prototype.forEach;
  each.call(event.results, function (result) {
    each.call(result, function (alt) {
      appendTranscriptionToPage(alt);
    });
  });
};

recognition.onstart = function () { console.log('Starting…'); };
recognition.onend = function () { console.log('Ending…'); };

startRecognitionButton.addEventListener('click', function () {
  toggleRecognitionButtons();
  recognition.start();
});

stopRecognitionButton.addEventListener('click', function () {
  toggleRecognitionButtons();
  recognition.stop();
});

function toggleRecognitionButtons() {
  startRecognitionButton.disabled = !startRecognitionButton.disabled;
  stopRecognitionButton.disabled = !stopRecognitionButton.disabled;
}

function appendTranscriptionToPage(result) {
  var transcription = document.createElement('p');
  transcription.className = 'transcription';
  transcription.textContent = `${result.transcript} (${result.confidence})`;
  transcriptions.appendChild(transcription);
}
