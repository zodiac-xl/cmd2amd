"use strict";
var _cookie = "cookie",
_exp = "; expires=",
_domain = "; domain=",
doc = document;

export default {
    /**
     * 获取cookie的值
     *
     * @method get
     * @param a {String} cookie中得key
     * @param b [placeholder]
     * @return {String}
     */
    get: function (a, b) {
        b = doc[_cookie].match("(?:;|^)\\s*" + a + "\\s*=\\s*([^;]+)\\s*(?:;|$)");
        return b && b[1]
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
    set: function (a, b, c, d) {
        if (location.host.indexOf('meituan.com') != -1 && !d) {
            d = 'meituan.com'
        }
        b = doc[_cookie] = a + "=" + b + (c ? _exp + (new Date(new Date().getTime() + c * 1000)).toGMTString() : "") + (d ? _domain + d : '') + '; path=/';
    },
    /**
     * 删除cookie的值
     *
     * @method set
     * @param a {String} key
     */
    remove: function (a) {
        doc[_cookie] = a + "=" + _exp + new Date().toGMTString()
    }
};

