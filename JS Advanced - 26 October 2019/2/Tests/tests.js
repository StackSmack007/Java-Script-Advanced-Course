let SkiResort = require("../solution");
const assert = require("chai").assert;

describe("SkiResort", function() {
  const hotelName = "testH";
  const unfound = "unfound";
  const points = 1;
  const bedCount = 3;
  const bedsToFree = 2;
  const hotel = {
    name: hotelName,
    beds: bedCount,
    points: 0
  };
  let testInstance;
  let testName = "pamporovo";
  this.beforeEach(() => {
    testInstance = new SkiResort(testName);
  });
  describe("Instance tests", function() {
    it("properties exist with valid initial values", function() {
      assert.exists(testInstance);
      assert.equal(0, testInstance.voters);
      assert.deepEqual([], testInstance.hotels);
    });
    it("getter bestHotel returns message if no voters", function() {
      let expected = "No votes yet";
      let actual = testInstance.bestHotel;
      assert.equal(expected, actual);
    });
    it("getter bestHotel returns message some voters", function() {
      testInstance.voters = 1;
      testInstance.hotels = [
        { name: "worse", points: 1, beds: 0 },
        { name: "best", points: 2, beds: 1 },
        { name: "worse", points: 1, beds: 0 }
      ];

      let expected = `Best hotel is best with grade 2. Available beds: 1`;
      let actual = testInstance.bestHotel;
      assert.equal(expected, actual);
    });
  });

  describe("build(name, beds) tests", function() {
    it("Throws exception when name='' || beds<1 ", function() {
      assert.throws(() => {
        testInstance.build("", bedCount);
      }, "Invalid input");
      assert.throws(() => {
        testInstance.build(hotelName, 0);
      }, "Invalid input");
    });

    it("Registers hotel in .hotels and returns proper message", function() {
      let expected = `Successfully built new hotel - ${hotelName}`;
      let actual = testInstance.build(hotelName, bedCount);
      assert.equal(expected, actual);
      assert.deepEqual([hotel], testInstance.hotels);
    });
  });

  describe("book(name, beds) tests", function() {
    this.beforeEach(() => testInstance.build(hotelName, bedCount));
    it("Throws exception when name='' || beds<1 ", function() {
      assert.throws(() => {
        testInstance.build("", bedCount);
      }, "Invalid input");
      assert.throws(() => {
        testInstance.build(hotelName, 0);
      }, "Invalid input");
    });

    it("throws error if hotel not found", function() {
      assert.throws(() => {
        testInstance.book(unfound, bedCount);
      }, "There is no such hotel");
    });

    it("throws error if hotel has no free beds", function() {
      assert.throws(() => {
        testInstance.book(hotelName, bedCount + 1);
      }, "There is no free space");
    });

    it("Returns proper message and reduces beds", function() {
      let expected = "Successfully booked";
      let actual = testInstance.book(hotelName, bedCount);
      assert.equal(expected, actual);
      assert.equal(0, testInstance.hotels[0].beds);
    });
  });

  describe("leave(name, beds,points) tests", function() {
    this.beforeEach(() => testInstance.build(hotelName, bedCount));

    it("Throws exception when name='' || beds<1 ", function() {
      assert.throws(() => {
        testInstance.leave("", bedsToFree, points);
      }, "Invalid input");

      assert.throws(() => {
        testInstance.leave(hotelName, 0, points);
      }, "Invalid input");
    });

    it("throws error if hotel not found", function() {
      assert.throws(() => {
        testInstance.leave(unfound, bedsToFree, points);
      }, "There is no such hotel");
    });

    it("Returns proper message and increases beds and adds points and voters", function() {
      let expected = `${bedsToFree} people left ${hotelName} hotel`;
      let actual = testInstance.leave(hotelName, bedsToFree, points);
      assert.equal(expected, actual);

      assert.equal(bedsToFree, testInstance.voters);

      assert.equal(points * bedsToFree, testInstance.hotels[0].points);
      assert.equal(hotel.beds + bedsToFree, testInstance.hotels[0].beds);
      assert.equal(expected, actual);
    });
  });

  describe("averageGrade() tests", function() {
    it("Returns message when no voters", function() {
      let expected = "No votes yet";
      let actual = testInstance.averageGrade();
      assert.equal(expected, actual);
    });

    it("Returns message when there are voters", function() {
      testInstance.build(hotelName, bedCount);
      testInstance.build(hotelName + 2, bedCount);

      testInstance.leave(hotelName, bedsToFree, points);
      testInstance.leave(hotelName + 2, bedsToFree, 2 * points);

      let expected = `Average grade: ${(points * 1.5).toFixed(2)}`;
      let actual = testInstance.averageGrade();
      assert.equal(expected, actual);
    });
  });
});
