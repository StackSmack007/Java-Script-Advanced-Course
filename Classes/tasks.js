/*jslint es6 */
"use strict";
//task 1
// class Request {
//     constructor(method, uri, version, message) {
//         this.method = method;
//         this.uri = uri;
//         this.version = version;
//         this.message = message;
//         this.response = undefined;
//         this.fulfilled = false;
//     }
// }
// let myData = new Request('GET', 'http://google.com', 'HTTP/1.1', '');

//task 2
// function solve(a, b) {
//     class Ticket {
//         constructor(destination, price, status) {
//             this.destination = destination;
//             this.price = Number(price);
//             this.status = status;
//         }
//     }

//     class TicketManager {
//         constructor(ticketsArr, criteria) {
//             this.ticketsBank = ticketsArr.slice().map(x => {
//                 let t = x.split("|");
//                 return new Ticket(t[0], Number(t[1]), t[2]);
//             });
//             this.criteria = criteria;
//         }
//         sortFunc() {
//             if (isNaN(this.ticketsBank[0][this.criteria])) {
//                 return (a, b) => a[this.criteria].localeCompare(b[this.criteria]);
//             }
//             return (a, b) => a[this.criteria] - b[this.criteria];
//         }
//         get sorted() {
//             return this.ticketsBank.slice().sort(this.sortFunc());
//         }
//     }
//     let manager = new TicketManager(a, b);
//     return manager.sorted;
// }

// console.log(solve(['Philadelphia|94.20|available',
//     'New York City|95.99|available',
//     'New York City|95.99|sold',
//     'Boston|126.20|departed'],
//     'destination')
// );

//task 3

// class Rat {
//     constructor(name) {
//         this.name = name;
//         this.unitedRats = [];
//     }
//     unite(otherRat) {
//         if (otherRat instanceof Rat) {
//             this.unitedRats.push(otherRat);
//         }
//     }
//     getRats() {
//         return this.unitedRats;
//     }
//     toString() {
//         return this.name + this.unitedRats.map(x => "\n##" + x.name).join("");
//     }
// }
// let firstRat = new Rat("Peter");
// console.log(firstRat.toString()); // Peter

// console.log(firstRat.getRats()); // []

// firstRat.unite(new Rat("George"));
// firstRat.unite(new Rat("Alex"));
// console.log(firstRat.getRats());
// // [ Rat { name: 'George', unitedRats: [] },
// //  Rat { name: 'Alex', unitedRats: [] } ]

// console.log(firstRat.toString());
// // Peter
// // ##George
// // ##Alex

//task 4
// class Stringer {
//     constructor(innerString,innerLength) {
//         this.innerString = innerString;
//         this.innerLength = innerLength;
//     }

//     decrease(num) {
//         if (num < 0) { return; }
//         this.innerLength -= Math.min(num, this.innerLength);
//     }

//     increase(num) {
//         if (num < 0) { return; }
//         this.innerLength += num;
//     }

//     toString() {
//         if (this.innerString.length > this.innerLength) {
//             return this.innerString.substr(0, this.innerLength) + "...";
//         }
//         return this.innerString;
//     }
// }
// let test = new Stringer("Test", 5);
// console.log(test.toString()); // Test
// test.decrease(3);
// console.log(test.toString()); // Te...
// test.decrease(5);
// console.log(test.toString()); // ...
// test.increase(4); 
// console.log(test.toString()); // Test

//task 5

// class Extensible {

//     static _id = -1;

//     constructor() {
//         Extensible._id++;
//         this.id = Extensible._id;
//     }
//     extend(template) {
//         Object.entries(template).map(x => {
//             let [name, value] = x;
//             if (typeof (value) === "function") {
//                 Extensible.prototype[name] = value;
//             }
//             else {
//                 this[name] = value;
//             }
//         })
//     }
// }

// let obj1 = new Extensible();
// let obj2 = new Extensible();
// let obj3 = new Extensible();
// console.log(obj1.id);
// console.log(obj2.id);
// console.log(obj3.id);

// var template = {
//     extensionData: 5,
//     extensionMethod: function (value) {
//         return value + 1;
//     }
// };

// let testObj = new Extensible();
// console.log(testObj.id === 0);

// testObj.extend(template);

// console.log(testObj.hasOwnProperty('extensionData'));//.to.equal(true, "Instance didn't copy the properties correctly.");
// console.log(testObj.extensionData === 5);//.to.equal(5, "Copied property doesn't have correct value.");
// console.log(Object.getPrototypeOf(testObj).hasOwnProperty('extensionMethod'));//.to.equal(true, "Prototype didn't copy the properties correctly.");
// console.log(testObj.extensionMethod(1) === 2);//        .to.equal(2, "Copied method doesn't operate correctly.");

//task 6

// class List {
//     constructor() {
//         this._arr = [];
//         this.size = 0;
//     }

//     add(elt) {
//         this._arr.push(elt);
//         this.size++;
//     }

//     remove(index) {
//         if (index < 0 || this._arr.length <= index) { throw Error("Index out of range!"); }
//         this._arr.splice(index, 1);
//         this.size--;
//     }

//     get(index) {
//         if (index < 0 || this._arr.length <= index) { throw Error("Index out of range!"); }
//         return this._arr.sort((a, b) => a - b)[index];
//     }
// }

