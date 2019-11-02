"use strict";
function solution() {
    let storage = { protein: 0, carbohydrate: 0, fat: 0, flavour: 0 }
    const recepies = new Map([
        ["apple", { protein: 0, carbohydrate: 1, fat: 0, flavour: 2 }],
        ["lemonade", { protein: 0, carbohydrate: 10, fat: 0, flavour: 20 }],
        ["burger", { protein: 0, carbohydrate: 5, fat: 7, flavour: 3 }],
        ["eggs", { protein: 5, carbohydrate: 0, fat: 1, flavour: 1 }],
        ["turkey", { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 }]
    ]);

    const report = () => Object.keys(storage).map(x => `${x}=${storage[x]}`).join(" ");
    const restock = ([element, quantity]) => {
        storage[element] += Number(quantity);
        return "Success";
    }

    const prepare = function ([meal, quantity]) {
        let requirements = recepies.get(meal);
        let elementsNotEnough = Object.keys(storage).filter(elm => storage[elm] < requirements[elm] * quantity);
        if (elementsNotEnough.length > 0) {
            return `Error: not enough ${elementsNotEnough[0]} in stock`;
        }

        storage = Object.keys(storage).reduce((acc, next) => {
            acc[next] = storage[next] - requirements[next] * quantity;
            return acc;
        }, {});
        return "Success";
    }

    let commands = { report, restock, prepare };

    return function (input) {
        input = input.split(" ");
        return commands[input.shift()](input);
    }
}
// let manager = solution();
// console.log(manager("restock flavour 50"));  // Success
// console.log(manager("prepare lemonade 4"));  // Error: not enough carbohydrate in stock


let manager = solution();
console.log(manager("restock protein 100"));
console.log(manager("restock carbohydrate 100"));
console.log(manager("restock fat 100"));
console.log(manager("restock flavour 100"));
console.log(manager("report"));
console.log(manager("prepare eggs 2"));
console.log(manager("prepare eggs 1"));
console.log(manager("report"));


// expectationPairs = [
//     ['restock protein 100', 'Success'],
//     ['restock carbohydrate 100', 'Success'],
//     ['restock fat 100', 'Success'],
//     ['restock flavour 100', 'Success'],
//     ['report', 'protein=100 carbohydrate=100 fat=100 flavour=100'],
//     ['prepare eggs 2', 'Success'],
//     ['report', 'protein=90 carbohydrate=100 fat=98 flavour=98'],
//     ['prepare eggs 1', 'Success'],
//     ['report', 'protein=85 carbohydrate=100 fat=97 flavour=97']
// ];

