function solve(input) {
    return input.reduce((acc, next, index) => {
        acc[0] += next[index];
        acc[1] += next[next.length - 1 - index];
        return acc;
    }, [0, 0])
        .join(" ");
};

console.log(solve([
    [3, 5, 17],
    [-1, 7, 14],
    [1, -8, 89]
]));