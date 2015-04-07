var $startRecognitionButton = $('#start-recognition');
var $stopRecognitionButton = $('#stop-recognition');
var $transcriptions = $('.transcripts');

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

$startRecognitionButton.on('click', function () {
  toggleRecognitionButtons();
  recognition.start();
});

$stopRecognitionButton.on('click', function () {
  toggleRecognitionButtons();
  recognition.stop();
});

function toggleRecognitionButtons() {
  $startRecognitionButton.toggle();
  $stopRecognitionButton.toggle();
}

function appendTranscriptionToPage(result) {
  var $transcription = $(`<p>${result.transcript} (${result.confidence})</p>`);
  $transcriptions.append($transcription);
}
