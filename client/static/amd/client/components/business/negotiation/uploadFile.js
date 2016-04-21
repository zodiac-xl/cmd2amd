'use strict';

define(["/amd/client/components/common/form-group.js","/amd/client/components/common/attachments.js","/amd/client/components/common/simple-modal.js","/amd/client/components/util/bdAjax.js","/amd/client/components/business/negotiation/task-info.js","/amd/client/components/business/negotiation/table-priceInfos.js"], function (ref_1,ref_2,ref_3,ref_4,ref_5,ref_6) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"../../common/form-group":{"index":0,"path":"client/components/common/form-group.js"},"../../common/attachments":{"index":1,"path":"client/components/common/attachments.js"},"../../common/simple-modal":{"index":2,"path":"client/components/common/simple-modal.js"},"../../util/bdAjax":{"index":3,"path":"client/components/util/bdAjax.js"},"./task-info":{"index":4,"path":"client/components/business/negotiation/task-info.js"},"./table-priceInfos":{"index":5,"path":"client/components/business/negotiation/table-priceInfos.js"}};
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

var _commonFormGroup = cmd2amdLoadModule('../../common/form-group');

var _commonAttachments = cmd2amdLoadModule('../../common/attachments');

var _commonAttachments2 = _interopRequireDefault(_commonAttachments);

var _commonSimpleModal = cmd2amdLoadModule('../../common/simple-modal');

var _commonSimpleModal2 = _interopRequireDefault(_commonSimpleModal);

var _utilBdAjax = cmd2amdLoadModule('../../util/bdAjax');

var _utilBdAjax2 = _interopRequireDefault(_utilBdAjax);

//fragments

var _taskInfo = cmd2amdLoadModule('./task-info');

var _taskInfo2 = _interopRequireDefault(_taskInfo);

var _tablePriceInfos = cmd2amdLoadModule('./table-priceInfos');

var _tablePriceInfos2 = _interopRequireDefault(_tablePriceInfos);

var UploadFile = (function (_SimpleModal) {
    _inherits(UploadFile, _SimpleModal);

    function UploadFile() {
        _classCallCheck(this, UploadFile);

        _get(Object.getPrototypeOf(UploadFile.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            //ui
            isLoading: false,
            show: true,

            files: []
        };
    }

    _createClass(UploadFile, [{
        key: 'submit',
        value: function submit(commmit) {
            var _this = this;
            var files = this.state.files;
            if (this.state.files.length == 0) {
                toastr.warning('请上传附件');
                return;
            }
            this.onSubmit({
                url: '/api/activity/task/' + _this.props.taskId + '/cinema/' + _this.props.cinemaId + '/negotiationInfo/files.json',
                type: "POST",
                des: '上传附件',
                showSuccess: true,
                data: { files: JSON.stringify(files) }
            });
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {

            var _this = this;

            var taskInfoProps = {
                ref: "taskInfo",
                taskInfo: _this.props.taskInfo,
                cinemaId: _this.props.cinemaId,
                cinemaName: _this.props.cinemaName,
                readOnly: true
            };

            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(_taskInfo2['default'], taskInfoProps),
                _react2['default'].createElement(_commonFormGroup.Hr, null),
                _react2['default'].createElement(_tablePriceInfos2['default'], { cinemaId: _this.props.cinemaId, taskId: _this.props.taskId }),
                _react2['default'].createElement(_commonFormGroup.Hr, null),
                _react2['default'].createElement(_commonAttachments2['default'], { readOnly: false, label: '调价函/调价邮件截图',
                    valueLink: _this.nestLinkedState(["files"], _this) }),
                _react2['default'].createElement(_commonFormGroup.Hr, null)
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            freshParent: function freshParent() {},

            taskId: null,
            cinemaId: null,
            cinemaName: null,
            taskInfo: null,

            title: '上传附件',
            bsSize: 'large'
        },
        enumerable: true
    }]);

    return UploadFile;
})(_commonSimpleModal2['default']);

exports['default'] = UploadFile;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});