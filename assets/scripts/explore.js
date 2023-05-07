// explore.js

window.addEventListener('DOMContentLoaded', init);

let synth = window.speechSynthesis;

function init() {
  let exploreSec = document.querySelector("#explore");

  const smileImg = exploreSec.querySelector("img");
  const talkButton = exploreSec.querySelector("button");

  const voiceSelect = exploreSec.querySelector("#voice-select");
  const inputTxt = exploreSec.querySelector("#text-to-speak");

  console.log(voiceSelect.value);

  let voices = [];

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

  inputTxt.onsubmit = (event) => {
    event.preventDefault();
  }

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