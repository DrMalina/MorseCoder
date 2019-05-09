console.log('Hello World');


// ELEMENTS
const input = document.getElementById('input');
const charactersValue = document.getElementById('char-value');


const maxCount = 60;

const readValue = (e) => {
    const currentValue = e.target.value;

    charactersCount(currentValue.length);
}

const charactersCount = (value) => {

    charactersValue.innerText = maxCount - value;

    if(maxCount - value === 0) {
        charactersValue.classList.add('limit');
    } else {
        charactersValue.classList.remove('limit');
    }

}

// Restricts input for the given textbox to the given inputFilter.
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


/* EVENTS */
input.addEventListener('keydown', readValue);
window.addEventListener('load', () => {
    input.value = "";
    input.setAttribute('maxlength', maxCount.toString());
    charactersValue.innerText = maxCount;
});