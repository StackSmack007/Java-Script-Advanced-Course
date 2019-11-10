function create(words) {
   let targetContainer = document.getElementById("content");
   if (targetContainer === null) {
      throw Error("div with id='content' not found!");
   }

   words.slice().map(x => {
      let elementDiv = document.createElement("div");
      let elementP = document.createElement("p");
      elementDiv.appendChild(elementP);
      elementP.innerHTML = x;
      elementP.style.display = "none";
      targetContainer.appendChild(elementDiv)
   });

   targetContainer.addEventListener("click", function (evnt) {
      if (evnt.target.nodeName !== "DIV") { return; }
      evnt.target.childNodes[0].style.display = evnt.target.childNodes[0].style.display === "none"
         ? "block" : "none";
   })
}