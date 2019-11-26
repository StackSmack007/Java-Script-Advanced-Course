function solve() {
  const validateExisting = a => {
    if (a === null) {
      throw new Error("Member not found!");
    }
    return a;
  };

  const getNewProfit = (function() {
    let profit = 0;
    return function(a) {
      profit += a;
      return `Total Store Profit: ${profit.toFixed(2)} BGN`;
    };
  })();

  const addBookBtn = validateExisting(
    document.querySelector("body > form > button")
  );

  const profitH1 = validateExisting(
    document.querySelector("body > h1:nth-child(3)")
  );

  const [title, year, price] = Array.from(
    validateExisting(document.querySelectorAll("body > form > input"))
  );

  const outDiv = validateExisting(document.getElementById("outputs"));
  const newBooksOutDiv = validateExisting(
    document.querySelector("#outputs > section:nth-child(2) > div")
  );

  const oldBooksOutDiv = validateExisting(
    document.querySelector("#outputs > section:nth-child(1) > div")
  );

  const validateBookData = (title, year, price) =>
    typeof title === "string" &&
    title.length > 0 &&
    !isNaN(year) &&
    Number(year) > 0 &&
    !isNaN(price) &&
    Number(price) > 0;

  function createElement(tag, content) {
    let newElement = document.createElement(tag);
    if (typeof content === "string") {
      newElement.textContent = content;
      return newElement;
    }
    if (Array.isArray(content)) {
      content.forEach(x => newElement.appendChild(x));
      return newElement;
    }
    newElement.appendChild(content);
    return newElement;
  }

  function createBook(title, year, price) {
    let book = createElement("div", [
      createElement("p", `${title} [${year.toFixed(0)}]`),
      createElement("button", `Buy it only for ${price.toFixed(2)} BGN`),
      createElement("button", "Move to old section")
    ]);
    book.setAttribute("price", price);
    book.classList.add("book");
    return book;
  }

  function addBook(targetElement, info, event) {
    event.preventDefault();
    let [title, year, price] = [
      info.title.value,
      info.year.value,
      info.price.value
    ];
    if (!validateBookData(title, year, price)) {
      return;
    }

    let newBook = createBook(title, +year, +price);
    targetElement.appendChild(newBook);
    if (Number(year) < 2000) {
      moveToOldSection(newBook.children[2]);
    }
  }

  addBookBtn.addEventListener(
    "click",
    addBook.bind(undefined, newBooksOutDiv, { title, year, price })
  );

  function remove(target) {
    let wholeEntity = target.parentNode;
    wholeEntity.parentNode.removeChild(wholeEntity);
    wholeEntity.removeChild(Array.from(wholeEntity.childNodes).pop());
    return wholeEntity;
  }

  function moveToOldSection(target) {
    let entity = remove(target);
    let newPrice = +entity.getAttribute("price") * 0.85;
    entity.setAttribute("price", newPrice);
    entity.children[1].innerHTML = `Buy it only for ${newPrice.toFixed(2)} BGN`;
    oldBooksOutDiv.appendChild(entity);
  }

  const addToProfit = function(price) {
    profitH1.innerHTML = getNewProfit(price);
  };

  function buttonOperations(evnt) {
    {
      let target = evnt.target;
      if (target.tagName !== "BUTTON") {
        return;
      }

      let content = target.innerHTML;
      if (content.startsWith("Buy it only for")) {
        let element = remove(target);
        addToProfit(Number(element.getAttribute("price")));
      }
      if (content.startsWith("Move to old section")) {
        moveToOldSection(target);
      }
    }
  }

  outDiv.addEventListener("click", buttonOperations);
}
