import { MOCK } from "./MOCK_DATA.js";
const recordsCount = 10;

const sortRecords = (data, criteria, type) => {
  let order = (type, a, b) =>
    ["", "d"].includes(type.toLowerCase()) ? [b, a] : [a, b];

  return data.sort((a, b) => {
    const elmnts = order(type, a[criteria], b[criteria]);

    if (!isNaN(a[criteria])) {
      return Number(elmnts[0]) - Number(elmnts[1]);
    }
    if (typeof a[criteria] === "string") {
      return elmnts[0].localeCompare(elmnts[1]);
    }
    if (Array.isArray(a[criteria])) {
      return elmnts[0].length - elmnts[1].length;
    }

    return 0;
  });
};

const provideRecords = (allData, count, criteria = "", type = "") => {
  let records = allData.slice(0, count);
  if (criteria !== "") {
    return sortRecords(records, criteria.toLowerCase(), type);
  }
  return records;
};

const attachToParent = function(target, source) {
  if (Array.isArray(source)) {
    source.forEach(x => {
      target.appendChild(x);
    });
    return target;
  }

  target.appendChild(source);
  return target;
};

const createElement = function(tag, content = "") {
  let newElement = document.createElement(tag);
  if (typeof content !== "object") {
    newElement.innerHTML = content;
    return newElement;
  }

  return attachToParent(newElement, content); //adds one or multiple elements to the parent one
};

const createElements = function(tag, contentArr) {
  return contentArr.reduce((a, b) => {
    a.push(createElement(tag, b));
    return a;
  }, []);
};

const validateExisting = x => {
  if (x === null) {
    debugger;
    throw new Error("non existing parameter;");
  }
  return x;
};

const createElementWithAttributes = function(tag, attr, content = "") {
  let isPlural = Array.isArray(content);
  let result = isPlural
    ? createElements(tag, content)
    : createElement(tag, content);
  Object.entries(attr).forEach(([key, value]) => {
    if (isPlural) {
      result[0].setAttribute(key, value);
      result = result.map(x => {
        console.log(x);
        x.setAttribute(key, value);
        return x;
      });
    } else {
      result.setAttribute(key, value);
    }
  });
  return result;
};

function main(records) {
  const headColumnInfo = {
    avatar: { translation: "Аватар", sortable: false },
    id: { translation: "Ид.N", sortable: true },
    first_name: { translation: "Име", sortable: true },
    last_name: { translation: "Фамилия", sortable: true },
    email: { translation: "Имейл", sortable: true },
    gender: { translation: "Пол", sortable: true },
    ip_address: { translation: "IP адрес", sortable: true },
    friends: { translation: "Приятели", sortable: true }
  };

  const resultDiv = validateExisting(document.getElementById("result"));
  const createHeadRow = function(colInfo) {
    let headRow = createElement("tr");
    headRow.id = "sortableHeadRow";
    let elements = Array.from(Object.keys(colInfo)).map(x => {
      let newTh = createElement("th");
      if (colInfo[x].sortable) {
        attachToParent(
          newTh,
          createElementWithAttributes(
            "a",
            { sortName: x, href: "#" },
            colInfo[x].translation
          )
        );
      } else {
        attachToParent(newTh, createElement("p", colInfo[x].translation));
      }
      return newTh;
    });
    return attachToParent(headRow, elements); //returns parent!
  };

  const createDataRow = function(obj) {
    let dataRow = createElement("tr");
    let subElements = [];
    subElements.push(
      createElement(
        "td",
        createElementWithAttributes("img", { src: obj.avatar })
      )
    );

    [...Object.keys(obj)].slice(1, 7).forEach(key => {
      subElements.push(createElement("td", obj[key]));
    });

    subElements.push(
      createElement(
        "td",
        createElement(
          "ul",
          createElements(
            "li",
            obj.friends.map(el => `${el["first_name"]} ${el["last_name"]}`)
          )
        )
      )
    );
    let result = attachToParent(dataRow, subElements); //returns parent!
    return result;
  };

  let tableElement = createElement("table", "");
  let contentRows = records.map(x => createDataRow(x));
  let tablecontent = [createHeadRow(headColumnInfo), ...contentRows];
  attachToParent(resultDiv, attachToParent(tableElement, tablecontent));

  document
    .getElementById("sortableHeadRow")
    .addEventListener("click", sortCol.bind(undefined, resultDiv));

  function sortCol(resultDiv, evnt) {
    evnt.preventDefault();
    if (evnt.target.hasAttribute("sortName")) {
      resultDiv.innerHTML = "";
      const criteria = evnt.target.getAttribute("sortName");
      const newRecords = provideRecords(MOCK, recordsCount, criteria);
      console.log(newRecords.map(x => x.id));
      main(newRecords);
    }
  }
}

document.addEventListener(
  "DOMContentLoaded",
  main.bind(undefined, provideRecords(MOCK, recordsCount))
);