'use strict';

define(["/amd/client/components/common/form-group.js","/amd/client/components/common/attachments.js"], function (ref_1,ref_2) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"../../common/form-group.js":{"index":0,"path":"client/components/common/form-group.js"},"../../common/attachments.js":{"index":1,"path":"client/components/common/attachments.js"}};
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

var _commonFormGroupJs = cmd2amdLoadModule('../../common/form-group.js');

//fragments

var _commonAttachmentsJs = cmd2amdLoadModule('../../common/attachments.js');

var _commonAttachmentsJs2 = _interopRequireDefault(_commonAttachmentsJs);

var TaskInfo = (function (_React$Component) {
    _inherits(TaskInfo, _React$Component);

    function TaskInfo() {
        _classCallCheck(this, TaskInfo);

        _get(Object.getPrototypeOf(TaskInfo.prototype), 'constructor', this).apply(this, arguments);

        this.state = {};
    }

    _createClass(TaskInfo, [{
        key: 'render',
        value: function render() {
            var _this = this;
            var taskInfo = _this.props.taskInfo;

            var designationSystemTips = undefined;
            if (_this.props.showDesignationSystemTips) {
                designationSystemTips = _react2['default'].createElement(
                    'div',
                    { className: 'text-danger text-center' },
                    '该售票系统影院可自行调价，低于最低限价且差额部分由影城承担的调价可正常申请。'
                );
            }
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'div',
                    { className: 'text-danger text-center' },
                    '调价内容以“分时段价格”标签下填写内容为准，提交前请仔细核对。'
                ),
                designationSystemTips,
                _react2['default'].createElement(
                    _commonFormGroupJs.Group,
                    null,
                    _react2['default'].createElement(
                        _commonFormGroupJs.Left,
                        null,
                        '影院ID'
                    ),
                    '：',
                    _react2['default'].createElement(
                        _commonFormGroupJs.Right,
                        null,
                        _this.props.cinemaId
                    )
                ),
                _react2['default'].createElement(
                    _commonFormGroupJs.Group,
                    null,
                    _react2['default'].createElement(
                        _commonFormGroupJs.Left,
                        null,
                        '影院名'
                    ),
                    '：',
                    _react2['default'].createElement(
                        _commonFormGroupJs.Right,
                        null,
                        _this.props.cinemaName
                    )
                ),
                (function () {
                    if (taskInfo) {
                        var _ret = (function () {
                            var movieNames = ["全部影院"];
                            var timeRanges = [];

                            if (taskInfo.movies && taskInfo.movies.length > 0) {
                                movieNames = [];
                                $.each(taskInfo.movies, function (i, movie) {
                                    movieNames.push(movie.nm);
                                });
                            }
                            movieNames = movieNames.join("，");

                            taskInfo.timeRanges && $.each(taskInfo.timeRanges, function (index, timeRange) {
                                timeRanges.push(_react2['default'].createElement(
                                    'div',
                                    { key: index },
                                    timeRange.startTime,
                                    '--',
                                    timeRange.endTime
                                ));
                            });
                            return {
                                v: _react2['default'].createElement(
                                    'div',
                                    null,
                                    _react2['default'].createElement(
                                        _commonFormGroupJs.Group,
                                        null,
                                        _react2['default'].createElement(
                                            _commonFormGroupJs.Left,
                                            null,
                                            '任务名'
                                        ),
                                        '：',
                                        _react2['default'].createElement(
                                            _commonFormGroupJs.Right,
                                            null,
                                            taskInfo.taskName
                                        )
                                    ),
                                    _react2['default'].createElement(
                                        _commonFormGroupJs.Group,
                                        null,
                                        _react2['default'].createElement(
                                            _commonFormGroupJs.Left,
                                            null,
                                            '任务方案'
                                        ),
                                        '：',
                                        _react2['default'].createElement(
                                            _commonFormGroupJs.Right,
                                            null,
                                            taskInfo.plan
                                        )
                                    ),
                                    (function () {
                                        if (taskInfo.movies && taskInfo.movies.length > 0) {
                                            return _react2['default'].createElement(
                                                _commonFormGroupJs.Group,
                                                null,
                                                _react2['default'].createElement(
                                                    _commonFormGroupJs.Left,
                                                    null,
                                                    '参与任务影片'
                                                ),
                                                '：',
                                                _react2['default'].createElement(
                                                    _commonFormGroupJs.Right,
                                                    null,
                                                    movieNames
                                                )
                                            );
                                        }
                                    })(),
                                    (function () {
                                        if (timeRanges.length > 0) {
                                            return _react2['default'].createElement(
                                                _commonFormGroupJs.Group,
                                                null,
                                                _react2['default'].createElement(
                                                    _commonFormGroupJs.Left,
                                                    null,
                                                    '任务时间'
                                                ),
                                                '：',
                                                _react2['default'].createElement(
                                                    _commonFormGroupJs.Right,
                                                    null,
                                                    timeRanges
                                                )
                                            );
                                        }
                                    })(),
                                    (function () {
                                        if (_this.props.taskInfo.files && _this.props.taskInfo.files.length > 0) {
                                            return _react2['default'].createElement(_commonAttachmentsJs2['default'], { readOnly: true, file: _this.props.taskInfo.files });
                                        }
                                    })()
                                )
                            };
                        })();

                        if (typeof _ret === 'object') return _ret.v;
                    }
                })(),
                (function () {
                    var auditInfo = _this.props.auditInfo;
                    if (auditInfo) {
                        return _react2['default'].createElement(
                            _commonFormGroupJs.Group,
                            null,
                            _react2['default'].createElement(
                                _commonFormGroupJs.Left,
                                null,
                                '上次驳回原因'
                            ),
                            '：',
                            _react2['default'].createElement(
                                _commonFormGroupJs.Right,
                                null,
                                _react2['default'].createElement(
                                    'span',
                                    { className: 'text-danger' },
                                    auditInfo.reason
                                )
                            )
                        );
                    }
                })()
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            taskInfo: null,
            sellsrc: null,
            cinemaId: null,
            cinemaName: null,
            auditInfo: null,
            showDesignationSystemTips: false,
            readOnly: false
        },
        enumerable: true
    }]);

    return TaskInfo;
})(_react2['default'].Component);

exports['default'] = TaskInfo;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});