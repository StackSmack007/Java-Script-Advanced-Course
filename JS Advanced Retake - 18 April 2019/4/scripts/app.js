function validateExisting(x) {
  if (x) {
    return x;
  }
  debugger;
  throw new Error("Non existing element!");
}

function resetValues(...params) {
  params.map(x => {
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

function attachAttributes(targetEl, attributesObject) {
  //Classes can be attributes if passed in one string!
  Object.keys(attributesObject).forEach(key => {
    targetEl.setAttribute(key, attributesObject[key]);
  });
  return targetEl;
}

function hideShow(targetEl) {
  if (targetEl.style.display === "none") {
    targetEl.style.display = "block";
  } else if ((targetEl.style.display = "block")) {
    targetEl.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const createOfferPanel = validateExisting(
    document.getElementById("create-offers")
  );
  hideShow(createOfferPanel);

  const [userName, loginButton, loginErrorDiv] = [
    validateExisting(document.getElementById("username")),
    validateExisting(document.getElementById("loginBtn")),
    validateExisting(document.getElementById("notification"))
  ];

  function loginOff(evnt) {
    evnt.preventDefault();

    if (this.innerText === "Login") {
      if (userName.value.length < 4 || userName.value.length > 10) {
        loginErrorDiv.textContent =
          "The username length should be between 4 and 10 characters.";
        return;
      }
      hideShow(createOfferPanel);
      loginErrorDiv.textContent = "";
      this.textContent = "Logout";
      userName.value = `Hello ${userName.value}!`;
      attachAttributes(userName, {
        class: "form-control mr-sm-2 border-0 bg-light",
        disabled: true
      });
    } else if (this.innerText === "Logout") {
      hideShow(createOfferPanel);
      this.textContent = "Login";
      userName.value = "";
      userName.setAttribute("class", "form-control mr-sm-2");
      userName.removeAttribute("disabled");
    }
  }

  loginButton.addEventListener("click", loginOff);

  const [oNameE, oCompE, oDescE] = [
    validateExisting(document.getElementById("offerName")),
    validateExisting(document.getElementById("company")),
    validateExisting(document.getElementById("description"))
  ];

  const oCreateBtn = validateExisting(
    document.getElementById("create-offer-Btn")
  );
  const resultContainer = validateExisting(
    document.getElementById("offers-container")
  );

  function addOffer(evnt) {
    evnt.preventDefault();
    const [name, company, desc] = [oNameE.value, oCompE.value, oDescE.value];

    if ([name, company, desc].includes("")) {
      return;
    }

    resetValues(oNameE,oCompE,oDescE);
    let element = appendToParent(
      attachAttributes(createElementWithContent("div"), { class: "col-3" }),
      appendToParent(
        attachAttributes(createElementWithContent("div"), {
          class: "card text-white bg-dark mb-3 pb-3",
          style: "max-width: 18rem;"
        }),
        [
          attachAttributes(createElementWithContent("div", name), {
            class: "card-header"
          }),
          appendToParent(
            attachAttributes(createElementWithContent("div"), {
              class: "card-body"
            }),
            [
              attachAttributes(createElementWithContent("h5", company), {
                class: "card-title"
              }),
              attachAttributes(createElementWithContent("p", desc), {
                class: "card-text"
              })
            ]
          )
        ]
      )
    );

    resultContainer.appendChild(element);
  }
  oCreateBtn.addEventListener("click", addOffer);
});
