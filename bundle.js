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
!(function webpackMissingModule() { var e = new Error("Cannot find module \"./translation\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
!(function webpackMissingModule() { var e = new Error("Cannot find module \"./sound\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
!(function webpackMissingModule() { var e = new Error("Cannot find module \"./guide\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());




!(function webpackMissingModule() { var e = new Error("Cannot find module \"./guide\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())()
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
    addMessageNode(foreignUserMessageAreaNode, !(function webpackMissingModule() { var e = new Error("Cannot find module \"./translation\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(ALL_MESSAGES[id]));
  } else {
    const newForeignUserTextNode = makeMessageArea(id);
    addMessageNode(newForeignUserTextNode, !(function webpackMissingModule() { var e = new Error("Cannot find module \"./translation\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(ALL_MESSAGES[id]));
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
    !(function webpackMissingModule() { var e = new Error("Cannot find module \"./sound\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())()
    lastDownTime = (new Date()).getTime();
    insertMessage([!(function webpackMissingModule() { var e = new Error("Cannot find module \"./translation\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), lastDownTime - lastUpTime], userId)
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    !(function webpackMissingModule() { var e = new Error("Cannot find module \"./sound\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())()
    lastUpTime = (new Date()).getTime();
    const pressDuration = lastUpTime - lastDownTime;
    insertMessage([!(function webpackMissingModule() { var e = new Error("Cannot find module \"./translation\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), pressDuration], userId)
    lastDownTime = null;
    addMessageNode(myMessageArea, !(function webpackMissingModule() { var e = new Error("Cannot find module \"./translation\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(ALL_MESSAGES[userId]))
    myMessageArea.querySelector(".message").innerHTML = !(function webpackMissingModule() { var e = new Error("Cannot find module \"./translation\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(ALL_MESSAGES[userId])
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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map