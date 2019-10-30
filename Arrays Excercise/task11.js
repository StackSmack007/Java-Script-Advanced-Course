/*jslint es6 */
'use strict';
function solve(rows, cols) {
    let resultMatrix = new Array(rows);
    for (let i = 0; i < rows; i++) {
        resultMatrix[i] = new Array(cols);
    }

    let currentRow = 0;
    let currentCol = -1;
    let currentValue = 0;
    for (let i = 0; i < rows * cols; i++) {
        currentValue++;
        if (currentCol < cols - 1 - currentRow && currentCol > currentRow - 2 && currentRow < rows / 2) { currentCol++; }
        else if (currentCol > rows - 1 - currentRow && currentCol < cols - rows + currentRow + 1) {
            currentCol--;
        }
        else if (currentCol >=Math.floor(cols / 2) ) {
            currentRow++;
        }
        else { currentRow--; }
        resultMatrix[currentRow][currentCol] = currentValue;
    }

    return resultMatrix.map(x => x.join(" ")).join("\n");
}

console.log(solve(2,2));