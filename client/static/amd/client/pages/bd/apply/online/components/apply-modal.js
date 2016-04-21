'use strict';

define(["/amd/node_modules/react-bootstrap/lib/Modal.js","/amd/node_modules/react-bootstrap/lib/Button.js","/amd/node_modules/react-bootstrap/lib/Input.js","/amd/client/components/common/my-table.js","/amd/client/components/util/bdAjax.js","/amd/client/pages/bd/apply/online/components/cinema-form.js","/amd/node_modules/classnames/index.js","/amd/client/pages/bd/apply/online/components/uploaded-file.js","/amd/client/pages/bd/apply/online/components/toggle-union-input.js","/amd/client/pages/bd/apply/online/bind/react-path-link.js","/amd/client/pages/bd/apply/online/bind/react-checked-mask-path-link.js","/amd/client/pages/bd/apply/online/bind/react-checked-has-path-link.js","/amd/client/pages/bd/apply/online/bind/react-checked-equal-path-link.js","/amd/client/pages/bd/apply/online/components/process-button.js","/amd/client/pages/bd/apply/online/dom/modal-enter-helper.js","/amd/client/components/common/fileupload.js"], function (ref_2,ref_3,ref_4,ref_5,ref_6,ref_7,ref_8,ref_9,ref_10,ref_11,ref_12,ref_13,ref_14,ref_15,ref_16,ref_17) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"react-bootstrap/lib/Modal":{"index":0,"path":"node_modules/react-bootstrap/lib/Modal.js"},"react-bootstrap/lib/Button":{"index":1,"path":"node_modules/react-bootstrap/lib/Button.js"},"react-bootstrap/lib/Input":{"index":2,"path":"node_modules/react-bootstrap/lib/Input.js"},"../../../../../components/common/my-table":{"index":3,"path":"client/components/common/my-table.js"},"../../../../../components/util/bdAjax":{"index":4,"path":"client/components/util/bdAjax.js"},"./cinema-form":{"index":5,"path":"client/pages/bd/apply/online/components/cinema-form.js"},"classnames":{"index":6,"path":"node_modules/classnames/index.js"},"./uploaded-file":{"index":7,"path":"client/pages/bd/apply/online/components/uploaded-file.js"},"./toggle-union-input":{"index":8,"path":"client/pages/bd/apply/online/components/toggle-union-input.js"},"../bind/react-path-link":{"index":9,"path":"client/pages/bd/apply/online/bind/react-path-link.js"},"../bind/react-checked-mask-path-link":{"index":10,"path":"client/pages/bd/apply/online/bind/react-checked-mask-path-link.js"},"../bind/react-checked-has-path-link":{"index":11,"path":"client/pages/bd/apply/online/bind/react-checked-has-path-link.js"},"../bind/react-checked-equal-path-link":{"index":12,"path":"client/pages/bd/apply/online/bind/react-checked-equal-path-link.js"},"./process-button":{"index":13,"path":"client/pages/bd/apply/online/components/process-button.js"},"../dom/modal-enter-helper":{"index":14,"path":"client/pages/bd/apply/online/dom/modal-enter-helper.js"},"../../../../../components/common/fileupload":{"index":15,"path":"client/components/common/fileupload.js"}};
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

var _reactBootstrapLibModal = cmd2amdLoadModule('react-bootstrap/lib/Modal');

var _reactBootstrapLibModal2 = _interopRequireDefault(_reactBootstrapLibModal);

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _reactBootstrapLibInput = cmd2amdLoadModule('react-bootstrap/lib/Input');

var _reactBootstrapLibInput2 = _interopRequireDefault(_reactBootstrapLibInput);

var _componentsCommonMyTable = cmd2amdLoadModule('../../../../../components/common/my-table');

var _componentsCommonMyTable2 = _interopRequireDefault(_componentsCommonMyTable);

var _componentsUtilBdAjax = cmd2amdLoadModule('../../../../../components/util/bdAjax');

var _componentsUtilBdAjax2 = _interopRequireDefault(_componentsUtilBdAjax);

var _cinemaForm = cmd2amdLoadModule('./cinema-form');

var _cinemaForm2 = _interopRequireDefault(_cinemaForm);

