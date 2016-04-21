'use strict';

define(["/amd/node_modules/date-format/lib/index.js","/amd/client/components/common/form-group.js","/amd/client/components/common/simple-modal.js"], function (ref_2,ref_3,ref_4) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"date-format":{"index":0,"path":"node_modules/date-format/lib/index.js"},"../../common/form-group.js":{"index":1,"path":"client/components/common/form-group.js"},"../../common/simple-modal":{"index":2,"path":"client/components/common/simple-modal.js"}};
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

var _commonFormGroupJs = cmd2amdLoadModule('../../common/form-group.js');

var _commonSimpleModal = cmd2amdLoadModule('../../common/simple-modal');

var _commonSimpleModal2 = _interopRequireDefault(_commonSimpleModal);

var ImportPerformance = (function (_SimpleModal) {
    _inherits(ImportPerformance, _SimpleModal);

    function ImportPerformance() {
        _classCallCheck(this, ImportPerformance);

        _get(Object.getPrototypeOf(ImportPerformance.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(ImportPerformance, [{
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var title = undefined;
            var url = undefined;
            var trDes = undefined;
            switch (props.performanceType * 1) {
                case 0:
                    title = "导入整体绩效";
                    url = "/api/admin/performance/list.json";
                    trDes = "mis帐号，目标，完成情况，分数。";
                    break;
                case 1:
                    title = "导入POI绩效";
                    url = "/api/admin/performance/cinemas/list.json";
                    trDes = "mis账号，影院id，目标，完成情况。";
                    break;
            }

            return {
                title: title,
                url: url,
                trDes: trDes,
                show: true
            };
        }
    }, {
        key: 'submit',
        value: function submit() {
            var _this = this;
            var data = new FormData(_reactDom2['default'].findDOMNode(_this.refs.form));
            var api = {
                url: _this.state.url,
                des: _this.state.title,
                contentType: false,
                processData: false,
                type: "POST",
                data: data
            };
            this.onSubmit(api);
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            var _this = this;
            var danger = '';
            if (_this.props.performanceType == 1) {
                danger = _react2['default'].createElement(
                    'p',
                    { className: 'text-danger' },
                    '请在导入整体绩效后再导入POI绩效'
                );
            }
            return _react2['default'].createElement(
                'form',
                { ref: 'form' },
                _react2['default'].createElement(
                    'div',
                    { style: { "paddingLeft": "6em" } },
                    _react2['default'].createElement('input', { type: 'hidden', name: 'timeScreen', value: this.props.timeScreen }),
                    _react2['default'].createElement('input', { type: 'hidden', name: 'targetId', value: this.props.targetId }),
                    _react2['default'].createElement('input', { type: 'hidden', name: 'type', value: this.props.type }),
                    danger,
                    _react2['default'].createElement(
                        'p',
                        null,
                        '请上传excel表格，从第一列起按列依次为：'
                    ),
                    _react2['default'].createElement(
                        'p',
                        null,
                        _this.state.trDes
                    ),
                    _react2['default'].createElement('p', null),
                    _react2['default'].createElement(
                        'p',
                        null,
                        '上传excel：',
                        _react2['default'].createElement('input', { type: 'file', name: 'file' })
                    )
                )
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            type: 0, //请求的类型，0为分区经理1为BD
            targetId: 0, //绩效指标id,
            timeScreen: (0, _dateFormat2['default'])("yyyyMM", new Date()),
            performanceType: 0, // 0 为整体绩效  1为poi绩效
            freshParent: function freshParent() {}
        },
        enumerable: true
    }]);

    return ImportPerformance;
})(_commonSimpleModal2['default']);

exports['default'] = ImportPerformance;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});