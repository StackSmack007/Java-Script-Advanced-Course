function subtract() {
    const validateObjContent = obj => {
        let propsNotGiven = Object.keys(obj).filter(x => obj[x] === null).join(", ");
        if (propsNotGiven !== "") {
            throw Error(`not existing htmlElements: ${propsNotGiven}`);
        }
    }

    let elements = {
        firstNumberInput: document.getElementById("firstNumber"),
        secondNumberInput: document.getElementById("secondNumber"),
        resultContainer: document.getElementById("result")
    };

    validateObjContent(elements);

    let inputs = [elements.firstNumberInput, elements.secondNumberInput];

    function subtractFill(firstNumber, secondNumber, container) {
        let num1 = Number(firstNumber.value);
        let num2 = Number(secondNumber.value);
        if (typeof (num1) === null || typeof (num2) === null) { return; }
        container.textContent = num1 - num2;
    }



    let inputHandler = subtractFill.bind(undefined, elements.firstNumberInput, elements.secondNumberInput, elements.resultContainer);

    inputHandler();
    inputs.map(x => x.addEventListener("input", inputHandler))
}