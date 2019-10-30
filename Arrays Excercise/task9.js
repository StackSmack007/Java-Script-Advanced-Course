/*jslint es6 */
'use strict';
function solve(input) {
    const size = input.length;
    let data = input.slice().map(x => x.split(" ").map(Number));
    let diag1Sum = data.reduce((acc, next, index) => {
        acc += next[index];
        return acc;
    }, 0)
    let diag2Sum = data.reduce((acc, next, index) => {
        acc += next[size - 1 - index];
        return acc;
    }, 0)
    if (diag1Sum === diag2Sum) {
        data = data.map((row, rowIndex) => row.map((x, colIndex) => {
            if (rowIndex === colIndex || colIndex === size - 1 - rowIndex) { return x; }
            return diag1Sum;
        }));
    }

    return data.map(x => x.join(' ')).join('\n');
}

console.log(solve(
    ['5 3 12 3 1',
        '11 4 23 2 5',
        '101 12 3 21 10',
        '1 4 5 2 2',
        '5 22 33 11 1']
));