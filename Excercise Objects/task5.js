function solve(input) {
    input = input.map(x => x.split(" | "))
    let catalog = {};
    for (let [brand, model, count] of input) {
        if (!catalog.hasOwnProperty(brand)) {
            catalog[brand] = {};
        }
        if (!catalog[brand].hasOwnProperty(model)) {
            catalog[brand][model] = 0;
        }
        catalog[brand][model] += +count;
    }
    
    for (let kvp of Object.entries(catalog)) {
        console.log(kvp.shift());
        Object.entries(kvp.pop()).map(x => {
            console.log(`###${x.shift()} -> ${x.shift()}`);
        })
    }
}

solve(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10']
);