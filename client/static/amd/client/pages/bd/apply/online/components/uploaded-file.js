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

var UploadedFile = (function (_Component) {
    _inherits(UploadedFile, _Component);

    function UploadedFile() {
        _classCallCheck(this, UploadedFile);

        _get(Object.getPrototypeOf(UploadedFile.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(UploadedFile, [{
        key: "render",
        value: function render() {
            var file = this.props.file;

            var isImage = false;
            var target = "";
            var name = file.name;
            var href = file.url;
            if (/.(png|jpg|jpeg)/.test(name)) {
                isImage = true;
            }
            if (isImage) {
                target = "_blank";
            }
            return _react2["default"].createElement(
                "span",
                null,
                _react2["default"].createElement(
                    "a",
                    { href: href, "data-id": file.id, target: target },
                    file.name
                ),
                "  ",
                _react2["default"].createElement(
                    "a",
                    { onClick: this.props.deleteFile },
                    "删除文件"
                ),
                _react2["default"].createElement("br", null)
            );
        }
    }], [{
        key: "propTypes",
        value: {
            file: _react2["default"].PropTypes.object.isRequired,
            deleteFile: _react2["default"].PropTypes.func.isRequired
        },
        enumerable: true
    }]);

    return UploadedFile;
})(_react.Component);

exports["default"] = UploadedFile;
module.exports = exports["default"];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});