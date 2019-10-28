function solve(n, membersToSum) {
    let result = new Array(n);
    for (let i = 0; i < n; i++) {
        let startIndex = Math.max(0, i - membersToSum);
        result[i] = i === 0 ? 1 : result.slice(startIndex, i).reduce((a, b) => a + b, 0);
    }
    return result.join(" ");
};

console.log(solve(6, 3))