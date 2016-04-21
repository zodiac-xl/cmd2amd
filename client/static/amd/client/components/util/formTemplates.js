'use strict';

define(["/amd/client/components/util/bdAjax.js"], function (ref_0) {

    var cmd2amdModules = {"./bdAjax.js":{"index":0,"path":"client/components/util/bdAjax.js"}};
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _bdAjaxJs = cmd2amdLoadModule('./bdAjax.js');

var _bdAjaxJs2 = _interopRequireDefault(_bdAjaxJs);

var FormTemplates = {
    templates: [],
    inited: false,

    init: function init() {
        var _this = this;
        (0, _bdAjaxJs2["default"])({
            url: "/api/apply/form/templates.json",
            type: "GET",
            async: false,
            des: "获取表单模板列表"
        }).done(function (e) {
            _this.templates = e.data;
        });
    },
    getTemplateByType: function getTemplateByType(applyType) {
        var template = null;
        this.init();

        this.templates.some(function (item) {
            if (item.applyType == applyType) {
                template = item.formTemplate;
                return true;
            }
        });
        return template;
    }
};

exports["default"] = FormTemplates;
module.exports = exports["default"];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});