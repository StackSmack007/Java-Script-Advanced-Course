function solve(input) {
    input = input.map(x => x.split(" | "))
    let catalog = {};
    for (let [head, subHead, name] of input) {
        if (!catalog.hasOwnProperty(head)) {
            catalog[head] = {};
        }
        if (!catalog[head].hasOwnProperty(subHead)) {
            catalog[head][subHead] = [];
        }

        catalog[head][subHead].push(name);
    }

    const systemComparator = (a, b) => Object.keys(b[1]).length - Object.keys(a[1]).length || a[0][0].localeCompare(b[0][0]);
    const arrLengthComparatorDesc = (a, b) => b.length - a.length;
    Object.entries(catalog).sort(systemComparator).map(x => {
        console.log(x.shift());
        Object.entries(x.shift()).sort(arrLengthComparatorDesc).map(y => {
            console.log("|||" + y.shift());
            y.pop().map(z => {
                console.log("||||||" + z);
            })
        });
    });
}

solve(['SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security']

);