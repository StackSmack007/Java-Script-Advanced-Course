function solve(input) {
input=input.map(JSON.parse);
let result="<table>\n";
input.map(x=>{
    result+=`   <tr>\n     <td>${x.name}</td>\n     <td>${x.position}</td>\n     <td>${x.salary}</td>\n   </tr>\n`
});
result+="</table>"
console.log(result);
}

solve(['{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}']
);