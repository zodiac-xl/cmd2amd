'use strict';

define(["/amd/client/components/util/dataFormat.js","/amd/client/components/common/validatemap.js","/amd/client/components/common/form-group.js","/amd/client/components/common/super-child-form.js","/amd/client/components/util/dateformat.js","/amd/client/components/business/apply/types/cinema-activity/fregments/timeRange.js","/amd/client/components/business/apply/types/cinema-activity/fregments/activity-type.js","/amd/client/components/business/apply/types/cinema-activity/fregments/timeRanges-showTime.js","/amd/client/components/business/apply/types/cinema-activity/fregments/movies.js","/amd/client/components/business/apply/types/cinema-activity/fregments/limits/cost.js","/amd/client/components/business/apply/types/cinema-activity/fregments/limits/totalLimit.js","/amd/client/components/business/apply/types/cinema-activity/fregments/limits/userLimit.js","/amd/client/components/business/apply/types/cinema-activity/fregments/limits/dailyLimit.js","/amd/client/components/business/apply/types/cinema-activity/fregments/limits/settleLimit.js","/amd/client/components/business/apply/types/cinema-activity/fregments/limits/subsideRules.js","/amd/client/components/business/apply/types/cinema-activity/fregments/saleDate.js"], function (ref_1,ref_2,ref_3,ref_4,ref_5,ref_6,ref_7,ref_8,ref_9,ref_10,ref_11,ref_12,ref_13,ref_14,ref_15,ref_16) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"../../../../util/dataFormat":{"index":0,"path":"client/components/util/dataFormat.js"},"../../../../common/validatemap":{"index":1,"path":"client/components/common/validatemap.js"},"../../../../common/form-group":{"index":2,"path":"client/components/common/form-group.js"},"../../../../common/super-child-form":{"index":3,"path":"client/components/common/super-child-form.js"},"../../../../util/dateformat.js":{"index":4,"path":"client/components/util/dateformat.js"},"./fregments/timeRange":{"index":5,"path":"client/components/business/apply/types/cinema-activity/fregments/timeRange.js"},"./fregments/activity-type":{"index":6,"path":"client/components/business/apply/types/cinema-activity/fregments/activity-type.js"},"./fregments/timeRanges-showTime":{"index":7,"path":"client/components/business/apply/types/cinema-activity/fregments/timeRanges-showTime.js"},"./fregments/movies":{"index":8,"path":"client/components/business/apply/types/cinema-activity/fregments/movies.js"},"./fregments/limits/cost":{"index":9,"path":"client/components/business/apply/types/cinema-activity/fregments/limits/cost.js"},"./fregments/limits/totalLimit":{"index":10,"path":"client/components/business/apply/types/cinema-activity/fregments/limits/totalLimit.js"},"./fregments/limits/userLimit":{"index":11,"path":"client/components/business/apply/types/cinema-activity/fregments/limits/userLimit.js"},"./fregments/limits/dailyLimit":{"index":12,"path":"client/components/business/apply/types/cinema-activity/fregments/limits/dailyLimit.js"},"./fregments/limits/settleLimit":{"index":13,"path":"client/components/business/apply/types/cinema-activity/fregments/limits/settleLimit.js"},"./fregments/limits/subsideRules":{"index":14,"path":"client/components/business/apply/types/cinema-activity/fregments/limits/subsideRules.js"},"./fregments/saleDate":{"index":15,"path":"client/components/business/apply/types/cinema-activity/fregments/saleDate.js"}};
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

var _utilDataFormat = cmd2amdLoadModule('../../../../util/dataFormat');

var _commonValidatemap = cmd2amdLoadModule('../../../../common/validatemap');

var _commonValidatemap2 = _interopRequireDefault(_commonValidatemap);

var _commonFormGroup = cmd2amdLoadModule('../../../../common/form-group');

var _commonSuperChildForm = cmd2amdLoadModule('../../../../common/super-child-form');

var _commonSuperChildForm2 = _interopRequireDefault(_commonSuperChildForm);

cmd2amdLoadModule('../../../../util/dateformat.js');

//fregments

var _fregmentsTimeRange = cmd2amdLoadModule('./fregments/timeRange');

var _fregmentsTimeRange2 = _interopRequireDefault(_fregmentsTimeRange);

var _fregmentsActivityType = cmd2amdLoadModule('./fregments/activity-type');

var _fregmentsActivityType2 = _interopRequireDefault(_fregmentsActivityType);

var _fregmentsTimeRangesShowTime = cmd2amdLoadModule('./fregments/timeRanges-showTime');

