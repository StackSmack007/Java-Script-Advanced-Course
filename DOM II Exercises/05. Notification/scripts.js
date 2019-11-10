function notify(message) {
    let targetContainer = document.getElementById("notification");
    targetContainer.innerHTML = message;
    targetContainer.style.display = "block";

    const hide = function () {
        targetContainer.innerHTML = "";
        targetContainer.style.display = "none";
    };

    let func = setTimeout(hide, 2000);
}