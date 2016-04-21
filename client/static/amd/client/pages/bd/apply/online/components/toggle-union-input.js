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

//checkbox或者radio和input的结合组件
//checkbox/radio check时input可以输入

var ToggleUnionInput = (function (_Component) {
    _inherits(ToggleUnionInput, _Component);

    function ToggleUnionInput() {
        _classCallCheck(this, ToggleUnionInput);

        _get(Object.getPrototypeOf(ToggleUnionInput.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            checked: false
        };
    }

    _createClass(ToggleUnionInput, [{
        key: 'onCheckedChange',
        value: function onCheckedChange(evt) {
            var checked = evt.target.checked;
            if (this.props.checkedLink) {
                this.props.checkedLink.requestChange(checked);
            }
        }
    }, {
        key: 'onInputChanged',
        value: function onInputChanged(evt) {
            var value = evt.target.value.trim();
            if (this.props.valueLink) {
                this.props.valueLink.requestChange(value);
            }
        }
    }, {
        key: 'isChecked',
        value: function isChecked() {
            return this.checked;
        }
    }, {
        key: 'getValue',
        value: function getValue(ctx) {
            return ctx.value || ctx.valueLink.value;
        }
    }, {
        key: 'getChecked',
        value: function getChecked(ctx) {
            if (!ctx.checkedLink) {
                return false;
            }
            return ctx.checked || ctx.checkedLink.value;
        }
    }, {
        key: 'render',
        value: function render() {
            var ctx = this.props;
            var value = this.getValue(ctx);;
            var checked = this.getChecked(ctx);

            return _react2['default'].createElement(
                'span',
                null,
                _react2['default'].createElement(
                    'label',
                    { className: ctx.type + '-inline' },
                    _react2['default'].createElement('input', { type: ctx.type, name: ctx.name,
                        checked: checked,
                        onChange: this.onCheckedChange.bind(this) }),
                    ctx.title
                ),
                ctx.beforeText,
                _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm',
                    size: ctx.size,
                    disabled: !checked,
                    placeholder: ctx.placeholder,
                    value: value,
                    onChange: this.onInputChanged.bind(this) }),
                ctx.afterText
            );
        }
    }], [{
        key: 'propTypes',
        value: {
            valueLink: _react2['default'].PropTypes.object.isRequired,
            checkedLink: _react2['default'].PropTypes.object.isRequired
        },
        enumerable: true
    }]);

    return ToggleUnionInput;
})(_react.Component);

exports['default'] = ToggleUnionInput;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});