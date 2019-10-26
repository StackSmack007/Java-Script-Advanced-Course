"use strict";
function solve(input) {
    const getTotalScore = a => Object.values(a).reduce((a, b) => a + b, 0);
    const getWinnerBySkills = function (skils1, skils2) {
        let totalSkillPoints1 = getTotalScore(skils1);
        let totalSkillPoints2 = getTotalScore(skils2);
        let repeatingSkillNames = Object.keys(skils1).filter(x => {
            return Object.keys(skils2).some(s => s === x);
        });

        if (repeatingSkillNames.length === 0 || totalSkillPoints1 === totalSkillPoints2) return 0;
        else if (totalSkillPoints1 >= totalSkillPoints2) return 1;
        else return 2;
    }

    const finishLine = "Ave Cesar";
    input = input.slice(0, input.indexOf(finishLine)).map(x => x.split(" -> "));
    let gladiators = input.reduce((a, b) => {
        if (b.length === 1) {
            let [pl1, pl2] = b.pop().split(' vs ');
            if (a.has(pl1) && a.has(pl2)) {
                let result = getWinnerBySkills(a.get(pl1), a.get(pl2));
                if (result === 1) a.delete(pl2);
                if (result === 2) a.delete(pl1);
            }
        }

        else {
            let [name, skill, value] = b;
            if (!a.has(name)) {
                let skills = {};
                skills[skill] = +value;
                a.set(name, skills);
            }
            else if (typeof (a.get(name)[skill]) === "undefined" ||
                a.get(name)[skill] < +value) {
                a.get(name)[skill] = +value;
            }
        }

        return a;
    }, new Map());

    let gladiatorsResult = Array.from([...gladiators.entries()]).sort((a, b) =>
        getTotalScore(b[1]) - getTotalScore(a[1]) || a[0].localeCompare(b[0])
    ).map(x => {
        console.log(`${x[0]}: ${getTotalScore(x[1])} skill`);
        Object.entries(x[1]).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(s => console.log(`- ${s[0]} <!> ${s[1]}`));
    });
}

// solve([
//     'Stamat -> Duck -> 200',
//     'Stamat -> Tiger -> 250',
//     'Pesho -> BattleCry -> 400',
//     'Gosho -> PowerPunch -> 300',
//     'Ave Cesar',
// ]);

solve([
    'Pesho -> Duck -> 400',
    'Julius -> Shield -> 150',
    'Gladius -> Heal -> 200',
    'Gladius -> Support -> 250',
    'Gladius -> Shield -> 250',
    'Pesho vs Gladius',
    'Gladius vs Julius',
    'Gladius vs Gosho',
    'Ave Cesar',
]);