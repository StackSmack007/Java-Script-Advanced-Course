function solve(input) {
    input = input.map(x => x.split(" | "));
    let result = [];
    for (let i = 0; i < input.length; i++) {
        let x = input[i];
        let productName = x[1];
        let townName = x[0];
        let price = +x[2];
        let existingProducts = result.filter(x => x.product === productName && x.town === townName);
        if (existingProducts.length === 0) {
            result.push({ product: productName, price: price, town: townName });
            continue;
        }
        existingProducts[0].price = price;
    }

    let productNames = new Set(result.map(x => x.product));
    productNames.forEach(function (productName) {
        let cheapestDeal = result.filter(x => x.product === productName).sort(function(a, b){return a.price-b.price})[0];
        console.log(`${cheapestDeal.product} -> ${cheapestDeal.price} (${cheapestDeal.town})`);
    })
}

solve(['Sofia City | Audi | 100000',
    'Sofia City | BMW | 100000',
    'Sofia City | Mitsubishi | 10000',
    'Sofia City | Mercedes | 10000',
    'Sofia City | NoOffenseToCarLovers | 0',
    'Mexico City | Audi | 1000',
    'Mexico City | BMW | 99999',
    'New York City | Mitsubishi | 10000',
    'New York City | Mitsubishi | 1000',
    'Mexico City | Audi | 100000',
    'Washington City | Mercedes | 1000']
);