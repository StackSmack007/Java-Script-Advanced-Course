
function solve(num1,num2,operator){
    let operations={
        "+":(a,b)=>a+b,
        "-":(a,b)=>a-b,
        "*":(a,b)=>a*b,
        "/":(a,b)=>a/b,
        "%":(a,b)=>a%b,
        "**":(a,b)=>a**b
    };
    let targetOperation=operations[operator];
    console.log(targetOperation(num1,num2));
}
solve(5,6,"+");