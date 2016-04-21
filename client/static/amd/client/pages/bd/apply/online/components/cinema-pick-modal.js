'use strict';

define(["/amd/node_modules/react-bootstrap/lib/Modal.js","/amd/node_modules/react-bootstrap/lib/Button.js","/amd/node_modules/react-bootstrap/lib/Input.js","/amd/client/components/common/my-table.js","/amd/client/components/util/bdAjax.js","/amd/node_modules/classnames/index.js","/amd/client/pages/bd/apply/online/dom/modal-enter-helper.js"], function (ref_1,ref_2,ref_3,ref_4,ref_5,ref_6,ref_7) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-bootstrap/lib/Modal":{"index":0,"path":"node_modules/react-bootstrap/lib/Modal.js"},"react-bootstrap/lib/Button":{"index":1,"path":"node_modules/react-bootstrap/lib/Button.js"},"react-bootstrap/lib/Input":{"index":2,"path":"node_modules/react-bootstrap/lib/Input.js"},"../../../../../components/common/my-table":{"index":3,"path":"client/components/common/my-table.js"},"../../../../../components/util/bdAjax":{"index":4,"path":"client/components/util/bdAjax.js"},"classnames":{"index":5,"path":"node_modules/classnames/index.js"},"../dom/modal-enter-helper":{"index":6,"path":"client/pages/bd/apply/online/dom/modal-enter-helper.js"}};
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

var _classnames = cmd2amdLoadModule('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _domModalEnterHelper = cmd2amdLoadModule('../dom/modal-enter-helper');

var _domModalEnterHelper2 = _interopRequireDefault(_domModalEnterHelper);

var SEARCH_BUTTON_TEXT = {
    SEARCH: '搜索',
    SEARCHING: '搜索中...'
};

var CINEMA_TABLE_THS = ['选择', '影院名称', '城市', '地址'];

var CinemaPickModal = (function (_Component) {
    _inherits(CinemaPickModal, _Component);

    function CinemaPickModal() {
        _classCallCheck(this, CinemaPickModal);

        _get(Object.getPrototypeOf(CinemaPickModal.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            tableData: {
                ths: CINEMA_TABLE_THS,
                trs: []
            },
            searchButtonText: SEARCH_BUTTON_TEXT.SEARCH,
            searchButtonDisabled: false,
            searchUrl: "/api/online/apply/bd/" + window.User.misId + "/applies.json",
            searchInputText: '',
            cinemaMap: {},
            cinemaData: [],
            showCannotApply: false
        };
    }

    _createClass(CinemaPickModal, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                tableData: {
                    ths: CINEMA_TABLE_THS,
                    trs: []
                },
                searchInputText: '',
                cinemaMap: {},
                cinemaData: [],
                showCannotApply: false
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'onModalHide',
        value: function onModalHide() {
            console.log('on Modal HIde');
        }
    }, {
        key: 'selectedCinemaChanged',
        value: function selectedCinemaChanged(event) {
            var id = undefined,
                checked = undefined;
            id = event.target.id;
            checked = event.target.checked;
            if (this.state.cinemaMap[id]) {
                this.state.cinemaMap[id].checked = checked;
            }
        }
    }, {
        key: 'onSearchInputKeyUp',
        value: function onSearchInputKeyUp(evt) {
            if (evt.keyCode === 13) {
                this.searchCinemas();
            }
        }
    }, {
        key: 'searchCinemas',
        value: function searchCinemas() {
            if (this.state.searchInputText.length === 0) {
                toastr.warning('影院名不能为空！');
                return;
            }
            this.setState({
                searchButtonText: SEARCH_BUTTON_TEXT.SEARCHING,
                searchButtonDisabled: true
            });
            this.searchByCinema(this.state.searchInputText);
        }
    }, {
        key: 'searchByCinema',
        value: function searchByCinema(name) {
            var _this = this;

            (0, _componentsUtilBdAjax2['default'])({
                url: '/api/cinema/search.json?query=' + name
            }).then(function (data) {
                _this.state.cinemaData = data.data;
                _this.updateTable(data.data, false);
            }).fail(function () {}).always(function () {
                _this.setState({
                    searchButtonText: SEARCH_BUTTON_TEXT.SEARCH,
                    searchButtonDisabled: false
                });
            });
        }
    }, {
        key: 'updateTable',
        value: function updateTable(cinemas, showCannotApply) {
            var trs = this.makeTrs(cinemas, showCannotApply);
            this.setState({
                tableData: {
                    ths: CINEMA_TABLE_THS,
                    trs: trs
                }
            });
        }
    }, {
        key: 'makeTrs',
        value: function makeTrs(cinemas, showCannotApply) {
            var _this2 = this;

            this.state.cinemaMap = {};
            var canApplyTrs = [],
                cannotApplyTrs = [];
            cinemas.forEach(function (info) {
                var checkboxId = 'cinema-checkbox-' + info.id;
                _this2.state.cinemaMap[checkboxId] = info;
                var checkbox = _react2['default'].createElement('input', { type: 'checkbox', id: checkboxId, onChange: _this2.selectedCinemaChanged.bind(_this2) });
                if (info.canApply) {
                    canApplyTrs.push([checkbox, info.name, info.city, info.address]);
                } else {
                    cannotApplyTrs.push([info.stateDesc, info.name, info.city, info.address]);
                }
            });
            var trs = [].concat(canApplyTrs);
            if (cannotApplyTrs.length !== -1) {
                trs.push([function () {
                    return function (style, rowSpan, tdKey) {
                        var text = undefined,
                            className = undefined;
                        text = showCannotApply ? '收起' : '展示';
                        className = (0, _classnames2['default'])('glyphicon', {
                            'glyphicon-chevron-down': !showCannotApply,
                            'glyphicon-chevron-up': showCannotApply
                        });
                        return _react2['default'].createElement(
                            'td',
                            { style: style, rowSpan: rowSpan, key: tdKey, colSpan: CINEMA_TABLE_THS.length },
                            _react2['default'].createElement(
                                'a',
                                { onClick: _this2.onShowCannotApplyClick.bind(_this2) },
                                _react2['default'].createElement(
                                    'h5',
                                    null,
                                    _react2['default'].createElement(
                                        'span',
                                        null,
                                        text
                                    ),
                                    '全部影院（不可勾选）',
                                    _react2['default'].createElement('i', { className: className })
                                )
                            )
                        );
                    };
                }]);
                if (showCannotApply) {
                    trs = trs.concat(cannotApplyTrs);
                }
            }
            return trs;
        }
    }, {
        key: 'onShowCannotApplyClick',
        value: function onShowCannotApplyClick() {
            this.updateTable(this.state.cinemaData, !this.state.showCannotApply);
            this.state.showCannotApply = !this.state.showCannotApply;
        }
    }, {
        key: 'onSearchTextChange',
        value: function onSearchTextChange() {
            this.setState({ searchInputText: this.refs.searchInput.getValue().trim() });
        }
    }, {
        key: 'onCinemasSelectedConfirm',
        value: function onCinemasSelectedConfirm() {
            if (this.props.onCinemasSelected) {
                var selectedCinemas = [];
                for (var cinemaId in this.state.cinemaMap) {
                    if (this.state.cinemaMap.hasOwnProperty(cinemaId) && this.state.cinemaMap[cinemaId].checked) {
                        selectedCinemas.push(this.state.cinemaMap[cinemaId]);
                    }
                }
                if (selectedCinemas.length === 0) {
                    this.cinemasSelectedConfirmWarn();
                } else {
                    this.reset();
                    this.props.onCinemasSelected(selectedCinemas);
                }
            } else {
                this.cinemasSelectedConfirmWarn();
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.state.searchInputText = '';
            this.state.cinemaMap = {};
            this.state.tableData.trs = [];
        }
    }, {
        key: 'onCinemasAddConfirm',
        value: function onCinemasAddConfirm() {
            cosole.log('onCinemasAddConfirm');
        }
    }, {
        key: 'cinemasSelectedConfirmWarn',
        value: function cinemasSelectedConfirmWarn() {
            toastr.warning("您没有选择影院，无法完成申请！");
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                _reactBootstrapLibModal2['default'],
                { show: this.props.show, onHide: this.onModalHide.bind(this),
                    onEnter: _domModalEnterHelper2['default'],
                    className: 'bd-home' },
                _react2['default'].createElement(
                    _reactBootstrapLibModal2['default'].Header,
                    null,
                    _react2['default'].createElement(
                        _reactBootstrapLibButton2['default'],
                        { className: 'close', onClick: this.props.closeCinemaModal },
                        _react2['default'].createElement(
                            'span',
                            { 'aria-hidden': 'true' },
                            '×'
                        )
                    ),
                    _react2['default'].createElement(
                        _reactBootstrapLibModal2['default'].Title,
                        null,
                        this.props.title
                    )
                ),
                _react2['default'].createElement(
                    _reactBootstrapLibModal2['default'].Body,
                    null,
                    _react2['default'].createElement(
                        'h4',
                        null,
                        '选择影院'
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'form-inline' },
                        _react2['default'].createElement(_reactBootstrapLibInput2['default'], { type: 'text', ref: 'searchInput', onChange: this.onSearchTextChange.bind(this), value: this.state.searchInputText,
                            onKeyUp: this.onSearchInputKeyUp.bind(this) }),
                        _react2['default'].createElement(
                            _reactBootstrapLibButton2['default'],
                            { bsStyle: 'primary', disabled: this.state.searchButtonDisabled, style: { 'marginLeft': '5px' },
                                onClick: this.searchCinemas.bind(this) },
                            this.state.searchButtonText
                        )
                    ),
                    _react2['default'].createElement('br', null),
                    _react2['default'].createElement(_componentsCommonMyTable2['default'], { data: this.state.tableData })
                ),
                _react2['default'].createElement(
                    _reactBootstrapLibModal2['default'].Footer,
                    null,
                    _react2['default'].createElement(
                        'span',
                        { className: 'inform-message' },
                        '提示：如果没有找到您需要的影院，请先缩小搜索的关键词（如：搜索"CGV"，而不是 "CGV奥体店"）。若确认影院尚未入库，请在邮件中注明影院8位编码，联系城市品控（',
                        _react2['default'].createElement(
                            'span',
                            { className: 'red-tip' },
                            'qc.avatar@meituan.com'
                        ),
                        '）新建影院。'
                    ),
                    _react2['default'].createElement(
                        _reactBootstrapLibButton2['default'],
                        { bsStyle: 'info', onClick: this.onCinemasSelectedConfirm.bind(this) },
                        this.props.operateText
                    )
                )
            );
        }
    }]);

    return CinemaPickModal;
})(_react.Component);

exports['default'] = CinemaPickModal;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});