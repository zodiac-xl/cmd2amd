'use strict';

define(["/amd/client/components/common/my-table.js","/amd/node_modules/react-bootstrap/lib/Modal.js","/amd/node_modules/react-bootstrap/lib/Button.js","/amd/node_modules/promise/index.js","/amd/client/pages/bd/apply/online/components/cinema-info-view.js","/amd/client/pages/bd/apply/online/dom/modal-enter-helper.js"], function (ref_1,ref_2,ref_3,ref_4,ref_5,ref_6) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"../../../../../components/common/my-table":{"index":0,"path":"client/components/common/my-table.js"},"react-bootstrap/lib/Modal":{"index":1,"path":"node_modules/react-bootstrap/lib/Modal.js"},"react-bootstrap/lib/Button":{"index":2,"path":"node_modules/react-bootstrap/lib/Button.js"},"promise":{"index":3,"path":"node_modules/promise/index.js"},"./cinema-info-view":{"index":4,"path":"client/pages/bd/apply/online/components/cinema-info-view.js"},"../dom/modal-enter-helper":{"index":5,"path":"client/pages/bd/apply/online/dom/modal-enter-helper.js"}};
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

var _componentsCommonMyTable = cmd2amdLoadModule('../../../../../components/common/my-table');

var _componentsCommonMyTable2 = _interopRequireDefault(_componentsCommonMyTable);

var _reactBootstrapLibModal = cmd2amdLoadModule('react-bootstrap/lib/Modal');

var _reactBootstrapLibModal2 = _interopRequireDefault(_reactBootstrapLibModal);

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _promise = cmd2amdLoadModule('promise');

var _promise2 = _interopRequireDefault(_promise);

var _cinemaInfoView = cmd2amdLoadModule('./cinema-info-view');

var _cinemaInfoView2 = _interopRequireDefault(_cinemaInfoView);

var _domModalEnterHelper = cmd2amdLoadModule('../dom/modal-enter-helper');

var _domModalEnterHelper2 = _interopRequireDefault(_domModalEnterHelper);