var _classnames = cmd2amdLoadModule('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uploadedFile = cmd2amdLoadModule('./uploaded-file');

var _uploadedFile2 = _interopRequireDefault(_uploadedFile);

var _toggleUnionInput = cmd2amdLoadModule('./toggle-union-input');

var _toggleUnionInput2 = _interopRequireDefault(_toggleUnionInput);

var _bindReactPathLink = cmd2amdLoadModule('../bind/react-path-link');

var _bindReactPathLink2 = _interopRequireDefault(_bindReactPathLink);

var _bindReactCheckedMaskPathLink = cmd2amdLoadModule('../bind/react-checked-mask-path-link');

var _bindReactCheckedMaskPathLink2 = _interopRequireDefault(_bindReactCheckedMaskPathLink);

var _bindReactCheckedHasPathLink = cmd2amdLoadModule('../bind/react-checked-has-path-link');

var _bindReactCheckedHasPathLink2 = _interopRequireDefault(_bindReactCheckedHasPathLink);

var _bindReactCheckedEqualPathLink = cmd2amdLoadModule('../bind/react-checked-equal-path-link');

var _bindReactCheckedEqualPathLink2 = _interopRequireDefault(_bindReactCheckedEqualPathLink);

var _processButton = cmd2amdLoadModule('./process-button');

var _processButton2 = _interopRequireDefault(_processButton);

var _domModalEnterHelper = cmd2amdLoadModule('../dom/modal-enter-helper');

var _domModalEnterHelper2 = _interopRequireDefault(_domModalEnterHelper);

var _componentsCommonFileupload = cmd2amdLoadModule('../../../../../components/common/fileupload');

var _componentsCommonFileupload2 = _interopRequireDefault(_componentsCommonFileupload);

var SALE_SYSTEMS_URL = '/api/seat/saleSystem.json';

var SAVE_BUTTON_TEXT = {
    SAVE: '保存并提交申请',
    SAVING: '申请中...'
};

var DRAFT_BUTTON_TEXT = {
    DRAFT: '保存草稿',
    DRAFTING: '保存中...'
};

var ApplyModal = (function (_Component) {
    _inherits(ApplyModal, _Component);

    function ApplyModal() {
        _classCallCheck(this, ApplyModal);

        _get(Object.getPrototypeOf(ApplyModal.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            saveButton: {
                processing: false,
                text: SAVE_BUTTON_TEXT.SAVE,
                processingText: SAVE_BUTTON_TEXT.SAVING
            },
            draftButton: {
                processing: false,
                text: DRAFT_BUTTON_TEXT.DRAFT,
                processingText: DRAFT_BUTTON_TEXT.DRAFTING
            },
            apply: { id: 0 },
            cinemas: [],
            saleSystems: []
        };
    }

    _createClass(ApplyModal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getSaleSystems();
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
            if (props.show && props.inEditing) {
                //applyId等于0代表新建
                if (props.applyId === 0) {
                    var apply = { id: 0 };
                    this.setState({
                        apply: apply
                    });
                    this.addAssistData(apply);
                } else {
                    this.getApply(props.applyId);
                }
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return true;
        }
    }, {
        key: 'deleteCinema',
        value: function deleteCinema(id) {
            var apply = this.state.apply || {};
            var cinemas = apply.cinemas || [];
            var foundCinema = false;
            apply.cinemas = cinemas.filter(function (cinema) {
                return cinema.cinemaId !== id;
            });
            //delete  parent's
            this.props.deleteCinema(id);
            this.forceUpdate();
        }
    }, {
        key: 'getSaleSystems',
        value: function getSaleSystems() {
            var _this = this;

            (0, _componentsUtilBdAjax2['default'])({
                url: SALE_SYSTEMS_URL,
                method: 'GET'
            }).then(function (saleSystems) {
                _this.setState({
                    saleSystems: saleSystems.data
                });
            }).fail(function () {
                console.log('get sale system error');
            });
        }
    }, {
        key: 'getApply',
        value: function getApply(applyId) {
            var _this2 = this;

            var url = '/api/online/apply/' + applyId + '.json';
            (0, _componentsUtilBdAjax2['default'])({
                url: url,
                type: 'GET'
            }).then(function (apply) {
                _this2.addAssistData(apply.data);
                _this2.setState({
                    apply: apply.data
                });
            }).fail(function () {
                console.log('get apply data error', url);
                _this2.setState({
                    apply: {}
                });
            });
        }

        //由于数据和ui并不是一一对应，有的数据代表了多种含义，所以这里将这些
        //数据拆分，用于数据绑定
        //该方法只在拿到新数据时调用
    }, {
        key: 'addAssistData',
        value: function addAssistData(apply) {
            this.addApplyAssitData(apply);
        }
    }, {
        key: 'addApplyAssitData',
        value: function addApplyAssitData(apply) {
            var _this3 = this;

            apply.assist = {};
            if (!apply.contract) {
                apply.contract = {};
            }
            var contract = apply.contract;

            if (!contract.contact) {
                contract.contact = {};
            }

            //初始值
            if (!contract.sellSrc) {
                contract.sellSrc = '4';
            }

            var contact = contract.contact;

            //初始化默认不能退票
            if (!('refundType' in contract)) {
                contract.refundType = 0;
            }

            var financeContact = contract.financeContact || {};
            if (financeContact.id) {
                apply.assist.accountCheckType = 0;
            } else {
                apply.assist.accountCheckType = 1;
            }

            //400电话
            if (contract.freeContactPhone) {
                apply.assist.$400CheckType = 0;
            } else {
                apply.assist.$400CheckType = 1;
            }

            if (!apply.cinemas) {
                apply.cinemas = [];
            }
            var cinemas = apply.cinemas;
            cinemas.forEach(function (cinema) {
                _this3.addCinemaAssistData(apply, cinema);
            });
        }
    }, {
        key: 'addCinemaAssistData',
        value: function addCinemaAssistData(apply, cinema) {
            apply.assist = apply.assist || {};
            cinema.assist = cinema.assist || {};

            //影院是否对账
            if (apply.assist.accountCheckType === 1) {
                cinema.assist.needAccountChecking = true;
            } else {
                cinema.assist.needAccountChecking = false;
            }

            var contract = apply.contract || {};

            //影院是否独立设置退票
            if (contract.refundType === 2) {
                cinema.assist.needTicketReturnSetting = true;
            } else {
                cinema.assist.needTicketReturnSetting = false;
            }

            if (cinema.refundTime && cinema.refundTime > 0) {
                cinema.assist.refundType = 0;
            } else {
                cinema.assist.refundType = 1;
            }

            //儿童票
            if (cinema.childPref) {
                cinema.assist.hasChildPref = true;
            } else {
                cinema.assist.hasChildPref = false;
            }

            if (!('glasses' in cinema)) {
                cinema.glasses = 0;
            }

            //3D眼镜   
            if (cinema.glasses === 0) {
                cinema.assist.glassCheckType = 0;
            } else if (cinema.glasses > 0) {
                cinema.assist.glassCheckType = 1;
                cinema.assist.glassDeposit = cinema.glasses;
            } else {
                cinema.assist.glassCheckType = 2;
                cinema.assist.glassPurchase = -cinema.glasses;
            }

            //停车
            if (cinema.park) {
                cinema.assist.canPark = true;
            } else {
                cinema.assist.canPark = false;
            }

            //IMAX厅
            if (cinema.imaxHall) {
                cinema.assist.hasIMax = true;
            } else {
                cinema.assist.hasIMax = false;
            }

            //可刷卡
            if (cinema.useCredit) {
                cinema.assist.canUseCredit = true;
            } else {
                cinema.assist.canUseCredit = false;
            }

            //情侣座
            if (cinema.coupleHall) {
                cinema.assist.hasCoupleHall = true;
            } else {
                cinema.assist.hasCoupleHall = false;
            }

            //WI-FI
            if (cinema.wifi) {
                cinema.assist.hasWifi = true;
            } else {
                cinema.assist.hasWifi = false;
            }

            if (!cinema.machine) {
                cinema.machine = {};
            }

            this.addMachineAssistData(cinema.machine);
        }
    }, {
        key: 'addMachineAssistData',
        value: function addMachineAssistData(machine) {
            machine.assist = machine.assist || {};
            if (machine.machineNum) {
                machine.assist.needMachineType = 0;
            } else {
                machine.assist.needMachineType = 1;
            }
        }
    }, {
        key: 'removeAssistData',
        value: function removeAssistData(apply) {
            var contract = apply.contract || {};
            var financeContact = contract.financeContact || {};
            var assist = apply.assist || {};
            if (assist.accountCheckType === 1) {
                delete contract.fananceContact;
            }

            if (assist.$400CheckType === 1) {
                contract.freeContactPhone = '';
            }

            var cinemas = apply.cinemas || [];
            cinemas.forEach(function (cinema) {
                var cinemaAssist = cinema.assist || {};

                var financeContact = cinema.financeContact || {};
                if (!cinemaAssist.needAccountChecking) {
                    delete cinema.financeContact;
                }

                if (!cinemaAssist.needTicketReturnSetting) {
                    delete cinema.refundTime;
                } else {
                    if (cinemaAssist.refundType === 1) {
                        delete cinema.refundTime;
                    }
                }

                if (!cinemaAssist.hasChildPref) {
                    delete cinemaAssist.childPref;
                }

                if (cinemaAssist.glassCheckType === 0) {
                    cinema.glasses = 0;
                } else if (cinemaAssist.glassCheckType === 1) {
                    cinema.glasses = +cinemaAssist.glassDeposit;
                } else {
                    cinema.glasses = -cinemaAssist.glassPurchase;
                }

                if (!cinemaAssist.canPark) {
                    delete cinemaAssist.park;
                }

                if (!cinemaAssist.hasIMax) {
                    delete cinemaAssist.imaxHall;
                }

                if (!cinemaAssist.canUseCredit) {
                    delete cinemaAssist.useCredit;
                }

                if (!cinemaAssist.hasCoupleHall) {
                    delete cinemaAssist.coupleHall;
                }

                if (!cinemaAssist.hasWifi) {
                    delete cinemaAssist.wifi;
                }

                var machine = cinema.machine || {};
                var machineAssist = machine.assist || {};
                if (machineAssist.needMachineType === 1) {
                    machine.machineNum = 0;
                } else {
                    if (machine.useDhcp === 1) {
                        machine.ip = "";
                        machine.subnetMask = "";
                        machine.gatewayIp = "";
                        machine.dnsIp1 = "";
                        machine.dnsIp2 = "";
                    }
                }
            });
        }
    }, {
        key: 'onModalHide',
        value: function onModalHide() {}
    }, {
        key: 'onUploadedFileAdd',
        value: function onUploadedFileAdd(e) {
            var _this4 = this;

            (0, _componentsCommonFileupload2['default'])({
                success: function success(data) {
                    var apply = _this4.state.apply;
                    var contract = apply.contract || {};
                    var files = contract.files || [];
                    files.push(data[0]);
                    contract.files = files;
                    apply.contract = contract;
                    _this4.setState({
                        apply: apply
                    });
                },

                fail: function fail() {
                    toastr.error("上传文件失败，请确认图片格式!");
                }
            })(e);
        }
    }, {
        key: 'onUploadedFileDelete',
        value: function onUploadedFileDelete(fileId) {
            var apply = this.state.apply;
            var contract = apply.contract || {};
            var files = contract.files || [];
            contract.files = files.filter(function (file) {
                return file.id !== fileId;
            });
            apply.contract = contract;
            this.setState({
                apply: apply
            });
        }
    }, {
        key: 'save',
        value: function save() {
            this.state.saveButton.processing = true;
            this.setState(this.state);
            this.doSave(true);
        }
    }, {
        key: 'saveDraft',
        value: function saveDraft() {
            this.state.draftButton.processing = true;
            this.setState(this.state);
            this.doSave(false);
        }
    }, {
        key: 'backToApplyList',
        value: function backToApplyList() {
            this.props.closeApplyModal(true);
        }
    }, {
        key: 'doSave',
        value: function doSave(submit) {
            var _this5 = this;

            var checkResult = this.checkForm(submit);
            if (checkResult !== true) {
                this.resetSaveAndDraftButton();
                toastr.info(checkResult);
            } else {
                (function () {
                    var apply = _this5.state.apply;

                    _this5.removeAssistData(apply);

                    var url = '';
                    var type = '';
                    if (apply.id === 0) {
                        url = '/api/online/apply/applies.json';
                        type = 'post';
                    } else {
                        url = '/api/online/apply/' + apply.id + '.json';
                        type = 'put';
                    }

                    $.ajax({
                        url: url,
                        type: type,
                        data: {
                            content: JSON.stringify(apply, function (key, value) {
                                if (key !== 'assist') return value;
                            })
                        },

                        success: function success(data) {
                            if (submit) {
                                if (apply.state === 1) {
                                    toastr.success("编辑成功，已经保存。");
                                    _this5.backToApplyList();
                                } else {
                                    if (data.success) {
                                        $.post("/api/online/apply/" + data.data.id + "/submit.json", function (data) {
                                            if (data.success) {
                                                toastr.success(data.message);
                                                _this5.backToApplyList();
                                            } else {
                                                toastr.success('保存草稿成功，' + data.message);
                                            }
                                        });
                                    } else {
                                        toastr.error("保存草稿失败,无法提交！");
                                    }
                                }
                            } else {
                                toastr.info(data.message);
                            }
                        },

                        complete: function complete() {
                            _this5.resetSaveAndDraftButton();
                        }
                    });
                })();
            }
        }
    }, {
        key: 'resetSaveAndDraftButton',
        value: function resetSaveAndDraftButton() {
            this.state.saveButton.processing = false;
            this.state.draftButton.processing = false;
            this.setState(this.state);
        }
    }, {
        key: 'checkForm',
        value: function checkForm(submit) {
            var apply = this.state.apply || {};
            var contract = apply.contract || {};
            if (!contract.theaterChain) {
                return '所属院线不能为空！';
            }

            var contact = contract.contact || {};
            if (!contact.name || !contact.phone) {
                return '签约联系人姓名和联系电话不能为空！';
            }

            var assist = apply.assist || {};
            var financeContact = contract.financeContact || {};
            if (assist.accountCheckType === 0) {
                if (!financeContact.name || !financeContact.phone) {
                    return '统一对账时，财务联系人姓名和联系电话不能为空！';
                }
            }

            if (contract.refundType === 1 && !contract.refundTime) {
                return '请填写统一自助退票时长！';
            }

            if (assist.$400CheckType === 0 && !contract.freeContactPhone) {
                return '勾选400电话选项时，必须填写400电话！';
            }

            var files = contract.files || [];
            if (submit && files.length < 4) {
                return '所需文件没有达到要求，请最少收集4个文件后重试！';
            }

            var cinemas = apply.cinemas || [];
            if (cinemas.length === 0) {
                return '没有影院关联上线申请，请与影院关联！';
            }

            var i = undefined,
                ln = cinemas.length;
            var cinema = undefined,
                cinemaRes = undefined;
            var cinemaKey = undefined,
                cinemaComponent = undefined;
            for (i = 0; i < cinemas.length; i++) {
                cinema = cinemas[i];
                cinemaKey = this.getCinemaKey(cinema);
                cinemaComponent = this.refs[cinemaKey];
                if (cinemaComponent && cinemaComponent.checkForm) {
                    cinemaRes = cinemaComponent.checkForm(submit);
                }
                if (cinemaRes !== true) {
                    return cinemaRes;
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
        key: 'checkedHasPathLink',
        value: function checkedHasPathLink(key, value) {
            return new _bindReactCheckedHasPathLink2['default'](this, key, value);
        }
    }, {
        key: 'checkedEqualPathLink',
        value: function checkedEqualPathLink(key, value) {
            return new _bindReactCheckedEqualPathLink2['default'](this, key, value);
        }
    }, {
        key: 'onAccountCheckingChange',
        value: function onAccountCheckingChange(type) {
            var apply = this.state.apply;
            apply.assist = apply.assist || {};

            apply.assist.accountCheckType = type;

            var cinemas = apply.cinemas || [];
            cinemas.forEach(function (cinema) {
                cinema.assist = cinema.assist || {};
                cinema.assist.needAccountChecking = !!type;
            });
            this.setState({
                apply: apply
            });
        }
    }, {
        key: 'onTicketReturnTypeChange',
        value: function onTicketReturnTypeChange(type) {
            var apply = this.state.apply;
            apply.contract = apply.contract || {};

            apply.contract.refundType = type;

            var cinemas = apply.cinemas || [];
            cinemas.forEach(function (cinema) {
                cinema.assist = cinema.assist || {};
                cinema.assist.needTicketReturnSetting = type === 2;
            });
            this.setState({
                apply: apply
            });
        }
    }, {
        key: 'getCinemaKey',
        value: function getCinemaKey(cinema) {
            return 'cinema' + cinema.cinemaId;
        }
    }, {
        key: 'newCinema',
        value: function newCinema(id, name) {
            var cinema = {
                cinemaId: id,
                cinemaName: name
            };
            this.addCinemaAssistData(this.state.apply, cinema);
            return cinema;
        }
    }, {
        key: 'addDistinctCinema',
        value: function addDistinctCinema(cinema) {
            var found = false;
            var cinemas = this.state.apply.cinemas;
            cinemas.forEach(function (myCinema) {
                if (myCinema.cinemaId === cinema.cinemaId) {
                    found = true;
                }
            });
            if (!found) {
                cinemas.push(cinema);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            window.applyModal = this;

            var apply = this.state.apply;
            var assist = apply.assist || {};
            var contract = apply.contract || {};
            var contact = contract.contact || {};
            var files = contract.files || [];
            var financeContact = contract.financeContact || {};
            if (!apply.cinemas) {
                apply.cinemas = [];
            }
            this.props.cinemas.forEach(function (cinema) {
                _this6.addDistinctCinema(_this6.newCinema(cinema.id, cinema.name));
            });

            var cinemas = apply.cinemas;

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
                        { className: 'close', onClick: this.props.closeApplyModal },
                        '×'
                    ),
                    _react2['default'].createElement(
                        _reactBootstrapLibModal2['default'].Title,
                        null,
                        '选座影院上线申请'
                    )
                ),
                _react2['default'].createElement(
                    _reactBootstrapLibModal2['default'].Body,
                    null,
                    _react2['default'].createElement(
                        'div',
                        { id: 'contract', className: 'contract form-group-sm form-inline' },
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
                                null,
                                '所属院线：',
                                _react2['default'].createElement(_reactBootstrapLibInput2['default'], { type: 'text', placeholder: '所属院线',
                                    valueLink: this.pathLink('apply.contract.theaterChain') })
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'margin-left-10' },
                                '售票系统：',
                                _react2['default'].createElement(
                                    'select',
                                    { id: 'saleSystem', className: 'form-control',
                                        valueLink: this.pathLink('apply.contract.sellSrc') },
                                    this.state.saleSystems.map(function (saleSystem) {
                                        return _react2['default'].createElement(
                                            'option',
                                            { value: saleSystem.id, key: 'saleSystem' + saleSystem.id },
                                            saleSystem.name
                                        );
                                    })
                                )
                            ),
                            _react2['default'].createElement(
                                _reactBootstrapLibButton2['default'],
                                { bsStyle: 'primary', id: 'addCinema', onClick: this.props.addCinema },
                                '添加影院'
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement('input', { type: 'hidden', id: 'contactId', value: '0' }),
                            _react2['default'].createElement(
                                'span',
                                null,
                                '签约联系人：',
                                _react2['default'].createElement(_reactBootstrapLibInput2['default'], { type: 'text', maxLength: '5', placeholder: '联系人姓名',
                                    valueLink: this.pathLink('apply.contract.contact.name') })
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'margin-left-10' },
                                '联系电话：',
                                _react2['default'].createElement('input', { type: 'text', placeholder: '联系电话',
                                    valueLink: this.pathLink('apply.contract.contact.phone') })
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'margin-left-10' },
                                '盖章顺序：',
                                _react2['default'].createElement(
                                    'select',
                                    { id: 'stampOrder', className: 'form-control', valueLink: this.pathLink('apply.contract.signSequence') },
                                    _react2['default'].createElement(
                                        'option',
                                        { value: '0' },
                                        '影院先盖章'
                                    ),
                                    _react2['default'].createElement(
                                        'option',
                                        { value: '1' },
                                        '美团先盖章'
                                    )
                                )
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(
                                'label',
                                { className: 'radio-inline' },
                                _react2['default'].createElement('input', { type: 'radio', name: 'accounts',
                                    checked: assist.accountCheckType === 0,
                                    onChange: this.onAccountCheckingChange.bind(this, 0) }),
                                '统一对账'
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'margin-left-10' },
                                '财务联系人：',
                                _react2['default'].createElement('input', { type: 'text', className: 'form-control', placeholder: '统一对账联系人姓名', size: '20',
                                    disabled: assist.accountCheckType !== 0,
                                    valueLink: this.pathLink('apply.contract.financeContact.name') })
                            ),
                            _react2['default'].createElement(
                                'span',
                                null,
                                '联系电话：',
                                _react2['default'].createElement('input', { type: 'text', className: 'form-control', placeholder: '统一对账联系人电话', size: '20',
                                    disabled: assist.accountCheckType !== 0,
                                    valueLink: this.pathLink('apply.contract.financeContact.phone') })
                            ),
                            _react2['default'].createElement(
                                'label',
                                { className: 'radio-inline margin-left-10' },
                                _react2['default'].createElement('input', { type: 'radio', name: 'accounts',
                                    checked: assist.accountCheckType === 1,
                                    onChange: this.onAccountCheckingChange.bind(this, 1) }),
                                '各影院独立对账'
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(
                                'label',
                                { className: 'radio-inline' },
                                _react2['default'].createElement('input', { type: 'radio', name: 'returnTicket',
                                    checked: contract.refundType === 1,
                                    onChange: this.onTicketReturnTypeChange.bind(this, 1) }),
                                '统一自助退票'
                            ),
                            '  开场前',
                            _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm',
                                size: '4',
                                disabled: contract.refundType !== 1,
                                valueLink: this.pathLink('apply.contract.refundTime') }),
                            '分钟用户可自助退票',
                            _react2['default'].createElement(
                                'label',
                                { className: 'radio-inline margin-left-10' },
                                _react2['default'].createElement('input', { type: 'radio', name: 'returnTicket',
                                    checked: contract.refundType === 2,
                                    onChange: this.onTicketReturnTypeChange.bind(this, 2) }),
                                '各影院独立设置退票时间'
                            ),
                            _react2['default'].createElement(
                                'label',
                                { className: 'radio-inline margin-left-10' },
                                _react2['default'].createElement('input', { type: 'radio', name: 'returnTicket',
                                    checked: contract.refundType === 0,
                                    onChange: this.onTicketReturnTypeChange.bind(this, 0) }),
                                '不支持用户自助退票'
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(_toggleUnionInput2['default'], {
                                type: 'radio',
                                title: '有400客服电话',
                                name: 'servicePhone',
                                placeholder: '请填写客服400电话',
                                checkedLink: this.checkedEqualPathLink('apply.assist.$400CheckType', 0),
                                valueLink: this.pathLink('apply.contract.freeContactPhone') }),
                            _react2['default'].createElement(
                                'label',
                                { className: 'radio-inline margin-left-10' },
                                _react2['default'].createElement('input', { type: 'radio', name: 'servicePhone',
                                    checkedLink: this.checkedEqualPathLink('apply.assist.$400CheckType', 1) }),
                                '没有400客服电话'
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(
                                'div',
                                null,
                                _react2['default'].createElement(
                                    'h5',
                                    null,
                                    '上传文件(至少需要放映许可证、商务合作协议(院线影院可用补充协议、授权函)、商家营业执照、开户许可证)'
                                ),
                                _react2['default'].createElement('input', { type: 'file', id: 'onlineFile', name: 'file',
                                    onChange: this.onUploadedFileAdd.bind(this) })
                            ),
                            _react2['default'].createElement(
                                'div',
                                null,
                                files.map(function (file) {
                                    var deleteFile = _this6.onUploadedFileDelete.bind(_this6, file.id);
                                    return _react2['default'].createElement(_uploadedFile2['default'], { key: 'file' + file.id, file: file, deleteFile: deleteFile });
                                })
                            )
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        { id: 'onlineLoading' },
                        _react2['default'].createElement('img', { src: '/images/loading.gif', alt: '上传中...' })
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'cinemaCom' },
                        cinemas.map(function (cinema) {
                            return _react2['default'].createElement(_cinemaForm2['default'], { key: _this6.getCinemaKey(cinema), cinema: cinema,
                                deleteCinema: _this6.deleteCinema.bind(_this6),
                                ref: _this6.getCinemaKey(cinema) });
                        })
                    )
                ),
                _react2['default'].createElement(
                    _reactBootstrapLibModal2['default'].Footer,
                    null,
                    _react2['default'].createElement(_processButton2['default'], _extends({ bsStyle: 'info', ref: 'saveButton', onClick: this.save.bind(this)
                    }, this.state.saveButton)),
                    _react2['default'].createElement(_processButton2['default'], _extends({ bsStyle: 'success', ref: 'saveDraftButton', onClick: this.saveDraft.bind(this)
                    }, this.state.draftButton)),
                    _react2['default'].createElement(
                        _reactBootstrapLibButton2['default'],
                        { bsStyle: 'danger', onClick: this.props.closeApplyModal },
                        '退出'
                    )
                )
            );
        }
    }]);

    return ApplyModal;
})(_react.Component);

exports['default'] = ApplyModal;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});