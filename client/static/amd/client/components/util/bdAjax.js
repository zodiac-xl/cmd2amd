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
var bdAjax = function bdAjax(options) {
    var defer = $.Deferred();
    options = $.extend({
        url: "",
        type: 'GET',
        dataType: "json",
        des: '未知接口', //接口描述
        bd: false, //是BD接口 （/api/）
        admin: false, //是admin接口 (/api/admin/),
        showSuccess: false //是否toastr 提示成功信息
    }, options);

    if (!options.bd && !options.admin) {
        //如果没有明确标识是bd还是admin的接口 需要通过环境自动转换接口

        //JAVA通过bd接口构建admin接口 所以前端bd接口可以自动转化为admin接口 而admin接口不能转化为
        //可以相互转换的接口 统一使用bd接口 再在这里通过环境判断转化接口
        if (window.isAdmin && !/admin/.test(options.url)) {
            if (/api/.test(options.url)) {
                options.url = options.url.replace("/api", "/api/admin");
            }
        }
    }

    $.ajax(options).done(function (e) {
        //一般主动返回错误是200 +success false，抛异常是200 + error
        if (e.error || e.success != undefined && !e.success) {
            var message = e.error && e.error.message || '' || e.message || '';
            var failDes = options.des + "失败" + (message ? "：" + message : "");
            e.des = failDes;
            defer.reject(e);
            toastr.error(failDes);
            console.error(options.des + "失败：" + (message || e.status || "no message  or status code"));
        } else {
            var successDes = options.des + "成功";
            e.des = successDes;
            defer.resolve(e);
            if (options.showSuccess) {
                toastr.success(e.des);
            }
            console.info(successDes);
        }
    }).fail(function (e) {
        var failDes = options.des + "失败" + (e.message ? "：" + e.message : "");
        e.des = failDes;
        defer.reject(e);

        toastr.error(failDes);
        console.error(options.des + "失败：" + (e.message || e.status || "no message or status code"));
    });

    return defer.promise();
};

exports["default"] = bdAjax;
module.exports = exports["default"];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});