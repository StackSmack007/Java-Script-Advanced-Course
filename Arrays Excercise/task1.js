/*jslint es6 */
'use strict';
function solve(input) {
    let delimiter = input.pop();
    return input.join(delimiter);
}

console.log(solve(['One', 'Two', 'Three', 'Four', 'Five', '-']));