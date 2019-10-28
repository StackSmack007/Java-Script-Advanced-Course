function solve(input) {
    return input
        .filter((_, index) => index % 2 === 1)
        .map(x => 2 * x).reverse()
        .join(" ");
}

console.log(solve([10, 15, 20, 25]));