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

        "use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Url = {
    //key 可以为对象
    addQueryStringArg: function addQueryStringArg(url, key, value) {
        function addQueryStings(url, key, value) {

            function addQuerySting(url, key, value) {
                if (url.indexOf("?") == -1) {
                    url += "?";
                } else {
                    url += "&";
                }
                url += encodeURIComponent(key) + "=" + encodeURIComponent(value);
                return url;
            }

            if (typeof key == "object") {
                for (var k in key) {
                    url = addQuerySting(url, k, key[k]);
                }
            } else if (typeof key == "string") {
                url = addQuerySting(url, key, value);
            }
            return url;
        }

        if (url.indexOf("#") == -1) {
            url = addQueryStings(url, key, value);
        } else {
            var hash = url.split("#")[1] || "";
            url = url.split("#")[0];
            url = addQueryStings(url, key, value);
            this.addHash(url, hash);
        }
        return url;
    },
    addHash: function addHash(url, hash) {
        if (url.indexOf("#") == -1) {
            url += "#" + encodeURIComponent(hash);
        } else {
            url += encodeURIComponent(hash);
        }
        return url;
    },
    getUrlArg: function getUrlArg(name, urlSearch) {
        var regExp = new RegExp("[?&]" + name + "=([^&#]*)", "gim");
        urlSearch = urlSearch || location.href;
        if (regExp.test(urlSearch)) {
            return decodeURIComponent(RegExp["$1"]);
        } else {
            return "";
        }
    }
};

exports["default"] = Url;
module.exports = exports["default"];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});