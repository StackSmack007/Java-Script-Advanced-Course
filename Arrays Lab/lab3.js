//opt 1
// function solve(input) {
//     return input.reduce((a, b) => {
//         if (b >= 0) a.push(b);
//         else a.unshift(b);
//         return a;
//     }, []).join("\n");
// }
//opt 2
function solve(input) {
    const operations = { true: "push", false: "unshift" };
    return input.reduce((a, b) => {
        a[operations[b >= 0]](b)
        return a;
    }, []).join("\n");
}

console.log(solve([7, -2, 8, 9]));