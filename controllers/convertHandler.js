/*
*
*
*      LOGIC OF THE CONVERTER
*       
*       
*/

function ConvertHandler() {

    const UNITS = {
        'gal': 'l',
        'l': 'gal',
        'lbs': 'kg',
        'kg': 'lbs',
        'mi': 'km',
        'km': 'mi'
    }
    const DICTIONARY = {
        'gal': 'gallons',
        'mi': 'miles',
        'km': 'kilometers',
        'lbs': 'pounds',
        'kg': 'kilograms',
        'l': 'litres'
    }

    this.getNum = function (input) {
        if (input == null) {
            return 'invalid number'
        }

        const numReg = /[0-9./]+/
        const slashReg = /\//g
        const pointReg = /\./g

        const numpart = input.match(numReg);
        if (numpart == null) {
            return 1;
        }

        if (numpart[0].match(slashReg) && numpart[0].match(slashReg).length > 1) {
            return 'invalid number';
        }

        if (numpart[0].match(pointReg) && numpart[0].match(pointReg).length > 2) {
            return 'invalid number';
        }
        try {
            const num = eval(numpart[0]);
            return num;
        } catch (e) {
            return 'invalid number'
        }

    };

    this.getUnit = function (input) {
        if (input == null || input == '') {
            return 'invalid unit'
        }

        const reg = /[a-zA-Z]+/
        const unit = input.match(reg)[0].toLowerCase();
        return Object.keys(UNITS).includes(unit) ? unit : "invalid unit";
    };

    this.getReturnUnit = function (initUnit) {
        return UNITS[initUnit.toLowerCase()] || 'invalid unit';
    };

    this.spellOutUnit = function (unit) {
        return DICTIONARY[unit.toLowerCase()];
    };

    this.convert = function (initNum, initUnit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;

        const returnUnit = this.getReturnUnit(initUnit);

        switch (returnUnit) {
            case 'gal':
                return (initNum / galToL);
            case 'l':
                return (initNum * galToL);
            case 'lbs':
                return (initNum / lbsToKg);
            case 'kg':
                return (initNum * lbsToKg);
            case 'mi':
                return (initNum / miToKm);
            case 'km':
                return (initNum * miToKm);
            default:
                return 'invalid number'
        }
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {

        let result = `${initNum} ${this.spellOutUnit(initUnit)} `
            + `converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`

        return result;
    };

}

module.exports = ConvertHandler;
