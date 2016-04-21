'use strict';

define(["/amd/client/pages/bd/apply/online/bind/react-path-link.js"], function (ref_0) {

    var cmd2amdModules = {"./react-path-link":{"index":0,"path":"client/pages/bd/apply/online/bind/react-path-link.js"}};
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

var _reactPathLink = cmd2amdLoadModule('./react-path-link');

var _reactPathLink2 = _interopRequireDefault(_reactPathLink);

var ReactCheckedMaskPathLink = (function (_ReactPathLink) {
    _inherits(ReactCheckedMaskPathLink, _ReactPathLink);

    function ReactCheckedMaskPathLink(component, key, maskValue) {
        _classCallCheck(this, ReactCheckedMaskPathLink);

        _get(Object.getPrototypeOf(ReactCheckedMaskPathLink.prototype), 'constructor', this).call(this, component, key);
        this._maskValue = maskValue;
        this.getComponentValue();
    }

    _createClass(ReactCheckedMaskPathLink, [{
        key: 'getComponentValue',
        value: function getComponentValue() {
            var value = this.getByPath(this._component.state, this._key);
            this.value = !!(value & this._maskValue);
        }
    }, {
        key: 'requestChange',
        value: function requestChange(value) {
            var stateValue = this.getByPath(this._component.state, this._key);
            //set bit
            if (value) {
                value = this._maskValue | stateValue;
            } else {
                //clear bit
                value = ~this._maskValue & stateValue;
            }
            var partialState = this._component.state;
            this.setByPath(partialState, this._key, value);
            this._component.setState(partialState);
        }
    }]);

    return ReactCheckedMaskPathLink;
})(_reactPathLink2['default']);

exports['default'] = ReactCheckedMaskPathLink;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});