'use strict';

define(["/amd/client/components/common/simple-modal.js"], function (ref_2) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"./simple-modal":{"index":0,"path":"client/components/common/simple-modal.js"}};
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = cmd2amdLoadModule('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = cmd2amdLoadModule('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _simpleModal = cmd2amdLoadModule('./simple-modal');

var _simpleModal2 = _interopRequireDefault(_simpleModal);

var Confirm = (function (_SimpleModal) {
    _inherits(Confirm, _SimpleModal);

    function Confirm() {
        _classCallCheck(this, Confirm);

        _get(Object.getPrototypeOf(Confirm.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            show: true
        };
    }

    _createClass(Confirm, [{
        key: 'hide',
        value: function hide() {
            this.setState({ show: false });
            this.props.onHide && this.props.onHide();
        }
    }, {
        key: 'submit',
        value: function submit() {
            var _props$isCanSubmit = this.props.isCanSubmit;
            var isCanSubmit = _props$isCanSubmit === undefined ? function () {
                return true;
            } : _props$isCanSubmit;

            if (!isCanSubmit()) return;

            var _this = this;
            var api = _this.props.api;
            if (api) {
                _this.setState({ isLoading: true });
                _this.onSubmit(api).done(function () {
                    _this.props.onSubmit();
                });
            } else if (this.props.onSubmit) {
                _this.setState({ show: false });
                _this.props.onSubmit();
            }
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            return _react2['default'].createElement(
                'div',
                { style: { padding: '5%' } },
                this.props.content
            );
        }
    }], [{
        key: 'defaultProps',
        value: {

            content: '',
            title: '确认',
            hideCancelBtn: true
        },
        enumerable: true
    }]);

    return Confirm;
})(_simpleModal2['default']);

exports['default'] = Confirm;

var myConfirm = function myConfirm(content, title, api) {
    if (title === undefined) title = '确认';
    var props = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    var defer = $.Deferred();
    var container = document.getElementById('react-confirm-container');

    if (!container) {
        container = document.createElement('div');
        container.id = 'react-confirm-container';
        document.body.appendChild(container);
    }

    var onHide = function onHide() {
        return defer.reject();
    };
    var onSubmit = function onSubmit() {
        return defer.resolve();
    };
    props = _extends({}, props, { content: content, onHide: onHide, onSubmit: onSubmit, api: api, title: title });

    _reactDom2['default'].unmountComponentAtNode(container);
    _reactDom2['default'].render(_react2['default'].createElement(Confirm, props), container);
    return defer.promise();
};

exports['default'] = myConfirm;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});