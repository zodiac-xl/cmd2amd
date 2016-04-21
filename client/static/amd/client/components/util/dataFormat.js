'use strict';

define([], function () {

    var cmd2amdModules = {};
    var cmd2amdModulesRef = arguments;

    var packedModule = (function () {
        var module = {};
        var exports = {};
        var process = { env: { NODE_ENV: 'production' } };

        function cmd2amdLoadModule(moduleName) {
            var refer = null;
            var _thisModule = cmd2amdModules[moduleName];
            if (_thisModule) {
                refer = _thisModule.external && window[_thisModule.external] || cmd2amdModulesRef[_thisModule.index];
            } else {
                console.error(moduleName + 'can not find refer');
            }
            return refer;
        };

        'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var mapObject = function mapObject(object, callback) {
    return Object.keys(object).map(function (key, keyIndex) {
        return callback(object[key], key, keyIndex);
    });
};

var toFinancialNumber = function toFinancialNumber(num) {
    num = parseFloat(num);
    if (num !== num) return '';
    return num.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
};

var addSign = function addSign(num) {
    num = Number(num);
    num = Number.isNaN(num) ? '' : num;
    return (num > 0 ? '+' : '') + num;
};

exports['default'] = {
    mapObject: mapObject,
    toFinancialNumber: toFinancialNumber,
    addSign: addSign
};
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});