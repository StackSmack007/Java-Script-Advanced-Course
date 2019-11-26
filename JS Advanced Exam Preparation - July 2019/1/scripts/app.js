function acceptance() {
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

  const [
    shippingCompany,
    productName,
    productQuantity,
    productScrape
  ] = Array.from(document.querySelectorAll("#fields input")).map(x =>
    validateExisting(x)
  );

  const outputDiv = validateExisting(document.getElementById("warehouse"));
  const addButton = validateExisting(document.getElementById("acceptance"));
  console.log("all is super good");

  function isValidData(data) {
    return (
      data.shippingCompany !== "" &&
      data.productName !== "" &&
      typeof data.productQuantity === "number" &&
      typeof data.productScrape === "number" &&
      data.productQuantity > Math.max(0, data.productScrape)
    );
  }

  function addRecord(outputDiv, elements) {
    let data = Array.from(Object.entries(elements)).reduce((acc, next) => {
      acc[next[0]] = isNaN(next[1].value)
        ? next[1].value
        : Number(next[1].value);
      return acc;
    }, {});

    if (!isValidData(data)) {
      return;
    }

    Array.from(Object.keys(elements)).forEach(key => {
      elements[key].value = "";
    });

    let newProduct = createElementWithContent("div", [
      createElementWithContent(
        "p",
        `[${data.shippingCompany}] ${
          data.productName
        } - ${data.productQuantity - data.productScrape} pieces`
      ),
      attachAttributes(createElementWithContent("button", "Out of stock"), {
        type: "button"
      })
    ]);

    outputDiv.appendChild(newProduct);

    function removeParent() {
      this.parentNode.parentNode.removeChild(this.parentNode);
    }

    newProduct.children[1].addEventListener("click", removeParent);
  }

  addButton.addEventListener(
    "click",
    addRecord.bind(undefined, outputDiv, {
      shippingCompany,
      productName,
      productQuantity,
      productScrape
    })
  );
}
