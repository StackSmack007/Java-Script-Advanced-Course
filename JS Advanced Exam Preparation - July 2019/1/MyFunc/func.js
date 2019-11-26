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
  if (typeof content === "string") {
    result.textContent = content_s;
  } else if (Array.isArray(content_s)) {
    content.forEach(x => {
      result.appendChild(x);
    });
  } else if (content instanceof HTMLElement) {
    result.appendChild(content);
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
    target.setAttribute(key, attributesObject[key]);
  });
  return targetEl;
}
