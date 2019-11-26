/*jslint es6*/
"use strict";
class Library {
  constructor(libraryName) {
    this.libraryName = libraryName;
    this.subscribers = [];
    this.subscriptionTypes = {
      normal: this.libraryName.length,
      special: this.libraryName.length * 2,
      vip: Number.MAX_SAFE_INTEGER
    };
  }

  subscribe(name, type) {
    if (!this.subscriptionTypes.hasOwnProperty(type)) {
      throw new Error(`The type ${type} is invalid`);
    }
    if (!this.subscribers.map(x => x.name).includes(name)) {
      this.subscribers.push({ name, books: [] });
    }
    let foundOne = this.locateSubscriber(name);
    foundOne["type"] = type;
    return foundOne;
  }

  locateSubscriber(name) {
    let foundOne = this.subscribers.find(x => x.name === name);
    if (foundOne === undefined) {
      throw new Error(`There is no such subscriber as ${name}`);
    }
    return foundOne;
  }

  userHaveSpaceForMoreBooks(user) {
    let maxAllowedBooks = this.subscriptionTypes[user.type];
    let userTakenBooks = user.books.length;
    return userTakenBooks < maxAllowedBooks;
  }

  unsubscribe(name) {
    this.locateSubscriber(name);
    this.subscribers = this.subscribers.filter(x => x.name !== name);
    return this.subscribers;
  }

  receiveBook(subscriberName, bookTitle, bookAuthor) {
    let foundOne = this.locateSubscriber(subscriberName);
    if (!this.userHaveSpaceForMoreBooks(foundOne)) {
      throw new Error(
        `You have reached your subscription limit ${foundOne.type}!`
      );
    }

    foundOne.books.push({ title: bookTitle, author: bookAuthor });
    return foundOne;
  }

  showInfo() {
    if (this.subscribers.length === 0) {
      return `${this.libraryName} has no information about any subscribers`;
    }
    return this.subscribers
      .map(x => {
        let subscriberInfo = `${x.name}, Type: ${x.type}`;
        let booksInfo = x.books
          .map(b => `${b.title} by ${b.author}`)
          .join(", ");
        return (
          `Subscriber: ${subscriberInfo}\n` + `Received books: ${booksInfo}\n`
        );
      })
      .join("");
  }
}

let lib = new Library("Lib");

lib.subscribe("Peter", "normal");
lib.subscribe("John", "special");

lib.receiveBook("John", "A Song of Ice and Fire", "George R. R. Martin");
lib.receiveBook("Peter", "Lord of the rings", "J. R. R. Tolkien");
lib.receiveBook("John", "Harry Potter", "J. K. Rowling");

console.log(lib.showInfo());
