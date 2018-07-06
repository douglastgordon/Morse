import { englishMorseDictionary, DIT } from "src/translation"

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

export default makeGuide;