var _fregmentsTimeRangesShowTime2 = _interopRequireDefault(_fregmentsTimeRangesShowTime);

var _fregmentsMovies = cmd2amdLoadModule('./fregments/movies');

var _fregmentsMovies2 = _interopRequireDefault(_fregmentsMovies);

var _fregmentsLimitsCost = cmd2amdLoadModule('./fregments/limits/cost');

var _fregmentsLimitsCost2 = _interopRequireDefault(_fregmentsLimitsCost);

var _fregmentsLimitsTotalLimit = cmd2amdLoadModule('./fregments/limits/totalLimit');

var _fregmentsLimitsTotalLimit2 = _interopRequireDefault(_fregmentsLimitsTotalLimit);

var _fregmentsLimitsUserLimit = cmd2amdLoadModule('./fregments/limits/userLimit');

var _fregmentsLimitsUserLimit2 = _interopRequireDefault(_fregmentsLimitsUserLimit);

var _fregmentsLimitsDailyLimit = cmd2amdLoadModule('./fregments/limits/dailyLimit');

var _fregmentsLimitsDailyLimit2 = _interopRequireDefault(_fregmentsLimitsDailyLimit);

var _fregmentsLimitsSettleLimit = cmd2amdLoadModule('./fregments/limits/settleLimit');

var _fregmentsLimitsSettleLimit2 = _interopRequireDefault(_fregmentsLimitsSettleLimit);

var _fregmentsLimitsSubsideRules = cmd2amdLoadModule('./fregments/limits/subsideRules');

var _fregmentsLimitsSubsideRules2 = _interopRequireDefault(_fregmentsLimitsSubsideRules);

var _fregmentsSaleDate = cmd2amdLoadModule('./fregments/saleDate');

var _fregmentsSaleDate2 = _interopRequireDefault(_fregmentsSaleDate);

var update = _react.addons.update;

