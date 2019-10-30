/*jslint es6 */
'use strict';
function solve(input) {
    let data = input.slice();
    let step = data.pop();
    return data.filter((_, index) => index % step === 0).join("\n");
}

console.log(solve(['5', '20', '31', '4', '20', '2']));