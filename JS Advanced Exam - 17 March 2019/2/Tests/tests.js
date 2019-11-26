/*jslint es6 */

const FilmStudio = require("../filmStudio");

let expect = require("chai").expect;
let assert = require("chai").assert;

describe("FilmStudio tests", function() {
  const studioName = "testSTD";
  const movieName = "Die Hard";
  const testRoles = ["good", "bad", "ugly"];
  const newActorName = "actor1";
  const invalid = "invalid";
  const testMovie = {
    filmName: movieName,
    filmRoles: [
      { actor: false, role: testRoles[0] },
      { actor: false, role: testRoles[1] },
      { actor: false, role: testRoles[2] }
    ]
  };
  let testInstance;
  this.beforeEach(() => (testInstance = new FilmStudio(studioName)));
  describe("Inizialization tests", function() {
    it("Has All Properties", function() {
      assert.deepEqual([], testInstance.films);
      assert.equal(studioName, testInstance.name);
    });
  });

  describe("makeMovie(filmName, roles) tests", function() {
    it("Throws error if more or less arguments given", function() {
      assert.throws(() => {
        testInstance.makeMovie(1);
      }, "Invalid arguments count");
      assert.throws(() => {
        testInstance.makeMovie(1, 1, 1);
      }, "Invalid arguments count");
    });

    it("Throws error if invalid argument types given", function() {
      assert.throws(() => {
        testInstance.makeMovie(1, testRoles);
      }, "Invalid arguments");
      assert.throws(() => {
        testInstance.makeMovie(movieName, 1);
      }, "Invalid arguments");
    });

    it("Returns the movie", function() {
      let actual = testInstance.makeMovie(movieName, testRoles);
      assert.deepEqual(testMovie, actual);
    });

    it("Adds the movie", function() {
      testInstance.makeMovie(movieName, testRoles);
      assert.equal(1, testInstance.films.length);
      testInstance.makeMovie(movieName, testRoles);
      testInstance.makeMovie(movieName, testRoles);
      assert.equal(3, testInstance.films.length);
    });

    it("Adds the movie with sequal", function() {
      testInstance.makeMovie(movieName, testRoles);
      assert.equal(movieName, testInstance.films[0].filmName);
      for (let i = 2; i < 5; i++) {
        let expected = `${movieName} ${i}`;
        let actual = testInstance.makeMovie(movieName, testRoles).filmName;
        assert.equal(expected, actual);
      }
    });
  });

  describe("casting(actor, role) tests", function() {
    it("Returns message if no movies yet", function() {
      let actual = testInstance.casting("someActor", "someRole");
      let expected = `There are no films yet in ${studioName}.`;
      assert.equal(expected, actual);
    });

    it("Returns no such role message", function() {
      testInstance.makeMovie(movieName, testRoles);
      const unfoundRole = "noSuchRole";
      let actual = testInstance.casting(newActorName, unfoundRole);
      let expected = `${newActorName}, we cannot find a ${unfoundRole} role...`;
      assert.equal(expected, actual);
    });

    it("Adding Actor For valid Role Returns Proper Message", function() {
      testInstance.makeMovie(movieName, testRoles);
      let actual = testInstance.casting(newActorName, testRoles[0]);
      let expected = `You got the job! Mr. ${newActorName} you are next ${testRoles[0]} in the ${movieName}. Congratz!`;
      assert.equal(expected, actual);
    });

    it("Enlists Actor properly", function() {
      testInstance.makeMovie(movieName, testRoles);
      testInstance.makeMovie(movieName, testRoles);
      testInstance.casting(newActorName, testRoles[0]);
      assert.equal(newActorName, testInstance.films[0].filmRoles[0].actor);
      assert.equal(false, testInstance.films[0].filmRoles[1].actor);
      assert.equal(false, testInstance.films[1].filmRoles[0].actor);
      assert.equal(false, testInstance.films[1].filmRoles[1].actor);
    });
  });

  describe("lookForProducer(filmName) tests", function() {
    it("ThrowsError if no such film esist", function() {
      assert.throw(() => {
        testInstance.lookForProducer(invalid);
      }, `${invalid} do not exist yet, but we need the money...`);
    });

    it("Returns correct Data when movie found", function() {
      testInstance.makeMovie(movieName, testRoles);
      testInstance.makeMovie("anotherMovie", ["oneRoleOnly"]);
      testInstance.casting("bradatiq", testRoles[0]);
      testInstance.casting("kosmatiq", testRoles[1]);
      testInstance.casting("rogatiq", testRoles[2]);
      let actual = testInstance.lookForProducer(movieName);
      let expected =
        "Film name: Die Hard\nCast:\nbradatiq as good\nkosmatiq as bad\nrogatiq as ugly\n";
      assert.equal(expected, actual);
    });
  });
});
