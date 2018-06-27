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

const SINGLE_SPACE = " ";
const DOUBLE_SPACE = "  ";

const morseToEnglish = morseString => {
  const words = morseString.split(DOUBLE_SPACE);
  return words.map(word => {
    const characters = word.split(SINGLE_SPACE);
    return characters.map(character => morseEnglishDictionary[character]).join("");
  }).join(SINGLE_SPACE);
};

const englishToMorse = englishString => {
  const words = englishString.split(SINGLE_SPACE);
  return words.map(word => {
    const characters = word.split("");
    return characters.map(character => {
      return englishMorseDictionary[character.toLowerCase()]
    }).join(SINGLE_SPACE);
  }).join(DOUBLE_SPACE);
};


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
