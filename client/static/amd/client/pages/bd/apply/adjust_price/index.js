'use strict';

define(["/amd/client/components/layout/page-layout.js","/amd/node_modules/react-bootstrap/lib/Button.js","/amd/node_modules/react-nest-link-state/NestLinkedStateMixin.js","/amd/client/components/util/url.js","/amd/client/components/common/my-table.js","/amd/client/components/common/pagination-advanced.js","/amd/client/components/business/record-form/record-form.js","/amd/client/components/business/negotiation/negotiation.js"], function (ref_0,ref_1,ref_2,ref_3,ref_4,ref_5,ref_6,ref_7) {

    var cmd2amdModules = {"../../../../components/layout/page-layout":{"index":0,"path":"client/components/layout/page-layout.js"},"react-bootstrap/lib/Button":{"index":1,"path":"node_modules/react-bootstrap/lib/Button.js"},"react-nest-link-state":{"index":2,"path":"node_modules/react-nest-link-state/NestLinkedStateMixin.js"},"../../../../components/util/url":{"index":3,"path":"client/components/util/url.js"},"../../../../components/common/my-table":{"index":4,"path":"client/components/common/my-table.js"},"../../../../components/common/pagination-advanced":{"index":5,"path":"client/components/common/pagination-advanced.js"},"../../../../components/business/record-form/record-form":{"index":6,"path":"client/components/business/record-form/record-form.js"},"../../../../components/business/negotiation/negotiation":{"index":7,"path":"client/components/business/negotiation/negotiation.js"}};
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

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _reactNestLinkState = cmd2amdLoadModule('react-nest-link-state');

var _reactNestLinkState2 = _interopRequireDefault(_reactNestLinkState);

var _componentsUtilUrl = cmd2amdLoadModule('../../../../components/util/url');

var _componentsUtilUrl2 = _interopRequireDefault(_componentsUtilUrl);

var _componentsCommonMyTable = cmd2amdLoadModule('../../../../components/common/my-table');

var _componentsCommonMyTable2 = _interopRequireDefault(_componentsCommonMyTable);

var _componentsCommonPaginationAdvanced = cmd2amdLoadModule('../../../../components/common/pagination-advanced');

var _componentsCommonPaginationAdvanced2 = _interopRequireDefault(_componentsCommonPaginationAdvanced);

var _componentsBusinessRecordFormRecordForm = cmd2amdLoadModule('../../../../components/business/record-form/record-form');

var _componentsBusinessRecordFormRecordForm2 = _interopRequireDefault(_componentsBusinessRecordFormRecordForm);

var _componentsBusinessNegotiationNegotiation = cmd2amdLoadModule('../../../../components/business/negotiation/negotiation');

var _componentsBusinessNegotiationNegotiation2 = _interopRequireDefault(_componentsBusinessNegotiationNegotiation);

var taskList = (function (_Page) {
    _inherits(taskList, _Page);

    function taskList() {
        _classCallCheck(this, _taskList);

        _get(Object.getPrototypeOf(_taskList.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            listData: [],
            query: {
                cinema: _componentsUtilUrl2['default'].getUrlArg('cinemaId'),
                status: '0',
                offset: 0,
                limit: 10
            }
        };
        this.nestLinkedState = _reactNestLinkState2['default'].nestLinkedState;
    }

    _createClass(taskList, [{
        key: 'queryHandler',
        value: function queryHandler(query) {
            var _this = this;

            query = $.extend(_this.state.query, query || {});

            var api = {
                url: "/api/price/applies.json",
                des: "获取调价申请列表",
                data: query
            };

            this.ajax(api).done(function (e) {
                if (e.data) {
                    var newState = _this.state;
                    var totalSize = e.totalSize;
                    newState.listData = e.data;
                    newState.query = query;
                    _this.setState(newState);
                    _this.refs.paginationAdvanced.onQuery(query, totalSize);
                }
            });
        }
    }, {
        key: 'normalQueryHandler',
        value: function normalQueryHandler(status) {
            var _this = this;
            this.queryHandler({
                cinema: _this.refs['cinema'].value,
                status: _this.refs['status'].value,
                offset: 0
            });
        }
    }, {
        key: 'record',
        value: function record(data) {
            var container = ReactDOM.findDOMNode(this.refs['container-record']);
            var props = {
                applyType: 2,
                applyId: data.id,
                cinemaId: data.cinemaId,
                cinemaName: data.cinemaName,
                statusDesc: data.statusDesc
            };
            ReactDOM.unmountComponentAtNode(container);
            var component = ReactDOM.render(React.createElement(_componentsBusinessRecordFormRecordForm2['default'], props), container);
        }
    }, {
        key: 'negotiation',
        value: function negotiation(data, operateType, applyId) {
            var container = ReactDOM.findDOMNode(this.refs['container-negotiation']);
            var props = {

                type: 2, //1-活动调价 2-常规
                sellSrc: data.sellSrc,
                operateType: operateType,
                applyId: applyId,
                taskId: this.props.taskId,
                cinemaId: data.cinemaId,
                cinemaName: data.cinemaName,
                freshParent: this.queryHandler.bind(this)
            };

            ReactDOM.unmountComponentAtNode(container);
            var component = ReactDOM.render(React.createElement(_componentsBusinessNegotiationNegotiation2['default'], props), container);
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {

            var _this = this;
            var tableData = {
                ths: ["调价申请ID", "影院ID", "影院名", "最近操作时间", "状态", "操作"],
                trs: []
            };

            $.each(_this.state.listData, function (index, item) {
                var tr = {
                    id: item.id,
                    cinemaId: item.cinemaId,
                    cinemaName: item.cinemaName,
                    modified: item.modified,
                    statusDesc: item.statusDesc,
                    operate: function operate() {
                        return function (style, rowSpan, tdKey) {
                            var canEdit = true;
                            if (item.status == 3 || item.status == 4 || item.status == 5) {
                                canEdit = false;
                            }
                            return React.createElement(
                                'td',
                                { style: style, rowSpan: rowSpan, key: tdKey },
                                React.createElement(
                                    _reactBootstrapLibButton2['default'],
                                    {
                                        onClick: _this.negotiation.bind(_this, item, canEdit ? 'edit' : 'check', item.id) },
                                    canEdit ? '修改' : '查看'
                                ),
                                '   ',
                                React.createElement(
                                    _reactBootstrapLibButton2['default'],
                                    { onClick: _this.record.bind(_this, item) },
                                    '调价申请记录'
                                )
                            );
                        };
                    }
                };
                tableData.trs.push(tr);
            });

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { style: { marginBottom: '10px', textAlign: "right" } },
                    React.createElement(
                        'span',
                        null,
                        '影院ID/影院名：',
                        React.createElement('input', { type: 'text', ref: 'cinema' }),
                        '  ',
                        React.createElement(
                            _reactBootstrapLibButton2['default'],
                            { onClick: _this.normalQueryHandler.bind(_this) },
                            '查询'
                        )
                    ),
                    '    ',
                    React.createElement(
                        'span',
                        null,
                        '状态：',
                        React.createElement(
                            'select',
                            { defaultValue: -1, ref: 'status', onChange: (function (e) {
                                    _this.queryHandler({
                                        status: e.target.value,
                                        offset: 0
                                    });
                                }).bind(_this) },
                            React.createElement(
                                'option',
                                { value: '0' },
                                '全部'
                            ),
                            React.createElement(
                                'option',
                                { value: '1' },
                                '待调价'
                            ),
                            React.createElement(
                                'option',
                                { value: '2' },
                                '被驳回'
                            ),
                            React.createElement(
                                'option',
                                { value: '3' },
                                '已取消'
                            ),
                            React.createElement(
                                'option',
                                { value: '4' },
                                '开始调价'
                            ),
                            React.createElement(
                                'option',
                                { value: '5' },
                                '已完成调价'
                            )
                        )
                    )
                ),
                React.createElement(_componentsCommonMyTable2['default'], { data: tableData }),
                React.createElement(
                    'div',
                    { className: 'pull-right' },
                    React.createElement(_componentsCommonPaginationAdvanced2['default'], { onQueryHandler: _this.queryHandler.bind(_this), ref: 'paginationAdvanced' })
                ),
                React.createElement('div', { ref: 'container-record' }),
                React.createElement('div', { ref: 'container-negotiation' })
            );
        }
    }]);

    var _taskList = taskList;
    taskList = (0, _componentsLayoutPageLayout.page)(taskList) || taskList;
    return taskList;
})(_componentsLayoutPageLayout2['default']);

exports['default'] = taskList;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});