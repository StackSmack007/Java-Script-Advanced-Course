function solve(input) {
    let result = {}
    for (let i=0; i < input.length; i += 2) {
        let name = input[i];
        let value = +input[i + 1];
        if (!result[name]) result[name] = 0;
        result[name] += value;
    }
    console.log(JSON.stringify(result));
}
solve(['Sofia',
    '20',
    'Varna',
    '3',
    'Sofia',
    '5',
    'Varna',
    '4']
);