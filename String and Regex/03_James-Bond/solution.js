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

  let matchCollection = data.join(" ").match(pattern);
  if (matchCollection === null) {
    return;
  }

  let dictionary = { "!": 1, "%": 2, "#": 3, $: 4 };

  let matches = Array.from(matchCollection)
    .filter(x => /[!%$#A-Z]{8,}/.test(x))
    .reduce((acc, next) => {
      let original = next;
      let decoded = Array.from(next.toLowerCase()).reduce((a, b) => {
        if (dictionary.hasOwnProperty(b)) {
          a += dictionary[b];
        } else {
          a += b;
        }
        return a;
      }, "");
      acc[original] = decoded;
      return acc;
    }, {});

  Object.entries(matches).forEach(([key, value]) => {
    data = data.map(x => x.replace(key, value));
  });

  data.forEach(x => {
    let p = document.createElement("span");
    p.innerHTML = x;
    outputDiv.appendChild(p);
  });
}