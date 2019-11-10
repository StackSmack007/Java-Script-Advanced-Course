function toggle() {

    const validateObjContent = obj => {
        let propsNotGiven = Object.keys(obj).filter(x => obj[x] === null).join(", ");
        if (propsNotGiven !== "") {
            throw Error(`not existing htmlElements: ${propsNotGiven}`);
        }
    }

    let elements = {
        lessMoreBtn: document.getElementsByClassName("button")[0],
        textDiv: document.getElementById("extra"),
        status: function () {
            return this.lessMoreBtn.innerHTML;
        },
        availableStatuses: new Map([
            ["Less", "block"],
            ["More", "none"]]
        ),
        togle: function () {
            let nextStatusInfo = [...this.availableStatuses.entries()]
                .find(x => x[0].toLowerCase() !== this.status().toLowerCase())
            if (!nextStatusInfo) { return }
            this.lessMoreBtn.innerHTML = nextStatusInfo[0];
            this.textDiv.style.display = nextStatusInfo[1];
        }
    }

    elements.togle();
}