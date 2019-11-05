function solve() {
    let tableBodyElement = document.querySelector("#exercise > table > tbody");
    let resultParagraph = document.querySelector("#check > p");
    let clearBtn = document.querySelector("#exercise > table > tfoot > tr > td > button:nth-child(2)");
    let checkBtn = document.querySelector("#exercise > table > tfoot > tr > td > button:nth-child(1)");

    clearBtn.addEventListener("click", () => {
        Array.from(tableBodyElement.getElementsByTagName("input")).map(x => { x.value = "" });
        tableBodyElement.parentNode.style.border = "";
        resultParagraph.innerHTML = "";
    });

    const isValidSolve = nums => {

        if (nums.slice().filter((v, i, a) => a.indexOf(v) === i).length < nums.length) {
            return false;
        }

        let matrix3x3 = nums.slice().reduce((acc, next, index) => {
            let colIndex = Math.floor(index / 3);
            let rowIndex = index % 3;
            if (rowIndex === 0) {
                acc.push([]);
            }
            acc[colIndex][rowIndex] = next;
            return acc;
        }, []);

        for (let i = 0; i < matrix3x3.length; i++) {
            let rowUniques = matrix3x3[i].filter((v, i, a) => a.indexOf(v) === i).length;
            let colUniques = matrix3x3.map(x => x[i]).filter((v, i, a) => a.indexOf(v) === i).length;
            if (rowUniques !== colUniques || rowUniques !== matrix3x3.length) { return false }
        }

        return true;
    }

    checkBtn.addEventListener("click", function () {
        let numbers = Array.from(tableBodyElement.getElementsByTagName("input")).map(x => +x.value).filter(x => x > 0 && x < 10);
        let isCorrect = numbers.length === 9 && isValidSolve(numbers);
        if (!isCorrect) {
            resultParagraph.innerHTML = "NOP! You are not done yet...";
            resultParagraph.style.color = "red";
            tableBodyElement.parentNode.style.border = "2px solid red";
            return;
        }

        resultParagraph.innerHTML = 'You solve it! Congratulations!';
        resultParagraph.style.color = "green";
        tableBodyElement.parentNode.style.border = "2px solid green";
    });
}