function solve() {
    const capitalise = (str) => str[0].toUpperCase() + str.substring(1).toLowerCase();
    let inputField = document.querySelector("input[type=text]");
    let submitBtn = document.querySelector("button[type=button]");
    let targetContainers = Array.from(document.querySelectorAll("ol[type=A] > li"));

    submitBtn.addEventListener("click", function () {
        let content = capitalise(inputField.value);
        if (content === "") { return; }

        let letterIndex = content.charCodeAt(0) - 65;
        targetContainers[letterIndex].innerHTML +=
            targetContainers[letterIndex].innerHTML === "" ? content : ", " + content;

        inputField.value = "";
    });
}