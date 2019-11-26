function addProduct() {
  function validateExisting(x) {
    if (x) {
      return x;
    }
    debugger;
    throw new Error("Non existing element!");
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

  function appendToParrent(parrent, ...element_s) {
    if (element_s.some(x => !(x instanceof HTMLElement))) {
      debugger;
      throw new Error("Arguments contain Non - Html Elements!");
    }
    element_s.forEach(x => {
      parrent.appendChild(x);
    });
    return parrent;
  }

  function attachAttributes(targetEl, attributesObject) {
    //Classes can be attributes if passed in one string!
    Object.keys(attributesObject).forEach(key => {
      targetEl.setAttribute(key, attributesObject[key]);
    });
    return targetEl;
  }

  let nameInput = validateExisting(
    document.querySelector(
      "#add-product > label:nth-child(2) > input[type=text]"
    )
  );
  let priceInput = validateExisting(
    document.querySelector(
      "#add-product > label:nth-child(3) > input[type=number]"
    )
  );

  let priceTd = validateExisting(
    document.querySelector("#bill > tfoot > tr > td:nth-child(2)")
  );

  let productsTBody = validateExisting(document.getElementById("product-list"));

  const fetchFilledPrices = function() {
    return (
      Array.from(document.querySelectorAll("#product-list > tr > td:nth-child(2)")).reduce(
        (a, b) => a + Number(b.innerText),
        0
      ) || 0
    );
  };

  let addProduct = function(productsTBody, priceTd, nameInput, priceInput) {
    if (
      nameInput.value === "" ||
      priceInput.value === "" ||
      isNaN(priceInput.value) ||
      Number(priceInput.value) < 0
    ) {
      return; //validation of input!
    }
    const [name, price] = [nameInput.value, Number(priceInput.value)];
    nameInput.value = "";
    priceInput.value = "";
    addProduct(productsTBody, priceTd, nameInput, priceInput);
    appendToParrent(
      productsTBody,
      createElementWithContent("tr", [
        createElementWithContent("td", name),
        createElementWithContent("td", price)
      ])
    );
    priceTd.innerText = fetchFilledPrices();
  };

  addProduct(productsTBody, priceTd, nameInput, priceInput);
}
