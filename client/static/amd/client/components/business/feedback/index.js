'use strict';

define(["/amd/client/components/common/simple-modal.js"], function (ref_2) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"../../common/simple-modal":{"index":0,"path":"client/components/common/simple-modal.js"}};
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

var _react = cmd2amdLoadModule('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = cmd2amdLoadModule('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _commonSimpleModal = cmd2amdLoadModule('../../common/simple-modal');

var _commonSimpleModal2 = _interopRequireDefault(_commonSimpleModal);

var Feedback = (function (_SimpleModal) {
    _inherits(Feedback, _SimpleModal);

    function Feedback() {
        _classCallCheck(this, Feedback);

        _get(Object.getPrototypeOf(Feedback.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Feedback, [{
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            return {
                isLoading: false,
                title: "反馈",
                content: ''
            };
        }
    }, {
        key: 'validate',
        value: function validate() {
            var _this = this;
            var validate = true;
            if (!_this.state.content) {
                validate = false;
                toastr.warning('反馈内容不能为空');
                _reactDom2['default'].findDOMNode(_this.refs['content']).focus();
                return false;
            }
            return validate;
        }
    }, {
        key: 'submit',
        value: function submit() {
            var _this = this;

            var api = {
                url: "/api/feedbacks.json",
                des: "反馈",
                type: "POST",
                admin: true,
                data: {
                    content: _this.state.content
                }
            };

            if (!_this.validate()) {
                return;
            }

            this.onSubmit(api);
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            var _this = this;
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement('textarea', { ref: 'content', valueLink: _this.nestLinkedState(['content'], _this), style: { width: '100%', minHeight: '100px' },
                    placeholder: '亲，您是遇到系统问题了？还是对我们有一些意见和建议？ 欢迎您提给我们，谢谢！ 紧急问题请发送邮件至avatar.oda@meituan.com，我们会尽快回复~' })
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            hide: function hide() {},
            show: false
        },
        enumerable: true
    }]);

    return Feedback;
})(_commonSimpleModal2['default']);

exports['default'] = Feedback;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});