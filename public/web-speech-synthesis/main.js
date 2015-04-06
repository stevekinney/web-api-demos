/* globals SpeechSynthesisUtterance */

// This will only work in Chrome and Safari.

var readTextButton = document.getElementById('read-text');
var voiceList = document.getElementById('voices');

function readText() {
  readTextButton = document.getElementById('read-text');
  readTextButton.disabled = false;

  readTextButton.addEventListener('click', function () {
    var speechSynthesis = window.speechSynthesis;

    var text = document.getElementById('read-me').value;
    var utterance = new SpeechSynthesisUtterance(text);

    utterance.voice = getSelectedVoice();

    speechSynthesis.speak(utterance);
  });
}

function populateListOfVoices() {
  window.speechSynthesis.getVoices().forEach(function (voice) {
    var voiceOption = document.createElement('option');
    voiceOption.value = voice.name;
    voiceOption.textContent = voice.name;
    voiceList.appendChild(voiceOption);
  });
}

function getSelectedVoice() {
  var selectedVoice = voiceList.value;
  return window.speechSynthesis.getVoices().filter(function (voice) {
    return voice.name === selectedVoice;
  })[0];
}

window.speechSynthesis.onvoiceschanged = function() {
  readText();
  populateListOfVoices();
};
