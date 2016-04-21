'use strict';

define(["/amd/node_modules/react-bootstrap/lib/Button.js","/amd/client/components/common/form-group.js","/amd/client/components/common/super-child.js","/amd/client/components/common/my-table.js","/amd/client/components/util/bdAjax.js"], function (ref_0,ref_1,ref_2,ref_3,ref_4) {

    var cmd2amdModules = {"react-bootstrap/lib/Button":{"index":0,"path":"node_modules/react-bootstrap/lib/Button.js"},"../../../common/form-group":{"index":1,"path":"client/components/common/form-group.js"},"../../../common/super-child":{"index":2,"path":"client/components/common/super-child.js"},"../../../common/my-table":{"index":3,"path":"client/components/common/my-table.js"},"../../../util/bdAjax":{"index":4,"path":"client/components/util/bdAjax.js"}};
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

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _commonFormGroup = cmd2amdLoadModule('../../../common/form-group');

var _commonSuperChild = cmd2amdLoadModule('../../../common/super-child');

var _commonSuperChild2 = _interopRequireDefault(_commonSuperChild);

var _commonMyTable = cmd2amdLoadModule('../../../common/my-table');

var _commonMyTable2 = _interopRequireDefault(_commonMyTable);

var _utilBdAjax = cmd2amdLoadModule('../../../util/bdAjax');

var _utilBdAjax2 = _interopRequireDefault(_utilBdAjax);

var Cinemas = (function (_SuperChild) {
    _inherits(Cinemas, _SuperChild);

    function Cinemas() {
        _classCallCheck(this, Cinemas);

        _get(Object.getPrototypeOf(Cinemas.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Cinemas, [{
        key: 'defaultValue',
        value: function defaultValue() {
            return [];
        }
    }, {
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var valueLink = props.valueLink || {};
            var value = valueLink.value || this.defaultValue();
            return {
                value: value
            };
        }
    }, {
        key: 'validate',
        value: function validate() {
            var _this = this;
            var validate = true;
            if (_this.state.value.length == 0) {
                toastr.warning('请添加影院');
                _this.refs.idsfile.focus();
                validate = false;
            }
            return validate;
        }
    }, {
        key: 'deleteCinema',
        value: function deleteCinema(index) {
            var newState = this.state;
            newState.value.splice(index, 1);
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
                _this.refs.idsfile.value = cinemaIds.join(',');
            };
            if (inputFile.files[0]) {
                reader.readAsText(inputFile.files[0]);
            } else {
                toastr.warning('请先选择导入文件！');
            }
        }
    }, {
        key: 'showCinema',
        value: function showCinema() {
            var _this = this;
            var cinemaIds = _this.refs.idsfile.value;
            if (cinemaIds == "") {
                toastr.warning("请导入影院id");
                _this.refs.idsfile.focus();
                return;
            }

            (0, _utilBdAjax2['default'])({
                url: "/api/cinema/cinemas.json?cinemaIds=" + cinemaIds,
                des: '获取影院信息'
            }).done(function (e) {
                if (e.data) {
                    var data;

                    (function () {
                        var cinemasData = [];
                        var newState = _this.state;
                        var ids = [];
                        data = e.data;

                        data = data.map(function (item) {
                            return {
                                id: item.id,
                                name: item.cinemaName
                            };
                        });
                        cinemasData = newState.value.concat(data);
                        cinemasData = cinemasData.filter(function (item) {
                            var duplicate = $.inArray(item.id, ids) != -1;
                            if (!duplicate) {
                                ids.push(item.id);
                            }
                            return !duplicate;
                        });

                        newState.value = cinemasData;
                        _this.setState(newState);
                    })();
                }
            });
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var _this = this;
            var readOnly = _this.props.readOnly;
            var value = _this.state.value;

            var rightDom = undefined;
            var tableData = {
                ths: ['影院ID', '影院名', '操作'],
                trs: []
            };

            value.forEach(function (item, index) {
                var tr = {
                    id: item.id,
                    name: item.name,
                    operate: function operate($td) {
                        return React.createElement(
                            _reactBootstrapLibButton2['default'],
                            { onClick: _this.deleteCinema.bind(_this, index) },
                            '删除'
                        );
                    }
                };
                if (readOnly) {
                    delete tr.operate;
                }
                tableData.trs.push(tr);
            });

            if (readOnly) {
                tableData.ths = tableData.ths.slice(0, 2);
                rightDom = React.createElement(
                    _commonFormGroup.Right,
                    null,
                    React.createElement(_commonMyTable2['default'], { data: tableData })
                );
            } else {
                rightDom = React.createElement(
                    _commonFormGroup.Right,
                    null,
                    React.createElement(_commonMyTable2['default'], { data: tableData }),
                    React.createElement(
                        'p',
                        null,
                        '请输入影院ID：(多个影院时用英文逗号隔开)'
                    ),
                    React.createElement('input', { ref: 'idsfile' }),
                    ' ',
                    React.createElement(
                        _reactBootstrapLibButton2['default'],
                        { onClick: _this.showCinema.bind(_this) },
                        '添加'
                    ),
                    React.createElement('input', { type: 'file', className: 'hide', onChange: _this.fileChange.bind(_this), ref: 'uploadFile' }),
                    React.createElement(
                        _reactBootstrapLibButton2['default'],
                        { type: 'button', onClick: _this.triggerFile.bind(_this) },
                        '上传txt，每行写一个影院id'
                    )
                );
            }

            return React.createElement(
                _commonFormGroup.Group,
                null,
                React.createElement(
                    _commonFormGroup.Left,
                    null,
                    '影院'
                ),
                '：',
                rightDom
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            valueLink: null,
            readOnly: false
        },
        enumerable: true
    }]);

    return Cinemas;
})(_commonSuperChild2['default']);

exports['default'] = Cinemas;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});