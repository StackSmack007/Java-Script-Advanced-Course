function solve(input) {
    return input
        .slice()
        .map(x => x.sort((a, b) => b - a))
        .map(x => x.shift())
        .sort((a, b) => b - a)
        .shift();
}


console.log(solve([[20, 50, 10],
[8, 33, 145]]));