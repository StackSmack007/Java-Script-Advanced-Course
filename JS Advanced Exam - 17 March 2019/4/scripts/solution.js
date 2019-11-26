function solve() {
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

  const validKingdomTypes = [
    "CASTLE",
    "DUNGEON",
    "FORTRESS",
    "INFERNO",
    "NECROPOLIS",
    "RAMPART",
    "STRONGHOLD",
    "TOWER",
    "CONFLUX"
  ];

  const characterStats = {
    fighter: { atk: 50, def: 50 },
    mage: { atk: 70, def: 30 },
    tank: { atk: 20, def: 80 }
  };

  let availableKingdoms = {};

  let rebuildKingdomElements = {
    rebuildBtn: document.querySelector("#kingdom > div > button"),
    kingdomTypeInput: document.querySelector(
      "#kingdom > div > input[type=text]:nth-child(1)"
    ),
    kingNameInput: document.querySelector(
      "#kingdom > div > input[type=text]:nth-child(2)"
    )
  };

  let characterElements = {
    joinBtn: document.querySelector("#characters > div:nth-child(4) > button"),
    nameInput: document.querySelector(
      "#characters > div:nth-child(4) > input[type=text]:nth-child(1)"
    ),
    kingdomTypeInput: document.querySelector(
      "#characters > div:nth-child(4) > input[type=text]:nth-child(2)"
    ),
    warriorClassInputs: Array.from(
      document.querySelectorAll("#characters > div > input[type=radio]")
    )
  };

  let battleElements = {
    attackBtn: document.querySelector("#actions > button"),
    attackerTypeInput: document.querySelector(
      "#actions > input[type=text]:nth-child(2)"
    ),
    defenderTypeInput: document.querySelector(
      "#actions > input[type=text]:nth-child(3)"
    )
  };

  function rebuildKingdom(kingdomType, kingName) {
    let kingdomDiv = getKingdomDiv(kingdomType);
    if (kingdomDiv.style.display !== "none") {
      alert("already rebuilt kingdom!");
      return;
    }

    kingdomDiv.style.display = "inline-block";
    appendToParent(kingdomDiv, [
      createElementWithContent("H1", kingdomType),
      attachAttributes(createElementWithContent("div"), {
        class: `castle`
      }),
      createElementWithContent("H2", kingName),
      createElementWithContent("fieldset", [
        createElementWithContent("legend", "Army"),
        createElementWithContent("p", "TANKS - 0"),
        createElementWithContent("p", "FIGHTERS - 0"),
        createElementWithContent("p", "MAGES - 0"),
        attachAttributes(createElementWithContent("div"), {
          class: `armyOutput`
        })
      ])
    ]);

    availableKingdoms[kingdomType] = {
      kingNameP: kingdomDiv.querySelector("h1:nth-child(3)"),
      tankP: kingdomDiv.querySelector("fieldset > p:nth-child(2)"),
      fighterP: kingdomDiv.querySelector("fieldset > p:nth-child(3)"),
      mageP: kingdomDiv.querySelector("fieldset > p:nth-child(4)"),
      armyDiv: kingdomDiv.querySelector("fieldset > div"),
      atkTotal: 0,
      defTotal: 0
    };
  }

  function getKingdomDiv(kingdomType) {
    return document.getElementById(kingdomType.toLowerCase());
  }

  rebuildKingdomElements.rebuildBtn.addEventListener("click", activateKingdom);
  function activateKingdom() {
    let kingdomType = rebuildKingdomElements.kingdomTypeInput.value.toUpperCase();
    let kingName = rebuildKingdomElements.kingNameInput.value.toUpperCase();

    if (kingName.length < 2) {
      console.log("Invalid king-name");
      rebuildKingdomElements.kingNameInput.value = "";
      return;
    }

    if (!validKingdomTypes.includes(kingdomType)) {
      console.log("Invalid kingdom-type");
      rebuildKingdomElements.kingdomTypeInput.value = "";
      return;
    }

    rebuildKingdom(kingdomType, kingName);
    resetValues(
      rebuildKingdomElements.kingdomTypeInput,
      rebuildKingdomElements.kingNameInput
    );
  }

  function enlistCharacter(characterType, kingdomType, characterName) {
    let stats = characterStats[characterType];
    let kingdomFound = availableKingdoms[kingdomType];
    let fractionParagraph = kingdomFound[characterType + "P"];
    let currentCount = fractionParagraph.innerText.split(" - ")[1];
    fractionParagraph.innerText = fractionParagraph.innerText.replace(
      currentCount,
      +currentCount + 1
    );
    availableKingdoms[kingdomType].armyDiv.textContent += " " + characterName;
    kingdomFound.atkTotal += stats.atk;
    kingdomFound.defTotal += stats.def;
  }

  characterElements.joinBtn.addEventListener("click", addCharacter);
  function addCharacter() {
    let characterName = characterElements.nameInput.value;
    let kingdomType = characterElements.kingdomTypeInput.value.toUpperCase();
    let characterType = characterElements.warriorClassInputs.find(
      x => x.checked
    ).value;

    if (characterName.length < 2) {
      console.log("Invalid Character Name!");
      characterElements.nameInput.value = "";
      return;
    }

    if (!availableKingdoms.hasOwnProperty(kingdomType)) {
      console.log("Unrecognised Kingdom !");
      characterElements.kingdomTypeInput = "";
      return;
    }

    enlistCharacter(characterType, kingdomType, characterName);
  }

  function doBattle(attacker, defender) {
    if (attacker.atkTotal <= defender.defTotal) {
      console.log("Draw noone wins!");
      return;
    }

    defender.kingNameP.innerText = attacker.kingNameP.innerText;
  }

  battleElements.attackBtn.addEventListener("click", combat);
  function combat() {
    let attackerType = battleElements.attackerTypeInput.value.toUpperCase();
    let defenderType = battleElements.defenderTypeInput.value.toUpperCase();
    if (!availableKingdoms.hasOwnProperty(attackerType)) {
      console.log("unfound attacker kingdom type!");
      battleElements.attackerTypeInput.value = "";
      return;
    }
    if (!availableKingdoms.hasOwnProperty(defenderType)) {
      console.log("unfound defender kingdom type!");
      battleElements.defenderTypeInput.value = "";
      return;
    }

    doBattle(availableKingdoms[attackerType], availableKingdoms[defenderType]);
  }
}

solve();
