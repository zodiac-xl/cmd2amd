'use strict';

define(["/amd/node_modules/uniqid/index.js","/amd/node_modules/array-unique/index.js","/amd/node_modules/react-bootstrap/lib/Tabs.js","/amd/node_modules/react-bootstrap/lib/Tab.js","/amd/node_modules/react-bootstrap/lib/Button.js","/amd/node_modules/react-bootstrap-datetimepicker/lib/DateTimeField.js","/amd/client/components/common/super-child.js","/amd/client/components/util/bdAjax.js","css!/amd/client/components/business/negotiation/price-plans/index.css","/amd/client/components/business/negotiation/price-plans/fragments/time-ranges.js","/amd/client/components/business/negotiation/price-plans/fragments/movie-groups/index.js"], function (ref_2,ref_3,ref_4,ref_5,ref_6,ref_7,ref_8,ref_9,ref_10,ref_11,ref_12) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"uniqid":{"index":0,"path":"node_modules/uniqid/index.js"},"array-unique":{"index":1,"path":"node_modules/array-unique/index.js"},"react-bootstrap/lib/Tabs":{"index":2,"path":"node_modules/react-bootstrap/lib/Tabs.js"},"react-bootstrap/lib/Tab":{"index":3,"path":"node_modules/react-bootstrap/lib/Tab.js"},"react-bootstrap/lib/Button":{"index":4,"path":"node_modules/react-bootstrap/lib/Button.js"},"react-bootstrap-datetimepicker":{"index":5,"path":"node_modules/react-bootstrap-datetimepicker/lib/DateTimeField.js"},"../../../common/super-child":{"index":6,"path":"client/components/common/super-child.js"},"../../../util/bdAjax":{"index":7,"path":"client/components/util/bdAjax.js"},"./index.less":{"index":8,"path":"client/components/business/negotiation/price-plans/index.less"},"./fragments/time-ranges":{"index":9,"path":"client/components/business/negotiation/price-plans/fragments/time-ranges.js"},"./fragments/movie-groups":{"index":10,"path":"client/components/business/negotiation/price-plans/fragments/movie-groups/index.js"}};
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

