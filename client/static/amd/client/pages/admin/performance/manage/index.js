'use strict';

define(["/amd/client/components/layout/page-layout.js","/amd/node_modules/date-format/lib/index.js","/amd/node_modules/react-addons-update/index.js","/amd/node_modules/react-bootstrap/lib/index.js","/amd/client/components/common/my-table.js","/amd/client/components/business/performance/operate-standards.js","/amd/client/components/business/performance/edit-performance.js","/amd/client/components/util/url.js"], function (ref_0,ref_2,ref_3,ref_4,ref_5,ref_6,ref_7,ref_8) {

    var cmd2amdModules = {"../../../../components/layout/page-layout":{"index":0,"path":"client/components/layout/page-layout.js"},"react-dom":{"external":"ReactDOM","index":null,"path":null},"date-format":{"index":1,"path":"node_modules/date-format/lib/index.js"},"react-addons-update":{"index":2,"path":"node_modules/react-addons-update/index.js"},"react-bootstrap":{"index":3,"path":"node_modules/react-bootstrap/lib/index.js"},"../../../../components/common/my-table":{"index":4,"path":"client/components/common/my-table.js"},"../../../../components/business/performance/operate-standards":{"index":5,"path":"client/components/business/performance/operate-standards.js"},"../../../../components/business/performance/edit-performance":{"index":6,"path":"client/components/business/performance/edit-performance.js"},"../../../../components/util/url":{"index":7,"path":"client/components/util/url.js"}};
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

var _componentsLayoutPageLayout = cmd2amdLoadModule('../../../../components/layout/page-layout');

var _componentsLayoutPageLayout2 = _interopRequireDefault(_componentsLayoutPageLayout);

var _reactDom = cmd2amdLoadModule('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dateFormat = cmd2amdLoadModule('date-format');

var _dateFormat2 = _interopRequireDefault(_dateFormat);

var _reactAddonsUpdate = cmd2amdLoadModule('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _reactBootstrap = cmd2amdLoadModule('react-bootstrap');

var _componentsCommonMyTable = cmd2amdLoadModule('../../../../components/common/my-table');

var _componentsCommonMyTable2 = _interopRequireDefault(_componentsCommonMyTable);

var _componentsBusinessPerformanceOperateStandards = cmd2amdLoadModule('../../../../components/business/performance/operate-standards');

var _componentsBusinessPerformanceOperateStandards2 = _interopRequireDefault(_componentsBusinessPerformanceOperateStandards);

var _componentsBusinessPerformanceEditPerformance = cmd2amdLoadModule('../../../../components/business/performance/edit-performance');

var _componentsBusinessPerformanceEditPerformance2 = _interopRequireDefault(_componentsBusinessPerformanceEditPerformance);

var _componentsUtilUrl = cmd2amdLoadModule('../../../../components/util/url');

var _componentsUtilUrl2 = _interopRequireDefault(_componentsUtilUrl);

var PerformanceManage = (function (_Page) {
    _inherits(PerformanceManage, _Page);

    function PerformanceManage() {
        _classCallCheck(this, _PerformanceManage);

        _get(Object.getPrototypeOf(_PerformanceManage.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            timeScreen: (0, _dateFormat2['default'])("yyyyMM", new Date()), //年份和月份组合，格式为“年份月份”，如：201510
            type: 0, //请求的类型，0为分区经理1为BD
            data: []
        };
    }

    _createClass(PerformanceManage, [{
        key: 'operateStandards',
        value: function operateStandards(type, subTrData) {
            var _this = this;
            var container = _reactDom2['default'].findDOMNode(this.refs['container-edit-performance']);
            var props = {
                operateType: type || "new",
                performanceTarget: "",
                evaluationCriteria: "",
                weight: "",
                type: 0,
                freshParent: this.reRender.bind(this)
            };
            switch (type) {
                case "new":
                    props = $.extend(props, {
                        type: _this.state.type
                    });
                    break;
                case "delete":
                    props = $.extend(props, {
                        bdTargetId: subTrData.bdTargetModel.id
                    });
                    break;
            }
            _reactDom2['default'].unmountComponentAtNode(container);
            var component = _reactDom2['default'].render(React.createElement(_componentsBusinessPerformanceOperateStandards2['default'], props), container);
        }
    }, {
        key: 'editPerformance',
        value: function editPerformance(subTrData) {
            var container = _reactDom2['default'].findDOMNode(this.refs['container-operatestandards']);
            var props = {
                bdPerformanceId: subTrData.id,
                point: subTrData.point,
                execution: subTrData.execution,
                score: subTrData.score,
                freshParent: this.reRender.bind(this)
            };
            _reactDom2['default'].unmountComponentAtNode(container);
            var component = _reactDom2['default'].render(React.createElement(_componentsBusinessPerformanceEditPerformance2['default'], props), container);
        }
    }, {
        key: 'onTypeChange',
        value: function onTypeChange(e) {
            var newType = e.target.value;
            this.getData(newType, this.state.timeScreen);
        }
    }, {
        key: 'onTimeScreenChange',
        value: function onTimeScreenChange(e) {
            var newTime = e.target.value;
            this.getData(this.state.type, newTime);
        }
    }, {
        key: 'getData',
        value: function getData(type, timeScreen) {
            var _this = this;
            var apiMap = {
                performanceList: {
                    api: "/api/admin/performance/list.json",
                    des: "获取bd绩效列表"
                }
            };

            this.ajax({
                url: apiMap.performanceList.api,
                data: {
                    timeScreen: timeScreen,
                    type: type
                },
                des: apiMap.performanceList.des
            }).done(function (e) {
                _this.setState({
                    data: e.data,
                    type: type,
                    timeScreen: timeScreen
                });
            });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.getData(this.state.type, this.state.timeScreen);
        }
    }, {
        key: 'reRender',
        value: function reRender() {
            this.getData(this.state.type, this.state.timeScreen);
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {

            var _this = this;

            //时间筛选
            //可筛选从2015年11月至当前月份的下个月期间的所有月份，默认为当前月份。
            // 例如当前为2016年1月，则可筛选2015年11月至2016年2月期间的所有月份，且默认为2016年1月。
            //month和week 尾巴开始计数  11 to 10
            var startMonth = 2015 * 12 + 10;
            var endMonth = new Date().getFullYear() * 12 + new Date().getMonth() + 1; //+1  下一个月（for:begin with 0）
            var timeOptions = [];
            while (!(startMonth > endMonth)) {
                var time = new Date(new Date().setDate(1)).setFullYear(Math.floor(startMonth / 12));
                time = new Date(time).setMonth(startMonth % 12);

                timeOptions.push(React.createElement(
                    'option',
                    { key: startMonth,
                        value: (0, _dateFormat2['default'])("yyyyMM", new Date(time)) },
                    (0, _dateFormat2['default'])("yyyy年MM月", new Date(time))
                ));
                startMonth++;
            }

            //table data
            var tableData = {
                ths: {
                    bd: "BD",
                    region: "区域",
                    performanceTarget: "绩效指标",
                    point: "目标",
                    execution: "完成情况",
                    score: "分数",
                    operate: "操作"
                },
                trs: []
            };
            $.each(this.state.data, function (index, trData) {
                var performance = [];
                trData.bdPerformance && $.each(trData.bdPerformance, function (i, subTrData) {
                    var style = {
                        color: "white",
                        border: "1em",
                        background: "black",
                        height: "1em",
                        width: "1em",
                        borderRadius: "1em",
                        display: "inline-block",
                        lineHeight: "1em",
                        marginRight: "0.5em",
                        cursor: "pointer"
                    };
                    var _performanceTarget = "";
                    var title = "";
                    if (subTrData.bdTargetModel) {
                        _performanceTarget = subTrData.bdTargetModel.performanceTarget;
                        title = '评估标准：' + subTrData.bdTargetModel.evaluationCriteria + '\n权重：' + subTrData.bdTargetModel.weight;
                    }
                    performance.push({
                        performanceTarget: function performanceTarget() {
                            return React.createElement(
                                'span',
                                null,
                                React.createElement(
                                    'a',
                                    { style: style, title: title },
                                    '?'
                                ),
                                _performanceTarget
                            );
                        },
                        point: subTrData.point,
                        execution: subTrData.execution,
                        score: subTrData.score,
                        operate: function operate(tdKey, rowSpan, style) {
                            var performanceDetailUrl = '/admin/performance/detail';
                            performanceDetailUrl = _componentsUtilUrl2['default'].addQueryStringArg(performanceDetailUrl, {
                                BD: subTrData.bdName + '（' + subTrData.bdLogin + '）',
                                performanceTarget: subTrData.bdTargetModel && subTrData.bdTargetModel.performanceTarget || '',
                                timeScreen: subTrData.timeScreen,
                                type: subTrData.type,
                                bdId: subTrData.bdId,
                                targetId: subTrData.bdTargetModel && subTrData.bdTargetModel.id
                            });
                            return React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    _reactBootstrap.Button,
                                    { onClick: _this.editPerformance.bind(_this, subTrData) },
                                    '调整整体绩效'
                                ),
                                React.createElement(
                                    'a',
                                    { href: performanceDetailUrl },
                                    React.createElement(
                                        _reactBootstrap.Button,
                                        null,
                                        '查看详情'
                                    )
                                )
                            );
                        }
                    });
                });
                tableData.trs.push({
                    bd: trData.bdName,
                    bdOrg: trData.bdOrg,
                    bdPerformance: performance
                });
            });

            var setStandardsUrl = '/admin/performance/set_standards?type=' + this.state.type + '&timeScreen=' + this.state.timeScreen;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'select',
                        { value: this.state.type, onChange: this.onTypeChange.bind(this) },
                        React.createElement(
                            'option',
                            { value: '0' },
                            '分区绩效管理'
                        ),
                        React.createElement(
                            'option',
                            { value: '1' },
                            'BD绩效管理'
                        )
                    ),
                    '    ',
                    React.createElement(
                        'select',
                        { value: this.state.timeScreen, onChange: this.onTimeScreenChange.bind(this) },
                        timeOptions
                    ),
                    React.createElement(
                        'div',
                        { style: { float: "right", marginBottom: "5px" } },
                        React.createElement(
                            'a',
                            { href: setStandardsUrl },
                            React.createElement(
                                _reactBootstrap.Button,
                                null,
                                '绩效指标设置'
                            )
                        )
                    )
                ),
                React.createElement(_componentsCommonMyTable2['default'], { data: tableData }),
                React.createElement('div', { ref: 'container-edit-performance' }),
                React.createElement('div', { ref: 'container-operatestandards' })
            );
        }
    }]);

    var _PerformanceManage = PerformanceManage;
    PerformanceManage = (0, _componentsLayoutPageLayout.page)(PerformanceManage) || PerformanceManage;
    return PerformanceManage;
})(_componentsLayoutPageLayout2['default']);

exports['default'] = PerformanceManage;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});