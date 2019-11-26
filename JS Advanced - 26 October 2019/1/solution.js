function solve() {
  function validateExisting(x) {
    if (x) {
      return x;
    }
    debugger;
    throw new Error("Non existing element!");
  }

  function resetValues(...params) {
    params.map(x => {
      if (x.value === "") {
        x.innerHTML = "";
        return;
      }
      x.value = "";
    });
  }

  function createElementWithContent(tag, content_s) {
    //Content is optional
    let result = document.createElement(tag);
    if (["string", "number"].includes(typeof content_s)) {
      result.textContent = content_s;
    } else if (Array.isArray(content_s)) {
      content_s.forEach(x => {
        result.appendChild(x);
      });
    } else if (content_s instanceof HTMLElement) {
      result.appendChild(content_s);
    }
    return result;
  }

  function appendToParent(parrent, element_s) {
    element_s = Array.isArray(element_s) ? element_s : [element_s];
    if (element_s.some(x => !(x instanceof HTMLElement))) {
      debugger;
      throw new Error("Arguments contain Non - Html Elements!");
    }
    element_s.forEach(x => {
      parrent.appendChild(x);
    });
    return parrent;
  }
  ////////////////////////////////////////////////////////////////////////////
  const addButtonText = `Add to Client's List`;
  let cost = 0;
  const [nameEl, quantityEl, priceEl] = Array.from(
    document.querySelectorAll("#add-new > input")
  ).map(x => validateExisting(x));

  const searchEl = validateExisting(document.getElementById("filter"));
  const searchBtn = validateExisting(
    document.querySelector("#products > div > button")
  );

  const addBtn = validateExisting(document.querySelector("#add-new > button"));
  const shopItemsUl = validateExisting(
    document.querySelector("#products > ul")
  );
  const userItemsUl = validateExisting(
    document.querySelector("#myProducts > ul")
  );

  const totalPriceEl = validateExisting(
    document.querySelector("body > h1:nth-child(4)")
  );

  const buyBtn = validateExisting(
    document.querySelector("#myProducts > button")
  );

  function refreshPrice() {
    totalPriceEl.innerText = `Total Price: ${cost.toFixed(2)}`; //ToFixed???
  }

  addBtn.addEventListener("click", addToShopList);

  function addToShopList(evnt) {
    evnt.preventDefault();
    let [name, quantity, price] = [nameEl, quantityEl, priceEl]
      .map(x => x.value)
      .map(x => (isNaN(x) || x === "" ? x : Number(x)));
    if ([name, quantity, price].some(x => x === "" || Number(x) <= 0)) {
      console.log("invalid Input!");
      return;
    }

    let newElement = productToShopItem({
      name,
      quantity,
      price
    });
    shopItemsUl.appendChild(newElement);
  }

  function productToShopItem(product) {
    let newEl = createElementWithContent("li", [
      createElementWithContent("span", `${product.name}`),
      createElementWithContent("strong", `Available: ${product.quantity}`),
      appendToParent(createElementWithContent("div"), [
        createElementWithContent("strong", `${product.price.toFixed(2)}`),
        createElementWithContent("button", addButtonText)
      ])
    ]);
    newEl.querySelector("div > button").addEventListener("click", addToCart);
    return newEl;
  }

  function addToCart(evnt) {
    let name = evnt.target.parentNode.parentNode.firstChild.textContent;
    let price = Number(evnt.target.previousSibling.textContent);
    cost += price;
    refreshPrice();
    let quantity = Number(
      evnt.target.parentNode.previousSibling.textContent.split(": ")[1]
    );
    if (quantity > 1) {
      evnt.target.parentNode.previousSibling.textContent = `Available: ${quantity -
        1}`; 
    } else {
      evnt.target.parentNode.parentNode.parentNode.removeChild(
        evnt.target.parentNode.parentNode
      );
    }
    let newPurchase = createPurchaseItem(name, price);
    userItemsUl.appendChild(newPurchase);
  }

  function createPurchaseItem(name, price) {
    return appendToParent(
      createElementWithContent("li", `${name}`),
      createElementWithContent("strong", `${price.toFixed(2)}`) //ToFixed???
    );
  }

  searchBtn.addEventListener("click", showHide);

  function showHide() {
    let phrase = searchEl.value.toLowerCase();
    let selectedItems = Array.from(shopItemsUl.children).map(el => {
      if (el.firstChild.textContent.toLowerCase().includes(phrase)) {
        el.style.display = "";
      } else {
        el.style.display = "none";
      }
      return el;
    });
  }

  buyBtn.addEventListener("click", function() {
    userItemsUl.innerHTML = "";
    cost = 0;
    refreshPrice();
  });
}
