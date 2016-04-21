'use strict';

define(["/amd/node_modules/react-bootstrap/lib/Button.js","/amd/client/components/util/bdAjax.js","/amd/client/components/common/form-group.js"], function (ref_1,ref_2,ref_3) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-bootstrap/lib/Button":{"index":0,"path":"node_modules/react-bootstrap/lib/Button.js"},"../util/bdAjax.js":{"index":1,"path":"client/components/util/bdAjax.js"},"./form-group.js":{"index":2,"path":"client/components/common/form-group.js"}};
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

var _reactBootstrapLibButton = cmd2amdLoadModule('react-bootstrap/lib/Button');

var _reactBootstrapLibButton2 = _interopRequireDefault(_reactBootstrapLibButton);

var _utilBdAjaxJs = cmd2amdLoadModule('../util/bdAjax.js');

var _utilBdAjaxJs2 = _interopRequireDefault(_utilBdAjaxJs);

var _formGroupJs = cmd2amdLoadModule('./form-group.js');

var Attachments = (function (_Component) {
    _inherits(Attachments, _Component);

    function Attachments() {
        _classCallCheck(this, Attachments);

        _get(Object.getPrototypeOf(Attachments.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            attachments: this.getStateByProps(this.props)
        };
    }

    _createClass(Attachments, [{
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var valueLink = props.valueLink || {};
            var value = valueLink.value || props.file || [];

            var attachments = [];
            value.forEach(function (item, i) {

                var isImage = false;
                var url = item.url;
                var target = "";
                var name = item.name;

                if (/.(png|jpg|jpeg)/.test(name)) {
                    isImage = true;
                }
                if (isImage) {
                    target = "_blank";
                }
                attachments.push({
                    id: item.id,
                    url: url,
                    target: target,
                    name: name,
                    isImage: isImage
                });
            });
            return attachments;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var attachments = this.getStateByProps(nextProps);
            this.setState({
                attachments: attachments
            });
        }
    }, {
        key: 'onComponentChange',
        value: function onComponentChange(data) {
            var valueLink = this.props.valueLink || {};
            var requestChange = valueLink.requestChange;
            if (requestChange) {
                requestChange(data);
            }
        }
    }, {
        key: 'add',
        value: function add(data) {
            var valueLink = this.props.valueLink;
            var attachments = valueLink.value || [];

            attachments.push(data);
            this.onComponentChange(attachments);
        }
    }, {
        key: 'delete',
        value: function _delete(i) {
            var valueLink = this.props.valueLink;
            var attachments = valueLink.value;
            attachments.splice(i, 1);
            this.onComponentChange(attachments);
        }
    }, {
        key: 'uploadFile',
        value: function uploadFile() {
            var event = new Event('click', { bubbles: false });
            this.refs.uploadFile.dispatchEvent(event);
        }
    }, {
        key: 'fileChange',
        value: function fileChange(e) {
            var _this = this;
            var file = e.target.files[0];
            var formData = new FormData();

            //大小限制为1M  图片、excel（包括xis、xlsx）、word（包括doc、docx）、txt、pdf
            var extArray = [".jpg", "jpeg", ".png", ".txt", ".xls", "xlsx", ".doc", ".docx", ".pdf"];
            var ext = file.name.slice(file.name.indexOf(".")).toLowerCase();
            var rightExt = false;
            for (var i = 0; i < extArray.length; i++) {
                if (extArray[i] == ext) {
                    rightExt = true;
                    break;
                }
            }
            if (!rightExt) {
                toastr.warning("非法的文件后缀");
                return;
            }
            if (file.size > 1024 * 1024) {
                toastr.warning("文件大小限制为1M");
                return;
            }

            _this.setState({ isLoading: true });

            formData.append('file', file);

            (0, _utilBdAjaxJs2['default'])({
                url: '/api/fileUpload',
                type: 'POST',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (data) {
                var file = data[0];
                _this.add(file);
            }).fail(function () {
                console.log("上传文件失败");
            }).always(function () {
                _this.setState({ isLoading: true });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var hideStyle = {
                display: "none"
            };
            var _this = this;
            var readOnly = _this.props.readOnly;

            var attachments = this.state.attachments.map(function (attachment, i) {
                var href = attachment.url;
                return _react2['default'].createElement(
                    'div',
                    { key: i, style: { margin: '5px 0' } },
                    _react2['default'].createElement(
                        'a',
                        { target: attachment.target, href: href },
                        _react2['default'].createElement('span', null),
                        attachment.name
                    ),
                    (function () {
                        if (!readOnly) {
                            return _react2['default'].createElement(
                                _reactBootstrapLibButton2['default'],
                                { onClick: _this['delete'].bind(_this, i) },
                                '删除'
                            );
                        } else {
                            return "";
                        }
                    })()
                );
            });

            return _react2['default'].createElement(
                _formGroupJs.Group,
                null,
                _react2['default'].createElement(
                    _formGroupJs.Left,
                    null,
                    _this.props.label
                ),
                '：',
                _react2['default'].createElement(
                    _formGroupJs.Right,
                    null,
                    (function () {
                        if (!readOnly) {
                            return _react2['default'].createElement(
                                'div',
                                null,
                                _react2['default'].createElement('input', { type: 'hidden', className: 'files' }),
                                _react2['default'].createElement('input', { type: 'file', style: hideStyle, ref: 'uploadFile',
                                    onChange: _this2.fileChange.bind(_this2) }),
                                _react2['default'].createElement(
                                    _reactBootstrapLibButton2['default'],
                                    { onClick: _this2.uploadFile.bind(_this2) },
                                    '上传'
                                )
                            );
                        }
                    })(),
                    _react2['default'].createElement(
                        'div',
                        null,
                        attachments
                    )
                )
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            valueLink: null,
            readOnly: false,
            file: [],
            label: '附件'
        },
        enumerable: true
    }]);

    return Attachments;
})(_react.Component);

exports['default'] = Attachments;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});