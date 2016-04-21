'use strict';

define(["/amd/node_modules/react-bootstrap/lib/Pagination.js"], function (ref_1) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-bootstrap/lib/Pagination":{"index":0,"path":"node_modules/react-bootstrap/lib/Pagination.js"}};
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

var _reactBootstrapLibPagination = cmd2amdLoadModule('react-bootstrap/lib/Pagination');

var _reactBootstrapLibPagination2 = _interopRequireDefault(_reactBootstrapLibPagination);

var PaginationAdvanced = (function (_Component) {
    _inherits(PaginationAdvanced, _Component);

    function PaginationAdvanced() {
        _classCallCheck(this, PaginationAdvanced);

        _get(Object.getPrototypeOf(PaginationAdvanced.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            query: {
                offset: 0,
                limit: this.props.limit || 20
            },
            prev: true,
            next: true,
            first: true,
            last: true,
            ellipsis: true,
            items: 1,
            maxButtons: 5,
            activePage: 1,
            onSelect: this.onPaging.bind(this),
            inited: false
        };
    }

    _createClass(PaginationAdvanced, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.onPaging(1);
        }
    }, {
        key: 'onQuery',
        value: function onQuery(query, totalSize) {
            var _this = this;
            var newState = _this.state;
            newState.query = $.extend({}, newState.query, query || {});
            if (newState.query && newState.query.offset == 0) {
                newState.activePage = 1;
            }

            if (totalSize != undefined && totalSize != null) {
                newState.items = Math.ceil(totalSize / newState.query.limit);
            }
            _this.setState(newState);
        }
    }, {
        key: 'onPaging',
        value: function onPaging(e) {
            var _this = this;
            var newState = _this.state;
            var activePage = undefined;
            var text = undefined;
            if ($.isNumeric(e)) {
                text = e;
            } else {
                text = e.target && e.target.textContent || 1;
            }

            switch (text) {
                case "›":
                    //next
                    activePage = newState.activePage + 1;
                    break;
                case "»":
                    //last
                    activePage = newState.items;
                    break;
                case "‹":
                    //Previous
                    activePage = newState.activePage - 1;
                    break;
                case "«":
                    //First
                    activePage = 1;
                    break;
                default:
                    // 数字
                    activePage = text * 1;
                    break;
            }

            newState.activePage = activePage;

            newState.query.offset = (activePage - 1) * newState.query.limit;

            _this.props.onQueryHandler(newState.query);
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2['default'].createElement(_reactBootstrapLibPagination2['default'], this.state);
        }
    }], [{
        key: 'defaultProps',
        value: {
            onQueryHandler: function onQueryHandler() {}
        },
        enumerable: true
    }]);

    return PaginationAdvanced;
})(_react.Component);

exports['default'] = PaginationAdvanced;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});