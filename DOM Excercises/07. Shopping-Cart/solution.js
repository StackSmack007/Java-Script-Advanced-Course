/*jslint es6 */
"use strict";
function solve() {
   const removeListeners = elem => {
      var cleanElem = elem.cloneNode(true);
      elem.parentNode.replaceChild(cleanElem, elem);
   }

   let cart = new Map();
   let addBtns = Array.from(document.querySelectorAll("button.add-product"));
   let chkBtn = document.querySelectorAll("button.checkout")[0];
   let targetContainer = document.querySelector("body > div > textarea");

   let addFunc = function (btn) {
      let price = btn.target.parentNode.parentNode.querySelector("div.product-line-price").textContent;
      let name = btn.target.parentNode.parentNode.querySelector("div.product-details > div.product-title").textContent;
      if (cart.has(name)) { return; }
      cart.set(name, +price);
      let message = `Added ${name} for ${price} to the cart.\n`;
      targetContainer.textContent += message;
   };

   addBtns.map(x => x.addEventListener("click", addFunc));

   chkBtn.addEventListener("click", function () {
      let productNames = Array.from(cart.keys()).join(", ");
      let totalCost = Array.from(cart.values()).reduce((acc, next) => acc + next, 0);
      let message = `You bought ${productNames} for ${totalCost.toFixed(2)}.`;
      targetContainer.textContent += message;
      addBtns.map(x => removeListeners(x));
      removeListeners(this);
   })
}