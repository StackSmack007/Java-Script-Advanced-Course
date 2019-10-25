function solve(r){
    "use strict";
    let inputType=typeof(r);
    if (inputType === "number"){
        let area=r*r*Math.PI;
console.log(area.toFixed(2));
    }
    else{
        console.log(`We can not calculate the circle area, because we receive a ${inputType}.`);
    }
}
solve(5);
solve("shitnq");