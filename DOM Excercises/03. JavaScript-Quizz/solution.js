function solve() {
  let totalScore = 0;
  const maxScore = 3;
  const correctAnswerIndexes = [0, 3, 4];
  let allAnswers = document.querySelectorAll("ul > li.quiz-answer");

  for (i = 0; i < allAnswers.length; i++) {
    let answer = allAnswers[i];
    let section = answer.parentNode.parentNode;
    let nextSection = section.nextElementSibling;    //null if none!

    if (correctAnswerIndexes.indexOf(i) !== -1) {
      answer.addEventListener("click", () => totalScore++)
    }

    answer.addEventListener("click", function () {
      section.style.display = "none"
      if (nextSection.id === "results") {
        nextSection.style.display = "block";
        nextSection.querySelectorAll("li.results-inner > h1")[0].textContent = totalScore === maxScore ? "You are recognized as top JavaScript fan!" : `You have ${totalScore} right answers`;
      }
      else { nextSection.style.display = "block"; }
    });
  }
};






// function solve() {
//   let totalScore = 0;
//   let sections = document.getElementsByTagName("section");
//   console.log(sections);
//   [...sections].map((el, ind, arr) => {
//     let options = el.querySelectorAll("ul > li.quiz-answer > div > p");
//     console.log(options);
//     for (let i = 0; i < options.length; i++) {
//       console.log("greda");
//     }
//     // options.map(x => x.addEventListener("onclick", function () {
//     //   console.log("kakvo stava tuka");
//     //   // console.log(x.classList);
//     //   // x.classList.add("hidden");
//     //   // if (ind < arr.length - 1) {
//     //   //   let nextQuestionSection = arr[ind + 1];
//     //   //   nextQuestionSection.classList.remove("hidden");
//     //   // };
//     // }))
//   });
// }