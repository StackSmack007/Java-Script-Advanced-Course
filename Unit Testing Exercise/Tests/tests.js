/*jslint es6 */

const tasks = require("../tasks");

let expect = require('chai').expect;
let assert = require('chai').assert;
//2
// const isOddOrEven = tasks.isOddOrEven;
// describe("isOddOrEven tests", function () {
//     it("1 => undefined", function () {
//         assert.equal(isOddOrEven(1), undefined);
//     });
//     it("{} => undefined", function () {
//         assert.equal(isOddOrEven({}), undefined);
//     });
//     it("'' => even", function () {
//         assert.equal(isOddOrEven(''), "even");
//     });
//     it("'1' => odd", function () {
//         assert.equal(isOddOrEven('1'), "odd");
//     });
//     it("'1a' => even", function () {
//         assert.equal(isOddOrEven('1a'), "even");
//     });
// });

// //3
// const lookupChar = tasks.lookupChar;
// // o	If the first parameter is NOT a string or the second parameter is NOT a number - return undefined.
// // o	If both parameters are of the correct type but the value of the index is incorrect (bigger than or equal to the string length or a negative number) - return "Incorrect index". 
// // o	If both parameters have correct types and values - return the character at the specified index in the string.

// let testCases = [
//     [{}, 1, undefined],
//     ["", {}, undefined],
//     ["", 1.2, undefined],
//     [{}, {}, undefined],
//     ["correct", -1, 'Incorrect index'],
//     ["", 0, 'Incorrect index'],
//     ["correct", 7, 'Incorrect index'],
//     ["correct", -9, 'Incorrect index'],
//     ["correct", 9, 'Incorrect index'],
//     ["correct", 0, 'c'],
//     ["correct", 1, 'o'],
//     ["correct", 6, 't']
// ];

// describe("lookupChar tests", function () {
//     testCases.forEach(x => {
//         it(`${x[0]},${x[1]}=>${x[2]}`, function () {
//             assert.equal(lookupChar(x[0], x[1]), x[2]);
//         })
//     })
// })

// //4
// const mathEnforcer = tasks.mathEnforcer;

// //	addFive(num) - A function that accepts a single parameter:
// //	If the parameter is NOT a number, the funtion should return undefined.
// //	If the parameter is a number, add 5 to it, and return the result.

// //	subtractTen(num) - A function that accepts a single parameter:
// //	If the parameter is NOT a number, the function should return undefined.
// //	If the parameter is a number, subtract 10 from it, and return the result.

// //	sum(num1, num2) - A function that accepts two parameters:
// //	If any of the 2 parameters is NOT a number, the function should return undefined.
// //	If both parameters are numbers, the function should return their sum. 

// describe("mathEnforcer tests", function () {
//     describe("addFive(num) tests", function () {
//         it("Returns undefined num!=number", function () {
//             assert.equal(mathEnforcer.addFive({}), undefined);
//             assert.equal(mathEnforcer.addFive("23"), undefined);
//         });
//         it("Returns num+5 when num is number", function () {
//             assert.equal(mathEnforcer.addFive(5), 10);
//             let result = Math.floor(100 * mathEnforcer.addFive(5.32)) / 100;
//             assert.equal(result, 10.32);
//             assert.equal(mathEnforcer.addFive(15), 20);
//             assert.equal(mathEnforcer.addFive(-6), -1);
//         });
//     });

//     describe("subtractTen(num) tests", function () {
//         it("Returns undefined if non number given", function () {
//             assert.equal(mathEnforcer.subtractTen({}), undefined);
//             assert.equal(mathEnforcer.subtractTen("23"), undefined);
//         });
//         it("Returns num-10 when num is number", function () {
//             let result = Math.floor(100 * mathEnforcer.subtractTen(15.32)) / 100;
//             assert.equal(result, 5.32);
//             assert.equal(mathEnforcer.subtractTen(1), -9);
//             assert.equal(mathEnforcer.subtractTen(10), 0);
//             assert.equal(mathEnforcer.subtractTen(-10), -20);
//         });
//     });

