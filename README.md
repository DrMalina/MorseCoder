# MorseCoder
A simple website focused on a Morse Code.

The main idea was to create some kind of converter, that translates English words to the encrypted ones.
For that I used **Web Audio API** and played with it for a bit untill the results were satisfying. 

The biggest challange I had was to restrict input options and create an error-free array of words 
while maintaining the correct whitespaces ratio. The ratio is fundamental when it comes to Morse Code
- I couldn't eliminate them all with regex, on the other hand I had to check if there are multiply spaces
in a row :

```javascript
const textToChange = input.value; // read input value
const words = textToChange.toUpperCase().replace(/ +/g, ' ').split(' '); // array of words, regex for multi whitespaces

let convertedWords = words.map(word => { //temporary array of translated words
    return word.split('').map(letter => {
        const getKey = (obj,val) => Object.keys(obj).find(key => obj[key] === val); // find obj key by value (morse letter)
        return getKey(morseCode, letter);
    });
});

const code = convertedWords.map(word => word.join(' ')).join('   '); // 1 space for letters, 3 for words
```
The second problem was getting rid of an overlay sound, which was created while mashing very fast 'Play' Button.
It seems to be working now without some major issues, however I still recommend using Chrome for best results.

RWD principles are implemented.

### Known bugs :
* In safari / firefox when hitting 'stop' button during the audio and trying to play it again, causes audio context to gets stuck 
- you need to click 'stop' 2 times instead of 1. The reason for it might be the different audio context state after clicking 'stop' in chrome and 
safari / firefox. 


Any feedback appreciated :)

You can preview the website here: https://determined-boyd-621ace.netlify.com/

Enjoy!