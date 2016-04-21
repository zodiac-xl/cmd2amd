'use strict';

define(["/amd/client/components/common/my-table.js","/amd/client/components/util/bdAjax.js"], function (ref_1,ref_2) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"../../common/my-table":{"index":0,"path":"client/components/common/my-table.js"},"../../util/bdAjax":{"index":1,"path":"client/components/util/bdAjax.js"}};
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

var _commonMyTable = cmd2amdLoadModule('../../common/my-table');

var _commonMyTable2 = _interopRequireDefault(_commonMyTable);

var _utilBdAjax = cmd2amdLoadModule('../../util/bdAjax');

var _utilBdAjax2 = _interopRequireDefault(_utilBdAjax);

var PriceInfosTable = (function (_Component) {
    _inherits(PriceInfosTable, _Component);

    function PriceInfosTable() {
        _classCallCheck(this, PriceInfosTable);

        _get(Object.getPrototypeOf(PriceInfosTable.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            data: null
        };
    }

    _createClass(PriceInfosTable, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.getNegotiationInfo();
        }
    }, {
        key: 'getNegotiationInfo',
        value: function getNegotiationInfo() {
            var _this = this;
            (0, _utilBdAjax2['default'])({
                url: '/api/activity/task/' + _this.props.taskId + '/cinema/' + _this.props.cinemaId + '/negotiationInfo.json',
                async: false,
                des: '获取跟进结果'
            }).done(function (e) {
                var newState = _this.state;
                newState.data = _this._makePriceAdjustContents(e.data.priceAdjustContents);
                _this.setState(newState);
            });
        }
    }, {
        key: '_makePriceAdjustContents',
        value: function _makePriceAdjustContents(priceAdjustContents) {
            if (priceAdjustContents.length == 0) {
                return;
            }
            var tableData = {
                ths: ['序号', '影厅', '版本', '影片', '时段', '进价类型', '售价类型', '限价保护'],
                trs: []
            };

            var showTypeMap = ['所有版本', '2D', 'IMAX2D', '3D', 'IMAX3D', '4D', '巨幕2D', '巨幕3D'];

            $.each(priceAdjustContents, function (i, item) {

                var timeRanges = item.timeRanges.map(function (timeRange) {
                    var weekDays = timeRange.weekDays;
                    var weekDaysMap = ['一', '二', '三', '四', '五', '六', '七'];
                    var weekDays2 = ("0000000" + parseInt(weekDays).toString(2)).slice(-7);
                    var activeDays = [];
                    for (var i = 0; i < 7; i++) {
                        if (weekDays2[i] == 1) {
                            activeDays.push(String(i));
                        }
                    }
                    activeDays = activeDays.map(function (key) {
                        return weekDaysMap[key];
                    }).join('/');

                    return timeRange.startDate + '至' + timeRange.endDate + " " + timeRange.startTime + '至' + timeRange.endTime + ' ' + activeDays;
                }).join("<br/>");

                var halls = item.halls.map(function (hall) {
                    return hall.name;
                });

                var movies;
                if (item.movies.data.length == 0) {
                    movies = item.movies.inverse ? '其他' : '全部';
                } else {
                    movies = item.movies.data.map(function (movie) {
                        return "《" + movie.nm + "》";
                    }).join("<br/>");
                }

                var buyDes = '';
                var price = item.purchasePrice.price;
                var discount = item.purchasePrice.discount;
                switch (item.purchasePrice.type * 1) {
                    case 1:
                        buyDes = '最低限价:+' + price;
                        break;
                    case 2:
                        buyDes = '协定价:' + price;
                        break;
                    case 3:
                        buyDes = '折扣价:' + discount + "% + " + price;
                        break;
                }
                //"type": 3,    //进价类型，1-最低限价+N，2-协定价，3-折扣价

                tableData.trs.push({
                    index: tableData.trs.length + 1,
                    halls: halls.join('\\'),
                    showType: showTypeMap[item.purchasePrice.showType * 1],
                    movies: movies,
                    timeRange: timeRanges,
                    buyDes: buyDes,
                    saleDes: '加价3',
                    priceLimit: item.priceLimit ? '是' : '否'
                });
            });
            return tableData;
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.data) {
                return _react2['default'].createElement(_commonMyTable2['default'], { data: this.state.data });
            } else {
                return _react2['default'].createElement('div', null);
            }
        }
    }], [{
        key: 'defaultProps',
        value: {
            taskId: null,
            cinemaId: null
        },
        enumerable: true
    }]);

    return PriceInfosTable;
})(_react.Component);

exports['default'] = PriceInfosTable;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});