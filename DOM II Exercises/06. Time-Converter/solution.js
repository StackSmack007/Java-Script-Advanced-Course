function attachEventsListeners() {
    let convertor = {
        buttons: Array.from(document.querySelectorAll("#daysBtn,#hoursBtn,#minutesBtn,#secondsBtn")),
        days: {
            element: document.getElementById("days"),
            secAmmount: 60 * 60 * 24
        },
        hours: {
            element: document.getElementById("hours"),
            secAmmount: 60 * 60
        },
        minutes: {
            element: document.getElementById("minutes"),
            secAmmount: 60
        },
        seconds: {
            element: document.getElementById("seconds"),
            secAmmount: 1
        },

        validateSelf: function () {
            if (this.buttons.length !== 4 || this.days.element === null || this.minutes.element === null || this.seconds.element === null) {
                throw Error(`missing html content!`);
            }
        },

        uiqueTimeWriten: function () {
            return [this.days, this.hours, this.minutes, this.seconds]
                .map(x => (+x.element.value) * x.secAmmount)
                .filter((el, inx, arr) => arr.indexOf(el) === inx && arr.lastIndexOf(el) === inx && el !== 0)[0];
        }
    };

    convertor.validateSelf();

    let btnHandler = function (elm) {
        let totalTime = elm.uiqueTimeWriten();

        [elm.days, elm.hours, elm.minutes, elm.seconds].map(x => {
            x.element.value = totalTime / x.secAmmount;
        })
    }

    convertor.buttons.map(x => x.addEventListener("click", btnHandler.bind(undefined, convertor)));
}