'use strict';

define(["/amd/node_modules/react-nest-link-state/NestLinkedStateMixin.js","/amd/node_modules/deep-equal/index.js"], function (ref_1,ref_2) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-nest-link-state":{"index":0,"path":"node_modules/react-nest-link-state/NestLinkedStateMixin.js"},"deep-equal":{"index":1,"path":"node_modules/deep-equal/index.js"}};
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

var _reactNestLinkState = cmd2amdLoadModule('react-nest-link-state');

var _reactNestLinkState2 = _interopRequireDefault(_reactNestLinkState);

var _deepEqual = cmd2amdLoadModule('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var SuperChildFrom = (function (_Component) {
    _inherits(SuperChildFrom, _Component);

    function SuperChildFrom() {
        _classCallCheck(this, SuperChildFrom);

        _get(Object.getPrototypeOf(SuperChildFrom.prototype), 'constructor', this).apply(this, arguments);

        this.state = this.getStateByProps(this.props);
        this.nestLinkedState = _reactNestLinkState2['default'].nestLinkedState;
    }

    _createClass(SuperChildFrom, [{
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            return { value: props.valueLink ? props.valueLink.value : {} };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.getStateByProps && this.setState(this.getStateByProps(nextProps));
        }
    }, {
        key: 'getState',
        value: function getState() {
            var valueLink = this.props.valueLink || {};
            var value = valueLink.value || this.props.value;

            return {
                value: value
            };
        }
    }, {
        key: 'validate',
        value: function validate() {

            var _this = this;
            var validate = true;

            var submitBtn = ReactDOM.findDOMNode(_this.refs.submit);
            var form = ReactDOM.findDOMNode(_this.refs.myForm);

            var event = new Event('click', { bubbles: false });
            submitBtn.dispatchEvent(event);

            if (this.state.value == null || !form.checkValidity()) {
                validate = false;
            } else if (_this.customValidate) {
                validate = _this.customValidate();
            }
            return validate;
        }
    }, {
        key: 'submit',
        value: function submit(e) {
            e.preventDefault();
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            if (this.validate()) {
                return this.state.value;
            } else {
                return null;
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var valueLink = this.props.valueLink || {};
            var requestChange = valueLink.requestChange;
            if ((0, _deepEqual2['default'])(nextProps, this.props) && requestChange) {
                //依靠父组件的requestChange进行通信 实现rerender
                requestChange(nextState.value);
                return false;
            } else {
                // 暴露getValue方法向父组件通信 实现rerender
                return true;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'form',
                    { onSubmit: this.submit, ref: 'myForm' },
                    this.renderMain ? this.renderMain() : this.props.children || '',
                    _react2['default'].createElement('input', { type: 'submit', style: { display: "none" }, ref: 'submit' })
                )
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            valueLink: null
        },
        enumerable: true
    }]);

    return SuperChildFrom;
})(_react.Component);

exports['default'] = SuperChildFrom;
;
exports['default'] = SuperChildFrom;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});