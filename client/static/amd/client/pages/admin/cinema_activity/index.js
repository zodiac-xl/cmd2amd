'use strict';

define(["/amd/client/components/business/apply/apply.js","/amd/client/components/business/apply/apply-formTemplate.js","/amd/client/components/business/record-form/record-form.js","/amd/client/components/layout/page-transition-layout.js"], function (ref_2,ref_3,ref_4,ref_5) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"../../../components/business/apply/apply":{"index":0,"path":"client/components/business/apply/apply.js"},"../../../components/business/apply/apply-formTemplate":{"index":1,"path":"client/components/business/apply/apply-formTemplate.js"},"../../../components/business/record-form/record-form":{"index":2,"path":"client/components/business/record-form/record-form.js"},"../../../components/layout/page-transition-layout":{"index":3,"path":"client/components/layout/page-transition-layout.js"}};
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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = cmd2amdLoadModule('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = cmd2amdLoadModule('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _componentsBusinessApplyApply = cmd2amdLoadModule('../../../components/business/apply/apply');

var _componentsBusinessApplyApply2 = _interopRequireDefault(_componentsBusinessApplyApply);

var _componentsBusinessApplyApplyFormTemplate = cmd2amdLoadModule('../../../components/business/apply/apply-formTemplate');

var _componentsBusinessApplyApplyFormTemplate2 = _interopRequireDefault(_componentsBusinessApplyApplyFormTemplate);

var _componentsBusinessRecordFormRecordForm = cmd2amdLoadModule('../../../components/business/record-form/record-form');

var _componentsBusinessRecordFormRecordForm2 = _interopRequireDefault(_componentsBusinessRecordFormRecordForm);

var _componentsLayoutPageTransitionLayout = cmd2amdLoadModule('../../../components/layout/page-transition-layout');

var _componentsLayoutPageTransitionLayout2 = _interopRequireDefault(_componentsLayoutPageTransitionLayout);

var CinemaActivity = (function (_Page) {
    _inherits(CinemaActivity, _Page);

    function CinemaActivity() {
        _classCallCheck(this, _CinemaActivity);

        _get(Object.getPrototypeOf(_CinemaActivity.prototype), 'constructor', this).apply(this, arguments);
    }

    var _CinemaActivity = CinemaActivity;
    CinemaActivity = (0, _componentsLayoutPageTransitionLayout.page)(CinemaActivity) || CinemaActivity;
    return CinemaActivity;
})(_componentsLayoutPageTransitionLayout2['default']);

exports['default'] = CinemaActivity;

$(function () {
    var $body = $("body");

    //申请操作
    var applyContainer = document.getElementById("container-apply");
    $body.delegate(".J_operate-apply", "click", function () {
        var $_this = $(this);
        var apply = $_this.closest("td").data("apply");
        var cinemaId = null;
        var cinemaName = null;
        if (apply.operateType == 'new') {
            cinemaId = apply.cinemaId;
            cinemaName = apply.cinemaName;
        }
        var props = {
            applyId: apply.applyId,
            applyType: apply.applyType,
            versionType: apply.versionType,
            operateType: apply.operateType,
            cinemaId: cinemaId,
            cinemaName: cinemaName,
            common: apply.common,
            custom: apply.custom
        };

        _reactDom2['default'].unmountComponentAtNode(applyContainer);
        var component = _reactDom2['default'].render(_react2['default'].createElement(_componentsBusinessApplyApply2['default'], props), applyContainer);
    });

    //BD反馈模板设置
    $(".J_edit-template").click(function () {
        var container = document.getElementById("container-apply-form-template");
        _reactDom2['default'].unmountComponentAtNode(container);
        var component = _reactDom2['default'].render(_react2['default'].createElement(_componentsBusinessApplyApplyFormTemplate2['default'], null), container);
    });

    //申请记录
    var applyRecordContainer = document.getElementById("container-record-apply");
    $body.delegate(".J_record-apply", "click", function () {
        var $_this = $(this);
        var apply = $_this.closest("td").data("apply");
        var props = {
            applyId: apply.applyId,
            applyType: 1,
            versionType: apply.versionType,
            cinemaId: apply.cinemaId,
            cinemaName: apply.cinemaName
        };
        _reactDom2['default'].unmountComponentAtNode(applyRecordContainer);
        var component = _reactDom2['default'].render(_react2['default'].createElement(_componentsBusinessRecordFormRecordForm2['default'], props), applyRecordContainer);
    });

    //申请记录中已上线 状态可以查看
    $body.delegate('.J_check_in_record-apply', 'click', function () {
        var $this = $(this);
        var props = {
            applyId: $this.data('applyid'),
            applyType: $this.data('applytype'),
            operateType: 'check'

        };
        _reactDom2['default'].unmountComponentAtNode(applyRecordContainer);
        _reactDom2['default'].unmountComponentAtNode(applyContainer);
        var component = _reactDom2['default'].render(_react2['default'].createElement(_componentsBusinessApplyApply2['default'], props), applyContainer);
    });
});
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});