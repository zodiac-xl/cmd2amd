'use strict';

define(["/amd/node_modules/react-bootstrap/lib/Button.js","/amd/client/components/common/simple-modal.js","/amd/client/components/common/my-table.js","/amd/client/components/util/bdAjax.js"], function (ref_2,ref_3,ref_4,ref_5) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-dom":{"external":"ReactDOM","index":null,"path":null},"react-bootstrap/lib/Button":{"index":0,"path":"node_modules/react-bootstrap/lib/Button.js"},"../../common/simple-modal":{"index":1,"path":"client/components/common/simple-modal.js"},"../../common/my-table":{"index":2,"path":"client/components/common/my-table.js"},"../../util/bdAjax":{"index":3,"path":"client/components/util/bdAjax.js"}};
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

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _commonSimpleModal = cmd2amdLoadModule('../../common/simple-modal');

var _commonSimpleModal2 = _interopRequireDefault(_commonSimpleModal);

var _commonMyTable = cmd2amdLoadModule('../../common/my-table');

var _commonMyTable2 = _interopRequireDefault(_commonMyTable);

var _utilBdAjax = cmd2amdLoadModule('../../util/bdAjax');

var _utilBdAjax2 = _interopRequireDefault(_utilBdAjax);

var AddCinema = (function (_SimpleModal) {
    _inherits(AddCinema, _SimpleModal);

    function AddCinema() {
        _classCallCheck(this, AddCinema);

        _get(Object.getPrototypeOf(AddCinema.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            cinemaIds: '',
            show: true,
            title: '增加影院',
            tableData: {
                ths: ['影院ID', '影院名', '大区', '城市', '操作'],
                trs: []
            }

        };
    }

    _createClass(AddCinema, [{
        key: 'submit',
        value: function submit() {
            var _this = this;
            var taskId = _this.props.taskId;
            var cinemaIds = _this.state.cinemaIds;
            if (cinemaIds == "") {
                toastr.warning("请导入影院id");
                this.refs.idsfile.focus();
                return;
            }
            _this.onSubmit({
                url: "/api/activity/task/" + taskId + "/cinemas.json",
                type: "POST",
                dataType: "json",
                data: { cinemaIds: cinemaIds },
                des: '增加影院'
            }).done(function (res) {
                var failedText = "";
                if (res.data && res.data.failedCinemaIds && res.data.failedCinemaIds.length > 0) {
                    failedText = "，添加失败影院ID为：" + res.data.failedCinemaIds.join(",");
                }
                if (failedText) {
                    toastr.warning(res.message + failedText);
                }
            });
        }
    }, {
        key: 'showCinema',
        value: function showCinema() {
            var _this = this;
            var cinemaIds = _this.state.cinemaIds;
            if (cinemaIds == "") {
                toastr.warning("请导入影院id");
                this.refs.idsfile.focus();
                return;
            }

            (0, _utilBdAjax2['default'])({
                url: "/api/cinema/cinemas.json?cinemaIds=" + cinemaIds,
                des: '获取影院信息'
            }).done(function (e) {
                if (e.data) {
                    var cinemasData = [];
                    $.each(e.data, function (index, item) {
                        cinemasData.push({
                            cinemaId: item.id,
                            cinemaName: item.cinemaName,
                            regionName: item.regionName,
                            cityName: item.cityName,
                            operate: function operate($td) {
                                return _react2['default'].createElement(
                                    'button',
                                    { type: 'button', onClick: _this.deleteCinema.bind(_this, index) },
                                    '删除'
                                );
                            }
                        });
                    });
                    var newState = _this.state;
                    newState.tableData.trs = cinemasData;
                    _this.setState(newState);
                }
            });
        }
    }, {
        key: 'deleteCinema',
        value: function deleteCinema(index) {
            var newState = this.state;
            newState.tableData.trs.splice(index, 1);
            this.setState(newState);
        }
    }, {
        key: 'triggerFile',
        value: function triggerFile() {
            var event = new Event('click', { bubbles: false });
            this.refs.uploadFile.dispatchEvent(event);
        }
    }, {
        key: 'fileChange',
        value: function fileChange(e) {
            var _this = this;
            //上传文件 追加影院
            var reader = new FileReader(),
                inputFile = $(e.target)[0];

            reader.onload = function (e) {

                var cinemaIds = [];
                $.each(e.target.result.split('\n'), function (index, item) {
                    var id = item.match(/\d+/g);
                    if (id && id[0] != undefined) {
                        cinemaIds.push(id[0]);
                    }
                });

                _this.setState({
                    cinemaIds: cinemaIds.join(',')
                });
            };
            if (inputFile.files[0]) {
                reader.readAsText(inputFile.files[0]);
            } else {
                toastr.warning('请先选择导入文件！');
            }
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            var _this = this;
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(_commonMyTable2['default'], { data: _this.state.tableData }),
                _react2['default'].createElement('br', null),
                _react2['default'].createElement(
                    'label',
                    null,
                    '请输入影院ID：（多个影院时用英文逗号隔开）'
                ),
                _react2['default'].createElement('br', null),
                _react2['default'].createElement('input', { valueLink: _this.nestLinkedState(['cinemaIds'], _this), ref: 'idsfile' }),
                ' ',
                _react2['default'].createElement(
                    _reactBootstrapLibButton2['default'],
                    { onClick: _this.showCinema.bind(_this) },
                    '展示影院'
                ),
                _react2['default'].createElement('br', null),
                _react2['default'].createElement(
                    'div',
                    null,
                    _react2['default'].createElement('input', { type: 'file', className: 'hide', onChange: _this.fileChange.bind(_this), ref: 'uploadFile' }),
                    _react2['default'].createElement(
                        _reactBootstrapLibButton2['default'],
                        { onClick: _this.triggerFile.bind(_this) },
                        '上传txt，每行写一个影院id'
                    )
                )
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            taskId: '',
            freshParent: function freshParent() {}
        },
        enumerable: true
    }]);

    return AddCinema;
})(_commonSimpleModal2['default']);

exports['default'] = AddCinema;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});