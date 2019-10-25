function solve(params){
    let result=[];
    result[0]=params.reduce((a,b)=>a+b,0);
    result[1]=0;
  for (let i=0;i<params.length;i++){
      result[1]+=1/params[i]; 
     }   
    result[2]=params.reduce((a,b)=>a+b,'');
console.log(result.join('\n'));
}

solve([1, 2, 3]);