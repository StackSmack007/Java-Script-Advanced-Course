/*jslint es6*/
"use strict";
function solve() {
  const validateExisting = x => {
    if (x === null) {
      throw Error("unfound HTML element");
    }
    return x;
  };

  let inputValue = validateExisting(document.getElementById("array")).value;
  let outputDiv = validateExisting(document.getElementById("result"));

  let data = JSON.parse(inputValue);
  let key = data.shift();

  let pattern = new RegExp(`(?<=(^| )${key} +)[!%$#A-Z]{8,}(?=[. ,]|$)`, `gmi`);
  let dictionary = { "!": 1, "%": 2, "#": 3, $: 4 };
  data = data.map(x => {
    let _x = x; //_x will remain unchanged so exec can move on it!
    let match = pattern.exec(_x);
    while (match !== null) {
      if (match[0].toUpperCase() === match[0]) {
        let alteredMatch = match[0]
          .toLowerCase()
          .split("")
          .map(char =>
            dictionary.hasOwnProperty(char) ? dictionary[char] : char
          )
          .join("");
        x = x.replace(match[0], alteredMatch);
      }

      match = pattern.exec(_x);
    }
    return x;
  });

  data.forEach(x => {
    let p = document.createElement("span");
    p.innerHTML = x;
    outputDiv.appendChild(p);
  });
}
