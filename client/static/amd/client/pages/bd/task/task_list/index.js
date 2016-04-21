'use strict';

define(["/amd/client/components/layout/page-layout.js","/amd/client/components/common/my-table.js","/amd/client/components/common/pagination-advanced.js"], function (ref_0,ref_1,ref_2) {

    var cmd2amdModules = {"../../../../components/layout/page-layout":{"index":0,"path":"client/components/layout/page-layout.js"},"../../../../components/common/my-table":{"index":1,"path":"client/components/common/my-table.js"},"../../../../components/common/pagination-advanced":{"index":2,"path":"client/components/common/pagination-advanced.js"}};
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

var _componentsCommonMyTable = cmd2amdLoadModule('../../../../components/common/my-table');

var _componentsCommonMyTable2 = _interopRequireDefault(_componentsCommonMyTable);

var _componentsCommonPaginationAdvanced = cmd2amdLoadModule('../../../../components/common/pagination-advanced');

var _componentsCommonPaginationAdvanced2 = _interopRequireDefault(_componentsCommonPaginationAdvanced);

var taskList = (function (_Page) {
    _inherits(taskList, _Page);

    function taskList() {
        _classCallCheck(this, _taskList);

        _get(Object.getPrototypeOf(_taskList.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            taskListData: []
        };
    }

    _createClass(taskList, [{
        key: 'queryHandler',
        value: function queryHandler(query) {
            var _this = this;
            var api = {
                url: "/api/activity/tasks.json",
                des: "获取总部任务列表",
                data: query
            };

            this.ajax(api).done(function (e) {
                if (e.data) {
                    var newState = _this.state;
                    var totalSize = e.totalSize || 0;
                    newState.taskListData = e.data;
                    _this.setState(newState);
                    _this.refs.paginationAdvanced.onQuery(query, totalSize);
                }
            });
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {

            var _this = this;
            var tableData = {
                ths: ["任务ID", "任务名", "任务方案", "任务创建时间", "总影院数", "已处理影院数", "截止时间", "状态"],
                trs: []
            };

            $.each(_this.state.taskListData, function (index, item) {
                var tr = {
                    id: item.id,
                    name: function name($td) {
                        //任务状态码 1：进行中 2：已完成 3：已关闭
                        var href = '/bd/task/task_detail?';
                        var search = escape('id=' + item.id + '&status=' + item.state);
                        href = '' + href + search;
                        return React.createElement(
                            'a',
                            { href: href },
                            item.name
                        );
                    },
                    plan: item.plan,
                    created: item.created,
                    cinemaNum: item.cinemaNum,
                    processedCinemaNum: item.processedCinemaNum,
                    endTime: item.endTime,
                    state: item.stateDesc
                };
                tableData.trs.push(tr);
            });
            return React.createElement(
                'div',
                null,
                React.createElement(_componentsCommonMyTable2['default'], { data: tableData }),
                React.createElement(
                    'div',
                    { className: 'pull-right' },
                    React.createElement(_componentsCommonPaginationAdvanced2['default'], { onQueryHandler: _this.queryHandler.bind(_this), ref: 'paginationAdvanced' })
                )
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