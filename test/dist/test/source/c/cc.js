'use strict';

define(["/dist/test/source/b.js"], function (ref_0) {

    var cmd2amdModules = {"../b.js":{"index":0,"path":"test/source/b.js"}};
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bJs = cmd2amdLoadModule('../b.js');

var _bJs2 = _interopRequireDefault(_bJs);;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});