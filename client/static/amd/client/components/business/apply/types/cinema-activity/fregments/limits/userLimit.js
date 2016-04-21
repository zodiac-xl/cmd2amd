'use strict';

define(["/amd/node_modules/react-simple-radio-group/index.js","/amd/client/components/common/form-group.js","/amd/client/components/common/super-child.js","/amd/client/components/common/validatemap.js"], function (ref_0,ref_1,ref_2,ref_3) {

    var cmd2amdModules = {"react-simple-radio-group":{"index":0,"path":"node_modules/react-simple-radio-group/index.js"},"../../../../../../common/form-group":{"index":1,"path":"client/components/common/form-group.js"},"../../../../../../common/super-child":{"index":2,"path":"client/components/common/super-child.js"},"../../../../../../common/validatemap":{"index":3,"path":"client/components/common/validatemap.js"}};
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _reactSimpleRadioGroup = cmd2amdLoadModule('react-simple-radio-group');

var _reactSimpleRadioGroup2 = _interopRequireDefault(_reactSimpleRadioGroup);

var _commonFormGroup = cmd2amdLoadModule('../../../../../../common/form-group');

var _commonSuperChild = cmd2amdLoadModule('../../../../../../common/super-child');

var _commonSuperChild2 = _interopRequireDefault(_commonSuperChild);

var _commonValidatemap = cmd2amdLoadModule('../../../../../../common/validatemap');

var _commonValidatemap2 = _interopRequireDefault(_commonValidatemap);

var UserLimit = (function (_SuperChild) {
    _inherits(UserLimit, _SuperChild);

    function UserLimit() {
        _classCallCheck(this, UserLimit);

        _get(Object.getPrototypeOf(UserLimit.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(UserLimit, [{
        key: 'defaultValue',
        value: function defaultValue() {
            return 2; //每人限量* number 不限为0 默认为“限制 2 张“
        }
    }, {
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var valueLink = props.valueLink || {};
            var value = valueLink.value != undefined ? valueLink.value : this.defaultValue();
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
            var userLimit = value;

            var valueLink = _this.nestLinkedState(['value'], _this);
            var handleChange = function handleChange(e) {
                valueLink.requestChange(e.target.value);
            };
            var radioChangeHandler = function radioChangeHandler(newValue) {
                if (newValue == 0) {
                    var newState = _this.state;
                    newState.value = 0;
                    _this.setState(newState);
                }
            };

            //活动形式为“票补”或“第三方补贴”时：“不限”置灰无法选择；默认选择“限制 XX 张”，必填，
            var disableNoLimit = _this.props.disableNoLimit;

            var radioValue = undefined; // 0 不限制  1限制
            if (valueLink.value == 0 && !disableNoLimit) {
                radioValue = 0;
            } else {
                radioValue = 1;
            }

            var rightDom = undefined;
            if (readOnly) {
                rightDom = React.createElement(
                    _commonFormGroup.Right,
                    null,
                    React.createElement(
                        'span',
                        null,
                        userLimit > 0 ? userLimit + '张' : '不限'
                    )
                );
            } else {
                rightDom = React.createElement(
                    _commonFormGroup.Right,
                    null,
                    React.createElement(
                        _reactSimpleRadioGroup2['default'],
                        { name: 'userLimit', value: radioValue,
                            onChange: radioChangeHandler },
                        React.createElement(
                            'span',
                            { style: { color: disableNoLimit ? '#C5C5C5' : 'inherit' } },
                            React.createElement('input', { type: 'radio', value: '0', disabled: disableNoLimit }),
                            '不限'
                        ),
                        '    ',
                        React.createElement('input', { type: 'radio', value: '1' }),
                        '限制  ',
                        React.createElement('input', _extends({}, _commonValidatemap2['default'].number, { min: '1', value: valueLink.value || '',
                            required: radioValue == 1, //a.为0 时为不限制 张数为空 非必填 b.为1时 必填
                            onChange: handleChange })),
                        ' 张'
                    )
                );
            }

            return React.createElement(
                _commonFormGroup.Group,
                null,
                React.createElement(
                    _commonFormGroup.Left,
                    null,
                    '每人限量'
                ),
                '：',
                rightDom
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            valueLink: null,
            readOnly: false,
            disableNoLimit: false
        },
        enumerable: true
    }]);

    return UserLimit;
})(_commonSuperChild2['default']);

exports['default'] = UserLimit;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});