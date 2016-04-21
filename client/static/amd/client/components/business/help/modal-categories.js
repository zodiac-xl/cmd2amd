'use strict';

define(["/amd/client/components/common/form-group.js","/amd/client/components/common/simple-modal.js"], function (ref_2,ref_3) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"../../common/form-group":{"index":0,"path":"client/components/common/form-group.js"},"../../common/simple-modal":{"index":1,"path":"client/components/common/simple-modal.js"}};
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

var CategoriesModal = (function (_SimpleModal) {
    _inherits(CategoriesModal, _SimpleModal);

    function CategoriesModal() {
        _classCallCheck(this, CategoriesModal);

        _get(Object.getPrototypeOf(CategoriesModal.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(CategoriesModal, [{
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var titleMap = {
                'new': '新建',
                edit: '修改',
                'delete': '删除'
            };
            return {
                title: titleMap[props.operateType],
                isLoading: false,
                content: props.content
            };
        }
    }, {
        key: 'submit',
        value: function submit() {

            var _this = this;
            var des = _this.state.title + '分类';
            var apiMap = {
                'new': {
                    url: '/api/admin/faq/categories.json',
                    type: 'post',
                    des: des,
                    data: _this.state.content
                },
                edit: {
                    url: '/api/admin/faq/categories/' + _this.state.content.categoryId + '.json',
                    type: 'PUT',
                    des: des,
                    data: _this.state.content
                },
                'delete': {
                    url: '/api/admin/faq/categories/' + _this.state.content.categoryId + '.json',
                    type: 'DELETE',
                    des: des
                }
            };
            if (_this.props.operateType != 'delete' && !_this.validate()) {
                return;
            }
            this.onSubmit(apiMap[_this.props.operateType]);
        }
    }], [{
        key: 'defaultProps',
        value: {
            hide: function hide() {},
            freshParent: function freshParent() {},
            show: false,
            operateType: 'new',
            content: {
                categoryId: '',
                title: '',
                type: 1 },
            //1-产品功能，2-常见问题
            fieldLabelMap: {
                categoryId: {
                    label: '分类id',
                    hide: true
                },
                title: {
                    label: '标题'
                },
                type: {
                    label: '类型',
                    hide: true

                }
            }
        },
        enumerable: true
    }]);

    return CategoriesModal;
})(_commonSimpleModal2['default']);

exports['default'] = CategoriesModal;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});