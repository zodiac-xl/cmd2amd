'use strict';

define(["css!/amd/client/components/include/less/page-header.css","/amd/client/components/business/feedback/index.js","/amd/client/components/util/cookie.js","/amd/client/components/include/top-notice.js"], function (ref_1,ref_2,ref_3,ref_4) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"./less/page-header.less":{"index":0,"path":"client/components/include/less/page-header.less"},"../business/feedback":{"index":1,"path":"client/components/business/feedback/index.js"},"../util/cookie":{"index":2,"path":"client/components/util/cookie.js"},"./top-notice":{"index":3,"path":"client/components/include/top-notice.js"}};
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

cmd2amdLoadModule('./less/page-header.less');

var _businessFeedback = cmd2amdLoadModule('../business/feedback');

var _businessFeedback2 = _interopRequireDefault(_businessFeedback);

var _utilCookie = cmd2amdLoadModule('../util/cookie');

var _utilCookie2 = _interopRequireDefault(_utilCookie);

var _topNotice = cmd2amdLoadModule('./top-notice');

var _topNotice2 = _interopRequireDefault(_topNotice);

var Header = (function (_Component) {
    _inherits(Header, _Component);

    function Header() {
        _classCallCheck(this, Header);

        _get(Object.getPrototypeOf(Header.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            showFeedback: false
        };
    }

    _createClass(Header, [{
        key: 'onFeedback',
        value: function onFeedback() {
            this.setState({
                showFeedback: true
            });
        }
    }, {
        key: 'hideFeedback',
        value: function hideFeedback() {
            this.setState({
                showFeedback: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;
            var env = 'online';
            var href = location.hostname;
            if (/st[.]/.test(href)) {
                env = 'staging';
            } else if (/sankuai/.test(href)) {
                env = 'online';
            } else {
                env = 'development';
            }

            var apiProxy = _utilCookie2['default'].get('apiProxy') || '';
            if (/staging/.test(apiProxy)) {
                env = 'staging';
            } else if (/office/.test(apiProxy)) {
                env = 'office';
            }
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(_topNotice2['default'], { env: env }),
                _react2['default'].createElement(
                    'nav',
                    { className: 'navbar navbar-default navbar-static-top navbar-dashboard' },
                    _react2['default'].createElement(
                        'div',
                        { className: 'container-fluid' },
                        _react2['default'].createElement(
                            'div',
                            { className: 'collapse navbar-collapse' },
                            _react2['default'].createElement(
                                'a',
                                { href: '/', className: 'navbar-brand' },
                                _react2['default'].createElement('span', { className: 'logo-img' }),
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    '猫眼BD后台系统'
                                )
                            ),
                            _react2['default'].createElement(
                                'ul',
                                { className: 'nav nav-pills pull-right' },
                                _react2['default'].createElement(
                                    'li',
                                    { className: 'nav-item' },
                                    _react2['default'].createElement(
                                        'a',
                                        { className: 'nav-link', href: '#' },
                                        _react2['default'].createElement(
                                            'span',
                                            null,
                                            'Hi, ',
                                            window.User.name
                                        )
                                    )
                                ),
                                _react2['default'].createElement(
                                    'li',
                                    { className: 'nav-item' },
                                    _react2['default'].createElement(
                                        'a',
                                        { className: 'nav-link', href: '/' },
                                        _react2['default'].createElement(
                                            'span',
                                            null,
                                            '首页'
                                        )
                                    )
                                ),
                                _react2['default'].createElement(
                                    'li',
                                    { className: 'nav-item', onClick: _this.onFeedback.bind(_this) },
                                    _react2['default'].createElement(
                                        'a',
                                        { className: 'nav-link', href: '#' },
                                        _react2['default'].createElement(
                                            'span',
                                            null,
                                            '反馈'
                                        )
                                    )
                                ),
                                _react2['default'].createElement(
                                    'li',
                                    { className: 'nav-item' },
                                    _react2['default'].createElement(
                                        'a',
                                        { className: 'nav-link', href: '/account/logout' },
                                        _react2['default'].createElement('i', { className: 'glyphicon glyphicon-log-out' }),
                                        _react2['default'].createElement(
                                            'span',
                                            null,
                                            '退出'
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2['default'].createElement(_businessFeedback2['default'], { show: _this.state.showFeedback, hide: _this.hideFeedback.bind(_this) })
                )
            );
        }
    }]);

    return Header;
})(_react.Component);

exports['default'] = Header;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});