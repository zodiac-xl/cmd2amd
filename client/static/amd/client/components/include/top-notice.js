'use strict';

define(["/amd/node_modules/lodash/index.js","/amd/node_modules/humanize-ms/index.js"], function (ref_1,ref_2) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"lodash":{"index":0,"path":"node_modules/lodash/index.js"},"humanize-ms":{"index":1,"path":"node_modules/humanize-ms/index.js"}};
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

var _lodash = cmd2amdLoadModule('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _humanizeMs = cmd2amdLoadModule('humanize-ms');

var _humanizeMs2 = _interopRequireDefault(_humanizeMs);

var Alert = (function (_React$Component) {
    _inherits(Alert, _React$Component);

    function Alert() {
        _classCallCheck(this, Alert);

        _get(Object.getPrototypeOf(Alert.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            closed: false
        };
    }

    _createClass(Alert, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this = this;

            var autoClose = this.props.autoClose;

            if (autoClose !== 0) {
                this._timer = setTimeout(function () {
                    _this.close();
                }, autoClose);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var autoClose = this.props.autoClose;

            if (autoClose !== 0) {
                clearTimeout(this._timer);
            }
        }
    }, {
        key: 'onClose',
        value: function onClose(event) {
            if (this.props.onClose(event) !== false) {
                this.close();
            }
        }
    }, {
        key: 'close',
        value: function close() {
            this.setState({
                closed: true
            });
        }
    }, {
        key: 'renderIcon',
        value: function renderIcon() {
            var _props = this.props;
            var icon = _props.icon;
            var myStyle = _props.myStyle;
            var iconMapping = _props.iconMapping;

            if (_lodash2['default'].isBoolean(icon) && icon) {
                var _icon = iconMapping[myStyle] || iconMapping[myStyle].info;
                return _react2['default'].createElement('i', { className: '' + _icon });
            }
            return _react2['default'].createElement('i', { className: '' + icon });
        }
    }, {
        key: 'renderCloseBtn',
        value: function renderCloseBtn() {
            return _react2['default'].createElement(
                'button',
                {
                    type: 'button',
                    className: 'close',
                    onClick: this.onClose.bind(this)
                },
                '×'
            );
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.closed) {
                return _react2['default'].createElement('div', null);
            }
            return _react2['default'].createElement(
                'div',
                {
                    style: this.props.style,
                    className: 'cat-alert cat-alert-' + this.props.myStyle + ' ' + (this.props.className ? this.props.className : '')
                },
                this.renderCloseBtn(),
                this.renderIcon(),
                this.props.children
            );
        }
    }], [{
        key: 'propTypes',
        value: {
            myStyle: _react2['default'].PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
            style: _react2['default'].PropTypes.object,
            icon: _react2['default'].PropTypes.any,
            iconMapping: _react2['default'].PropTypes.object,
            children: _react2['default'].PropTypes.any,
            className: _react2['default'].PropTypes.string,
            close: _react2['default'].PropTypes.bool,
            onClose: _react2['default'].PropTypes.func,
            autoClose: _react2['default'].PropTypes.number
        },
        enumerable: true
    }, {
        key: 'defaultProps',
        value: {
            myStyle: 'info',
            icon: true,
            close: false,
            autoClose: 0,
            onClose: function onClose() {},
            iconMapping: {
                info: 'glyphicon glyphicon-info-sign',
                success: 'glyphicon glyphicon-ok-sign',
                warning: 'glyphicon glyphicon-question-sign',
                danger: 'glyphicon glyphicon-exclamation-sign'
            }
        },
        enumerable: true
    }]);

    return Alert;
})(_react2['default'].Component);

var TopNotice = (function (_React$Component2) {
    _inherits(TopNotice, _React$Component2);

    function TopNotice() {
        _classCallCheck(this, TopNotice);

        _get(Object.getPrototypeOf(TopNotice.prototype), 'constructor', this).apply(this, arguments);

        this.style = {
            marginBottom: 0,
            padding: '5px'
        };
    }

    _createClass(TopNotice, [{
        key: 'render',
        value: function render() {
            var content = undefined;
            switch (this.props.env) {
                case 'development':
                case 'office':
                    {
                        content = _react2['default'].createElement(
                            Alert,
                            {
                                autoClose: (0, _humanizeMs2['default'])('10s'),
                                style: this.style,
                                className: 'text-center'
                            },
                            '当前正在使用 ',
                            _react2['default'].createElement(
                                'b',
                                { className: 'text-primary' },
                                '线下',
                                this.props.env
                            ),
                            ' 环境。'
                        );
                        break;
                    }
                case 'staging':
                    {
                        content = _react2['default'].createElement(
                            Alert,
                            {
                                autoClose: (0, _humanizeMs2['default'])('10s'),
                                style: this.style,
                                myStyle: 'warning',
                                className: 'text-center'
                            },
                            '当前正在使用 ',
                            _react2['default'].createElement(
                                'b',
                                { className: 'text-danger' },
                                'staging'
                            ),
                            ' 环境，所操作、浏览数据均为线上数据。如需测试、修改数据，请谨慎。'
                        );
                        break;
                    }
                default:
                    {
                        content = _react2['default'].createElement('div', null);
                    }
            }
            return content;
        }
    }], [{
        key: 'propTypes',
        value: {
            env: _react2['default'].PropTypes.string
        },
        enumerable: true
    }, {
        key: 'defaultProps',
        value: {
            env: 'development'
        },
        enumerable: true
    }]);

    return TopNotice;
})(_react2['default'].Component);

exports['default'] = TopNotice;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});