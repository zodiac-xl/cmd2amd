'use strict';

define(["/amd/node_modules/react-simple-radio-group/index.js","/amd/node_modules/react-nest-link-state/NestLinkedStateMixin.js","/amd/node_modules/deep-equal/index.js","/amd/node_modules/react-bootstrap/lib/Button.js","/amd/node_modules/react-bootstrap/lib/Modal.js","/amd/node_modules/react-bootstrap/lib/Table.js","/amd/client/components/common/form-group.js","/amd/client/components/common/attachments.js","/amd/client/components/common/my-table.js","/amd/client/components/business/apply/types/cinema-activity/index.js","/amd/client/components/business/apply/fregments/cinemas.js","/amd/client/components/business/common-formData/common-formData.js","/amd/client/components/common/myConfirm.js","/amd/client/components/util/bdAjax.js","/amd/client/components/util/dateformat.js","/amd/client/components/business/negotiation/negotiation.js"], function (ref_2,ref_3,ref_4,ref_5,ref_6,ref_7,ref_8,ref_9,ref_10,ref_11,ref_12,ref_13,ref_14,ref_15,ref_16,ref_17) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"react-simple-radio-group":{"index":0,"path":"node_modules/react-simple-radio-group/index.js"},"react-nest-link-state":{"index":1,"path":"node_modules/react-nest-link-state/NestLinkedStateMixin.js"},"deep-equal":{"index":2,"path":"node_modules/deep-equal/index.js"},"react-bootstrap/lib/Button":{"index":3,"path":"node_modules/react-bootstrap/lib/Button.js"},"react-bootstrap/lib/Modal":{"index":4,"path":"node_modules/react-bootstrap/lib/Modal.js"},"react-bootstrap/lib/Table":{"index":5,"path":"node_modules/react-bootstrap/lib/Table.js"},"../../common/form-group":{"index":6,"path":"client/components/common/form-group.js"},"../../common/attachments":{"index":7,"path":"client/components/common/attachments.js"},"../../common/my-table":{"index":8,"path":"client/components/common/my-table.js"},"./types/cinema-activity":{"index":9,"path":"client/components/business/apply/types/cinema-activity/index.js"},"./fregments/cinemas":{"index":10,"path":"client/components/business/apply/fregments/cinemas.js"},"../common-formData/common-formData":{"index":11,"path":"client/components/business/common-formData/common-formData.js"},"../../common/myConfirm":{"index":12,"path":"client/components/common/myConfirm.js"},"../../util/bdAjax":{"index":13,"path":"client/components/util/bdAjax.js"},"../../util/dateformat.js":{"index":14,"path":"client/components/util/dateformat.js"},"../../../components/business/negotiation/negotiation":{"index":15,"path":"client/components/business/negotiation/negotiation.js"}};
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

