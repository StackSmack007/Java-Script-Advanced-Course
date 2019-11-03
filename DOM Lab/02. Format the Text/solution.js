function solve() {
  let source = document.getElementById("input");
  let target = document.getElementById("output");
  if (source === null || target === null) {
    throw new Error("element not found!");
  }
  target.innerHTML = "";

  let contentText = source.textContent.split(". ");
  let lastParagraph;
  while (contentText.length > 0) {
    lastParagraph = document.createElement("p");
    lastParagraph.textContent = contentText.splice(0, 3).join(". ") + ".";
    target.appendChild(lastParagraph);
  }
  lastParagraph.textContent = lastParagraph.textContent.substr(0, lastParagraph.textContent.length - 1);
}