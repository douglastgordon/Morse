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
   "-·-·--":"!",
   "·-·-·-":".",
   "--··--":","
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
// const pushTime = event => {
//   if (event.code === "Space") timing.push((new Date()).getTime());
//   console.log(timing)
// };

const durations = []
let lastDownTime = null
let lastUpTime = (new Date()).getTime()

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !lastDownTime) {
    lastDownTime = (new Date()).getTime();
    durations.push([OFF, lastDownTime - lastUpTime])
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    lastUpTime = (new Date()).getTime();
    const pressDuration = lastUpTime - lastDownTime;
    durations.push([ON, pressDuration]);
    lastDownTime = null;
    console.log(durations)
    console.log(parseDurations(durations))
  }
});

const parseDuration = duration => {
  const [type, length] = duration;
  if (type === ON) {
    if (length < 160) return DIT;
    return DAH;
  } else if (type === OFF) {
    if (length < 200) {
      return NO_SPACE;
    } else if (length < 500) {
      return SINGLE_SPACE;
    }
    return DOUBLE_SPACE;
  }
};

const parseDurations = durations => durations.map(parseDuration).join("");



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
