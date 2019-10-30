/*jslint es6 */
'use strict';
function solve(moves, player1sign = 'O', player2sign = 'X', matrixSize = 3) {
    let turns = moves.map((x) => x.split(" ").map(Number));
    const initializeBoard = size => {
        let board = new Array(size);
        for (let i = 0; i < size; i++) {
            board[i] = new Array(size).fill(false);
        }
        return board;
    }

    const allEqual_notFalse = (arr) => arr.length === arr.slice().filter((a, _, arr) => a !== false && a === arr[0]).length;

    const checkVictory = board => {
        let results = [];
        for (let i = 0; i < matrixSize; i++) {
            results.push(allEqual_notFalse(board[i])); //row comparing
            results.push(allEqual_notFalse(board.map(x => x[i]))); //col comparing              
        }

        results.push(allEqual_notFalse(board.map((x, index) => x[index])));//diagonal "\" comparing
        results.push(allEqual_notFalse(board.map((x, index) => x[matrixSize - 1 - index])));//diagonal "/" comparing
        return results.includes(true);
    }

    let board = initializeBoard(matrixSize);
    let gameTracker = {
        turn: 0, currentPlayerSymbol: function () {
            return this.turn % 2 === 0 ? player1sign : player2sign;
        }, isWon: false
    }

    let result = "";
    for (let i = 0; i < turns.length; i++) {
        let row = turns[i][0];
        let col = turns[i][1];
        if (board[row][col] !== false) {
            result += "This place is already taken. Please choose another!\n";
            continue;
        }
        gameTracker.turn++;
        board[row][col] = gameTracker.currentPlayerSymbol();
        if (checkVictory(board)) {
            gameTracker.isWon = true;
            break;
        }
        if (!board.flat().includes(false)) { break; }
    }

    result += gameTracker.isWon
        ? `Player ${gameTracker.currentPlayerSymbol()} wins!\n`
        : "The game ended! Nobody wins :(\n";
    board.map(x => result += x.join("\t") + "\n");
    return result;
}

console.log(solve(
        ["0 1",
        "0 0",
        "0 2",
        "2 0",
        "1 0",
        "1 1",
        "1 2",
        "2 2",
        "2 1",
        "0 0"]
));