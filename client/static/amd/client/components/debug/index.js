'use strict';

define(["/amd/client/components/debug/changeApi/index.js","/amd/client/components/util/url.js","css!/amd/client/components/debug/index.css"], function (ref_2,ref_3,ref_4) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"./changeApi":{"index":0,"path":"client/components/debug/changeApi/index.js"},"../util/url":{"index":1,"path":"client/components/util/url.js"},"./index.less":{"index":2,"path":"client/components/debug/index.less"}};
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

var _changeApi = cmd2amdLoadModule('./changeApi');

var _changeApi2 = _interopRequireDefault(_changeApi);

var _utilUrl = cmd2amdLoadModule('../util/url');

var _utilUrl2 = _interopRequireDefault(_utilUrl);

cmd2amdLoadModule('./index.less');

var ChangeUrl = (function (_Component) {
    _inherits(ChangeUrl, _Component);

    function ChangeUrl() {
        _classCallCheck(this, ChangeUrl);

        _get(Object.getPrototypeOf(ChangeUrl.prototype), 'constructor', this).apply(this, arguments);

        this.state = {};
    }

    _createClass(ChangeUrl, [{
        key: 'changeApi',
        value: function changeApi() {
            var container = _reactDom2['default'].findDOMNode(this.refs['container-changeApi']);
            _reactDom2['default'].unmountComponentAtNode(container);
            var component = _reactDom2['default'].render(_react2['default'].createElement(_changeApi2['default'], null), container);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            $(function () {
                var $miao = $("#miaoLabel");
                $miao.mouseup(function (event) {
                    $miao.click();
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var showPet = _utilUrl2['default'].getUrlArg('pet') == 'miao' || window.DEBUG;
            return _react2['default'].createElement(
                'div',
                { className: showPet ? '' : 'hide' },
                _react2['default'].createElement(
                    'div',
                    { className: 'drop-left-top miaoLabel' },
                    _react2['default'].createElement(
                        'div',
                        { id: 'miaoLabel', type: 'button', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
                        _react2['default'].createElement(
                            'object',
                            { type: 'application/x-shockwave-flash', data: '/media/miao.swf', width: '84', height: '90',
                                id: 'miaoicon',
                                style: { visibility: 'visible' } },
                            _react2['default'].createElement('param', { name: 'wmode', value: 'transparent' })
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'dropdown-menu', 'aria-labelledby': 'miaoLabel' },
                        _react2['default'].createElement(
                            'a',
                            { href: '/admin', className: 'funny-button green' },
                            'Admin'
                        ),
                        _react2['default'].createElement(
                            'a',
                            { href: '/bd', className: 'funny-button green' },
                            'BD'
                        ),
                        _react2['default'].createElement(
                            'a',
                            { className: 'funny-button green', onClick: this.changeApi.bind(this) },
                            '修改后端api'
                        )
                    )
                ),
                _react2['default'].createElement('div', { ref: 'container-changeApi' })
            );
        }
    }], [{
        key: 'defaultProps',
        value: {},
        enumerable: true
    }]);

    return ChangeUrl;
})(_react.Component);

exports['default'] = ChangeUrl;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});