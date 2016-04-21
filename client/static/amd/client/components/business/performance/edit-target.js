'use strict';

define(["/amd/client/components/common/form-group.js","/amd/client/components/common/simple-modal.js"], function (ref_2,ref_3) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"../../common/form-group.js":{"index":0,"path":"client/components/common/form-group.js"},"../../common/simple-modal":{"index":1,"path":"client/components/common/simple-modal.js"}};
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

var _commonFormGroupJs = cmd2amdLoadModule('../../common/form-group.js');

var _commonSimpleModal = cmd2amdLoadModule('../../common/simple-modal');

var _commonSimpleModal2 = _interopRequireDefault(_commonSimpleModal);

var EditTarget = (function (_SimpleModal) {
    _inherits(EditTarget, _SimpleModal);

    function EditTarget() {
        _classCallCheck(this, EditTarget);

        _get(Object.getPrototypeOf(EditTarget.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(EditTarget, [{
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var _this = this;
            var title = undefined;
            var url = undefined;
            var id = undefined;
            var content = undefined;
            var data = undefined;
            switch (props.performanceType * 1) {
                case 0:
                    id = props.bdPerformanceId;
                    title = "调整整体目标";
                    url = "/api/performance/" + id + ".json";
                    content = {
                        id: id,
                        point: props.point,
                        execution: props.execution,
                        score: props.score
                    };
                    break;
                case 1:
                    id = props.bdCinemaPerformanceId;
                    title = "调整POI目标";
                    url = "/api/performance/cinemas/" + id + ".json";
                    content = {
                        bdCinemaPerformanceId: id,
                        point: props.point,
                        execution: props.execution,
                        score: props.score
                    };
                    break;
            }
            return {
                title: title,
                url: url,
                content: content,
                show: true
            };
        }
    }, {
        key: 'submit',
        value: function submit() {
            var _this = this;
            var content = _this.state.content;
            var data = undefined;
            if (_this.props.performanceType * 1 == 0) {
                data = {
                    content: JSON.stringify(content)
                };
            } else {
                data = content;
            }

            var api = {
                url: _this.state.url,
                des: _this.state.title,
                type: "PUT",
                data: data
            };

            if (!_this.validate()) {
                return;
            }

            this.onSubmit(api);
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            var _this = this;
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
                        _react2['default'].createElement('textarea', { ref: key,
                            valueLink: _this.nestLinkedState(["content", key], _this), style: {
                                display: "inline-block",
                                width: "450px"
                            } })
                    )
                ));
            });
            return Groups;
        }
    }], [{
        key: 'defaultProps',
        value: {
            bdPerformanceId: null,
            bdCinemaPerformanceId: null,
            point: "",
            performanceType: 0, // 0 为整体绩效  1为poi绩效
            fieldLabelMap: {
                point: "目标："
            }
        },
        enumerable: true
    }]);

    return EditTarget;
})(_commonSimpleModal2['default']);

exports['default'] = EditTarget;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});