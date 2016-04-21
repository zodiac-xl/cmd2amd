'use strict';

define(["/amd/node_modules/react-bootstrap/lib/Table.js"], function (ref_1) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-bootstrap/lib/Table":{"index":0,"path":"node_modules/react-bootstrap/lib/Table.js"}};
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = cmd2amdLoadModule('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrapLibTable = cmd2amdLoadModule('react-bootstrap/lib/Table');

var _reactBootstrapLibTable2 = _interopRequireDefault(_reactBootstrapLibTable);

var MyTable = (function (_Component) {
    _inherits(MyTable, _Component);

    function MyTable() {
        _classCallCheck(this, MyTable);

        _get(Object.getPrototypeOf(MyTable.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(MyTable, [{
        key: 'findMergeKey',
        value: function findMergeKey(trData) {
            var mergeKey = undefined;
            $.each(trData, function (key, value) {

                if ($.type(value) == "array") {
                    mergeKey = key;
                    return false;
                }
            });
            return mergeKey;
        }
    }, {
        key: 'makeTd',
        value: function makeTd(tdData, tdKey, rowSpan) {
            var td = undefined;
            var valueType = $.type(tdData);
            var style = {
                "verticalAlign": "middle",
                "textAlign": "center"
            };
            switch (valueType) {
                case "function":

                    var result = tdData();
                    if ($.isFunction(result)) {
                        td = result(style, rowSpan, tdKey);
                    } else {
                        td = _react2['default'].createElement(
                            'td',
                            { style: style, rowSpan: rowSpan, key: tdKey },
                            result
                        );
                    }

                    break;
                default:
                    td = _react2['default'].createElement(
                        'td',
                        { style: style, rowSpan: rowSpan, key: tdKey },
                        tdData
                    );
                    break;
            }
            return td;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;
            var ths = [];
            $.each(this.props.data.ths, function (key, value) {
                var th = undefined;
                var valueType = $.type(value);
                var thKey = 'th-' + key;
                var style = {
                    "verticalAlign": "middle",
                    "textAlign": "center",
                    "whiteSpace": "nowrap"
                };
                switch (valueType) {
                    case "function":

                        var result = value();
                        if ($.isFunction(result)) {
                            th = result(style, thKey);
                        } else {
                            th = _react2['default'].createElement(
                                'th',
                                { style: style, key: thKey },
                                value()
                            );
                        }
                        break;
                    default:
                        th = _react2['default'].createElement(
                            'th',
                            { style: style, key: thKey },
                            value
                        );
                        break;
                }
                ths.push(th);
            });

            var trs = [];
            $.each(this.props.data.trs, function (index, trData) {
                var mergeKey = _this.findMergeKey(trData);
                var mergeTrsData = trData[mergeKey];
                var needMerge = mergeKey != undefined;
                if (!mergeTrsData || mergeTrsData.length == 0) {
                    mergeTrsData = [{}];
                }
                $.each(mergeTrsData, function (i, mergeTrData) {
                    var tr = undefined;
                    var tds = [];
                    var rowSpan = 1;

                    $.each(trData, function (key, value) {
                        if (key == mergeKey) {
                            $.each(mergeTrData, function (subTdkey, value) {
                                var tdKey = index + '-' + i + '-' + key + '-' + subTdkey;
                                var td = _this.makeTd(value, tdKey, rowSpan);
                                tds.push(td);
                            });
                        } else {
                            if (needMerge) {
                                //如果需要merge 只有第一次才makeTd
                                if (i == 0) {
                                    var tdKey = index + '-' + i + '-' + key;
                                    var td = _this.makeTd(value, tdKey, mergeTrsData.length);
                                    tds.push(td);
                                }
                            } else {
                                var tdKey = index + '-' + i + '-' + key;
                                var td = _this.makeTd(value, tdKey, rowSpan);
                                tds.push(td);
                            }
                        }
                    });
                    tr = _react2['default'].createElement(
                        'tr',
                        { key: index + '-' + i },
                        tds
                    );
                    trs.push(tr);
                });
            });
            if (trs.length == 0) {
                trs.push(_react2['default'].createElement(
                    'tr',
                    { key: 'noData' },
                    _react2['default'].createElement(
                        'td',
                        { style: { textAlign: "center" }, colSpan: '1000' },
                        '没有数据'
                    )
                ));
            }

            var _props = this.props;
            var data = _props.data;

            var other = _objectWithoutProperties(_props, ['data']);

            return _react2['default'].createElement(
                _reactBootstrapLibTable2['default'],
                _extends({ striped: true, bordered: true, condensed: true, hover: true }, other),
                _react2['default'].createElement(
                    'thead',
                    null,
                    _react2['default'].createElement(
                        'tr',
                        null,
                        ths
                    )
                ),
                _react2['default'].createElement(
                    'tbody',
                    null,
                    trs
                )
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            data: {}
        },
        enumerable: true
    }]);

    return MyTable;
})(_react.Component);

exports['default'] = MyTable;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});