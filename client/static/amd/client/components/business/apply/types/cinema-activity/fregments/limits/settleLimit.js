'use strict';

define(["/amd/node_modules/react-simple-radio-group/index.js","/amd/client/components/common/form-group.js","/amd/client/components/common/super-child.js","/amd/client/components/common/validatemap.js"], function (ref_0,ref_1,ref_2,ref_3) {

    var cmd2amdModules = {"react-simple-radio-group":{"index":0,"path":"node_modules/react-simple-radio-group/index.js"},"../../../../../../common/form-group":{"index":1,"path":"client/components/common/form-group.js"},"../../../../../../common/super-child":{"index":2,"path":"client/components/common/super-child.js"},"../../../../../../common/validatemap":{"index":3,"path":"client/components/common/validatemap.js"}};
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

var _reactSimpleRadioGroup = cmd2amdLoadModule('react-simple-radio-group');

var _reactSimpleRadioGroup2 = _interopRequireDefault(_reactSimpleRadioGroup);

var _commonFormGroup = cmd2amdLoadModule('../../../../../../common/form-group');

var _commonSuperChild = cmd2amdLoadModule('../../../../../../common/super-child');

var _commonSuperChild2 = _interopRequireDefault(_commonSuperChild);

var _commonValidatemap = cmd2amdLoadModule('../../../../../../common/validatemap');

var _commonValidatemap2 = _interopRequireDefault(_commonValidatemap);

var SettleLimit = (function (_SuperChild) {
    _inherits(SettleLimit, _SuperChild);

    function SettleLimit() {
        _classCallCheck(this, SettleLimit);

        _get(Object.getPrototypeOf(SettleLimit.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(SettleLimit, [{
        key: 'defaultValue',
        value: function defaultValue() {
            return true; //结算价限量
        }
    }, {
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var valueLink = props.valueLink || {};
            var value = valueLink.value != undefined ? valueLink.value : this.defaultValue();
            return {
                value: value
            };
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var _this = this;
            var readOnly = _this.props.readOnly;

            var value = _this.state.value;
            var settleLimit = value;

            var rightDom = undefined;
            if (readOnly) {
                rightDom = React.createElement(
                    _commonFormGroup.Right,
                    null,
                    React.createElement(
                        'span',
                        null,
                        settleLimit ? '需要对结算价限量，且与以上限量相同。' : '不需要对结算价限量'
                    )
                );
            } else {
                rightDom = React.createElement(
                    _commonFormGroup.Right,
                    null,
                    React.createElement('input', { type: 'checkbox', checked: settleLimit, onChange: function (e) {
                            var settleLimit = e.target.checked;
                            _this.setState({ value: settleLimit });
                        } }),
                    '需要对结算价限量，且与以上限量相同。'
                );
            }

            return React.createElement(
                _commonFormGroup.Group,
                null,
                React.createElement(
                    _commonFormGroup.Left,
                    null,
                    '结算价限量'
                ),
                '：',
                rightDom
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            valueLink: null,
            readOnly: false,
            disableNoLimit: false
        },
        enumerable: true
    }]);

    return SettleLimit;
})(_commonSuperChild2['default']);

exports['default'] = SettleLimit;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});