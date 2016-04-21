'use strict';

define(["/amd/node_modules/uniqid/index.js","/amd/node_modules/react-bootstrap/lib/Modal.js","/amd/node_modules/react-bootstrap/lib/Table.js","/amd/node_modules/react-bootstrap/lib/Button.js","/amd/client/components/util/bdAjax.js"], function (ref_2,ref_3,ref_4,ref_5,ref_6) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"uniqid":{"index":0,"path":"node_modules/uniqid/index.js"},"react-bootstrap/lib/Modal":{"index":1,"path":"node_modules/react-bootstrap/lib/Modal.js"},"react-bootstrap/lib/Table":{"index":2,"path":"node_modules/react-bootstrap/lib/Table.js"},"react-bootstrap/lib/Button":{"index":3,"path":"node_modules/react-bootstrap/lib/Button.js"},"../../util/bdAjax.js":{"index":4,"path":"client/components/util/bdAjax.js"}};
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = cmd2amdLoadModule('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = cmd2amdLoadModule('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _uniqid = cmd2amdLoadModule('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

//children

var _reactBootstrapLibModal = cmd2amdLoadModule('react-bootstrap/lib/Modal');

var _reactBootstrapLibModal2 = _interopRequireDefault(_reactBootstrapLibModal);

var _reactBootstrapLibTable = cmd2amdLoadModule('react-bootstrap/lib/Table');

var _reactBootstrapLibTable2 = _interopRequireDefault(_reactBootstrapLibTable);

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

//custom util

var _utilBdAjaxJs = cmd2amdLoadModule('../../util/bdAjax.js');

var _utilBdAjaxJs2 = _interopRequireDefault(_utilBdAjaxJs);

var RecordForm = _react2['default'].createClass({
    displayName: 'RecordForm',

    getDefaultProps: function getDefaultProps() {
        return {
            applyType: 1, //1-单影院活动申请 2-调价申请
            applyId: null,
            versionType: 1, ////1-新流程 2-老流程  单影院活动有用
            cinemaId: "",
            cinemaName: "",
            hide: null,
            statusDesc: ''
        };
    },
    getInitialState: function getInitialState() {

        return this.getStateByProps(this.props);
    },

    getStateByProps: function getStateByProps(props) {
        var _this = this;
        var applyId = props.applyId;
        var applyType = props.applyType;
        var records = [];
        var showModal = props.showModal == undefined ? true : props.showModal;

        var api = undefined;
        switch (applyType * 1) {
            case 1:
                api = {
                    url: "/api/apply/" + applyId + "/history.json",
                    type: "GET",
                    async: false,
                    des: '获取申请记录列表',
                    data: {
                        type: _this.props.versionType
                    }
                };
                break;
            case 2:
                api = {
                    url: "/api/price/" + applyId + "/record.json",
                    type: "GET",
                    async: false,
                    des: '获取调价申请记录列表'
                };
                break;
        }
        if (applyId != undefined && applyId != null && applyId != '') {
            (0, _utilBdAjaxJs2['default'])(api).done(function (e) {
                records = e.data;
            });
        }
        return {
            showModal: showModal,
            records: records
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState(this.getStateByProps(nextProps));
    },

    open: function open() {
        this.setState({ showModal: true });
    },
    close: function close() {
        if (this.props.hide) {
            this.props.hide();
        } else {
            this.setState({ showModal: false });
        }
    },
    render: function render() {

        var _this = this;
        var applyType = _this.props.applyType;
        var trs = [];
        _this.state.records.forEach(function (record, index) {
            var operateType = undefined;
            var operateDes = undefined;
            var name = undefined;
            var operationTime = undefined;
            var desc = undefined;
            var operationStatus = {
                "1": "新建", "2": "修改", "3": "取消", "4": "驳回", "5": "开始调价",
                "6": "完成调价", '0': '未知'
            };
            var priceStatus = { "1": "待调价", "2": "被驳回", "3": "已取消", "4": "开始调价", "5": "已完成调价" };

            var checkButton = undefined;
            switch (applyType * 1) {//1-单影院活动申请 2-调价申请
                case 1:
                    operateType = record.operation.value;

                    name = record.operator.name;
                    operationTime = record.operationTime;
                    operateDes = record.operation.desc;
                    desc = record.state.desc;
                    if (operateType == 4) {
                        operateDes = "驳回原因：" + (record.reason || "");
                    }
                    if (record.applyId != undefined) {
                        //单影院活动申请 申请记录中已上线 状态可以查看
                        checkButton = _react2['default'].createElement(
                            _reactBootstrapLibButton2['default'],
                            { className: 'J_check_in_record-apply', 'data-applyid': record.applyId, 'data-applytype': record.applyType },
                            '查看'
                        );
                    }
                    break;
                case 2:
                    operateType = record.operationType || '0';

                    name = record.operator;
                    operationTime = record.created;
                    operateDes = operationStatus[operateType];
                    desc = priceStatus[record.status] || '未知';
                    if (operateType == 4) {
                        operateDes = "驳回原因：" + (record.operationContent || "");
                    }
                    break;
            }

            trs.push(_react2['default'].createElement(
                'tr',
                { key: index },
                _react2['default'].createElement(
                    'td',
                    null,
                    name
                ),
                _react2['default'].createElement(
                    'td',
                    null,
                    operationTime
                ),
                _react2['default'].createElement(
                    'td',
                    null,
                    operateDes
                ),
                _react2['default'].createElement(
                    'td',
                    null,
                    _react2['default'].createElement(
                        'span',
                        null,
                        desc
                    ),
                    '    ',
                    checkButton
                )
            ));
        });
        if (trs.length == 0) {
            trs.push(_react2['default'].createElement(
                'tr',
                { key: (0, _uniqid2['default'])() },
                _react2['default'].createElement(
                    'td',
                    { colSpan: '1000', style: { textAlign: "center" } },
                    '没有记录'
                )
            ));
        }

        return _react2['default'].createElement(
            'div',
            { className: 'modal-container' },
            _react2['default'].createElement(
                _reactBootstrapLibModal2['default'],
                { show: this.state.showModal,
                    onHide: this.close },
                _react2['default'].createElement(
                    _reactBootstrapLibModal2['default'].Header,
                    { closeButton: true },
                    _react2['default'].createElement(
                        _reactBootstrapLibModal2['default'].Title,
                        null,
                        '申请记录'
                    )
                ),
                _react2['default'].createElement(
                    _reactBootstrapLibModal2['default'].Body,
                    null,
                    _react2['default'].createElement(
                        'div',
                        { style: { marginBottom: "5px" } },
                        '申请ID：',
                        this.props.applyId,
                        '    影院ID：',
                        this.props.cinemaId,
                        '    影院名：',
                        this.props.cinemaName
                    ),
                    _react2['default'].createElement(
                        _reactBootstrapLibTable2['default'],
                        { striped: true, bordered: true, condensed: true, hover: true },
                        _react2['default'].createElement(
                            'thead',
                            null,
                            _react2['default'].createElement(
                                'tr',
                                null,
                                _react2['default'].createElement(
                                    'th',
                                    null,
                                    '操作人'
                                ),
                                _react2['default'].createElement(
                                    'th',
                                    null,
                                    '操作时间'
                                ),
                                _react2['default'].createElement(
                                    'th',
                                    null,
                                    '操作内容'
                                ),
                                _react2['default'].createElement(
                                    'th',
                                    null,
                                    '申请状态'
                                )
                            )
                        ),
                        _react2['default'].createElement(
                            'tbody',
                            null,
                            trs
                        )
                    )
                )
            )
        );
    }
});

exports['default'] = RecordForm;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});