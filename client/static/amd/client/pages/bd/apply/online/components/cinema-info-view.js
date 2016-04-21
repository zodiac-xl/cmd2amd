'use strict';

define(["/amd/node_modules/react-bootstrap/lib/Button.js","/amd/node_modules/classnames/index.js"], function (ref_1,ref_2) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-bootstrap/lib/Button":{"index":0,"path":"node_modules/react-bootstrap/lib/Button.js"},"classnames":{"index":1,"path":"node_modules/classnames/index.js"}};
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

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _classnames = cmd2amdLoadModule('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var CINEMA_OPERATE_TEXT = {
    EXPAND: '展开影院',
    SHRINK: '收起影院'
};

var OTHER_COOP_ARR = ['格瓦拉', '时光网', '网票网', '微信', '其他'];
var EQUIPMENT_ARR = ['无线网卡', '交换机', '插线板'];

var CinemaInfoView = (function (_Component) {
    _inherits(CinemaInfoView, _Component);

    function CinemaInfoView() {
        _classCallCheck(this, CinemaInfoView);

        _get(Object.getPrototypeOf(CinemaInfoView.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            showBody: false,
            cinemaOperateText: CINEMA_OPERATE_TEXT.EXPAND
        };
    }

    _createClass(CinemaInfoView, [{
        key: 'toggleCinemaInfo',
        value: function toggleCinemaInfo() {
            if (this.state.cinemaOperateText === CINEMA_OPERATE_TEXT.EXPAND) {
                this.setState({
                    showBody: true,
                    cinemaOperateText: CINEMA_OPERATE_TEXT.SHRINK
                });
            } else {
                this.setState({
                    showBody: false,
                    cinemaOperateText: CINEMA_OPERATE_TEXT.EXPAND
                });
            }
        }
    }, {
        key: 'getMaskStringValue',
        value: function getMaskStringValue(totalValue, array) {
            var idx = undefined,
                ln = undefined;
            var masked = [];
            ln = array.length;
            for (idx = 0; idx < ln; idx++) {
                if (Math.pow(2, idx) & totalValue) {
                    masked.push(array[idx]);
                }
            }
            return masked.join('、');
        }
    }, {
        key: 'render',
        value: function render() {
            var cinema = this.props.cinema;
            if (!cinema) {
                return _react2['default'].createElement('div', null);
            }

            var panelBodyClassNames = (0, _classnames2['default'])('panel-body', 'form-inline', 'com-margin', 'customCollapse', 'panel-collapse', 'collapse', {
                'in': this.state.showBody
            });

            var otherCoop = '无合作第三方';
            if (cinema.otherCoop) {
                otherCoop = this.getMaskStringValue(cinema.otherCoop, OTHER_COOP_ARR);
            }

            var cinemaContacts = cinema.cinemaContacts || [];

            var financeContact = cinema.financeContact || {};
            var financeStyle = { display: 'none' };
            if (financeContact.name) {
                financeStyle.display = 'inline-block';
            }

            var glassText = '';
            if (cinema.glasses > 0) {
                glassText = '需要' + cinema.glasses + '元押金';
            } else if (cinema.glasses < 0) {
                glassText = '需要' + -cinema.glasses + '元购买';
            } else {
                glassText = '不需要押金';
            }

            var machineText = '';
            var machineStyle = {};
            var machine = cinema.machine || {};
            var receiver = machine.receiver || {};

            if (machine.machineNum === 0) {
                machineText = '不需要出票机';
                machineStyle.display = 'none';
            } else {
                machineText = '需要' + machine.machineNum + '台出票机';
                machineStyle.display = 'block';
            }

            var equipment = '';
            if (machine.needEquipment !== 0) {
                equipment = this.getMaskStringValue(machine.needEquipment, EQUIPMENT_ARR);
            }

            var netTypeText = '';
            var netTypeStyle = {};
            if (machine.useDhcp === 1) {
                netTypeText = '自动获取';
                netTypeStyle.display = 'none';
            } else {
                netTypeText = '手动设置';
                netTypeStyle.display = 'block';
            }

            var cinemaContactUis = [];
            for (var i = 0, ln = cinemaContacts.length; i < ln; i++) {
                var contact = cinemaContacts[i];
                cinemaContactUis.push(_react2['default'].createElement(
                    'div',
                    { key: 'contact' + contact.id },
                    _react2['default'].createElement(
                        'span',
                        { className: 'cinema-seg-block' },
                        '客服联系人',
                        i + 1,
                        '：',
                        _react2['default'].createElement(
                            'span',
                            null,
                            contact.name
                        )
                    ),
                    _react2['default'].createElement(
                        'span',
                        { className: 'cinema-seg-block' },
                        ' 联系方式：',
                        _react2['default'].createElement(
                            'span',
                            null,
                            contact.phone
                        )
                    )
                ));
            }

            return _react2['default'].createElement(
                'div',
                { className: 'panel panel-primary' },
                _react2['default'].createElement(
                    'div',
                    { className: 'panel-heading', style: { height: '46px' } },
                    _react2['default'].createElement(
                        'span',
                        null,
                        cinema.cinemaName
                    ),
                    ' ',
                    _react2['default'].createElement(
                        'span',
                        null,
                        'ID:',
                        cinema.cinemaId
                    ),
                    _react2['default'].createElement(
                        _reactBootstrapLibButton2['default'],
                        { className: 'btn-group-customer btn-sm', bsStyle: 'info', onClick: this.toggleCinemaInfo.bind(this) },
                        _react2['default'].createElement(
                            'span',
                            { className: 'hideOrShowCinema' },
                            this.state.cinemaOperateText
                        ),
                        _react2['default'].createElement('span', { className: 'caret' })
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { className: panelBodyClassNames },
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'span',
                            { className: 'cinema-seg-block' },
                            '8位编码：',
                            _react2['default'].createElement(
                                'span',
                                null,
                                cinema.cinemaNo
                            )
                        ),
                        _react2['default'].createElement(
                            'span',
                            { className: 'cinema-seg-block' },
                            '2014年票房：',
                            _react2['default'].createElement(
                                'span',
                                null,
                                cinema.boxOffice
                            ),
                            '万'
                        ),
                        _react2['default'].createElement(
                            'span',
                            { className: 'cinema-seg-block' },
                            '开业时间：',
                            _react2['default'].createElement(
                                'span',
                                null,
                                cinema.openDate
                            )
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'span',
                            null,
                            '已合作第三方：',
                            _react2['default'].createElement(
                                'span',
                                null,
                                otherCoop
                            )
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        cinemaContactUis
                    ),
                    _react2['default'].createElement(
                        'div',
                        { style: financeStyle },
                        _react2['default'].createElement(
                            'span',
                            { className: 'cinema-seg-block' },
                            '财务联系人：',
                            _react2['default'].createElement(
                                'span',
                                null,
                                financeContact.name
                            )
                        ),
                        _react2['default'].createElement(
                            'span',
                            { className: 'cinema-seg-block' },
                            '联系方式：',
                            _react2['default'].createElement(
                                'span',
                                null,
                                financeContact.phone
                            )
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'span',
                            null,
                            '值班电话：',
                            _react2['default'].createElement(
                                'span',
                                null,
                                cinema.dutyPhone ? cinema.dutyPhone : '无'
                            )
                        )
                    ),
                    _react2['default'].createElement('hr', null),
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'span',
                            null,
                            '儿童优惠：',
                            _react2['default'].createElement(
                                'span',
                                null,
                                cinema.childPref ? cinema.childPref : '无'
                            )
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'span',
                            null,
                            '3D眼镜：',
                            _react2['default'].createElement(
                                'span',
                                null,
                                glassText
                            )
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'span',
                            null,
                            '停车信息：',
                            _react2['default'].createElement(
                                'span',
                                null,
                                cinema.park ? cinema.park : "无"
                            )
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'span',
                            null,
                            'IMAX厅：',
                            _react2['default'].createElement(
                                'span',
                                null,
                                cinema.imaxHall ? cinema.imaxHall : "无"
                            )
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'span',
                            null,
                            '影院公告：',
                            _react2['default'].createElement(
                                'span',
                                null,
                                cinema.note ? cinema.note : "无"
                            )
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'span',
                            null,
                            '支持刷卡：',
                            _react2['default'].createElement(
                                'span',
                                null,
                                cinema.useCredit ? cinema.useCredit : "无"
                            )
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'span',
                            null,
                            '休息区位置：',
                            _react2['default'].createElement(
                                'span',
                                null,
                                cinema.restArea ? cinema.restArea : "无"
                            )
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'span',
                            null,
                            '情侣座：',
                            _react2['default'].createElement(
                                'span',
                                null,
                                cinema.coupleHall ? cinema.coupleHall : "无"
                            )
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'span',
                            null,
                            'WI-FI：',
                            _react2['default'].createElement(
                                'span',
                                null,
                                cinema.wifi ? cinema.wifi : "无"
                            )
                        )
                    ),
                    _react2['default'].createElement('hr', null),
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'span',
                            null,
                            '出票机设置：',
                            _react2['default'].createElement(
                                'span',
                                null,
                                machineText
                            )
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        { style: machineStyle },
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(
                                'span',
                                { className: 'cinema-seg-block' },
                                '出票机接收人：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    receiver.name
                                )
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'cinema-seg-block' },
                                '联系方式：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    receiver.phone
                                )
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(
                                'span',
                                { className: 'cinema-seg-block' },
                                'IT联系人：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    machine.itContact ? machine.itContact.name : "无"
                                )
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'cinema-seg-block' },
                                '联系方式：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    machine.itContact ? machine.itContact.phone : "无"
                                )
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(
                                'span',
                                null,
                                '可选设备：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    equipment
                                )
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(
                                'span',
                                null,
                                '网线长度：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    machine.cableLength
                                ),
                                '米'
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(
                                'span',
                                null,
                                '是否自动获取IP(DHCP)：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    netTypeText
                                )
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            { style: netTypeStyle },
                            _react2['default'].createElement(
                                'span',
                                null,
                                'IP：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    machine.ip
                                )
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'margin-left-10' },
                                '子网掩码：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    machine.subnetMask
                                )
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'margin-left-10' },
                                '默认网关：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    machine.gatewayIp
                                )
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'margin-left-10' },
                                'DNS1：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    machine.dnsIp1
                                )
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'margin-left-10' },
                                'DNS2（备用DNS）：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    machine.dnsIp2
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return CinemaInfoView;
})(_react.Component);

exports['default'] = CinemaInfoView;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});