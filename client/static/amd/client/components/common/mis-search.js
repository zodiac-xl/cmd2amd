'use strict';

define(["css!/amd/client/components/common/react-autosuggest.css","/amd/node_modules/react-autosuggest/dist/Autosuggest.js","/amd/node_modules/lodash/function/debounce.js","/amd/client/components/util/bdAjax.js"], function (ref_0,ref_2,ref_3,ref_4) {

    var cmd2amdModules = {"./react-autosuggest.less":{"index":0,"path":"client/components/common/react-autosuggest.less"},"react":{"external":"React","index":null,"path":null},"react-autosuggest":{"index":1,"path":"node_modules/react-autosuggest/dist/Autosuggest.js"},"lodash/function/debounce":{"index":2,"path":"node_modules/lodash/function/debounce.js"},"../util/bdAjax":{"index":3,"path":"client/components/util/bdAjax.js"}};
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

cmd2amdLoadModule('./react-autosuggest.less');

var _react = cmd2amdLoadModule('react');

var _reactAutosuggest = cmd2amdLoadModule('react-autosuggest');

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _lodashFunctionDebounce = cmd2amdLoadModule('lodash/function/debounce');

var _lodashFunctionDebounce2 = _interopRequireDefault(_lodashFunctionDebounce);

var _utilBdAjax = cmd2amdLoadModule('../util/bdAjax');

var _utilBdAjax2 = _interopRequireDefault(_utilBdAjax);

var MisSearch = (function (_Component) {
    _inherits(MisSearch, _Component);

    function MisSearch() {
        _classCallCheck(this, MisSearch);

        _get(Object.getPrototypeOf(MisSearch.prototype), 'constructor', this).apply(this, arguments);

        this.state = {
            value: '',
            suggestions: []
        };
        this.debouncedSearchMisAccounts = (0, _lodashFunctionDebounce2['default'])(this.searchMisAccounts, 500);
    }

    _createClass(MisSearch, [{
        key: 'searchMisAccounts',
        value: function searchMisAccounts(value, callback) {
            (0, _utilBdAjax2['default'])({
                url: '/api/admin/user/login/' + value + '.json',
                type: 'GET',
                des: '搜索 MIS 账号'
            }).done(function (result) {
                callback(null, result.data || []);
                // callback(null, [{name: '严文序', key: 'yanwenxu', userId: 112312}]);
            });
        }
    }, {
        key: 'onItemSelect',
        value: function onItemSelect(suggestion) {
            this.props.onChange(suggestion);
        }
    }, {
        key: 'getInputAttrs',
        value: function getInputAttrs() {
            var _props = this.props;
            var _props$placeholder = _props.placeholder;
            var placeholder = _props$placeholder === undefined ? '请输入关键字' : _props$placeholder;
            var _props$inputClassName = _props.inputClassName;
            var inputClassName = _props$inputClassName === undefined ? '' : _props$inputClassName;

            return {
                className: inputClassName,
                placeholder: placeholder
            };
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(_reactAutosuggest2['default'], {
                suggestions: this.debouncedSearchMisAccounts,
                onSuggestionSelected: this.onItemSelect.bind(this),
                suggestionValue: getSuggestionValue,
                suggestionRenderer: renderSuggestion,
                inputAttributes: this.getInputAttrs() });
        }
    }]);

    return MisSearch;
})(_react.Component);

exports['default'] = MisSearch;

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion, input) {
    return React.createElement(
        'span',
        null,
        suggestion.name + '（' + suggestion.key + '）'
    );
}
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});