'use strict';

define(["/amd/node_modules/react-nest-link-state/NestLinkedStateMixin.js","/amd/node_modules/react-bootstrap/lib/Modal.js","/amd/node_modules/react-bootstrap/lib/Button.js","/amd/client/components/common/form-group.js","/amd/client/components/common/attachments.js","/amd/client/components/util/bdAjax.js","/amd/client/components/business/negotiation/task-info.js","/amd/client/components/business/negotiation/price-plans/index.js","/amd/client/components/business/common-formData/common-formData.js","/amd/client/components/business/negotiation/cancel-priceApply.js"], function (ref_2,ref_3,ref_4,ref_5,ref_6,ref_7,ref_8,ref_9,ref_10,ref_11) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"react-nest-link-state":{"index":0,"path":"node_modules/react-nest-link-state/NestLinkedStateMixin.js"},"react-bootstrap/lib/Modal":{"index":1,"path":"node_modules/react-bootstrap/lib/Modal.js"},"react-bootstrap/lib/Button":{"index":2,"path":"node_modules/react-bootstrap/lib/Button.js"},"../../common/form-group":{"index":3,"path":"client/components/common/form-group.js"},"../../common/attachments":{"index":4,"path":"client/components/common/attachments.js"},"../../util/bdAjax":{"index":5,"path":"client/components/util/bdAjax.js"},"./task-info":{"index":6,"path":"client/components/business/negotiation/task-info.js"},"./price-plans":{"index":7,"path":"client/components/business/negotiation/price-plans/index.js"},"../common-formData/common-formData":{"index":8,"path":"client/components/business/common-formData/common-formData.js"},"./cancel-priceApply":{"index":9,"path":"client/components/business/negotiation/cancel-priceApply.js"}};
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

var _reactNestLinkState = cmd2amdLoadModule('react-nest-link-state');

var _reactNestLinkState2 = _interopRequireDefault(_reactNestLinkState);

var _reactBootstrapLibModal = cmd2amdLoadModule('react-bootstrap/lib/Modal');

var _reactBootstrapLibModal2 = _interopRequireDefault(_reactBootstrapLibModal);

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _commonFormGroup = cmd2amdLoadModule('../../common/form-group');

var _commonAttachments = cmd2amdLoadModule('../../common/attachments');

var _commonAttachments2 = _interopRequireDefault(_commonAttachments);

var _utilBdAjax = cmd2amdLoadModule('../../util/bdAjax');

var _utilBdAjax2 = _interopRequireDefault(_utilBdAjax);

//fragments

var _taskInfo = cmd2amdLoadModule('./task-info');

var _taskInfo2 = _interopRequireDefault(_taskInfo);

var _pricePlans = cmd2amdLoadModule('./price-plans');

var _pricePlans2 = _interopRequireDefault(_pricePlans);

var _commonFormDataCommonFormData = cmd2amdLoadModule('../common-formData/common-formData');

var _commonFormDataCommonFormData2 = _interopRequireDefault(_commonFormDataCommonFormData);

var _cancelPriceApply = cmd2amdLoadModule('./cancel-priceApply');

var _cancelPriceApply2 = _interopRequireDefault(_cancelPriceApply);

