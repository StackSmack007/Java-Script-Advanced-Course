"use strict";
let add = (function () {
    let value = 0;
    let summing = function (a) {
        value += a;
        return summing;
    }
    summing.toString = function () { return value };
    return summing;
})();

console.log(add(1)(2)(3).toString());