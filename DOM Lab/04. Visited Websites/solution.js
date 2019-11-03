function solve() {
  const visitedInfo = (times) => `visited ${times} times`;
  let linkElements = document.querySelectorAll("div.link-1 > a");
  for (let link of linkElements) {
    link.addEventListener("click", function () {
      paragraphWithInfo = link.parentNode.querySelector("p");
      let visitedCount = Number(paragraphWithInfo.innerText.match(/\d+/));
      paragraphWithInfo.innerText = visitedInfo(visitedCount+1);
    })
  }
}