// let list = new List();
// list.add(5);
// list.add(6);
// list.add(7);
// console.log(list.get(1));
// list.remove(1);
// console.log(list.get(1));
// console.log(list.hasOwnProperty("size"));

//task 7
// class CheckingAccount {
//     constructor(clientId, email, firstName, lastName) {
//         if (clientId.length !== 6 || clientId.split("").filter(x => isNaN(x)).length > 0) {
//             throw TypeError("Client ID must be a 6-digit number");
//         }
//         if (email !== email.match(/[\w\d]+\@[\w\.]+/)[0]) {
//             throw TypeError("Invalid e-mail");
//         }

//         if (firstName.length < 3 || firstName.length > 20) { throw TypeError(`First name must be between 3 and 20 characters long`) }
//         if (lastName.length < 3 || lastName.length > 20) { throw TypeError(`Last name must be between 3 and 20 characters long`) }

//         if (firstName !== firstName.match(/[a-zA-Z]+/)[0]) { throw TypeError(`First name must contain only Latin characters`) }
//         if (lastName !== lastName.match(/[a-zA-Z]+/)[0]) { throw TypeError(`Last name must contain only Latin characters`) }
//         this.clientId = clientId;

//         this.email = email;
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
// }
// //50/100 for some reason

// // let res = 'P3trov'.match(/\w+/)[0];
// // let acc = new CheckingAccount('1314', 'ivan@some.com', 'Ivan', 'Petrov')
// //let acc = new CheckingAccount('131455', 'ivan@', 'Ivan', 'Petrov')
// //let acc = new CheckingAccount('131455', 'ivan@some.com', 'I', 'Petrov')
// // let acc = new CheckingAccount('131455', 'ivan@some.com', 'Ivan', 'P3trov')

// //new CheckingAccount('1314', 'ivan@some.com', 'Ivan', 'Petrov');//.to.throw(TypeError).which.has.property('message', 'Client ID must be a 6-digit number');
// //new CheckingAccount('131455', 'ivan@ ', 'Ivan', 'Petrov'));//.to.throw(TypeError).which.has.property('message', 'Invalid e-mail');
// //new CheckingAccount('131455', 'ivan@some.com', 'I', 'Petrov');//.to.throw(TypeError).which.has.property('message', 'First name must be between 3 and 20 characters long');
// //new CheckingAccount('131455', 'ivan@some.com', 'Ivan', 'P3trov');//.to.throw(TypeError).which.has.property('message', 'Last name must contain only Latin characters');
// //new CheckingAccount('131455', 'ivan@some.com', 'Ivan', 'Petrov');


//task 8
class Kitchen {
    constructor(budget) {
        this.budget = budget;
        this.menu = new Map();
        this.productsInStock = {};
        this.actionsHistory = [];
    }

    loadProducts(strArr) {
        return strArr.map(x => {
            let [name, quantity, price] = x.split(" ");
            let message = `There was not enough money to load ${quantity} ${name}`;
            if (this.budget >= +price) {
                this.budget -= +price;
                if (!this.productsInStock.hasOwnProperty(name)) {
                    this.productsInStock[name] = 0;
                }
                this.productsInStock[name] += Number(quantity);
                message = `Successfully loaded ${quantity} ${name}`;
            }

            this.actionsHistory.push(message);
            return message;
        }).join("\n");
    }

    addToMenu(meal, products, price) {
        let neededProducts = products.slice().reduce((acc, next) => {
            let [product, count] = next.split(" ");
            acc[product] = +count;
            return acc;
        }, {});

        if (this.menu.has(meal)) {
            return `The ${meal} is already in our menu, try something different.`;
        }
        this.menu.set(meal, { price, neededProducts });
        return `Great idea! Now with the ${meal} we have ${this.menu.size} meals on the menu, other ideas?`;
    }

    showTheMenu() {
        let menuList = [...this.menu.entries()].map(x => `${x[0]} - $ ${x[1].price}`).join("\n");
        return this.menu.size > 0 ? menuList : "Our menu is not ready yet, please come later...";
    }

    makeTheOrder(meal) {
        if (!this.menu.has(meal)) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`
        }
        let mealInfo = this.menu.get(meal);

        let allAvailable = Object.entries(mealInfo.neededProducts).reduce((acc, next) => {
            let [product, quantity] = next;
            if (!this.productsInStock.hasOwnProperty(product) || this.productsInStock[product] < quantity) {
                acc = false;
            }
            return acc;
        }, true);
        if (!allAvailable) {
            return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
        }

        this.budget += mealInfo.price;
        Object.entries(mealInfo.neededProducts).map(x => {
            let [product, quantity] = x;
            this.productsInStock[product] -= quantity;
        })

        return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${mealInfo.price}.`;
    }
}


let kitchen = new Kitchen(1000);
console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));
console.log(kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
console.log(kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));
console.log(kitchen.showTheMenu());

console.log(kitchen.makeTheOrder("frozenYogurt"));
console.log(kitchen.makeTheOrder("frozenYogurt"));
console.log(kitchen.makeTheOrder("frozenYogurt"));
console.log(kitchen.makeTheOrder("frozenYogurt"));
console.log(kitchen.makeTheOrder("frozenYogurt"));
console.log(kitchen.makeTheOrder("frozenYogurt"));
console.log(kitchen.makeTheOrder("frozenYogurt"));