//     describe("sum(num1, num2) tests", function () {
//         it("Returns undefined if num1 not number", function () {
//             assert.equal(mathEnforcer.subtractTen({}, 1), undefined);
//             assert.equal(mathEnforcer.subtractTen("1", 1), undefined);
//         });
//         it("Returns undefined if num2 not number", function () {
//             assert.equal(mathEnforcer.sum(1, {}), undefined);
//             assert.equal(mathEnforcer.sum(1, "1"), undefined);
//         });
//         it("Returns num1 + num2 when both numbers", function () {
//             assert.equal(mathEnforcer.sum(1, 1), 2);
//             assert.equal(mathEnforcer.sum(1, 0), 1);
//             assert.equal(mathEnforcer.sum(1, -1), 0);
//             assert.equal(mathEnforcer.sum(-1, 0), -1);
//             assert.equal(mathEnforcer.sum(-1, -1), -2);
//             let result = Math.floor(100 * mathEnforcer.sum(5.32, 1.1)) / 100;
//             assert.equal(result, 6.42);
//         });
//     });
// });

//5
// const StringBuilder = tasks.stringBuilder;

// describe("StringBuilder class tests", function () {
//     const compareArrays = function (arr1, arr2) {
//         return arr1.length === arr2.length &&
//             arr1.reduce((a, b, index) => {
//                 if (arr2[index] !== b) { a = false; }
//                 return a;
//             }, true);
//     };

//     describe("Inizialization tests:", function () {
//         it("Can be initialized without parameters,undefined or empty string", function () {
//             assert.exists(new StringBuilder());
//             assert.exists(new StringBuilder(undefined));
//             assert.exists(new StringBuilder(""));
//         });

//         it("No parameters,undefined or empty string given creates empty array", function () {
//             assert.isTrue(new StringBuilder()._stringArray.length === 0);
//             assert.isTrue(new StringBuilder(undefined)._stringArray.length === 0);
//             assert.isTrue(new StringBuilder("")._stringArray.length === 0);
//         });

//         it("Throws exception if non empty string given", function () {
//             assert.throws(() => new StringBuilder(1), 'Argument must be string');
//         });
//     });

//     let testSb;
//     let initialArr;
//     this.beforeEach(() => {
//         testSb = new StringBuilder("test");
//         initialArr = testSb._stringArray.slice();
//     });

//     describe("append(string) tests:", function () {
//         it("Throws error if argument is not string", function () {
//             assert.throws(() => testSb.append(1), 'Argument must be string');
//             assert.throws(() => testSb.append({}), 'Argument must be string');
//             assert.throws(() => testSb.append(undefined), 'Argument must be string');
//         });

//         it("Do not change array if empty string given", function () {
//             testSb.append("");
//             assert.isTrue(compareArrays(initialArr, testSb._stringArray));
//         });

//         it("Appends correctly given string", function () {
//             let prefix = "12A";
//             let expected = initialArr.join("") + prefix;
//             testSb.append(prefix);
//             assert.equal(expected, testSb._stringArray.join(""));
//         });
//     });

//     describe("prepend(string) tests:", function () {
//         it("Throws error if argument is not string", function () {
//             assert.throws(() => testSb.prepend(1), 'Argument must be string');
//             assert.throws(() => testSb.prepend({}), 'Argument must be string');
//             assert.throws(() => testSb.prepend(undefined), 'Argument must be string');
//         });

//         it("Do not change array if empty string given", function () {
//             testSb.prepend("");
//             assert.isTrue(compareArrays(initialArr, testSb._stringArray));

//             it("Prepends correctly given string", function () {
//                 let sufix = "12A";
//                 let expected = sufix + initialArr.join("");
//                 testSb.prepend(sufix);
//                 assert.equal(expected, testSb._stringArray.join(""));
//             });
//         });
//     });

//     describe("toString() tests:", function () {
//         it("Returns all elements joined by empty string", function () {
//             assert.equal(testSb.toString(), initialArr.join(""));
//             testSb.append("a");
//             testSb.prepend("b");
//             assert.equal(testSb.toString(), 'b' + initialArr.join("") + 'a');
//         });
//     });

//     describe("insertAt(string, index) tests:", function () {
//         it("throws Error if paramameter type missmatch", function () {
//             assert.throws(() => testSb.insertAt(1, 0), 'Argument must be string');
//         });

//         it("Inserts if paramameter correctInput", function () {
//             let insertPhrase = "t2a";
//             let insertIndex = 1;
//             testSb.insertAt(insertPhrase, insertIndex);
//             let expected = initialArr.slice(0, insertIndex)
//                 .concat(insertPhrase.split(""))
//                 .concat(initialArr.slice(insertIndex));
//             assert.isTrue(compareArrays(expected, testSb._stringArray));
//         });
//     });

//     describe("remove(start, end) tests:", function () {
//         it("Removes if paramameter correctInput", function () {
//             let startIndex = 1;
//             let count = 2;
//             testSb.remove(startIndex, count);
//             let expected = initialArr.slice();
//             expected.splice(startIndex, count);
//             assert.isTrue(compareArrays(expected, testSb._stringArray));
//         });
//     });
// });

