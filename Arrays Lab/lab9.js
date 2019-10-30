function solve(input) {
    const rowMatches = arr => arr.filter((el, ind, arr) => ind < arr.length - 1 && el === arr[ind + 1]).length;

    const countOfMatches = function (a, b) {
        let longerArr = a.length <= b.length ? b : a;
        let shorterArr = a.length <= b.length ? a : b;
        return shorterArr.filter((a, i) => longerArr[i] === a).length + rowMatches(a) + rowMatches(b);
    }
    let result = 0;
    for (let i = 0; i < input.length - 1; i++) {
        result += countOfMatches(input[i], input[i + 1]);
    }
    return result;
}

console.log(solve([
    [2, 2, 5, 7, 4],
    [4, 0, 5, 3, 4],
    [2, 5, 5, 4, 2]]
));
