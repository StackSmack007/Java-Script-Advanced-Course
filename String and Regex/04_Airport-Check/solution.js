/*jslint es6*/
"use strict";
function solve() {
  const validateExisting = x => {
    if (x === null) {
      throw Error("unfound HTML element");
    }
    return x;
  };

  const extractData = function(str, patterns) {
    return Object.keys(patterns).reduce((acc, x) => {
      let newData = str.match(patterns[x]);
      if (newData !== null) {
        acc[x] = newData[0];
      }
      return acc;
    }, {});
  };

  const replaceAll = (str, target, content) =>
    str.replace(new RegExp(`${target}`, "g"), content);

  let inputArr = validateExisting(
    document.getElementById("string")
  ).value.split(",");
  let requirement = inputArr.pop().trim();
  let data = inputArr.join(",");

  let outputDiv = validateExisting(document.getElementById("result"));

  let patterns = {
    names: /(?<= )[A-Z][A-Za-z]*-[A-Z]([A-Za-z]+|(\.-[A-Z][A-Za-z]*))*(?= )/,
    number: /(?<= )[A-Z]{1,3}\d{1,5}(?= )/,
    company: /(?<=- )[A-Z][a-zA-Z]*\*[A-Z][a-zA-Z]*(?= )/,
    airport: /(?<= )[A-Z]{3}\/[A-Z]{3}(?= )/
  };

  let info = extractData(data, patterns);
  const getInfo = (type, info) => {
    let printTemplates = {
      name: () =>
        `Mr/Ms, ${replaceAll(info.names, "-", " ")}, have a nice flight!`,
      flight: () => {
        let ports = info.airport.split("/").map(x => x.trim());
        return `Your flight number ${info.number} is from ${ports[0]} to ${ports[1]}.`;
      },
      company: () =>
        `Have a nice flight with ${info.company.replace("*", " ")}.`,
      all: () => {
        let ports = info.airport.split("/").map(x => x.trim());
        return `Mr/Ms, ${replaceAll(
          info.names,
          "-",
          " "
        )}, your flight number ${info.number} is from ${ports[0]} to ${
          ports[1]
        }. Have a nice flight with ${info.company.replace("*", " ")}.`;
      }
    };
    return printTemplates[type];
  };
  outputDiv.innerHTML = getInfo(requirement, info)();
}
