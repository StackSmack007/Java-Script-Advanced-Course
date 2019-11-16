"use strict";
/*jslint es6 */
function solve() {
  const validateExisting = x => {
    if (x === null) {
      throw Error("unfound HTML element");
    }
    return x;
  };

  const getMessage = function(key, string) {
    let startIndex = string.indexOf(key) + key.length;
    let endIndex = string.lastIndexOf(key);
    return string.slice(startIndex, endIndex);
  };

  const getCoordinate = function(str, wholePart = 2, decimalPart = 6) {
    let data = str
      .match(/[\d\,]+/gim) //takes only digits and , removes everything else
      .join("")
      .split(","); //separates two parts of number by ","
    return `${data[0].substr(0, wholePart)}.${data[1].substr(0, decimalPart)}`;
  };

  const getNorthEast = str => {
    let pattern = /(north|east).*?\d\d[^,]*,[^\d]*\d{6}/gim; //identifies only outer (fully equiped) group if nested.
    let data = Array.from(str.toLowerCase().match(pattern)).reverse(); //reverse so first is last when searching for them.
    return [
      getCoordinate(data.find(x => x.toLowerCase().startsWith("north"))),
      getCoordinate(data.find(x => x.toLowerCase().startsWith("east")))
    ];
  };

  const createElement = function(tag, content) {
    let element = document.createElement(tag);
    element.innerHTML = content;
    return element;
  };

  let input = validateExisting(document.getElementById("string")).value;
  let text = validateExisting(document.getElementById("text")).value;
  if (input === "" || text === "") {
    return;
  }

  let outputSpan = validateExisting(document.getElementById("result"));
  let message = getMessage(input, text);
  let workString = text.replace(input + message + input, "");

  let coordinates = getNorthEast(workString);
  outputSpan.appendChild(createElement("p", `${coordinates[0]} N`));
  outputSpan.appendChild(createElement("p", `${coordinates[1]} E`));
  outputSpan.appendChild(createElement("p", "Message: " + message));
}