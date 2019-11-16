/*jslint es6*/
"use strict";
function solve() {
  const validateExisting = x => {
    if (x === null) {
      throw Error("unfound HTML element");
    }
    return x;
  };

  let text = validateExisting(document.getElementById("text")).value;
  let maxLength = Number(
    validateExisting(document.getElementById("number")).value
  );
  let resultSpan = validateExisting(document.getElementById("result"));
  let symbolsNeeded =
    text.length % maxLength === 0 ? 0 : maxLength - (text.length % maxLength);
  const pattern = new RegExp(`.{${maxLength}}`, "g");

  let result = (text + text.substr(0, symbolsNeeded)).match(pattern).join(" ");
  resultSpan.innerHTML = result;
}
