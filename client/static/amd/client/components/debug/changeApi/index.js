'use strict';

define(["/amd/node_modules/react-bootstrap/lib/Button.js","/amd/client/components/common/simple-modal.js","/amd/client/components/util/cookie.js"], function (ref_2,ref_3,ref_4) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"react-bootstrap/lib/Button":{"index":0,"path":"node_modules/react-bootstrap/lib/Button.js"},"../../common/simple-modal":{"index":1,"path":"client/components/common/simple-modal.js"},"../../util/cookie":{"index":2,"path":"client/components/util/cookie.js"}};
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

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _commonSimpleModal = cmd2amdLoadModule('../../common/simple-modal');

var _commonSimpleModal2 = _interopRequireDefault(_commonSimpleModal);

var _utilCookie = cmd2amdLoadModule('../../util/cookie');

var _utilCookie2 = _interopRequireDefault(_utilCookie);

var ChangeApi = (function (_SimpleModal) {
    _inherits(ChangeApi, _SimpleModal);

    function ChangeApi() {
        _classCallCheck(this, ChangeApi);

        _get(Object.getPrototypeOf(ChangeApi.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            origin: _utilCookie2['default'].get('apiProxy') || '',
            show: true,
            title: '修改后端接口'
        };
    }

    _createClass(ChangeApi, [{
        key: 'selectChange',
        value: function selectChange(e) {
            var newValue = e.target.value;
            this.setState({
                origin: newValue == 0 ? '' : newValue
            });
        }
    }, {
        key: 'submit',
        value: function submit() {
            var _this = this;
            _utilCookie2['default'].set('apiProxy', _this.state.origin);
            location.reload();
            _this.hide();
        }
    }, {
        key: 'reset',
        value: function reset() {
            var _this = this;
            _utilCookie2['default'].set('apiProxy', '');
            location.reload();
            _this.hide();
        }
    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            var _this = this;
            var isLoading = _this.state.isLoading;
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    _reactBootstrapLibButton2['default'],
                    { disabled: isLoading,
                        onClick: !isLoading ? _this.submit.bind(_this) : null },
                    isLoading ? '确认中...' : '确认'
                ),
                _react2['default'].createElement(
                    _reactBootstrapLibButton2['default'],
                    { onClick: _this.reset.bind(_this) },
                    '恢复默认'
                )
            );
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            var _this = this;
            var origin = _this.state.origin;
            var options = [_react2['default'].createElement(
                'option',
                { value: '0', key: 'default' },
                '手动'
            )];
            var selectValue = '0';
            window.hostKeys.forEach(function (key) {
                options.push(_react2['default'].createElement(
                    'option',
                    { value: key, key: key },
                    key
                ));
            });
            if ($.inArray(origin, window.hostKeys) != -1) {
                selectValue = origin;
            }

            return _react2['default'].createElement(
                'div',
                { style: { textAlign: 'center' } },
                _react2['default'].createElement('input', { ref: 'content', valueLink: _this.nestLinkedState(['origin'], _this),
                    style: { width: '50%', padding: '0 10px' },
                    placeholder: 'http://host:port  or name' }),
                '    ',
                _react2['default'].createElement(
                    'select',
                    { onChange: _this.selectChange.bind(_this), defaultValue: selectValue },
                    options
                )
            );
        }
    }]);

    return ChangeApi;
})(_commonSimpleModal2['default']);

exports['default'] = ChangeApi;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});