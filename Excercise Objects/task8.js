function solve(input) {
    input = input
        .map(x => x.replace("[", "").replace("]", "")
            .split(', ')
            .map(Number)
            .sort((a, b) => b - a));

    let equalNumArrs = (a, b) => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    let result = [];
    for (let i = 0; i < input.length; i++) {
        let base = input[i];
        let doubled = false;
        for (let j = 0; j < result.length; j++) {
            let existing = result[j];
            if (equalNumArrs(base, existing)) {
                doubled = true;
                break;
            }
        }
        if (!doubled) result.push(base)
    }

    result.sort((a, b) => a.length - b.length).map(x => {
        console.log(`[${x.join(", ")}]`);
    });
}

solve(["[1, 2, 3]",
    "[0, 0, 5, 4, 5]",
    "[2, 3, 1]"]
);