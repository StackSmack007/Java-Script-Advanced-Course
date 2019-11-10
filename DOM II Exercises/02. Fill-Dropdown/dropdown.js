function addItem() {
    const validateObjContent = obj => {
        let propsNotGiven = Object.keys(obj).filter(x => obj[x] === null).join(", ");
        if (propsNotGiven !== "") {
            throw Error(`not existing htmlElements: ${propsNotGiven}`);
        }
    }

    const createElement = function (tagName, content) {
        let newEl = document.createElement(tagName);
        if (typeof (content) === "object") {
            newEl.appendChild(content);
            return newEl;
        }
        newEl.innerHTML = content;
        return newEl;
    }

    let elements = {
        inputText: document.getElementById("newItemText"),
        inputValue: document.getElementById("newItemValue"),
        targetContainer: document.getElementById("menu")
    }

    validateObjContent(elements);
    let content = elements.inputText.value;
    let value = elements.inputValue.value;
    elements.inputText.value = "";
    elements.inputValue.value = "";
    if (content === "" || value === "") { return; }
    let opt = createElement("option", content);
    opt.setAttribute("value", value);
    elements.targetContainer.appendChild(opt);
}