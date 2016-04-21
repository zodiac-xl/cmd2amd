let mapObject = (object, callback)=> {
    return Object.keys(object).map(function (key, keyIndex) {
        return callback(object[key], key, keyIndex);
    });
};

let toFinancialNumber = num => {
    num = parseFloat(num);
    if (num !== num) return '';
    return num.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
};

let addSign = num => {
    num = Number(num);
    num = Number.isNaN(num) ? '' : num;
    return (num > 0 ? '+' : '') + num;
};

export default {
    mapObject,
    toFinancialNumber,
    addSign
};
