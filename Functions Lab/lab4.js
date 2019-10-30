function solution1() {
    this.content = "";
    this["append"] = function (x) { this.content += x; };
    this["removeStart"] = function (x) { this.content = this.content.substring(x) };
    this["removeEnd"] = function (x) { this.content = this.content.substring(0, this.content.length - x) };
    this["print"] = function (x) { console.log(this.content); };
    return this;
}

function solution() {
    return {
        content: "",
        "append": function (x) { this.content += x; },
        "removeStart": function (x) { this.content = this.content.substring(x) },
        "removeEnd": function (x) { this.content = this.content.substring(0, this.content.length - x) },
        "print": function (x) { console.log(this.content); }
    }
}

let firstZeroTest = solution();

firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();