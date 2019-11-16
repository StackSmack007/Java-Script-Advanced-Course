"use strict";
/*jslint es6 */
function solve() {
  const validateExisting = x => {
    if (x === null) {
      throw Error("unfound HTML element");
    }
    return x;
  };

  const getSumOfOnes = str => {
    let data = Array.from(str);
    if (data.some(x => x !== "0" && x !== "1")) {
      throw Error("Input contains not allowed symbols!");
    }

    let result = data.filter(x => x === "1").length;
    while (result > 9) {
      result = [...result.toString()].reduce(
        (acc, next) => acc + Number(next),
        0
      );
    }

    return result;
  };

  const getInnerContent = (str, length) => {
    if (str.length / 2 < length) {
      return "";
    }
    return Array.from(str)
      .slice(length, -length)
      .join("");
  };

  const getCharArr = (str, length = 8) => {
    let pattern = new RegExp(`.{1,${length}}`, "g");
    return str.match(pattern).map(x => String.fromCharCode(parseInt(x, 2)));
  };

  const filterResult = str => {
    let pattern = new RegExp(`[A-Za-z\s]`, "g");
    return str.match(pattern).join("");
  };

  let input = validateExisting(document.getElementById("input"));
  let resultSpan = validateExisting(document.getElementById("resultOutput"));

  let sumOfOnes = getSumOfOnes(input.value);
  let innerContent = getInnerContent(input.value, sumOfOnes);

  let result = filterResult(getCharArr(innerContent).join(""));
  resultSpan.innerHTML = result;
}