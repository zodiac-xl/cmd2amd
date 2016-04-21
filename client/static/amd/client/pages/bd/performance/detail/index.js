'use strict';

define(["/amd/client/components/layout/page-layout.js","/amd/node_modules/react-bootstrap/lib/index.js","/amd/client/components/common/my-table.js","/amd/client/components/util/url.js","/amd/client/components/business/performance/edit-target.js"], function (ref_1,ref_2,ref_3,ref_4,ref_5) {

    var cmd2amdModules = {"react-dom":{"external":"ReactDOM","index":null,"path":null},"../../../../components/layout/page-layout":{"index":0,"path":"client/components/layout/page-layout.js"},"react-bootstrap":{"index":1,"path":"node_modules/react-bootstrap/lib/index.js"},"../../../../components/common/my-table":{"index":2,"path":"client/components/common/my-table.js"},"../../../../components/util/url":{"index":3,"path":"client/components/util/url.js"},"../../../../components/business/performance/edit-target":{"index":4,"path":"client/components/business/performance/edit-target.js"}};
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

var _componentsLayoutPageLayout = cmd2amdLoadModule('../../../../components/layout/page-layout');

var _componentsLayoutPageLayout2 = _interopRequireDefault(_componentsLayoutPageLayout);

var _reactBootstrap = cmd2amdLoadModule('react-bootstrap');

var _componentsCommonMyTable = cmd2amdLoadModule('../../../../components/common/my-table');

var _componentsCommonMyTable2 = _interopRequireDefault(_componentsCommonMyTable);

var _componentsUtilUrl = cmd2amdLoadModule('../../../../components/util/url');

var _componentsUtilUrl2 = _interopRequireDefault(_componentsUtilUrl);

var _componentsBusinessPerformanceEditTarget = cmd2amdLoadModule('../../../../components/business/performance/edit-target');

var _componentsBusinessPerformanceEditTarget2 = _interopRequireDefault(_componentsBusinessPerformanceEditTarget);

var PerformanceDetail = (function (_Page) {
    _inherits(PerformanceDetail, _Page);

    function PerformanceDetail() {
        _classCallCheck(this, _PerformanceDetail);

        _get(Object.getPrototypeOf(_PerformanceDetail.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            performanceDetail: []

        };
    }

    _createClass(PerformanceDetail, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setPerformanceDetail();
        }
    }, {
        key: 'setPerformanceDetail',
        value: function setPerformanceDetail() {
            var _this = this;
            _this.ajax({
                url: '/api/performance/cinemas/detail.json',
                des: ' 获取bd POI绩效详情',
                data: this.props.apiData
            }).done(function (e) {
                _this.setState({
                    performanceDetail: e.data
                });
            });
        }
    }, {
        key: 'reRender',
        value: function reRender() {
            this.setPerformanceDetail();
        }
    }, {
        key: 'editTarget',
        value: function editTarget(subTrData, performanceType) {
            var container = _reactDom2['default'].findDOMNode(this.refs['container-edit-target']);
            var props = {
                bdCinemaPerformanceId: subTrData.id,
                point: subTrData.point,
                execution: subTrData.execution,
                score: subTrData.score,
                freshParent: this.reRender.bind(this),
                performanceType: performanceType
            };
            _reactDom2['default'].unmountComponentAtNode(container);
            var component = _reactDom2['default'].render(React.createElement(_componentsBusinessPerformanceEditTarget2['default'], props), container);
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var _this = this;
            var tableData = {
                ths: ['影院ID', '影院名', '目标', '完成情况', '操作'],
                trs: []
            };
            _this.state.performanceDetail.forEach(function (item) {
                var operate = '';
                if (_this.props.isEdit) {
                    operate = React.createElement(
                        _reactBootstrap.Button,
                        { onClick: _this.editTarget.bind(_this, item, 1) },
                        '调整POI目标'
                    );
                }
                tableData.trs.push({
                    cinemaId: item.cinemaId,
                    cinemaName: item.cinemaName,
                    point: item.point,
                    execution: item.execution,
                    operate: operate
                });
            });

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'a',
                        { href: '/bd/performance/manage' },
                        React.createElement(
                            _reactBootstrap.Button,
                            null,
                            '返回绩效管理'
                        )
                    ),
                    '    ',
                    React.createElement('p', null),
                    React.createElement(
                        'div',
                        null,
                        'BD：',
                        React.createElement(
                            'span',
                            null,
                            _this.props.BD
                        ),
                        '         绩效指标：',
                        React.createElement(
                            'span',
                            null,
                            _this.props.performanceTarget
                        ),
                        React.createElement(
                            'div',
                            { className: 'pull-right hide' },
                            '请于本月16日00:00:00之前调整绩效目标，逾期无法操作'
                        )
                    ),
                    React.createElement('p', null)
                ),
                React.createElement(_componentsCommonMyTable2['default'], { data: tableData }),
                React.createElement('div', { ref: 'container-edit-target' })
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            BD: _componentsUtilUrl2['default'].getUrlArg('BD'),
            performanceTarget: _componentsUtilUrl2['default'].getUrlArg('performanceTarget'),
            isEdit: _componentsUtilUrl2['default'].getUrlArg('isEdit') == 'true',
            apiData: {
                timeScreen: _componentsUtilUrl2['default'].getUrlArg('timeScreen'),
                type: _componentsUtilUrl2['default'].getUrlArg('type'),
                bdId: _componentsUtilUrl2['default'].getUrlArg('bdId'),
                targetId: _componentsUtilUrl2['default'].getUrlArg('targetId')
            }
        },
        enumerable: true
    }]);

    var _PerformanceDetail = PerformanceDetail;
    PerformanceDetail = (0, _componentsLayoutPageLayout.page)(PerformanceDetail) || PerformanceDetail;
    return PerformanceDetail;
})(_componentsLayoutPageLayout2['default']);

exports['default'] = PerformanceDetail;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});