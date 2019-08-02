// DOM ELEMENTS
const input = document.getElementById('input');
const output = document.getElementById('output');
const convertBtn = document.getElementById('convert');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const charactersValue = document.getElementById('char-value');


const maxCount = 60; // max count for input

const charactersCount = (e) => {
  const currentValue = e.target.value.length; 
  charactersValue.innerText = maxCount - currentValue; // chars left

    if(maxCount - currentValue === 0) { // chars limitation
        charactersValue.classList.add('limit');
    } else {
        charactersValue.classList.remove('limit');
    }

}

// Restricts input for the given textbox to the given inputFilter => Only English letters and numerals.
const setInputFilter = (textbox, inputFilter) => {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(event => {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
      });
    });
}

setInputFilter(input, value => /^[a-zA-Z0-9\s]*$/.test(value));


/* CONVERTER */

const convert = (e) => {

  e.preventDefault();
  const morseCode = {
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G",
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z",
    "-----": "0",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
  };
  
  const textToChange = input.value; // read input value
  const words = textToChange.toUpperCase().replace(/ +/g, ' ').split(' '); // array of words, regex for multi whitespaces

  let convertedWords = words.map(word => { //temp arr of translated words
    return word.split('').map(letter => {
      const getKey = (obj,val) => Object.keys(obj).find(key => obj[key] === val); // find obj key by value
      return getKey(morseCode, letter);
    });
  });

  const code = convertedWords.map(word => word.join(' ')).join('   '); // 1 space for letters, 3 for words
  
  output.innerText = code;
}

/* SOUND */

let contextPublic; // exposed contex for global scope

const playSound = (e) => {

  let ctx;

  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    ctx = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }

  const dot = 1.2 / 15;

  e.preventDefault();
  let time = ctx.currentTime;
  let oscillator = ctx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 600;

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0, time);

  output.value.split('').forEach(letter => {
    switch(letter) {
      case ".":
        gainNode.gain.setValueAtTime(1, time);
        time += dot;
        gainNode.gain.setValueAtTime(0, time);
        time += dot;
        break;
      case "-":
        gainNode.gain.setValueAtTime(1, time);
        time += 3 * dot;
        gainNode.gain.setValueAtTime(0, time);
        time += dot;
        break;
      case " ":
        time += 3 * dot;
        break;
      case "   ":
        time += 7 * dot;
        break; 
    }
  });

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscillator.start();
  contextPublic = ctx;

  console.log(contextPublic);

  return false;
}

const stopSound = (e) => {
  e.preventDefault();

  if(typeof contextPublic !== 'undefined') {
    contextPublic.close().then( () => console.log(contextPublic));
  }
  
}

const checkIfSoundPlaying = () => {  //to avoid many sounds playing at once
  if(typeof contextPublic !== 'undefined' && contextPublic.state === 'suspended' || contextPublic.state === 'running') {
    playBtn.disabled = true;
  } else {
    playBtn.disabled = false;
  }
}

/* EVENTS */
input.addEventListener('keydown', charactersCount);
window.addEventListener('load', () => {
  input.value = "";
  input.setAttribute('maxlength', maxCount.toString());
  charactersValue.innerText = maxCount;
});
convertBtn.addEventListener('click', convert);
playBtn.addEventListener('click', playSound);
stopBtn.addEventListener('click', stopSound);

//convertBtn.addEventListener('click', checkIfSoundPlaying);
playBtn.addEventListener('click', checkIfSoundPlaying);
stopBtn.addEventListener('click', checkIfSoundPlaying);



