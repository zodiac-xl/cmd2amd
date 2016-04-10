'use strict';

define([dependsPlaceholder], function (refersPlaceholder) {

    var cmd2amdModules = cmd2amdModulesPlaceholder;
    var cmd2amdModulesRef = arguments;

    var packedModule = (function () {
        var module = {};
        var exports = {};
        var process={env:{NODE_ENV:'production'}};

        function cmd2amdLoadModule(moduleName) {
            var refer = null;
            var _thisModule = cmd2amdModules[moduleName];
            if (_thisModule) {
                refer = (_thisModule.external && window[_thisModule.external])|| cmd2amdModulesRef[_thisModule.index];
            }else{
                console.error(moduleName + 'can not find refer');
            }
            return refer;
        };

        callbackPlaceholder

        return module == {} ? null : (!module.exports) ? (exports) : module.exports;
    })();
    return packedModule;
});