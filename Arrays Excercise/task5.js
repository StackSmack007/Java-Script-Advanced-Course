/*jslint es6 */
'use strict';
function solve(input) {
    let currentMax = input[0];
    return input.filter(el => {
        currentMax = Math.max(currentMax, el);
        return el === currentMax;
    }).join("\n");
}

console.log(solve([1, 3, 8, 4, 10, 10, 12, 3, 2, 24]));