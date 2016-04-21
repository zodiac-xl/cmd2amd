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
var _cookie = "cookie",
    _exp = "; expires=",
    _domain = "; domain=",
    doc = document;

exports["default"] = {
    /**
     * 获取cookie的值
     *
     * @method get
     * @param a {String} cookie中得key
     * @param b [placeholder]
     * @return {String}
     */
    get: function get(a, b) {
        b = doc[_cookie].match("(?:;|^)\\s*" + a + "\\s*=\\s*([^;]+)\\s*(?:;|$)");
        return b && b[1];
    },
    /**
     * 设置cookie的值
     *
     * @method set
     * @param a {String} key
     * @param b {String|Number} value
     * @param c {Date} expiration time(s)
     * @param d {String} domain
     */
    set: function set(a, b, c, d) {
        if (location.host.indexOf('meituan.com') != -1 && !d) {
            d = 'meituan.com';
        }
        b = doc[_cookie] = a + "=" + b + (c ? _exp + new Date(new Date().getTime() + c * 1000).toGMTString() : "") + (d ? _domain + d : '') + '; path=/';
    },
    /**
     * 删除cookie的值
     *
     * @method set
     * @param a {String} key
     */
    remove: function remove(a) {
        doc[_cookie] = a + "=" + _exp + new Date().toGMTString();
    }
};
module.exports = exports["default"];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});