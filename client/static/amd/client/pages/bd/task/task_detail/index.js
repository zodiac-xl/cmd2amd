'use strict';

define(["/amd/node_modules/react-bootstrap/lib/Button.js","/amd/client/components/layout/page-layout.js","/amd/client/components/common/my-table.js","/amd/client/components/common/pagination-advanced.js","/amd/client/components/util/url.js","/amd/client/components/business/notes-form/notes-form.js","/amd/client/components/business/negotiation/negotiation.js","/amd/client/components/business/negotiation/uploadFile.js","/amd/client/components/business/addCinema/index.js","/amd/node_modules/uniqid/index.js"], function (ref_1,ref_2,ref_3,ref_4,ref_5,ref_6,ref_7,ref_8,ref_9,ref_10) {

    var cmd2amdModules = {"react-dom":{"external":"ReactDOM","index":null,"path":null},"react-bootstrap/lib/Button":{"index":0,"path":"node_modules/react-bootstrap/lib/Button.js"},"../../../../components/layout/page-layout":{"index":1,"path":"client/components/layout/page-layout.js"},"../../../../components/common/my-table":{"index":2,"path":"client/components/common/my-table.js"},"../../../../components/common/pagination-advanced":{"index":3,"path":"client/components/common/pagination-advanced.js"},"../../../../components/util/url":{"index":4,"path":"client/components/util/url.js"},"../../../../components/business/notes-form/notes-form":{"index":5,"path":"client/components/business/notes-form/notes-form.js"},"../../../../components/business/negotiation/negotiation":{"index":6,"path":"client/components/business/negotiation/negotiation.js"},"../../../../components/business/negotiation/uploadFile":{"index":7,"path":"client/components/business/negotiation/uploadFile.js"},"../../../../components/business/addCinema":{"index":8,"path":"client/components/business/addCinema/index.js"},"uniqid":{"index":9,"path":"node_modules/uniqid/index.js"}};
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

var _reactDom = cmd2amdLoadModule('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _componentsLayoutPageLayout = cmd2amdLoadModule('../../../../components/layout/page-layout');

var _componentsLayoutPageLayout2 = _interopRequireDefault(_componentsLayoutPageLayout);

var _componentsCommonMyTable = cmd2amdLoadModule('../../../../components/common/my-table');

var _componentsCommonMyTable2 = _interopRequireDefault(_componentsCommonMyTable);

var _componentsCommonPaginationAdvanced = cmd2amdLoadModule('../../../../components/common/pagination-advanced');

var _componentsCommonPaginationAdvanced2 = _interopRequireDefault(_componentsCommonPaginationAdvanced);

var _componentsUtilUrl = cmd2amdLoadModule('../../../../components/util/url');

var _componentsUtilUrl2 = _interopRequireDefault(_componentsUtilUrl);

var _componentsBusinessNotesFormNotesForm = cmd2amdLoadModule('../../../../components/business/notes-form/notes-form');

var _componentsBusinessNotesFormNotesForm2 = _interopRequireDefault(_componentsBusinessNotesFormNotesForm);

var _componentsBusinessNegotiationNegotiation = cmd2amdLoadModule('../../../../components/business/negotiation/negotiation');

var _componentsBusinessNegotiationNegotiation2 = _interopRequireDefault(_componentsBusinessNegotiationNegotiation);

var _componentsBusinessNegotiationUploadFile = cmd2amdLoadModule('../../../../components/business/negotiation/uploadFile');

var _componentsBusinessNegotiationUploadFile2 = _interopRequireDefault(_componentsBusinessNegotiationUploadFile);

var _componentsBusinessAddCinema = cmd2amdLoadModule('../../../../components/business/addCinema');

var _componentsBusinessAddCinema2 = _interopRequireDefault(_componentsBusinessAddCinema);

var _uniqid = cmd2amdLoadModule('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

var TaskDetail = (function (_Page) {
    _inherits(TaskDetail, _Page);

    function TaskDetail() {
        _classCallCheck(this, _TaskDetail);

        _get(Object.getPrototypeOf(_TaskDetail.prototype), 'constructor', this).apply(this, arguments);

        this.state = (function () {

            return {
                overviewTable: {
                    data: {
                        ths: [],
                        trs: []
                    },
                    list: []
                },
                cinemasTable: {
                    data: {
                        ths: ["影院ID", "影院名", "大区", "分区", "城市", "状态", "备注", "操作"],
                        trs: []
                    },
                    list: []
                },
                taskInfo: {},
                query: {}
            };
        })();
    }

    _createClass(TaskDetail, [{
        key: 'operateNegotiation',
        value: function operateNegotiation(cinemaId, cinemaName, operateType, type, auditType, committed) {
            var container = _reactDom2['default'].findDOMNode(this.refs['container-negotiation']);
            var props = {
                operateType: operateType,
                type: type, //1-活动调价 2-常规 3-活动审核不需要调价
                auditType: auditType, //taskData.auditType == 1 ? "需要审核" : "不需要审核"
                committed: committed,
                freshParent: this.freshTable.bind(this),
                taskId: this.props.taskId,
                cinemaId: cinemaId,
                cinemaName: cinemaName,
                taskInfo: this.state.taskInfo
            };
            _reactDom2['default'].unmountComponentAtNode(container);
            var component = _reactDom2['default'].render(React.createElement(_componentsBusinessNegotiationNegotiation2['default'], props), container);
        }
    }, {
        key: 'uploadFile',
        value: function uploadFile(cinemaId, cinemaName) {
            var container = _reactDom2['default'].findDOMNode(this.refs['container-upload']);
            var props = {
                taskId: this.props.taskId,
                cinemaId: cinemaId,
                cinemaName: cinemaName,
                taskInfo: this.state.taskInfo,
                freshParent: this.freshTable.bind(this)
            };
            _reactDom2['default'].unmountComponentAtNode(container);
            var component = _reactDom2['default'].render(React.createElement(_componentsBusinessNegotiationUploadFile2['default'], props), container);
        }
    }, {
        key: 'addCinema',
        value: function addCinema() {
            var container = _reactDom2['default'].findDOMNode(this.refs['container-addCinema']);
            var props = {
                taskId: this.props.taskId,
                freshParent: this.freshTable.bind(this)
            };
            _reactDom2['default'].unmountComponentAtNode(container);
            var component = _reactDom2['default'].render(React.createElement(_componentsBusinessAddCinema2['default'], props), container);
        }
    }, {
        key: 'operateNotes',
        value: function operateNotes(cinemaId, operateType) {
            var container = _reactDom2['default'].findDOMNode(this.refs['container-notes']);
            var props = {
                operateType: operateType,
                taskId: this.props.taskId,
                cinemaId: cinemaId
            };
            _reactDom2['default'].unmountComponentAtNode(container);
            var component = _reactDom2['default'].render(React.createElement(_componentsBusinessNotesFormNotesForm2['default'], props), container);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this = this;
            this.setTaskInfoStateByPropsId();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.initSubRegion();
        }
    }, {
        key: 'getOverviewTableThs',
        value: function getOverviewTableThs(auditType, type) {
            //auditType审核类型，1-需要审核，2-无需审核
            //type任务类型，1-无需调价，2-需要调价
            var ths = undefined;
            if (auditType == 2 && type == 2) {
                //无需审核 需调价
                ths = {
                    "totalNum": "全部",
                    "negotiating": "BD跟进中",
                    "unAdjust": "待调价",
                    "rejected": "被驳回",
                    "adjusting": "调价中",
                    "adjusted": "已完成调价"
                };
            } else if (auditType == 2 && type == 1) {
                //无需审核 无需调价
                ths = {
                    "totalNum": "全部",
                    "negotiating": "BD跟进中",
                    "committed": "BD已提交"
                };
            } else if (auditType == 1 && type == 2) {
                //需审核 需调价
                ths = {
                    "totalNum": "全部",
                    "negotiating": "BD跟进中",
                    "unAudit": "待OPT审核",
                    "passed": "OPT已审核",
                    "rejected": "被驳回",
                    "unAdjust": "待调价",
                    "adjusting": "调价中",
                    "adjusted": "已完成调价"
                };
            } else {
                //需审核 无需调价
                ths = {
                    "totalNum": "全部",
                    "negotiating": "BD跟进中",
                    "unAudit": "待OPT审核",
                    "passed": "OPT已审核",
                    "rejected": "被驳回"
                };
            }
            return ths;
        }
    }, {
        key: 'setTaskInfoStateByPropsId',
        value: function setTaskInfoStateByPropsId() {
            var _this = this;
            var api = {
                url: '/api/activity/task/' + _this.props.taskId + '.json',
                des: "获取任务信息",
                async: false
            };

            this.ajax(api).done(function (e) {
                if (e.data) {
                    var newState = _this.state;
                    var data = e.data;
                    newState.taskInfo = {
                        taskId: data.id,
                        plan: data.plan,
                        timeRanges: data.timeRanges || [],
                        taskName: data.name,
                        movies: data.movies || [],
                        files: data.files || [],
                        feedbackContent: JSON.parse(data.feedbackContent) || [],
                        type: data.type,
                        auditType: data.auditType
                    };
                    newState.overviewTable.data.ths = _this.getOverviewTableThs(data.auditType, data.type);
                    _this.setState(newState);
                }
            });
        }
    }, {
        key: 'initSubRegion',
        value: function initSubRegion(orgId) {

            var url;
            var data = {};
            var bdId = window.User.userId;
            var $subRegion = $(_reactDom2['default'].findDOMNode(this.refs['subRegion']));
            var selfSubRegion = orgId == undefined;

            if (orgId == 0) {
                var options = '<option value="0" selected>全部</option>';
                $subRegion.html(options);
                return;
            }

            if (!selfSubRegion) {
                url = '/api/org/' + orgId + '.json';
                data = {
                    descendants: 1
                };
            } else {
                //没有上级区域id 获取该bd相关分区

                url = '/api/org/subs/' + bdId + '.json';
            }
            this.ajax({
                url: url,
                des: "获取分区列表",
                data: data
            }).done(function (e) {
                var data = null;
                var options = '<option value="0" selected>全部</option>';

                if (!selfSubRegion) {
                    data = e.data && e.data.descendants;
                } else {
                    data = e.data;
                }
                data && $.each(data, function (i, item) {
                    options += '<option value="' + item.id + '">' + item.name + '</option>';
                });
                $subRegion.html(options);
            });
        }
    }, {
        key: 'queryHandler',
        value: function queryHandler(query) {
            var _this = this;
            query = $.extend(_this.state.query, query || {});

            _this.setTableState(query).done(function (totalSize) {
                _this.setState({
                    query: query
                });
                _this.refs.paginationAdvanced.onQuery(query, totalSize);
            });
        }
    }, {
        key: 'statusQueryHandler',
        value: function statusQueryHandler(state) {
            this.queryHandler({ state: state, offset: 0 });
        }
    }, {
        key: 'normalQueryHandler',
        value: function normalQueryHandler(status) {
            this.queryHandler({
                subId: this.refs.subRegion.value,
                cityName: this.refs.cityName.value,
                cinema: this.refs.cinema.value,
                offset: 0
            });
        }
    }, {
        key: 'setTableState',
        value: function setTableState(query) {
            var defer = $.Deferred();
            var _this = this;
            var taskId = _this.props.taskId;
            var apiMap = {
                overviewTable: {
                    url: '/api/activity/task/' + taskId + '/cinema/counts.json',
                    des: "获取任务详情状态总览列表",
                    data: query
                },
                cinemasTable: {
                    url: '/api/activity/task/' + taskId + '/cinemas.json',
                    des: "获取任务详情影院列表",
                    data: query
                }
            };

            var overviewTableApi = apiMap["overviewTable"];
            var cinemasTableApi = apiMap["cinemasTable"];

            _this.ajax(overviewTableApi).done(function (e) {
                if (e.data) {
                    var newState = _this.state;
                    var data = e.data;
                    newState.overviewTable.list = [data];
                    _this.setState(newState);
                }
            });

            _this.ajax(cinemasTableApi).done(function (e) {
                if (e.data) {
                    var newState = _this.state;
                    var data = e.data;
                    var totalSize = e.totalSize || 0;
                    newState.cinemasTable.list = data;
                    _this.setState(newState);
                    defer.resolve(totalSize);
                }
            });
            return defer.promise();
        }
    }, {
        key: 'freshTable',
        value: function freshTable() {
            this.queryHandler();
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {

            var _this = this;
            var taskStatus = _this.props.taskStatus; //任务状态 3为关闭
            var taskInfo = _this.state.taskInfo;
            var taskType = taskInfo.type; //任务类型 2为需要调价 1为不需要调价
            var auditType = taskInfo.auditType; //taskData.auditType == 1 ? "需要审核" : "不需要审核"

            var overviewTableData = _this.state.overviewTable.data;
            var cinemasTableData = _this.state.cinemasTable.data;
            overviewTableData.trs = [];
            cinemasTableData.trs = [];

            var stateMap = {
                totalNum: 0,
                negotiating: 1,
                unAudit: 2,
                passed: 4,
                rejected: 3,
                unAdjust: 5,
                adjusting: 6,
                adjusted: 7,
                committed: 8

            };
            $.each(_this.state.overviewTable.list, function (index, item) {
                var tr = {};
                $.each(Object.keys(_this.state.overviewTable.data.ths), function (i, key) {
                    tr[key] = function () {
                        return React.createElement(
                            'a',
                            { style: { padding: "5px 20px", cursor: "pointer" },
                                onClick: _this.statusQueryHandler.bind(_this, stateMap[key]) },
                            item[key]
                        );
                    };
                });
                overviewTableData.trs.push(tr);
            });

            $.each(_this.state.cinemasTable.list, function (index, item) {
                var tr = {
                    cinemaId: item.cinemaId,
                    cinemaName: item.cinemaName,
                    regionName: item.regionName,
                    subRegionName: item.subName,
                    cityName: item.cityName,
                    state: item.stateDesc,
                    remark: function remark() {
                        if (taskStatus == 3) {
                            return React.createElement(
                                _reactBootstrapLibButton2['default'],
                                { onClick: _this.operateNotes.bind(_this, item.cinemaId, "check") },
                                '查看备注'
                            );
                        } else {
                            return React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    _reactBootstrapLibButton2['default'],
                                    { onClick: _this.operateNotes.bind(_this, item.cinemaId, "add") },
                                    '添加备注'
                                ),
                                '  ',
                                React.createElement(
                                    _reactBootstrapLibButton2['default'],
                                    { onClick: _this.operateNotes.bind(_this, item.cinemaId, "check") },
                                    '查看备注'
                                )
                            );
                        }
                    }
                };
                var committed = true;
                if (item.state == 1 || item.state == 3) {
                    //1, "BD跟进中  3, "被驳回"
                    committed = false;
                }

                if (taskStatus != 3) {
                    //任务未关闭时
                    if (taskType == 2) {
                        //taskInfo.type 2为需要调价 1为不需要调价
                        tr.operate = function () {
                            if (item.state == 1 || item.state == 2 || item.state == 3 || item.state == 7 || taskInfo.auditType == 2 && item.state == 5) {
                                //“BD跟进中” “待opt审核” “被驳回” “已完成调价” “不需要审核任务待调价” 时展示按钮
                                var btnText = undefined;
                                var operateType = undefined;
                                if (!item.hasFeedback) {
                                    operateType = 'new';
                                    btnText = "提交跟进结果";
                                } else {
                                    operateType = 'edit';
                                    btnText = "修改跟进结果";
                                }

                                return React.createElement(
                                    _reactBootstrapLibButton2['default'],
                                    {
                                        onClick: _this.operateNegotiation.bind(_this, item.cinemaId, item.cinemaName, operateType, 1, auditType, committed) },
                                    btnText
                                );
                            } else if (item.state == 4 && taskInfo.auditType == 1) {
                                //状态为“OPT已审核” 审核类型为1（需要审核） 时展示上传附件按钮按钮。

                                return React.createElement(
                                    _reactBootstrapLibButton2['default'],
                                    {
                                        onClick: _this.uploadFile.bind(_this, item.cinemaId, item.cinemaName) },
                                    '上传附件'
                                );
                            }
                        };
                    } else {
                        var btnText = item.hasFeedback ? "修改跟进结果" : "提交跟进结果";
                        tr.operate = function () {
                            var btnText = item.hasFeedback ? "修改跟进结果" : "提交跟进结果";
                            var operateType = item.hasFeedback ? "edit" : "new";
                            return React.createElement(
                                _reactBootstrapLibButton2['default'],
                                {
                                    onClick: _this.operateNegotiation.bind(_this, item.cinemaId, item.cinemaName, operateType, 3, auditType, committed) },
                                btnText
                            );
                        };
                    }
                } else {
                    cinemasTableData.ths = cinemasTableData.ths.splice(0, 7);
                }

                cinemasTableData.trs.push(tr);
            });

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'p',
                    null,
                    React.createElement(
                        'a',
                        { href: _this.props.backUrl.href },
                        React.createElement(
                            _reactBootstrapLibButton2['default'],
                            null,
                            _this.props.backUrl.des
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { style: { width: "50%" } },
                    React.createElement(_componentsCommonMyTable2['default'], { data: overviewTableData })
                ),
                React.createElement(
                    'div',
                    { style: { textAlign: "right" } },
                    React.createElement(
                        _reactBootstrapLibButton2['default'],
                        { onClick: _this.addCinema.bind(this), className: 'pull-left' },
                        '增加影院'
                    ),
                    '分区：',
                    React.createElement(
                        'select',
                        { className: 'sub-region', ref: 'subRegion', defaultValue: '0' },
                        React.createElement(
                            'option',
                            { value: '0' },
                            '全部'
                        )
                    ),
                    React.createElement(
                        'span',
                        null,
                        '城市: '
                    ),
                    React.createElement('input', { type: 'text', ref: 'cityName' }),
                    '    ',
                    React.createElement(
                        'span',
                        null,
                        '影院ID/影院名: '
                    ),
                    React.createElement('input', { type: 'text', ref: 'cinema' }),
                    '    ',
                    React.createElement(
                        _reactBootstrapLibButton2['default'],
                        { onClick: _this.normalQueryHandler.bind(this) },
                        '查询'
                    )
                ),
                React.createElement('br', null),
                React.createElement(_componentsCommonMyTable2['default'], { data: cinemasTableData }),
                React.createElement(
                    'div',
                    { className: 'pull-right' },
                    React.createElement(_componentsCommonPaginationAdvanced2['default'], { onQueryHandler: _this.queryHandler.bind(_this), ref: 'paginationAdvanced' })
                ),
                React.createElement('div', { ref: 'container-negotiation' }),
                React.createElement('div', { ref: 'container-notes' }),
                React.createElement('div', { ref: 'container-upload' }),
                React.createElement('div', { ref: 'container-addCinema' })
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            backUrl: {
                href: "/bd/task/task_list",
                des: "返回任务列表"
            },
            taskId: _componentsUtilUrl2['default'].getUrlArg("id", unescape(location.search)),
            taskStatus: _componentsUtilUrl2['default'].getUrlArg("status", unescape(location.search))
        },
        enumerable: true
    }]);

    var _TaskDetail = TaskDetail;
    TaskDetail = (0, _componentsLayoutPageLayout.page)(TaskDetail) || TaskDetail;
    return TaskDetail;
})(_componentsLayoutPageLayout2['default']);

exports['default'] = TaskDetail;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});