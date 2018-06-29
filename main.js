// constants

const morseEnglishDictionary = {
   "-----":"0",
   ".----":"1",
   "..---":"2",
   "...--":"3",
   "....-":"4",
   ".....":"5",
   "-....":"6",
   "--...":"7",
   "---..":"8",
   "----.":"9",
   ".-":"a",
   "-...":"b",
   "-.-.":"c",
   "-..":"d",
   ".":"e",
   "..-.":"f",
   "--.":"g",
   "....":"h",
   "..":"i",
   ".---":"j",
   "-.-":"k",
   ".-..":"l",
   "--":"m",
   "-.":"n",
   "---":"o",
   ".--.":"p",
   "--.-":"q",
   ".-.":"r",
   "...":"s",
   "-":"t",
   "..-":"u",
   "...-":"v",
   ".--":"w",
   "-..-":"x",
   "-.--":"y",
   "--..":"z",
   "-.-.--":"!",
   ".-.-.-":".",
   "--..--":",",
   "..--..":"?",
};

const englishMorseDictionary = (() => {
  return Object.entries(morseEnglishDictionary).reduce((acc, entry) => {
    const [morseCharacter, englishCharacter] = entry;
    return Object.assign({}, acc, {[englishCharacter]: morseCharacter});
  }, {});
})();

const NO_SPACE = "";
const SINGLE_SPACE = " ";
const DOUBLE_SPACE = "  ";
const DIT = ".";
const DAH = "-";

const ON = "ON";
const OFF = "OFF";

const TIME_UNIT = 250 //ms
const userId = Math.floor((Math.random() * 1000000))

// socket shit
const socket = io();
socket.on("morse message", (msg, id) => {
  console.log("foreign message", userId !== id)
  if (userId !== id) {
    const foreignUserTextNode = document.getElementById(id);
    if (foreignUserTextNode) {
      foreignUserTextNode.innerHTML = parseDurations(msg);
    } else {
      const newForeignUserTextNode = document.createElement("p");
      newForeignUserTextNode.id = id;
      newForeignUserTextNode.innerHTML = parseDurations(msg);
      main.appendChild(newForeignUserTextNode);
    }
  }
});

// meat and potatoes
const morseToEnglish = morseString => {
  const words = morseString.split(DOUBLE_SPACE);
  return words.map(word => {
    const characters = word.split(SINGLE_SPACE);
    return characters.map(character => morseEnglishDictionary[character]).join(NO_SPACE);
  }).join(SINGLE_SPACE);
};

const englishToMorse = englishString => {
  const words = englishString.split(SINGLE_SPACE);
  return words.map(word => {
    const characters = word.split(NO_SPACE);
    return characters.map(character => {
      return englishMorseDictionary[character.toLowerCase()]
    }).join(SINGLE_SPACE);
  }).join(DOUBLE_SPACE);
};

// dom interaction

const durations = []
let lastDownTime = null
let lastUpTime = (new Date()).getTime()

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !lastDownTime) {
    playSound()
    lastDownTime = (new Date()).getTime();
    durations.push([OFF, lastDownTime - lastUpTime])
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    stopSound()
    lastUpTime = (new Date()).getTime();
    const pressDuration = lastUpTime - lastDownTime;
    durations.push([ON, pressDuration]);
    lastDownTime = null;
    socket.emit("morse message", durations, userId)
    textNode.innerHTML = parseDurations(durations)
  }
});

const parseDuration = duration => {
  const [type, length] = duration;
  if (type === ON) {
    if (length < TIME_UNIT) return DIT;
    return DAH;
  } else if (type === OFF) {
    if (length < TIME_UNIT) {
      return NO_SPACE;
    } else if (length < TIME_UNIT * 3) {
      return SINGLE_SPACE;
    }
    return DOUBLE_SPACE;
  }
};

const parseDurations = durations => morseToEnglish(durations.map(parseDuration).join(""));

const main = document.getElementById("main");
const textNode = document.createElement("p");
textNode.id = userId;
main.appendChild(textNode);

// sound
const playSound = () => {
  gain.gain.exponentialRampToValueAtTime(1, audioContext.currentTime + 0.02)
}
const stopSound = () => {
  gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.04)
}

const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
const gain = audioContext.createGain();
oscillator.connect(gain);
gain.connect(audioContext.destination);
oscillator.type = "triangle";
oscillator.start(0)
stopSound()



// tests

const morse = ".... .- .-.. .--. -·-·--  -- --- .-. ... .  -.-. --- -.. .  .. ...  -.. .-. .. ...- .. -. --.  -- .  -. ..- - ... -·-·--";
const english = "Halp! Morse code is driving me nuts!";

const testMorseToEnglish = () => {
  const functionWorks = morseToEnglish(morse) === english.toLowerCase();
  console.log("morseToEnglish passes test cases:", functionWorks);
  return functionWorks;
};

const testEnglishToMorse = () => {
  const functionWorks = englishToMorse(english) === morse;
  console.log("testEnglishToMorse passes test cases:", functionWorks);
  return functionWorks;
};

testMorseToEnglish();
testEnglishToMorse();
