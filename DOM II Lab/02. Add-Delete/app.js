const validateObjContent = obj => {
    let propsNotGiven = Object.keys(obj).filter(x => obj[x] === null).join(", ");
    if (propsNotGiven !== "") {
        throw Error(`not existing htmlElements: ${propsNotGiven}`);
    }
}

const deleteMessage = "[Delete]";
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
        textField: document.querySelector("#newText"),
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

        let anchor = createElement("a", deleteMessage);
        anchor.setAttribute("href", "https://judge.softuni.bg/");
        let li = createElement("li", content + " ");
        li.appendChild(anchor);
        elementsToWorkWith.resultContainer.appendChild(li);
    }

    const deleteTracker = function (evnt) {
        let target = evnt.target;
        if (target.nodeName !== "A" || target.innerHTML != deleteMessage) { return; }
        evnt.preventDefault();
        target.parentNode.parentNode.removeChild(target.parentNode);
    }

    elementsToWorkWith.addBtn.addEventListener("click", addLi);
    elementsToWorkWith.resultContainer.addEventListener("click", deleteTracker);
}

result = () => { };