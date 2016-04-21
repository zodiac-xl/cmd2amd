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

var SuggestMis = (function (_Component) {
    _inherits(SuggestMis, _Component);

    function SuggestMis() {
        _classCallCheck(this, SuggestMis);

        _get(Object.getPrototypeOf(SuggestMis.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            user: {
                id: '',
                name: '',
                key: ''
            }
        };
    }

    _createClass(SuggestMis, [{
        key: 'getSuggest',
        value: function getSuggest(query, response) {

            (0, _utilBdAjax2['default'])({
                url: "/api/user/login/" + query + ".json",
                des: '获取mis推荐'
            }).done(function (e) {
                response(null, e.data);
            });
        }
    }, {
        key: 'onSuggestionSelected',
        value: function onSuggestionSelected(suggestion, e) {

            this.props.onSuggestionSelected && this.props.onSuggestionSelected(suggestion, e);
            this.setState({
                user: suggestion
            });
        }
    }, {
        key: 'onChange',
        value: function onChange(value) {
            var newState = this.state;
            if (value != this.state.name) {
                newState.user = {
                    id: '',
                    name: '',
                    key: value
                };
                this.setState(newState);
            }
            this.props.onChange && this.props.onChange(newState.user);
        }
    }, {
        key: 'render',
        value: function render() {
            var suggestionRenderer = function suggestionRenderer(suggestion, input) {
                return _react2['default'].createElement(
                    'span',
                    null,
                    suggestion.name
                );
            };

            var suggestionValue = function suggestionValue(suggestion) {
                return suggestion.key;
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
            placeholder: 'mis',
            style: { width: '240px' },
            onChange: null
        },
        enumerable: true
    }]);

    return SuggestMis;
})(_react.Component);

exports['default'] = SuggestMis;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});