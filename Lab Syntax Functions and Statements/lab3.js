function solve(min,max){
    let sum=0;
    for (let i=Number(min); i<=Number(max); i++){
        sum+=i;
    }
   return sum;
}
console.log(solve(-8,20));