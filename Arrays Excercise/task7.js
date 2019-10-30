/*jslint es6 */
'use strict';
function solve(input) {
    for (let row = 0; row < input.length; row++) {
        let rowSum = input[row].reduce((acc, next) => acc + next, 0);
        for (let col = 0; col < input[row].length; col++) {
            let colSum = input.map(x => x[col]).reduce((acc, next) => acc + next, 0);
            if (colSum !== rowSum) { return false; }
        }
    }

    return true;
}


console.log(solve([
    [4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]
]));