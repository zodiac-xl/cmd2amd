'use strict';

define(["/amd/node_modules/lodash/index.js","/amd/client/components/include/header.js","/amd/client/components/include/footer.js","/amd/client/components/include/side-bar.js","/amd/client/components/debug/index.js","/amd/client/components/layout/page.js","css!/amd/client/components/layout/less/page-content.css"], function (ref_2,ref_3,ref_4,ref_5,ref_6,ref_7,ref_8) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"lodash":{"index":0,"path":"node_modules/lodash/index.js"},"../include/header":{"index":1,"path":"client/components/include/header.js"},"../include/footer":{"index":2,"path":"client/components/include/footer.js"},"../include/side-bar":{"index":3,"path":"client/components/include/side-bar.js"},"../debug":{"index":4,"path":"client/components/debug/index.js"},"./page":{"index":5,"path":"client/components/layout/page.js"},"./less/page-content.less":{"index":6,"path":"client/components/layout/less/page-content.less"}};
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

var _lodash = cmd2amdLoadModule('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _includeHeader = cmd2amdLoadModule('../include/header');

var _includeHeader2 = _interopRequireDefault(_includeHeader);

var _includeFooter = cmd2amdLoadModule('../include/footer');

var _includeFooter2 = _interopRequireDefault(_includeFooter);

var _includeSideBar = cmd2amdLoadModule('../include/side-bar');

var _includeSideBar2 = _interopRequireDefault(_includeSideBar);

var _debug = cmd2amdLoadModule('../debug');

var _debug2 = _interopRequireDefault(_debug);

var _page = cmd2amdLoadModule('./page');

var _page2 = _interopRequireDefault(_page);

cmd2amdLoadModule('./less/page-content.less');

//过渡 html和jsx共存页面

var PageTransitionLayout = (function (_BasePage) {
    _inherits(PageTransitionLayout, _BasePage);

    function PageTransitionLayout() {
        _classCallCheck(this, PageTransitionLayout);

        _get(Object.getPrototypeOf(PageTransitionLayout.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(PageTransitionLayout, [{
        key: 'renderHeader',
        value: function renderHeader() {}
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(_includeHeader2['default'], null),
                _react2['default'].createElement(_includeSideBar2['default'], null),
                _react2['default'].createElement(
                    'div',
                    { className: 'my-page-content' },
                    _react2['default'].createElement(
                        'div',
                        { className: 'my-page-header' },
                        this.renderHeader()
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'my-page-top-bar' },
                        this.renderTopBar()
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'my-page-main' },
                        this.renderMain(),
                        this.renderMainExtra()
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'my-page-bottom-bar' },
                        this.renderBottomBar()
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'my-page-footer' },
                        this.renderFooter()
                    )
                ),
                _react2['default'].createElement(_includeFooter2['default'], null),
                this.renderDebug()
            );
        }
    }], [{
        key: 'page',
        value: function page(Page) {
            console.log('✓', 'Ready');

            $(function () {

                //const fragments
                if (1) {
                    var container = document.getElementById('container-header');
                    _reactDom2['default'].render(_react2['default'].createElement(_includeHeader2['default'], null), container);
                }

                if (1) {
                    var container = document.getElementById('container-sideBar');
                    _reactDom2['default'].render(_react2['default'].createElement(_includeSideBar2['default'], null), container);
                }
                if (1) {
                    var container = document.getElementById('container-footer');
                    _reactDom2['default'].render(_react2['default'].createElement(_includeFooter2['default'], null), container);
                }

                if (1) {
                    var container = document.getElementById('container-debug');
                    _reactDom2['default'].render(_react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(_debug2['default'], null)
                    ), container);
                }
            });
        }
    }]);

    return PageTransitionLayout;
})(_page2['default']);

exports['default'] = PageTransitionLayout;
module.exports = exports['default'];
/* header */ /* toolbar */ /* main content */ /* bottom-toolbar */ /* footer */;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});