'use strict';

define(["/amd/client/components/layout/page-layout.js","/amd/client/components/common/my-table.js","/amd/client/components/common/pagination-advanced.js","/amd/node_modules/react-bootstrap/lib/Tabs.js","/amd/node_modules/react-bootstrap/lib/Tab.js","/amd/node_modules/react-bootstrap/lib/Button.js","/amd/client/components/business/apply/apply.js","/amd/client/components/business/negotiation/negotiation.js","/amd/client/components/business/visit-log/new/index.js","/amd/client/components/common/autoSuggest/city.js","css!/amd/client/pages/bd/my_cinema/index.css"], function (ref_2,ref_3,ref_4,ref_5,ref_6,ref_7,ref_8,ref_9,ref_10,ref_11,ref_12) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"../../../components/layout/page-layout":{"index":0,"path":"client/components/layout/page-layout.js"},"../../../components/common/my-table":{"index":1,"path":"client/components/common/my-table.js"},"../../../components/common/pagination-advanced":{"index":2,"path":"client/components/common/pagination-advanced.js"},"react-bootstrap/lib/Tabs":{"index":3,"path":"node_modules/react-bootstrap/lib/Tabs.js"},"react-bootstrap/lib/Tab":{"index":4,"path":"node_modules/react-bootstrap/lib/Tab.js"},"react-bootstrap/lib/Button":{"index":5,"path":"node_modules/react-bootstrap/lib/Button.js"},"../../../components/business/apply/apply":{"index":6,"path":"client/components/business/apply/apply.js"},"../../../components/business/negotiation/negotiation":{"index":7,"path":"client/components/business/negotiation/negotiation.js"},"../../../components/business/visit-log/new":{"index":8,"path":"client/components/business/visit-log/new/index.js"},"../../../components/common/autoSuggest/city":{"index":9,"path":"client/components/common/autoSuggest/city.js"},"./index.less":{"index":10,"path":"client/pages/bd/my_cinema/index.less"}};
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = cmd2amdLoadModule('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = cmd2amdLoadModule('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _componentsLayoutPageLayout = cmd2amdLoadModule('../../../components/layout/page-layout');

var _componentsLayoutPageLayout2 = _interopRequireDefault(_componentsLayoutPageLayout);

var _componentsCommonMyTable = cmd2amdLoadModule('../../../components/common/my-table');

var _componentsCommonMyTable2 = _interopRequireDefault(_componentsCommonMyTable);

var _componentsCommonPaginationAdvanced = cmd2amdLoadModule('../../../components/common/pagination-advanced');

var _componentsCommonPaginationAdvanced2 = _interopRequireDefault(_componentsCommonPaginationAdvanced);

var _reactBootstrapLibTabs = cmd2amdLoadModule('react-bootstrap/lib/Tabs');

var _reactBootstrapLibTabs2 = _interopRequireDefault(_reactBootstrapLibTabs);

var _reactBootstrapLibTab = cmd2amdLoadModule('react-bootstrap/lib/Tab');

var _reactBootstrapLibTab2 = _interopRequireDefault(_reactBootstrapLibTab);

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _componentsBusinessApplyApply = cmd2amdLoadModule('../../../components/business/apply/apply');

var _componentsBusinessApplyApply2 = _interopRequireDefault(_componentsBusinessApplyApply);

var _componentsBusinessNegotiationNegotiation = cmd2amdLoadModule('../../../components/business/negotiation/negotiation');

var _componentsBusinessNegotiationNegotiation2 = _interopRequireDefault(_componentsBusinessNegotiationNegotiation);

var _componentsBusinessVisitLogNew = cmd2amdLoadModule('../../../components/business/visit-log/new');

var _componentsBusinessVisitLogNew2 = _interopRequireDefault(_componentsBusinessVisitLogNew);

var _componentsCommonAutoSuggestCity = cmd2amdLoadModule('../../../components/common/autoSuggest/city');

var _componentsCommonAutoSuggestCity2 = _interopRequireDefault(_componentsCommonAutoSuggestCity);

cmd2amdLoadModule('./index.less');

var MyCinema = (function (_Page) {
    _inherits(MyCinema, _Page);

    function MyCinema() {
        _classCallCheck(this, _MyCinema);

        _get(Object.getPrototypeOf(_MyCinema.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            online: {
                data: [],
                totalSize: 0
            },
            waitOnline: {
                data: [],
                totalSize: 0
            },
            notInclude: {
                data: [],
                totalSize: 0
            },
            waitExpand: {
                data: [],
                totalSize: 0
            },
            outOfDate: {
                data: [],
                totalSize: 0
            },
            offline: {
                data: [],
                totalSize: 0
            },
            activeKey: (function (component) {
                var defaultActiveKey = 'waitOnline';
                var match = location.hash.match(/[^#]+/gim);
                match = match && match[0] || '';
                if (component.props.tabMap[match]) {
                    defaultActiveKey = match;
                }
                return defaultActiveKey;
            })(this),
            query: {}
        };
    }

    _createClass(MyCinema, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.count();
        }
    }, {
        key: 'count',
        value: function count() {
            var _this = this;
            _this.ajax({
                url: '/api/cinema/bd/' + window.User.misId + '/counts.json',
                des: '获取统计'
            }).done(function (e) {
                //1.上线   2.到期   3.下线  4.待上线
                var data = e.data;
                var newState = _this.state;
                for (var key in data) {
                    if (key == "1") {
                        newState['online'].totalSize = data[key];
                    } else if (key == "2") {
                        newState['outOfDate'].totalSize = data[key];
                    } else if (key == "3") {
                        newState['offline'].totalSize = data[key];
                    } else if (key == "4") {
                        newState['waitOnline'].totalSize = data[key];
                    } else if (key == "0") {
                        newState['waitExpand'].totalSize = data[key];
                    } else if (key == 5) {
                        newState['notInclude'].totalSize = data[key];
                    }
                }
                _this.setState(newState);
            });
        }
    }, {
        key: 'apply',
        value: function apply(data, operateType) {
            var container = _reactDom2['default'].findDOMNode(this.refs['container-apply']);
            var props = {
                applyId: null,
                applyType: 1,
                operateType: operateType,
                cinemaId: data.id,
                cinemaName: data.name
            };
            _reactDom2['default'].unmountComponentAtNode(container);
            var component = _reactDom2['default'].render(_react2['default'].createElement(_componentsBusinessApplyApply2['default'], props), container);
        }
    }, {
        key: 'negotiation',
        value: function negotiation(data, operateType) {
            var container = _reactDom2['default'].findDOMNode(this.refs['container-negotiation']);
            var props = {
                type: 2, //1-活动调价 2-常规

                operateType: operateType,
                sellSrc: data.sellSrc,
                taskId: this.props.taskId,
                cinemaId: data.id,
                cinemaName: data.name
            };

            _reactDom2['default'].unmountComponentAtNode(container);
            var component = _reactDom2['default'].render(_react2['default'].createElement(_componentsBusinessNegotiationNegotiation2['default'], props), container);
        }
    }, {
        key: 'newVisitLog',
        value: function newVisitLog(cinemaId) {
            var container = _reactDom2['default'].findDOMNode(this.refs['container-newVisitLog']);
            var props = {
                cinemaId: cinemaId
            };

            _reactDom2['default'].unmountComponentAtNode(container);
            var component = _reactDom2['default'].render(_react2['default'].createElement(_componentsBusinessVisitLogNew2['default'], props), container);
        }
    }, {
        key: 'queryHandler',
        value: function queryHandler(key, state, title, query) {
            var _this = this;

            query = $.extend(_this.state[key].query || {}, query || {});

            var api = {
                url: '/api/cinema/bd/' + window.User.misId + '/cinemas.json?state=' + state,
                des: '获取我的影院筛选' + title,
                data: query
            };

            this.ajax(api).done(function (e) {
                if (e.data) {
                    var newState = _this.state;
                    var totalSize = e.totalSize || e.data.length || 0;
                    newState[key].data = e.data;
                    newState[key].query = query;
                    _this.setState(newState);
                    _this.refs['paginationAdvanced_' + key].onQuery(query, totalSize);
                }
            });
        }
    }, {
        key: 'normalQueryHandler',
        value: function normalQueryHandler(key, state, title) {
            var _this = this;
            var query = {
                cinema: _this.refs['cinema_' + key].value,
                cityName: _this.refs['city_' + key].state.name,
                cityId: _this.refs['city_' + key].state.id,
                offset: 0
            };
            if (state == 5) {
                query.uniqueNo = _this.refs['uniqueNo_' + key].value;
            }
            _this.queryHandler(key, state, title, query);
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {

            var _this = this;
            var tabs = [];
            var tabMap = _this.props.tabMap;

            Object.keys(tabMap).forEach(function (key) {
                var value = tabMap[key];
                var tableData = undefined;
                var ths = undefined;
                var trs = [];
                switch (key) {
                    case 'waitOnline':
                    case 'online':
                    case 'offline':
                    case 'outOfDate':
                        ths = {
                            id: '影院ID',
                            name: '影院名',
                            city: '城市',
                            sellSrcDesc: '售票系统',
                            onlineDate: '上线日期',
                            offlineDate: '下线日期',
                            operate: '操作'
                        };
                        break;
                    case 'waitExpand':
                        ths = {
                            id: '影院ID',
                            name: '影院名',
                            city: '城市',
                            operate: '操作'
                        };
                        break;
                    case 'notInclude':
                        ths = {
                            code: '影院编码',
                            name: '影院名',
                            province: '省份',
                            city: '城市',
                            theaterChain: '院线名称'
                        };
                        break;
                }

                _this.state[key].data.forEach(function (item, index) {
                    var tr = {};
                    Object.keys(ths).forEach(function (thKey) {
                        if (thKey && thKey != 'operate' && thKey != 'name') {
                            tr[thKey] = item[thKey];
                        } else if (thKey == 'name') {
                            (function () {
                                var href = "/bd/cinema_detail?";
                                href = href + escape("cinemaId=" + item.id + "&cinemaName=" + item.name + "&city=" + item.city + "&sellSrcDesc=" + item.sellSrcDesc);

                                tr[thKey] = function () {

                                    if (key == 'notInclude') {
                                        return item.name;
                                    } else {
                                        return _react2['default'].createElement(
                                            'a',
                                            { href: href },
                                            item.name
                                        );
                                    }
                                };
                            })();
                        } else {
                            (function () {
                                var newPriceRuleBtn = _react2['default'].createElement(
                                    _reactBootstrapLibButton2['default'],
                                    { key: 'newPriceRuleBtn',
                                        onClick: _this.negotiation.bind(_this, item, 'new') },
                                    '申请调价'
                                );
                                var newCinemaApplyBtn = _react2['default'].createElement(
                                    _reactBootstrapLibButton2['default'],
                                    { key: 'newCinemaApplyBtn',
                                        onClick: _this.apply.bind(_this, item, 'new') },
                                    '申请活动'
                                );
                                var reportBtn = _react2['default'].createElement(
                                    _reactBootstrapLibButton2['default'],
                                    { key: 'reportBtn',
                                        onClick: (function (data) {
                                            var search = escape('cinemaId=' + data.id + '&cinemaName=' + data.name + '&sellSrc=' + data.sellSrcDesc + '&city=' + data.city + '&backurl=' + encodeURIComponent(location.href));
                                            location.href = "/bd/my_cinema/sub_page/seat_report?" + search;
                                        }).bind(_this, item)
                                    },
                                    '统计报表'
                                );

                                var newApplyBtn = _react2['default'].createElement(
                                    _reactBootstrapLibButton2['default'],
                                    {
                                        onClick: function () {
                                            window.open('/bd/apply/online?cinema=[' + JSON.stringify(item) + ']');
                                        }
                                    },
                                    '新建上线申请'
                                );
                                var visitLogBtn = _react2['default'].createElement(
                                    _reactBootstrapLibButton2['default'],
                                    { key: 'newVisitLogBtn',
                                        onClick: _this.newVisitLog.bind(_this, item.id, 'new') },
                                    '新建拜访记录'
                                );
                                var btns = undefined;
                                switch (key) {
                                    case 'waitOnline':
                                        btns = _react2['default'].createElement(
                                            'div',
                                            null,
                                            newPriceRuleBtn,
                                            '  ',
                                            newCinemaApplyBtn,
                                            '  ',
                                            visitLogBtn
                                        );
                                        break;
                                    case 'online':
                                        btns = _react2['default'].createElement(
                                            'div',
                                            null,
                                            newPriceRuleBtn,
                                            '  ',
                                            newCinemaApplyBtn,
                                            '  ',
                                            reportBtn,
                                            '  ',
                                            visitLogBtn
                                        );
                                        break;
                                    case 'offline':
                                    case 'outOfDate':
                                        btns = _react2['default'].createElement(
                                            'div',
                                            null,
                                            reportBtn,
                                            '  ',
                                            visitLogBtn
                                        );
                                        break;
                                    case 'waitExpand':
                                        btns = _react2['default'].createElement(
                                            'div',
                                            null,
                                            newApplyBtn,
                                            '  ',
                                            visitLogBtn
                                        );
                                        break;
                                }
                                tr[thKey] = function () {
                                    return btns;
                                };
                            })();
                        }
                    });
                    trs.push(tr);
                });
                tableData = {
                    ths: ths,
                    trs: trs
                };
                var title = _react2['default'].createElement(
                    'span',
                    null,
                    value.title,
                    _react2['default'].createElement(
                        'span',
                        { className: 'badge' },
                        _this.state[key].totalSize
                    )
                );
                var table = _this.state.activeKey == key ? _react2['default'].createElement(_componentsCommonMyTable2['default'], { data: tableData }) : '';
                var uniqueNoQuery = undefined;
                var des = undefined;
                if (value.state == 5) {
                    uniqueNoQuery = _react2['default'].createElement(
                        'span',
                        null,
                        ' ',
                        _react2['default'].createElement(
                            'span',
                            null,
                            '影院八位编码: '
                        ),
                        _react2['default'].createElement('input', { type: 'text', ref: 'uniqueNo_' + key }),
                        '    '
                    );
                    des = _react2['default'].createElement(
                        'p',
                        null,
                        '说明：下方为猫眼未收录影院，请在MDC（',
                        _react2['default'].createElement(
                            'a',
                            { href: 'http://mdc.sankuai.com/', target: '_blank' },
                            'http://mdc.sankuai.com/'
                        ),
                        '）查询或创建对应的POI后提交至城市品控（qc.avatar@meituan.com），协助我们及时收录至猫眼影院库中。'
                    );
                }

                var zibCityUrl = '/api/org/zjb/searchCity.json';
                var cityprops = {};
                var cineamLable = '影院ID/影院名';
                if (key == 'notInclude') {
                    cityprops = { url: zibCityUrl };
                    cineamLable = '影院名称';
                }

                tabs.push(_react2['default'].createElement(
                    _reactBootstrapLibTab2['default'],
                    { key: key, eventKey: key, title: title },
                    _react2['default'].createElement(
                        'div',
                        { style: { textAlign: "right" } },
                        _react2['default'].createElement(
                            'span',
                            null,
                            '城市: '
                        ),
                        _react2['default'].createElement(
                            'div',
                            { style: { position: 'relative', display: 'inline-block', textAlign: "left" } },
                            _react2['default'].createElement(_componentsCommonAutoSuggestCity2['default'], _extends({ ref: 'city_' + key }, cityprops))
                        ),
                        '    ',
                        _react2['default'].createElement(
                            'span',
                            null,
                            _react2['default'].createElement(
                                'span',
                                null,
                                cineamLable
                            ),
                            ': '
                        ),
                        _react2['default'].createElement('input', { type: 'text', ref: 'cinema_' + key }),
                        '    ',
                        uniqueNoQuery,
                        _react2['default'].createElement(
                            _reactBootstrapLibButton2['default'],
                            {
                                onClick: _this.normalQueryHandler.bind(_this, key, value.state, value.title) },
                            '查询'
                        )
                    ),
                    _react2['default'].createElement('br', null),
                    des,
                    table,
                    _react2['default'].createElement(
                        'div',
                        { className: 'pull-right' },
                        _react2['default'].createElement(_componentsCommonPaginationAdvanced2['default'], { ref: 'paginationAdvanced_' + key,
                            onQueryHandler: _this.queryHandler.bind(_this, key, value.state, value.title),
                            limit: 20 })
                    )
                ));
            });
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    _reactBootstrapLibTabs2['default'],
                    { activeKey: _this.state.activeKey, onSelect: (function (activeKey) {
                            location.hash = activeKey;
                            this.setState({
                                activeKey: activeKey
                            });
                        }).bind(_this), ref: 'tabs', id: 'myCinamaTabs' },
                    tabs
                ),
                _react2['default'].createElement('div', { ref: 'container-apply' }),
                _react2['default'].createElement('div', { ref: 'container-negotiation' }),
                _react2['default'].createElement('div', { ref: 'container-newVisitLog' })
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            tabMap: {
                online: {
                    title: '上线中',
                    state: 1
                },
                waitOnline: {
                    title: '已签约待上线',
                    state: 4
                },
                waitExpand: {
                    title: '未签约待拓展',
                    state: 0
                },
                notInclude: {
                    title: '猫眼未收录',
                    state: 5
                },
                offline: {
                    title: '已手动下线',
                    state: 3
                },
                outOfDate: {
                    title: '已到期待续约',
                    state: 2
                }
            }
        },
        enumerable: true
    }]);

    var _MyCinema = MyCinema;
    MyCinema = (0, _componentsLayoutPageLayout.page)(MyCinema) || MyCinema;
    return MyCinema;
})(_componentsLayoutPageLayout2['default']);

exports['default'] = MyCinema;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});