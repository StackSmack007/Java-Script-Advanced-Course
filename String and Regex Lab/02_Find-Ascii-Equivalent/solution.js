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
  let resultSpan = validateExisting(document.getElementById("result"));

  let result = text.split(" ").reduce(
    (acc, next) => {
      if (isNaN(next)) {
        let numRow = document.createElement("p");
        numRow.innerHTML = next
          .split("")
          .map(x => x.charCodeAt(0))
          .join(" ");
        acc.nums.push(numRow);
      } else {
        acc["chars"].innerHTML += String.fromCharCode(+next);
      }
      return acc;
    },
    { nums: [], chars: document.createElement("p") }
  );

  [...result.nums, result.chars]
    .filter(x => x.innerHTML !== "")
    .forEach(x => resultSpan.appendChild(x));
}
