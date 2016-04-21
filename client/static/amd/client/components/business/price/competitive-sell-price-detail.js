'use strict';

define(["/amd/node_modules/date-format/lib/index.js","/amd/client/components/common/form-group.js","/amd/client/components/common/simple-modal.js","/amd/client/components/common/my-table.js"], function (ref_2,ref_3,ref_4,ref_5) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"date-format":{"index":0,"path":"node_modules/date-format/lib/index.js"},"../../common/form-group.js":{"index":1,"path":"client/components/common/form-group.js"},"../../common/simple-modal":{"index":2,"path":"client/components/common/simple-modal.js"},"../../common/my-table":{"index":3,"path":"client/components/common/my-table.js"}};
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

var _dateFormat = cmd2amdLoadModule('date-format');

var _dateFormat2 = _interopRequireDefault(_dateFormat);

var _commonFormGroupJs = cmd2amdLoadModule('../../common/form-group.js');

var _commonSimpleModal = cmd2amdLoadModule('../../common/simple-modal');

var _commonSimpleModal2 = _interopRequireDefault(_commonSimpleModal);

var _commonMyTable = cmd2amdLoadModule('../../common/my-table');

var _commonMyTable2 = _interopRequireDefault(_commonMyTable);

var ViewTarget = (function (_SimpleModal) {
    _inherits(ViewTarget, _SimpleModal);

    function ViewTarget() {
        _classCallCheck(this, ViewTarget);

        _get(Object.getPrototypeOf(ViewTarget.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(ViewTarget, [{
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            return {
                isLoading: false,
                title: "查看详情",
                detailInfo: []
            };
        }
    }, {
        key: 'getInitCondition',
        value: function getInitCondition(props) {
            var _this = this;
            var api = {
                url: '/api/cinema/price/detail.json',
                data: {
                    showDate: props.showDate,
                    cinemaId: props.cinemaId
                }
            };
            $.ajax(api).done(function (e) {
                _this.setState({
                    detailInfo: e.data
                });
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.show) {
                this.getInitCondition(nextProps);
            }
        }
    }, {
        key: 'submit',
        value: function submit() {}
    }, {
        key: 'renderFooter',
        value: function renderFooter() {}
    }, {
        key: 'renderBody',
        value: function renderBody() {
            var detailInfo = this.state.detailInfo;

            if (!detailInfo || detailInfo.length === 0) {
                return;
            }

            var cinemaId = detailInfo[0].cinemaId;
            var cinemaName = detailInfo[0].cinemaName;
            var noticeInfo = '数据为最近2小时更新';
            if (new Date((0, _dateFormat2['default'])("yyyy-MM-dd", new Date())) > new Date(detailInfo[0].showTime)) {
                noticeInfo = '数据为各场次当日最低售价';
            }

            // table data
            var tableData = {
                ths: {
                    movieName: "影片",
                    hallName: "影厅",
                    showTime: "场次时间",
                    maoyan: "猫眼售价",
                    nuomi: "糯米售价",
                    taobao: "淘宝售价",
                    wechat: "微票售价"
                },
                trs: []
            };
            var keyMap = {
                maoyan: '猫眼',
                nuomi: '糯米',
                taobao: '淘宝',
                wechat: '微信'
            };

            $.each(detailInfo, function (index, trData) {
                var movieName = trData.movieName;
                var hallName = trData.hallName;
                var showTime = trData.showTime;

                var srcPriceData = {};
                $.each(keyMap, function (name, key) {
                    var content = _react2['default'].createElement(
                        'span',
                        null,
                        '-'
                    );
                    var obj = trData.srcPriceModelMap[key];
                    if (obj) {
                        var activity = obj.hasActivity ? _react2['default'].createElement(
                            'span',
                            { style: { color: 'red' } },
                            '活'
                        ) : null;
                        var price = obj.price ? _react2['default'].createElement(
                            'span',
                            null,
                            obj.price
                        ) : null;
                        content = _react2['default'].createElement(
                            'span',
                            null,
                            activity,
                            price
                        );
                    }
                    srcPriceData[name] = content;
                });
                tableData.trs.push(_extends({ movieName: movieName, hallName: hallName, showTime: showTime }, srcPriceData));
            });

            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'div',
                    null,
                    _react2['default'].createElement(
                        'span',
                        null,
                        '影院 ID: ',
                        cinemaId
                    ),
                    '  ',
                    _react2['default'].createElement(
                        'span',
                        null,
                        '影院名: ',
                        cinemaName
                    ),
                    _react2['default'].createElement(
                        'span',
                        { className: 'pull-right' },
                        noticeInfo
                    )
                ),
                _react2['default'].createElement('hr', null),
                _react2['default'].createElement(_commonMyTable2['default'], { data: tableData })
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            hide: function hide() {},
            showDate: '',
            cinemaId: 0,
            show: false
        },
        enumerable: true
    }]);

    return ViewTarget;
})(_commonSimpleModal2['default']);

exports['default'] = ViewTarget;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});