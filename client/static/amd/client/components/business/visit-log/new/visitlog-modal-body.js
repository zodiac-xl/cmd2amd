'use strict';

define(["/amd/node_modules/react-simple-radio-group/index.js","/amd/client/components/common/form-group.js","/amd/client/components/common/super-child-form.js"], function (ref_0,ref_1,ref_2) {

    var cmd2amdModules = {"react-simple-radio-group":{"index":0,"path":"node_modules/react-simple-radio-group/index.js"},"../../../common/form-group":{"index":1,"path":"client/components/common/form-group.js"},"../../../common/super-child-form":{"index":2,"path":"client/components/common/super-child-form.js"}};
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

var _reactSimpleRadioGroup = cmd2amdLoadModule('react-simple-radio-group');

var _reactSimpleRadioGroup2 = _interopRequireDefault(_reactSimpleRadioGroup);

var _commonFormGroup = cmd2amdLoadModule('../../../common/form-group');

var _commonSuperChildForm = cmd2amdLoadModule('../../../common/super-child-form');

var _commonSuperChildForm2 = _interopRequireDefault(_commonSuperChildForm);

var VisitLogModalBody = (function (_SuperChildFrom) {
    _inherits(VisitLogModalBody, _SuperChildFrom);

    function VisitLogModalBody() {
        _classCallCheck(this, VisitLogModalBody);

        _get(Object.getPrototypeOf(VisitLogModalBody.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(VisitLogModalBody, [{
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            return { value: props.valueLink.value };
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var _this = this;
            var radioGroupValueLink = _this.nestLinkedState(["value", "form"], _this);
            var purpose = _this.state.value.purpose;
            var selectValueLinK = {
                value: purpose,
                requestChange: function requestChange(newValue) {
                    var newState = _this.state;
                    if (newValue != 0) {
                        newState.value.purposeDetail = '';
                    }
                    newState.value.purpose = newValue;
                    _this.setState(newState);
                }
            };
            return React.createElement(
                'div',
                null,
                React.createElement(
                    _commonFormGroup.Group,
                    null,
                    React.createElement(
                        _commonFormGroup.Left,
                        null,
                        '拜访方式'
                    ),
                    '：',
                    React.createElement(
                        _commonFormGroup.Right,
                        null,
                        React.createElement(
                            _reactSimpleRadioGroup2['default'],
                            { name: 'type-form', value: radioGroupValueLink.value,
                                onChange: radioGroupValueLink.requestChange },
                            React.createElement('input', { type: 'radio', value: '1' }),
                            '上门   ',
                            React.createElement('input', { type: 'radio', value: '2' }),
                            '电话   ',
                            React.createElement('input', { type: 'radio', value: '3' }),
                            '接待'
                        )
                    )
                ),
                React.createElement(
                    _commonFormGroup.Group,
                    null,
                    React.createElement(
                        _commonFormGroup.Left,
                        null,
                        '拜访日期'
                    ),
                    '：',
                    React.createElement(
                        _commonFormGroup.Right,
                        null,
                        React.createElement('input', { type: 'text', required: true, className: 'J_datePicker',
                            valueLink: _this.nestLinkedState(["value", "date"], _this) })
                    )
                ),
                React.createElement(
                    _commonFormGroup.Group,
                    null,
                    React.createElement(
                        _commonFormGroup.Left,
                        null,
                        '联系人'
                    ),
                    '：',
                    React.createElement(
                        _commonFormGroup.Right,
                        null,
                        React.createElement('input', { type: 'text', required: true, valueLink: _this.nestLinkedState(["value", "contacts"], _this) })
                    )
                ),
                React.createElement(
                    _commonFormGroup.Group,
                    null,
                    React.createElement(
                        _commonFormGroup.Left,
                        null,
                        '联系方式'
                    ),
                    '：',
                    React.createElement(
                        _commonFormGroup.Right,
                        null,
                        React.createElement('input', { type: 'text', placeholder: '可选',
                            valueLink: _this.nestLinkedState(["value", "contactInfo"], _this) })
                    )
                ),
                React.createElement(
                    _commonFormGroup.Group,
                    null,
                    React.createElement(
                        _commonFormGroup.Left,
                        null,
                        '职位'
                    ),
                    '：',
                    React.createElement(
                        _commonFormGroup.Right,
                        null,
                        React.createElement('input', { type: 'text', placeholder: '可选',
                            valueLink: _this.nestLinkedState(["value", "position"], _this) })
                    )
                ),
                React.createElement(
                    _commonFormGroup.Group,
                    null,
                    React.createElement(
                        _commonFormGroup.Left,
                        null,
                        '拜访目的'
                    ),
                    '：',
                    React.createElement(
                        _commonFormGroup.Right,
                        null,
                        React.createElement(
                            'select',
                            { valueLink: selectValueLinK },
                            React.createElement(
                                'option',
                                { value: '1' },
                                '挖掘需求'
                            ),
                            React.createElement(
                                'option',
                                { value: '2' },
                                '项目推进'
                            ),
                            React.createElement(
                                'option',
                                { value: '3' },
                                '介绍产品'
                            ),
                            React.createElement(
                                'option',
                                { value: '4' },
                                '签约'
                            ),
                            React.createElement(
                                'option',
                                { value: '5' },
                                '回访'
                            ),
                            React.createElement(
                                'option',
                                { value: '0' },
                                '其他目的'
                            )
                        ),
                        '    ',
                        (function () {
                            if (purpose == 0) {
                                //如果"purposes"字段为0时需要填写，其它传空字符串""
                                return React.createElement('input', { type: 'text', required: true,
                                    valueLink: _this.nestLinkedState(["value", "purposeDetail"], _this) });
                            }
                        })()
                    )
                ),
                React.createElement(
                    _commonFormGroup.Group,
                    null,
                    React.createElement(
                        _commonFormGroup.Left,
                        null,
                        '拜访内容'
                    ),
                    '：',
                    React.createElement(
                        _commonFormGroup.Right,
                        null,
                        React.createElement('textarea', { required: true, valueLink: _this.nestLinkedState(["value", "content"], _this), rows: '12', cols: '45' })
                    )
                )
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            valueLink: null
        },
        enumerable: true
    }]);

    return VisitLogModalBody;
})(_commonSuperChildForm2['default']);

exports['default'] = VisitLogModalBody;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});