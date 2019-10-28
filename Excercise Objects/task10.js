function solve(enlist, battles) {
    const getWinnerLooserGeneral = (arr) => arr[0].army > arr[1].army ? arr : arr.reverse();

    const enlistKingdoms = (a, b) => {
        if (!a.has(b.kingdom)) {
            a.set(b.kingdom, {
                generals: new Map(),
                totalArmy: function () {
                    return [...this.generals.values()].reduce((a, b) => a + b.army, 0);
                },
                totalWins: function () {
                    return [...this.generals.values()].reduce((a, b) => a + b.wins, 0);
                },
                totalLosses: function () {
                    return [...this.generals.values()].reduce((a, b) => a + b.losses, 0);
                }
            });
        }

        let kingdomGenerals = a.get(b.kingdom).generals;
        if (!kingdomGenerals.has(b.general)) {
            kingdomGenerals.set(b.general, { army: 0, wins: 0, losses: 0 });
        }

        kingdomGenerals.get(b.general).army += b.army;
        return a;
    };

    let kingdomBook = enlist.reduce((acc, next) => enlistKingdoms(acc, next), new Map());

    battles.map(b => {
        let [kingdom0, general_0, kingdom1, general_1] = b;
        if (kingdom0 === kingdom1 || !kingdomBook.has(kingdom0) || !kingdomBook.has(kingdom1)) return;

        kingdom0 = kingdomBook.get(kingdom0);
        kingdom1 = kingdomBook.get(kingdom1);
        general_0 = kingdom0.generals.get(general_0);
        general_1 = kingdom1.generals.get(general_1);
        if (typeof (general_0) === "undefined" || typeof (general_1) === "undefined" || general_0.army === general_1.army) return;

        let winnerLooser = getWinnerLooserGeneral([general_0, general_1]);
        winnerLooser[0].wins++;
        winnerLooser[0].army = Math.floor(winnerLooser[0].army * 1.1);
        winnerLooser[1].losses++;
        winnerLooser[1].army = Math.floor(winnerLooser[1].army * 0.9);
    });

    let winner = [...kingdomBook.entries()]
        .sort((a, b) => b[1].totalWins() - a[1].totalWins() || a[1].totalLosses() - b[1].totalLosses() || a[0].localeCompare(b[0]))
        .shift();

    console.log(`Winner: ${winner.shift()}`);
    [...winner.shift().generals.entries()].sort((a, b) => b[1].army - a[1].army).map(x => {
        console.log(`/\\general: ${x.shift()}`);
        console.log(`---army: ${x[0].army}`);
        console.log(`---wins: ${x[0].wins}`);
        console.log(`---losses: ${x[0].losses}`);
    })
}

// solve([
//     { kingdom: "Maiden Way", general: "Merek", army: 5000 },
//     { kingdom: "Stonegate", general: "Ulric", army: 4900 },
//     { kingdom: "Stonegate", general: "Doran", army: 70000 },
//     { kingdom: "YorkenShire", general: "Quinn", army: 0 },
//     { kingdom: "YorkenShire", general: "Quinn", army: 2000 },
//     { kingdom: "Maiden Way", general: "Berinon", army: 100000 }
// ],
//     [
//         ["YorkenShire", "Quinn", "Stonegate", "Ulric"],
//         ["Stonegate", "Ulric", "Stonegate", "Doran"],
//         ["Stonegate", "Doran", "Maiden Way", "Merek"],
//         ["Stonegate", "Ulric", "Maiden Way", "Merek"],
//         ["Maiden Way", "Berinon", "Stonegate", "Ulric"]
//     ]
// );

// solve([ { kingdom: "Stonegate", general: "Ulric", army: 5000 },
// { kingdom: "YorkenShire", general: "Quinn", army: 5000 },
// { kingdom: "Maiden Way", general: "Berinon", army: 1000 } ],
// [ ["YorkenShire", "Quinn", "Stonegate", "Ulric"],
// ["Maiden Way", "Berinon", "YorkenShire", "Quinn"] ]
// );

solve([{ kingdom: "Maiden Way", general: "Merek", army: 5000 },
{ kingdom: "Stonegate", general: "Ulric", army: 4900 },
{ kingdom: "Stonegate", general: "Doran", army: 70000 },
{ kingdom: "YorkenShire", general: "Quinn", army: 0 },
{ kingdom: "YorkenShire", general: "Quinn", army: 2000 }],
    [["YorkenShire", "Quinn", "Stonegate", "Doran"],
    ["Stonegate", "Ulric", "Maiden Way", "Merek"]]
);