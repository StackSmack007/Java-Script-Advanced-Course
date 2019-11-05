/*jslint es6 */
"use strict";
function solve() {
    let elements = {
        input: document.getElementById("input"),
        sourceChoise: document.getElementById("selectMenuFrom"),
        destinationChoise: document.getElementById("selectMenuTo"),
        convertBtn: document.querySelector("#container > button"),
        resultInput: document.getElementById("result")
    };

    Object.entries(elements).filter(x => x[1] === undefined || x[1] === null)
        .map(x => {
            throw new Error(`${x[0]} not found!`);
        });

    let newOptions = [["Binary", "binary"], ["Hexadecimal", "hexadecimal"]];
    const addOption = function (selectMenu, textContent, value) {
        let newOpt = document.createElement("option");
        newOpt.value = value;
        newOpt.textContent = textContent;
        selectMenu.appendChild(newOpt)
    }

    newOptions.map(x => addOption(elements.destinationChoise, x[0], x[1]));
    newOptions.map(x => addOption(elements.sourceChoise, x[0], x[1]));

    let convertorToDecimal = {
        decimal: x => +x,
        binary: x => parseInt(x, 2),
        hexadecimal: x => parseInt(x, 16),
    }

    let convertorFromDecimal = {
        decimal: x => x,
        binary: x => x.toString(2),
        hexadecimal: x => x.toString(16),
    }

    elements.convertBtn.addEventListener("click", function () {
        let baseValue = elements.input.value;
        if (baseValue === "") {
            console.log("nothing for converting");
            return;
        }

        let sourceChoise = elements.sourceChoise.value;
        let destinationChoise = elements.destinationChoise.value;

        let result = convertorFromDecimal[destinationChoise](convertorToDecimal[sourceChoise](baseValue));
        elements.resultInput.value = result.toUpperCase();
    })
}