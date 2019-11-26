/*jslint es6 */

const AutoService = require("../source");

let assert = require("chai").assert;

describe("Testing", function() {
  let testInstance;
  const dataAlt1 = "invalid";
  const testGuarageCappacity = 1;
  const clientName = "test";
  const plateNumber = "plN1";
  const carInfo = {
    engine: "MFRGG23",
    transmission: "FF4418ZZ",
    doors: "broken"
  };
  const expectedClient = {
    plateNumber,
    clientName,
    carInfo
  };
  this.beforeEach(() => {
    testInstance = new AutoService(testGuarageCappacity);
  });
  describe("Inicialization tests", function() {
    it("Contains requiredProperties with expected values", function() {
      assert.exists(testInstance);
      assert.exists(testInstance.garageCapacity);
      assert.equal(testGuarageCappacity, testInstance.garageCapacity);
      assert.deepEqual(testInstance.workInProgress, []);
      assert.deepEqual(testInstance.backlogWork, []);
    });

    it("Has setter that works properly", function() {
      assert.equal(testGuarageCappacity - 0, testInstance.availableSpace);
      testInstance.workInProgress.push({});
      assert.equal(testGuarageCappacity - 1, testInstance.availableSpace);
    });
  });

  describe("signupForReview(clientName, plateNumber, carInfo) tests", function() {
    it("puts order in workInProgress", function() {
      assert.equal(0, testInstance.workInProgress.length);
      assert.equal(0, testInstance.backlogWork.length);

      testInstance.signUpForReview(clientName, plateNumber, carInfo);
      assert.deepEqual([expectedClient], testInstance.workInProgress);
      assert.equal(0, testInstance.backlogWork.length);
    });

    it("puts order in backlogWork", function() {
      testInstance.signUpForReview(clientName, plateNumber, carInfo);
      testInstance.signUpForReview(clientName, plateNumber, carInfo);
      assert.deepEqual([expectedClient], testInstance.workInProgress);
      assert.deepEqual([expectedClient], testInstance.backlogWork);
    });
  });

  describe("carInfo(clientName, plateNumber)  tests", function() {
    it("returns unfound Car message when car not found in empty records", function() {
      let expectedMessage = `There is no car with platenumber ${plateNumber} and owner ${clientName}.`;
      let actualMessage = testInstance.carInfo(plateNumber, clientName);
      assert.equal(expectedMessage, actualMessage);
    });

    it("returns unfound Car message when car containers full", function() {
      testInstance.signUpForReview(clientName, plateNumber, carInfo);
      testInstance.signUpForReview(clientName, plateNumber, carInfo);

      let expectedMessage = `There is no car with platenumber ${dataAlt1} and owner ${dataAlt1}.`;
      let actualMessage = testInstance.carInfo(dataAlt1, dataAlt1);
      assert.equal(expectedMessage, actualMessage);
    });

    it("returns foundCar when car found in workInProgress", function() {
      testInstance.garageCapacity = 2;
      testInstance.signUpForReview(dataAlt1, plateNumber, carInfo);
      testInstance.signUpForReview(clientName, plateNumber, carInfo);
      testInstance.signUpForReview(clientName, plateNumber, carInfo);
      testInstance.signUpForReview(dataAlt1, plateNumber, carInfo);

      testInstance.signUpForReview(dataAlt1, plateNumber, carInfo);
      testInstance.signUpForReview(clientName, plateNumber, carInfo);
      let result = testInstance.carInfo(plateNumber, clientName);
      assert.deepEqual(expectedClient, result);
      assert.equal(testInstance.workInProgress[1], result);
    });

    it("returns foundCar when car found in backlogWork", function() {
      testInstance.signUpForReview(dataAlt1, plateNumber, carInfo);

      testInstance.signUpForReview(dataAlt1, plateNumber, carInfo);
      testInstance.signUpForReview(clientName, plateNumber, carInfo);
      testInstance.signUpForReview(dataAlt1, plateNumber, carInfo);

      let result = testInstance.carInfo(plateNumber, clientName);
      assert.deepEqual(expectedClient, result);
    });
  });

  describe("repairCar() tests", function() {
    it("returns message if no clients", function() {
      let expectedMessage = `No clients, we are just chilling...`;
      let actualMessage = testInstance.repairCar();
      assert.equal(expectedMessage, actualMessage);
    });

    it("returns all good message if all good", function() {
      testInstance.signUpForReview(clientName, plateNumber, {
        engine: "good",
        wheels: "good"
      });
      let expectedMessage = `Your car was fine, nothing was repaired.`;
      let actualMessage = testInstance.repairCar();
      assert.equal(expectedMessage, actualMessage);
      assert.equal(0, testInstance.workInProgress.length);
    });

    it("returns repairs car successfully", function() {
      testInstance.signUpForReview(clientName, plateNumber, carInfo);
      testInstance.signUpForReview(clientName, plateNumber, {
        windows: "broken",
        engine: "broken"
      });

      testInstance.signUpForReview(dataAlt1, dataAlt1, carInfo);

      let expectedMessage = "Your doors were repaired.";
      assert.equal(1, testInstance.workInProgress.length);
      let actualMessage = testInstance.repairCar();
      assert.equal(expectedMessage, actualMessage);
      assert.equal(0, testInstance.workInProgress.length);

      assert.equal(2, testInstance.backlogWork.length);
      expectedMessage = "Your windows and engine were repaired.";
      actualMessage = testInstance.repairCar();
      assert.equal(expectedMessage, actualMessage);
      assert.equal(1, testInstance.backlogWork.length);
    });
  });
});
