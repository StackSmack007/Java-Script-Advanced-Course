function someFunc(){
    let obj={f:1,a:2,k:3};
console.log(Object.entries(obj));
    
let map1 = new Map();
map1.set("a","b");
console.log(map1);
console.log([...map1.entries()]);


}
someFunc();