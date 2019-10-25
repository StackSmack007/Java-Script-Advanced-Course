function solve(...params){
    let max=params.sort((a,b)=>a-b).pop();
    console.log(`The largest number is ${max}.`);
}
solve(1,17,3);