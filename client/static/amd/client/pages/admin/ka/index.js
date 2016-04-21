'use strict';

define(["css!/amd/client/pages/admin/ka/less/ka.css","/amd/node_modules/react-bootstrap/lib/index.js","/amd/client/components/layout/page-layout.js","/amd/client/components/common/myConfirm.js","/amd/client/components/common/mis-search.js","/amd/client/components/util/bdAjax.js"], function (ref_0,ref_2,ref_3,ref_4,ref_5,ref_6) {

    var cmd2amdModules = {"./less/ka.less":{"index":0,"path":"client/pages/admin/ka/less/ka.less"},"react":{"external":"React","index":null,"path":null},"react-bootstrap":{"index":1,"path":"node_modules/react-bootstrap/lib/index.js"},"../../../components/layout/page-layout":{"index":2,"path":"client/components/layout/page-layout.js"},"../../../components/common/myConfirm":{"index":3,"path":"client/components/common/myConfirm.js"},"../../../components/common/mis-search":{"index":4,"path":"client/components/common/mis-search.js"},"../../../components/util/bdAjax":{"index":5,"path":"client/components/util/bdAjax.js"}};
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

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

cmd2amdLoadModule('./less/ka.less');

var _react = cmd2amdLoadModule('react');

var _reactBootstrap = cmd2amdLoadModule('react-bootstrap');

var _componentsLayoutPageLayout = cmd2amdLoadModule('../../../components/layout/page-layout');

var _componentsLayoutPageLayout2 = _interopRequireDefault(_componentsLayoutPageLayout);

var _componentsCommonMyConfirm = cmd2amdLoadModule('../../../components/common/myConfirm');

var _componentsCommonMyConfirm2 = _interopRequireDefault(_componentsCommonMyConfirm);

var _componentsCommonMisSearch = cmd2amdLoadModule('../../../components/common/mis-search');

var _componentsCommonMisSearch2 = _interopRequireDefault(_componentsCommonMisSearch);

var _componentsUtilBdAjax = cmd2amdLoadModule('../../../components/util/bdAjax');

var _componentsUtilBdAjax2 = _interopRequireDefault(_componentsUtilBdAjax);

var KaManagement = (function (_Page) {
    _inherits(KaManagement, _Page);

    function KaManagement() {
        _classCallCheck(this, _KaManagement);

        _get(Object.getPrototypeOf(_KaManagement.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            kaList: [],
            updatedKaId: ''
        };
    }

    _createClass(KaManagement, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this = this;

            (0, _componentsUtilBdAjax2['default'])({
                url: '/api/admin/ka/kas.json',
                type: 'GET',
                des: '获取 KA 列表'
            }).done(function (result) {
                return _this.setState({ kaList: result.data || [] });
            });
        }
    }, {
        key: 'showAddKaModal',
        value: function showAddKaModal() {
            var _this2 = this;

            var kaList = Object.assign(this.state.kaList);
            var ajaxOptions = {
                url: '/api/admin/ka/kas.json',
                type: 'POST',
                des: '增加 KA 和影院列表'
            };
            var onChange = function onChange(cinemaIds, ka) {
                if (cinemaIds === undefined) cinemaIds = [];

                kaList.push(ka);
                ajaxOptions.data = { userId: ka.userId, cinemaIds: JSON.stringify(cinemaIds) };
            };
            (0, _componentsCommonMyConfirm2['default'])(React.createElement(KaModalBody, { onChange: onChange }), '增加 KA', ajaxOptions, {
                isCanSubmit: function isCanSubmit() {
                    var _ref = ajaxOptions.data || {};

                    var userId = _ref.userId;

                    if (!userId) toastr.error('KA 不能为空');
                    return userId;
                }
            }).done(function () {
                return _this2.setState({ kaList: kaList });
            });
        }
    }, {
        key: 'showUpdateKaModal',
        value: function showUpdateKaModal(ka) {
            var _this3 = this;

            var isUpdate = true;
            var ajaxOptions = {
                url: '/api/admin/ka/' + ka.userId + '/cinemas.json',
                type: 'PUT',
                des: '更新 KA 影院列表'
            };
            var onChange = function onChange() {
                var cinemaIds = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

                ajaxOptions.data = { cinemaIds: JSON.stringify(cinemaIds) };
            };
            (0, _componentsCommonMyConfirm2['default'])(React.createElement(KaModalBody, { onChange: onChange, isUpdate: isUpdate, ka: ka }), '替换影院列表', ajaxOptions, {
                isCanSubmit: function isCanSubmit() {
                    var _ref2 = ajaxOptions.data || {};

                    var cinemaIds = _ref2.cinemaIds;

                    var canSubmit = cinemaIds && !!JSON.parse(cinemaIds).length;
                    if (!canSubmit) toastr.error('影院列表不能为空');
                    return canSubmit;
                }
            }).done(function () {
                return _this3.setState({ updatedKaId: ka.userId });
            });
        }
    }, {
        key: 'showDeleteKaModal',
        value: function showDeleteKaModal(ka) {
            var _this4 = this;

            var ajaxOptions = {
                url: '/api/admin/ka/' + ka.userId + '.json',
                type: 'DELETE',
                des: '删除 KA'
            };
            (0, _componentsCommonMyConfirm2['default'])(React.createElement(DeleteKaModalBody, { ka: ka }), '删除 KA', ajaxOptions).done(function () {
                return _this4.setState({
                    kaList: _this4.state.kaList.filter(function (iterKa) {
                        return iterKa.userId !== ka.userId;
                    })
                });
            });
        }
    }, {
        key: 'renderKaList',
        value: function renderKaList() {
            var _this5 = this;

            var _state = this.state;
            var kaList = _state.kaList;
            var updatedKaId = _state.updatedKaId;

            return kaList.map(function (ka) {
                return React.createElement(
                    'tr',
                    { key: ka.key },
                    React.createElement(
                        'td',
                        null,
                        fmtKaName(ka)
                    ),
                    React.createElement(
                        'td',
                        null,
                        React.createElement(ShowCinemasButton, { ka: ka, isUpdated: ka.userId === updatedKaId }),
                        React.createElement(
                            _reactBootstrap.Button,
                            { className: 'btn-operate',
                                onClick: _this5.showUpdateKaModal.bind(_this5, ka) },
                            '替换影院列表'
                        ),
                        React.createElement(
                            _reactBootstrap.Button,
                            { className: 'btn-operate',
                                onClick: _this5.showDeleteKaModal.bind(_this5, ka) },
                            '删除'
                        )
                    )
                );
            });
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            return React.createElement(
                'div',
                { className: 'ka-panel' },
                React.createElement(
                    'b',
                    { className: 'btn btn-danger btn-add-ka', onClick: this.showAddKaModal.bind(this) },
                    '增加 KA'
                ),
                React.createElement(
                    _reactBootstrap.Table,
                    { className: 'table-striped table-bordered' },
                    React.createElement(
                        'thead',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                null,
                                'KA'
                            ),
                            React.createElement(
                                'th',
                                null,
                                '操作'
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        this.renderKaList()
                    )
                )
            );
        }
    }]);

    var _KaManagement = KaManagement;
    KaManagement = (0, _componentsLayoutPageLayout.page)(KaManagement) || KaManagement;
    return KaManagement;
})(_componentsLayoutPageLayout2['default']);

