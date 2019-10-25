function solve(input) {
    input = input.map(x => x.split(" <-> "))
    let result = {};
    for (let item of input) {
        let town = item[0];
        let population = +item[1];
        if (typeof (result[town]) === "undefined") {
            result[town] = 0;
        }
        result[town] += population;
    }
    for (let key of Object.keys(result)) {
        console.log(`${key} : ${result[key]}`);
    }
}

solve(['Sofia <-> 1200000',
    'Montana <-> 20000',
    'New York <-> 10000000',
    'Washington <-> 2345000',
    'Las Vegas <-> 1000000']
);