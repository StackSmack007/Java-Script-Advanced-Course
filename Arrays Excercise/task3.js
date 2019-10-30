/*jslint es6 */
'use strict';
function solve(input) {
    let result = [];
    for (let i = 1; i <= input.length; i++) {
        if (input[i - 1] === "add") result.push(i);
        else if (result.length > 0) result.pop();
    }

    return result.length === 0 ? "Empty" : result.join("\n");
}

console.log(solve(['add', 
'add', 
'remove', 
'add', 
'add']
));