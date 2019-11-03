"use strict";
function solve(name, age, weight, height) {
    const BMICalc = (weight, height) => weight * 10000 / Math.pow(height, 2);

    const StatusCalc = (bmi) => {
        const statusesMap = { underweight: 0, normal: 18.5, overweight: 25, obese: 30 };
        return Object.keys(statusesMap)
            .sort((a, b) => statusesMap[b] - statusesMap[a])
            .find(key => bmi >= statusesMap[key]);
    }

    let result = {
        name: name, personalInfo: {
            age,
            weight,
            height
        },
        BMI: Math.round(BMICalc(weight, height)),
        status: StatusCalc(BMICalc(weight, height)),
        setRecomendation: function () {
            if (this.status === "obesse") { this[recomendation] = 'admission required'; }
        }
    };
    result.setRecomendation();
    delete result.setRecomendation;
    return result;
}

console.log(solve(`Honey Boo Boo`, 9, 57, 137));