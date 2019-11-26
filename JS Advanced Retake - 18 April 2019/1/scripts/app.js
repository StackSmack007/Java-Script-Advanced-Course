document.addEventListener("DOMContentLoaded", function() {
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
    if (typeof content_s === "string") {
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
  let submitBtn = validateExisting(
    document.querySelector("#add-product > button")
  );

  let priceTd = validateExisting(
    document.querySelector("#bill > tfoot > tr > td:nth-child(2)")
  );

  let productsTBody = validateExisting(document.getElementById("product-list"));

  let addProduct = function(productsTBody, priceTd, nameInput, priceInput) {
    let totalPrice = 0;

    return function() {
      if (
        nameInput.value === "" ||
        isNaN(priceInput.value) ||
        Number(priceInput.value) <= 0
      ) {
        return; //validation of input!
      }
      const [name, price] = [nameInput.value, Number(priceInput.value)];
      nameInput.value = "";
      priceInput.value = "";

      totalPrice += price;
      priceTd.innerText = totalPrice.toFixed(2);

      appendToParrent(
        productsTBody,
        createElementWithContent("tr", [
          createElementWithContent("td", name),
          createElementWithContent("td", price.toFixed(2))
        ])
      );
    };
  };

  submitBtn.addEventListener(
    "click",
    addProduct.bind(undefined, productsTBody, priceTd, nameInput, priceInput)
  );
});