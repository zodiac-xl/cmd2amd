'use strict';

define(["/amd/client/components/layout/page-layout.js","/amd/node_modules/react-addons-update/index.js","/amd/node_modules/react-bootstrap/lib/index.js","/amd/node_modules/date-format/lib/index.js","/amd/client/components/common/my-table.js","/amd/client/components/util/url.js","/amd/client/components/business/performance/operate-standards.js","/amd/client/components/business/performance/import-performance.js"], function (ref_0,ref_1,ref_2,ref_3,ref_4,ref_5,ref_6,ref_7) {

    var cmd2amdModules = {"../../../../components/layout/page-layout":{"index":0,"path":"client/components/layout/page-layout.js"},"react-addons-update":{"index":1,"path":"node_modules/react-addons-update/index.js"},"react-bootstrap":{"index":2,"path":"node_modules/react-bootstrap/lib/index.js"},"date-format":{"index":3,"path":"node_modules/date-format/lib/index.js"},"../../../../components/common/my-table":{"index":4,"path":"client/components/common/my-table.js"},"../../../../components/util/url":{"index":5,"path":"client/components/util/url.js"},"../../../../components/business/performance/operate-standards":{"index":6,"path":"client/components/business/performance/operate-standards.js"},"../../../../components/business/performance/import-performance":{"index":7,"path":"client/components/business/performance/import-performance.js"}};
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

var _reactAddonsUpdate = cmd2amdLoadModule('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _reactBootstrap = cmd2amdLoadModule('react-bootstrap');

var _dateFormat = cmd2amdLoadModule('date-format');

var _dateFormat2 = _interopRequireDefault(_dateFormat);

var _componentsCommonMyTable = cmd2amdLoadModule('../../../../components/common/my-table');

var _componentsCommonMyTable2 = _interopRequireDefault(_componentsCommonMyTable);

var _componentsUtilUrl = cmd2amdLoadModule('../../../../components/util/url');

var _componentsUtilUrl2 = _interopRequireDefault(_componentsUtilUrl);

var _componentsBusinessPerformanceOperateStandards = cmd2amdLoadModule('../../../../components/business/performance/operate-standards');

var _componentsBusinessPerformanceOperateStandards2 = _interopRequireDefault(_componentsBusinessPerformanceOperateStandards);

var _componentsBusinessPerformanceImportPerformance = cmd2amdLoadModule('../../../../components/business/performance/import-performance');

var _componentsBusinessPerformanceImportPerformance2 = _interopRequireDefault(_componentsBusinessPerformanceImportPerformance);

var StandardsSet = (function (_Page) {
    _inherits(StandardsSet, _Page);

    function StandardsSet() {
        _classCallCheck(this, _StandardsSet);

        _get(Object.getPrototypeOf(_StandardsSet.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            timeScreen: _componentsUtilUrl2['default'].getUrlArg("timeScreen", location.search), //年份和月份组合，格式为“年份月份”，如：201510
            type: _componentsUtilUrl2['default'].getUrlArg("type", location.search), //请求的类型，0为分区经理1为BD
            data: []
        };
    }

    _createClass(StandardsSet, [{
        key: 'importPerformance',
        value: function importPerformance(trData, performanceType) {
            var _this = this;
            var container = ReactDOM.findDOMNode(this.refs['container-import-performance']);
            var props = {
                targetId: trData.id || 0, //绩效指标id,
                performanceType: performanceType || 0, // 0 为整体绩效  1为poi绩效
                type: _this.state.type,
                timeScreen: _this.state.timeScreen,
                freshParent: this.reRender.bind(this)
            };
            ReactDOM.unmountComponentAtNode(container);
            var component = ReactDOM.render(React.createElement(_componentsBusinessPerformanceImportPerformance2['default'], props), container);
        }
    }, {
        key: 'exportPerformance',
        value: function exportPerformance(trData) {
            var _this = this;
            _this.ajax({
                url: '/api/admin/performance/data.json',
                des: '导出BD绩效',
                showSuccess: true,
                data: {
                    targetId: trData.id,
                    type: _this.state.type,
                    timeScreen: _this.state.timeScreen
                }
            });
        }
    }, {
        key: 'operateStandards',
        value: function operateStandards(type, trData) {
            type = type || 'new';

            var container = ReactDOM.findDOMNode(this.refs['container-operatestandards']);
            var props = {
                operateType: type,
                performanceTarget: "",
                evaluationCriteria: "",
                weight: "",
                type: _componentsUtilUrl2['default'].getUrlArg("type", location.search),
                timeScreen: _componentsUtilUrl2['default'].getUrlArg("timeScreen", location.search),
                freshParent: this.reRender.bind(this)
            };
            switch (type) {
                case "new":
                    break;
                case "edit":
                    props = $.extend(props, {
                        performanceTarget: trData.performanceTarget,
                        evaluationCriteria: trData.evaluationCriteria,
                        weight: trData.weight,
                        bdTargetId: trData.id
                    });
                    break;
                case "delete":
                    props = $.extend(props, {
                        bdTargetId: trData.id
                    });
                    break;
            }
            ReactDOM.unmountComponentAtNode(container);
            var component = ReactDOM.render(React.createElement(_componentsBusinessPerformanceOperateStandards2['default'], props), container);
        }
    }, {
        key: 'reRender',
        value: function reRender() {
            this.getData();
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.getData();
        }
    }, {
        key: 'getData',
        value: function getData() {
            var _this = this;

            var type = _componentsUtilUrl2['default'].getUrlArg("type", location.search);
            var timeScreen = _componentsUtilUrl2['default'].getUrlArg("timeScreen", location.search);
            _this.setState({
                type: _this.state.type || 0,
                timeScreen: _this.state.timeScreen || (0, _dateFormat2['default'])("yyyyMM")
            });

            var apiMap = {
                targetList: {
                    api: "/api/admin/target/targets.json",
                    des: "获取绩效指标列表 "
                }
            };

            this.ajax({
                url: apiMap.targetList.api,
                data: {
                    timeScreen: _this.state.timeScreen,
                    type: _this.state.type
                },
                des: apiMap.targetList.des
            }).done(function (e) {
                _this.setState({ data: e.data });
            });
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {

            var _this = this;

            //table data
            var tableData = {
                ths: {
                    performanceTarget: "绩效指标",
                    evaluationCriteria: "评估标准",
                    weight: "权重",
                    operate: "操作"
                },
                trs: []
            };
            $.each(this.state.data, function (index, trData) {
                tableData.trs.push({
                    performanceTarget: trData.performanceTarget,
                    evaluationCriteria: trData.evaluationCriteria,
                    weight: trData.weight,
                    operate: function operate(tdKey, rowSpan, style) {
                        var bdTargetId = trData.id;
                        return React.createElement(
                            'div',
                            null,
                            React.createElement(
                                _reactBootstrap.Button,
                                { onClick: _this.importPerformance.bind(_this, trData, 0) },
                                '导入整体绩效'
                            ),
                            React.createElement(
                                _reactBootstrap.Button,
                                { onClick: _this.importPerformance.bind(_this, trData, 1) },
                                '导入POI绩效'
                            ),
                            React.createElement(
                                _reactBootstrap.Button,
                                { onClick: _this.exportPerformance.bind(_this, trData) },
                                '导出'
                            ),
                            React.createElement(
                                _reactBootstrap.Button,
                                { onClick: _this.operateStandards.bind(_this, "edit", trData) },
                                '编辑'
                            ),
                            React.createElement(
                                _reactBootstrap.Button,
                                { onClick: _this.operateStandards.bind(_this, "delete", trData) },
                                '删除'
                            )
                        );
                    }
                });
            });

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'a',
                            { href: '/admin/performance/manage' },
                            React.createElement(
                                _reactBootstrap.Button,
                                null,
                                '返回绩效管理'
                            )
                        ),
                        '    ',
                        React.createElement(
                            _reactBootstrap.Button,
                            { onClick: this.operateStandards.bind(this, "new") },
                            '新增绩效指标'
                        )
                    ),
                    React.createElement('p', null)
                ),
                React.createElement(_componentsCommonMyTable2['default'], { data: tableData }),
                React.createElement('div', { ref: 'container-import-performance' }),
                React.createElement('div', { ref: 'container-operatestandards' })
            );
        }
    }]);

    var _StandardsSet = StandardsSet;
    StandardsSet = (0, _componentsLayoutPageLayout.page)(StandardsSet) || StandardsSet;
    return StandardsSet;
})(_componentsLayoutPageLayout2['default']);

exports['default'] = StandardsSet;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});