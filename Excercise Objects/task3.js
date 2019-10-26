function solve(input) {
    input = input.map(x => x.split(" => "));
    tank = {};
    bottles = {};
    for (let [fruit, quantity] of input) {
        if (!tank.hasOwnProperty(fruit)) {
            tank[fruit] = 0;
        }

        tank[fruit] += +quantity;
        let bottlesFilled = Math.floor(tank[fruit] / 1000);
        if (bottlesFilled > 0) {
            bottles[fruit] = bottlesFilled;
        }
    }

    Object.entries(bottles).map(x => {
        console.log(`${x[0]} => ${+x[1]}`);
    })
}

solve(['Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789']

);