function growingWord() {
  const colors = ["blue", "green", "red"];
  let wordFound = document.querySelector("#exercise p");
  if (wordFound === null) {
    throw new Error("word in paragraph Not found");
  }

  let wordStyle = wordFound.style;

  let nextColorIndex = (colors.indexOf(wordStyle.color) + 1) % colors.length;
  wordStyle.color = colors[nextColorIndex];
  if (wordStyle.fontSize !== "") {
    let numvalue = wordStyle.fontSize.match(/\d+/);
    wordStyle.fontSize = wordStyle.fontSize.replace(numvalue, +numvalue * 2);
  }
  else {
    wordFound.style.fontSize = "2px";
  }
}