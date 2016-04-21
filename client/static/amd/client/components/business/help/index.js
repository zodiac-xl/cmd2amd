'use strict';

define(["/amd/node_modules/react-bootstrap/lib/Tabs.js","/amd/node_modules/react-bootstrap/lib/Tab.js","/amd/node_modules/react-bootstrap/lib/Button.js","/amd/node_modules/react-bootstrap/lib/SplitButton.js","/amd/node_modules/react-bootstrap/lib/MenuItem.js","/amd/node_modules/uniqid/index.js","/amd/client/components/common/my-table.js","/amd/client/components/common/myConfirm.js","/amd/client/components/util/bdAjax.js","/amd/client/components/business/help/modal-categories.js","/amd/client/components/business/help/modal-faqs.js","/amd/client/components/business/help/modal-show-content.js","/amd/client/components/util/dateformat.js","css!/amd/client/components/business/help/index.css"], function (ref_1,ref_2,ref_3,ref_4,ref_5,ref_6,ref_7,ref_8,ref_9,ref_10,ref_11,ref_12,ref_13,ref_14) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-bootstrap/lib/Tabs":{"index":0,"path":"node_modules/react-bootstrap/lib/Tabs.js"},"react-bootstrap/lib/Tab":{"index":1,"path":"node_modules/react-bootstrap/lib/Tab.js"},"react-bootstrap/lib/Button":{"index":2,"path":"node_modules/react-bootstrap/lib/Button.js"},"react-bootstrap/lib/SplitButton":{"index":3,"path":"node_modules/react-bootstrap/lib/SplitButton.js"},"react-bootstrap/lib/MenuItem":{"index":4,"path":"node_modules/react-bootstrap/lib/MenuItem.js"},"uniqid":{"index":5,"path":"node_modules/uniqid/index.js"},"../../common/my-table":{"index":6,"path":"client/components/common/my-table.js"},"../../common/myConfirm":{"index":7,"path":"client/components/common/myConfirm.js"},"../../util/bdAjax":{"index":8,"path":"client/components/util/bdAjax.js"},"./modal-categories":{"index":9,"path":"client/components/business/help/modal-categories.js"},"./modal-faqs":{"index":10,"path":"client/components/business/help/modal-faqs.js"},"./modal-show-content":{"index":11,"path":"client/components/business/help/modal-show-content.js"},"../../util/dateformat":{"index":12,"path":"client/components/util/dateformat.js"},"./index.less":{"index":13,"path":"client/components/business/help/index.less"}};
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

var _reactBootstrapLibTabs = cmd2amdLoadModule('react-bootstrap/lib/Tabs');

var _reactBootstrapLibTabs2 = _interopRequireDefault(_reactBootstrapLibTabs);

var _reactBootstrapLibTab = cmd2amdLoadModule('react-bootstrap/lib/Tab');

var _reactBootstrapLibTab2 = _interopRequireDefault(_reactBootstrapLibTab);

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _reactBootstrapLibSplitButton = cmd2amdLoadModule('react-bootstrap/lib/SplitButton');

var _reactBootstrapLibSplitButton2 = _interopRequireDefault(_reactBootstrapLibSplitButton);

var _reactBootstrapLibMenuItem = cmd2amdLoadModule('react-bootstrap/lib/MenuItem');

var _reactBootstrapLibMenuItem2 = _interopRequireDefault(_reactBootstrapLibMenuItem);

var _uniqid = cmd2amdLoadModule('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

var _commonMyTable = cmd2amdLoadModule('../../common/my-table');

var _commonMyTable2 = _interopRequireDefault(_commonMyTable);

var _commonMyConfirm = cmd2amdLoadModule('../../common/myConfirm');

var _commonMyConfirm2 = _interopRequireDefault(_commonMyConfirm);

var _utilBdAjax = cmd2amdLoadModule('../../util/bdAjax');

var _utilBdAjax2 = _interopRequireDefault(_utilBdAjax);

var _modalCategories = cmd2amdLoadModule('./modal-categories');

var _modalCategories2 = _interopRequireDefault(_modalCategories);

var _modalFaqs = cmd2amdLoadModule('./modal-faqs');

var _modalFaqs2 = _interopRequireDefault(_modalFaqs);

var _modalShowContent = cmd2amdLoadModule('./modal-show-content');

var _modalShowContent2 = _interopRequireDefault(_modalShowContent);

cmd2amdLoadModule('../../util/dateformat');

cmd2amdLoadModule('./index.less');

var Help = (function (_Component) {
    _inherits(Help, _Component);

    function Help() {
        var _this2 = this;

        _classCallCheck(this, Help);

        _get(Object.getPrototypeOf(Help.prototype), 'constructor', this).apply(this, arguments);

        this.state = (function () {
            var _this = _this2;
            return {
                categoriesModal: {
                    show: false,
                    operateType: 'new',
                    content: {
                        categoryId: '',
                        title: '',
                        type: 1 }
                },
                //1-产品功能，2-常见问题
                faqsModal: {
                    show: false,
                    operateType: 'new',
                    content: {
                        categoryId: '',
                        id: '',
                        title: '',
                        url: '',
                        content: ''
                    }
                },
                showContentModal: {
                    show: false,
                    title: '',
                    content: {}
                },
                categories: [],
                faqs: [],
                activeCategoryId: null
            };
        })();
    }

    _createClass(Help, [{
        key: 'getFaqs',
        value: function getFaqs(newState) {
            var _this = this;
            var state = newState || _this.state;
            var activeCategoryId = state.activeCategoryId;
            if (activeCategoryId == null) {
                return;
            }
            (0, _utilBdAjax2['default'])({
                url: '/api/faq/categories/' + activeCategoryId + '/faqs.json',
                des: '获取' + activeCategoryId + '分类下常见问题',
                bd: true
            }).done(function (e) {
                var state = newState || _this.state; //state已经改变
                state.faqs = e.data;
                _this.setState(state);
            });
        }
    }, {
        key: 'getCategories',
        value: function getCategories(first) {
            var _this = this;
            var defer = $.Deferred();
            (0, _utilBdAjax2['default'])({
                url: '/api/faq/categories.json',
                des: '获取分类列表',
                bd: true
            }).done(function (e) {
                var categories = [];
                e.data.forEach(function (item) {
                    if (item.type == _this.props.categoryType) {
                        categories.push(item);
                    }
                });
                var newState = _this.state;
                newState.categories = categories;
                newState.activeCategoryId = newState.activeCategoryId != null ? newState.activeCategoryId : categories[0] && categories[0]['id'] || null;

                if (first) {
                    //如果是第一次 就resolve 然后获取常见问题列表
                    defer.resolve(newState);
                } else {
                    _this.setState(newState);
                }
            }).fail(function (e) {
                defer.reject(e);
            });
            return defer.promise();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this = this;
            var isFirst = true;

            $('body').delegate('.J_toggleCategorie>button:nth-child(1)', 'click', function (e) {
                _this.toggleCategorie($(e.target).parent().data('id'));
            });

            _this.getCategories(isFirst).done(function (newState) {
                _this.getFaqs(newState);
            });
        }
    }, {
        key: 'toggleCategorie',
        value: function toggleCategorie(id) {
            var newState = this.state;
            if (newState.activeCategoryId == id) {
                return;
            }
            newState.activeCategoryId = id;
            this.getFaqs(newState);
        }

        //操作分类
    }, {
        key: 'operateCategories',
        value: function operateCategories(operateType, categoryId, title) {
            var _this = this;
            var categoryType = _this.props.categoryType;
            if (operateType == 'new') {
                categoryId = '';
                title = '';
            } else if (operateType == 'delete') {
                var api = {
                    url: '/api/admin/faq/categories/' + categoryId + '.json',
                    type: 'DELETE',
                    des: '删除分类'
                };
                (0, _commonMyConfirm2['default'])(_react2['default'].createElement(
                    'span',
                    null,
                    '改操作会删除该标题及其所有内容。',
                    _react2['default'].createElement('br', null),
                    '确认删除',
                    _react2['default'].createElement(
                        'span',
                        { className: 'text-danger' },
                        title
                    ),
                    '吗？'
                ), '删除', api).done(function () {
                    _this.getCategories();
                });
                return;
            }

            _this.setState({
                categoriesModal: {
                    show: true,
                    operateType: operateType,
                    content: {
                        categoryId: categoryId || '',
                        title: title || '',
                        type: categoryType }
                }
            });
        }
    }, {
        key: 'freshCategories',
        //1-产品功能，2-常见问题
        value: function freshCategories() {
            this.getCategories();
        }
    }, {
        key: 'toggleCategoriesModal',
        value: function toggleCategoriesModal(toggle) {
            this.setState({ categoriesModal: { show: toggle } });
        }

        //操作常见问题
    }, {
        key: 'operateFaqs',
        value: function operateFaqs(operateType, faqData) {
            var _this = this;
            var categoryType = _this.props.categoryType;

            if (operateType == 'delete') {
                var api = {
                    url: '/api/admin/faq/' + faqData.id + '.json',
                    type: 'DELETE',
                    des: '删除问题'
                };
                (0, _commonMyConfirm2['default'])(_react2['default'].createElement(
                    'span',
                    null,
                    '确认删除',
                    _react2['default'].createElement(
                        'span',
                        { className: 'text-danger' },
                        faqData.title
                    ),
                    '吗？'
                ), '删除', api).done(function () {
                    _this.getFaqs();
                });
                return;
            }

            _this.setState({
                faqsModal: {
                    show: true,
                    operateType: operateType,
                    content: faqData || {
                        id: '',
                        categoryId: _this.state.activeCategoryId,
                        title: '',
                        url: '',
                        content: ''
                    }
                }
            });
        }
    }, {
        key: 'freshFaqs',
        value: function freshFaqs() {
            this.getFaqs();
        }
    }, {
        key: 'toggleFaqsModal',
        value: function toggleFaqsModal(toggle) {
            this.setState({ faqsModal: { show: toggle } });
        }
    }, {
        key: 'toggleShowContentModal',
        value: function toggleShowContentModal(data) {
            var showContentModal = this.state.showContentModal;
            $.extend(showContentModal, data);
            this.setState({ showContentModal: showContentModal });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;
            var canOperate = _this.props.canOperate;
            var tabsDom = [];

            _this.state.categories.forEach(function (item, index) {
                var tab = undefined;
                if (canOperate) {
                    tab = _react2['default'].createElement(
                        _reactBootstrapLibSplitButton2['default'],
                        { bsStyle: _this.state.activeCategoryId != item.id ? 'default' : 'danger', title: item.title,
                            key: index,
                            'data-id': item.id,
                            className: _this.state.activeCategoryId == item.id ? 'active J_toggleCategorie' : 'J_toggleCategorie',
                            id: 'split-button-basic-' + index
                        },
                        _react2['default'].createElement(
                            _reactBootstrapLibMenuItem2['default'],
                            {
                                onClick: _this.operateCategories.bind(_this, 'edit', item.id, item.title) },
                            '编辑'
                        ),
                        _react2['default'].createElement(
                            _reactBootstrapLibMenuItem2['default'],
                            {
                                onClick: _this.operateCategories.bind(_this, 'delete', item.id, item.title) },
                            '删除'
                        )
                    );
                } else {
                    tab = _react2['default'].createElement(
                        'span',
                        { className: _this.state.activeCategoryId == item.id ? 'active dropdown' : 'dropdown', key: index },
                        _react2['default'].createElement(
                            _reactBootstrapLibButton2['default'],
                            {
                                bsStyle: _this.state.activeCategoryId != item.id ? 'default' : 'danger',
                                onClick: _this.toggleCategorie.bind(_this, item.id)
                            },
                            item.title
                        )
                    );
                }
                tabsDom.push(tab);
            });
            if (canOperate) {
                tabsDom.push(_react2['default'].createElement(
                    _reactBootstrapLibButton2['default'],
                    { key: (0, _uniqid2['default'])(), bsStyle: 'danger', style: { marginLeft: '20px' },
                        onClick: _this.operateCategories.bind(_this, 'new') },
                    '新建'
                ));
            }

            var tableData = {
                ths: {
                    title: function title() {
                        if (canOperate) {
                            return _react2['default'].createElement(
                                'div',
                                { className: 'wrap-th-create' },
                                _react2['default'].createElement(
                                    _reactBootstrapLibButton2['default'],
                                    { bsStyle: 'danger', onClick: _this.operateFaqs.bind(_this, 'new', null) },
                                    '新建'
                                ),
                                _react2['default'].createElement(
                                    'span',
                                    null,
                                    '标题'
                                )
                            );
                        } else {
                            return _react2['default'].createElement(
                                'span',
                                null,
                                '标题'
                            );
                        }
                    },
                    created: function created() {
                        return function (style, thKey) {
                            $.extend(style, {
                                width: '8em'
                            });
                            return _react2['default'].createElement(
                                'th',
                                { style: style, key: thKey },
                                '发布日期'
                            );
                        };
                    },
                    operate: function operate() {
                        return function (style, thKey) {
                            $.extend(style, {
                                width: '12em'
                            });
                            return _react2['default'].createElement(
                                'th',
                                { style: style, key: thKey },
                                '操作'
                            );
                        };
                    }
                },
                trs: []
            };
            _this.state.faqs.forEach(function (item) {

                var content = item.content;
                //a.若该项配置为“链接地址”，则点击文案：在新页面打开该项的链接地址。
                //b.若该项配置为“内容”，则点击文案：弹窗展示内容。
                var titleHandle = function titleHandle() {
                    if (item.content) {
                        (function () {
                            var content = [];
                            item.content.split(/[\n\r]/gim).forEach(function (fra, i) {
                                content.push(_react2['default'].createElement(
                                    'span',
                                    { key: 'text-' + i },
                                    fra
                                ));
                                content.push(_react2['default'].createElement('br', { key: 'br-' + i }));
                            });
                            _this.toggleShowContentModal({
                                show: true,
                                content: content,
                                title: item.title
                            });
                        })();
                    } else if (item.url) {
                        window.open(item.url);
                    }
                };

                var tr = {
                    title: function title() {
                        return function (style, rowSpan, tdKey) {
                            var mystyle = $.extend(style, {
                                'textAlign': 'left'
                            });
                            return _react2['default'].createElement(
                                'td',
                                { style: mystyle, rowSpan: rowSpan, key: tdKey },
                                _react2['default'].createElement(
                                    'a',
                                    { onClick: titleHandle },
                                    item.title
                                )
                            );
                        };
                    },
                    created: new Date(item.created).Format('yyyy-MM-dd'),
                    operate: function operate() {
                        return _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(
                                _reactBootstrapLibButton2['default'],
                                { onClick: _this.operateFaqs.bind(_this, 'edit', item) },
                                '编辑'
                            ),
                            '  ',
                            _react2['default'].createElement(
                                _reactBootstrapLibButton2['default'],
                                { onClick: _this.operateFaqs.bind(_this, 'delete', item) },
                                '删除'
                            )
                        );
                    }
                };
                if (!canOperate) {
                    delete tr.operate;
                }
                tableData.trs.push(tr);
            });
            if (!canOperate) {
                delete tableData.ths.operate;
            }

            return _react2['default'].createElement(
                'div',
                { className: 'help-page' },
                _react2['default'].createElement(
                    'div',
                    { className: 'wrap-nav' },
                    tabsDom
                ),
                _react2['default'].createElement('br', null),
                _react2['default'].createElement(_commonMyTable2['default'], { data: tableData }),
                _react2['default'].createElement(_modalCategories2['default'], _extends({}, _this.state.categoriesModal, { hide: _this.toggleCategoriesModal.bind(_this, false),
                    freshParent: _this.freshCategories.bind(_this) })),
                _react2['default'].createElement(_modalFaqs2['default'], _extends({}, _this.state.faqsModal, { hide: _this.toggleFaqsModal.bind(_this, false),
                    freshParent: _this.freshFaqs.bind(_this) })),
                _react2['default'].createElement(_modalShowContent2['default'], _extends({}, _this.state.showContentModal, {
                    hide: _this.toggleShowContentModal.bind(_this, { show: false }) }))
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            categoryType: '1', //1-产品功能，2-常见问题
            canOperate: true
        },
        enumerable: true
    }]);

    return Help;
})(_react.Component);

exports['default'] = Help;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});