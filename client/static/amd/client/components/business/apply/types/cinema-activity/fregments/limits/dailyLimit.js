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

var DailyLimit = (function (_SuperChild) {
    _inherits(DailyLimit, _SuperChild);

    function DailyLimit() {
        _classCallCheck(this, DailyLimit);

        _get(Object.getPrototypeOf(DailyLimit.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(DailyLimit, [{
        key: 'defaultValue',
        value: function defaultValue() {
            return {
                "startTime": "11:00:00",
                "cost": [//每天成本限制，不限为[]
                ],
                "num": [//每天张数限制，不限为[]
                ],
                "user": 2 //每人每天限量，不限为0
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
        key: 'validate',
        value: function validate() {
            //若“每天限量”选择“限制”，则“每天成本限制”、“每天张数限制”、“每人每天限量”中至少有一个需要选择“限制”，否则无法提交申请。
            var value = this.state.value;
            var dailyLimit = value;
            var validate = true;

            if (dailyLimit.startTime && dailyLimit.cost.length == 0 && dailyLimit.num.length == 0) {
                validate = false;
                toastr.warning('若“每天限量”选择“限制”，则“每天成本限制”、“每天张数限制”中至少有一个需要选择“限制”');
            }
            return validate;
        }
    }, {
        key: 'getLimitList',
        value: function getLimitList(data, readOnly, filedName) {
            var doms = [];
            var _this = this;
            if (readOnly && data.length == 0) {
                doms = React.createElement(
                    'div',
                    { style: { padding: '5px 0' } },
                    '不限'
                );
            }
            data.forEach(function (item, i) {
                var dom = undefined;
                if (readOnly) {
                    dom = React.createElement(
                        'div',
                        { key: i, style: { padding: '5px 0' } },
                        item.date,
                        '：限制',
                        item.limit,
                        React.createElement(
                            'span',
                            null,
                            filedName == 'cost' ? '元' : '张'
                        )
                    );
                } else {
                    dom = React.createElement(
                        'div',
                        { key: i, style: { padding: '5px 0' } },
                        item.date,
                        '：限制',
                        React.createElement('input', _extends({
                            required: true
                        }, _commonValidatemap2['default'].number, { min: 1,
                            style: { width: '140px' },
                            valueLink: _this.nestLinkedState(["value", filedName, i, 'limit'], _this),
                            placeholder: filedName == 'cost' ? '数字，包括服务费' : '数字'
                        })),
                        ' ',
                        filedName == 'cost' ? '元' : '张'
                    );
                }
                doms.push(dom);
            });
            return doms;
        }
    }, {
        key: 'dailyLimitFiledHandle',
        value: function dailyLimitFiledHandle(filedName, newValue) {
            var _this = this;
            var radioValue = newValue;
            var newState = _this.state;
            if (radioValue == 1) {
                //需要限制
                newState.value[filedName] = _this.props.dailyLimitHandle()[filedName];
            } else {
                newState.value[filedName] = [];
            }
            _this.setState(newState);
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var _this = this;
            var readOnly = _this.props.readOnly;
            var disableNoLimit = _this.props.disableNoLimit;
            var dailyLimitHandle = _this.props.dailyLimitHandle;

            var value = _this.state.value;
            var dailyLimit = value;

            var user = dailyLimit.user;
            var cost = dailyLimit.cost || [];
            var num = dailyLimit.num || [];

            var rightDom = undefined;
            var costdDom = _this.getLimitList(cost, readOnly, 'cost');
            var numdDom = _this.getLimitList(num, readOnly, 'num');

            var dailyLimitRadioValue = undefined; // 0 不限制  1限制
            if (!dailyLimit.startTime && !disableNoLimit) {
                dailyLimitRadioValue = 0;
            } else {
                dailyLimitRadioValue = 1;
            }

            var dailyLimitcostRadioValue = cost.length > 0 ? 1 : 0;
            var dailyLimitnumRadioValue = num.length > 0 ? 1 : 0;
            var dailyLimituserRadioValue = user > 0 ? 1 : 0;

            if (readOnly) {
                if (dailyLimitRadioValue == 0) {
                    rightDom = React.createElement(
                        _commonFormGroup.Right,
                        null,
                        React.createElement(
                            'span',
                            null,
                            '不限'
                        )
                    );
                } else {
                    rightDom = React.createElement(
                        _commonFormGroup.Right,
                        null,
                        React.createElement(
                            'div',
                            { style: { margin: '5px 0' } },
                            '每天',
                            React.createElement(
                                'span',
                                null,
                                dailyLimit.startTime
                            ),
                            '开始抢票'
                        ),
                        React.createElement(
                            'div',
                            { style: { margin: '5px 0' } },
                            React.createElement(
                                'span',
                                {
                                    style: { paddingTop: '5px', display: 'inline-block' } },
                                '每天成本限制：'
                            ),
                            React.createElement(
                                'div',
                                { style: { display: 'inline-block', verticalAlign: 'top' } },
                                costdDom
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { margin: '5px 0' } },
                            React.createElement(
                                'span',
                                {
                                    style: { paddingTop: '5px', display: 'inline-block' } },
                                '每天张数限制：'
                            ),
                            React.createElement(
                                'div',
                                { style: { display: 'inline-block', verticalAlign: 'top' } },
                                numdDom
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { margin: '5px 0' } },
                            '每人每天限量：',
                            user > 0 ? user + '张' : '不限'
                        )
                    );
                }
            } else {
                rightDom = React.createElement(
                    _commonFormGroup.Right,
                    null,
                    React.createElement(
                        _reactSimpleRadioGroup2['default'],
                        { name: 'dailyLimit', value: dailyLimitRadioValue,
                            onChange: dailyLimitHandle },
                        React.createElement(
                            'span',
                            {
                                style: {
                                    color: disableNoLimit ? '#C5C5C5' : 'inherit',
                                    verticalAlign: 'top', display: 'inline-block'
                                } },
                            React.createElement('input', { type: 'radio', value: '0',
                                disabled: disableNoLimit }),
                            '不限'
                        ),
                        '    ',
                        React.createElement('input', { type: 'radio',
                            value: '1'
                        }),
                        '限制'
                    ),
                    (function () {
                        if (dailyLimitRadioValue == 1) {
                            return React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    'div',
                                    { style: { padding: '5px 0' } },
                                    '每天',
                                    React.createElement('input', {
                                        type: 'text',
                                        required: true,
                                        style: { width: '85px' },
                                        className: 'J_timePicker',
                                        valueLink: _this.nestLinkedState(["value", 'startTime'], _this)
                                    }),
                                    '开始抢票'
                                ),
                                React.createElement(
                                    'div',
                                    { style: { padding: '5px 0' } },
                                    React.createElement(
                                        'span',
                                        null,
                                        '每天成本限制：'
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { display: 'inline-block', verticalAlign: 'top' } },
                                        React.createElement(
                                            _reactSimpleRadioGroup2['default'],
                                            { name: 'dailyLimitcost', value: dailyLimitcostRadioValue,
                                                onChange: _this.dailyLimitFiledHandle.bind(_this, 'cost') },
                                            React.createElement('input', { type: 'radio', value: '0' }),
                                            '不限     ',
                                            React.createElement('input', { type: 'radio', value: '1' }),
                                            '限制'
                                        ),
                                        costdDom
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { style: { padding: '5px 0' } },
                                    React.createElement(
                                        'span',
                                        null,
                                        '每天张数限制：'
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { display: 'inline-block', verticalAlign: 'top' } },
                                        React.createElement(
                                            _reactSimpleRadioGroup2['default'],
                                            { name: 'dailyLimitnum', value: dailyLimitnumRadioValue,
                                                onChange: _this.dailyLimitFiledHandle.bind(_this, 'num') },
                                            React.createElement('input', { type: 'radio', value: '0' }),
                                            '不限     ',
                                            React.createElement('input', { type: 'radio', value: '1' }),
                                            '限制'
                                        ),
                                        numdDom
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { style: { padding: '5px 0' } },
                                    React.createElement(
                                        'span',
                                        null,
                                        '每人每天限量：'
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { display: 'inline-block', verticalAlign: 'top' } },
                                        React.createElement(
                                            _reactSimpleRadioGroup2['default'],
                                            { name: 'dailyLimituser', value: dailyLimituserRadioValue,
                                                onChange: function (newValue) {
                                                    var newState = _this.state;
                                                    if (newValue == 0) {
                                                        newState.value.user = 0;
                                                    } else {
                                                        newState.value.user = 2;
                                                    }
                                                    _this.setState(newState);
                                                } },
                                            React.createElement('input', { type: 'radio', value: '0' }),
                                            '不限     ',
                                            React.createElement('input', { type: 'radio', value: '1' }),
                                            '限制',
                                            (function () {
                                                if (dailyLimituserRadioValue == 1) {
                                                    return React.createElement(
                                                        'span',
                                                        null,
                                                        React.createElement('input', _extends({
                                                            required: true
                                                        }, _commonValidatemap2['default'].number, { min: '1',
                                                            style: { width: '85px' },
                                                            valueLink: _this.nestLinkedState(["value", 'user'], _this)
                                                        })),
                                                        ' 张'
                                                    );
                                                }
                                            })()
                                        )
                                    )
                                )
                            );
                        }
                    })()
                );
            }

            return React.createElement(
                _commonFormGroup.Group,
                null,
                React.createElement(
                    _commonFormGroup.Left,
                    null,
                    '每天限量'
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
            disableNoLimit: false,
            dailyLimitHandle: function dailyLimitHandle() {}
        },
        enumerable: true
    }]);

    return DailyLimit;
})(_commonSuperChild2['default']);

exports['default'] = DailyLimit;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});