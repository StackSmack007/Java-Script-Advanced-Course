/*jslint es6*/
"use strict";
function solve() {
  const validateExisting = x => {
    if (x === null) {
      throw Error("unfound HTML element");
    }
    return x;
  };

  let afterWord = validateExisting(document.getElementById("word")).value;
  let textArr = JSON.parse(
    validateExisting(document.getElementById("text")).value
  );
  let resultSpan = validateExisting(document.getElementById("result"));

  const beforeWord = textArr[0].split(" ")[2];

  let pattern = new RegExp(beforeWord, "gi");
  textArr.map(x => {
    let p = document.createElement("p");
    p.innerHTML = x.replace(pattern, afterWord);
    resultSpan.appendChild(p);
  });
}
