"use strict";
function solve(...args) {
    let data = args.reduce((acc, next) => {
        let type = typeof (next);
        acc.params.push(`${type}: ${next}`);
        if (!acc.occurances.hasOwnProperty(type)) {
            acc.occurances[type] = 0;
        }

        acc.occurances[type]++;
        return acc;
    }, { params: [], occurances: {} });

    [...data.params,
    ...Object.entries(data.occurances)
        .sort((a, b) => b[1] - a[1])
        .map(x => `${x[0]} = ${x[1]}`)
    ].map(x => console.log(x))
}
console.log(solve('cat', 42, function () { console.log('Hello world!'); }));