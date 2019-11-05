/*jslint es6 */
"use strict";
function solve() {
   let typing = document.getElementById("typing2");
   typing.style.display = "none";

   let submitBtn = document.querySelector("#send");
   let targetContainer = document.getElementById("chat_messages");
   let contentElement = document.getElementById("chat_input");

   if (submitBtn === null || targetContainer === null || contentElement === null) {
      throw new Error("element Not found");
   }

   submitBtn.addEventListener("click", function () {
      let newMessageElement = document.createElement("div");
      newMessageElement.classList.add("message", "my-message");
      newMessageElement.textContent = contentElement.value;
      targetContainer.appendChild(newMessageElement);
      contentElement.value = "";
   });

   contentElement.addEventListener("keypress", function (evt) {
      if (typing !== null) {
         typing.style.display = "block";
         let milisecondsToWait = 1500;
         setTimeout(function () {
            typing.style.display = "none";
         }, milisecondsToWait);
      }
   });
}