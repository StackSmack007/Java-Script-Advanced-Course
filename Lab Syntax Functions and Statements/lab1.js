function solve (...params){
   let elementsCount=params.length;
   let totalSum=params.reduce((a,b)=>a+b.length,0);
   let avg=Math.floor(totalSum/elementsCount);
   console.log(totalSum);
   console.log(avg);

//    return [totalSum,avg];
}
solve('chocolate', 'ice cream', 'cake');
// console.log(solve('chocolate', 'ice cream', 'cake').join("\n"))