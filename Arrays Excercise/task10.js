/*jslint es6 */
'use strict';
function solve(input) {
    let [rows, cols, rowC, colC] = input;
    let resultMatrix = new Array(rows);
    for (let row = 0; row < rows; row++) {
        resultMatrix[row] = new Array(cols).fill(1);
        for (let col = 0; col < cols; col++) {
            let distance = Math.max(Math.abs(rowC - row), Math.abs(colC - col));
            resultMatrix[row][col] += distance;
        }
    }

    return resultMatrix.map(x => x.join(" ")).join("\n");
}

console.log(solve([4, 4, 0, 0]));