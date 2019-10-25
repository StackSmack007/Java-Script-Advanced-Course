function solve(arr) {
    arr = arr
        .map(x => x.split("|")
            .filter(z => z !== "")
            .map(str => str.trim())
        );
    let keys = arr.shift();
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result[i] = {};
        for (let j = 0; j < keys.length; j++) {
            let value = arr[i][j];
            value = isNaN(Number(value)) ? value : Math.round(100 * Number(value)) / 100;
            result[i][keys[j]] = value;
        }
    }

    console.log(JSON.stringify(result));
}

solve(['| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']
);