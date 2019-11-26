function solve() {
  const prices = {
    "JS Fundamentals": 170,
    "JS Advanced": 180,
    "JS Applications": 190,
    "JS Web": 490
  };

  const modulePrice = Array.from(Object.values(prices)).reduce(
    (a, b) => a + b,
    0
  );

  let signMeUpBtn = document.querySelector(
    "#availableCourses > div.courseFoot > button"
  );

  let coursesEl = Array.from(
    document.querySelectorAll("#availableCourses > div.courseBody > ul >li")
  );

  let educationForms = Array.from(
    document.querySelectorAll("#educationForm > input")
  );

  let resultUlEl = document.querySelector("#myCourses > div.courseBody > ul");
  let costPEl = document.querySelector("#myCourses > div.courseFoot > p");
  const formPrice = (courses, educForm) => {
    let price = courses.reduce((acc, next) => acc + prices[next], 0);
    let discounts = 0;
    if (
      courses.includes("JS Advanced") &&
      courses.includes("JS Fundamentals")
    ) {
      discounts += prices["JS Advanced"] * 0.1;
      if (courses.includes("JS Applications")) {
        discounts += 0.06 * modulePrice;
      }
    }

    if (educForm === "online") {
      discounts += 0.06 * price;
    }

    return Math.floor(price - discounts);
  };

  signMeUpBtn.addEventListener("click", function() {
    let coursesTaken = coursesEl
      .map(el => {
        let isSelected = el.children[0].checked;
        if (isSelected) {
          return el.children[1].textContent.split(" - ")[0];
        }
        return null;
      })
      .filter(x => x !== null);

    let educForm = educationForms.reduce((acc, b) => {
      if (b.checked) {
        acc = b.value;
      }
      return acc;
    }, "");

    let cost = formPrice(coursesTaken, educForm);
    costPEl.innerText = `Cost: ${cost.toFixed(2)} BGN`;

    coursesTaken.forEach(c => {
      let course = document.createElement("li");
      course.innerText = c;
      resultUlEl.appendChild(course);
    });
  });
}

solve();
