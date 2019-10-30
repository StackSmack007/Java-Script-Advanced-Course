function solve(input, criteria) {
    let [criteriaName, criteriaValue] = criteria.split("-");
    return JSON.parse(input).filter(x => x[criteriaName] === criteriaValue)
        .reduce((acc, next, index) => [...acc, `${index}. ${next.first_name} ${next.last_name} - ${next.email}`], []).join("\n");
}

console.log(solve(`[{
    "id": "1",
    "first_name": "Kaylee",
    "last_name": "Johnson",
    "email": "k0@cnn.com",
    "gender": "Female"
  }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Johnson",
    "email": "kjost1@forbes.com",
    "gender": "Female"
  }, {
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
  }, {
    "id": "4",
    "first_name": "Evanne",
    "last_name": "Johnson",
    "email": "ev2@hostgator.com",
    "gender": "Male"
  }]`,
    'last_name-Johnson'
));
//console.log(solve([{"id": "1","first_name": "Ardine","last_name": "Bassam","email": "abassam0@cnn.com","gender": "Female"}, {"id": "2","first_name": "Kizzee","last_name": "Jost","email": "kjost1@forbes.com","gender": "Female"},{"id": "3","first_name": "Evanne","last_name": "Maldin","email": "emaldin2@hostgator.com","gender": "Male"}] gender-Female));