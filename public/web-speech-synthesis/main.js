/* globals SpeechSynthesisUtterance */

// This will only work in Chrome and Safari.

var textToRead = $('#read-me');
var readTextButton = $('#read-text');
var voiceList = $('#voices');

function readText() {
  readTextButton.attr('disabled', false);

  readTextButton.on('click', function () {
    var speechSynthesis = window.speechSynthesis;

    var text = textToRead.val();
    var utterance = new SpeechSynthesisUtterance(text);

    utterance.voice = getSelectedVoice();

    speechSynthesis.speak(utterance);
  });
}

function populateListOfVoices() {
  window.speechSynthesis.getVoices().forEach(function (voice) {
    $('<option>').val(voice.name).text(voice.name).appendTo(voiceList);
  });
}

function getSelectedVoice() {
  var selectedVoice = voiceList.val();
  return window.speechSynthesis.getVoices().filter(function (voice) {
    return voice.name === selectedVoice;
  })[0];
}

window.speechSynthesis.onvoiceschanged = function() {
  readText();
  populateListOfVoices();
};
