'use strict';

define(["/amd/node_modules/react-nest-link-state/NestLinkedStateMixin.js","/amd/node_modules/deep-equal/index.js","/amd/client/components/util/formTemplates.js","/amd/client/components/util/dataFormat.js","/amd/client/components/common/form-group.js","/amd/client/components/common/super-child-form.js"], function (ref_1,ref_2,ref_3,ref_4,ref_5,ref_6) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-nest-link-state":{"index":0,"path":"node_modules/react-nest-link-state/NestLinkedStateMixin.js"},"deep-equal":{"index":1,"path":"node_modules/deep-equal/index.js"},"../../util/formTemplates.js":{"index":2,"path":"client/components/util/formTemplates.js"},"../../util/dataFormat.js":{"index":3,"path":"client/components/util/dataFormat.js"},"../../common/form-group.js":{"index":4,"path":"client/components/common/form-group.js"},"../../common/super-child-form.js":{"index":5,"path":"client/components/common/super-child-form.js"}};
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

var _reactNestLinkState = cmd2amdLoadModule('react-nest-link-state');

var _reactNestLinkState2 = _interopRequireDefault(_reactNestLinkState);

var _deepEqual = cmd2amdLoadModule('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _utilFormTemplatesJs = cmd2amdLoadModule('../../util/formTemplates.js');

var _utilFormTemplatesJs2 = _interopRequireDefault(_utilFormTemplatesJs);

var _utilDataFormatJs = cmd2amdLoadModule('../../util/dataFormat.js');

var _commonFormGroupJs = cmd2amdLoadModule('../../common/form-group.js');

var _commonSuperChildFormJs = cmd2amdLoadModule('../../common/super-child-form.js');

var _commonSuperChildFormJs2 = _interopRequireDefault(_commonSuperChildFormJs);

var CustomFormData = (function (_SuperChildFrom) {
    _inherits(CustomFormData, _SuperChildFrom);

    function CustomFormData() {
        _classCallCheck(this, CustomFormData);

        _get(Object.getPrototypeOf(CustomFormData.prototype), 'constructor', this).apply(this, arguments);

        this.nestLinkedState = _reactNestLinkState2['default'].nestLinkedState;
    }

    _createClass(CustomFormData, [{
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var valueLink = props.valueLink || {};
            var value = valueLink.value;

            var template = props.template || this.state && this.state.template || _utilFormTemplatesJs2['default'].getTemplateByType(props.applyType);
            var mustChooseOptionsMap = {};
            if ($.isArray(template.mustChoose)) {
                template.mustChoose.forEach(function (item, i) {
                    if ($.isPlainObject(item)) {
                        $.extend(mustChooseOptionsMap, item);
                    } else {
                        console.log("模板mustChooseOptionsMap获取失败");
                    }
                });
            } else if ($.isPlainObject(template.mustChoose)) {
                mustChooseOptionsMap = template.mustChoose;
            }

            if (!template) {
                console.log("没有获取到表单模板");
            }

            if (value == null) {
                (function () {
                    //如果传入的formData 为null 表示是新建 需要根据模板生成数据结构
                    var mustChoose = template.mustChoose;
                    var newValue = {};

                    (0, _utilDataFormatJs.mapObject)(template, function (item, key) {
                        newValue[key] = {};
                        if (key == "mustChoose") {
                            if ($.isArray(item)) {
                                item.forEach(function (detailItem, detailKey) {
                                    var mustChooseItemKey = undefined;
                                    if ($.isPlainObject(detailItem)) {
                                        mustChooseItemKey = Object.keys(detailItem)[0];
                                        newValue[key][Object.keys(detailItem)[0]] = mustChooseOptionsMap[mustChooseItemKey][0];
                                    } else {
                                        mustChooseItemKey = detailItem;
                                        newValue[key][detailItem] = mustChooseOptionsMap[mustChooseItemKey][0];
                                    }
                                });
                            } else if ($.isPlainObject(item)) {
                                (0, _utilDataFormatJs.mapObject)(item, function (detailItem, detailKey) {
                                    newValue[key][detailKey] = mustChooseOptionsMap[detailKey][0];
                                });
                            }
                        } else {
                            item.forEach(function (detailItem, detailKey) {
                                newValue[key][detailItem] = "";
                            });
                        }
                    });
                    value = newValue;
                })();
            } else {
                if ($.isArray(value)) {
                    value = value[0] || {};
                }
                $.each(Object.keys(value), function (index, key) {
                    var goup = value[key];
                    if ($.isArray(goup)) {
                        goup = goup[0];
                    }
                    value[key] = goup;
                });
            }

            return {
                template: template,
                value: value,
                mustChooseOptionsMap: mustChooseOptionsMap
            };
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var _this = this;
            var readOnly = _this.props.readOnly;

            var groups = (0, _utilDataFormatJs.mapObject)(_this.state.value, function (item, key) {
                var thisTypeGroups = [];
                if (key == 'mustChoose') {
                    thisTypeGroups = (0, _utilDataFormatJs.mapObject)(item, function (groupValue, groupKey) {
                        var uniqueKey = key + "-" + groupKey;
                        var placeholder = "";
                        var required = false;
                        var options = _this.state.mustChooseOptionsMap[groupKey];

                        if (options) {
                            var _ret2 = (function () {
                                var mustChooseOptions = options.map(function (option, optionIndex) {
                                    var optionUniqueKey = uniqueKey + "-" + optionIndex;
                                    return _react2['default'].createElement(
                                        'option',
                                        { value: option, key: optionUniqueKey },
                                        option
                                    );
                                });

                                return {
                                    v: _react2['default'].createElement(
                                        _commonFormGroupJs.Group,
                                        { key: uniqueKey },
                                        _react2['default'].createElement(
                                            _commonFormGroupJs.Left,
                                            null,
                                            groupKey
                                        ),
                                        '：',
                                        (function () {
                                            if (readOnly) {

                                                return _react2['default'].createElement(
                                                    _commonFormGroupJs.Right,
                                                    null,
                                                    _react2['default'].createElement(
                                                        'span',
                                                        null,
                                                        _this.state.value[key][groupKey]
                                                    )
                                                );
                                            } else {
                                                return _react2['default'].createElement(
                                                    _commonFormGroupJs.Right,
                                                    null,
                                                    _react2['default'].createElement(
                                                        'select',
                                                        { valueLink: _this.nestLinkedState(["value", key, groupKey]) },
                                                        mustChooseOptions
                                                    )
                                                );
                                            }
                                        })()
                                    )
                                };
                            })();

                            if (typeof _ret2 === 'object') return _ret2.v;
                        } else {
                            var _ret3 = (function () {
                                console.log("必选项 options无法匹配");
                                var option = _this.state.value[key][groupKey];
                                return {
                                    v: _react2['default'].createElement(
                                        _commonFormGroupJs.Group,
                                        { key: uniqueKey },
                                        _react2['default'].createElement(
                                            _commonFormGroupJs.Left,
                                            null,
                                            groupKey
                                        ),
                                        '：',
                                        (function () {
                                            if (readOnly) {

                                                return _react2['default'].createElement(
                                                    _commonFormGroupJs.Right,
                                                    null,
                                                    _react2['default'].createElement(
                                                        'span',
                                                        null,
                                                        _this.state.value[key][groupKey]
                                                    )
                                                );
                                            } else {
                                                return _react2['default'].createElement(
                                                    _commonFormGroupJs.Right,
                                                    null,
                                                    _react2['default'].createElement(
                                                        'select',
                                                        { valueLink: _this.nestLinkedState(["value", key, groupKey]) },
                                                        _react2['default'].createElement(
                                                            'option',
                                                            null,
                                                            option
                                                        )
                                                    )
                                                );
                                            }
                                        })()
                                    )
                                };
                            })();

                            if (typeof _ret3 === 'object') return _ret3.v;
                        }
                    });
                } else {

                    _this.state.template[key].forEach(function (groupKey, groupIndex) {
                        var uniqueKey = key + "-" + groupIndex;
                        var placeholder = "";
                        var required = true;
                        if (key == "notMustFill") {
                            placeholder = "可选";
                            required = false;
                        }
                        thisTypeGroups.push(_react2['default'].createElement(
                            'div',
                            { key: uniqueKey },
                            _react2['default'].createElement(
                                _commonFormGroupJs.Group,
                                null,
                                _react2['default'].createElement(
                                    _commonFormGroupJs.Left,
                                    null,
                                    groupKey
                                ),
                                '：',
                                (function () {
                                    if (readOnly) {

                                        return _react2['default'].createElement(
                                            _commonFormGroupJs.Right,
                                            null,
                                            _react2['default'].createElement(
                                                'span',
                                                null,
                                                _this.state.value[key][groupKey]
                                            )
                                        );
                                    } else {
                                        return _react2['default'].createElement(
                                            _commonFormGroupJs.Right,
                                            null,
                                            _react2['default'].createElement('input', { required: required, placeholder: placeholder,
                                                valueLink: _this.nestLinkedState(["value", key, groupKey]) })
                                        );
                                    }
                                })()
                            )
                        ));
                    });
                }

                return _react2['default'].createElement(
                    'div',
                    { key: key },
                    thisTypeGroups
                );
            });

            return _react2['default'].createElement(
                'div',
                null,
                groups
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            valueLink: null,
            template: null,
            applyType: 1,
            readOnly: false
        },
        enumerable: true
    }]);

    return CustomFormData;
})(_commonSuperChildFormJs2['default']);

exports['default'] = CustomFormData;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});