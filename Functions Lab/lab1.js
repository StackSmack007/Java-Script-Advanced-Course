function solution(a) {
    return function (m) {
        return a + m;
    }
}

let add5 = solution(5);
console.log(add5(2));
console.log(add5(3));
