function solve() {
  let inputField = document.querySelector("#exercise > textarea:nth-child(2)");
  let generateBtn = document.querySelector("#exercise > button:nth-child(3)");
  let tableBody = document.querySelector("#exercise > div > div > div > div > table > tbody");
  let purchaseBtn = document.querySelector("#exercise > button:nth-child(6)");
  let purchaseInfoTextArea = document.querySelector("#exercise > textarea:nth-child(5)")

  const createElement = function (tag, innerHtml = "void") {
    let element = document.createElement(tag);
    if (innerHtml !== "void") { element.innerHTML = innerHtml; }
    return element;
  }

  const generateRowContent = (obj) =>
    `<td><img src="${obj.img}"></td>
     <td><p>${obj.name}</p></td>
     <td><p>${obj.price}</p></td>
     <td><p>${obj.decFactor}</p></td>
     <td><input type="checkbox" /></td>`;

  const createRowElement = function (tbodyElement, obj) {
    let rowElement = createElement("tr");
    rowElement.innerHTML = generateRowContent(obj);
    tbodyElement.appendChild(rowElement);
  };

  generateBtn.addEventListener("click", function () {
    let inputText = inputField.value;
    if (inputText === "") { return; }
    let furnitures = JSON.parse(inputText);
    furnitures.map(x => createRowElement(tableBody, x));
  });

  purchaseBtn.addEventListener("click", function () {
    let checkedElements = Array.from(document.querySelectorAll("input[type=checkbox]"))
      .filter(x => x.checked);
    let purchaseItems = checkedElements.map(x => {
      return {
        name: x.parentNode.parentNode.querySelectorAll("td > p")[0].textContent,
        price: +x.parentNode.parentNode.querySelectorAll("td > p")[1].textContent,
        decFac: +x.parentNode.parentNode.querySelectorAll("td > p")[2].textContent
      }
    });

    let names = purchaseItems.map(x => x.name).join(", ");
    let totalPrice = purchaseItems.reduce((acc, next) => acc + next.price, 0).toFixed(2);
    let decFactor = purchaseItems.reduce((acc, next, _, arr) => acc + next.decFac / arr.length, 0);
    purchaseInfoTextArea.value = `Bought furniture: ${names}\n` + `Total price: ${totalPrice}\n` + `Average decoration factor: ${decFactor}`;
  });
}



// function solve() {
//   let inputField = document.querySelector("#exercise > textarea:nth-child(2)");
//   let generateBtn = document.querySelector("#exercise > button:nth-child(3)");
//   let tableBody = document.querySelector("#exercise > div > div > div > div > table > tbody");
//   let purchaseBtn = document.querySelector("#exercise > button:nth-child(6)");
//   let purchaseInfoTextArea = document.querySelector("#exercise > textarea:nth-child(5)")

//   const createElement = function (tag, content = "void") {
//     let element = document.createElement(tag);
//     if (content !== "void") { element.textContent = content; }
//     return element;
//   }

//   const wrapInTd = (elm) => {
//     let result = createElement("td");
//     result.appendChild(elm);
//     return result;
//   }

//   let createRowElement = function (tbodyElement, obj) {
//     let rowElement = createElement("tr");
//     let children = [];

//     let imgElement = createElement("img");
//     imgElement.setAttribute("src", obj.img);
//     children.push(wrapInTd(imgElement));

//     children.push(wrapInTd(createElement("p", obj.name)));
//     children.push(wrapInTd(createElement("p", obj.price)));
//     children.push(wrapInTd(createElement("p", obj.decFactor)));

//     let checkBoxElement = createElement("input");
//     checkBoxElement.setAttribute("type", "checkbox");
//     children.push(wrapInTd(checkBoxElement));

//     children.map(x => rowElement.appendChild(x));
//     tbodyElement.appendChild(rowElement);
//   }

//   generateBtn.addEventListener("click", function () {
//     let inputText = inputField.value;
//     if (inputText === "") { return; }
//     let furnitures = JSON.parse(inputText);
//     furnitures.map(x => createRowElement(tableBody, x));
//   });

//   purchaseBtn.addEventListener("click", function () {
//     let checkedElements = Array.from(document.querySelectorAll("input[type=checkbox]"))
//       .filter(x => x.checked);
//     let purchaseItems = checkedElements.map(x => {
//       return {
//         name: x.parentNode.parentNode.querySelectorAll("td > p")[0].textContent,
//         price: +x.parentNode.parentNode.querySelectorAll("td > p")[1].textContent,
//         decFac: +x.parentNode.parentNode.querySelectorAll("td > p")[2].textContent
//       }
//     });
//     let names = purchaseItems.map(x => x.name).join(", ");
//     let totalPrice = purchaseItems.reduce((acc, next) => acc + next.price, 0).toFixed(2);
//     let decFactor = purchaseItems.reduce((acc, next, _, arr) => acc + next.decFac / arr.length, 0);

//     let result = `Bought furniture: ${names}\n` + `Total price: ${totalPrice}\n` + `Average decoration factor: ${decFactor}`;
//     purchaseInfoTextArea.value = result;
//   });
// }