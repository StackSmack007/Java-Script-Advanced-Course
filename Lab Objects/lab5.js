function solve(input) {
    let pattern = /\w+/gim;
    let wordsObj = input[0]
        .match(pattern)
        .reduce((a, b) => {
            if (typeof (a[b]) === "undefined") {
                a[b] = 0;
            }
            a[b]++;
            return a;
        }, {});
    console.log(JSON.stringify(wordsObj))
}

solve([`Far too slow, you're far too slow.`]);