'use strict';

define(["/amd/node_modules/react-bootstrap/lib/Modal.js","/amd/node_modules/react-bootstrap/lib/Button.js","/amd/client/components/util/bdAjax.js","/amd/node_modules/react-nest-link-state/NestLinkedStateMixin.js","/amd/client/components/common/form-group.js"], function (ref_2,ref_3,ref_4,ref_5,ref_6) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"react-bootstrap/lib/Modal":{"index":0,"path":"node_modules/react-bootstrap/lib/Modal.js"},"react-bootstrap/lib/Button":{"index":1,"path":"node_modules/react-bootstrap/lib/Button.js"},"../util/bdAjax":{"index":2,"path":"client/components/util/bdAjax.js"},"react-nest-link-state":{"index":3,"path":"node_modules/react-nest-link-state/NestLinkedStateMixin.js"},"./form-group":{"index":4,"path":"client/components/common/form-group.js"}};
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

//children

var _reactBootstrapLibModal = cmd2amdLoadModule('react-bootstrap/lib/Modal');

var _reactBootstrapLibModal2 = _interopRequireDefault(_reactBootstrapLibModal);

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

//custom util

var _utilBdAjax = cmd2amdLoadModule('../util/bdAjax');

var _utilBdAjax2 = _interopRequireDefault(_utilBdAjax);

var _reactNestLinkState = cmd2amdLoadModule('react-nest-link-state');

var _reactNestLinkState2 = _interopRequireDefault(_reactNestLinkState);

var _formGroup = cmd2amdLoadModule('./form-group');

var SimpleModal = (function (_Component) {
    _inherits(SimpleModal, _Component);

    function SimpleModal() {
        _classCallCheck(this, SimpleModal);

        _get(Object.getPrototypeOf(SimpleModal.prototype), 'constructor', this).apply(this, arguments);

        this.state = this.getStateByProps ? this.getStateByProps(this.props) : {};
        this.nestLinkedState = _reactNestLinkState2['default'].nestLinkedState;
    }

    _createClass(SimpleModal, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.getStateByProps && this.setState(this.getStateByProps(nextProps));
        }
    }, {
        key: 'validate',
        value: function validate() {
            var _this = this;
            var validate = true;
            $.each(_this.props.fieldLabelMap, function (key, value) {
                if (!_this.props.fieldLabelMap[key].hide && _this.state.content && _this.state.content[key] == "") {
                    validate = false;
                    toastr.warning(value + '不能为空');
                    _reactDom2['default'].findDOMNode(_this.refs[key]).focus();
                    return false;
                }
            });
            return validate;
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.setState({
                show: false
            });
        }
    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            var isLoading = this.state.isLoading;
            var _props = this.props;
            var show = _props.show;
            var hide = _props.hide;
            var hideCancelBtn = _props.hideCancelBtn;

            return _react2['default'].createElement(
                'div',
                null,
                !hideCancelBtn ? _react2['default'].createElement(
                    _reactBootstrapLibButton2['default'],
                    { onClick: show != undefined ? hide : this.hide.bind(this) },
                    '取消'
                ) : null,
                _react2['default'].createElement(
                    _reactBootstrapLibButton2['default'],
                    { bsStyle: 'danger', disabled: isLoading,
                        onClick: !isLoading ? this.submit.bind(this) : null },
                    isLoading ? '确认中...' : '确认'
                )
            );
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(api) {
            var defer = $.Deferred();
            var _this = this;
            _this.setState({ isLoading: true });
            (0, _utilBdAjax2['default'])(api).done(function (e) {
                !api.showSuccess && toastr.success('' + e.des);
                _this.props.hide ? _this.props.hide() : _this.hide();
                _this.props.freshParent && _this.props.freshParent();
                defer.resolve(e);
            }).always(function () {
                _this.setState({ isLoading: false });
            }).fail(function (e) {
                defer.reject(e);
            });
            return defer.promise();
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            var _this = this;
            var Groups = [];
            _this.props.fieldLabelMap && $.each(_this.props.fieldLabelMap, function (key, value) {
                var fieldLabel = _this.props.fieldLabelMap[key];
                var label = fieldLabel;
                var hide = false;
                if ($.isPlainObject(fieldLabel)) {
                    label = fieldLabel.label;
                    hide = fieldLabel.hide;
                }

                Groups.push(_react2['default'].createElement(
                    _formGroup.Group,
                    { key: key, className: hide ? 'hide' : '' },
                    _react2['default'].createElement(
                        _formGroup.Left,
                        { style: { width: "6em" } },
                        label
                    ),
                    '：',
                    _react2['default'].createElement(
                        _formGroup.Right,
                        null,
                        _react2['default'].createElement('input', { type: 'text', ref: key,
                            valueLink: _this.nestLinkedState(["content", key], _this) })
                    )
                ));
            });
            return Groups;
        }
    }, {
        key: 'render',
        value: function render() {

            var _this = this;

            return _react2['default'].createElement(
                'div',
                { className: 'modal-container' },
                _react2['default'].createElement(
                    _reactBootstrapLibModal2['default'],
                    { show: _this.props.show != undefined ? _this.props.show : _this.state.show,
                        bsSize: _this.props.bsSize ? _this.props.bsSize : 'medium',
                        onHide: _this.props.show != undefined ? _this.props.hide : _this.hide.bind(_this) },
                    _react2['default'].createElement(
                        _reactBootstrapLibModal2['default'].Header,
                        { closeButton: true },
                        _react2['default'].createElement(
                            _reactBootstrapLibModal2['default'].Title,
                            null,
                            _this.state.title || _this.props.title
                        )
                    ),
                    _react2['default'].createElement(
                        _reactBootstrapLibModal2['default'].Body,
                        null,
                        this.renderBody()
                    ),
                    (function () {
                        if (_this.renderFooter) {
                            return _react2['default'].createElement(
                                _reactBootstrapLibModal2['default'].Footer,
                                null,
                                _this.renderFooter()
                            );
                        }
                    })()
                )
            );
        }
    }]);

    return SimpleModal;
})(_react.Component);

exports['default'] = SimpleModal;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});