function solve(input) {
    input = input.map(x => x.split(" -> "));
    let result = [];
    let currentTown = "";
    for (let i = 0; i < input.length; i++) {
        let record = input[i];
        let town = record.shift();

        if (currentTown !== town) {
            currentTown = town;
            result.push({ town: town, purchases: [] })
        }

        let product = record.shift();
        console.log()
        let profit = record.shift().split(' : ').map(Number).reduce((a, b) => a * b, 1);
        result[result.length - 1].purchases.push({ product: product, profit: profit });
    }

    for (let i = 0; i < result.length; i++) {
       let townInfo=result[i];
        console.log("Town - "+townInfo.town);
        townInfo.purchases.forEach(function(x){
            console.log(`$$$${x.product} : ${x.profit}`);  
        })
    }
}

solve(['Sofia -> Laptops HP -> 200 : 2000',
    'Sofia -> Raspberry -> 200000 : 1500',
    'Sofia -> Audi Q7 -> 200 : 100000',
    'Montana -> Portokals -> 200000 : 1',
    'Montana -> Qgodas -> 20000 : 0.2',
    'Montana -> Chereshas -> 1000 : 0.3']
);