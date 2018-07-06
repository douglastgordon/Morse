import { parseDurations, ON, OFF } from "./translation";
import { playSound, stopSound } from "./sound";
import makeGuide from "./guide"

makeGuide()
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

const main = document.getElementById("main");
const myMessageArea = makeMessageArea(userId, "you");
