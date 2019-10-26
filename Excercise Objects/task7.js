function solve(input) {
    input.
    filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => a.length - b.length || a.localeCompare(b)).map(x => console.log(x));
}

solve(
    ['Ashton',
        'Kutcher',
        'Ariel',
        'Lilly',
        'Keyden',
        'Aizen',
        'Billy',
        'Billy',
        'Braston']
);