var ApplyViewModal = (function (_Component) {
    _inherits(ApplyViewModal, _Component);

    function ApplyViewModal() {
        _classCallCheck(this, ApplyViewModal);

        _get(Object.getPrototypeOf(ApplyViewModal.prototype), 'constructor', this).apply(this, arguments);

        this.state = {};
    }

    _createClass(ApplyViewModal, [{
        key: 'onModalHide',
        value: function onModalHide() {}
    }, {
        key: 'getAudits',
        value: function getAudits(id) {
            return new _promise2['default'](function (resolve, reject) {
                $.getJSON('/api/online/audit/' + id + '/audits.json', function (data) {
                    var audits = data.data;
                    if (audits.length === 0) {
                        reject(new Error('can not find audits'));
                    } else {
                        resolve(audits);
                    }
                }).fail(function () {
                    reject(new Error('can not find audits'));
                });
            });
        }
    }, {
        key: 'getCinemas',
        value: function getCinemas(id) {
            return new _promise2['default'](function (resolve, reject) {
                $.getJSON('/api/cinema/online/' + id + '/cinemas.json', function (data) {
                    var cinemas = data.data;
                    if (cinemas.length === 0) {
                        reject(new Error('can not find cinemas'));
                    } else {
                        resolve(cinemas);
                    }
                }).fail(function () {
                    reject(new Error('can not find cinemas'));
                });
            });
        }
    }, {
        key: 'getApply',
        value: function getApply(id) {
            return new _promise2['default'](function (resolve, reject) {
                $.getJSON('/api/online/apply/' + id + '.json', function (data) {
                    var apply = data.data;
                    if (!apply) {
                        reject(new Error('can not find apply'));
                    } else {
                        resolve(apply);
                    }
                }).fail(function () {
                    reject(new Error('can not find apply'));
                });
            });
        }
    }, {
        key: 'getSaleSystems',
        value: function getSaleSystems() {
            return new _promise2['default'](function (resolve, reject) {
                $.getJSON('/api/seat/saleSystem.json', function (saleSystems) {
                    resolve(saleSystems.data);
                }).fail(function () {
                    reject(new Error('can not find apply'));
                });
            });
        }
    }, {
        key: 'getShowData',
        value: function getShowData(id) {
            var _this = this;

            _promise2['default'].all([this.getAudits(id), this.getCinemas(id), this.getApply(id), this.getSaleSystems()]).then(function (values) {
                _this.setState({
                    audits: values[0],
                    cinemas: values[1],
                    apply: values[2],
                    saleSystems: values[3]
                });
            })['catch'](function (err) {
                console.error('error: ' + err.message);
            });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.fillData(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.fillData(nextProps);
        }
    }, {
        key: 'fillData',
        value: function fillData(props) {
            if (props.show) {
                if (props.applyId !== 0) {
                    this.getShowData(props.applyId);
                } else {
                    this.setState({});
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var audits = this.state.audits;
            var cinemas = this.state.cinemas;
            var apply = this.state.apply;
            var saleSystems = this.state.saleSystems;
            if (!audits || !cinemas || !apply || !saleSystems) {
                return _react2['default'].createElement('div', null);
            }

            var lastestAudit = audits.pop() || {};

            var auditStyle = {
                display: audits.length === 0 ? 'block' : 'none'
            };

            var contract = apply.contract || {};
            var idx = undefined,
                ln = undefined,
                saleStr = undefined;
            ln = saleSystems.length;
            for (idx = 0; idx < ln; idx++) {
                if (saleSystems[idx].id == contract.sellSrc) {
                    saleStr = saleSystems[idx].name;
                    break;
                }
            }

            var hasFinanceContact = false;
            var financeText = '';
            var financeContact = contract.financeContact || {};
            var financeStyle = {};
            if (financeContact.name) {
                hasFinanceContact = true;
                financeText = '统一对账';
                financeStyle.display = 'inline-block';
            } else {
                financeText = '各影院独立对账';
                financeStyle.display = 'none';
            }

            var contact = contract.contact || {};

            var returnTicketText = '';
            var returnTicketStyle = { display: 'none' };
            if (contract.refundType === 0) {
                returnTicketText = '不支持用户自助退票';
            } else if (contract.refundType === 1) {
                returnTicketText = '统一自助退票';
                returnTicketStyle.display = 'inline-block';
            } else {
                returnTicketText = '各影院自助退票';
            }

            var files = contract.files || [];

            var tableData = {
                ths: ['影院ID', '影院名称', '城市', '状态'],
                trs: cinemas.map(function (cinema) {
                    return [cinema.id, cinema.name, cinema.city, cinema.stateDesc];
                })
            };

            return _react2['default'].createElement(
                _reactBootstrapLibModal2['default'],
                { onHide: this.onModalHide.bind(this), show: this.props.show,
                    onEnter: _domModalEnterHelper2['default'],
                    className: 'bd-home' },
                _react2['default'].createElement(
                    _reactBootstrapLibModal2['default'].Header,
                    null,
                    _react2['default'].createElement(
                        _reactBootstrapLibButton2['default'],
                        { className: 'close', onClick: this.props.closeApplyViewModal },
                        '×'
                    ),
                    _react2['default'].createElement(
                        _reactBootstrapLibModal2['default'].Title,
                        null,
                        '查看上线信息'
                    )
                ),
                _react2['default'].createElement(
                    _reactBootstrapLibModal2['default'].Body,
                    null,
                    _react2['default'].createElement(
                        'div',
                        { id: 'auditHistory' },
                        _react2['default'].createElement(
                            'div',
                            { className: 'checkInfoSeg' },
                            _react2['default'].createElement(
                                'div',
                                null,
                                '提交时间：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    lastestAudit.applyTime
                                )
                            ),
                            _react2['default'].createElement(
                                'div',
                                null,
                                '提交人：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    lastestAudit.bdName
                                )
                            ),
                            _react2['default'].createElement(
                                'div',
                                null,
                                '状态：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    lastestAudit.type == 2 ? "请求被驳回：" + lastestAudit.reason : this.props.applyAudit.stateDesc
                                )
                            ),
                            _react2['default'].createElement(
                                'div',
                                null,
                                '审核人：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    lastestAudit.auditorName
                                )
                            ),
                            _react2['default'].createElement(
                                'div',
                                null,
                                '审核通过时间：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    lastestAudit.auditTime
                                )
                            ),
                            _react2['default'].createElement(
                                'h5',
                                { style: auditStyle },
                                '审核历史'
                            ),
                            _react2['default'].createElement(
                                'div',
                                null,
                                audits.map(function (audit) {
                                    return _react2['default'].createElement(
                                        'div',
                                        { key: 'audit' + audit.id },
                                        '`$',
                                        audit.applyTime,
                                        '，被驳回，原因：$',
                                        audit.reason,
                                        '。审核人：$',
                                        audit.auditorName,
                                        '`'
                                    );
                                })
                            ),
                            _react2['default'].createElement('hr', null)
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(_componentsCommonMyTable2['default'], { data: tableData }),
                        _react2['default'].createElement('hr', null)
                    ),
                    _react2['default'].createElement(
                        'div',
                        { id: 'contractSeg' },
                        _react2['default'].createElement(
                            'h4',
                            null,
                            '签约信息'
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(
                                'span',
                                { className: 'cinema-seg-block' },
                                '所属院线：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    contract.theaterChain
                                )
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'cinema-seg-block' },
                                '售票系统：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    saleStr
                                )
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(
                                'span',
                                { className: 'cinema-seg-block' },
                                '签约联系人：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    contact.name
                                )
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'cinema-seg-block' },
                                '联系电话：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    contact.phone
                                )
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'cinema-seg-block' },
                                '盖章顺序：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    contract.signSequence == 1 ? "猫眼先盖章" : "影院先盖章"
                                )
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(
                                'span',
                                { className: 'cinema-seg-block' },
                                '对账设置：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    financeText
                                )
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'cinema-seg-block', style: financeStyle },
                                '财务联系人：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    financeContact.name
                                )
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'cinema-seg-block', style: financeStyle },
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
                                { className: 'cinema-seg-block' },
                                '退票设置：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    returnTicketText
                                )
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'cinema-seg-block', style: returnTicketStyle },
                                '开场前：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    contract.refundTime
                                ),
                                '分钟前用户可自助退票'
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(
                                'span',
                                null,
                                '400客服电话：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    contract.freeContactPhone ? contract.freeContactPhone : "无"
                                )
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(
                                'span',
                                null,
                                '已上传文件：',
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    files.map(function (file) {
                                        return _react2['default'].createElement(
                                            'a',
                                            { key: 'fileview' + file.id, target: '_blank', href: file.url },
                                            file.name
                                        );
                                    })
                                )
                            )
                        )
                    ),
                    apply.cinemas.map(function (cinema) {
                        return _react2['default'].createElement(_cinemaInfoView2['default'], { key: 'civ' + cinema.cinemaId, cinema: cinema });
                    })
                )
            );
        }
    }]);

    return ApplyViewModal;
})(_react.Component);

exports['default'] = ApplyViewModal;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});