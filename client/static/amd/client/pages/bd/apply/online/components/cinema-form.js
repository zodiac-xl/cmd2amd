'use strict';

define(["/amd/node_modules/react-bootstrap/lib/Button.js","/amd/node_modules/react-bootstrap/lib/Input.js","/amd/node_modules/classnames/index.js","/amd/client/components/util/bdAjax.js","/amd/client/pages/bd/apply/online/bind/react-path-link.js","/amd/client/pages/bd/apply/online/bind/react-checked-mask-path-link.js","/amd/client/pages/bd/apply/online/bind/react-checked-equal-path-link.js","/amd/client/pages/bd/apply/online/components/toggle-union-input.js","/amd/client/pages/bd/apply/online/components/machine-form.js"], function (ref_1,ref_2,ref_3,ref_4,ref_5,ref_6,ref_7,ref_8,ref_9) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-bootstrap/lib/Button":{"index":0,"path":"node_modules/react-bootstrap/lib/Button.js"},"react-bootstrap/lib/Input":{"index":1,"path":"node_modules/react-bootstrap/lib/Input.js"},"classnames":{"index":2,"path":"node_modules/classnames/index.js"},"../../../../../components/util/bdAjax":{"index":3,"path":"client/components/util/bdAjax.js"},"../bind/react-path-link":{"index":4,"path":"client/pages/bd/apply/online/bind/react-path-link.js"},"../bind/react-checked-mask-path-link":{"index":5,"path":"client/pages/bd/apply/online/bind/react-checked-mask-path-link.js"},"../bind/react-checked-equal-path-link":{"index":6,"path":"client/pages/bd/apply/online/bind/react-checked-equal-path-link.js"},"./toggle-union-input":{"index":7,"path":"client/pages/bd/apply/online/components/toggle-union-input.js"},"./machine-form":{"index":8,"path":"client/pages/bd/apply/online/components/machine-form.js"}};
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

var _machineForm = cmd2amdLoadModule('./machine-form');

var _machineForm2 = _interopRequireDefault(_machineForm);

var CINEMA_OPERATE_TEXT = {
    EXPAND: '展开影院',
    SHRINK: '收起影院'
};

var CinemaForm = (function (_Component) {
    _inherits(CinemaForm, _Component);

    function CinemaForm() {
        _classCallCheck(this, CinemaForm);

        _get(Object.getPrototypeOf(CinemaForm.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            showBody: false,
            cinemaOperateText: CINEMA_OPERATE_TEXT.EXPAND,
            cinema: {}
        };
    }

    _createClass(CinemaForm, [{
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
        value: function checkForm(submit) {
            var cinema = this.state.cinema;
            if (!/\d{8}/.test($.trim(cinema.cinemaNo))) {
                return cinema.cinemaName + ': 影院8位编码不能为空！';
            }

            if (!/\d/.test($.trim(cinema.boxOffice))) {
                return cinema.cinemaName + ': 票房不能为空！';
            }

            //该input使用datepick导致无法数据绑定,这里用这种方式塞进去
            //以后再研究这种case？
            var cinemaOpenDateInput = this.refs.cinemaOpenDate;
            if (cinemaOpenDateInput) {
                cinema.openDate = cinemaOpenDateInput.getValue();
            }

            if (!/\d{4}-\d{2}-\d{2}/.test($.trim(cinema.openDate))) {
                return cinema.cinemaName + ': 开业时间不能为空！';
            }

            var cinemaContacts = cinema.cinemaContacts || [];
            var idx = undefined,
                ln = undefined,
                cinemaContact = undefined;
            ln = cinemaContacts.length;
            for (idx = 0; idx < ln; idx++) {
                cinemaContact = cinemaContacts[idx];
                if (!cinemaContact.name || !cinemaContact.phone) {
                    return cinema.cinemaName + ': 客服联系人姓名或者电话不能为空！';
                }
            }

            var assist = cinema.assist || {};
            var financeContact = cinema.financeContact || {};
            if (assist.needAccountChecking && (!financeContact.name || !financeContact.phone)) {
                return cinema.cinemaName + ': 影院独立结账时，财务联系人姓名和电话不能为空！';
            }

            if (assist.refundType === 0 && !cinema.refundTime) {
                return cinema.cinemaName + '： 请填写自助退票时间！';
            }

            if (assist.hasChildPref && !cinema.childPref) {
                return cinema.cinemaName + ': 儿童票选中时，儿童票描述内容不能为空！';
            }

            if (assist.glassCheckType === 1) {
                if (!$.isNumeric(assist.glassDeposit) || assist.glassDeposit <= 0) {
                    return cinema.cinemaName + ': 选中押金时，请正确填写押金金额！';
                }
            } else if (assist.glassCheckType === 2) {
                if (!$.isNumeric(assist.glassPurchase) || assist.glassPurchase <= 0) {
                    return cinema.cinemaName + ': 选中自费购买时，请正确填写金额！';
                }
            }

            if (assist.canPark && !cinema.park) {
                return cinema.cinemaName + ': 可停车厅勾选时，请填写停车位信息!';
            }

            if (assist.hasIMax && !cinema.imaxHall) {
                return cinema.cinemaName + ': IMAX厅勾选时，请填写IMAX厅信息!';
            }

            if (assist.canUseCredit && !cinema.useCredit) {
                return cinema.cinemaName + ': 可刷卡选项勾选时，请填写刷卡信息！';
            }

            if (assist.hasCoupleHall && !cinema.coupleHall) {
                return cinema.cinemaName + ': 情侣厅勾选时，请填写情侣厅信息！';
            }

            if (assist.hasWifi && !cinema.wifi) {
                return cinema.cinemaName + ': WIFI勾选时，请填写WIFI信息！';
            }

            var machineForm = this.refs.machineForm;
            if (machineForm && machineForm.checkForm) {
                return machineForm.checkForm(cinema, submit);
            }

            return true;
        }
    }, {
        key: 'deleteCinema',
        value: function deleteCinema() {
            if (this.props.deleteCinema) {
                this.props.deleteCinema(this.props.cinema.cinemaId);
            }
        }
    }, {
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
        key: 'addCinemaContact',
        value: function addCinemaContact() {
            var contacts = this.state.cinema.cinemaContacts || [];
            if (contacts.length < 5) {
                contacts.push({});
            } else {
                toastr.warning('最多添加5个客服联系人!');
            }
            this.setState({
                cinema: this.state.cinema
            });
        }
    }, {
        key: 'deleteCinemaContact',
        value: function deleteCinemaContact(idx) {
            var contacts = this.state.cinema.cinemaContacts || [];
            contacts.splice(idx, 1);
            this.setState({
                cinema: this.state.cinema
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var panelBodyClassNames = (0, _classnames2['default'])('panel-body', 'form-inline', 'com-margin', 'customCollapse', 'panel-collapse', 'collapse', {
                'in': this.state.showBody
            });

            var cinema = this.state.cinema;
            cinema.assist = cinema.assist || {};

            var accountStyle = {
                display: cinema.assist.needAccountChecking ? 'block' : 'none'
            };

            var ticketReturnStyle = {
                display: cinema.assist.needTicketReturnSetting ? 'block' : 'none'
            };

            var cinemaContacts = cinema.cinemaContacts || [];
            var i = undefined,
                ln = undefined;
            ln = cinemaContacts.length;
            var contactComponents = [];
            for (i = 1; i < ln; i++) {
                var contact = cinemaContacts[i];
                contactComponents.push(_react2['default'].createElement(
                    'div',
                    { key: 'contact' + contact.id },
                    _react2['default'].createElement(
                        'span',
                        null,
                        _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm contacts-margin',
                            placeholder: '客服联系人姓名',
                            valueLink: this.pathLink('cinema.cinemaContacts[' + i + '].name') })
                    ),
                    _react2['default'].createElement(
                        'span',
                        { className: 'margin-left-10' },
                        '联系电话：',
                        _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm',
                            placeholder: '联系电话',
                            valueLink: this.pathLink('cinema.cinemaContacts[' + i + '].phone') })
                    ),
                    _react2['default'].createElement(
                        _reactBootstrapLibButton2['default'],
                        { className: 'btn-sm margin-left-10', bsStyle: 'default',
                            onClick: this.deleteCinemaContact.bind(this, i) },
                        '删除联系人'
                    )
                ));
            }

            return _react2['default'].createElement(
                'div',
                { id: 'applyComponent' },
                _react2['default'].createElement(
                    'div',
                    { className: 'basic panel panel-primary input-group-sm' },
                    _react2['default'].createElement(
                        'div',
                        { className: 'panel-heading' },
                        _react2['default'].createElement(
                            'span',
                            { className: 'componentCinemaName cinema-name' },
                            cinema.cinemaName
                        ),
                        ' ',
                        _react2['default'].createElement(
                            'span',
                            { className: 'cinemaIdSpan' },
                            'ID:' + cinema.cinemaId
                        ),
                        _react2['default'].createElement(
                            'span',
                            { className: 'btn-group-sm btn-group-customer' },
                            _react2['default'].createElement(
                                _reactBootstrapLibButton2['default'],
                                { bsStyle: 'info', className: 'controlCinema', onClick: this.toggleCinemaInfo.bind(this) },
                                _react2['default'].createElement(
                                    'span',
                                    { className: 'hideOrShowCinema' },
                                    this.state.cinemaOperateText
                                ),
                                _react2['default'].createElement('span', { className: 'caret' })
                            ),
                            _react2['default'].createElement(
                                _reactBootstrapLibButton2['default'],
                                { className: 'deleteCinema', bsStyle: 'danger', onClick: this.deleteCinema.bind(this) },
                                '删除影院'
                            )
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
                                null,
                                '8位编码：',
                                _react2['default'].createElement('input', { className: 'form-control input-sm', type: 'text', placeholder: '请输入8位编码',
                                    valueLink: this.pathLink('cinema.cinemaNo') })
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'margin-left-10' },
                                '2014年票房：',
                                _react2['default'].createElement('input', { className: 'form-control input-sm', type: 'text',
                                    placeholder: '新影城请填0', size: '15',
                                    valueLink: this.pathLink('cinema.boxOffice') }),
                                '万元'
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'margin-left-10' },
                                '开业时间：',
                                _react2['default'].createElement(
                                    'span',
                                    { style: { position: 'relative' } },
                                    _react2['default'].createElement(_reactBootstrapLibInput2['default'], { ref: 'cinemaOpenDate', className: 'form-control input-sm J_datePicker', size: '20', type: 'text',
                                        placeholder: '新影城填预估开业时间',
                                        'data-default-date': cinema.openDate
                                    })
                                )
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            '已合作第三方：',
                            _react2['default'].createElement(
                                'label',
                                { className: 'checkbox-inline margin-left-10' },
                                _react2['default'].createElement(_reactBootstrapLibInput2['default'], { type: 'checkbox',
                                    checkedLink: this.checkedMaskPathLink('cinema.otherCoop', 1) }),
                                '格瓦拉'
                            ),
                            _react2['default'].createElement(
                                'label',
                                { className: 'checkbox-inline margin-left-10' },
                                _react2['default'].createElement(_reactBootstrapLibInput2['default'], { type: 'checkbox',
                                    checkedLink: this.checkedMaskPathLink('cinema.otherCoop', 2) }),
                                '时光网'
                            ),
                            _react2['default'].createElement(
                                'label',
                                { className: 'checkbox-inline margin-left-10' },
                                _react2['default'].createElement('input', { type: 'checkbox',
                                    checkedLink: this.checkedMaskPathLink('cinema.otherCoop', 4) }),
                                '网票网'
                            ),
                            _react2['default'].createElement(
                                'label',
                                { className: 'checkbox-inline margin-left-10' },
                                _react2['default'].createElement('input', { type: 'checkbox',
                                    checkedLink: this.checkedMaskPathLink('cinema.otherCoop', 8) }),
                                '微信'
                            ),
                            _react2['default'].createElement(
                                'label',
                                { className: 'checkbox-inline margin-left-10' },
                                _react2['default'].createElement('input', { type: 'checkbox',
                                    checkedLink: this.checkedMaskPathLink('cinema.otherCoop', 16) }),
                                '其他'
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            { className: 'contactArea' },
                            _react2['default'].createElement(
                                'div',
                                null,
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    '客服联系人：',
                                    _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm',
                                        placeholder: '客服联系人姓名',
                                        valueLink: this.pathLink('cinema.cinemaContacts[0].name') })
                                ),
                                _react2['default'].createElement(
                                    'span',
                                    { className: 'margin-left-10' },
                                    '联系电话：',
                                    _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm',
                                        placeholder: '联系电话',
                                        valueLink: this.pathLink('cinema.cinemaContacts[0].phone') })
                                ),
                                _react2['default'].createElement(
                                    _reactBootstrapLibButton2['default'],
                                    { className: 'btn-sm margin-left-10', bsStyle: 'default',
                                        onClick: this.addCinemaContact.bind(this) },
                                    '增加客服联系人'
                                )
                            ),
                            contactComponents
                        ),
                        _react2['default'].createElement(
                            'div',
                            { style: accountStyle },
                            _react2['default'].createElement(
                                'span',
                                null,
                                '财务联系人：',
                                _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm',
                                    placeholder: '财务联系人姓名',
                                    valueLink: this.pathLink('cinema.financeContact.name') })
                            ),
                            _react2['default'].createElement(
                                'span',
                                { className: 'margin-left-10' },
                                '联系电话：',
                                _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm', placeholder: '联系电话',
                                    valueLink: this.pathLink('cinema.financeContact.phone') })
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            { style: ticketReturnStyle },
                            '退票设置：',
                            _react2['default'].createElement(
                                'label',
                                { className: 'radio-inline' },
                                _react2['default'].createElement('input', { type: 'radio', name: 'refundTimeSub',
                                    checkedLink: this.checkedEqualPathLink('cinema.assist.refundType', 0) }),
                                '开场前：'
                            ),
                            _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm', size: '4',
                                disabled: cinema.assist.refundType !== 0,
                                valueLink: this.pathLink('cinema.refundTime') }),
                            '分钟用户可以自助退票',
                            _react2['default'].createElement(
                                'label',
                                { className: 'radio-inline margin-left-10' },
                                _react2['default'].createElement('input', { type: 'radio', name: 'refundTimeSub',
                                    checkedLink: this.checkedEqualPathLink('cinema.assist.refundType', 1) }),
                                '不支持用户自主退票'
                            )
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            '值班电话(非必填)：',
                            _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm',
                                valueLink: this.pathLink('cinema.dutyPhone') })
                        ),
                        _react2['default'].createElement('hr', null),
                        _react2['default'].createElement(
                            'div',
                            null,
                            '儿童优惠：',
                            _react2['default'].createElement(_toggleUnionInput2['default'], {
                                type: 'checkbox',
                                title: '儿童票',
                                size: '40',
                                placeholder: '举例：1.3m一下儿童观看2D普通影片免票无座，需家长陪同，3D以及动画片半价',
                                checkedLink: this.pathLink('cinema.assist.hasChildPref'),
                                valueLink: this.pathLink('cinema.childPref') })
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            '3D眼镜：',
                            _react2['default'].createElement(
                                'label',
                                { className: 'radio-inline' },
                                _react2['default'].createElement('input', { type: 'radio',
                                    checkedLink: this.checkedEqualPathLink('cinema.assist.glassCheckType', 0) }),
                                '免押金'
                            ),
                            _react2['default'].createElement(
                                'label',
                                { className: 'radio-inline margin-left-10' },
                                _react2['default'].createElement('input', { type: 'radio',
                                    checkedLink: this.checkedEqualPathLink('cinema.assist.glassCheckType', 1) }),
                                '需要押金'
                            ),
                            _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm', placeholder: '金额', size: '4',
                                disabled: cinema.assist.glassCheckType !== 1,
                                valueLink: this.pathLink('cinema.assist.glassDeposit') }),
                            _react2['default'].createElement(
                                'label',
                                { className: 'radio-inline margin-left-10' },
                                _react2['default'].createElement('input', { type: 'radio',
                                    checkedLink: this.checkedEqualPathLink('cinema.assist.glassCheckType', 2) }),
                                '不提供3D眼镜，自费购买'
                            ),
                            _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm', placeholder: '金额', size: '4',
                                disabled: cinema.assist.glassCheckType !== 2,
                                valueLink: this.pathLink('cinema.assist.glassPurchase') })
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            '停车信息：',
                            _react2['default'].createElement(_toggleUnionInput2['default'], {
                                type: 'checkbox',
                                title: '可停车',
                                size: '100',
                                placeholder: '请填写停车场位置，以及是否免费或凭票根免费，免费多久.举例：商场地下一层有停车场，23：30前免费，23：30后凭票根免费停3个小时',
                                checkedLink: this.pathLink('cinema.assist.canPark'),
                                valueLink: this.pathLink('cinema.park') })
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            'IMAX厅：',
                            _react2['default'].createElement(_toggleUnionInput2['default'], {
                                type: 'checkbox',
                                title: '有IMAX厅',
                                size: '90',
                                placeholder: '请填写IMAX厅描述，如座位数、屏幕尺寸等。举例：468个座位，屏幕尺寸17米*9米',
                                checkedLink: this.pathLink('cinema.assist.hasIMax'),
                                valueLink: this.pathLink('cinema.imaxHall') })
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            '影院公告：',
                            _react2['default'].createElement('input', { type: 'text', className: 'form-control input-sm', size: '90',
                                placeholder: '请填写影院要求公示的说明，如：会员卡信息及周二半价日等',
                                valueLink: this.pathLink('cinema.note') })
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            '情侣座：',
                            _react2['default'].createElement(_toggleUnionInput2['default'], {
                                type: 'checkbox',
                                title: '情侣座',
                                size: '90',
                                placeholder: '请填写哪些影厅有情侣座，或某个影厅某几排是情侣座，举例：3号厅，5号厅最后一排有情侣座',
                                checkedLink: this.pathLink('cinema.assist.hasCoupleHall'),
                                valueLink: this.pathLink('cinema.coupleHall') })
                        ),
                        _react2['default'].createElement(
                            'div',
                            null,
                            'WI-FI：',
                            _react2['default'].createElement(_toggleUnionInput2['default'], {
                                type: 'checkbox',
                                title: '有WIFI',
                                size: '60',
                                placeholder: '影院提供免费wifi',
                                checkedLink: this.pathLink('cinema.assist.hasWifi'),
                                valueLink: this.pathLink('cinema.wifi') })
                        ),
                        _react2['default'].createElement('hr', null),
                        _react2['default'].createElement(_machineForm2['default'], { ref: 'machineForm', machine: cinema.machine || {} })
                    )
                )
            );
        }
    }], [{
        key: 'propTypes',
        value: {
            cinema: _react2['default'].PropTypes.object.isRequired
        },
        enumerable: true
    }]);

    return CinemaForm;
})(_react.Component);

exports['default'] = CinemaForm;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});