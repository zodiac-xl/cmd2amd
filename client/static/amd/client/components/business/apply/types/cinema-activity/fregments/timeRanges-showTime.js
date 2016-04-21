'use strict';

define(["/amd/node_modules/react-bootstrap/lib/Button.js","/amd/client/components/common/form-group.js","/amd/client/components/common/super-child.js"], function (ref_0,ref_1,ref_2) {

    var cmd2amdModules = {"react-bootstrap/lib/Button":{"index":0,"path":"node_modules/react-bootstrap/lib/Button.js"},"../../../../../common/form-group":{"index":1,"path":"client/components/common/form-group.js"},"../../../../../common/super-child":{"index":2,"path":"client/components/common/super-child.js"}};
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

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _commonFormGroup = cmd2amdLoadModule('../../../../../common/form-group');

var _commonSuperChild = cmd2amdLoadModule('../../../../../common/super-child');

var _commonSuperChild2 = _interopRequireDefault(_commonSuperChild);

var ShowTimeTimeRange = (function (_SuperChild) {
    _inherits(ShowTimeTimeRange, _SuperChild);

    function ShowTimeTimeRange() {
        _classCallCheck(this, ShowTimeTimeRange);

        _get(Object.getPrototypeOf(ShowTimeTimeRange.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(ShowTimeTimeRange, [{
        key: 'defaultTimeRange',
        value: function defaultTimeRange() {
            return {
                "startDate": "", //*2015-10-01
                "endDate": "", //*2015-11-01
                "startTime": "00:00:00", //*08:00:00
                "endTime": "23:59:59" //*10:00:00
            };
        }
    }, {
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var valueLink = props.valueLink || {};
            var value = valueLink.value || [this.defaultTimeRange()];
            return {
                value: value
            };
        }
    }, {
        key: 'validate',
        value: function validate(startTime) {
            //活动开始时间

            //        3.活动场次时间中，
            //3.1 日期的右区间必须大于等于左区间。
            //3.2 时间的右区间必须大于等于左区间。
            //3.3 所有时间不能出现交叉。
            //3.4 最晚的日期必须大于等于“活动日期”字段的左区间。
            var value = this.state.value;
            var validate = true;
            var times = [];
            value.forEach(function (item) {
                times.push({
                    startDate: new Date(item.startDate + ' 00:00:00').getTime(),
                    endDate: new Date(item.endDate + ' 23:59:59').getTime(),
                    startTime: new Date('2016-01-01 ' + item.startTime).getTime(),
                    endTime: new Date('2016-01-01 ' + item.endTime).getTime()

                });
            });

            times.some(function (item) {
                if (item.startDate > item.endDate) {
                    validate = false;
                    toastr.warning('日期的右区间必须大于等于左区间');
                }
                return !validate;
            });

            if (validate) {
                times.some(function (item) {
                    if (item.startTime > item.endTime) {
                        validate = false;
                        toastr.warning('时间的右区间必须大于等于左区间');
                    }
                    return !validate;
                });
            }

            if (validate) {
                for (var i = 0; i < times.length; i++) {
                    var pre = times[i];
                    var preDateDis = pre.endDate - pre.startDate;
                    var preTimeDis = pre.endTime - pre.startTime;
                    for (var j = i + 1; j < times.length; j++) {
                        var next = times[j];
                        var nextDateDis = next.endDate - next.startDate;
                        var nextTimeDis = next.endTime - next.startTime;

                        //时间 日期交叉
                        var timeCross = preTimeDis + nextTimeDis > Math.max(next.endTime, pre.endTime) - Math.min(next.startTime, pre.startTime);
                        var DateCross = preDateDis + nextDateDis > Math.max(next.endDate, pre.endDate) - Math.min(next.startDate, pre.startDate);

                        if (timeCross && DateCross) {
                            validate = false;
                            toastr.warning('所有时间不能出现交叉');
                            break;
                        }
                    }
                    if (!validate) {
                        break;
                    }
                }
            }

            if (validate) {
                (function () {

                    // 最晚的日期必须大于等于“活动日期”字段的左区间。（活动开始时间）
                    var latestDate = 0;
                    times.forEach(function (item) {
                        latestDate = Math.max(latestDate, item.endDate);
                    });
                    if (latestDate < startTime) {
                        toastr.warning('最晚的日期必须大于等于“活动日期”字段的左区间。');
                        validate = false;
                    }
                })();
            }

            return validate;
        }
    }, {
        key: 'addShowTime',
        value: function addShowTime() {
            var newState = this.state;
            newState.value.push(this.defaultTimeRange());
            this.setState(newState);
        }
    }, {
        key: 'deleteShowTime',
        value: function deleteShowTime(index) {
            var newState = this.state;
            newState.value.splice(index, 1);
            this.setState(newState);
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var _this = this;
            var readOnly = _this.props.readOnly;
            var value = _this.state.value;
            var showTime = value;

            var showTimeDom = [];
            showTime.forEach(function (item, index) {
                var btn = undefined;
                if (index == 0) {
                    btn = React.createElement(
                        _reactBootstrapLibButton2['default'],
                        { onClick: _this.addShowTime.bind(_this) },
                        '增加'
                    );
                } else {
                    btn = React.createElement(
                        _reactBootstrapLibButton2['default'],
                        { onClick: _this.deleteShowTime.bind(_this, index) },
                        '删除'
                    );
                }
                if (readOnly) {
                    showTimeDom.push(React.createElement(
                        'div',
                        { key: index },
                        React.createElement(
                            'div',
                            null,
                            '在日期 ',
                            React.createElement(
                                'span',
                                null,
                                item.startDate
                            ),
                            ' -- ',
                            React.createElement(
                                'span',
                                null,
                                item.endDate
                            ),
                            ' 中，'
                        ),
                        React.createElement(
                            'div',
                            null,
                            '每天   ',
                            React.createElement(
                                'span',
                                null,
                                item.startTime
                            ),
                            ' -- ',
                            React.createElement(
                                'span',
                                null,
                                item.endTime
                            ),
                            ' 的场次。'
                        )
                    ));
                } else {
                    showTimeDom.push(React.createElement(
                        'div',
                        { key: index },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'span',
                                { style: { width: '3.5em', display: 'inline-block' } },
                                '在日期'
                            ),
                            React.createElement('input', {
                                style: { width: '85px' },
                                required: true,
                                className: 'J_datePicker',
                                valueLink: _this.nestLinkedState(["value", index, 'startDate'], _this) }),
                            ' -- ',
                            React.createElement('input', {
                                style: { width: '85px' },
                                required: true,
                                className: 'J_datePicker',
                                valueLink: _this.nestLinkedState(["value", index, 'endDate'], _this) }),
                            ' 中，'
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'span',
                                { style: { width: '3.5em', display: 'inline-block' } },
                                '每天'
                            ),
                            React.createElement('input', {
                                style: { width: '85px' },
                                required: true,
                                className: 'J_timePicker',
                                valueLink: _this.nestLinkedState(["value", index, 'startTime'], _this) }),
                            ' -- ',
                            React.createElement('input', {
                                style: { width: '85px' },
                                required: true,
                                className: 'J_timePicker',
                                valueLink: _this.nestLinkedState(["value", index, 'endTime'], _this) }),
                            ' 的场次。  ',
                            btn
                        )
                    ));
                }
            });
            return React.createElement(
                _commonFormGroup.Group,
                null,
                React.createElement(
                    _commonFormGroup.Left,
                    null,
                    '活动场次时间'
                ),
                '：',
                React.createElement(
                    _commonFormGroup.Right,
                    null,
                    showTimeDom
                )
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

    return ShowTimeTimeRange;
})(_commonSuperChild2['default']);

exports['default'] = ShowTimeTimeRange;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});