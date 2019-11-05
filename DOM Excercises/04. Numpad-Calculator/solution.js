function solve() {
    let topContent = "";
    const refreshValue = (value, element) => element.textContent = value;
    const operatorLibrary = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
    }

    const calculateFromString = (str) => {
        let result = str.split(" ").reduce((acc, next, index, arr) => {
            if (operatorLibrary.hasOwnProperty(next)) {
                acc = operatorLibrary[next](acc, +arr[index + 1]);
            }
            else if (acc === 0) {
                acc = +next
            }

            return acc;
        }, 0)

        return result;
    }

    let elements = {
        expressionOutput: document.getElementById("expressionOutput"),
        resultOutput: document.getElementById("resultOutput"),
        clearBtn: document.querySelector("button.clear[type=button]"),
        equal: [...document.querySelectorAll("#calculator > div.keys button")].filter(x => x.value === "=")[0],
        operatorsAndDigits: [...document.querySelectorAll("#calculator > div.keys button")].filter(x => x.value.match(/[^=]/)),
    }

    for (let i = 0; i < elements.operatorsAndDigits.length; i++) {
        let symbol = elements.operatorsAndDigits[i];
        symbol.addEventListener("click", function () {
            let newPatch = operatorLibrary.hasOwnProperty(this.value) ? ` ${this.value} ` : this.value;
            //this checks if you input 432.532.12 dot do not work simply if more than once used!
            if (newPatch === "." && topContent.split(" ").pop().includes(".")) {
                return;
            }

            topContent += newPatch;
            refreshValue(topContent, elements.expressionOutput);
        });
    }

    elements.clearBtn.addEventListener("click", function () {
        elements.expressionOutput.textContent = "";
        elements.resultOutput.textContent = "";
        topContent = "";
    })

    elements.equal.addEventListener("click", function () {
        let result = "NaN";
        if (!topContent.endsWith(" ")) {
            result = calculateFromString(topContent);
        }

        refreshValue(result, elements.resultOutput);
    })
}