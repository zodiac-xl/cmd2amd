'use strict';

define([], function () {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null}};
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

        "use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = cmd2amdLoadModule('react');

var _react2 = _interopRequireDefault(_react);

var Group = (function (_Component) {
    _inherits(Group, _Component);

    function Group() {
        _classCallCheck(this, Group);

        _get(Object.getPrototypeOf(Group.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Group, [{
        key: "render",
        value: function render() {

            var style = {
                marginBottom: "10px",
                display: "flex"

            };
            var className = this.props.className || "";
            return _react2["default"].createElement(
                "div",
                { style: style, className: className },
                this.props.children
            );
        }
    }]);

    return Group;
})(_react.Component);

var Hr = (function (_Component2) {
    _inherits(Hr, _Component2);

    function Hr() {
        _classCallCheck(this, Hr);

        _get(Object.getPrototypeOf(Hr.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Hr, [{
        key: "render",
        value: function render() {
            var _this = this;
            var style = {
                borderBottom: "1px dashed black",
                display: "block",
                borderTopWidth: 0,
                transform: 'translateX(0)'
            };
            return _react2["default"].createElement("hr", { style: style });
        }
    }], [{
        key: "defaultProps",
        value: {
            style: {}
        },
        enumerable: true
    }]);

    return Hr;
})(_react.Component);

var Left = (function (_Component3) {
    _inherits(Left, _Component3);

    function Left() {
        _classCallCheck(this, Left);

        _get(Object.getPrototypeOf(Left.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Left, [{
        key: "render",
        value: function render() {
            var _this = this;

            var style = {
                display: "inline-block",
                width: "11em",
                textAlign: "right",
                verticalAlign: "top"
            };
            $.extend(style, _this.props.style);
            return _react2["default"].createElement(
                "div",
                { style: style },
                this.props.children
            );
        }
    }], [{
        key: "defaultProps",
        value: {
            style: {}
        },
        enumerable: true
    }]);

    return Left;
})(_react.Component);

var Right = (function (_Component4) {
    _inherits(Right, _Component4);

    function Right() {
        _classCallCheck(this, Right);

        _get(Object.getPrototypeOf(Right.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Right, [{
        key: "render",
        value: function render() {
            var _this = this;
            var style = {
                display: "inline-block",
                verticalAlign: "top",
                flex: 1
            };
            $.extend(style, _this.props.style);
            return _react2["default"].createElement(
                "div",
                { style: style },
                this.props.children
            );
        }
    }], [{
        key: "defaultProps",
        value: {
            style: {}
        },
        enumerable: true
    }]);

    return Right;
})(_react.Component);

exports["default"] = {
    Group: Group,
    Hr: Hr,
    Left: Left,
    Right: Right
};
module.exports = exports["default"];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});