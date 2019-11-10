function deleteByEmail() {
    let inputText = document.querySelector("body > label > input[type=text]").value;
    if (inputText === "") { return; }
    let resultBox = document.getElementById("result");
    let emailElements = document.querySelectorAll("#customers > tbody > tr > td:nth-child(2)");
    let childIndex = Array.from(emailElements).slice().map(x => x.textContent)
        .findIndex(x => x.toLowerCase() === inputText.toLowerCase());

    if (childIndex === -1) {
        resultBox.innerHTML="Not found.";
        return;
    }
    let locatedEmail = emailElements[childIndex];
    locatedEmail.parentNode.parentNode.removeChild(locatedEmail.parentNode);
    resultBox.innerHTML="Deleted.";
}