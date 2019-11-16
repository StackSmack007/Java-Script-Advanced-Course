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
  let namingType = validateExisting(
    document.getElementById("naming-convention")
  ).value.toLowerCase();
  let outputDiv = validateExisting(document.getElementById("result"));

  let convertor = {
    "pascal case": x =>
      x
        .toLowerCase()
        .split(" ")
        .filter(x => x !== "")
        .map(x => x[0].toUpperCase() + x.substring(1))
        .join(""),

    "camel case": function(x) {
      let base = this["pascal case"](x);
      return base[0].toLowerCase() + base.substring(1);
    }
  };
  let result = "Error!";
  if (convertor.hasOwnProperty(namingType)) {
    result = convertor[namingType](text);
  }

  outputDiv.innerHTML = result;
}