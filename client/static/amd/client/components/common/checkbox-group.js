'use strict';

define([], function () {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null}};
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = cmd2amdLoadModule('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = cmd2amdLoadModule('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

//fork form  https://github.com/ziad-saab/react-checkbox-group
var CheckboxGroup = _react2['default'].createClass({
    displayName: 'CheckboxGroup',

    getInitialState: function getInitialState() {
        return { defaultValue: this.props.defaultValue || [] };
    },

    componentDidMount: function componentDidMount() {
        this.setCheckboxNames();
        this.setCheckedBoxes();
    },

    componentDidUpdate: function componentDidUpdate() {
        this.setCheckboxNames();
        this.setCheckedBoxes();
    },

    render: function render() {
        var _props = this.props;
        var name = _props.name;
        var value = _props.value;
        var defaultValue = _props.defaultValue;

        var otherProps = _objectWithoutProperties(_props, ['name', 'value', 'defaultValue']);

        return _react2['default'].createElement(
            'div',
            otherProps,
            this.props.children
        );
    },

    setCheckboxNames: function setCheckboxNames() {
        // stay DRY and don't put the same `name` on all checkboxes manually. Put it on
        // the tag and it'll be done here
        var $checkboxes = this.getCheckboxes();
        for (var i = 0, _length = $checkboxes.length; i < _length; i++) {
            $checkboxes[i].setAttribute('name', this.props.name);
        }
    },

    getCheckboxes: function getCheckboxes() {
        return _reactDom2['default'].findDOMNode(this).querySelectorAll('input[type="checkbox"]');
    },

    setCheckedBoxes: function setCheckedBoxes() {
        var $checkboxes = this.getCheckboxes();
        // if `value` is passed from parent, always use that value. This is similar
        // to React's controlled component. If `defaultValue` is used instead,
        // subsequent updates to defaultValue are ignored. Note: when `defaultValue`
        // and `value` are both passed, the latter takes precedence, just like in
        // a controlled component
        var destinationValue = this.props.value != null ? this.props.value : this.state.defaultValue;

        for (var i = 0, _length2 = $checkboxes.length; i < _length2; i++) {
            var $checkbox = $checkboxes[i];

            // intentionally use implicit conversion for those who accidentally used,
            // say, `valueToChange` of 1 (integer) to compare it with `value` of "1"
            // (auto conversion to valid html value from React)
            if (destinationValue.indexOf($checkbox.value) >= 0 || destinationValue.indexOf($checkbox.value * 1) >= 0) {
                $checkbox.checked = true;
            } else {
                $checkbox.checked = false;
            }
        }
    },

    getCheckedValues: function getCheckedValues() {
        var $checkboxes = this.getCheckboxes();

        var checked = [];
        for (var i = 0, _length3 = $checkboxes.length; i < _length3; i++) {
            if ($checkboxes[i].checked) {
                checked.push($checkboxes[i].value);
            }
        }

        return checked;
    }
});
exports['default'] = CheckboxGroup;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});