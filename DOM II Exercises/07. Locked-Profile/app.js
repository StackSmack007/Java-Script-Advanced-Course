function lockedProfile() {
    let container = document.getElementById("main");
    if (container === null) {
        throw Error("missing Container!");
    }

    const hideReveal = function (evnt) {
        const target = evnt.target;
        if (target.nodeName !== "BUTTON") { return; }
        if (!target.parentNode.children[4].checked) { return; }//unlock not selected!
        let buttonPreviousText = target.innerHTML;

        target.previousElementSibling.style.display = buttonPreviousText === "Show more" ? "block" : "none";
        target.innerHTML = buttonPreviousText === "Show more" ? "Hide it" : "Show more";
    };

    container.addEventListener("click", hideReveal);
}