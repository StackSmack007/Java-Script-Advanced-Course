function solve(input) {
    input = input.map(x => x.split(" : "));
    catalog = {};
    for (let [name, price] of input) {
        let index = name[0];
        if (!catalog.hasOwnProperty(index)) {
            catalog[index] = {};
        }
        catalog[index][name] = price;
    }
    let result = Object.entries(catalog).sort((a, b) => a[0].localeCompare(b[0]));
    result.forEach(function (el) {
        console.log(el[0]);
        Object.keys(el[1]).sort((a,b)=>a.localeCompare(b)).map(x => {
            console.log(`  ${x}: ${el[1][x]}`)
        });

    })
}

solve(
    ['Appricot : 20.4',
        'Fridge : 1500',
        'TV : 1499',
        'Deodorant : 10',
        'Boiler : 300',
        'Apple : 1.25',
        'Anti-Bug Spray : 15',
        'T-Shirt : 10']
);