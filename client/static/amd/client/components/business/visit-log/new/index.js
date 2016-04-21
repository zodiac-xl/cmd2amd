'use strict';

define(["/amd/client/components/common/simple-modal.js","/amd/client/components/business/visit-log/new/visitlog-modal-body.js"], function (ref_0,ref_1) {

    var cmd2amdModules = {"../../../common/simple-modal":{"index":0,"path":"client/components/common/simple-modal.js"},"./visitlog-modal-body":{"index":1,"path":"client/components/business/visit-log/new/visitlog-modal-body.js"}};
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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _commonSimpleModal = cmd2amdLoadModule('../../../common/simple-modal');

var _commonSimpleModal2 = _interopRequireDefault(_commonSimpleModal);

var _visitlogModalBody = cmd2amdLoadModule('./visitlog-modal-body');

var _visitlogModalBody2 = _interopRequireDefault(_visitlogModalBody);

var VisitLog = (function (_SimpleModal) {
    _inherits(VisitLog, _SimpleModal);

    function VisitLog() {
        _classCallCheck(this, VisitLog);

        _get(Object.getPrototypeOf(VisitLog.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            show: true,
            title: '新建拜访记录',
            content: {
                "cinemaId": this.props.cinemaId,
                "form": 1, //拜访形式，1-上门,2-电话,3-接待
                "date": "", //拜访日期
                "contacts": "", //联系人
                "contactInfo": "", //联系方式，可选，没有的话填空字符串""
                "position": "", //职位，可选，没有的话填空字符串""
                "purpose": 1, //拜访目的, 0-其它目的,1-挖掘需求,2-项目推进,3-介绍产品,4-签约,5-回访
                "purposeDetail": "", //如果"purposes"字段为0时需要填写，其它传空字符串""
                "content": ""
            }
        };
    }

    _createClass(VisitLog, [{
        key: 'submit',
        value: function submit() {

            var _this = this;
            if (!_this.refs['modalBody'].validate()) {
                return;
            }
            _this.onSubmit({
                url: "/api/visits.json",
                type: "POST",
                data: { content: JSON.stringify(_this.state.content) },
                des: '新建拜访记录',
                showSuccess: true
            });
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            var _this = this;
            return React.createElement(_visitlogModalBody2['default'], { ref: 'modalBody', valueLink: _this.nestLinkedState(["content"], _this) });
        }
    }], [{
        key: 'defaultProps',
        value: {
            cinemaId: '',
            freshParent: function freshParent() {}
        },
        enumerable: true
    }]);

    return VisitLog;
})(_commonSimpleModal2['default']);

exports['default'] = VisitLog;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});