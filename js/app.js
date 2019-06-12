// ELEMENTS
const input = document.getElementById('input');
const output = document.getElementById('output');
const convertBtn = document.getElementById('convert');
const charactersValue = document.getElementById('char-value');


const maxCount = 60;

/* const readValue = (e) => {
    const currentValue = e.target.value;

    charactersCount(currentValue.length);
} */

const charactersCount = (e) => {
  const currentValue = e.target.value.length; 
  charactersValue.innerText = maxCount - currentValue; // chars left

    if(maxCount - currentValue === 0) { // chars limitation
        charactersValue.classList.add('limit');
    } else {
        charactersValue.classList.remove('limit');
    }

}


/* const charactersCount = (value) => {

    charactersValue.innerText = maxCount - value;

    if(maxCount - value === 0) {
        charactersValue.classList.add('limit');
    } else {
        charactersValue.classList.remove('limit');
    }

} */

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
      const getKey = (obj,val) => Object.keys(obj).find(key => obj[key] === val); // read obj key by value
      return getKey(morseCode, letter);
    });
  });

  const code = convertedWords.map(word => word.join(' ')).join('   '); // 1 space for letters, 3 for words
  
  output.innerText = code;

}




/* EVENTS */
input.addEventListener('keydown', charactersCount);
window.addEventListener('load', () => {
    input.value = "";
    input.setAttribute('maxlength', maxCount.toString());
    charactersValue.innerText = maxCount;
});
convertBtn.addEventListener('click', convert);