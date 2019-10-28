function solve(input) {
    return input.reduce((acc, next, index) => {
        if (index % 2 === 0) {
            acc.push(next);
        }
        return acc;
    }, []).join(' ');
}


console.log(solve(['20', '30', '40']));