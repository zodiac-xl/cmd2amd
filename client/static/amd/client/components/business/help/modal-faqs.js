'use strict';

define(["/amd/client/components/common/form-group.js","/amd/client/components/common/simple-modal.js","/amd/client/components/common/super-child-form.js","/amd/node_modules/react-simple-radio-group/index.js"], function (ref_2,ref_3,ref_4,ref_5) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"../../common/form-group":{"index":0,"path":"client/components/common/form-group.js"},"../../common/simple-modal":{"index":1,"path":"client/components/common/simple-modal.js"},"../../common/super-child-form":{"index":2,"path":"client/components/common/super-child-form.js"},"react-simple-radio-group":{"index":3,"path":"node_modules/react-simple-radio-group/index.js"}};
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

var _commonFormGroup = cmd2amdLoadModule('../../common/form-group');

var _commonSimpleModal = cmd2amdLoadModule('../../common/simple-modal');

var _commonSimpleModal2 = _interopRequireDefault(_commonSimpleModal);

var _commonSuperChildForm = cmd2amdLoadModule('../../common/super-child-form');

var _commonSuperChildForm2 = _interopRequireDefault(_commonSuperChildForm);

var _reactSimpleRadioGroup = cmd2amdLoadModule('react-simple-radio-group');

var _reactSimpleRadioGroup2 = _interopRequireDefault(_reactSimpleRadioGroup);

var FaqsModal = (function (_SimpleModal) {
    _inherits(FaqsModal, _SimpleModal);

    function FaqsModal() {
        _classCallCheck(this, FaqsModal);

        _get(Object.getPrototypeOf(FaqsModal.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(FaqsModal, [{
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var titleMap = {
                'new': '新建',
                edit: '修改',
                'delete': '删除'
            };

            var checkBoxValue = 1;
            if (props.content.content) {
                //1为链接地址 2为内容
                checkBoxValue = 2;
            }
            return {
                title: titleMap[props.operateType],
                isLoading: false,
                content: props.content,
                checkBoxValue: checkBoxValue
            };
        }
    }, {
        key: 'submit',
        value: function submit() {

            var _this = this;
            var data = _this.state.content;
            var id = data.id;
            var des = _this.state.title + '问题';
            if (_this.state.checkBoxValue == 1) {
                //如果配置的是url则没有content字段
                data.content = null;
            }

            var eidtData = data;
            delete eidtData.created; //for 后端不需要这个字段  而且使用的特定的dao不能吧int处理为时间
            delete eidtData.id; //for 后端不需要这个字段  而且使用的特定的dao不能吧str处理为int

            var newData = data;
            delete newData.id; //for 后端不需要这个字段  而且使用的特定的dao不能吧str处理为int

            var apiMap = {
                'new': {
                    url: '/api/admin/faq.json',
                    type: 'post',
                    des: des,
                    data: newData
                },
                edit: {
                    url: '/api/admin/faq/' + id + '.json',
                    type: 'PUT',
                    des: des,
                    data: eidtData
                },
                'delete': {
                    url: '/api/admin/faq/' + id + '.json',
                    type: 'DELETE',
                    des: des
                }
            };
            if (_this.props.operateType != 'delete' && !_this.refs.form.validate()) {
                return;
            }
            _this.onSubmit(apiMap[_this.props.operateType]);
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            var _this = this;

            var checkboxValueLink = _this.nestLinkedState(['checkBoxValue'], _this);
            return _react2['default'].createElement(
                _commonSuperChildForm2['default'],
                { ref: 'form' },
                _react2['default'].createElement(
                    _commonFormGroup.Group,
                    null,
                    _react2['default'].createElement(
                        _commonFormGroup.Left,
                        null,
                        '标题'
                    ),
                    '：',
                    _react2['default'].createElement(
                        _commonFormGroup.Right,
                        null,
                        _react2['default'].createElement('input', { type: 'text', style: { width: '300px' },
                            valueLink: _this.nestLinkedState(["content", 'title'], _this), required: true })
                    )
                ),
                _react2['default'].createElement(
                    _commonFormGroup.Group,
                    null,
                    _react2['default'].createElement(
                        _commonFormGroup.Left,
                        null,
                        '配置'
                    ),
                    '：',
                    _react2['default'].createElement(
                        _commonFormGroup.Right,
                        null,
                        _react2['default'].createElement(
                            _reactSimpleRadioGroup2['default'],
                            { name: 'setting', style: { marginBottom: '10px' },
                                onChange: checkboxValueLink.requestChange,
                                value: checkboxValueLink.value },
                            _react2['default'].createElement(
                                'span',
                                null,
                                _react2['default'].createElement('input', { type: 'radio', value: '1' }),
                                '链接地址'
                            ),
                            '      ',
                            _react2['default'].createElement(
                                'span',
                                null,
                                _react2['default'].createElement('input', { type: 'radio', value: '2' }),
                                '内容'
                            )
                        ),
                        (function () {
                            if (checkboxValueLink.value == 1) {
                                return _react2['default'].createElement('input', { type: 'text', style: { width: '300px' },
                                    valueLink: _this.nestLinkedState(["content", 'url'], _this),
                                    placeholder: '例如 http://bd.movie.sankuai.com/', required: true });
                            } else {
                                return _react2['default'].createElement('textarea', { required: true, style: { width: '300px', height: '200px' },
                                    valueLink: _this.nestLinkedState(["content", 'content'], _this) });
                            }
                        })()
                    )
                )
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            hide: function hide() {},
            freshParent: function freshParent() {},
            show: false,
            operateType: 'new',
            content: {
                id: '',
                title: '',
                url: '',
                content: ''
            }
        },
        enumerable: true
    }]);

    return FaqsModal;
})(_commonSimpleModal2['default']);

exports['default'] = FaqsModal;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});