/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/translation */ "./src/translation.js");
/* harmony import */ var _src_sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/sound */ "./src/sound.js");
/* harmony import */ var _src_guide__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/guide */ "./src/guide.js");




Object(_src_guide__WEBPACK_IMPORTED_MODULE_2__["default"])()
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
    addMessageNode(foreignUserMessageAreaNode, Object(_src_translation__WEBPACK_IMPORTED_MODULE_0__["parseDurations"])(ALL_MESSAGES[id]));
  } else {
    const newForeignUserTextNode = makeMessageArea(id);
    addMessageNode(newForeignUserTextNode, Object(_src_translation__WEBPACK_IMPORTED_MODULE_0__["parseDurations"])(ALL_MESSAGES[id]));
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
    Object(_src_sound__WEBPACK_IMPORTED_MODULE_1__["playSound"])()
    lastDownTime = (new Date()).getTime();
    insertMessage([_src_translation__WEBPACK_IMPORTED_MODULE_0__["OFF"], lastDownTime - lastUpTime], userId)
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    Object(_src_sound__WEBPACK_IMPORTED_MODULE_1__["stopSound"])()
    lastUpTime = (new Date()).getTime();
    const pressDuration = lastUpTime - lastDownTime;
    insertMessage([_src_translation__WEBPACK_IMPORTED_MODULE_0__["ON"], pressDuration], userId)
    lastDownTime = null;
    addMessageNode(myMessageArea, Object(_src_translation__WEBPACK_IMPORTED_MODULE_0__["parseDurations"])(ALL_MESSAGES[userId]))
    myMessageArea.querySelector(".message").innerHTML = Object(_src_translation__WEBPACK_IMPORTED_MODULE_0__["parseDurations"])(ALL_MESSAGES[userId])
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


/***/ }),

/***/ "./src/guide.js":
/*!**********************!*\
  !*** ./src/guide.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./translation */ "./src/translation.js");


const makeGuide = () => {
  const guideList = document.getElementById("guide-list");

  Object.entries(_translation__WEBPACK_IMPORTED_MODULE_0__["englishMorseDictionary"]).forEach(entry => {
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
      ditDahNode.classList.add(ditDah === _translation__WEBPACK_IMPORTED_MODULE_0__["DIT"] ? "dit" : "dah");
      morseNode.appendChild(ditDahNode);
    });
    listItemNode.appendChild(morseNode);
    guideList.appendChild(listItemNode);
  })
};

/* harmony default export */ __webpack_exports__["default"] = (makeGuide);


/***/ }),

/***/ "./src/sound.js":
/*!**********************!*\
  !*** ./src/sound.js ***!
  \**********************/
/*! exports provided: playSound, stopSound */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playSound", function() { return playSound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopSound", function() { return stopSound; });
const playSound = () => {
  gain.gain.exponentialRampToValueAtTime(1, audioContext.currentTime + 0.02);
}

const stopSound = () => {
  gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.04);
}

const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
const gain = audioContext.createGain();
oscillator.connect(gain);
gain.connect(audioContext.destination);
oscillator.type = "triangle";
oscillator.start(0);
stopSound();


/***/ }),

/***/ "./src/translation.js":
/*!****************************!*\
  !*** ./src/translation.js ***!
  \****************************/
/*! exports provided: englishMorseDictionary, DIT, ON, OFF, morseToEnglish, englishToMorse, parseDurations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "englishMorseDictionary", function() { return englishMorseDictionary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIT", function() { return DIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ON", function() { return ON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFF", function() { return OFF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "morseToEnglish", function() { return morseToEnglish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "englishToMorse", function() { return englishToMorse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseDurations", function() { return parseDurations; });
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
const TIME_UNIT = 250; //ms
const TOLERANCE = 1.2; //20%
const ON = "ON";
const OFF = "OFF";

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

const parseDurations = durations => morseToEnglish(durations.map(parseDuration).join(""));


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map