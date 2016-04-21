'use strict';

define(["/amd/node_modules/date-format/lib/index.js","/amd/node_modules/react-bootstrap/lib/Modal.js","/amd/node_modules/react-bootstrap/lib/Button.js","/amd/client/components/common/form-group.js","/amd/client/components/common/simple-modal.js","/amd/client/components/util/bdAjax.js"], function (ref_2,ref_3,ref_4,ref_5,ref_6,ref_7) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"date-format":{"index":0,"path":"node_modules/date-format/lib/index.js"},"react-bootstrap/lib/Modal":{"index":1,"path":"node_modules/react-bootstrap/lib/Modal.js"},"react-bootstrap/lib/Button":{"index":2,"path":"node_modules/react-bootstrap/lib/Button.js"},"../../common/form-group.js":{"index":3,"path":"client/components/common/form-group.js"},"../../common/simple-modal":{"index":4,"path":"client/components/common/simple-modal.js"},"../../util/bdAjax.js":{"index":5,"path":"client/components/util/bdAjax.js"}};
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

var _dateFormat = cmd2amdLoadModule('date-format');

var _dateFormat2 = _interopRequireDefault(_dateFormat);

var _reactBootstrapLibModal = cmd2amdLoadModule('react-bootstrap/lib/Modal');

var _reactBootstrapLibModal2 = _interopRequireDefault(_reactBootstrapLibModal);

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _commonFormGroupJs = cmd2amdLoadModule('../../common/form-group.js');

var _commonSimpleModal = cmd2amdLoadModule('../../common/simple-modal');

var _commonSimpleModal2 = _interopRequireDefault(_commonSimpleModal);

var _utilBdAjaxJs = cmd2amdLoadModule('../../util/bdAjax.js');

var _utilBdAjaxJs2 = _interopRequireDefault(_utilBdAjaxJs);

var OperateStandards = (function (_SimpleModal) {
    _inherits(OperateStandards, _SimpleModal);

    function OperateStandards() {
        _classCallCheck(this, OperateStandards);

        _get(Object.getPrototypeOf(OperateStandards.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(OperateStandards, [{
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var title = undefined;
            switch (this.props.operateType) {
                case "new":
                    title = "新增绩效指标";
                    break;
                case "edit":
                    title = "编辑绩效指标";
                    break;
                case "delete":
                    title = "删除绩效指标";
                    break;
            }
            return {
                title: title,
                content: {
                    performanceTarget: props.performanceTarget,
                    evaluationCriteria: props.evaluationCriteria,
                    weight: props.weight,
                    id: props.bdTargetId,
                    type: props.type,
                    timeScreen: props.timeScreen
                },
                show: true
            };
        }
    }, {
        key: 'submit',
        value: function submit() {
            var _this = this;
            var operateType = _this.props.operateType;
            var apiMap = {
                'new': {
                    url: "/api/admin/target/targets.json",
                    des: "创建绩效指标",
                    type: "POST",
                    data: {
                        content: JSON.stringify(_this.state.content)
                    }
                },
                edit: {
                    url: "/api/admin/target/" + _this.state.content.id + ".json",
                    des: "编辑绩效指标",
                    type: "PUT",
                    data: {
                        content: JSON.stringify(_this.state.content)
                    }
                },
                'delete': {
                    url: "/api/admin/target/" + _this.state.content.id + ".json",
                    des: "删除绩效指标",
                    type: "DELETE",
                    data: {}
                }
            };

            if (operateType != "delete") {
                if (!_this.validate()) {
                    return;
                }
            }

            var api = apiMap[operateType];

            this.onSubmit(api);
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {

            var _this = this;
            var body = undefined;
            var Groups = [];
            $.each(_this.props.fieldLabelMap, function (key, value) {

                Groups.push(_react2['default'].createElement(
                    _commonFormGroupJs.Group,
                    { key: key },
                    _react2['default'].createElement(
                        _commonFormGroupJs.Left,
                        { style: { width: "6em" } },
                        _this.props.fieldLabelMap[key]
                    ),
                    _react2['default'].createElement(
                        _commonFormGroupJs.Right,
                        null,
                        _react2['default'].createElement('input', { type: 'text', ref: key,
                            valueLink: _this.nestLinkedState(["content", key], _this), style: {
                                display: "inline-block",
                                width: "450px"
                            } })
                    )
                ));
            });
            if (_this.props.operateType == "delete") {
                body = _react2['default'].createElement(
                    'div',
                    { style: { textAlign: "center", lineHeight: "50px" } },
                    '确定删除该绩效指标吗？'
                );
            } else {
                body = Groups;
            }

            return _react2['default'].createElement(
                'div',
                null,
                body
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            operateType: "new",
            performanceTarget: "",
            evaluationCriteria: "",
            weight: "",
            bdTargetId: null,
            type: 0,
            timeScreen: (0, _dateFormat2['default'])("yyyyMM", new Date()),
            fieldLabelMap: {
                performanceTarget: "绩效指标：",
                evaluationCriteria: "评估标准：",
                weight: "权重："
            }
        },
        enumerable: true
    }]);

    return OperateStandards;
})(_commonSimpleModal2['default']);

exports['default'] = OperateStandards;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});