//6
// const PaymentPackage = tasks.paymentPackage;

// describe("PaymentPack test Suite", function () {
//     describe("Initialization Tests", function () {
//         it("Throws Error('Name must be a non-empty string') when incorrect string given", function () {
//             assert.throw(() => new PaymentPackage(1, 1), "Name must be a non-empty string");
//             assert.throw(() => new PaymentPackage("", 1), "Name must be a non-empty string");
//         });
//         it("Throws Error('Value must be a non-negative number') when incorrect value given", function () {
//             assert.throw(() => new PaymentPackage("a", -1), "Value must be a non-negative number");
//             assert.throw(() => new PaymentPackage("a", "1"), "Value must be a non-negative number");
//         });
//         it("Can be instantiated with two parameters - a string name and number value", function () {
//             let [name, value] = ["name", 1];
//             let testInstance = new PaymentPackage(name, value);
//             assert.exists(testInstance);
//         });
//     });
//     describe("Getters And Setters tests", function () {
//         let [name, value] = ["name", 1];
//         let expectedInitialVat = 20;
//         let expectedActive = true;
//         let testInstance;

//         this.beforeEach(() => {
//             testInstance = new PaymentPackage(name, value);
//         });

//         it("Can be instantiated with two parameters - a string name and number value", function () {
//             assert.equal(testInstance._name, name);
//             assert.equal(testInstance._value, value);
//             assert.equal(testInstance._VAT, expectedInitialVat);
//             assert.equal(testInstance._active, expectedActive);
//         });

//         it("Accessors work", function () {
//             assert.equal(testInstance.name, name);
//             assert.equal(testInstance.value, value);
//             assert.equal(testInstance.VAT, expectedInitialVat);
//             assert.equal(testInstance.active, expectedActive);
//         });

//         it("Setters work when proper input given", function () {
//             let [exp_name, exp_value, exp_active, exp_vat] = ["changedName", 2, false, 13];

//             testInstance.name = exp_name;
//             assert.equal(testInstance.name, exp_name);

//             testInstance.value = exp_value;
//             assert.equal(testInstance.value, exp_value);

//             testInstance.active = exp_active;
//             assert.equal(testInstance.active, exp_active);

//             testInstance.VAT = exp_vat;
//             assert.equal(testInstance.VAT, exp_vat);
//         });

//         it("Setters throw when incorrect input given", function () {
//             let wrongData = [
//                 { propName: "name", values: ["", {}], errMessage: "Name must be a non-empty string" },
//                 { propName: "value", values: [-1, {}], errMessage: "Value must be a non-negative number" },
//                 { propName: "active", values: ["strinG", {}], errMessage: "Active status must be a boolean" },
//                 { propName: "VAT", values: [-1, {}], errMessage: "VAT must be a non-negative number" }
//             ];

//             wrongData.forEach(x => {
//                 x.values.forEach(inp => {
//                     assert.throws(() => {
//                         testInstance[x.propName] = inp
//                     }, x.errMessage)
//                 })
//             });
//         });
//     });

//     describe("Function toString() - return a string, containing an overview of the instance", function () {
//         let [name, value] = ["name", 1];
//         let testInstance;
//         this.beforeEach(() => {
//             testInstance = new PaymentPackage(name, value);
//         });

//         it("If package is active, returns correct result", function () {
//             let expectedMessage = "Package: name\n- Value (excl. VAT): 1\n- Value (VAT 20%): 1.2";
//             assert.equal(expectedMessage, testInstance.toString())
//         });

//         it("If package is not active it returns label inactive", function () {
//             testInstance.active = false;
//             let expectedMessage = "Package: name (inactive)\n- Value (excl. VAT): 1\n- Value (VAT 20%): 1.2";
//             assert.equal(expectedMessage, testInstance.toString())
//         });
//     });
// });

//7
const Warehouse = tasks.warehouse;