var Negotiation = (function (_React$Component) {
    _inherits(Negotiation, _React$Component);

    function Negotiation() {
        _classCallCheck(this, Negotiation);

        _get(Object.getPrototypeOf(Negotiation.prototype), 'constructor', this).apply(this, arguments);

        this.nestLinkedState = _reactNestLinkState2['default'].nestLinkedState;
        this.state = {
            //ui
            isLoading: false,
            show: true,
            committed: this.props.committed, //已经提交过的并在生效中的申请 需要验证

            //data
            auditInfo: null, //反馈结果
            feedbackContent: null, //自定义表单
            pricePlans: null,
            files: [], //附件
            note: '' //备注
        };
    }

    _createClass(Negotiation, [{
        key: 'hide',
        value: function hide() {
            this.setState({
                show: false
            });
        }
    }, {
        key: 'formatPriceInfos',
        value: function formatPriceInfos(priceInfos) {
            var newPriceInfos = [];
            priceInfos.forEach(function (priceInfo, index) {
                var showTypes = [];
                var newPurchasePrice = [];
                if (!priceInfo.specialHall) {
                    //普通厅
                    showTypes = [1, 3]; //0-全部 1-2D，2-IMAX2D，3-3D，4-IMAX3D，5-4D，6-巨幕2D，7-巨幕3D
                } else {
                        switch (priceInfo.halls[0].type * 1) {// "type": 1    //影厅类型，1-普通厅，2-IMAX厅，3-DMAX厅，4-4D厅
                            case 1:
                                showTypes = [1, 3];
                                break;
                            case 2:
                                showTypes = [1, 2, 3, 4];
                                break;
                            case 3:
                                showTypes = [1, 3, 6, 7];
                                break;
                            case 4:
                                showTypes = [1, 3, 5];
                                break;
                        }
                    }
                var defaultType = 1;
                if (index != 0) {
                    defaultType = 1; //最低限价
                }

                showTypes.forEach(function (showType) {
                    var targetPrice = (function (showType, priceInfo) {
                        var targetPrice = {};
                        priceInfo.purchasePrice.some(function (price) {
                            if (price.showType == showType) {
                                targetPrice = price;
                                return true;
                            }
                        });
                        return targetPrice;
                    })(showType, priceInfo);
                    newPurchasePrice.push({
                        "showType": showType,
                        "type": targetPrice.type || defaultType,
                        "price": targetPrice.price || 0,
                        "discount": targetPrice.discount || 0
                    });
                });

                if (priceInfo.purchasePrice.length == 0) {
                    //为空 不参加
                    newPurchasePrice = [{
                        "showType": 0,
                        "type": 0, //不参加
                        "price": 0,
                        "discount": 0
                    }];
                } else if (priceInfo.purchasePrice[0].showType == 0) {
                    //已经有全部 就不生成单个版本了
                    var purchasePrice = priceInfo.purchasePrice[0];
                    newPurchasePrice = [purchasePrice];
                }

                priceInfo.purchasePrice = newPurchasePrice;
                newPriceInfos.push(priceInfo);
            });
            return newPriceInfos;
        }
    }, {
        key: 'unFormatPriceInfos',
        value: function unFormatPriceInfos(priceInfos, priceLimit) {
            var newPriceInfos = [];
            priceInfos.forEach(function (priceInfo, index) {
                var newPurchasePrice = [];
                priceInfo.purchasePrice.forEach(function (price) {
                    if (price.type != 0) {
                        //参加
                        newPurchasePrice.push(price);
                    }
                });
                priceInfo.priceLimit = priceLimit;
                priceInfo.purchasePrice = newPurchasePrice;
                newPriceInfos.push(priceInfo);
            });

            return newPriceInfos;
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.operateType != 'new') {
                this.getNegotiationInfo();
            }
        }
    }, {
        key: 'getNegotiationInfo',
        value: function getNegotiationInfo() {
            var _this = this;
            var type = _this.props.type;
            if (type == 1 || type == 3) {
                (0, _utilBdAjax2['default'])({
                    url: '/api/activity/task/' + _this.props.taskId + '/cinema/' + _this.props.cinemaId + '/negotiationInfo.json',
                    async: false,
                    des: '获取跟进结果'
                }).done(function (e) {
                    var newState = _this.state;
                    var pricePlans = e.data.pricePlans;

                    newState.auditInfo = e.data.auditInfo;
                    pricePlans.map(function (pricePlan, i) {
                        pricePlan.movieGroups = pricePlan.movieGroups && pricePlan.movieGroups.map(function (movieGroup, j) {
                            movieGroup.priceInfos = _this.formatPriceInfos(movieGroup.priceInfos);

                            //限价保护 ui交互是以MovieGroup 为纬度  提交时手动将这里的priceLimit 传递给priceInfos里面各个调价信息的priceLimit字段
                            movieGroup.priceLimit = movieGroup.priceInfos[0].priceLimit;
                            return movieGroup;
                        });
                        return pricePlan;
                    });

                    newState.pricePlans = pricePlans;
                    newState.feedbackContent = JSON.parse(e.data.feedbackContent);
                    newState.files = e.data.files;
                    newState.note = e.data.note;
                    _this.setState(newState);
                });
            } else if (type == 2) {
                (0, _utilBdAjax2['default'])({
                    url: '/api/price/' + _this.props.applyId + '/apply.json',
                    des: '获取调价申请'
                }).done(function (e) {
                    var newState = _this.state;
                    var pricePlans = e.data.pricePlans;

                    newState.auditInfo = {
                        reason: e.data.rejectReason
                    };
                    pricePlans.map(function (pricePlan, i) {
                        pricePlan.movieGroups = pricePlan.movieGroups && pricePlan.movieGroups.map(function (movieGroup, j) {
                            movieGroup.priceInfos = _this.formatPriceInfos(movieGroup.priceInfos);

                            //限价保护 ui交互是以MovieGroup 为纬度  提交时手动将这里的priceLimit 传递给priceInfos里面各个调价信息的priceLimit字段
                            movieGroup.priceLimit = movieGroup.priceInfos[0].priceLimit;
                            return movieGroup;
                        });
                        return pricePlan;
                    });
                    newState.pricePlans = pricePlans;
                    newState.files = e.data.files;
                    newState.note = e.data.info;
                    _this.setState(newState);
                });
            }
        }
    }, {
        key: 'getData',
        value: function getData(commit, committed) {
            //提交验证数据  保存不验证
            var _this = this;
            var validate = true;

            var feedbackContent = undefined; //自定义反馈表单 1-活动调价  3-活动不调价
            var pricePlans = null; //影院调价信息  1-活动调价 2-常规

            committed = _this.state.committed;
            if (!commit && !committed) {
                //已经提交过的并在生效中的申请 需要验证
                return {
                    feedbackContent: _this.refs.commonForm.state.value,
                    pricePlans: _this.refs.pricePlans.state.value
                };
            }

            switch (_this.props.type * 1) {// type: 1-活动调价 2-常规 3-活动不调价
                case 1:
                    feedbackContent = _this.refs.commonForm.getValue();
                    if (feedbackContent) {
                        //如果自定义反馈表单通过监测可以获取数据 再检查影院调价信息并获取
                        pricePlans = _this.refs.pricePlans.getValue();
                    }

                    if (!pricePlans) {
                        validate = false;
                    } else {
                        //调整数据
                        //a.PriceInfos字段数据结构转化（UI交互和接口给定字段不匹配 中间使用formatPriceInfos unFormatPriceInfos相互转换）
                        //b.限价保护 ui交互是以MovieGroup 为纬度  提交时手动将这里的priceLimit 传递给priceInfos里面各个调价信息的priceLimit字段
                        pricePlans = pricePlans.map(function (pricePlan, i) {
                            pricePlan.movieGroups = pricePlan.movieGroups.map(function (movieGroup, j) {
                                var priceLimit = movieGroup.priceLimit;
                                movieGroup.priceInfos = _this.unFormatPriceInfos(movieGroup.priceInfos, priceLimit);
                                delete movieGroup.priceLimit;
                                return movieGroup;
                            });
                            return pricePlan;
                        });
                    }
                    break;
                case 2:
                    pricePlans = _this.refs.pricePlans.getValue();
                    if (!pricePlans) {
                        validate = false;
                    } else {
                        //调整数据
                        //a.PriceInfos字段数据结构转化（UI交互和接口给定字段不匹配 中间使用formatPriceInfos unFormatPriceInfos相互转换）
                        //b.限价保护 ui交互是以MovieGroup 为纬度  提交时手动将这里的priceLimit 传递给priceInfos里面各个调价信息的priceLimit字段
                        pricePlans = pricePlans.map(function (pricePlan, i) {
                            pricePlan.movieGroups = pricePlan.movieGroups.map(function (movieGroup, j) {
                                var priceLimit = movieGroup.priceLimit;
                                movieGroup.priceInfos = _this.unFormatPriceInfos(movieGroup.priceInfos, priceLimit);
                                delete movieGroup.priceLimit;
                                return movieGroup;
                            });
                            return pricePlan;
                        });
                    }
                    break;
                case 3:
                    feedbackContent = _this.refs.commonForm.getValue();
                    if (!feedbackContent) {
                        //如果自定义反馈表单通过监测可以获取数据 再检查影院调价信息并获取
                        validate = false;
                    }
                    break;
            }

            return validate ? {
                feedbackContent: feedbackContent,
                pricePlans: pricePlans
            } : false;
        }
    }, {
        key: 'submit',
        value: function submit(commmit) {

            var _this = this;
            var api = undefined;
            var type = _this.props.type;
            var auditType = _this.props.auditType;
            var operateType = _this.props.operateType;
            var freshParent = _this.props.freshParent;
            var committed = _this.state.committed;

            var data = _this.getData(commmit); //提交验证数据  保存不验证
            if (!data) {
                return;
            }
            var feedbackContent = data.feedbackContent;
            var pricePlans = data.pricePlans;
            var files = _this.state.files;
            var note = _this.state.note;
            var content = undefined;
            var callback = undefined;

            if (type == 2 || type == 1 && auditType == 2) {
                //常规 和 活动需要调价不需审核 均需要立即上传附件
                if (files.length == 0) {
                    toastr.warning('请上传附件');
                    return;
                }
            }

            if (type == 1 || type == 3) {
                //活动调价 活动非调价
                var ajaxType = undefined;
                switch (operateType) {
                    case 'new':
                        ajaxType = 'POST';
                        break;
                    case 'edit':
                        ajaxType = 'PUT';
                        break;

                }
                if (type == 3) {
                    if (!note) {
                        toastr.warning("请填写备注");
                        return;
                    }
                    content = JSON.stringify({
                        feedbackContent: feedbackContent,
                        files: files,
                        note: note
                    });
                } else {
                    content = JSON.stringify({
                        feedbackContent: feedbackContent,
                        pricePlans: pricePlans,
                        files: files,
                        note: note
                    });
                }

                (0, _utilBdAjax2['default'])({
                    url: '/api/activity/task/' + _this.props.taskId + '/cinema/' + _this.props.cinemaId + '/negotiationInfo.json',
                    type: ajaxType,
                    des: '保存跟进',
                    data: {
                        content: content
                    }
                }).done(function (e) {
                    if (commmit && !committed) {
                        (0, _utilBdAjax2['default'])({
                            url: '/api/activity/task/' + _this.props.taskId + '/cinema/' + _this.props.cinemaId + '/negotiationInfo/submit.json',
                            type: 'post',
                            des: '提交跟进',
                            showSuccess: true
                        }).done(function (e) {
                            _this.hide();
                            freshParent();
                        });
                    } else {
                        toastr.success(e.des);
                        _this.hide();
                        freshParent();
                    }
                });
            } else {
                var url = undefined;
                var applyId = _this.props.applyId;

                content = {
                    data: {
                        id: applyId,
                        cinemaId: _this.props.cinemaId,
                        info: note,
                        files: files,
                        pricePlans: pricePlans
                    }
                };

                if (applyId && applyId * 1 > 0) {
                    url = "/api/price/" + applyId + "/apply.json";
                } else {
                    url = "/api/price/applies.json";
                    content.data.scaaId = _this.props.scaaId;
                }

                (0, _utilBdAjax2['default'])({
                    url: url,
                    type: 'post',
                    des: (_this.props.operateType == 'new' ? '新建' : '修改') + '调价申请',
                    data: {
                        content: JSON.stringify(content)
                    },
                    showSuccess: true
                }).done(function (e) {
                    _this.hide();
                    freshParent(e);
                });
            }
        }
    }, {
        key: 'cancelPriceApply',
        value: function cancelPriceApply() {
            var _this = this;
            var container = _reactDom2['default'].findDOMNode(this.refs['container-cancelPriceApply']);
            var id = this.props.applyId;
            _reactDom2['default'].unmountComponentAtNode(container);
            var component = _reactDom2['default'].render(_react2['default'].createElement(_cancelPriceApply2['default'], { id: id, done: function () {
                    _this.hide();
                    _this.props.freshParent();
                } }), container);
        }
    }, {
        key: 'render',
        value: function render() {

            var _this = this;
            var readOnly = undefined;
            var modalTile = undefined;
            var type = _this.props.type * 1;
            var operateType = _this.props.operateType;
            switch (operateType) {
                case 'new':
                    readOnly = false;
                    modalTile = "提交跟进结果";
                    break;
                case 'edit':
                    readOnly = false;
                    modalTile = "修改跟进结果";
                    break;
                case 'check':
                    readOnly = true;
                    modalTile = "查看跟进结果";
                    break;
            }

            var showDesignationSystemTips = false;
            if (type == 2) {

                modalTile = modalTile.replace('跟进结果', '调价申请');

                //当创建申请的影院对应的售票系统，属于以下15个售票系统之一，则在【基础信息】页面显示以下提示内容:
                //该售票系统影院可自行调价，低于最低限价且差额部分由影城承担的调价可正常申请。

                var showTipsSellSrc = [21, 13, 4, 18, 19, 9, 44, 15, 26, 24, 27, 29, 32, 31, 46];

                // 判断是否为15个售票系统之一
                if (_this.props.sellSrc != null && $.inArray(_this.props.sellSrc, showTipsSellSrc) > -1) {
                    showDesignationSystemTips = true;
                }
            }

            var taskInfoProps = {
                ref: "taskInfo",
                taskInfo: _this.props.taskInfo,
                cinemaId: _this.props.cinemaId,
                cinemaName: _this.props.cinemaName,
                auditInfo: _this.state.auditInfo,
                showDesignationSystemTips: showDesignationSystemTips,
                readOnly: readOnly
            };
            var pricePlansProps = {
                ref: "pricePlans",
                type: _this.props.type, //1-活动调价 2-常规 3-活动 非调价
                valueLink: _this.nestLinkedState(['pricePlans'], _this),
                readOnly: readOnly,
                movieOptions: _this.props.taskInfo && _this.props.taskInfo.movies || [],
                cinemaId: _this.props.cinemaId
            };

            var commonFormDataProps = {
                ref: "commonForm",
                template: _this.props.taskInfo && _this.props.taskInfo.feedbackContent && _this.props.taskInfo.feedbackContent[0],
                valueLink: _this.nestLinkedState(['feedbackContent'], _this),
                readOnly: readOnly
            };

            var styles = {
                pointerEvents: {},
                cursor: {}
            };
            if (operateType == 'check') {
                styles = {
                    pointerEvents: {
                        pointerEvents: 'none'
                    },
                    cursor: {
                        cursor: 'not-allowed'
                    }
                };
            }
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'div',
                    { className: 'modal-container' },
                    _react2['default'].createElement(
                        _reactBootstrapLibModal2['default'],
                        { show: this.state.show, onHide: _this.hide.bind(_this), bsSize: 'large' },
                        _react2['default'].createElement(
                            _reactBootstrapLibModal2['default'].Header,
                            { closeButton: true },
                            _react2['default'].createElement(
                                _reactBootstrapLibModal2['default'].Title,
                                null,
                                modalTile
                            )
                        ),
                        _react2['default'].createElement(
                            _reactBootstrapLibModal2['default'].Body,
                            { style: styles.cursor },
                            _react2['default'].createElement(
                                'div',
                                { style: styles.pointerEvents },
                                _react2['default'].createElement(_taskInfo2['default'], taskInfoProps),
                                (function () {
                                    if (_this.props.taskInfo && _this.props.taskInfo.feedbackContent && _this.props.taskInfo.feedbackContent[0]) {
                                        return _react2['default'].createElement(
                                            'div',
                                            null,
                                            _react2['default'].createElement(_commonFormDataCommonFormData2['default'], commonFormDataProps),
                                            _react2['default'].createElement(_commonFormGroup.Hr, null)
                                        );
                                    }
                                })(),
                                (function () {
                                    if (_this.props.type != 3) {
                                        return _react2['default'].createElement(_pricePlans2['default'], pricePlansProps);
                                    }
                                    _react2['default'].createElement(_commonFormGroup.Hr, null);
                                })(),
                                _react2['default'].createElement(_commonAttachments2['default'], { readOnly: readOnly,
                                    valueLink: this.nestLinkedState(["files"], _this) }),
                                _react2['default'].createElement(_commonFormGroup.Hr, null),
                                _react2['default'].createElement(
                                    _commonFormGroup.Group,
                                    null,
                                    _react2['default'].createElement(
                                        _commonFormGroup.Left,
                                        null,
                                        '备注'
                                    ),
                                    '：',
                                    _react2['default'].createElement(
                                        _commonFormGroup.Right,
                                        null,
                                        _react2['default'].createElement('textarea', { style: {
                                                height: '100px',
                                                width: '400px'
                                            }, valueLink: this.nestLinkedState(["note"], _this), placeholder: '可选，其他特殊情况' })
                                    )
                                ),
                                _react2['default'].createElement('br', null),
                                (function () {
                                    var isLoading = _this.state.isLoading;
                                    var committed = _this.state.committed;
                                    if (operateType != 'check') {
                                        var Footer = undefined;
                                        var cancelBtn = undefined;
                                        if (operateType == 'edit' && type == 2) {
                                            cancelBtn = _react2['default'].createElement(
                                                _reactBootstrapLibButton2['default'],
                                                { onClick: _this.cancelPriceApply.bind(_this) },
                                                '取消调价申请'
                                            );
                                        }
                                        switch (type) {//1-活动调价 2-常规 3-活动 非调价
                                            case 1:
                                                Footer = _react2['default'].createElement(
                                                    _reactBootstrapLibModal2['default'].Footer,
                                                    null,
                                                    _react2['default'].createElement(
                                                        _reactBootstrapLibButton2['default'],
                                                        { disabled: isLoading,
                                                            className: committed ? 'hide' : '',
                                                            onClick: !isLoading ? _this.submit.bind(_this, false) : null },
                                                        isLoading ? '保存中...' : '保存草稿'
                                                    ),
                                                    _react2['default'].createElement(
                                                        _reactBootstrapLibButton2['default'],
                                                        { disabled: isLoading,
                                                            onClick: !isLoading ? _this.submit.bind(_this, true) : null },
                                                        isLoading ? '提交中...' : '提交'
                                                    )
                                                );
                                                break;
                                            case 2:
                                            case 3:
                                                Footer = _react2['default'].createElement(
                                                    _reactBootstrapLibModal2['default'].Footer,
                                                    null,
                                                    _react2['default'].createElement(
                                                        _reactBootstrapLibButton2['default'],
                                                        { disabled: isLoading,
                                                            onClick: !isLoading ? _this.submit.bind(_this, true) : null },
                                                        isLoading ? '提交中...' : '提交'
                                                    ),
                                                    cancelBtn
                                                );
                                                break;
                                        }
                                        return Footer;
                                    }
                                })()
                            )
                        )
                    )
                ),
                _react2['default'].createElement('div', { ref: 'container-cancelPriceApply' })
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            freshParent: function freshParent() {},
            committed: false,

            type: 1, //1-活动调价 2-常规 3-活动 非调价
            auditType: 1, //taskData.auditType == 1 ? "需要审核" : "不需要审核"
            operateType: 'new',

            taskId: null,
            cinemaId: null,
            cinemaName: null,

            scaaId: 0, //单影院活动申请id，如果没有关联单影院活动则填0

            //活动调价 独有字段
            taskInfo: null,

            //常规调价 独有
            applyId: null,
            sellsrc: null
        },
        enumerable: true
    }]);

    return Negotiation;
})(_react2['default'].Component);

exports['default'] = Negotiation;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});