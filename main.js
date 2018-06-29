// constants

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
const TOLERANCE = 1.2 //20%
const userId = Math.floor((Math.random() * 1000000))

// socket shit
const socket = io();
socket.on("morse message", (msg, id) => {
  console.log("foreign message", userId !== id)
  if (userId !== id) {
    const foreignUserMessageAreaNode = document.getElementById(id);
    if (foreignUserMessageAreaNode) {
      addMessage(foreignUserMessageAreaNode, parseDurations(msg));
    } else {
      const newForeignUserTextNode = makeMessageArea(id);
      addMessage(newForeignUserTextNode, parseDurations(msg));
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

    addMessage(myMessageArea, parseDurations(durations))
    myMessageArea.querySelector(".message").innerHTML = parseDurations(durations)
  }
});

const makeMessageArea = (id, name="") => {
  const messageArea = document.createElement("article");
  messageArea.id = id;

  const nameNode= document.createElement("p");
  nameNode.classList.add("name");
  nameNode.innerHTML = name || `user ${id}`;

  const message = document.createElement("p");
  message.classList.add("message");

  messageArea.appendChild(nameNode);
  messageArea.appendChild(message);
  main.appendChild(messageArea);
  return messageArea;
};

const addMessage = (messageArea, message) => {
  messageArea.querySelector(".message").innerHTML = message;
};

// guide

const makeGuide = () => {
  const guideList = document.getElementById("guide-list");

  Object.entries(englishMorseDictionary).forEach(entry => {
    const [englishChar, morse] = entry;
    if (!englishChar.match(/[a-z]/i)) return;
    const listItemNode = document.createElement("li");
    const englishCharNode = document.createElement("p");
    englishCharNode.classList.add("english-char");
    englishCharNode.innerHTML = englishChar;
    listItemNode.appendChild(englishCharNode);
    const morseNode = document.createElement("p");
    morseNode.classList.add("morse");

    morse.split("").forEach(ditDah => {
      const ditDahNode = document.createElement("div");
      ditDahNode.classList.add(ditDah === DIT ? "dit" : "dah");
      morseNode.appendChild(ditDahNode);
    });
    listItemNode.appendChild(morseNode);
    guideList.appendChild(listItemNode);
  })
};

makeGuide();

// parse business

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

const parseDurations = durations => morseToEnglish(durations.map(parseDuration).join(""));

const main = document.getElementById("main");
const myMessageArea = makeMessageArea(userId, "you");

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
