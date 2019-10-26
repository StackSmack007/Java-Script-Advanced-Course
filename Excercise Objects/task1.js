function solve(input) {
    input = input.map(x => x.split(" / "))
        .map(el => {
            return {
                name: el.shift(),
                level: +el.shift(),
                items: el.pop().split(", ").filter(x=>x!=""),
            }
        });
    console.log(JSON.stringify(input));
}

solve(
    ['Isacc / 25 / Apple, GravityGun',
        'Derek / 12 / BarrelVest, DestructionSword',
        'Hes / 1 / Desolator, Sentinel, Antara',
        'Hes / 1 / ']
);