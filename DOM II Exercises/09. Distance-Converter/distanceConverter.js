function attachEventsListeners() {
    const validateObjContent = obj => {
        let propsNotGiven = Object.keys(obj).filter(x => obj[x] === null).join(", ");
        if (propsNotGiven !== "") {
            throw Error(`not existing htmlElements: ${propsNotGiven}`);
        }
    }

    let elements = {
        convertBtn: document.getElementById("convert"),
        sourceInput: document.getElementById("inputDistance"),
        destInput: document.getElementById("outputDistance"),
        selectSourceUnit: document.getElementById("inputUnits"),
        selectDestinationUnit: document.getElementById("outputUnits"),
    };

    validateObjContent(elements);

    let ratios = {//meter to unit
        m: 1,
        km: 1000,
        cm: 1 / 100,
        mm: 1 / 1000,
        mi: 1609.34,
        in: 0.0254,
        ft: 0.3048,
        yrd: 0.9144
    }
    const unitToMeters = (ammount, unit) => ammount * ratios[unit];
    const metersToUnit = (ammount, unit) => ammount / ratios[unit];

    function convert(elements) {
        let baseAmmount = elements.sourceInput.value;
        let baseUnit = elements.selectSourceUnit.value;
        let destUnit = elements.selectDestinationUnit.value;
        elements.destInput.value = metersToUnit(unitToMeters(baseAmmount, baseUnit), destUnit);
    }

    elements.convertBtn.addEventListener("click", convert.bind(undefined, elements));
}