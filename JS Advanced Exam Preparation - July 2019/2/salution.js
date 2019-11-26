class Vacation {
  constructor(organizer, destination, budget) {
    this.organizer = organizer;
    this.destination = destination;
    this.budget = budget;
    this.kids = {};
  }

  registerChild(name, grade, budget) {
    if (this.budget > budget) {
      return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
    }
    if (!this.kids.hasOwnProperty(grade)) {
      this.kids[grade] = [];
    }
    if (this.kids[grade].some(x => x.startsWith(name + "-"))) {
      return `${name} is already in the list for this ${this.destination} vacation.`;
    }
    this.kids[grade].push(`${name}-${budget}`);
    return this.kids[grade];
  }

  removeChild(name, grade) {
    let foundKid = (this.kids[grade] || []).find(x => x.startsWith(name + "-"));
    if (!foundKid) {
      return `We couldn't find ${name} in ${grade} grade.`;
    }
    this.kids[grade] = this.kids[grade].filter(x => x !== foundKid);
    return this.kids[grade];
  }

  get numberOfChildren() {
    return Array.from(Object.values(this.kids)).reduce(
      (a, next) => a + next.length,
      0
    );
  }

  toString() {
    if (this.numberOfChildren === 0) {
      return "No children are enrolled for the trip and the organization of ${this.organizer} falls out...\n";
    }

    return (
      `${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}\n` +
      Object.keys(this.kids)
        .sort((a, b) => Number(a) - Number(b))
        .map(grade => {
          return (
            `Grade: ${grade}\n` +
            this.kids[grade]
              .map((el, index) => {
                return `${index + 1}. ${el}\n`;
              })
              .join("")
          );
        })
        .join("\n")
    );
  }
}

// let vacation = new Vacation("Mr Pesho", "San diego", 2000);
// console.log(vacation.registerChild("Gosho", 5, 2000));
// console.log(vacation.registerChild("Lilly", 6, 2100));
// console.log(vacation.registerChild("Pesho", 6, 2400));
// console.log(vacation.registerChild("Gosho", 5, 2000));
// console.log(vacation.registerChild("Tanya", 5, 6000));
// console.log(vacation.registerChild("Mitko", 10, 1590));

// let vacation = new Vacation("Mr Pesho", "San diego", 2000);
// vacation.registerChild("Gosho", 5, 2000);
// vacation.registerChild("Lilly", 6, 2100);
// console.log(vacation.removeChild("Gosho", 9));
// vacation.registerChild("Pesho", 6, 2400);
// vacation.registerChild("Gosho", 5, 2000);
// console.log(vacation.removeChild("Lilly", 6));
// console.log(vacation.registerChild("Tanya", 5, 6000));

// let vacation = new Vacation("Miss Elizabeth", "Dubai", 2000);
// vacation.registerChild("Gosho", 5, 3000);
// vacation.registerChild("Lilly", 6, 1500);
// vacation.registerChild("Pesho", 7, 4000);
// vacation.registerChild("Tanya", 5, 5000);
// vacation.registerChild("Mitko", 10, 5500);
// console.log(vacation.toString());