describe("Warehouse testSuite", function () {
    describe("Initialization testing", function () {
        it("Creates class correctly if capacity is positive number", function () {
            assert.exists(new Warehouse(1));
        });
        it("Throws Error if parameter <=0 or non-number", function () {
            assert.throw(() => { new Warehouse(0) }, "Invalid given warehouse space");
            assert.throw(() => { new Warehouse(-1) }, "Invalid given warehouse space");
            assert.throw(() => { new Warehouse("strinG") }, "Invalid given warehouse space");
        });
    });

    let initialCappacity = 10;
    let testInstance;
    this.beforeEach(() => {
        testInstance = new Warehouse(initialCappacity);
    });

    describe("addProduct(type, product, quantity) testing", function () {
        it("Adds the given product if there is space in the warehouse and return the object with the given type with already added products.", function () {
            let type = "Food";
            let productName = "hot-dog";
            let quantity = 1;
            let productsResult = testInstance.addProduct(type, productName, quantity);
            let productsExpected = { "hot-dog": quantity };
            assert.equal(JSON.stringify(productsExpected), JSON.stringify(productsResult));
            assert.equal(testInstance.availableProducts[type][productName], quantity);
        });
        it("Adds the given product if space=== quantity", function () {
            let type = "Food";
            let productName = "hot-dog";
            let productsResult = testInstance.addProduct(type, productName, initialCappacity);
            let productsExpected = { "hot-dog": initialCappacity };
            assert.equal(JSON.stringify(productsExpected), JSON.stringify(productsResult));
            assert.equal(testInstance.availableProducts[type][productName], initialCappacity);
        });

        it("Throws string if not enough cappacity", function () {
            let type = "Food";
            let productName = "hot-dog";
            let quantity = initialCappacity + 1;
            assert.throw(() => { testInstance.addProduct(type, productName, quantity); }, "There is not enough space or the warehouse is already full");
        });

        describe("occupiedCapacity() testing", function () {
            it("Adds the given product if there is space in the warehouse and return the object with the given type with already added products.", function () {
                assert.equal(0, testInstance.occupiedCapacity());
                let type = "Food";
                let productName = "hot-dog";
                let quantity = 1;
                testInstance.addProduct(type, productName, quantity);
                assert.equal(quantity, testInstance.occupiedCapacity());
            });
        });


        describe("orderProducts(type) testing", function () {
            it("orderProducts(type) orders products. descending by quantity", function () {
                let type = "Drink";
                let productsUnsorted = {
                    "Fanta": 2,
                    "Sprite": 1,
                    "Soda": 3,
                };

                Object.entries(productsUnsorted).forEach(([name, quantity]) => {
                    testInstance.addProduct(type, name, quantity);
                });

                assert.equal(JSON.stringify(productsUnsorted), JSON.stringify(testInstance.availableProducts[type]));

                let orderedProductsExpected = {
                    "Soda": 3,
                    "Fanta": 2,
                    "Sprite": 1,
                };

                let orderedProductsActual = testInstance.orderProducts(type);
                assert.equal(JSON.stringify(orderedProductsExpected), JSON.stringify(orderedProductsActual));
                let innerProductsState = testInstance.availableProducts[type];
                assert.equal(JSON.stringify(innerProductsState), JSON.stringify(orderedProductsActual));
            });
        });

        describe("revision() testing", function () {
            it("revision() prints correct data if SOME products added", function () {
                let quantity = 1;
                let type = "Food";
                let productName = "hot-dog";
                testInstance.addProduct(type, productName, quantity);
                let expected = "Product type - [Food]\n- hot-dog 1\nProduct type - [Drink]";
                let actual = testInstance.revision();
                assert.equal(expected, actual);
            });
            it("revision() prints correct data if NO products added", function () {
                let expected = "The warehouse is empty";
                let actual = testInstance.revision();
                assert.equal(expected, actual);
            });
        });

        describe("scrapeAProduct(product, quantity) testing", function () {
            it("If we cannot find the given product we return the string:", function () {
                let quantity = 1;
                let productName = "unExisting";
                assert.throw(() => {
                    testInstance.scrapeAProduct(productName, quantity);
                }, `${productName} do not exists`);
            });
            it("Reduces Quantity the product when quantity more than input parameter", function () {
                let quantity = 2;
                let type = "Food";
                let productName = "hot-dog";
                testInstance.addProduct(type, productName, quantity);
                let removeQuantity = 1;
                let actual = testInstance.scrapeAProduct(productName, removeQuantity);
                let expected = { "hot-dog": quantity - removeQuantity };
                assert.equal(JSON.stringify(expected), JSON.stringify(actual))
            });

            it("Sets Quantity=0 the product when quantity > input parameter", function () {
                let quantity = 2;
                let type = "Food";
                let productName = "hot-dog";
                testInstance.addProduct(type, productName, quantity);
                let removeQuantity = 3;
                let actual = testInstance.scrapeAProduct(productName, removeQuantity);
                let expected = { "hot-dog": 0 };
                assert.equal(JSON.stringify(expected), JSON.stringify(actual))
            });
        });
    });
});