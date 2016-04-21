'use strict';

define(["/amd/node_modules/uniqid/index.js","/amd/node_modules/react-bootstrap/lib/Button.js","/amd/client/components/common/form-group.js","/amd/client/components/common/super-child.js","/amd/client/components/common/checkbox-group.js","/amd/client/components/util/dateformat.js"], function (ref_1,ref_2,ref_3,ref_4,ref_5,ref_6) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"uniqid":{"index":0,"path":"node_modules/uniqid/index.js"},"react-bootstrap/lib/Button":{"index":1,"path":"node_modules/react-bootstrap/lib/Button.js"},"../../../../common/form-group":{"index":2,"path":"client/components/common/form-group.js"},"../../../../common/super-child":{"index":3,"path":"client/components/common/super-child.js"},"../../../../common/checkbox-group":{"index":4,"path":"client/components/common/checkbox-group.js"},"../../../../util/dateformat":{"index":5,"path":"client/components/util/dateformat.js"}};
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

var _uniqid = cmd2amdLoadModule('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _commonFormGroup = cmd2amdLoadModule('../../../../common/form-group');

var _commonSuperChild = cmd2amdLoadModule('../../../../common/super-child');

var _commonSuperChild2 = _interopRequireDefault(_commonSuperChild);

var _commonCheckboxGroup = cmd2amdLoadModule('../../../../common/checkbox-group');

var _commonCheckboxGroup2 = _interopRequireDefault(_commonCheckboxGroup);

cmd2amdLoadModule('../../../../util/dateformat');

var TimeRanges = (function (_SuperChild) {
    _inherits(TimeRanges, _SuperChild);

    function TimeRanges() {
        _classCallCheck(this, TimeRanges);

        _get(Object.getPrototypeOf(TimeRanges.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(TimeRanges, [{
        key: 'defaultTimeRange',
        value: function defaultTimeRange() {
            return {
                "startDate": "",
                "endDate": "",
                "startTime": "00:00:00",
                "endTime": "23:59:59",
                "weekDays": 127 //星期，7位二进制数字分别表示周一到周日，例如1111100=121表示周一到周五
            };
        }
    }, {
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var valueLink = props.valueLink || {};
            var value = valueLink.value && valueLink.value.length > 0 ? valueLink.value : [this.defaultTimeRange()];

            return {
                value: value
            };
        }
    }, {
        key: 'addTimeRange',
        value: function addTimeRange() {
            var newState = this.state;
            newState.value.push(this.defaultTimeRange());
            this.setState(newState);
        }
    }, {
        key: 'deleteTimeRange',
        value: function deleteTimeRange(index) {
            var newState = this.state;
            newState.value.splice(index, 1);
            this.setState(newState);
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var _this = this;
            var leftStyle = {
                width: "8em"
            };
            var timeRangesData = _this.state.value;
            var makeTimeRanges = function makeTimeRanges(timeRangesData) {
                var timeRanges = [];
                $.each(timeRangesData, function (timeRangesIndex) {
                    var weekDays10 = _this.state['value'][timeRangesIndex]['weekDays'];
                    var weekDays2 = ("0000000" + parseInt(weekDays10).toString(2)).slice(-7);
                    var activeDays = [];
                    for (var i = 0; i < 7; i++) {
                        if (weekDays2[i] == 1) {
                            activeDays.push(String(i));
                        }
                    }
                    var timeRangeCheckBoxName = 'timeRange-' + (0, _uniqid2['default'])() + '-' + timeRangesIndex;
                    var timeRangeCheckBoxHandleChange = function timeRangeCheckBoxHandleChange(timeRangesIndex) {
                        var newActiveDays = _this.refs[timeRangeCheckBoxName].getCheckedValues();
                        var newWeekDays2 = "0000000";
                        var newWeekDays10 = undefined;
                        var newState = _this.state;
                        newWeekDays2 = newWeekDays2.split('');
                        newActiveDays.forEach(function (item, i) {
                            newWeekDays2[item * 1] = 1;
                        });
                        newWeekDays2 = newWeekDays2.join('');
                        newWeekDays10 = parseInt(newWeekDays2, 2);

                        newState['value'][timeRangesIndex]['weekDays'] = newWeekDays10;
                        _this.setState(newState);
                    };

                    var ifMakeContractOffline = false;
                    if (_this.state.value[timeRangesIndex].endDate == '2099-12-31') {
                        ifMakeContractOffline = true;
                    }
                    var timeRange = _react2['default'].createElement(
                        'div',
                        { key: 'timeRange-' + timeRangesIndex },
                        _react2['default'].createElement(
                            _commonFormGroup.Group,
                            null,
                            _react2['default'].createElement(
                                _commonFormGroup.Left,
                                { style: leftStyle },
                                '场次时段价格' + (timeRangesIndex * 1 + 1)
                            ),
                            '：',
                            _react2['default'].createElement(
                                _commonFormGroup.Right,
                                null,
                                _react2['default'].createElement(
                                    'span',
                                    { style: { display: 'inline-block', position: 'relative' } },
                                    _react2['default'].createElement('input', { type: 'text', className: 'J_datePicker', required: true, title: '场次时段',
                                        valueLink: _this.nestLinkedState(['value', timeRangesIndex, 'startDate'], _this) })
                                ),
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    '----'
                                ),
                                _react2['default'].createElement(
                                    'span',
                                    { style: { display: 'inline-block', position: 'relative' } },
                                    _react2['default'].createElement('input', { type: 'text', className: 'J_datePicker', disabled: ifMakeContractOffline, style: ifMakeContractOffline ? {
                                            color: '#eee',
                                            background: '#eee'
                                        } : {}, required: true, title: '场次时段',
                                        valueLink: _this.nestLinkedState(['value', timeRangesIndex, 'endDate'], _this) }),
                                    (function () {
                                        if (_this.props.type == 2) {
                                            //1-活动调价 2-常规 3-活动 非调价
                                            return _react2['default'].createElement(
                                                'span',
                                                null,
                                                _react2['default'].createElement('input', { type: 'checkbox', disa: true, name: (0, _uniqid2['default'])(), onChange: (function (timeRangesIndex, e) {
                                                        var newState = this.state;
                                                        newState.value[timeRangesIndex].endDate = e.target.checked ? '2099-12-31' : '';
                                                        _this.setState(newState);
                                                    }).bind(_this, timeRangesIndex), checked: ifMakeContractOffline }),
                                                '至合同下线'
                                            );
                                        }
                                    })()
                                ),
                                (function () {
                                    if (timeRangesIndex != 0) {
                                        return _react2['default'].createElement(
                                            _reactBootstrapLibButton2['default'],
                                            { className: 'pull-right', onClick: _this.deleteTimeRange.bind(_this, timeRangesIndex) },
                                            '删除'
                                        );
                                    }
                                })()
                            )
                        ),
                        _react2['default'].createElement(
                            _commonFormGroup.Group,
                            null,
                            _react2['default'].createElement(
                                _commonFormGroup.Left,
                                { style: leftStyle },
                                '时间'
                            ),
                            '：',
                            _react2['default'].createElement(
                                _commonFormGroup.Right,
                                null,
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    '开始时间：'
                                ),
                                _react2['default'].createElement(
                                    'span',
                                    { style: { display: 'inline-block', position: 'relative' } },
                                    _react2['default'].createElement('input', { type: 'text', className: 'J_timePicker', required: true, title: '开始时间',
                                        valueLink: _this.nestLinkedState(['value', timeRangesIndex, 'startTime'], _this) })
                                ),
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    '----'
                                ),
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    '结束时间：'
                                ),
                                _react2['default'].createElement(
                                    'span',
                                    { style: { display: 'inline-block', position: 'relative' } },
                                    _react2['default'].createElement('input', { type: 'text', className: 'J_timePicker', required: true, title: '结束时间',
                                        valueLink: _this.nestLinkedState(['value', timeRangesIndex, 'endTime'], _this) })
                                )
                            )
                        ),
                        _react2['default'].createElement(
                            _commonFormGroup.Group,
                            null,
                            _react2['default'].createElement(
                                _commonFormGroup.Left,
                                { style: leftStyle },
                                '星期'
                            ),
                            '：',
                            _react2['default'].createElement(
                                _commonFormGroup.Right,
                                null,
                                _react2['default'].createElement(
                                    _commonCheckboxGroup2['default'],
                                    { name: timeRangeCheckBoxName, ref: timeRangeCheckBoxName,
                                        onChange: timeRangeCheckBoxHandleChange.bind(_this, timeRangesIndex),
                                        value: activeDays },
                                    _react2['default'].createElement('input', { type: 'checkbox', value: '0' }),
                                    '周一',
                                    _react2['default'].createElement('input', { type: 'checkbox', value: '1' }),
                                    '周二',
                                    _react2['default'].createElement('input', { type: 'checkbox', value: '2' }),
                                    '周三',
                                    _react2['default'].createElement('input', { type: 'checkbox', value: '3' }),
                                    '周四',
                                    _react2['default'].createElement('input', { type: 'checkbox', value: '4' }),
                                    '周五',
                                    _react2['default'].createElement('input', { type: 'checkbox', value: '5' }),
                                    '周六',
                                    _react2['default'].createElement('input', { type: 'checkbox', value: '6' }),
                                    '周日'
                                )
                            )
                        )
                    );
                    timeRanges.push(timeRange);
                });
                return timeRanges;
            };

            return _react2['default'].createElement(
                'div',
                { style: { paddingTop: '10px' } },
                makeTimeRanges(timeRangesData),
                _react2['default'].createElement(
                    'div',
                    { style: { border: '1px solid black', margin: 5, padding: 5 } },
                    _react2['default'].createElement(
                        'p',
                        { style: { textAlign: 'right' } },
                        '若不同时段的定价相同，请点击右侧“增加”按钮',
                        _react2['default'].createElement(
                            _reactBootstrapLibButton2['default'],
                            { onClick: _this.addTimeRange.bind(_this) },
                            '增加'
                        )
                    ),
                    _react2['default'].createElement(
                        'p',
                        { style: { textAlign: 'right' }, className: 'text-muted' },
                        '若不同时段的定价不同，请点击上方Tab栏的“新增分时段价格”按钮    '
                    )
                )
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            type: 1, //1-活动调价 2-常规 3-活动 非调价
            valueLink: null,
            readOnly: false
        },
        enumerable: true
    }]);

    return TimeRanges;
})(_commonSuperChild2['default']);

exports['default'] = TimeRanges;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});