/*jslint es6*/
"use strict";
function solve() {
  const validateExisting = x => {
    if (x === null) {
      throw Error("unfound HTML element");
    }
    return x;
  };

  const extractInfo = (el, pattern) => {
    let match = el.match(pattern);
    if (match === null) {
      return ["Invalid data", "- - -"];
    }
    return [
      `Name: ${match[1]}`,
      `Phone Number: ${match[2]}`,
      `Email: ${match[5]}`,
      `- - -`
    ];
  };

  const pattern = /([A-Z][a-z]* [A-Z][a-z]*) (\+359( |-)\d(\3\d{3}){2}) ([a-z\d]+@[a-z]+\.[a-z]{2,3})/;
  let data = JSON.parse(validateExisting(document.getElementById("arr")).value);
  let resultSpan = validateExisting(document.getElementById("result"));

  data.forEach(x => {
    extractInfo(x, pattern).map(row => {
      let p = document.createElement("p");
      p.innerHTML = row;
      resultSpan.appendChild(p);
    });
  });
}