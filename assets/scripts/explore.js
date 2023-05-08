// explore.js

window.addEventListener('DOMContentLoaded', init);

// Adds SpeechSynthesis
let synth = window.speechSynthesis;

function init() {
  let exploreSec = document.querySelector("#explore");

  // Smile image and talk button
  const smileImg = exploreSec.querySelector("img");
  const talkButton = exploreSec.querySelector("button");

  // Voice select element and input element from 
  const voiceSelect = exploreSec.querySelector("#voice-select");
  const inputTxt = exploreSec.querySelector("#text-to-speak");

  // Initializes voices options
  let voices = [];

  // Creates voice options based on browser
  function populateVoiceList() {
    voices = synth.getVoices();

    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }

      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  // When Push to talk is pressed:
  // creates a new utterance based on the selected voice and read test input;
  // also speaks the utterance and handles the smile image when utterance ends
  talkButton.addEventListener("click", (event) => {
    const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    const selectedOption =
      voiceSelect.selectedOptions[0].getAttribute("data-name");
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    synth.speak(utterThis);

    smileImg.src = "assets/images/smiling-open.png";

    utterThis.addEventListener("end", function () {
      console.log(speechSynthesis.speaking);
      smileImg.src = "assets/images/smiling.png";
    });
    inputTxt.blur();
  });

}