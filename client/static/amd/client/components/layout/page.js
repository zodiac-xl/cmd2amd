'use strict';

define(["/amd/client/components/util/bdAjax.js","css!/amd/client/components/layout/less/page-content.css"], function (ref_1,ref_2) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"../util/bdAjax":{"index":0,"path":"client/components/util/bdAjax.js"},"./less/page-content.less":{"index":1,"path":"client/components/layout/less/page-content.less"}};
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

var _utilBdAjax = cmd2amdLoadModule('../util/bdAjax');

var _utilBdAjax2 = _interopRequireDefault(_utilBdAjax);

cmd2amdLoadModule('./less/page-content.less');

var Page = (function (_Component) {
    _inherits(Page, _Component);

    function Page(props) {
        _classCallCheck(this, Page);

        _get(Object.getPrototypeOf(Page.prototype), 'constructor', this).call(this, props);
        this.initial();
    }

    _createClass(Page, [{
        key: 'ajax',
        value: function ajax() {
            return _utilBdAjax2['default'].apply(this, arguments);
        }
    }, {
        key: 'initial',
        value: function initial() {}
    }, {
        key: 'renderHeader',
        value: function renderHeader() {}
    }, {
        key: 'renderTopBar',
        value: function renderTopBar() {}
    }, {
        key: 'renderMain',
        value: function renderMain() {}
    }, {
        key: 'renderMainExtra',
        value: function renderMainExtra() {}
    }, {
        key: 'renderBottomBar',
        value: function renderBottomBar() {}
    }, {
        key: 'renderFooter',
        value: function renderFooter() {}
    }, {
        key: 'renderDebug',
        value: function renderDebug() {}
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'h1',
                    null,
                    'I\'m an base page!'
                ),
                this.renderHeader(),
                this.renderTopBar(),
                this.renderMain(),
                this.renderMainExtra(),
                this.renderBottomBar(),
                this.renderFooter(),
                this.renderDebug()
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }]);

    return Page;
})(_react.Component);

exports['default'] = Page;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});