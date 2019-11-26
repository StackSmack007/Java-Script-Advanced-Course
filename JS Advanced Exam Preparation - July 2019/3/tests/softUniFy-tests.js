/*jslint es6*/
"use strict";

const SoftUnify = require("../softUniFy");

let assert = require("chai").assert;

describe("SoftUnify Test Suite", function() {
  let testInstance;
  this.beforeEach(() => {
    testInstance = new SoftUnify();
  });

  const [testArtist, testSong, testLyrics, invalidData] = [
    "theKing",
    "smallSong",
    "shortLyrics",
    "invalid"
  ];

  describe("Initialization tests", function() {
    it("can be instantiated with string no parameters", function() {
      assert.exists(testInstance);
      assert.exists(testInstance.allSongs);
      assert.deepEqual(testInstance.allSongs, {});
    });

    describe("downloadSong(artist, song, lyrics) tests", function() {
      it("adds the given information to the allSongs", function() {
        assert.isFalse(testInstance.allSongs.hasOwnProperty(testArtist));
        let result = testInstance.downloadSong(
          testArtist,
          testSong,
          testLyrics
        );
        assert.equal(testInstance, result);
        assert.isTrue(testInstance.allSongs.hasOwnProperty(testArtist));
        const expectedRecord = {
          rate: 0,
          votes: 0,
          songs: [`${testSong} - ${testLyrics}`]
        };

        assert.deepEqual(expectedRecord, testInstance.allSongs[testArtist]);
      });
    });

    // describe("playSong(song) tests", function() {
    //   it("returns fail message if no songs at all", function() {
    //     const expectedMessage = `You have not downloaded a ${testSong} song yet. Use SoftUniFy's function downloadSong() to change that!`;
    //     const actualMessage = testInstance.playSong(testSong);
    //     assert.equal(expectedMessage, actualMessage);
    //   });

    //   it("returns fail message if no such song exist", function() {
    //     testInstance.downloadSong(testArtist, testSong, testLyrics);

    //     const expectedMessage = `You have not downloaded a ${invalidData} song yet. Use SoftUniFy's function downloadSong() to change that!`;
    //     const actualMessage = testInstance.playSong(invalidData);
    //     assert.equal(expectedMessage, actualMessage);
    //   });

    //   it("returns correctData if Song is found", function() {
    //     testInstance.downloadSong(testArtist, testSong, testLyrics);

    //     const expectedMessage = `${testArtist}:\n${testSong} - ${testLyrics}\n`;
    //     const actualMessage = testInstance.playSong(testSong);
    //     assert.equal(expectedMessage, actualMessage);
    //   });

    //   it("returns correctData if MoreThanOneSIngerSings same Song", function() {
    //     const secondArtist = "testArtist2";

    //     testInstance.downloadSong(testArtist, testSong, testLyrics);
    //     testInstance.downloadSong(invalidData, invalidData, invalidData);
    //     testInstance.downloadSong(secondArtist, testSong, testLyrics);

    //     const expectedMessage =
    //       `${testArtist}:\n${testSong} - ${testLyrics}\n` +
    //       `${secondArtist}:\n${testSong} - ${testLyrics}\n`;
    //     const actualMessage = testInstance.playSong(testSong);
    //     assert.equal(expectedMessage, actualMessage);
    //   });
    // });

    // describe("songsList() tests", function() {
    //   it("returns proper message if no songs at all", function() {
    //     const expectedMessage = "Your song list is empty";
    //     const actualMessage = testInstance.songsList;
    //     assert.equal(expectedMessage, actualMessage);
    //   });

    //   it("returns all Songs Properly", function() {
    //     testInstance.downloadSong(testArtist, testSong, testLyrics);
    //     let expectedMessage = `${testSong} - ${testLyrics}`;
    //     let actualMessage = testInstance.songsList;
    //     assert.equal(expectedMessage, actualMessage);
    //     const secondSong = "secondSong";
    //     testInstance.downloadSong(testArtist, secondSong, testLyrics);
    //     expectedMessage = `${testSong} - ${testLyrics}\n${secondSong} - ${testLyrics}`;
    //     actualMessage = testInstance.songsList;
    //     assert.equal(expectedMessage, actualMessage);
    //   });
    // });

    // describe("songsList() tests", function() {
    //   it("returns proper message if no songs at all", function() {
    //     const expectedMessage = "Your song list is empty";
    //     const actualMessage = testInstance.songsList;
    //     assert.equal(expectedMessage, actualMessage);
    //   });

    //   it("returns all Songs Properly", function() {
    //     testInstance.downloadSong(testArtist, testSong, testLyrics);
    //     let expectedMessage = `${testSong} - ${testLyrics}`;
    //     let actualMessage = testInstance.songsList;
    //     assert.equal(expectedMessage, actualMessage);
    //     const secondSong = "secondSong";
    //     testInstance.downloadSong(testArtist, secondSong, testLyrics);
    //     expectedMessage = `${testSong} - ${testLyrics}\n${secondSong} - ${testLyrics}`;
    //     actualMessage = testInstance.songsList;
    //     assert.equal(expectedMessage, actualMessage);
    //   });
    // });

    // describe("rateArtist() tests", function() {
    //   it("returns Singer Not Found message", function() {
    //     const expectedMessage = `The ${invalidData} is not on your artist list.`;
    //     let actualMessage = testInstance.rateArtist(invalidData);
    //     assert.equal(expectedMessage, actualMessage);
    //     actualMessage = testInstance.rateArtist(invalidData, 1);
    //     assert.equal(expectedMessage, actualMessage);
    //   });
    //   this.beforeEach(() => {
    //     testInstance.downloadSong(testArtist, testSong, testLyrics);
    //   });

    //   it("Modifies Singer Rate", function() {
    //     assert.equal(0, testInstance.allSongs[testArtist].rate);
    //     assert.equal(0, testInstance.allSongs[testArtist].votes);
    //     testInstance.rateArtist(testArtist, 1);
    //     assert.equal(1, testInstance.allSongs[testArtist].rate);
    //     assert.equal(1, testInstance.allSongs[testArtist].votes);
    //   });

    //   it("Returns Average Vote Singer Rate", function() {
    //     testInstance.rateArtist(testArtist, 1);
    //     testInstance.rateArtist(testArtist, 0);
    //     let actualMessage = testInstance.rateArtist(testArtist, 1);
    //     const expectedMessage = "0.67";
    //     assert.equal(expectedMessage, actualMessage);
    //     assert.equal(2, testInstance.allSongs[testArtist].rate);
    //     assert.equal(3, testInstance.allSongs[testArtist].votes);
    //   });
    // });
  });
});
