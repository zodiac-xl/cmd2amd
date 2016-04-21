'use strict';

define(["/amd/node_modules/react-addons-update/index.js","/amd/node_modules/react-nest-link-state/NestLinkedStateMixin.js","/amd/node_modules/react-bootstrap/lib/Button.js","/amd/node_modules/react-bootstrap/lib/Modal.js","/amd/client/components/common/form-group.js","/amd/client/components/util/bdAjax.js","/amd/client/components/util/formTemplates.js"], function (ref_1,ref_3,ref_4,ref_5,ref_6,ref_7,ref_8) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-addons-update":{"index":0,"path":"node_modules/react-addons-update/index.js"},"react-dom":{"external":"ReactDOM","index":null,"path":null},"react-nest-link-state":{"index":1,"path":"node_modules/react-nest-link-state/NestLinkedStateMixin.js"},"react-bootstrap/lib/Button":{"index":2,"path":"node_modules/react-bootstrap/lib/Button.js"},"react-bootstrap/lib/Modal":{"index":3,"path":"node_modules/react-bootstrap/lib/Modal.js"},"../../common/form-group.js":{"index":4,"path":"client/components/common/form-group.js"},"../../util/bdAjax.js":{"index":5,"path":"client/components/util/bdAjax.js"},"../../util/formTemplates.js":{"index":6,"path":"client/components/util/formTemplates.js"}};
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

var _reactAddonsUpdate = cmd2amdLoadModule('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _reactDom = cmd2amdLoadModule('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactNestLinkState = cmd2amdLoadModule('react-nest-link-state');

var _reactNestLinkState2 = _interopRequireDefault(_reactNestLinkState);

//children

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _reactBootstrapLibModal = cmd2amdLoadModule('react-bootstrap/lib/Modal');

var _reactBootstrapLibModal2 = _interopRequireDefault(_reactBootstrapLibModal);

var _commonFormGroupJs = cmd2amdLoadModule('../../common/form-group.js');

//custom util

var _utilBdAjaxJs = cmd2amdLoadModule('../../util/bdAjax.js');

var _utilBdAjaxJs2 = _interopRequireDefault(_utilBdAjaxJs);

var _utilFormTemplatesJs = cmd2amdLoadModule('../../util/formTemplates.js');

var _utilFormTemplatesJs2 = _interopRequireDefault(_utilFormTemplatesJs);

var ApplyFormTemplate = (function (_Component) {
    _inherits(ApplyFormTemplate, _Component);

    function ApplyFormTemplate() {
        _classCallCheck(this, ApplyFormTemplate);

        _get(Object.getPrototypeOf(ApplyFormTemplate.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            showModal: true,
            type: "new",
            applyType: this.props.applyType,
            mustFill: [""],
            mustChoose: [{
                key: "",
                options: [""]
            }],
            notMustFill: [""]
        };
        this.nestLinkedState = _reactNestLinkState2['default'].nestLinkedState;
        this.nestObject = _reactNestLinkState2['default'].nestObject;
    }

    _createClass(ApplyFormTemplate, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            var template = _utilFormTemplatesJs2['default'].getTemplateByType(this.state.applyType);
            if (!template) {
                console.log("没有获取到表单模板");
            } else {
                (function () {

                    //变换mustChoose数据格式
                    var mustChoose = [];
                    Object.keys(template.mustChoose).forEach(function (chooseKey) {
                        mustChoose.push({
                            key: chooseKey,
                            options: template.mustChoose[chooseKey]
                        });
                    });
                    template.mustChoose = mustChoose;

                    //数据数组为空上设置一个空项 初始化 提交时需要去除空项
                    if (!template.mustChoose.length) {
                        template.mustChoose = [{
                            key: "",
                            options: [""]
                        }];
                    }
                    if (!template.mustFill.length) {
                        template.mustFill = [""];
                    }
                    if (!template.notMustFill.length) {
                        template.notMustFill = [""];
                    }

                    var newState = (0, _reactAddonsUpdate2['default'])(_this2.state, { $merge: template });
                    newState = (0, _reactAddonsUpdate2['default'])(newState, { $merge: { type: "edit" } });

                    _this2.setState((0, _reactAddonsUpdate2['default'])(_this2.state, { $merge: newState }));
                })();
            }
        }

        //endregion

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
        key: 'addMustFill',
        value: function addMustFill() {
            var newState = this.nestObject(this.state, ["mustFill"]).arrPush("");
            this.setState(newState);
        }
    }, {
        key: 'deleMustFill',
        value: function deleMustFill(index) {
            var newState = this.nestObject(this.state, ["mustFill"]).arrSplice(index, 1);
            this.setState(newState);
        }
    }, {
        key: 'addNotMustFill',
        value: function addNotMustFill() {
            var newState = this.nestObject(this.state, ["notMustFill"]).arrPush("");
            this.setState(newState);
        }
    }, {
        key: 'deleNotMustFill',
        value: function deleNotMustFill(index) {
            var newState = this.nestObject(this.state, ["notMustFill"]).arrSplice(index, 1);
            this.setState(newState);
        }
    }, {
        key: 'addMustChoose',
        value: function addMustChoose() {
            var newState = this.nestObject(this.state, ["mustChoose"]).arrPush({
                key: "",
                options: ["", ""]
            });
            this.setState(newState);
        }
    }, {
        key: 'deleMustChoose',
        value: function deleMustChoose(index) {
            var newState = this.nestObject(this.state, ["mustChoose"]).arrSplice(index, 1);
            this.setState(newState);
        }
    }, {
        key: 'addOption',
        value: function addOption(index) {
            var newState = this.nestObject(this.state, ["mustChoose", index, "options"]).arrPush("");
            this.setState(newState);
        }
    }, {
        key: 'deleOption',
        value: function deleOption(index, optionIndex) {
            var newState = this.nestObject(this.state, ["mustChoose", index, "options"]).arrSplice(optionIndex, 1);
            this.setState(newState);
        }
    }, {
        key: 'submit',
        value: function submit() {
            var _this = this;
            var type = "POST";
            if (this.state.type == "edit") {
                type = "PUT";
            }

            var mustFill = [];
            var notMustFill = [];
            var mustChoose = {};
            this.state.mustFill.forEach(function (item) {
                if (item != "") {
                    mustFill.push(item);
                }
            });
            this.state.notMustFill.forEach(function (item) {
                if (item != "") {
                    notMustFill.push(item);
                }
            });
            this.state.mustChoose.forEach(function (item) {
                if (item.key != "" && item.options[0] != "") {
                    mustChoose[item.key] = item.options;
                }
            });
            (0, _utilBdAjaxJs2['default'])({
                url: "/api/apply/form/template/" + this.state.applyType + ".json",
                type: type,
                data: {
                    formTemplate: JSON.stringify({
                        mustFill: mustFill,
                        mustChoose: mustChoose,
                        notMustFill: notMustFill
                    })
                },
                des: "设置模板"
            }).done(function () {
                _this.close();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var margin5 = {
                margin: "5px"
            };
            var _this = this;
            return _react2['default'].createElement(
                'div',
                { className: 'modal-container' },
                _react2['default'].createElement(
                    _reactBootstrapLibModal2['default'],
                    { show: this.state.showModal, onHide: this.close.bind(_this) },
                    _react2['default'].createElement(
                        _reactBootstrapLibModal2['default'].Header,
                        { closeButton: true },
                        _react2['default'].createElement(
                            _reactBootstrapLibModal2['default'].Title,
                            null,
                            'BD反馈模板设置'
                        )
                    ),
                    _react2['default'].createElement(
                        _reactBootstrapLibModal2['default'].Body,
                        null,
                        _react2['default'].createElement(
                            'p',
                            null,
                            '请设置单影院活动中需要BD反馈的内容。'
                        ),
                        _react2['default'].createElement(
                            'p',
                            null,
                            _react2['default'].createElement(
                                'span',
                                { className: 'text-danger' },
                                '活动时间、成本默认需要BD反馈，无需再进行设置。'
                            )
                        ),
                        _react2['default'].createElement(_commonFormGroupJs.Hr, null),
                        _react2['default'].createElement(
                            _commonFormGroupJs.Group,
                            null,
                            _react2['default'].createElement(
                                _commonFormGroupJs.Left,
                                null,
                                '必填项表头：'
                            ),
                            (function () {

                                var items = _this3.state.mustFill.map(function (item, index) {
                                    if (index == 0) {
                                        return _react2['default'].createElement(
                                            'div',
                                            { key: index },
                                            _react2['default'].createElement(
                                                'div',
                                                null,
                                                _react2['default'].createElement('input', { valueLink: _this3.nestLinkedState(["mustFill", index], _this) }),
                                                _react2['default'].createElement(
                                                    _reactBootstrapLibButton2['default'],
                                                    {
                                                        onClick: _this3.addMustFill.bind(_this3), style: margin5 },
                                                    '增加'
                                                )
                                            )
                                        );
                                    } else {
                                        return _react2['default'].createElement(
                                            'div',
                                            { key: index },
                                            _react2['default'].createElement(
                                                'div',
                                                null,
                                                _react2['default'].createElement('input', { valueLink: _this3.nestLinkedState(["mustFill", index], _this) }),
                                                _react2['default'].createElement(
                                                    _reactBootstrapLibButton2['default'],
                                                    {
                                                        onClick: _this3.deleMustFill.bind(_this3, index), style: margin5 },
                                                    '删除'
                                                )
                                            )
                                        );
                                    }
                                });
                                return _react2['default'].createElement(
                                    _commonFormGroupJs.Right,
                                    null,
                                    items
                                );
                            })()
                        ),
                        _react2['default'].createElement(
                            _commonFormGroupJs.Group,
                            null,
                            _react2['default'].createElement(
                                _commonFormGroupJs.Left,
                                null,
                                '必选项表头：'
                            ),
                            (function () {
                                var textRightStyle = {
                                    textAlign: "right"
                                };
                                var minInput = {
                                    width: "60px"
                                };

                                var items = _this3.state.mustChoose.map(function (item, index) {
                                    var selectionBtn = undefined;
                                    var optionBtn = undefined;
                                    var options = [];
                                    if (index == 0) {
                                        selectionBtn = _react2['default'].createElement(
                                            _reactBootstrapLibButton2['default'],
                                            { onClick: _this.addMustChoose.bind(_this3), style: margin5 },
                                            '增加'
                                        );
                                    } else {
                                        selectionBtn = _react2['default'].createElement(
                                            _reactBootstrapLibButton2['default'],
                                            { onClick: _this.deleMustChoose.bind(_this3, index), style: margin5 },
                                            '删除'
                                        );
                                    }
                                    item.options.forEach(function (option, optionIndex) {
                                        if (optionIndex == 0) {
                                            optionBtn = _react2['default'].createElement(
                                                _reactBootstrapLibButton2['default'],
                                                { onClick: _this.addOption.bind(_this, index),
                                                    style: margin5 },
                                                '增加'
                                            );
                                        } else {
                                            optionBtn = _react2['default'].createElement(
                                                _reactBootstrapLibButton2['default'],
                                                { onClick: _this.deleOption.bind(_this, index, optionIndex),
                                                    style: margin5 },
                                                '删除'
                                            );
                                        }
                                        options.push(_react2['default'].createElement(
                                            'div',
                                            { key: optionIndex },
                                            _react2['default'].createElement('input', { style: minInput,
                                                valueLink: _this.nestLinkedState(["mustChoose", index, "options", optionIndex], _this)
                                            }),
                                            optionBtn
                                        ));
                                    });

                                    return _react2['default'].createElement(
                                        'div',
                                        { key: index },
                                        _react2['default'].createElement(
                                            'div',
                                            null,
                                            _react2['default'].createElement('input', { valueLink: _this.nestLinkedState(["mustChoose", index, "key"], _this) }),
                                            selectionBtn,
                                            _react2['default'].createElement(
                                                'div',
                                                { style: textRightStyle },
                                                options
                                            )
                                        )
                                    );
                                });

                                return _react2['default'].createElement(
                                    _commonFormGroupJs.Right,
                                    { style: { flex: 'initial' } },
                                    items
                                );
                            })(),
                            _react2['default'].createElement(
                                _commonFormGroupJs.Right,
                                null,
                                _react2['default'].createElement('div', null)
                            )
                        ),
                        _react2['default'].createElement(
                            _commonFormGroupJs.Group,
                            null,
                            _react2['default'].createElement(
                                _commonFormGroupJs.Left,
                                null,
                                '非必填项表头：'
                            ),
                            (function () {
                                var items = _this3.state.notMustFill.map(function (item, index) {
                                    if (index == 0) {
                                        return _react2['default'].createElement(
                                            'div',
                                            { key: index },
                                            _react2['default'].createElement(
                                                'div',
                                                null,
                                                _react2['default'].createElement('input', { valueLink: _this3.nestLinkedState(["notMustFill", index], _this) }),
                                                _react2['default'].createElement(
                                                    _reactBootstrapLibButton2['default'],
                                                    {
                                                        onClick: _this3.addNotMustFill.bind(_this3), style: margin5 },
                                                    '增加'
                                                )
                                            )
                                        );
                                    } else {
                                        return _react2['default'].createElement(
                                            'div',
                                            { key: index },
                                            _react2['default'].createElement(
                                                'div',
                                                null,
                                                _react2['default'].createElement('input', { valueLink: _this3.nestLinkedState(["notMustFill", index], _this) }),
                                                _react2['default'].createElement(
                                                    _reactBootstrapLibButton2['default'],
                                                    {
                                                        onClick: _this3.deleNotMustFill.bind(_this3, index),
                                                        style: margin5 },
                                                    '删除'
                                                )
                                            )
                                        );
                                    }
                                });
                                return _react2['default'].createElement(
                                    _commonFormGroupJs.Right,
                                    null,
                                    items
                                );
                            })()
                        ),
                        _react2['default'].createElement(
                            _reactBootstrapLibModal2['default'].Footer,
                            null,
                            _react2['default'].createElement(
                                _reactBootstrapLibButton2['default'],
                                { onClick: this.submit.bind(this) },
                                '确认'
                            )
                        )
                    )
                )
            );
        }
    }], [{
        key: 'defaultProps',

        //region init data
        value: {
            applyType: 1
        },
        enumerable: true
    }]);

    return ApplyFormTemplate;
})(_react.Component);

exports['default'] = ApplyFormTemplate;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});