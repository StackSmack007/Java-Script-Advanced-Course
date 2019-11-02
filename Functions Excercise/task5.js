"use strict";

let fn = (() => {
    return {
        add: (a, b) => [a[0] + b[0], a[1] + b[1]],
        multiply: (a, b) => [a[0] * b, a[1] * b],
        length: a => Math.sqrt(a[0] * a[0] + a[1] * a[1]),
        dot: (a, b) => a[0] * a[1] + b[0] * b[1],
        cross: (a, b) => a[0] * b[1] - a[1] * b[0],
    }
})();
console.log(fn.dot([1, 0], [0, -1]));
// console.log(result.add([1, 1], [1, 0]));
// console.log(result.multiply([3.5, -2], 2));
// console.log(result.length([3, -4]));
// console.log(result.dot([1, 0], [0, -1]));
// console.log(result.cross([3, 7], [1, 0]));