var _reactDom = cmd2amdLoadModule('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _uniqid = cmd2amdLoadModule('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

var _arrayUnique = cmd2amdLoadModule('array-unique');

var _arrayUnique2 = _interopRequireDefault(_arrayUnique);

var _reactBootstrapLibTabs = cmd2amdLoadModule('react-bootstrap/lib/Tabs');

var _reactBootstrapLibTabs2 = _interopRequireDefault(_reactBootstrapLibTabs);

var _reactBootstrapLibTab = cmd2amdLoadModule('react-bootstrap/lib/Tab');

var _reactBootstrapLibTab2 = _interopRequireDefault(_reactBootstrapLibTab);

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _reactBootstrapDatetimepicker = cmd2amdLoadModule('react-bootstrap-datetimepicker');

var _reactBootstrapDatetimepicker2 = _interopRequireDefault(_reactBootstrapDatetimepicker);

var _commonSuperChild = cmd2amdLoadModule('../../../common/super-child');

var _commonSuperChild2 = _interopRequireDefault(_commonSuperChild);

var _utilBdAjax = cmd2amdLoadModule('../../../util/bdAjax');

var _utilBdAjax2 = _interopRequireDefault(_utilBdAjax);

cmd2amdLoadModule('./index.less');

//fragments

var _fragmentsTimeRanges = cmd2amdLoadModule('./fragments/time-ranges');

var _fragmentsTimeRanges2 = _interopRequireDefault(_fragmentsTimeRanges);

var _fragmentsMovieGroups = cmd2amdLoadModule('./fragments/movie-groups');

var _fragmentsMovieGroups2 = _interopRequireDefault(_fragmentsMovieGroups);

var PricePlans = (function (_SuperChild) {
    _inherits(PricePlans, _SuperChild);

    function PricePlans() {
        _classCallCheck(this, PricePlans);

        _get(Object.getPrototypeOf(PricePlans.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(PricePlans, [{
        key: 'defaultPricePlan',
        value: function defaultPricePlan() {
            return {
                timeRanges: [],
                movieGroups: []
            };
        }
    }, {
        key: 'getActiveWeekDays',
        value: function getActiveWeekDays(weekDays10) {
            var weekDays2 = ("0000000" + parseInt(weekDays10).toString(2)).slice(-7);
            var activeDays = [];
            for (var i = 0; i < 7; i++) {
                if (weekDays2[i] == 1) {
                    activeDays.push(String(i));
                }
            }
            return activeDays;
        }
    }, {
        key: 'validate',
        value: function validate() {

            var _this = this;
            var _thisComponent = _reactDom2['default'].findDOMNode(_this);
            var validate = true;
            var pricePlans = _this.state.value;

            var validateInputs = [];
            var $validateInputs = $(_thisComponent).find("input[required]");
            $validateInputs.each(function (i, validateInput) {
                validateInputs.push(validateInput);
            });
            validateInputs.some(function (validateInput) {
                if (!validateInput.validity.valid) {
                    var _ret = (function () {
                        var message = validateInput.validationMessage;
                        var title = validateInput.title;
                        var $validateInput = $(validateInput);
                        var tabIndex = [].indexOf.call($(_thisComponent).find(".tab-content .tab-pane"), $validateInput.closest(".tab-pane")[0]);

                        _this.refs.tabs.setState({
                            activeKey: tabIndex
                        });
                        setTimeout(function () {
                            $validateInput.focus();
                        }, 300);

                        toastr.warning(message ? message.replace('此字段', title) : '请填写' + title);
                        validate = false;
                        return {
                            v: true
                        };
                    })();

                    if (typeof _ret === 'object') return _ret.v;
                }
            });
            if (!validate) {
                return validate;
            }

            //二级验证 禁止结算价均为“不参加此次调价”的申请提交
            pricePlans.some(function (pricePlan, i) {
                var allNotJoin = true;
                pricePlan.movieGroups.some(function (movieGroup, j) {
                    movieGroup.priceInfos.some(function (priceInfo) {
                        priceInfo.purchasePrice.some(function (purchasePrice) {
                            if (purchasePrice.type != 0 && priceInfo.halls.length > 0) {
                                allNotJoin = false;
                            }
                            return !allNotJoin;
                        });
                        return !allNotJoin;
                    });
                    return !allNotJoin;
                });
                if (allNotJoin) {
                    toastr.warning('分时段价格' + (i * 1 + 1) + '中结算价均为“不参加此次调价”,禁止提交');
                    validate = false;
                }
                return !validate;
            });

            if (!validate) {
                return validate;
            }

            //二级验证 禁止开始时间大于结束时间
            var times = [];
            pricePlans.forEach(function (pricePlan, i) {
                pricePlan.timeRanges.forEach(function (timeRange, j) {
                    var startNum = Date.parse(timeRange.startDate + ' ' + timeRange.startTime);
                    var endNum = Date.parse(timeRange.endDate + ' ' + timeRange.endTime);
                    times.push({
                        startNum: startNum,
                        endNum: endNum,
                        weekDays: timeRange.weekDays,
                        des: '分时段价格' + (i * 1 + 1) + '中场次时段' + (j * 1 + 1)
                    });
                });
            });

            //禁止开始时间大于结束时间
            times.some(function (time) {
                if (time.startNum >= time.endNum) {
                    toastr.warning('场次时段有误，请修改' + time.des);
                    validate = false;
                }
                return !validate;
            });

            if (!validate) {
                return validate;
            }

            //禁止时间段重叠 待优化逻辑
            //for (let i = 0; i < times.length - 1; i++) {
            //    let pre = times[i];
            //    let preDistance = pre.endNum - pre.startNum;
            //    let preActiveWeekDays = _this.getActiveWeekDays(pre.weekDays);
            //
            //    for (let j = i + 1; j < times.length; j++) {
            //        let next = times[j];
            //        let nextDistance = next.endNum - next.startNum;
            //        let nextActiveWeekDays = _this.getActiveWeekDays(next.weekDays);
            //
            //        // {startNum:1,endNum:3}  {startNum:4,endNum:5}    (5-1) > ((3-1) +(5-4))   ok
            //        // {startNum:1,endNum:3}  {startNum:2,endNum:5}    (5-1) < ((3-1) +(5-2))   时间段重贴
            //        if ((preDistance + nextDistance) > (Math.max(pre.endNum, next.endNum) - Math.min(pre.startNum, next.startNum))) {
            //            let megergedDays = preActiveWeekDays.concat(nextActiveWeekDays);
            //            megergedDays = arrayUnique(megergedDays);
            //            if (megergedDays.length < (preActiveWeekDays.length + nextActiveWeekDays.length)) {//周末有重叠
            //                toastr.warning(`场次时段有误，请修改${next.des}`);
            //                validate = false;
            //                break;
            //            }
            //        }
            //    }
            //    if (!validate) {
            //        break;
            //    }
            //}

            return validate;
        }
    }, {
        key: 'customGetValue',
        value: function customGetValue() {
            var _this = this;

            if (!this.validate()) {
                return null;
            }

            var pricePlans = _this.state.value;
            return pricePlans;
        }
    }, {
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var _this = this;
            var valueLink = props.valueLink || {};
            var value = valueLink.value && valueLink.value.length > 0 ? valueLink.value : [this.defaultPricePlan()];

            return {
                value: value
            };
        }
    }, {
        key: 'deletePricePlan',
        value: function deletePricePlan(index) {
            var _this = this;
            var newState = _this.state;
            if (newState.value.length > 1) {
                newState.value.splice(index, 1);
                this.setState(newState, function () {
                    //for tabsComponent的state不会随父组件更新 activeKey仍然是删除tab的key 导致无tab可显示
                    var tabsComponent = _this.refs.tabs;
                    var newTabsState = tabsComponent.state;
                    newTabsState.activeKey = index < newState.value.length ? index : 0;
                    newTabsState.previousActiveKey = null;
                    tabsComponent.setState(newTabsState);
                });
            } else {
                toastr.warning('请至少保留1个分时段');
            }
        }
    }, {
        key: 'addPricePlan',
        value: function addPricePlan() {
            var newState = this.state;
            if (newState.value.length < 9) {
                newState.value.push(this.defaultPricePlan());
                this.setState(newState);
            } else {
                toastr.warning('已经添加9个分时段啦，如需继续添加，请单独创建新的申请');
            }
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var _this2 = this;

            var _this = this;
            var tabs = [];
            var value = _this.state.value;
            $.each(value, function (index, item) {

                var eventKey = index;
                var title = '分时段价格' + (index * 1 + 1);
                var deleteButtonStyle = {
                    paddingLef: '15px',
                    position: 'relative',
                    top: '-2px',
                    cursor: 'pointer'
                };
                var deleteButton = _react2['default'].createElement(
                    'button',
                    { type: 'button', style: deleteButtonStyle,
                        onClick: _this.deletePricePlan.bind(_this2, index), className: 'close',
                        'aria-label': 'Close' },
                    _react2['default'].createElement(
                        'span',
                        { 'aria-hidden': 'true' },
                        '×'
                    )
                );

                title = _react2['default'].createElement(
                    'span',
                    null,
                    title,
                    ' ',
                    deleteButton
                );

                tabs.push(_react2['default'].createElement(
                    _reactBootstrapLibTab2['default'],
                    { key: index, eventKey: index, ref: 'tab' + index, title: title },
                    _react2['default'].createElement(_fragmentsTimeRanges2['default'], { type: _this.props.type,
                        valueLink: _this.nestLinkedState(['value', index, 'timeRanges'], _this) }),
                    _react2['default'].createElement(_fragmentsMovieGroups2['default'], { valueLink: _this.nestLinkedState(['value', index, 'movieGroups'], _this),
                        movieOptions: _this.props.movieOptions, cinemaId: _this.props.cinemaId })
                ));
            });

            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    _reactBootstrapLibTabs2['default'],
                    { defaultActiveKey: 0, ref: 'tabs' },
                    _react2['default'].createElement(
                        _reactBootstrapLibButton2['default'],
                        { onClick: _this.addPricePlan.bind(_this), style: {
                                float: 'right',
                                transform: 'translateY(-150%)'
                            } },
                        '新增分时段定价'
                    ),
                    tabs
                )
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            type: 1, //1-活动调价 2-常规 3-活动 非调价
            valueLink: null,
            readOnly: false,
            movieOptions: [],
            cinemaId: null
        },
        enumerable: true
    }]);

    return PricePlans;
})(_commonSuperChild2['default']);

exports['default'] = PricePlans;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});