import { morseToEnglish, englishToMorse } from "src/translation";

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
