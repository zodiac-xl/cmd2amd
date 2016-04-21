'use strict';

define(["/amd/client/components/layout/page-layout.js","/amd/node_modules/date-format/lib/index.js","/amd/node_modules/react-addons-update/index.js","/amd/node_modules/react-bootstrap/lib/index.js","/amd/client/components/common/my-table.js","/amd/client/components/common/pagination-advanced.js","/amd/client/components/business/price/competitive-sell-price-detail.js","/amd/node_modules/lodash/index.js"], function (ref_0,ref_1,ref_2,ref_3,ref_4,ref_5,ref_6,ref_7) {

    var cmd2amdModules = {"../../../../components/layout/page-layout":{"index":0,"path":"client/components/layout/page-layout.js"},"date-format":{"index":1,"path":"node_modules/date-format/lib/index.js"},"react-addons-update":{"index":2,"path":"node_modules/react-addons-update/index.js"},"react-bootstrap":{"index":3,"path":"node_modules/react-bootstrap/lib/index.js"},"../../../../components/common/my-table":{"index":4,"path":"client/components/common/my-table.js"},"../../../../components/common/pagination-advanced":{"index":5,"path":"client/components/common/pagination-advanced.js"},"../../../../components/business/price/competitive-sell-price-detail":{"index":6,"path":"client/components/business/price/competitive-sell-price-detail.js"},"lodash":{"index":7,"path":"node_modules/lodash/index.js"}};
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

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsLayoutPageLayout = cmd2amdLoadModule('../../../../components/layout/page-layout');

var _componentsLayoutPageLayout2 = _interopRequireDefault(_componentsLayoutPageLayout);

var _dateFormat = cmd2amdLoadModule('date-format');

var _dateFormat2 = _interopRequireDefault(_dateFormat);

var _reactAddonsUpdate = cmd2amdLoadModule('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _reactBootstrap = cmd2amdLoadModule('react-bootstrap');

var _componentsCommonMyTable = cmd2amdLoadModule('../../../../components/common/my-table');

var _componentsCommonMyTable2 = _interopRequireDefault(_componentsCommonMyTable);

var _componentsCommonPaginationAdvanced = cmd2amdLoadModule('../../../../components/common/pagination-advanced');

var _componentsCommonPaginationAdvanced2 = _interopRequireDefault(_componentsCommonPaginationAdvanced);

var _componentsBusinessPriceCompetitiveSellPriceDetail = cmd2amdLoadModule('../../../../components/business/price/competitive-sell-price-detail');

var _componentsBusinessPriceCompetitiveSellPriceDetail2 = _interopRequireDefault(_componentsBusinessPriceCompetitiveSellPriceDetail);

var _lodash = cmd2amdLoadModule('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var CompetitiveSellPrice = (function (_Page) {
    _inherits(CompetitiveSellPrice, _Page);

    function CompetitiveSellPrice() {
        _classCallCheck(this, _CompetitiveSellPrice);

        _get(Object.getPrototypeOf(_CompetitiveSellPrice.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            showDate: (0, _dateFormat2['default'])("yyyy-MM-dd", new Date()),
            data: [],
            query: {
                limit: 10,
                offset: 0
            },
            competitorsList: [], // 竞对列表
            subsList: [], // bd 分区列表

            showTarget: {
                showDate: '',
                cinemaId: 0,
                show: false
            }
        };
    }

    _createClass(CompetitiveSellPrice, [{
        key: 'toggleViewTarget',
        value: function toggleViewTarget(showTarget) {
            var newState = this.state;
            newState.showTarget = showTarget;
            this.setState(newState);
        }
    }, {
        key: 'hideTarget',
        value: function hideTarget() {
            var showTarget = {};
            showTarget.show = false;
            this.toggleViewTarget(showTarget);
        }
    }, {
        key: 'showTarget',
        value: function showTarget(query) {
            var showTarget = {};
            showTarget.show = true;
            showTarget.showDate = query.showDate;
            showTarget.cinemaId = query.cinemaId;
            this.toggleViewTarget(showTarget);
        }
    }, {
        key: 'getInitCondition',
        value: function getInitCondition() {
            var _this = this;

            // 分区
            var apiSubId = {
                url: '/api/org/subs/' + window.User.userId + '.json',
                des: '获取分区'
            };
            this.ajax(apiSubId).done(function (e) {
                _this.setState({
                    subsList: e.data
                });
            });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.getInitCondition();
        }
    }, {
        key: 'statusQueryHandler',
        value: function statusQueryHandler() {
            var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var formData = {
                showDate: this.refs.showDate.value,
                subId: Number(this.refs.subId.value),
                city: this.refs.city.value.trim(),
                cinema: this.refs.cinemaId.value.trim(),
                movie: this.refs.movie.value.trim(),
                offset: 0
            };
            if (new Date(formData.showDate) <= new Date('2016-03-16')) {
                toastr.warning('该日期无影讯，请更换日期查询');
                return;
            }

            if (formData.subId === 0) {
                delete formData.subId;
            }

            state = $.extend(state, formData);
            this.queryHandler(state);
        }
    }, {
        key: 'queryHandler',
        value: function queryHandler() {
            var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _this = this;

            if (!query.showDate) {
                query.showDate = this.state.showDate;
            }
            query = $.extend(_this.state.query, query || {});

            var api = {
                url: "/api/cinema/price/list.json",
                des: '获取竞对售价信息',
                data: query
            };

            this.ajax(api).done(function (e) {
                if (e.data) {
                    _this.setState({
                        data: e.data,
                        showDate: query.showDate
                    });
                    var totalSize = e.totalSize;
                    _this.refs.paginationAdvanced.onQuery(query, totalSize);
                }
            });
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var _this = this;
            var crawlerOptions = [];
            var subsOptions = [];
            var _state = this.state;
            var subsList = _state.subsList;
            var data = _state.data;
            var showDate = _state.showDate;
            var showTarget = _state.showTarget;

            for (var i in subsList) {
                subsOptions.push(React.createElement(
                    'option',
                    { key: subsList[i].id, value: subsList[i].id },
                    subsList[i].name
                ));
            }

            var noticeInfo = '数据为最近2小时内更新，取当日黄金时段非特殊场次售价';
            if (new Date((0, _dateFormat2['default'])("yyyy-MM-dd", new Date())) > new Date(showDate)) {
                noticeInfo = '数据取当日黄金时段非特殊场次最低售价';
            }

            // table data
            var tableData = {
                ths: {
                    cinemaId: "影院ID",
                    cinemaName: "影院名",
                    regionName: "大区",
                    subName: "分区",
                    cityName: "城市",
                    bdName: "负责BD",
                    movieName: "影片",
                    nuomi: "糯米售价",
                    taobao: "淘宝售价",
                    wechat: "微票售价",
                    operate: "操作"
                },
                trs: []
            };
            $.each(data, function (index, trData) {
                var cinemaMoviePriceList = [];
                if (trData.cinemaMoviePriceList) {
                    $.each(trData.cinemaMoviePriceList, function (i, subTrData) {
                        var nuomi = subTrData.srcPriceModelMap['糯米'] && subTrData.srcPriceModelMap['糯米'].price || '-';
                        var taobao = subTrData.srcPriceModelMap['淘宝'] && subTrData.srcPriceModelMap['淘宝'].price || '-';
                        var wechat = subTrData.srcPriceModelMap['微信'] && subTrData.srcPriceModelMap['微信'].price || '-';
                        cinemaMoviePriceList.push({
                            movieName: subTrData.movieName,
                            nuomi: nuomi,
                            taobao: taobao,
                            wechat: wechat
                        });
                    });
                } else {
                    cinemaMoviePriceList = [{
                        movieName: '',
                        nuomi: '-',
                        taobao: '-',
                        wechat: '-'
                    }];
                }

                var cinemaId = trData.cinemaId;
                tableData.trs.push({
                    cinemaId: trData.cinemaId,
                    cinemaName: trData.cinemaName,
                    regionName: trData.regionName,
                    subName: trData.subName,
                    cityName: trData.cityName,
                    bdName: trData.bdName,
                    cinemaMoviePriceList: cinemaMoviePriceList,
                    operate: function operate() {
                        return React.createElement(
                            _reactBootstrap.Button,
                            { onClick: _this.showTarget.bind(_this, { showDate: showDate, cinemaId: cinemaId }) },
                            '查看详情'
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
                        'span',
                        { style: { position: 'relative' } },
                        '日期：',
                        React.createElement('input', { className: 'J_datePicker', ref: 'showDate', defaultValue: showDate }),
                        '      分区：',
                        React.createElement(
                            'select',
                            { ref: 'subId' },
                            React.createElement(
                                'option',
                                { value: '0' },
                                '全部'
                            ),
                            subsOptions
                        ),
                        React.createElement(
                            'span',
                            { className: 'pull-right' },
                            noticeInfo
                        ),
                        React.createElement('br', null),
                        React.createElement('br', null),
                        '城市：',
                        React.createElement('input', { type: 'text', ref: 'city' }),
                        '   影院ID/影院名：',
                        React.createElement('input', { type: 'text', ref: 'cinemaId' }),
                        '   影片：',
                        React.createElement('input', { type: 'text', ref: 'movie' }),
                        '  ',
                        React.createElement(
                            _reactBootstrap.Button,
                            { onClick: _this.statusQueryHandler.bind(_this, {}) },
                            '查询'
                        )
                    )
                ),
                React.createElement('br', null),
                React.createElement(_componentsCommonMyTable2['default'], { data: tableData }),
                React.createElement(
                    'div',
                    { className: 'pull-right' },
                    React.createElement(_componentsCommonPaginationAdvanced2['default'], {
                        onQueryHandler: _this.queryHandler.bind(_this), ref: 'paginationAdvanced'
                    })
                ),
                React.createElement(_componentsBusinessPriceCompetitiveSellPriceDetail2['default'], _extends({}, _this.state.showTarget, { hide: this.hideTarget.bind(_this, false) }))
            );
        }
    }]);

    var _CompetitiveSellPrice = CompetitiveSellPrice;
    CompetitiveSellPrice = (0, _componentsLayoutPageLayout.page)(CompetitiveSellPrice) || CompetitiveSellPrice;
    return CompetitiveSellPrice;
})(_componentsLayoutPageLayout2['default']);

exports['default'] = CompetitiveSellPrice;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});