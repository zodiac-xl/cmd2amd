'use strict';

define(["/amd/client/components/common/my-table.js","/amd/client/components/common/form-group.js","/amd/client/components/common/simple-modal.js","/amd/client/components/util/bdAjax.js"], function (ref_2,ref_3,ref_4,ref_5) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"../../common/my-table":{"index":0,"path":"client/components/common/my-table.js"},"../../common/form-group.js":{"index":1,"path":"client/components/common/form-group.js"},"../../common/simple-modal":{"index":2,"path":"client/components/common/simple-modal.js"},"../../util/bdAjax.js":{"index":3,"path":"client/components/util/bdAjax.js"}};
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

var _commonMyTable = cmd2amdLoadModule('../../common/my-table');

var _commonMyTable2 = _interopRequireDefault(_commonMyTable);

var _commonFormGroupJs = cmd2amdLoadModule('../../common/form-group.js');

var _commonSimpleModal = cmd2amdLoadModule('../../common/simple-modal');

var _commonSimpleModal2 = _interopRequireDefault(_commonSimpleModal);

var _utilBdAjaxJs = cmd2amdLoadModule('../../util/bdAjax.js');

var _utilBdAjaxJs2 = _interopRequireDefault(_utilBdAjaxJs);

var NotesForm = (function (_SimpleModal) {
    _inherits(NotesForm, _SimpleModal);

    function NotesForm() {
        _classCallCheck(this, NotesForm);

        _get(Object.getPrototypeOf(NotesForm.prototype), 'constructor', this).apply(this, arguments);

        this.state = (function () {
            var _this = this;
            var trs = [];
            var title = undefined;
            switch (_this.props.operateType) {
                case "check":
                    title = "查看备注";
                    if (!_this.defaultRenderFooter) {
                        var defaultRenderFooter = _this.renderFooter; //for 防止对象引用
                        _this.defaultRenderFooter = defaultRenderFooter;
                    }
                    _this.renderFooter = _this.emptyFooter;

                    var api = {
                        url: '/api/activity/task/' + _this.props.taskId + '/cinema/' + _this.props.cinemaId + '/note.json',
                        des: "获取影院备注",
                        async: false
                    };
                    (0, _utilBdAjaxJs2['default'])(api).done(function (e) {
                        if (e.data) {
                            $.each(e.data, function (index, item) {
                                trs.push({
                                    noterAccount: item.noterAccount,
                                    noteTime: item.noteTime,
                                    content: item.content
                                });
                            });
                        }
                    });

                    break;
                case "add":
                    title = "添加备注";
                    if (_this.defaultRenderFooter) {
                        _this.renderFooter = _this.defaultRenderFooter;
                    }
                    break;
            }
            return {
                show: true,
                isLoading: false,
                title: title,
                tableData: {
                    ths: ["添加人", "添加时间", "添加内容"],
                    trs: trs
                }
            };
        }).bind(this)();
    }

    _createClass(NotesForm, [{
        key: 'emptyFooter',
        value: function emptyFooter() {
            return;
        }
    }, {
        key: 'submit',
        value: function submit() {
            var _this = this;
            var note = _this.refs.note.value;
            if (!note) {
                toastr.warning('备注不能为空');
                return;
            }

            var api = {
                url: '/api/activity/task/' + _this.props.taskId + '/cinema/' + _this.props.cinemaId + '/note.json',
                des: "添加影院备注",
                type: "POST",
                data: {
                    note: note
                }
            };
            this.onSubmit(api);
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            var _this = this;
            var body = undefined;
            switch (_this.props.operateType) {
                case "check":
                    body = _react2['default'].createElement(_commonMyTable2['default'], { data: _this.state.tableData });
                    break;
                case "add":
                    body = _react2['default'].createElement('textarea', { rows: '3', placeholder: '请输入内容', ref: 'note', style: { width: "100%" } });
                    break;
            }
            return body;
        }
    }], [{
        key: 'defaultProps',
        value: {
            taskId: null,
            cinemaId: null,
            operateType: "check"
        },
        enumerable: true
    }]);

    return NotesForm;
})(_commonSimpleModal2['default']);

exports['default'] = NotesForm;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});