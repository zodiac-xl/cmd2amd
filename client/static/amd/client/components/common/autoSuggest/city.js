'use strict';

define(["css!/amd/client/components/common/react-autosuggest.css","/amd/node_modules/react-autosuggest/dist/Autosuggest.js","/amd/client/components/util/bdAjax.js"], function (ref_0,ref_1,ref_2) {

    var cmd2amdModules = {"../react-autosuggest.less":{"index":0,"path":"client/components/common/react-autosuggest.less"},"react-autosuggest":{"index":1,"path":"node_modules/react-autosuggest/dist/Autosuggest.js"},"../../util/bdAjax":{"index":2,"path":"client/components/util/bdAjax.js"},"react":{"external":"React","index":null,"path":null}};
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

cmd2amdLoadModule('../react-autosuggest.less');

var _reactAutosuggest = cmd2amdLoadModule('react-autosuggest');

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _utilBdAjax = cmd2amdLoadModule('../../util/bdAjax');

var _utilBdAjax2 = _interopRequireDefault(_utilBdAjax);

var _react = cmd2amdLoadModule('react');

var _react2 = _interopRequireDefault(_react);

var SuggestCity = (function (_Component) {
    _inherits(SuggestCity, _Component);

    function SuggestCity() {
        _classCallCheck(this, SuggestCity);

        _get(Object.getPrototypeOf(SuggestCity.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            id: '',
            name: ''
        };
    }

    _createClass(SuggestCity, [{
        key: 'getSuggest',
        value: function getSuggest(query, response) {

            (0, _utilBdAjax2['default'])({
                url: this.props.url,
                data: {
                    orgLevel: 2,
                    name: query
                },
                des: '获取城市推荐'
            }).done(function (e) {
                response(null, e.data);
            });
        }
    }, {
        key: 'onSuggestionSelected',
        value: function onSuggestionSelected(suggestion, e) {

            var name = undefined;
            var id = null;
            if (Object.prototype.toString.apply(suggestion) == '[object String]') {
                name = suggestion;
            } else {
                name = suggestion.name;
                id = suggestion.id;
            }
            this.props.onSuggestionSelected && this.props.onSuggestionSelected(suggestion, e);
            this.setState({
                id: id,
                name: name
            });
        }
    }, {
        key: 'onChange',
        value: function onChange(value) {

            var newState = this.state;
            if (value != this.state.name) {
                newState.user = {
                    name: '', id: ''
                };
                this.setState(newState);
            }
            this.props.onChange && this.props.onChange(newState);
        }
    }, {
        key: 'initSubRegion',
        value: function initSubRegion(orgId) {

            var url;
            var data = {};
            var bdId = window.User.userId;
            var $subRegion = $(ReactDOM.findDOMNode(this.refs['subRegion']));
            var selfSubRegion = orgId == undefined;

            if (orgId == 0) {
                var options = '<option value="0" selected>全部</option>';
                $subRegion.html(options);
                return;
            }

            if (!selfSubRegion) {
                url = '/api/org/' + orgId + '.json';
                data = {
                    descendants: 1
                };
            } else {
                //没有上级区域id 获取该bd相关分区

                url = '/api/org/subs/' + bdId + '.json';
            }
            this.ajax({
                url: url,
                des: "获取分区列表",
                data: data
            }).done(function (e) {
                var data = null;
                var options = '<option value="0" selected>全部</option>';

                if (!selfSubRegion) {
                    data = e.data && e.data.descendants;
                } else {
                    data = e.data;
                }
                data && $.each(data, function (i, item) {
                    options += '<option value="' + item.id + '">' + item.name + '</option>';
                });
                $subRegion.html(options);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var suggestionRenderer = function suggestionRenderer(suggestion, input) {
                var name = undefined;
                var id = null;
                if (Object.prototype.toString.apply(suggestion) == '[object String]') {
                    name = suggestion;
                } else {
                    name = suggestion.name;
                    id = suggestion.id;
                }
                return _react2['default'].createElement(
                    'span',
                    null,
                    _react2['default'].createElement(
                        'strong',
                        null,
                        name.slice(0, input.length)
                    ),
                    '' + name.slice(input.length)
                );
            };

            var suggestionValue = function suggestionValue(suggestion) {
                var name = undefined;
                if (Object.prototype.toString.apply(suggestion) == '[object String]') {
                    name = suggestion;
                } else {
                    name = suggestion.name;
                }
                return name;
            };

            return _react2['default'].createElement(_reactAutosuggest2['default'], {
                inputAttributes: { placeholder: this.props.placeholder, style: this.props.style, onChange: this.onChange.bind(this) },
                suggestions: this.getSuggest.bind(this), suggestionRenderer: suggestionRenderer,
                suggestionValue: suggestionValue,
                onSuggestionSelected: this.onSuggestionSelected.bind(this) });
        }
    }], [{
        key: 'defaultProps',
        value: {
            placeholder: '输入城市进行模糊搜索',
            style: { width: '240px' },
            url: '/api/org/searchCity.json'
        },
        enumerable: true
    }]);

    return SuggestCity;
})(_react.Component);

exports['default'] = SuggestCity;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});