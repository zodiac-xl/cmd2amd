'use strict';

define(["/amd/node_modules/react-bootstrap/lib/Button.js","/amd/node_modules/react-bootstrap/lib/Input.js","/amd/node_modules/classnames/index.js","/amd/client/components/util/bdAjax.js","/amd/client/pages/bd/apply/online/bind/react-path-link.js","/amd/client/pages/bd/apply/online/bind/react-checked-mask-path-link.js","/amd/client/pages/bd/apply/online/bind/react-checked-equal-path-link.js","/amd/client/pages/bd/apply/online/components/toggle-union-input.js"], function (ref_1,ref_2,ref_3,ref_4,ref_5,ref_6,ref_7,ref_8) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-bootstrap/lib/Button":{"index":0,"path":"node_modules/react-bootstrap/lib/Button.js"},"react-bootstrap/lib/Input":{"index":1,"path":"node_modules/react-bootstrap/lib/Input.js"},"classnames":{"index":2,"path":"node_modules/classnames/index.js"},"../../../../../components/util/bdAjax":{"index":3,"path":"client/components/util/bdAjax.js"},"../bind/react-path-link":{"index":4,"path":"client/pages/bd/apply/online/bind/react-path-link.js"},"../bind/react-checked-mask-path-link":{"index":5,"path":"client/pages/bd/apply/online/bind/react-checked-mask-path-link.js"},"../bind/react-checked-equal-path-link":{"index":6,"path":"client/pages/bd/apply/online/bind/react-checked-equal-path-link.js"},"./toggle-union-input":{"index":7,"path":"client/pages/bd/apply/online/components/toggle-union-input.js"}};
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

var _reactBootstrapLibInput = cmd2amdLoadModule('react-bootstrap/lib/Input');

var _reactBootstrapLibInput2 = _interopRequireDefault(_reactBootstrapLibInput);

var _classnames = cmd2amdLoadModule('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _componentsUtilBdAjax = cmd2amdLoadModule('../../../../../components/util/bdAjax');

var _componentsUtilBdAjax2 = _interopRequireDefault(_componentsUtilBdAjax);

var _bindReactPathLink = cmd2amdLoadModule('../bind/react-path-link');

var _bindReactPathLink2 = _interopRequireDefault(_bindReactPathLink);

var _bindReactCheckedMaskPathLink = cmd2amdLoadModule('../bind/react-checked-mask-path-link');

var _bindReactCheckedMaskPathLink2 = _interopRequireDefault(_bindReactCheckedMaskPathLink);

var _bindReactCheckedEqualPathLink = cmd2amdLoadModule('../bind/react-checked-equal-path-link');

var _bindReactCheckedEqualPathLink2 = _interopRequireDefault(_bindReactCheckedEqualPathLink);

var _toggleUnionInput = cmd2amdLoadModule('./toggle-union-input');

var _toggleUnionInput2 = _interopRequireDefault(_toggleUnionInput);

var MachineForm = (function (_Component) {
    _inherits(MachineForm, _Component);

    function MachineForm() {
        _classCallCheck(this, MachineForm);

        _get(Object.getPrototypeOf(MachineForm.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            machine: {}
        };
    }

    _createClass(MachineForm, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, nextState) {
            this.setState(nextProps);
        }
    }, {
        key: 'checkForm',
        value: function checkForm(cinema, submit) {
            var machine = this.state.machine || {};
            var machineAssist = machine.assist || {};

            if (machineAssist.needMachineType === 0) {
                machine.machineNum = this.refs.machineNum.value;

                var receiver = machine.receiver || {};
                if (!receiver.name || !receiver.phone) {
                    return cinema.cinemaName + ': 请填写接受人姓名和联系电话！';
                }

                if (!receiver.name || !receiver.phone) {
                    return cinema.cinemaName + ': 请填写接受人姓名和联系电话！';
                }

                if (machine.useDhcp === 0) {
                    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                    if (!reg.test(machine.ip)) {
                        return cinema.cinemaName + ': IP设置错误！';
                    }

                    if (!reg.test(machine.subnetMask)) {
                        return cinema.cinemaName + ': 子网设置错误！';
                    }

                    if (!reg.test(machine.gatewayIp)) {
                        return cinema.cinemaName + ': 网关设置错误！';
                    }

                    if (!reg.test(machine.dnsIp1)) {
                        return cinema.cinemaName + ': DNS1设置错误！';
                    }

                    if (!reg.test(machine.dnsIp2)) {
                        return cinema.cinemaName + ': DNS2设置错误！';
                    }
                }
            }
            return true;
        }
    }, {
        key: 'pathLink',
        value: function pathLink(key) {
            return new _bindReactPathLink2['default'](this, key);
        }
    }, {
        key: 'checkedMaskPathLink',
        value: function checkedMaskPathLink(key, value) {
            return new _bindReactCheckedMaskPathLink2['default'](this, key, value);
        }
    }, {
        key: 'checkedEqualPathLink',
        value: function checkedEqualPathLink(key, value) {
            return new _bindReactCheckedEqualPathLink2['default'](this, key, value);
        }
    }, {
        key: 'render',
        value: function render() {
            var assist = this.state.machine.assist || {};
            var machineDetailStyle = {
                display: 'block'
            };

            if (assist.needMachineType === 1) {
                machineDetailStyle.display = 'none';
            }

            var netCfgStyle = {
                display: 'block'
            };
            if (this.state.machine.useDhcp === 1) {
                netCfgStyle.display = 'none';
            }

            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'div',
                    null,
                    '出票机：',
                    _react2['default'].createElement(
                        'label',
                        { className: 'radio-inline' },
                        _react2['default'].createElement('input', { type: 'radio',
                            checkedLink: this.checkedEqualPathLink('machine.assist.needMachineType', 0) }),
                        '需要'
                    ),
                    _react2['default'].createElement(
                        'select',
                        { ref: 'machineNum', className: 'form-control',
                            valueLink: this.pathLink('machine.machineNum') },
                        _react2['default'].createElement(
                            'option',
                            { value: '1' },
                            '1'
                        ),
                        _react2['default'].createElement(
                            'option',
                            { value: '2' },
                            '2'
                        ),
                        _react2['default'].createElement(
                            'option',
                            { value: '3' },
                            '3'
                        )
                    ),
                    _react2['default'].createElement(
                        'label',
                        { className: 'radio-inline margin-left-10' },
                        _react2['default'].createElement('input', { type: 'radio',
                            checkedLink: this.checkedEqualPathLink('machine.assist.needMachineType', 1) }),
                        '不需要'
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { style: machineDetailStyle },
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'span',
                            null,
                            '出票机接收人：',
                            _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm', placeholder: '姓名',
                                size: '8',
                                valueLink: this.pathLink('machine.receiver.name') })
                        ),
                        _react2['default'].createElement(
                            'span',
                            { className: 'margin-left-10' },
                            '联系电话：',
                            _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm',
                                size: '20', placeholder: '电话',
                                valueLink: this.pathLink('machine.receiver.phone') })
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'span',
                            null,
                            'IT联系人（非必填）：',
                            _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm', placeholder: '姓名',
                                size: '8',
                                valueLink: this.pathLink('machine.itContact.name') })
                        ),
                        _react2['default'].createElement(
                            'span',
                            { className: 'margin-left-10' },
                            '联系电话：',
                            _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm',
                                size: '20', placeholder: '电话',
                                valueLink: this.pathLink('machine.itContact.phone') })
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        '可选设备：',
                        _react2['default'].createElement(
                            'label',
                            { className: 'checkbox-inline' },
                            _react2['default'].createElement('input', { type: 'checkbox',
                                checkedLink: this.checkedMaskPathLink('machine.needEquipment', 1) }),
                            '无限网卡'
                        ),
                        _react2['default'].createElement(
                            'label',
                            { className: 'checkbox-inline margin-left-10' },
                            _react2['default'].createElement('input', { type: 'checkbox',
                                checkedLink: this.checkedMaskPathLink('machine.needEquipment', 2) }),
                            '交换机'
                        ),
                        _react2['default'].createElement(
                            'label',
                            { className: 'checkbox-inline margin-left-10' },
                            _react2['default'].createElement('input', { type: 'checkbox',
                                checkedLink: this.checkedMaskPathLink('machine.needEquipment', 4) }),
                            '插线板'
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        '网线长度：',
                        _react2['default'].createElement(
                            'label',
                            { className: 'radio-inline' },
                            _react2['default'].createElement('input', { type: 'radio',
                                checkedLink: this.checkedEqualPathLink('machine.cableLength', 5) }),
                            '5m'
                        ),
                        _react2['default'].createElement(
                            'label',
                            { className: 'radio-inline' },
                            _react2['default'].createElement('input', { type: 'radio',
                                checkedLink: this.checkedEqualPathLink('machine.cableLength', 10) }),
                            '10m'
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        '设置网络：',
                        _react2['default'].createElement(
                            'label',
                            { className: 'radio-inline' },
                            _react2['default'].createElement('input', { type: 'radio',
                                checkedLink: this.checkedEqualPathLink('machine.useDhcp', 1) }),
                            '机器到影院后自动获取'
                        ),
                        _react2['default'].createElement(
                            'label',
                            { className: 'radio-inline' },
                            _react2['default'].createElement('input', { type: 'radio',
                                checkedLink: this.checkedEqualPathLink('machine.useDhcp', 0) }),
                            '手工设置'
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        { style: netCfgStyle },
                        _react2['default'].createElement(
                            'span',
                            null,
                            'IP设置：',
                            _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm',
                                valueLink: this.pathLink('machine.ip') })
                        ),
                        _react2['default'].createElement(
                            'span',
                            { className: 'margin-left-10' },
                            '子网掩码设置：',
                            _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm',
                                valueLink: this.pathLink('machine.subnetMask') })
                        ),
                        _react2['default'].createElement(
                            'span',
                            { className: 'margin-left-10' },
                            '网关设置：',
                            _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm',
                                valueLink: this.pathLink('machine.gatewayIp') })
                        ),
                        _react2['default'].createElement('br', null),
                        _react2['default'].createElement('br', null),
                        _react2['default'].createElement(
                            'span',
                            null,
                            'DNS 1设置：',
                            _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm',
                                valueLink: this.pathLink('machine.dnsIp1') })
                        ),
                        _react2['default'].createElement(
                            'span',
                            { className: 'margin-left-10' },
                            'DNS 2设置：',
                            _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm margin-left-10',
                                valueLink: this.pathLink('machine.dnsIp2') })
                        )
                    )
                )
            );
        }
    }], [{
        key: 'propTypes',
        value: {
            machine: _react2['default'].PropTypes.object.isRequired
        },
        enumerable: true
    }]);

    return MachineForm;
})(_react.Component);

exports['default'] = MachineForm;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});