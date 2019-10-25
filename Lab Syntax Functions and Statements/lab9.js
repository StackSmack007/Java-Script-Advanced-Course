function solve(sentance){
    
    let pattern=/\w+/gim;
    let wordsFound=sentance.toUpperCase().match(pattern).map(x=>x);
console.log(wordsFound.join(", "));
}
solve('Hi, how are you?');