var _reactDom = cmd2amdLoadModule('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactSimpleRadioGroup = cmd2amdLoadModule('react-simple-radio-group');

var _reactSimpleRadioGroup2 = _interopRequireDefault(_reactSimpleRadioGroup);

var _reactNestLinkState = cmd2amdLoadModule('react-nest-link-state');

var _reactNestLinkState2 = _interopRequireDefault(_reactNestLinkState);

var _deepEqual = cmd2amdLoadModule('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

//children

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _reactBootstrapLibModal = cmd2amdLoadModule('react-bootstrap/lib/Modal');

var _reactBootstrapLibModal2 = _interopRequireDefault(_reactBootstrapLibModal);

var _reactBootstrapLibTable = cmd2amdLoadModule('react-bootstrap/lib/Table');

var _reactBootstrapLibTable2 = _interopRequireDefault(_reactBootstrapLibTable);

var _commonFormGroup = cmd2amdLoadModule('../../common/form-group');

var _commonAttachments = cmd2amdLoadModule('../../common/attachments');

var _commonAttachments2 = _interopRequireDefault(_commonAttachments);

var _commonMyTable = cmd2amdLoadModule('../../common/my-table');

var _commonMyTable2 = _interopRequireDefault(_commonMyTable);

var _typesCinemaActivity = cmd2amdLoadModule('./types/cinema-activity');

var _typesCinemaActivity2 = _interopRequireDefault(_typesCinemaActivity);

var _fregmentsCinemas = cmd2amdLoadModule('./fregments/cinemas');

var _fregmentsCinemas2 = _interopRequireDefault(_fregmentsCinemas);

var _commonFormDataCommonFormData = cmd2amdLoadModule('../common-formData/common-formData');

var _commonFormDataCommonFormData2 = _interopRequireDefault(_commonFormDataCommonFormData);

var _commonMyConfirm = cmd2amdLoadModule('../../common/myConfirm');

var _commonMyConfirm2 = _interopRequireDefault(_commonMyConfirm);

//custom util

var _utilBdAjax = cmd2amdLoadModule('../../util/bdAjax');

var _utilBdAjax2 = _interopRequireDefault(_utilBdAjax);

cmd2amdLoadModule('../../util/dateformat.js');

var _componentsBusinessNegotiationNegotiation = cmd2amdLoadModule('../../../components/business/negotiation/negotiation');

var _componentsBusinessNegotiationNegotiation2 = _interopRequireDefault(_componentsBusinessNegotiationNegotiation);

var update = _react.addons.update;

var Apply = (function (_Component) {
    _inherits(Apply, _Component);

    function Apply() {
        _classCallCheck(this, Apply);

        _get(Object.getPrototypeOf(Apply.prototype), 'constructor', this).apply(this, arguments);

        this.state = this.getState();
        this.nestLinkedState = _reactNestLinkState2['default'].nestLinkedState;
    }

    _createClass(Apply, [{
        key: 'getState',
        value: function getState() {

            var modalTitle = undefined;
            var remarkLabel = undefined;
            switch (this.props.operateType) {
                case "new":
                    modalTitle = "新建申请";
                    remarkLabel = "BD申请备注：";
                    break;
                case "edit":
                    modalTitle = "修改申请";
                    remarkLabel = "BD申请备注：";
                    break;
                case "audit-bd1st":
                    modalTitle = "审核申请";
                    remarkLabel = "BD一审备注：";
                    break;
                case "audit-bd2nt":
                    modalTitle = "审核申请";
                    remarkLabel = "BD二审备注：";
                    break;
                case "audit-opt":
                    modalTitle = "审核申请";
                    remarkLabel = "opt审核备注：";
                    break;
                case "offline":
                    modalTitle = "查看申请";
                    remarkLabel = "下线备注：";
                    break;
                case "online":
                    modalTitle = "查看申请";
                    remarkLabel = "上线备注：";
                    break;
                case "check":
                    modalTitle = "查看申请";
                    break;
            }

            var custom = undefined;
            if (this.props.applyType == 1) {
                var cinemas = [];
                if (this.props.cinemaId && this.props.cinemaName) {
                    cinemas = [{
                        id: this.props.cinemaId,
                        name: this.props.cinemaName
                    }];
                }
                custom = {
                    //单影院活动申请特有字段 *表示必填
                    "cinemas": cinemas,
                    "startTime": "", //活动开始时间*
                    "endTime": "", //活动结束时间*
                    "cost": 0, //成本，浮点数，单位"元"* number  0为不限制
                    "info": {
                        "form": "票补", //*包括“票补”、“第三方补贴”、“服务费减免”，默认为“票补”。
                        "showTime": [{
                            "startDate": "", //*2015-10-01
                            "endDate": "", //*2015-11-01
                            "startTime": "00:00:00", //*08:00:00
                            "endTime": "23:59:59" //*10:00:00
                        }],
                        "movies": { // 影片信息，全部影片则data为空json数组{"inverse":false, "data":[]}    ***new
                            "inverse": false, //是否反选
                            "data": [//影片列表
                            ]
                        },
                        "totalLimit": 0, //总量限制* number  不限为0
                        "userLimit": 2, //每人限量* number 不限为0 默认为“限制 2 张“
                        "dailyLimit": { //每天限量*  不限为{}           ***edit
                            dateArr: [], //辅助字段
                            "startTime": "11:00:00",
                            "cost": [//每天成本限制，不限为[]
                            ],
                            "num": [//每天张数限制，不限为[]
                            ],
                            "user": 2 //每人每天限量，不限为0
                        },
                        "settleLimit": false, //结算价限量                                            ***new
                        "subsidyRules": [{ //*补贴规则
                            "version": 0, //版本，7位二进制数字由低位到高位分别表示2D,2DIMAX,3D,3DIMAX,4D,2D巨幕,3D巨幕，例如1111110=126表示除2D外所有版本。全部用0表示
                            "rules": [{
                                "maxSettle": '',
                                "minSettle": '',
                                "type": 1, //1-每张补贴，2-一口价，3-服务费
                                "price": '',
                                "competitors": 0, //竞对，"type"为4-动态售价时生效，其余传0。二进制表示，第n位分别代表：1-"豆瓣",2-"时光网",5-"格瓦拉",7-"QQ",8-"点评",9-"微信",10-"糯米", 11-"淘宝"。例如11100010000=1808表示"淘宝","糯米","微信","格瓦拉"。
                                "maxSubsidy": 0, //最多补贴，"type"为4-动态售价时生效，其余传0
                                "minSubsidy": 0 //最少补贴，"type"为4-动态售价时生效，其余传0
                            }],
                            "additional": ""
                        }],
                        "saleDate": { //*结算价降价日期  rule:2015-01-01
                            "start": "",
                            "end": ""
                        }
                    }

                };
            }

            return {

                isLoading: false,
                showModal: true,

                //结算价是否已经调整
                priceAdjusted: 0,

                //影院基本信息
                cinemasDetail: [],

                //影院价格信息
                cinemasPriceDetail: [],

                //必选字段
                type: this.props.applyType, //申请类型
                applyId: null, //新建时为空
                content: "", //
                common: {
                    //公共字段，所有申请类型都要填写
                    "formData": null, //自定义表单
                    "files": [//文件详情列表，没有文件则为空json数组[]
                    ],
                    "remark": []

                },
                custom: custom,

                //中间 工具字段
                lastReject: null,
                mustChooseOptionsMap: {},
                otherRemark: [],
                myRemark: {
                    content: ""
                },
                remarkLabel: remarkLabel,
                rejectBtnText: "驳回",
                modalTitle: modalTitle
            };
        }
    }, {
        key: 'forMatInfo',
        value: function forMatInfo(info) {

            //"dailyLimit": [ //不限为[]
            //    {
            //        "date": "2015-01-01",
            //        "startTime": "11:00:00",
            //        "cost": 20000.0, //每天成本限制，不限为0
            //        "num": 100 //每天张数限制,不限为0
            //    }
            //],
            //    "userDailyLimit": 2 //每人每天限量，不限为0
            //"settleLimit": true, //结算价限量

            //"dailyLimit": { //每天限量*  不限为{}           ***edit
            //    "startTime": "11:00:00",
            //        "cost": [ limit: "2", date: "2016-01-25
            //    ],
            //        "num": [ //每天张数限制，不限为[limit:0]
            //    ],
            //        "user": 2 //每人每天限量，不限为0
            //},
            var dailyLimit = info.dailyLimit;
            var dateArr = [];
            info.dailyLimit = {};
            if (dailyLimit.length > 0) {
                info.dailyLimit = {
                    startTime: dailyLimit[0].startTime,
                    cost: [],
                    num: [],
                    user: info.userDailyLimit
                };
                dailyLimit.forEach(function (item) {
                    if (item.cost > 0) {
                        //只要一个大于0 就表明需要限制 所有都大于0
                        info.dailyLimit.cost.push({
                            limit: item.cost,
                            date: item.date
                        });
                    }

                    if (item.num > 0) {
                        //只要一个大于0 就表明需要限制 所有都大于0
                        info.dailyLimit.num.push({
                            limit: item.num,
                            date: item.date
                        });
                    }

                    dateArr.push(item.date);
                });
            }
            info.dailyLimit.dateArr = dateArr;
            return info;
        }
    }, {
        key: 'unFormatInfo',
        value: function unFormatInfo(info) {
            var dailyLimit = info.dailyLimit;
            info.dailyLimit = [];
            dailyLimit.dateArr.forEach(function (item, i) {
                info.dailyLimit.push({
                    date: item,
                    startTime: dailyLimit.startTime,
                    cost: dailyLimit.cost[i] && dailyLimit.cost[i].limit || 0,
                    num: dailyLimit.num[i] && dailyLimit.num[i].limit || 0
                });
            });
            info.userDailyLimit = dailyLimit.user || 0;
            delete dailyLimit.dateArr;
            return info;
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            var _this = this;
            var operateType = _this.props.operateType;
            //获取申请数据回填
            if (operateType != "new") {
                (function () {
                    var newState = _this2.state;
                    var applyId = _this2.props.applyId;

                    (0, _utilBdAjax2['default'])({
                        url: "/api/apply/" + applyId + ".json",
                        data: {
                            type: _this2.props.versionType
                        },
                        async: false,
                        des: _this2.props.operateType + "申请"
                    }).done(function (e) {
                        var data = e.data;
                        var common = {
                            formData: data.formData,
                            files: data.files,
                            remark: data.remark
                        };

                        var custom = {
                            cinemas: data.cinemas,
                            startTime: data.startTime,
                            endTime: data.endTime,
                            cost: data.cost,
                            info: _this.forMatInfo(data.info)
                        };
                        newState.priceApplies = data.priceApplies || [];

                        newState.lastReject = data.lastReject || null;

                        newState.modified = data.modified || null;

                        newState.common = common;
                        newState.custom = custom;
                    });

                    newState.applyId = _this2.props.applyId;
                    newState.otherRemark = newState.common.remark;
                    _this2.setState(newState);
                })();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var operateType = this.props.operateType;
            if (operateType == 'online' || operateType == 'check') {
                this.getCinemaDetail();
                this.getCinemaPriceDetail();
            }
        }
    }, {
        key: 'getCinemaDetail',
        value: function getCinemaDetail() {
            var _this = this;
            var cinemas = _this.state.custom.cinemas;
            var cinemaIds = [];
            cinemas.forEach(function (item) {
                cinemaIds.push(item.id);
            });
            cinemaIds = cinemaIds.join(',');
            (0, _utilBdAjax2['default'])({
                url: "/api/cinema/cinemas.json?cinemaIds=" + cinemaIds,
                des: '获取影院基本信息'
            }).done(function (e) {
                if (e.data) {
                    _this.setState({
                        cinemasDetail: e.data
                    });
                }
            });
        }
    }, {
        key: 'getCinemaPriceDetail',
        value: function getCinemaPriceDetail() {
            var _this = this;
            var cinemas = _this.state.custom.cinemas;
            var cinemaIds = [];
            cinemas.forEach(function (item) {
                cinemaIds.push(item.id);
            });
            (0, _utilBdAjax2['default'])({
                url: "/api/cinema/price.json",
                data: {
                    cinemaIds: JSON.stringify(cinemaIds)
                },
                bd: true,
                des: '获取影院价格信息'
            }).done(function (e) {
                if (e.data) {
                    _this.setState({
                        cinemasPriceDetail: e.data
                    });
                }
            });
        }
    }, {
        key: 'getTableData',
        value: function getTableData() {
            var _this = this;
            var cinemasDetail = _this.state.cinemasDetail;
            var cinemasPriceDetail = _this.state.cinemasPriceDetail;
            var priceApplies = _this.state.priceApplies;

            //影院和关联的调价申请表
            var tableData = {
                ths: ['影院ID', '影院名称', '城市', '售票系统', '备注', '调价申请ID', '调价状态', '操作'],
                trs: []
            };

            var isSettleByCinemaMap = {};
            cinemasPriceDetail.forEach(function (item) {
                isSettleByCinemaMap[item.cinemaId] = item.isSettleByCinema;
            });
            $.each(cinemasDetail, function (index, item) {
                var applys = [];
                if (priceApplies && priceApplies.length > 0) {
                    priceApplies.forEach(function (apply) {
                        if (apply.cinemaId == item.id) {
                            applys.push({
                                applyId: apply.id,
                                applyStatus: function applyStatus($td) {
                                    return _react2['default'].createElement(
                                        'a',
                                        { href: '/bd/apply/adjust_price?cinemaId=' + apply.cinemaId,
                                            target: '_blank' },
                                        apply.statusDesc
                                    );
                                }
                            });
                        }
                    });
                }

                if (applys.length == 0) {
                    applys = [{
                        applyId: '',
                        applyStatus: ''
                    }];
                }
                tableData.trs.push({
                    cinemaId: item.id,
                    cinemaName: item.cinemaName,
                    cityName: item.cityName,
                    sellSrcDesc: item.sellSrcDesc || '',
                    remark: isSettleByCinemaMap[item.id] ? '需联系影院完成调价' : '',
                    apply: applys,
                    operate: function operate($td) {

                        var href = "/bd/cinema_detail?";
                        href = href + escape("cinemaId=" + item.id + "&cinemaName=" + item.cinemaName + "&city=" + item.cityName + "&sellSrcDesc=" + (item.sellSrcDesc || ''));

                        var checkBtn = _react2['default'].createElement(
                            _reactBootstrapLibButton2['default'],
                            { onClick: function () {
                                    window.open(href);
                                } },
                            '查看结算价'
                        );
                        var newApplyBtn = _react2['default'].createElement(
                            _reactBootstrapLibButton2['default'],
                            {
                                onClick: _this.negotiation.bind(_this, item, 'new') },
                            '新建调价申请'
                        );

                        if (_this.state.priceAdjusted == 1 || _this.props.operateType == 'check') {
                            newApplyBtn = '';
                        }
                        return _react2['default'].createElement(
                            'div',
                            null,
                            checkBtn,
                            newApplyBtn
                        );
                    }
                });
            });
            return tableData;
        }
    }, {
        key: 'negotiation',
        value: function negotiation(data, operateType) {
            var _this = this;
            var container = _reactDom2['default'].findDOMNode(this.refs['container-negotiation']);
            var props = {
                type: 2, //1-活动调价 2-常规
                operateType: operateType,
                cinemaId: data.id,
                cinemaName: data.cinemaName,
                scaaId: this.props.applyId,
                freshParent: function freshParent(e) {
                    var newState = _this.state;
                    newState.priceApplies.push({
                        "cinemaId": data.id,
                        "id": e.data.id,
                        "statusDesc": '待调价'
                    });
                    _this.setState(newState);
                }
            };

            _reactDom2['default'].unmountComponentAtNode(container);
            var component = _reactDom2['default'].render(_react2['default'].createElement(_componentsBusinessNegotiationNegotiation2['default'], props), container);
        }
    }, {
        key: 'open',
        value: function open() {
            this.setState({ showModal: true });
        }
    }, {
        key: 'close',
        value: function close() {
            this.setState({ showModal: false });
        }
    }, {
        key: 'validate',
        value: function validate() {
            if (!this.refs.cinemas.validate()) {
                return false;
            }
            if (!this.refs.cinemaActivityFrom.validate()) {
                return false;
            }
            if (!this.refs.commonForm.validate()) {
                return false;
            }
            return true;
        }
    }, {
        key: 'operateApply',
        value: function operateApply(operateType) {
            var _this = this;
            var remarkType = undefined;
            var applyId = _this.state.applyId;
            var applyType = _this.props.applyType;

            var freshTable = window.freshTable || function () {}; //局部更新table

            _this.setState({
                isLoading: true
            });
            if (operateType == "new" || operateType == "edit") {
                var _ret2 = (function () {

                    if (!_this.validate()) {
                        _this.setState({
                            isLoading: false
                        });
                        return {
                            v: false
                        };
                    }

                    remarkType = 3; //备注类型：1-BD一审,2-BD二审,3-BD申请

                    var content = {};

                    //merge basic info
                    $.extend(content, {
                        applyId: applyId
                    });

                    var common = $.extend(true, {}, _this.state.common);

                    //merge remark
                    var remark = _this.state.otherRemark;
                    if (_this.state.myRemark.content) {
                        var myRemark = {
                            content: _this.state.myRemark.content,
                            user: window.User.misId,
                            type: remarkType,
                            time: new Date().Format("yyyy-MM-dd hh:mm:ss")
                        };
                        remark = update(remark, { $push: [myRemark] });
                    }
                    common.remark = remark;

                    //fill fileIds
                    common.fileIds = [];
                    common.files && common.files.forEach(function (item) {
                        common.fileIds.push(item.id);
                    });

                    //merge content
                    $.extend(content, common);
                    var customData = $.extend(true, {}, _this.state.custom);

                    if (customData.info) {
                        customData.info = _this.unFormatInfo(customData.info);
                    }
                    $.extend(content, customData);
                    content.startTime = '' + content.startTime; //活动开始时间 手动加上00:00:00 for java默认为00:00:00
                    content.endTime = new Date(content.endTime).Format('yyyy-MM-dd') + ' 23:59:59'; //活动结束时间 手动加上 23:59:59  for java默认为00:00:00

                    if (operateType == "new") {
                        //新建或修改后自动提交审核
                        (0, _utilBdAjax2['default'])({
                            url: "/api/apply/applies.json",
                            type: "POST",
                            dataType: "json",
                            data: {
                                type: applyType,
                                content: JSON.stringify(content)
                            },
                            des: operateType + "申请"
                        }).done(function (e) {
                            var applyId = e.data.id;
                            (0, _utilBdAjax2['default'])({
                                url: "/api/apply/" + applyId + ".json",
                                type: "POST",
                                dataType: "json",
                                data: {
                                    type: applyType
                                },
                                showSuccess: true,
                                des: "提交审核" + "申请"
                            }).done(function (e) {
                                freshTable();
                                _this.close();
                            }).always(function () {
                                _this.setState({
                                    isLoading: false
                                });
                            });
                        }).fail(function () {
                            _this.setState({
                                isLoading: false
                            });
                        });
                    } else {
                        (0, _utilBdAjax2['default'])({
                            url: "/api/apply/" + applyId + ".json",
                            type: "PUT",
                            dataType: "json",
                            showSuccess: true,
                            data: {
                                type: applyType,
                                content: JSON.stringify(content)
                            },
                            des: operateType + "申请"
                        }).done(function (e) {
                            var applyId = e.data.id;
                            (0, _utilBdAjax2['default'])({
                                url: "/api/apply/" + applyId + ".json",
                                type: "POST",
                                dataType: "json",
                                data: {
                                    type: applyType
                                },
                                des: "提交审核" + "申请"
                            }).done(function (e) {
                                _this.close();
                                freshTable();
                            }).always(function () {
                                _this.setState({
                                    isLoading: false
                                });
                            });
                        }).fail(function () {
                            _this.setState({
                                isLoading: false
                            });
                        });
                    }
                })();

                if (typeof _ret2 === 'object') return _ret2.v;
            } else if (operateType == "reject" || operateType == "approve") {
                var approved = operateType == "approve";
                var reason = _this.state.myRemark.content;

                //merge remark
                if (_this.props.operateType == "audit-bd2nt") {
                    remarkType = 2;
                } else if (_this.props.operateType == "audit-bd1st") {
                    remarkType = 1;
                }
                //备注类型：1-BD一审,2-BD二审,3-BD申请

                var remark = _this.state.otherRemark;
                if (_this.state.myRemark.content) {
                    var myRemark = {
                        content: _this.state.myRemark.content,
                        user: window.User.misId,
                        type: remarkType,
                        time: new Date().Format("yyyy-MM-dd hh:mm:ss")

                    };
                    remark = update(remark, { $push: [myRemark] });
                }

                if (operateType == "reject") {

                    if (_this.state.rejectBtnText == "驳回") {
                        var remarkLabel = _this.state.remarkLabel;
                        remarkLabel = remarkLabel.replace("备注", "驳回原因");
                        _this.setState({
                            rejectBtnText: "确认驳回",
                            remarkLabel: remarkLabel,
                            modalTitle: "驳回申请",
                            isLoading: false
                        });

                        return;
                    }

                    if (!reason) {
                        toastr.warning("请输入驳回原因");
                        _this.setState({
                            isLoading: false
                        });
                        return;
                    }
                }

                if (operateType == "approve") {
                    if (!confirm("确认审核通过吗？")) {
                        _this.setState({
                            isLoading: false
                        });
                        return;
                    }
                }

                (0, _utilBdAjax2['default'])({
                    url: "/api/apply/" + applyId + "/audit.json",
                    type: "POST",
                    dataType: "json",
                    data: {
                        applyId: applyId,
                        type: applyType,
                        approved: approved,
                        reason: reason,
                        remark: JSON.stringify(remark),
                        modified: _this.state.modified
                    },
                    des: operateType + "申请"
                }).done(function (e) {
                    toastr.success(e.message);
                    _this.close();
                    freshTable();
                }).always(function () {
                    _this.setState({
                        isLoading: false
                    });
                });
            } else if (operateType == "offline" || operateType == "online") {
                var operation = operateType == "online" ? 5 : 6;
                var url = undefined;
                if (operateType == "online") {
                    url = '/api/apply/special/scaa/' + applyId + '/online.json';
                    if (_this.state.priceAdjusted == 0) {
                        toastr.warning('无法操作上线，原因：结算价尚未完成调整。');
                        _this.setState({
                            isLoading: false
                        });
                        return;
                    }
                } else {
                    _this.setState({
                        isLoading: false
                    });
                    return;
                }
                var api = {
                    url: url,
                    type: "POST",
                    dataType: "json",
                    des: operateType + "申请",
                    showSuccess: true
                };
                (0, _commonMyConfirm2['default'])(_react2['default'].createElement(
                    'span',
                    null,
                    _react2['default'].createElement(
                        'h4',
                        null,
                        '确认已完成相关调价，立即发布活动吗？'
                    ),
                    '点击“确定”，活动方案立即发布，活动生效时间以活动方案设置生效时间为准。'
                ), '确认上线', api).done(function () {
                    _this.close();
                    freshTable();
                }).fail(function () {
                    _this.setState({
                        isLoading: false
                    });
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _this = this;
            var modalContentClassName = "";
            var readOnly = false;
            var operateType = _this.props.operateType;

            if (operateType != "edit" && operateType != "new") {
                readOnly = true;
            }

            //UI字段生成
            var modalFooter = undefined;
            var isLoading = _this.state.isLoading;
            switch (operateType) {
                case "new":
                    modalFooter = _react2['default'].createElement(
                        _reactBootstrapLibModal2['default'].Footer,
                        null,
                        _react2['default'].createElement(
                            _reactBootstrapLibButton2['default'],
                            { disabled: isLoading,
                                onClick: !isLoading ? this.operateApply.bind(this, "new") : null },
                            isLoading ? '确认申请中...' : '确认申请'
                        )
                    );
                    break;
                case "edit":
                    modalFooter = _react2['default'].createElement(
                        _reactBootstrapLibModal2['default'].Footer,
                        null,
                        _react2['default'].createElement(
                            _reactBootstrapLibButton2['default'],
                            { disabled: isLoading,
                                onClick: !isLoading ? this.operateApply.bind(this, "edit") : null },
                            isLoading ? '确认申请中...' : '确认申请'
                        )
                    );
                    break;
                case "audit-bd1st":
                case "audit-bd2nt":
                case "audit-opt":
                    if (this.state.rejectBtnText == "驳回") {
                        modalFooter = _react2['default'].createElement(
                            _reactBootstrapLibModal2['default'].Footer,
                            null,
                            _react2['default'].createElement(
                                _reactBootstrapLibButton2['default'],
                                { disabled: isLoading,
                                    onClick: !isLoading ? this.operateApply.bind(this, "approve") : null, refs: 'approveBtn' },
                                isLoading ? '审核通过中...' : '审核通过'
                            ),
                            _react2['default'].createElement(
                                _reactBootstrapLibButton2['default'],
                                { disabled: isLoading,
                                    onClick: !isLoading ? this.operateApply.bind(this, "reject") : null },
                                isLoading ? this.state.rejectBtnText + '中...' : this.state.rejectBtnText
                            )
                        );
                    } else {
                        modalFooter = _react2['default'].createElement(
                            _reactBootstrapLibModal2['default'].Footer,
                            null,
                            _react2['default'].createElement(
                                _reactBootstrapLibButton2['default'],
                                { disabled: isLoading,
                                    onClick: !isLoading ? this.operateApply.bind(this, "reject") : null },
                                isLoading ? this.state.rejectBtnText + '中...' : this.state.rejectBtnText
                            )
                        );
                    }

                    break;
                case "offline":
                    modalFooter = _react2['default'].createElement(
                        _reactBootstrapLibModal2['default'].Footer,
                        null,
                        _react2['default'].createElement(
                            _reactBootstrapLibButton2['default'],
                            { disabled: isLoading,
                                onClick: !isLoading ? this.operateApply.bind(this, "offline") : null },
                            isLoading ? '下线中...' : '下线'
                        )
                    );
                    break;
                case "online":
                    modalFooter = _react2['default'].createElement(
                        _reactBootstrapLibModal2['default'].Footer,
                        null,
                        _react2['default'].createElement(
                            _reactBootstrapLibButton2['default'],
                            { disabled: isLoading,
                                onClick: !isLoading ? this.operateApply.bind(this, "online") : null },
                            isLoading ? '上线中...' : '上线'
                        )
                    );
                    break;
                case "check":
                    if (_this.props.checkAndEdit) {
                        modalFooter = _react2['default'].createElement(
                            _reactBootstrapLibModal2['default'].Footer,
                            null,
                            _react2['default'].createElement(
                                _reactBootstrapLibButton2['default'],
                                { className: 'J_checkAndEdit' },
                                '修改'
                            )
                        );
                    } else {
                        modalFooter = "";
                    }
                    break;
            }

            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    _reactBootstrapLibModal2['default'],
                    { show: this.state.showModal, onHide: this.close.bind(_this) },
                    _react2['default'].createElement(
                        _reactBootstrapLibModal2['default'].Header,
                        { closeButton: true },
                        _react2['default'].createElement(
                            _reactBootstrapLibModal2['default'].Title,
                            null,
                            this.state.modalTitle
                        )
                    ),
                    _react2['default'].createElement(
                        _reactBootstrapLibModal2['default'].Body,
                        null,
                        _react2['default'].createElement(
                            'div',
                            { className: modalContentClassName, ref: 'modalContent' },
                            _react2['default'].createElement(
                                _commonFormGroup.Group,
                                null,
                                _react2['default'].createElement(
                                    _commonFormGroup.Left,
                                    null,
                                    '申请类型'
                                ),
                                '：',
                                _react2['default'].createElement(
                                    _commonFormGroup.Right,
                                    null,
                                    _react2['default'].createElement(
                                        'select',
                                        null,
                                        _react2['default'].createElement(
                                            'option',
                                            null,
                                            '影院活动'
                                        )
                                    )
                                )
                            ),
                            _react2['default'].createElement(_fregmentsCinemas2['default'], { readOnly: readOnly, ref: 'cinemas',
                                valueLink: _this.nestLinkedState(["custom", "cinemas"], _this) }),
                            (function () {
                                var Form = undefined;
                                switch (_this.props.applyType * 1) {
                                    case 1:
                                        Form = _react2['default'].createElement(_typesCinemaActivity2['default'], { readOnly: readOnly, ref: 'cinemaActivityFrom',
                                            valueLink: _this.nestLinkedState(["custom"], _this) });
                                        break;
                                }
                                return Form;
                            })(),
                            (function () {
                                if (_this3.state.lastReject) {
                                    return _react2['default'].createElement(
                                        _commonFormGroup.Group,
                                        { className: 'text-danger' },
                                        _react2['default'].createElement(
                                            _commonFormGroup.Left,
                                            null,
                                            '上次',
                                            _this3.state.lastReject.node,
                                            '驳回原因'
                                        ),
                                        '：',
                                        _react2['default'].createElement(
                                            _commonFormGroup.Right,
                                            null,
                                            _this3.state.lastReject.reason
                                        )
                                    );
                                }
                            })(),
                            _react2['default'].createElement(_commonFormGroup.Hr, null),
                            _react2['default'].createElement(_commonFormDataCommonFormData2['default'], { readOnly: readOnly, ref: 'commonForm', applyType: this.props.applyType,
                                valueLink: this.nestLinkedState(["common", "formData"], _this) }),
                            _react2['default'].createElement(_commonFormGroup.Hr, null),
                            (function () {

                                if (_this3.state.otherRemark.length > 0) {
                                    var _ret3 = (function () {
                                        var trs = [];
                                        _this.state.otherRemark.forEach(function (remark, index) {
                                            var typeDes = undefined;
                                            switch (remark.type * 1) {
                                                case 1:
                                                    typeDes = "BD一审备注";
                                                    break;
                                                case 2:
                                                    typeDes = "BD二审备注";
                                                    break;
                                                case 3:
                                                    typeDes = "BD申请备注";
                                                    break;
                                                default:
                                                    typeDes = "未知类型";
                                                    break;
                                            }
                                            var tr = _react2['default'].createElement(
                                                'tr',
                                                { key: index },
                                                _react2['default'].createElement(
                                                    'td',
                                                    null,
                                                    typeDes
                                                ),
                                                _react2['default'].createElement(
                                                    'td',
                                                    null,
                                                    remark.content
                                                )
                                            );

                                            trs = update(trs, { $push: [tr] });
                                        });

                                        return {
                                            v: _react2['default'].createElement(
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
                                                            '备注类型'
                                                        ),
                                                        _react2['default'].createElement(
                                                            'th',
                                                            null,
                                                            '备注内容'
                                                        )
                                                    )
                                                ),
                                                _react2['default'].createElement(
                                                    'tbody',
                                                    null,
                                                    trs
                                                )
                                            )
                                        };
                                    })();

                                    if (typeof _ret3 === 'object') return _ret3.v;
                                }
                            })(),
                            _react2['default'].createElement(_commonAttachments2['default'], { readOnly: readOnly,
                                valueLink: this.nestLinkedState(["common", "files"], _this) }),
                            _react2['default'].createElement(_commonFormGroup.Hr, null),
                            (function () {
                                var style = {
                                    pointerEvents: "initial !important",
                                    width: "250px",
                                    height: "80px"
                                };
                                var placeholder = "可选";

                                if (_this3.state.rejectBtnText != "驳回") {
                                    //rejectBtnText==确认驳回 时需要填写理由
                                    placeholder = "驳回需要填写理由";
                                }

                                //opt审核 上线 下线 查看 无备注 （opt驳回有驳回原因 用备注做）
                                if (_this3.state.rejectBtnText != "驳回" || operateType != "check" && operateType != "online" && operateType != "offline" && operateType != "audit-opt") {
                                    return _react2['default'].createElement(
                                        _commonFormGroup.Group,
                                        null,
                                        _react2['default'].createElement(
                                            _commonFormGroup.Left,
                                            null,
                                            _this3.state.remarkLabel
                                        ),
                                        _react2['default'].createElement(
                                            _commonFormGroup.Right,
                                            null,
                                            _react2['default'].createElement('textarea', { placeholder: placeholder, style: style,
                                                valueLink: _this3.nestLinkedState(["myRemark", "content"], _this) })
                                        )
                                    );
                                }
                            })(),
                            (function () {
                                if (operateType == 'online' || operateType == 'check') {

                                    var tableData = _this.getTableData();

                                    return _react2['default'].createElement(
                                        'div',
                                        null,
                                        _react2['default'].createElement(
                                            'div',
                                            { style: { padding: '10px 20px 20px' },
                                                className: operateType == 'check' ? 'hide' : '' },
                                            _react2['default'].createElement(
                                                'h4',
                                                null,
                                                '结算价调整：'
                                            ),
                                            _react2['default'].createElement(
                                                'p',
                                                null,
                                                '*若方案涉及结算价调整，请确认',
                                                _react2['default'].createElement(
                                                    'span',
                                                    { className: 'text-danger' },
                                                    '结算价已完成调整'
                                                ),
                                                '再操作上线。否则会影响活动策略效果。'
                                            ),
                                            _react2['default'].createElement(
                                                _reactSimpleRadioGroup2['default'],
                                                { name: 'price-adjusted', value: _this.state.priceAdjusted,
                                                    onChange: function (newValue) {
                                                        _this.setState({
                                                            priceAdjusted: newValue
                                                        });
                                                    } },
                                                _react2['default'].createElement('input', { type: 'radio', value: '0' }),
                                                '结算价尚未调整，立即申请调价',
                                                _react2['default'].createElement(
                                                    'div',
                                                    null,
                                                    '*请在下方列表中直接发起调价申请'
                                                ),
                                                _react2['default'].createElement('br', null),
                                                _react2['default'].createElement('input', { type: 'radio', value: '1' }),
                                                '结算价已完成调整，或无需调整',
                                                _react2['default'].createElement(
                                                    'div',
                                                    null,
                                                    '*请检查下方关联调价申请已完成调价，且“需联系影院完成调价”的影院已联系商家完成调价'
                                                )
                                            )
                                        ),
                                        _react2['default'].createElement(_commonFormGroup.Hr, null),
                                        _react2['default'].createElement(_commonMyTable2['default'], { data: tableData })
                                    );
                                }
                            })()
                        ),
                        modalFooter
                    )
                ),
                _react2['default'].createElement('div', { ref: 'container-negotiation' })
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            applyId: null,
            applyType: 1,
            versionType: 1, //1-新流程 2-老流程
            operateType: "new",
            checkAndEdit: false, //查看时是否显示修改按钮
            cinemaId: "",
            cinemaName: ""
        },
        enumerable: true
    }]);

    return Apply;
})(_react.Component);

exports['default'] = Apply;
;
module.exports = exports['default'];
/*补充 备注 附件等*/;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});