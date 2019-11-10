function encodeAndDecodeMessages() {
    const encodeString = str => String.fromCharCode(...str.split("").map(x => x.charCodeAt(0) + 1));
    const decodeString = str => String.fromCharCode(...str.split("").map(x => x.charCodeAt(0) - 1));

    let inputContainer = document.querySelector("#main > div:nth-child(1) > textarea");
    let encodeBtn = document.querySelector("#main > div:nth-child(1) > button");
    let outputContainer = document.querySelector("#main > div:nth-child(2) > textarea")
    let decodeBtn = document.querySelector("#main > div:nth-child(2) > button")

    if (inputContainer === null || encodeBtn === null || outputContainer === null || decodeBtn === null) {
        throw Error("Html element is missing!");
    }

    let messageTracker = "";

    function encodeMessage() {
        messageTracker = encodeString(inputContainer.value);
        outputContainer.value = messageTracker;//+= is more meaningfull
        inputContainer.value = "";
    }

    function decodeMessage() {
        outputContainer.value = outputContainer.value.replace(messageTracker, decodeString(messageTracker));
    }

    encodeBtn.addEventListener("click", encodeMessage);
    decodeBtn.addEventListener("click", decodeMessage);
}