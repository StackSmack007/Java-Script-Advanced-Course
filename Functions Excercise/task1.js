"use strict";
function solve(arr, order) {
    const sortingMap = { asc: (a, b) => a - b, desc: (a, b) => b - a, }
    return arr.sort(sortingMap[order]);
}

console.log(solve([14, 7, 17, 6, 8], 'desc'));