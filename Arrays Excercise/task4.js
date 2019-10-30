/*jslint es6 */
'use strict';
function solve(input) {
    let data = input.slice();
    let rotations = +data.pop() % data.length;
    for (let i = 0; i < rotations; i++) {
        data.unshift(data.pop());
    }
    return data.join(" ");
}

console.log(solve(['1', '2', '3', '4', '2']));