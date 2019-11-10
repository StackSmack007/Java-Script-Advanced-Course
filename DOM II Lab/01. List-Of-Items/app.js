const validateObjContent = obj => {
    let propsNotGiven = Object.keys(obj).filter(x => obj[x] === null).join(", ");
    if (propsNotGiven !== "") {
        throw Error(`not existing htmlElements: ${propsNotGiven}`);
    }
}

const createElement = (tag, content) => {
    let newElement = document.createElement(tag);
    if (typeof (content) === "object") {
        newElement.appendChild(content);
        return newElement;
    }

    newElement.innerHTML = content;
    return newElement;
}

const getElementsData = function () {
    return {
        addBtn: document.querySelector("body > main > input[type=button]:nth-child(3)"),
        textField: document.querySelector("#newItemText"),
        resultContainer: document.getElementById("items")
    };
}

document.addEventListener("DOMContentLoaded", main);
function main() {
    let elementsToWorkWith = getElementsData();
    validateObjContent(elementsToWorkWith);

    const addLi = function () {
        let content = elementsToWorkWith.textField.value;
        elementsToWorkWith.textField.value = "";
        if (content === "") {
            return;
        }

        elementsToWorkWith.resultContainer.appendChild(createElement("li", content));
    }

    elementsToWorkWith.addBtn.addEventListener("click", addLi);
}

const addItem = () => { };

// function addItem() {
//     console.log('TODO:...');
// }