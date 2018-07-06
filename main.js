import { morseEnglishDictionary, englishMorseDictionary, parseDurations, DIT, ON, OFF } from "./src/translation"

// constants






const userId = Math.floor((Math.random() * 1000000))

const ALL_MESSAGES = {
  [userId]: [],
}

const receiveMessage = (message, id) => {
  if (!ALL_MESSAGES[id]) ALL_MESSAGES[id] = [];
  ALL_MESSAGES[id].push(message);
};

const updateMessage = id => {
  const foreignUserMessageAreaNode = document.getElementById(id);
  if (foreignUserMessageAreaNode) {
    addMessageNode(foreignUserMessageAreaNode, parseDurations(ALL_MESSAGES[id]));
  } else {
    const newForeignUserTextNode = makeMessageArea(id);
    addMessageNode(newForeignUserTextNode, parseDurations(ALL_MESSAGES[id]));
  }
};

const insertMessage = message => {
  ALL_MESSAGES[userId].push(message);
  socket.emit("morse message", message, userId);
};


// socket shit
const socket = io();
socket.on("morse message", (message, id) => {
  console.log("foreign message", userId !== id)
  if (userId !== id) {
    receiveMessage(message, id);
    updateMessage(id);
  }
});


// dom interaction

let lastDownTime = null
let lastUpTime = (new Date()).getTime()

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !lastDownTime) {
    playSound()
    lastDownTime = (new Date()).getTime();
    insertMessage([OFF, lastDownTime - lastUpTime], userId)
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    stopSound()
    lastUpTime = (new Date()).getTime();
    const pressDuration = lastUpTime - lastDownTime;
    insertMessage([ON, pressDuration], userId)
    lastDownTime = null;
    addMessageNode(myMessageArea, parseDurations(ALL_MESSAGES[userId]))
    myMessageArea.querySelector(".message").innerHTML = parseDurations(ALL_MESSAGES[userId])
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

const addMessageNode = (messageArea, message) => {
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
