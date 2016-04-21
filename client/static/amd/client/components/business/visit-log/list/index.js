'use strict';

define(["/amd/node_modules/react-nest-link-state/NestLinkedStateMixin.js","/amd/client/components/common/my-table.js","/amd/client/components/util/bdAjax.js","/amd/client/components/util/dateformat.js","/amd/client/components/common/pagination-advanced.js","/amd/client/components/common/autoSuggest/mis.js","/amd/node_modules/react-bootstrap/lib/Button.js"], function (ref_1,ref_2,ref_3,ref_4,ref_5,ref_6,ref_7) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-nest-link-state":{"index":0,"path":"node_modules/react-nest-link-state/NestLinkedStateMixin.js"},"../../../common/my-table":{"index":1,"path":"client/components/common/my-table.js"},"../../../util/bdAjax":{"index":2,"path":"client/components/util/bdAjax.js"},"../../../util/dateformat":{"index":3,"path":"client/components/util/dateformat.js"},"../../../common/pagination-advanced":{"index":4,"path":"client/components/common/pagination-advanced.js"},"../../../common/autoSuggest/mis":{"index":5,"path":"client/components/common/autoSuggest/mis.js"},"react-bootstrap/lib/Button":{"index":6,"path":"node_modules/react-bootstrap/lib/Button.js"}};
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

var _reactNestLinkState = cmd2amdLoadModule('react-nest-link-state');

var _reactNestLinkState2 = _interopRequireDefault(_reactNestLinkState);

var _commonMyTable = cmd2amdLoadModule('../../../common/my-table');

var _commonMyTable2 = _interopRequireDefault(_commonMyTable);

var _utilBdAjax = cmd2amdLoadModule('../../../util/bdAjax');

var _utilBdAjax2 = _interopRequireDefault(_utilBdAjax);

cmd2amdLoadModule('../../../util/dateformat');

var _commonPaginationAdvanced = cmd2amdLoadModule('../../../common/pagination-advanced');

var _commonPaginationAdvanced2 = _interopRequireDefault(_commonPaginationAdvanced);

var _commonAutoSuggestMis = cmd2amdLoadModule('../../../common/autoSuggest/mis');

var _commonAutoSuggestMis2 = _interopRequireDefault(_commonAutoSuggestMis);

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var VisitLogList = (function (_Component) {
    _inherits(VisitLogList, _Component);

    function VisitLogList() {
        _classCallCheck(this, VisitLogList);

        _get(Object.getPrototypeOf(VisitLogList.prototype), 'constructor', this).apply(this, arguments);

        this.state = {

            //默认展示一周内的拜访记录。
            // 即第一个日期框展示当前日期往前6天，
            // 第二个日期框展示当前日期。例如当前日期为2016-04-07，则第一个日期框展示2016-04-01，第二个日期框展示2016-04-07.
            query: {
                "form": 0,
                "startDate": new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 6).Format('yyyy-MM-dd'),
                "endDate": new Date().Format('yyyy-MM-dd'),
                "cinema": this.props.cinemaId, //影院id或影院名
                "bdKey": "",
                "subRegion": '',
                "cityName": ""
            },
            loglist: []
        };
        this.nestLinkedState = _reactNestLinkState2['default'].nestLinkedState;
    }

    _createClass(VisitLogList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var isPage = this.props.cinemaId == '';
            if (isPage) {
                this.initSubRegion();
            }
        }
    }, {
        key: 'initSubRegion',
        value: function initSubRegion(orgId) {

            var url;
            var data = {};
            var bdId = window.User.userId;
            var $subRegion = $(ReactDOM.findDOMNode(this.refs['subRegion']));
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
            (0, _utilBdAjax2['default'])({
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

            query = $.extend(_this.state.query || {}, query || {});
            var api = {
                url: '/api/visits.json',
                data: { param: JSON.stringify(_this.state.query) },
                des: '获取拜访记录列表'
            };

            (0, _utilBdAjax2['default'])(api).done(function (e) {
                if (e.data) {
                    var newState = _this.state;
                    var totalSize = e.totalSize || e.data.length || 0;
                    newState.query = query;
                    newState.loglist = e.data;
                    _this.setState(newState);
                    _this.refs['paginationAdvanced_loglist'].onQuery(query, totalSize);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _this = this;
            var isPage = _this.props.cinemaId == '';

            var tableData = {
                ths: ['拜访BD', '拜访方式', '拜访日期', '联系人', '联系方式', '职位', '拜访目的', '拜访内容'],
                trs: []
            };
            if (isPage) {
                tableData.ths = ['影院ID', '影院名', '分区', '城市'].concat(tableData.ths);
            }

            this.state.loglist.forEach(function (item) {
                var formArr = ['上门', '电话', '接待'];

                var purposeArr = ['其它目的', '挖掘需求', '项目推进', '介绍产品', '签约', '回访'];
                var purpose = '';
                //拜访目的, 0-其它目的,1-挖掘需求,2-项目推进,3-介绍产品,4-签约,5-回访
                if (item.purpose == 0) {
                    purpose = '其他目的：' + item.purposeDetail;
                } else {
                    purpose = purposeArr[item.purpose * 1];
                }
                var tr = {};
                tr = {
                    "cinemaId": item.cinemaId,
                    "cinemaName": item.cinemaName,
                    "subRegion": item.subRegionName,
                    "cityName": item.cityName,
                    "bdName": item.visitUser && item.visitUser.name,
                    "form": item.form && formArr[item.form * 1 - 1], //拜访形式，1-上门,2-电话,3-接待
                    "date": item.date,
                    "contacts": item.contacts,
                    "contactInfo": item.contactInfo,
                    "position": item.position,
                    "purpose": purpose,
                    "content": item.content
                };
                if (!isPage) {
                    delete tr.cinemaId;
                    delete tr.cinemaName;
                    delete tr.subRegion;
                    delete tr.cityName;
                }
                tableData.trs.push(tr);
            });
            return _react2['default'].createElement(
                'div',
                null,
                '拜访方式：',
                _react2['default'].createElement(
                    'select',
                    { valueLink: this.nestLinkedState(['query', 'form'], this) },
                    _react2['default'].createElement(
                        'option',
                        { value: '0' },
                        '全部'
                    ),
                    _react2['default'].createElement(
                        'option',
                        { value: '1' },
                        '上门'
                    ),
                    _react2['default'].createElement(
                        'option',
                        { value: '2' },
                        '电话'
                    ),
                    _react2['default'].createElement(
                        'option',
                        { value: '3' },
                        '接待'
                    )
                ),
                '  拜访日期：',
                _react2['default'].createElement('input', { type: 'text', className: 'J_datePicker ', valueLink: this.nestLinkedState(['query', 'startDate'], this) }),
                '--',
                _react2['default'].createElement('input', { type: 'text', className: 'J_datePicker ', valueLink: this.nestLinkedState(['query', 'endDate'], this) }),
                (function () {
                    if (isPage) {
                        return _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement('br', null),
                            _react2['default'].createElement('br', null)
                        );
                    }
                })(),
                (function () {
                    if (isPage) {
                        return _react2['default'].createElement(
                            'span',
                            null,
                            '  分区  ',
                            _react2['default'].createElement(
                                'select',
                                { className: 'sub-region', ref: 'subRegion',
                                    valueLink: _this2.nestLinkedState(['query', 'subRegion'], _this2) },
                                _react2['default'].createElement(
                                    'option',
                                    { value: '0' },
                                    '全部'
                                )
                            ),
                            '  城市  ',
                            _react2['default'].createElement('input', { valueLink: _this2.nestLinkedState(['query', 'cityName'], _this2) }),
                            '  影院ID/影院名  ',
                            _react2['default'].createElement('input', { valueLink: _this2.nestLinkedState(['query', 'cinema'], _this2) })
                        );
                    }
                })(),
                '  拜访BD   ',
                _react2['default'].createElement(
                    'div',
                    { style: { position: 'relative', display: 'inline-block', textAlign: "left" } },
                    _react2['default'].createElement(_commonAutoSuggestMis2['default'], { onChange: (function (user) {
                            var newState = _this.state;
                            newState.query.bdKey = user.key;
                            _this.setState(newState);
                        }).bind(_this) })
                ),
                '  ',
                _react2['default'].createElement(
                    _reactBootstrapLibButton2['default'],
                    { onClick: this.queryHandler.bind(this, { "offset": 0 }) },
                    '查询'
                ),
                _react2['default'].createElement('hr', null),
                _react2['default'].createElement(_commonMyTable2['default'], { data: tableData }),
                _react2['default'].createElement(
                    'div',
                    { className: 'pull-right' },
                    _react2['default'].createElement(_commonPaginationAdvanced2['default'], { ref: 'paginationAdvanced_loglist',
                        onQueryHandler: this.queryHandler.bind(this),
                        limit: 20 })
                )
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            cinemaId: '' },
        enumerable: true
    }]);

    return VisitLogList;
})(_react.Component);

exports['default'] = VisitLogList;
module.exports = exports['default'];
// 没有cinemaId 则为拜访记录单页 有则为影院详情里面的拜访记录tab;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});