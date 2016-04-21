'use strict';

define(["/amd/client/components/common/my-table.js","/amd/client/components/layout/page-layout.js","/amd/client/components/util/bdAjax.js","/amd/client/pages/bd/apply/online/components/cinema-pick-modal.js","/amd/client/pages/bd/apply/online/components/apply-modal.js","/amd/client/pages/bd/apply/online/components/apply-view-modal.js","/amd/client/components/common/pagination-advanced.js","/amd/node_modules/react-bootstrap/lib/Button.js","/amd/client/components/util/url.js"], function (ref_0,ref_1,ref_2,ref_3,ref_4,ref_5,ref_6,ref_7,ref_8) {

    var cmd2amdModules = {"../../../../components/common/my-table":{"index":0,"path":"client/components/common/my-table.js"},"../../../../components/layout/page-layout":{"index":1,"path":"client/components/layout/page-layout.js"},"../../../../components/util/bdAjax":{"index":2,"path":"client/components/util/bdAjax.js"},"./components/cinema-pick-modal":{"index":3,"path":"client/pages/bd/apply/online/components/cinema-pick-modal.js"},"./components/apply-modal":{"index":4,"path":"client/pages/bd/apply/online/components/apply-modal.js"},"./components/apply-view-modal":{"index":5,"path":"client/pages/bd/apply/online/components/apply-view-modal.js"},"../../../../components/common/pagination-advanced":{"index":6,"path":"client/components/common/pagination-advanced.js"},"react-bootstrap/lib/Button":{"index":7,"path":"node_modules/react-bootstrap/lib/Button.js"},"../../../../components/util/url":{"index":8,"path":"client/components/util/url.js"}};
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

var _componentsCommonMyTable = cmd2amdLoadModule('../../../../components/common/my-table');

var _componentsCommonMyTable2 = _interopRequireDefault(_componentsCommonMyTable);

var _componentsLayoutPageLayout = cmd2amdLoadModule('../../../../components/layout/page-layout');

var _componentsLayoutPageLayout2 = _interopRequireDefault(_componentsLayoutPageLayout);

var _componentsUtilBdAjax = cmd2amdLoadModule('../../../../components/util/bdAjax');

var _componentsUtilBdAjax2 = _interopRequireDefault(_componentsUtilBdAjax);

var _componentsCinemaPickModal = cmd2amdLoadModule('./components/cinema-pick-modal');

var _componentsCinemaPickModal2 = _interopRequireDefault(_componentsCinemaPickModal);

var _componentsApplyModal = cmd2amdLoadModule('./components/apply-modal');

var _componentsApplyModal2 = _interopRequireDefault(_componentsApplyModal);

var _componentsApplyViewModal = cmd2amdLoadModule('./components/apply-view-modal');

var _componentsApplyViewModal2 = _interopRequireDefault(_componentsApplyViewModal);

var _componentsCommonPaginationAdvanced = cmd2amdLoadModule('../../../../components/common/pagination-advanced');

var _componentsCommonPaginationAdvanced2 = _interopRequireDefault(_componentsCommonPaginationAdvanced);

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _componentsUtilUrl = cmd2amdLoadModule('../../../../components/util/url');

var _componentsUtilUrl2 = _interopRequireDefault(_componentsUtilUrl);

var APPLY_TABLE_THS = ['上线申请ID', '最后编辑时间', '状态', '关联影院(数)', '操作'];

var CINEMA_MODAL_TITLE = {
    NEW_APPLY: '新建影院上线',
    ADD: '添加影院'
};

var CINEMA_MODAL_OPERATE_TEXT = {
    NEW_APPLY: '确认选择影院',
    ADD: '确认添加影院'
};

var CINEMA_MODAL_STATE = {
    NEW_APPLY: 0,
    ADD: 1
};

var Online = (function (_Page) {
    _inherits(Online, _Page);

    function Online() {
        _classCallCheck(this, _Online);

        _get(Object.getPrototypeOf(_Online.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            applies: {
                ths: APPLY_TABLE_THS,
                trs: []
            },
            appliesUrl: "/api/online/apply/bd/" + window.User.misId + "/applies.json",
            showCinemaModalFlag: false,
            showApplyModalFlag: false,
            showApplyViewModalFlag: false,
            applyId: 0,
            applyAudit: {},
            selectedCinemas: [],
            cinemaModalTitle: CINEMA_MODAL_TITLE.NEW_APPLY,
            cinemaModalOperateText: CINEMA_MODAL_OPERATE_TEXT.NEW_APPLY,
            cinemaModalState: CINEMA_MODAL_STATE.NEW_APPLY,
            applyInEditing: true,
            query: {}
        };
    }

    _createClass(Online, [{
        key: 'queryHandler',
        value: function queryHandler(query) {
            var _this2 = this;

            var _this = this;

            query = $.extend(_this.state.query, query || {});

            (0, _componentsUtilBdAjax2['default'])({
                url: this.state.appliesUrl,
                type: 'GET',
                data: query || {},
                des: '获取上线申请列表'
            }).then(function (applies) {
                var totalSize = applies.totalSize;
                var trs = [];
                applies.data.forEach(function (apply) {
                    var tds = [];
                    tds.push(apply.id);
                    tds.push(apply.modified);
                    if (apply.state === 2) {
                        tds.push('被驳回:' + apply.stateDesc);
                    } else {
                        tds.push(apply.stateDesc);
                    }
                    tds.push(apply.cinemaDesc);

                    if (apply.state === 3 || apply.state === 4) {
                        var click = _this2.viewApply.bind(_this2, apply.id, apply);
                        tds.push(React.createElement(
                            _reactBootstrapLibButton2['default'],
                            { onClick: click },
                            '查看上线资料'
                        ));
                    } else {
                        var click = _this2.editApply.bind(_this2, apply.id, apply);
                        tds.push(React.createElement(
                            _reactBootstrapLibButton2['default'],
                            { onClick: click },
                            '编辑'
                        ));
                    }

                    trs.push(tds);
                });
                _this2.setState({
                    applies: {
                        ths: APPLY_TABLE_THS,
                        trs: trs
                    },
                    query: query
                });
                _this2.refs.paginationAdvanced.onQuery(query, totalSize);
            });
        }
    }, {
        key: 'normalQueryHandler',
        value: function normalQueryHandler() {
            var _this = this;
            _this.queryHandler({
                city: _this.refs['city'].value,
                cinema: _this.refs['cinema'].value,
                state: _this.refs['status'].value,
                offset: 0
            });
        }
    }, {
        key: 'editApply',
        value: function editApply(applyId) {
            this.setState({
                showApplyModalFlag: true,
                applyId: applyId,
                selectedCinemas: [],
                applyInEditing: true
            });
        }
    }, {
        key: 'viewApply',
        value: function viewApply(applyId, applyAudit) {
            this.setState({
                showApplyViewModalFlag: true,
                applyId: applyId,
                applyAudit: applyAudit,
                selectedCinemas: []
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var cinema = JSON.parse(_componentsUtilUrl2['default'].getUrlArg("cinema", location.search) || null);
            if (location.search && cinema) {
                if (!cinema[0].canApply) {
                    toastr.warning('该影院已创建上线申请，请联系品控组（avatar-sup@meituan.com）处理。');
                } else {
                    this.onCinemasSelected(cinema);
                }
            }
        }
    }, {
        key: 'newApply',
        value: function newApply() {
            this.setState({
                showCinemaModalFlag: true,
                cinemaModalTitle: CINEMA_MODAL_TITLE.NEW_APPLY,
                cinemaModalOperateText: CINEMA_MODAL_OPERATE_TEXT.NEW_APPLY,
                cinemaModalState: CINEMA_MODAL_STATE.NEW_APPLY
            });
        }
    }, {
        key: 'addCinema',
        value: function addCinema() {
            this.setState({
                showCinemaModalFlag: true,
                showApplyModalFlag: false,
                cinemaModalTitle: CINEMA_MODAL_TITLE.ADD,
                cinemaModalOperateText: CINEMA_MODAL_OPERATE_TEXT.ADD,
                cinemaModalState: CINEMA_MODAL_STATE.ADD
            });
        }
    }, {
        key: 'onCinemasSelected',
        value: function onCinemasSelected(cinemas) {
            if (this.state.cinemaModalState === CINEMA_MODAL_STATE.ADD) {
                cinemas = this.state.selectedCinemas.concat(cinemas);
            }

            var newState = {
                showApplyModalFlag: true,
                showCinemaModalFlag: false,
                selectedCinemas: cinemas,
                applyInEditing: false
            };
            //新建申请需要重置applyId
            if (this.state.cinemaModalTitle === CINEMA_MODAL_TITLE.NEW_APPLY) {
                newState.applyId = 0;
                newState.applyInEditing = true;
            }
            this.setState(newState);
        }
    }, {
        key: 'deleteSelectedCinema',
        value: function deleteSelectedCinema(cinemaId) {
            var cinemas = this.state.selectedCinemas.filter(function (cinema) {
                return cinema.id !== cinemaId;
            });
            this.setState.selectedCinemas = cinemas;
        }
    }, {
        key: 'closeApplyModal',
        value: function closeApplyModal(refresh) {
            this.setState({
                showApplyModalFlag: false
            });

            if (refresh) {
                this.queryHandler();
            }
        }
    }, {
        key: 'closeApplyViewModal',
        value: function closeApplyViewModal() {
            this.setState({
                showApplyViewModalFlag: false
            });
        }
    }, {
        key: 'closeCinemaPickModal',
        value: function closeCinemaPickModal() {
            this.setState({
                showCinemaModalFlag: false
            });
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var _this = this;
            return React.createElement(
                'div',
                { className: 'bd-home' },
                React.createElement(
                    _reactBootstrapLibButton2['default'],
                    { bsStyle: 'success', id: 'newApplyOnline',
                        onClick: this.newApply.bind(this) },
                    '申请上线'
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'span',
                        null,
                        '城市: '
                    ),
                    React.createElement('input', { type: 'text', ref: 'city' }),
                    '    ',
                    React.createElement(
                        'span',
                        null,
                        '影院ID/影院名: '
                    ),
                    React.createElement('input', { type: 'text', ref: 'cinema' }),
                    '    ',
                    React.createElement(
                        'span',
                        null,
                        '状态：',
                        React.createElement(
                            'select',
                            { defaultValue: -1, ref: 'status', onChange: (function (e) {
                                    _this.queryHandler({
                                        state: e.target.value,
                                        offset: 0
                                    });
                                }).bind(_this) },
                            React.createElement(
                                'option',
                                { value: '-1' },
                                '全部'
                            ),
                            React.createElement(
                                'option',
                                { value: '0' },
                                '草稿'
                            ),
                            React.createElement(
                                'option',
                                { value: '1' },
                                '等待审核'
                            ),
                            React.createElement(
                                'option',
                                { value: '2' },
                                '被驳回'
                            ),
                            React.createElement(
                                'option',
                                { value: '3' },
                                '审核通过，上线处理中'
                            ),
                            React.createElement(
                                'option',
                                { value: '4' },
                                '上线处理完成'
                            )
                        )
                    ),
                    '  ',
                    React.createElement(
                        _reactBootstrapLibButton2['default'],
                        {
                            onClick: _this.normalQueryHandler.bind(_this) },
                        '查询'
                    )
                ),
                React.createElement('br', null),
                React.createElement(_componentsCommonMyTable2['default'], { data: this.state.applies }),
                React.createElement(
                    'div',
                    { className: 'pull-right' },
                    React.createElement(_componentsCommonPaginationAdvanced2['default'], { onQueryHandler: _this.queryHandler.bind(_this), ref: 'paginationAdvanced' })
                ),
                React.createElement(_componentsCinemaPickModal2['default'], { show: this.state.showCinemaModalFlag,
                    onCinemasSelected: this.onCinemasSelected.bind(this),
                    title: this.state.cinemaModalTitle,
                    operateText: this.state.cinemaModalOperateText,
                    closeCinemaModal: this.closeCinemaPickModal.bind(this) }),
                React.createElement(_componentsApplyModal2['default'], { show: this.state.showApplyModalFlag,
                    applyId: this.state.applyId,
                    cinemas: this.state.selectedCinemas,
                    deleteCinema: this.deleteSelectedCinema.bind(this),
                    closeApplyModal: this.closeApplyModal.bind(this),
                    addCinema: this.addCinema.bind(this),
                    inEditing: this.state.applyInEditing }),
                React.createElement(_componentsApplyViewModal2['default'], { show: this.state.showApplyViewModalFlag,
                    applyId: this.state.applyId,
                    applyAudit: this.state.applyAudit,
                    closeApplyViewModal: this.closeApplyViewModal.bind(this) })
            );
        }
    }]);

    var _Online = Online;
    Online = (0, _componentsLayoutPageLayout.page)(Online) || Online;
    return Online;
})(_componentsLayoutPageLayout2['default']);

exports['default'] = Online;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});