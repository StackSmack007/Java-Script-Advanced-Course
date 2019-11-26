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
  let shopProducts = [];
  let userProducts = [];
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

  const formPrice = () => {
    const totalCost = userProducts.reduce(
      (acc, next) => acc + next.price * next.quantity,
      0
    );
    return `Total Price: ${totalCost.toFixed(2)}`;
  };

  function refreshPrice() {
    totalPriceEl.innerText = formPrice();
  }

  function rePopulateWithItems(converter, targetElement, data) {
    resetValues(targetElement);
    data.forEach(x => {
      targetElement.appendChild(converter(x));
    });
  }

  const populateBasketList = rePopulateWithItems.bind(
    undefined,
    productToPurchase,
    userItemsUl
  );

  const populateShopList = rePopulateWithItems.bind(
    undefined,
    productToShopItem,
    shopItemsUl
  );

  function refresh(shopProducts, popFunc, keyWord = "all") {
    let data =
      keyWord === "all"
        ? shopProducts
        : shopProducts.filter(x =>
            x.name.toLowerCase().includes(keyWord.toLowerCase())
          );

    popFunc(data);
  }

  const refreshStock = refresh.bind(undefined, shopProducts, populateShopList);

  const refreshCart = refresh.bind(undefined, userProducts, populateBasketList);

  function addNewItem(nameEl, quantityEl, priceEl, shopProducts, evnt) {
    evnt.preventDefault();
    let [name, quantity, price] = [nameEl, quantityEl, priceEl]
      .map(x => x.value)
      .map(x => (isNaN(x) || x === "" ? x : Number(x)));
    if ([name, quantity, price].some(x => x === "" || Number(x) <= 0)) {
      console.log("invalid Input!");
      return;
    }

    shopProducts.push({
      name,
      quantity,
      price
    });

    refreshStock();
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
    newEl
      .querySelector("div > button")
      .addEventListener("click", addToCart.bind(undefined, shopProducts));
    return newEl;
  }

  function productToPurchase(product) {
    return appendToParent(
      createElementWithContent("li", `${product.name}`),
      createElementWithContent("strong", `${product.price.toFixed(2)}`)
    );
  }

  addBtn.addEventListener(
    "click",
    addNewItem.bind(undefined, nameEl, quantityEl, priceEl, shopProducts)
  );

  searchBtn.addEventListener("click", searchRefresh.bind(undefined, searchEl));

  function searchRefresh(searchEl) {
    const keyPhrase = searchEl.value;
    if (keyPhrase == "") {
      refreshStock();
      return;
    }
    refreshStock(keyPhrase);
  }

  function addItemToBasket(targetContainer, item) {
    targetContainer.push({ ...item, ...{ quantity: 1 } });
  }
  const addItemToUserProducts = addItemToBasket.bind(undefined, userProducts);

  function subractItemFromShopList(container, item) {
    if (item.quantity === 1) {
      let index = container.indexOf(item);
      container.splice(index, 1);
      return;
    }
    item.quantity -= 1;
  }

  function addToCart(shopProducts, event) {
    const target = event.target;
    const itemName = target.parentNode.parentNode.children[0].innerText;
    const item = shopProducts.find(x => x.name === itemName);

    subractItemFromShopList(shopProducts, item);
    refreshStock();
    addItemToUserProducts(item);
    refreshCart();
    refreshPrice();
  }

  buyBtn.addEventListener("click", function() {
    userProducts.splice(0, userProducts.length);
    refreshCart();
    refreshPrice();
  });
}
