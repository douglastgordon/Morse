const morseEnglishDictionary = {
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
};

export const englishMorseDictionary = (() => {
  return Object.entries(morseEnglishDictionary).reduce((acc, entry) => {
    const [morseCharacter, englishCharacter] = entry;
    return Object.assign({}, acc, {[englishCharacter]: morseCharacter});
  }, {});
})();

const NO_SPACE = "";
const SINGLE_SPACE = " ";
const DOUBLE_SPACE = "  ";
export const DIT = ".";
const DAH = "-";
const TIME_UNIT = 250; //ms
const TOLERANCE = 1.2; //20%
export const ON = "ON";
export const OFF = "OFF";

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

const parseDuration = duration => {
  const [type, length] = duration;
  if (type === ON) {
    if (length < TIME_UNIT * TOLERANCE) return DIT;
    return DAH;
  } else if (type === OFF) {
    if (length < TIME_UNIT * TOLERANCE) {
      return NO_SPACE;
    } else if (length < TIME_UNIT * TOLERANCE * 3) {
      return SINGLE_SPACE;
    }
    return DOUBLE_SPACE;
  }
};

export const parseDurations = durations => morseToEnglish(durations.map(parseDuration).join(""));
