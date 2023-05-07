// expose.js

window.addEventListener('DOMContentLoaded', init);

// Adds confetti canvas to page
const jsConfetti = new JSConfetti();

function init() {
  console.log("where2");

  //Expose section's images
  const exposeSec = document.getElementById("expose");
  const exposeImgs = exposeSec.querySelectorAll("img");

  //Select element and its value
  const hornSelect = exposeSec.querySelector("#horn-select");
  let hornValue = hornSelect.options[hornSelect.selectedIndex].text;

  //Audio button and audio elements
  const soundButton = exposeSec.querySelectorAll("button");
  const hornSound = exposeSec.querySelectorAll("audio");

  //Volume control's input element
  const volumeIn = exposeSec.querySelector("#volume-controls #volume");

  
  // Handles when select element changes: 
  // sets chosen image and audio
  hornSelect.addEventListener("change", function() {
    hornValue = hornSelect.options[hornSelect.selectedIndex].value;
    exposeImgs[0].src  = "assets/images/"+ hornValue + ".svg";

    hornSound[0].src = "assets/audio/"+ hornValue + ".mp3"
  });

  // When "Play Sound" button is clicked: 
  // plays set audio and confetti if chosen
  soundButton[0].addEventListener("click", function() {
    // Checks for confetti
    if(hornValue == "party-horn"){
      jsConfetti.addConfetti();
    }

    hornSound[0].play();
  });

  // Handles when new input is read from input slider:
  // changes volume control image element and audio's volume based on input 
  volumeIn.addEventListener("input", (event) =>{
    var volumeVal = event.target.value;

    // Sets volume image
    if(volumeVal == 0){
      exposeImgs[1].src = "assets/icons/volume-level-0.svg";
    }
    else if(volumeVal >= 1 && volumeVal < 33){
      exposeImgs[1].src = "assets/icons/volume-level-1.svg";
    }
    else if(volumeVal >= 33 && volumeVal < 67){
      exposeImgs[1].src = "assets/icons/volume-level-2.svg";
    }
    else if(volumeVal >= 67){
      exposeImgs[1].src = "assets/icons/volume-level-3.svg";
    }

    // Sets volume
    volumeVal = volumeVal / 100;
    hornSound[0].volume = volumeVal;
  });
}