var CinemaActivity = (function (_SuperChildFrom) {
    _inherits(CinemaActivity, _SuperChildFrom);

    function CinemaActivity() {
        _classCallCheck(this, CinemaActivity);

        _get(Object.getPrototypeOf(CinemaActivity.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(CinemaActivity, [{
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var _this = this;
            var lastValue = _this.lastValue || null;
            var valueLink = props.valueLink || {};
            var value = valueLink.value;
            var defaultValue = {
                //单影院活动申请特有字段 *表示必填

                "startTime": "", //活动开始时间*
                "endTime": "", //活动结束时间*
                "cost": 0, //成本，浮点数，单位"元"* number  0为不限制
                "info": {
                    "form": "票补", //*包括“票补”、“第三方补贴”、“服务费减免”，默认为“票补”。
                    "showTime": [{
                        "startDate": "", //*2015-10-01
                        "endDate": "", //*2015-11-01
                        "startTime": "00:00:00", //*08:00:00
                        "endTime": "23:59:59" //*10:00:00
                    }],
                    "movies": { // 影片信息，全部影片则data为空json数组{"inverse":false, "data":[]}    ***new
                        "inverse": false, //是否反选
                        "data": [//影片列表
                        ]
                    },
                    "totalLimit": 0, //总量限制* number  不限为0
                    "userLimit": 2, //每人限量* number 不限为0 默认为“限制 2 张“
                    "dailyLimit": { //每天限量*  不限为{}           ***edit
                        dateArr: [], //辅助字段

                        "startTime": "11:00:00",
                        "cost": [//每天成本限制，不限为[]
                        ],
                        "num": [//每天张数限制，不限为[]
                        ],
                        "user": 2 //每人每天限量，不限为0
                    },
                    "settleLimit": true, //结算价限量                                            ***new
                    "subsidyRules": [{ //*补贴规则
                        "version": 0, //版本，7位二进制数字由低位到高位分别表示2D,2DIMAX,3D,3DIMAX,4D,2D巨幕,3D巨幕，例如1111110=126表示除2D外所有版本。全部用0表示
                        "rules": [{
                            "maxSettle": '',
                            "minSettle": '',
                            "type": 1, //1-每张补贴，2-一口价，3-服务费
                            "price": '',
                            "competitors": 0, //竞对，"type"为4-动态售价时生效，其余传0。二进制表示，第n位分别代表：1-"豆瓣",2-"时光网",5-"格瓦拉",7-"QQ",8-"点评",9-"微信",10-"糯米", 11-"淘宝"。例如11100010000=1808表示"淘宝","糯米","微信","格瓦拉"。
                            "maxSubsidy": 0, //最多补贴，"type"为4-动态售价时生效，其余传0
                            "minSubsidy": 0 //最少补贴，"type"为4-动态售价时生效，其余传0
                        }],
                        "additional": ""
                    }],
                    "saleDate": { //*结算价降价日期  rule:2015-01-01
                        "start": "",
                        "end": ""
                    }
                }

            };
            var newValue = update(defaultValue, { $merge: value });

            if (newValue.info) {
                //根据form 类型 修正subsidyRule type
                //a. "form" 包括“票补”、“第三方补贴”、“服务费减免”，默认为“票补”。
                //b."type"  1-每张补贴，2-一口价，3-服务费
                if (newValue.info.form == "服务费减免") {
                    newValue.info.subsidyRules.map(function (subsidyRule) {
                        subsidyRule.rules.map(function (item) {
                            item.type = 3;
                            return item;
                        });
                        return subsidyRule;
                    });
                } else {
                    newValue.info.subsidyRules.map(function (subsidyRule) {
                        subsidyRule.rules.map(function (item) {
                            if (item.type == 3) {
                                item.type = 1;
                            }
                            return item;
                        });
                        return subsidyRule;
                    });
                }

                //活动日期修改
                if (!lastValue || newValue.startTime && newValue.endTime && (lastValue.startTime != newValue.startTime || lastValue.endTime != newValue.endTime)) {
                    if (_this.state && _this.state.value) {
                        var newDailyLimit = _this.dailyLimitHandle();
                        if (newDailyLimit) {
                            newValue.info.dailyLimit = newDailyLimit;
                        }
                    }
                }
                _this.lastValue = update({}, { $merge: newValue });
            }
            return {
                value: newValue
            };
        }
    }, {
        key: 'customValidate',
        value: function customValidate() {
            var _this = this;
            var validate = true;
            validate = this.refs['dailyLimit'].validate();
            if (validate) {
                validate = this.refs['subsidyRules'].validate();
            }

            if (validate) {
                validate = this.refs['showTimeTimeRange'].validate(new Date(_this.state.value.startTime).getTime());
            }

            if (validate) {
                var dailyLimit = _this.state.value.info.dailyLimit;

                //1.每天成本限制若为“限制”，则各分天成本之和必须大于等于活动成本。
                if (dailyLimit.cost && dailyLimit.cost.length > 0) {
                    var totalCost = 0;
                    dailyLimit.cost.forEach(function (item) {
                        totalCost += item.limit * 1;
                    });
                    if (totalCost < _this.state.value.cost) {
                        toastr.warning('每天成本限制若为“限制”，则各分天成本之和必须大于等于活动成本');
                        validate = false;
                    }
                }

                if (validate) {
                    //2.每天张数限制若为“限制”，则各分天张数之和必须大于等于总量限制。。
                    if (dailyLimit.num && dailyLimit.num.length > 0) {
                        var totalNum = 0;
                        dailyLimit.num.forEach(function (item) {
                            totalNum += item.limit * 1;
                        });
                        if (totalNum < _this.state.value.info.totalLimit * 1) {
                            toastr.warning('每天张数限制若为“限制”，则各分天张数之和必须大于等于总量限制。。');
                            validate = false;
                        }
                    }
                }
            }

            return validate;
        }
    }, {
        key: 'dailyLimitHandle',
        value: function dailyLimitHandle(newValue) {
            var _this = this;
            var radioValue = undefined;
            if (newValue == undefined) {
                var disableNoLimit = _this.state.value.info.form != '服务费减免';
                if (!_this.state.value.info.dailyLimit.startTime && !disableNoLimit) {
                    //dailyLimit为空 且form是服务费减免 为不限制
                    radioValue = 0;
                } else {
                    radioValue = 1;
                }
            } else {
                radioValue = newValue;
            }

            var value = _this.state.value;
            var endTimeNum = new Date(value.endTime).getTime();
            var startTimeNum = new Date(value.startTime).getTime();
            var dayDistance = Math.floor((endTimeNum - startTimeNum) / (1000 * 60 * 60 * 24) * 1);

            var newState = _this.state;
            var newDailyLimit = null;
            var dateArr = [];
            if (radioValue == 1) {
                //需要限制每日量
                if (dayDistance >= 0) {
                    newDailyLimit = { //每天限量*  不限为{}           ***edit
                        "startTime": "11:00:00",
                        "cost": [//每天成本限制，不限为[]
                        ],
                        "num": [//每天张数限制，不限为[]
                        ],
                        "user": 2 //每人每天限量，不限为0
                    };
                    var periodDateNum = startTimeNum;
                    while (dayDistance + 1) {
                        var date = new Date(periodDateNum).Format('yyyy-MM-dd');
                        dateArr.push(date);
                        newDailyLimit.cost.push({
                            "date": date,
                            "limit": ''
                        });
                        newDailyLimit.num.push({
                            "date": new Date(periodDateNum).Format('yyyy-MM-dd'),
                            "limit": ''
                        });
                        periodDateNum += 1000 * 60 * 60 * 24 * 1;
                        dayDistance--;
                    }
                } else {
                    newDailyLimit = {};
                    toastr.warning("活动日期 结束日期应该大于开始日期");
                }
            } else {
                newDailyLimit = {};
            }
            newDailyLimit.dateArr = dateArr;
            if (newValue == undefined) {
                return newDailyLimit;
            } else {
                if (newDailyLimit) {
                    newState.value.info.dailyLimit = newDailyLimit;
                    _this.setState(newState);
                }
            }
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var _this = this;
            var readOnly = _this.props.readOnly;
            var value = _this.state.value;
            var disableNoLimit = _this.state.value.info && _this.state.value.info.form != '服务费减免';
            return _react2['default'].createElement(
                'div',
                null,
                (function () {
                    if (value.info && value.info.form) {
                        return _react2['default'].createElement(_fregmentsActivityType2['default'], { readOnly: readOnly,
                            valueLink: _this.nestLinkedState(["value", "info", "form"], _this) });
                    }
                })(),
                _react2['default'].createElement(_fregmentsTimeRange2['default'], { readOnly: readOnly, valueLink: {
                        value: {
                            "startTime": value.startTime,
                            "endTime": value.endTime
                        },
                        requestChange: function requestChange(newValue) {
                            var newState = _this.state;
                            newState.value.startTime = newValue.startTime;
                            newState.value.endTime = newValue.endTime;
                            _this.setState(newState);
                        }
                    } }),
                (function () {
                    if (value.info && value.info.showTime) {

                        return _react2['default'].createElement(_fregmentsTimeRangesShowTime2['default'], { ref: 'showTimeTimeRange', readOnly: readOnly,
                            valueLink: _this.nestLinkedState(["value", "info", "showTime"], _this) });
                    }
                })(),
                (function () {
                    if (value.info && value.info.movies) {

                        return _react2['default'].createElement(_fregmentsMovies2['default'], { readOnly: readOnly,
                            valueLink: _this.nestLinkedState(["value", "info", "movies"], _this) });
                    }
                })(),
                _react2['default'].createElement(_fregmentsLimitsCost2['default'], { readOnly: readOnly, disableNoLimit: disableNoLimit,
                    valueLink: _this.nestLinkedState(["value", "cost"], _this) }),
                (function () {
                    if (_this.state.value.info) {
                        //活动形式为“票补”或“第三方补贴”时：“不限”置灰无法选择；默认选择“限制 XX 张”，必填，

                        return _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(_fregmentsLimitsTotalLimit2['default'], { readOnly: readOnly, disableNoLimit: disableNoLimit,
                                valueLink: _this.nestLinkedState(["value", "info", "totalLimit"], _this) }),
                            _react2['default'].createElement(_fregmentsLimitsUserLimit2['default'], { readOnly: readOnly, disableNoLimit: disableNoLimit,
                                valueLink: _this.nestLinkedState(["value", "info", "userLimit"], _this) }),
                            _react2['default'].createElement(_fregmentsLimitsDailyLimit2['default'], { ref: 'dailyLimit', readOnly: readOnly, disableNoLimit: disableNoLimit,
                                valueLink: _this.nestLinkedState(["value", "info", "dailyLimit"], _this),
                                dailyLimitHandle: _this.dailyLimitHandle.bind(_this) }),
                            _react2['default'].createElement(_fregmentsLimitsSettleLimit2['default'], { readOnly: readOnly,
                                valueLink: _this.nestLinkedState(["value", "info", "settleLimit"], _this) }),
                            _react2['default'].createElement(_fregmentsSaleDate2['default'], { readOnly: readOnly,
                                valueLink: _this.nestLinkedState(["value", "info", "saleDate"], _this) }),
                            _react2['default'].createElement(_fregmentsLimitsSubsideRules2['default'], { readOnly: readOnly, form: value.info.form, ref: 'subsidyRules',
                                valueLink: _this.nestLinkedState(["value", "info", "subsidyRules"], _this) })
                        );
                    }
                })()
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

    return CinemaActivity;
})(_commonSuperChildForm2['default']);

exports['default'] = CinemaActivity;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});