exports['default'] = KaManagement;

var KaModalBody = (function (_Component) {
    _inherits(KaModalBody, _Component);

    function KaModalBody(props) {
        _classCallCheck(this, KaModalBody);

        _get(Object.getPrototypeOf(KaModalBody.prototype), 'constructor', this).call(this, props);
        this.state = {
            fileName: ''
        };
        this.ka = props.ka || {};
        this.cinemaIds = [];
    }

    _createClass(KaModalBody, [{
        key: 'onChangeFile',
        value: function onChangeFile(e) {
            var _this6 = this;

            var file = e.target.files[0];
            var reader = new FileReader();

            this.setState({ fileName: file.name }, function () {
                reader.onload = function (event) {
                    _this6.cinemaIds = filterCinemaIds(event.target.result);
                    _this6.bubbleChange();
                };
                reader.readAsText(file);
            });
        }
    }, {
        key: 'onChangeKa',
        value: function onChangeKa(ka) {
            this.ka = ka;
            this.bubbleChange();
        }
    }, {
        key: 'bubbleChange',
        value: function bubbleChange() {
            if (this.cinemaIds && this.ka.userId) {
                this.props.onChange(this.cinemaIds, this.ka);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var fileName = this.state.fileName;
            var isUpdate = this.props.isUpdate;

            var misSearchProps = {
                inputClassName: 'form-control',
                placeholder: '请输入完整 mis 账号名',
                onChange: this.onChangeKa.bind(this)
            };
            return React.createElement(
                'form',
                { className: 'form-horizontal form-ka' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'control-label col-xs-2' },
                        isUpdate ? '' : 'KA'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-xs-6' },
                        isUpdate ? '上传的影院列表将完全替换原影院列表' : React.createElement(_componentsCommonMisSearch2['default'], misSearchProps)
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'control-label col-xs-2' },
                        '影院'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-xs-6' },
                        fileName ? React.createElement(
                            'span',
                            { className: 'file-name' },
                            '已读取文件：' + fileName
                        ) : React.createElement(
                            'div',
                            null,
                            React.createElement('input', { type: 'file', className: 'hidden',
                                onChange: this.onChangeFile.bind(this) }),
                            React.createElement(
                                _reactBootstrap.Button,
                                { className: 'btn-operate',
                                    onClick: function (e) {
                                        return e.target.previousSibling.click();
                                    } },
                                '上传 txt，每行写一个影院 id'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return KaModalBody;
})(_react.Component);

var DeleteKaModalBody = (function (_Component2) {
    _inherits(DeleteKaModalBody, _Component2);

    function DeleteKaModalBody() {
        _classCallCheck(this, DeleteKaModalBody);

        _get(Object.getPrototypeOf(DeleteKaModalBody.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(DeleteKaModalBody, [{
        key: 'render',
        value: function render() {
            var ka = this.props.ka;

            return React.createElement(
                'div',
                null,
                '确认删除 KA ',
                React.createElement(
                    'span',
                    null,
                    fmtKaName(ka)
                ),
                '吗？'
            );
        }
    }]);

    return DeleteKaModalBody;
})(_react.Component);

var ShowCinemasButton = (function (_Component3) {
    _inherits(ShowCinemasButton, _Component3);

    function ShowCinemasButton() {
        _classCallCheck(this, ShowCinemasButton);

        _get(Object.getPrototypeOf(ShowCinemasButton.prototype), 'constructor', this).apply(this, arguments);

        this.state = { cinemas: [], showModal: false };
    }

    _createClass(ShowCinemasButton, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchCinemas();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            if (props.isUpdated) this.fetchCinemas();
        }
    }, {
        key: 'fetchCinemas',
        value: function fetchCinemas() {
            var _this7 = this;

            var ka = this.props.ka;

            (0, _componentsUtilBdAjax2['default'])({
                url: '/api/admin/ka/' + ka.userId + '/cinemas.json',
                type: 'GET'
            }).done(function (result) {
                return _this7.setState({ cinemas: result.data || [] });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this8 = this;

            var ka = this.props.ka;
            var _state2 = this.state;
            var cinemas = _state2.cinemas;
            var showModal = _state2.showModal;

            var show = function show() {
                return _this8.setState({ showModal: true });
            };
            var close = function close() {
                return _this8.setState({ showModal: false });
            };
            return React.createElement(
                'b',
                { className: 'btn btn-default btn-operate', onClick: show },
                '查看 ' + cinemas.length + ' 家影院',
                React.createElement(CinemasModal, _extends({ ka: ka, cinemas: cinemas, close: close }, { show: showModal }))
            );
        }
    }]);

    return ShowCinemasButton;
})(_react.Component);

var CinemasModal = (function (_Component4) {
    _inherits(CinemasModal, _Component4);

    function CinemasModal() {
        _classCallCheck(this, CinemasModal);

        _get(Object.getPrototypeOf(CinemasModal.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(CinemasModal, [{
        key: 'renderCinemas',
        value: function renderCinemas() {
            var cinemas = this.props.cinemas;

            return cinemas.map(function (cinema) {
                return React.createElement(
                    'tr',
                    { key: cinema.id },
                    React.createElement(
                        'td',
                        null,
                        cinema.id
                    ),
                    React.createElement(
                        'td',
                        null,
                        cinema.cinemaName
                    ),
                    React.createElement(
                        'td',
                        null,
                        cinema.cityName
                    )
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var ka = _props.ka;
            var close = _props.close;
            var show = _props.show;

            return React.createElement(
                _reactBootstrap.Modal,
                { show: show, onHide: close },
                React.createElement(
                    _reactBootstrap.Modal.Header,
                    null,
                    React.createElement(
                        _reactBootstrap.Button,
                        { ref: 'closeBtn', className: 'close', onClick: close },
                        '×'
                    ),
                    React.createElement(
                        _reactBootstrap.Modal.Title,
                        null,
                        'KA 管理影院'
                    )
                ),
                React.createElement(
                    _reactBootstrap.Modal.Body,
                    null,
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'p',
                            null,
                            'KA：' + fmtKaName(ka)
                        ),
                        React.createElement(
                            _reactBootstrap.Table,
                            { className: 'table-striped table-bordered' },
                            React.createElement(
                                'thead',
                                null,
                                React.createElement(
                                    'tr',
                                    null,
                                    React.createElement(
                                        'th',
                                        null,
                                        '影院ID'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        '影院名'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        '城市'
                                    )
                                )
                            ),
                            React.createElement(
                                'tbody',
                                null,
                                this.renderCinemas()
                            )
                        )
                    )
                )
            );
        }
    }]);

    return CinemasModal;
})(_react.Component);

function fmtKaName(ka) {
    return ka.name + '（' + ka.key + '）';
}

function filterCinemaIds(cinemaIdsStr) {
    var cinemaIds = cinemaIdsStr.split(/\r?\n/);
    var filtered = new Set();
    cinemaIds.map(function (id) {
        id = Number(id);
        id && filtered.add(id);
    });
    return [].concat(_toConsumableArray(filtered));
}
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});