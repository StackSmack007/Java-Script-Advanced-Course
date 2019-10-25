//1
// function solve(fruit,weightG,price){
// let weightKg = weightG/1000;
// let moneyNeeded=weightKg*price;
// console.log(`I need $${moneyNeeded.toFixed(2)} to buy ${weightKg.toFixed(2)} kilograms ${fruit}.`)
// };
// solve('orange', 2500, 1.80);

//2
// function solve(...params) {
//     function nok(a, b) {
//         let max = Math.max(a, b);
//         let min = Math.min(a, b);      
//         while (min) {
//             let a = max % min;
//             max = min;
//             min = a;
//         }
//         return max;
//     };
//     let result = params.reduce((a, b) => nok(a, b), 0)
//     console.log(result);
// };
// solve(36, 48, 18);

//3
// function solve(num) {
//     let numString = String(num);
//     let numArr = numString.split('');
//     numArr = numArr.map(Number);
//     let firstDigit = numArr[0];
//     let sum = numArr.reduce((a, b) => a + b, 0);
//     let isRepeating = (numArr.filter(x => x !== firstDigit)).length === 0;
//     console.log(isRepeating);
//     console.log(sum)
// }
// solve(2322);

//4
// function solve(stepCount, stepLength, speed) {
//     function leftFillNum(num, targetLength) {
//         return num.toString().padStart(targetLength, 0);
//     }    
//     let distanceKm = stepCount * stepLength / 1000;
//     let breaksCount = Math.floor(distanceKm / 0.5);
//     let totalTime = (distanceKm / speed) * 3600 + breaksCount * 60;
//     let hours = Math.floor(totalTime / 3600);
//     let minutes = Math.floor((totalTime % 3600) / 60);
//     let seconds = Math.round(totalTime % 60);
//     console.log(`${leftFillNum(hours,2)}:${leftFillNum(minutes,2)}:${leftFillNum(seconds,2)}`);
// }
// solve(2564, 0.7, 5.5);

//5
// function solve(menu) {
//     let obj = {};
//     for (let i = 0; i < menu.length; i += 2) {
//         obj[menu[i]] = +menu[i + 1];
//     }
//     console.log(obj);
// }
// solve(['Yoghurt', 48, 'Rise', 138, 'Apple', 52])

//6
// function solve(data) {
//     let speedLimitations = { motorway: 130, interstate: 90, city: 50, residential: 20 };
//     let area = data[1];
//     let allowedSpeed = +speedLimitations[area];
//     let speed = +data[0];
//     let overspeed = speed - allowedSpeed;
//     if (overspeed <= 0) return;
//     else if (overspeed <= 20) console.log('speeding');
//     else if (overspeed <= 40) console.log('excessive speeding');
//     else console.log('reckless driving');
// };
// solve([200, 'motorway']);

//7
// function solve(recepy) {
//     let num = +recepy.shift();
//     let operations = {
//         chop: (a) => a / 2,
//         dice: (a) => Math.sqrt(a),
//         spice: (a) => a + 1,
//         bake: (a) => a * 3,
//         fillet: (a) => a * .8,
//     }
//     for (let i = 0; i < recepy.length; i++) {
//         num = operations[recepy[i]](num);
//         console.log(num);
//     }
// }
// solve(['32', 'chop', 'chop', 'chop', 'chop', 'chop']);

//8
// function solve(coords) {
//     let validationPairs = [
//         [coords[0], coords[1], 0, 0],
//         [coords[2], coords[3], 0, 0],
//         [coords[0], coords[1], coords[2], coords[3]]
//     ];
//     validationPairs.forEach(function (x) {
//         validate(x);
//     });
//     function validate(coordinates) {
//         let x1 = coordinates[0];
//         let y1 = coordinates[1];
//         let x2 = coordinates[2];
//         let y2 = coordinates[3];
//         let distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
//         let resultMessage = `{${x1}, ${y1}} to {${x2}, ${y2}} is `;
//         if (distance - Math.floor(distance)===0) {
//             resultMessage += 'valid';
//         }
//         else {
//             resultMessage += 'invalid';
//         }
//         console.log(resultMessage);
//     }
// }
// solve([2, 1, 1, 1]);


//9

function solve(pack) {
    let income = 0;
    let drinkPrices = { caffeine: .8, decaf: .9, tea: 0.8, coffee: 0 };
    for (let i = 0; i < pack.length; i++) {
        income += processOrder(pack[i]);
    }
    console.log(`Income Report: $${income.toFixed(2)}`);

    function processOrder(order) {
        order = order.split(", ");
        let budget = Number(order.shift());
        let suggars = Number(order.pop());
        let drinkName = order[0];
        let drinkPrice = 0;
        while (order.length > 0) {
            let option = order.shift();
            if (option === 'milk') {
                drinkPrice = Math.round(drinkPrice * 11) / 10;
                break;
            }
            drinkPrice += drinkPrices[option];
        }
        drinkPrice += suggars ? .1 : 0;
        if (budget >= drinkPrice) 
        {
            console.log(`You ordered ${drinkName}. Price: $${drinkPrice.toFixed(2)} Change: $${(budget - drinkPrice).toFixed(2)}`);
            return drinkPrice;
        }
         console.log(`Not enough money for ${drinkName}. Need $${(drinkPrice-budget).toFixed(2)} more.`);
        return 0;
    }
}

solve(['1.00, coffee, caffeine, milk, 4', '0.40, tea, milk, 2', '1.00, coffee, decaf, 0']);