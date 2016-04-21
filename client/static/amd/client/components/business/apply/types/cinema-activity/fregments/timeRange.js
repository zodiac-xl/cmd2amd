'use strict';

define(["/amd/client/components/common/form-group.js","/amd/client/components/common/super-child.js"], function (ref_0,ref_1) {

    var cmd2amdModules = {"../../../../../common/form-group":{"index":0,"path":"client/components/common/form-group.js"},"../../../../../common/super-child":{"index":1,"path":"client/components/common/super-child.js"}};
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

var _commonFormGroup = cmd2amdLoadModule('../../../../../common/form-group');

var _commonSuperChild = cmd2amdLoadModule('../../../../../common/super-child');

var _commonSuperChild2 = _interopRequireDefault(_commonSuperChild);

var TimeRange = (function (_SuperChild) {
    _inherits(TimeRange, _SuperChild);

    function TimeRange() {
        _classCallCheck(this, TimeRange);

        _get(Object.getPrototypeOf(TimeRange.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(TimeRange, [{
        key: 'defaultValue',
        value: function defaultValue() {
            return {
                "startTime": "",
                "endTime": ""
            };
        }
    }, {
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var valueLink = props.valueLink || {};
            var value = valueLink.value || this.defaultValue();
            return {
                value: value
            };
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var _this = this;
            var readOnly = _this.props.readOnly;
            var value = _this.state.value;

            var rightDom = undefined;

            if (readOnly) {
                rightDom = React.createElement(
                    _commonFormGroup.Right,
                    null,
                    React.createElement(
                        'span',
                        null,
                        value.startTime
                    ),
                    ' -- ',
                    React.createElement(
                        'span',
                        null,
                        value.endTime
                    )
                );
            } else {
                rightDom = React.createElement(
                    _commonFormGroup.Right,
                    null,
                    React.createElement('input', { required: true,
                        className: 'J_datePicker',
                        valueLink: _this.nestLinkedState(["value", "startTime"], _this) }),
                    ' -- ',
                    React.createElement('input', { required: true,
                        className: 'J_datePicker',
                        valueLink: _this.nestLinkedState(["value", "endTime"], _this) })
                );
            }

            return React.createElement(
                _commonFormGroup.Group,
                null,
                React.createElement(
                    _commonFormGroup.Left,
                    null,
                    '活动日期'
                ),
                '：',
                rightDom
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            valueLink: null,
            readOnly: false
        },
        enumerable: true
    }]);

    return TimeRange;
})(_commonSuperChild2['default']);

exports['default'] = TimeRange;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});