let assert = require("chai").assert;

const PizzUni = require("../02. PizzUni_Ресурси");

describe("PizzUni testSuite", function() {
  const testEmail = "test@t.com";
  const invalidData = "invalid";
  const orderedPizza = "Italian Style";
  const orderedDrink = "Coca-Cola";
  let testObj;
  this.beforeEach(() => {
    testObj = new PizzUni();
  });

  describe("initializationTests", function() {
    it("Creates instance inizializes required properties", function() {
      assert.exists(testObj);
      assert.exists(testObj.registeredUsers);
      assert.exists(testObj.availableProducts);
      assert.exists(testObj.availableProducts.pizzas);
      assert.exists(testObj.availableProducts.drinks);
      assert.exists(testObj.orders);
    });

    it("Instance's properties have correct default values", function() {
      assert.deepEqual(testObj.registeredUsers, []);
      assert.deepEqual(testObj.availableProducts, {
        pizzas: ["Italian Style", "Barbeque Classic", "Classic Margherita"],
        drinks: ["Coca-Cola", "Fanta", "Water"]
      });
      assert.deepEqual(testObj.orders, []);
    });
  });

  describe("registerUser(email) tests", function() {
    it("Sucessfully Adds a user", function() {
      assert.equal(0, testObj.registeredUsers.length);
      const expectedResult = {
        email: testEmail,
        orderHistory: []
      };
      let actualResult = testObj.registerUser(testEmail);
      assert.deepEqual(expectedResult, actualResult);
      assert.equal(1, testObj.registeredUsers.length);
    });

    it("Throws Error if user is already enlisted", function() {
      testObj.registerUser(testEmail);
      assert.throw(() => {
        testObj.registerUser(testEmail);
      }, `This email address (${testEmail}) is already being used!`);
    });
  });

  describe("makeAnOrder(email, orderedPizza,orderedDrink) tests", function() {
    this.beforeEach(() => {
      testObj.registerUser(testEmail);
    });
    it("Throws Error if user is NOT registered", function() {
      assert.throw(() => {
        testObj.makeAnOrder(invalidData, "Italian Style", "Coca-Cola");
      }, `You must be registered to make orders!`);
    });

    it("Throws Error if Pizza is not in availableProducts", function() {
      assert.throw(() => {
        testObj.makeAnOrder(testEmail, invalidData, "Coca-Cola");
      }, "You must order at least 1 Pizza to finish the order.");
    });

    it("Creates Order Successfully", function() {
      let customer = testObj.registeredUsers.find(x => x.email === testEmail);
      assert.equal(0, customer.orderHistory);
      assert.equal(0, testObj.orders);
      let customerHistoryRecordExpected = {
        orderedPizza,
        orderedDrink
      };
      let orderIndexExpected = 0;
      let orderIndexActual = testObj.makeAnOrder(
        testEmail,
        orderedPizza,
        orderedDrink
      );
      assert.equal(orderIndexExpected, orderIndexActual);

      assert.deepEqual(customer.orderHistory, [customerHistoryRecordExpected]);

      orderRecordExpected = {
        ...customerHistoryRecordExpected,
        email: testEmail,
        status: "pending"
      };
      assert.deepEqual([orderRecordExpected], testObj.orders);
    });
  });

  describe("doesTheUserExist(email) tests", function() {
    it("Returns undefined if userNot found", function() {
      assert.isUndefined(testObj.doesTheUserExist(invalidData));
    });

    it("Returns user if email matches", function() {
      testObj.registerUser(testEmail);
      let foundUser = testObj.doesTheUserExist(testEmail);
      assert.exists(foundUser);
      assert.equal(testObj.registeredUsers[0], foundUser);
    });
  });

  describe("completeOrder(email) tests", function() {
    it("Returns undefined if no order with status pending", function() {
      assert.isUndefined(testObj.completeOrder());
    });

    it("Returns order if no order with status pending", function() {
      testObj.registerUser(testEmail);
      testObj.makeAnOrder(testEmail, orderedPizza, orderedDrink);
      let actual = testObj.completeOrder();
      let expected = testObj.orders[0];
      assert.equal("completed", actual.status);
      assert.equal(expected, actual);
    });
  });

  describe("detailsAboutMyOrder(id) tests", function() {
    it("Returns correct Data for correct index", function() {
      let expected = "Status of your order: pending";
      testObj.registerUser(testEmail);
      testObj.makeAnOrder(testEmail, orderedPizza, orderedDrink);
      assert.equal(expected, testObj.detailsAboutMyOrder(0));
    });
    it("Returns undefined for INcorrect index", function() {
      assert.isUndefined(testObj.detailsAboutMyOrder(2));
    });
  });
});
