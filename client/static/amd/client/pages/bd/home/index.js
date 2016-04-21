'use strict';

define(["css!/amd/client/pages/bd/home/less/home.css","/amd/node_modules/react-bootstrap/lib/Table.js","/amd/client/components/layout/page-layout.js","/amd/client/components/util/bdAjax.js","/amd/client/components/util/dataFormat.js"], function (ref_0,ref_1,ref_3,ref_4,ref_5) {

    var cmd2amdModules = {"./less/home.less":{"index":0,"path":"client/pages/bd/home/less/home.less"},"react-bootstrap/lib/Table":{"index":1,"path":"node_modules/react-bootstrap/lib/Table.js"},"react":{"external":"React","index":null,"path":null},"../../../components/layout/page-layout":{"index":2,"path":"client/components/layout/page-layout.js"},"../../../components/util/bdAjax":{"index":3,"path":"client/components/util/bdAjax.js"},"../../../components/util/dataFormat":{"index":4,"path":"client/components/util/dataFormat.js"}};
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

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

cmd2amdLoadModule('./less/home.less');

var _reactBootstrapLibTable = cmd2amdLoadModule('react-bootstrap/lib/Table');

var _reactBootstrapLibTable2 = _interopRequireDefault(_reactBootstrapLibTable);

var _react = cmd2amdLoadModule('react');

var _componentsLayoutPageLayout = cmd2amdLoadModule('../../../components/layout/page-layout');

var _componentsLayoutPageLayout2 = _interopRequireDefault(_componentsLayoutPageLayout);

var _componentsUtilBdAjax = cmd2amdLoadModule('../../../components/util/bdAjax');

var _componentsUtilBdAjax2 = _interopRequireDefault(_componentsUtilBdAjax);

var _componentsUtilDataFormat = cmd2amdLoadModule('../../../components/util/dataFormat');

var TODAY_URL = '/api/cinema/live/bd/reports.json';
var YESTERDAY_URL = '/api/cinema/panel/bd/reports.json';

var BoardTableTh = (function (_Component) {
    _inherits(BoardTableTh, _Component);

    function BoardTableTh() {
        _classCallCheck(this, BoardTableTh);

        _get(Object.getPrototypeOf(BoardTableTh.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(BoardTableTh, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'th',
                this.props,
                this.props.text,
                React.createElement(
                    'a',
                    { href: '/bd/count_report', className: 'pull-right', title: '统计报表' },
                    React.createElement('i', { className: 'glyphicon glyphicon-check' })
                )
            );
        }
    }]);

    return BoardTableTh;
})(_react.Component);

var Home = (function (_Page) {
    _inherits(Home, _Page);

    function Home() {
        _classCallCheck(this, _Home);

        _get(Object.getPrototypeOf(_Home.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            todayData: {},
            yesterdayData: {}
        };
    }

    _createClass(Home, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchAllData();
            this.timer = setInterval(this.fetchTodayData.bind(this), 1000 * 60 * 10);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.timer);
        }
    }, {
        key: 'fetchTodayData',
        value: function fetchTodayData() {
            var _this = this;

            // 接口WIKI http://wiki.sankuai.com/pages/viewpage.action?pageId=400196239
            (0, _componentsUtilBdAjax2['default'])({ url: TODAY_URL, type: 'GET', des: '获取数据直播间数据' }).then(function (response) {
                _this.setState({ todayData: response.data });
            }).fail(function () {
                return console.log('Get ' + TODAY_URL + ' data fail');
            });
        }
    }, {
        key: 'fetchAllData',
        value: function fetchAllData() {
            var _this2 = this;

            // 接口WIKI http://wiki.sankuai.com/pages/viewpage.action?pageId=400196239
            var count = 0;
            var updateState = {};
            var finish = function finish() {
                count++;
                if (count >= 2) _this2.setState(updateState);
            };

            (0, _componentsUtilBdAjax2['default'])({ url: TODAY_URL, type: 'GET', des: '获取数据直播间数据' }).then(function (response) {
                updateState['todayData'] = response.data;
            }).fail(function () {
                return console.log('Get ' + TODAY_URL + ' data fail');
            }).always(finish);

            (0, _componentsUtilBdAjax2['default'])({ url: YESTERDAY_URL, type: 'GET', des: '获取仪表盘数据' }).then(function (response) {
                updateState['yesterdayData'] = response.data;
            }).fail(function () {
                return console.log('Get ' + YESTERDAY_URL + ' data fail');
            }).always(finish);
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var props = {
                className: 'table table-striped table-bordered'
            };
            var _state = this.state;
            var todayData = _state.todayData;
            var yesterdayData = _state.yesterdayData;

            // FIXTEST
            // todayData = {
            //     "ticketNum": 33159,  // 选座出票量
            //     "dealAmount": 38583.12, // 选座交易额
            //     "payTime": "2016.1.19 12:00:01" // 最新支付时间
            // };

            // yesterdayData = {
            //     "ticketNum": 33159,  // 选座出票量
            //     "ticketNumDayOnDay": 0, // 选座出票率环比
            //     "dealAmount": 38583.12, // 选座交易额
            //     "dealAmountDayOnDay": -30.12, // 选座交易额环比
            //     "seatRate": 12, //选座市占
            //     "seatRateDayOnDay": 10.12 // 选座市占环比
            // };
            //////////////

            var defaultValue = function defaultValue(value) {
                var extra = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
                return value || value === 0 ? value + extra : '—';
            };
            var payTime = todayData.payTime ? todayData.payTime.split(' ')[1] : '';

            return React.createElement(
                'div',
                { className: 'home-panel' },
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h1',
                        { className: 'home-panel-title' },
                        React.createElement(
                            'span',
                            null,
                            '数据直播间'
                        ),
                        React.createElement(
                            'sub',
                            null,
                            '所有负责影院今天数据'
                        ),
                        React.createElement(
                            'span',
                            { className: 'home-panel-title-right' },
                            '截至今天',
                            payTime,
                            React.createElement('i', { className: 'glyphicon glyphicon-repeat',
                                onClick: this.fetchTodayData.bind(this) })
                        )
                    ),
                    React.createElement(
                        _reactBootstrapLibTable2['default'],
                        props,
                        React.createElement(
                            'thead',
                            null,
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'th',
                                    null,
                                    '指标'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    '数值'
                                )
                            )
                        ),
                        React.createElement(
                            'tbody',
                            null,
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'th',
                                    null,
                                    '选座出票量'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    defaultValue((0, _componentsUtilDataFormat.toFinancialNumber)(todayData.ticketNum))
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'th',
                                    null,
                                    '选座交易额'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    defaultValue((0, _componentsUtilDataFormat.toFinancialNumber)(todayData.dealAmount))
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h1',
                        { className: 'home-panel-title' },
                        React.createElement(
                            'span',
                            null,
                            '仪表盘'
                        ),
                        React.createElement(
                            'sub',
                            null,
                            '所有负责影院昨天数据'
                        ),
                        React.createElement(
                            'span',
                            { className: 'home-panel-title-right' },
                            '每天约12:00:00更新'
                        )
                    ),
                    React.createElement(
                        _reactBootstrapLibTable2['default'],
                        props,
                        React.createElement(
                            'thead',
                            null,
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'th',
                                    null,
                                    '指标'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    '数值'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    '环比'
                                )
                            )
                        ),
                        React.createElement(
                            'tbody',
                            null,
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(BoardTableTh, { text: '选座出票量' }),
                                React.createElement(
                                    'td',
                                    null,
                                    defaultValue((0, _componentsUtilDataFormat.toFinancialNumber)(yesterdayData.ticketNum))
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    defaultValue((0, _componentsUtilDataFormat.addSign)(yesterdayData.ticketNumDayOnDay), '%')
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(BoardTableTh, { text: '选座交易额' }),
                                React.createElement(
                                    'td',
                                    null,
                                    defaultValue((0, _componentsUtilDataFormat.toFinancialNumber)(yesterdayData.dealAmount))
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    defaultValue((0, _componentsUtilDataFormat.addSign)(yesterdayData.dealAmountDayOnDay), '%')
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(BoardTableTh, { text: '选座市占' }),
                                React.createElement(
                                    'td',
                                    null,
                                    defaultValue(yesterdayData.seatRate, '%')
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    defaultValue((0, _componentsUtilDataFormat.addSign)(yesterdayData.seatRateDayOnDay), '%')
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    var _Home = Home;
    Home = (0, _componentsLayoutPageLayout.page)(Home) || Home;
    return Home;
})(_componentsLayoutPageLayout2['default']);

exports['default'] = Home;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});