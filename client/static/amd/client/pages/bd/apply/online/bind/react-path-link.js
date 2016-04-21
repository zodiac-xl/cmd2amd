'use strict';

define([], function () {

    var cmd2amdModules = {};
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ReactPathLink = (function () {
    function ReactPathLink(component, key) {
        _classCallCheck(this, ReactPathLink);

        this._component = component;
        this._key = key;
        this.getComponentValue();
    }

    _createClass(ReactPathLink, [{
        key: 'getComponentValue',
        value: function getComponentValue() {
            this.value = this.getByPath(this._component.state, this._key);
        }
    }, {
        key: 'requestChange',
        value: function requestChange(value) {
            var partialState = this._component.state;
            this.setByPath(partialState, this._key, value);
            this._component.setState(partialState);
        }
    }, {
        key: 'getArrayKey',
        value: function getArrayKey(key) {
            var matches = key.match(/^\$_(.*?)_\$$/);
            if (matches) {
                return matches[1];
            }
        }
    }, {
        key: 'getByPath',
        value: function getByPath(obj, path) {
            //convert some syntax like a[0] to a.0
            path = path.replace(/\[(\w+)\]/g, '.$1');
            var segs = path.split('.');
            var i = undefined,
                ln = segs.length;
            for (i = 0; i < ln; i++) {
                var key = segs[i];
                if (typeof obj === 'object' && key in obj) {
                    obj = obj[key];
                } else {
                    return;
                }
            }
            return obj;
        }
    }, {
        key: 'setByPath',
        value: function setByPath(obj, path, value) {
            //convert array syntax a[0] to a.$_0_$
            //we will create object or array depend on this formal.
            path = path.replace(/\[(\w+)\]/g, '.\$_$1_\$');
            var segs = path.split('.');
            var i = undefined,
                ln = segs.length;
            for (i = 0; i < ln - 1; i++) {
                var key = segs[i];
                var isArray = false;
                var nextKey = segs[i + 1];
                var nextIsArrayKey = false;
                var arrayKey = this.getArrayKey(key);
                var nextArrayKey = this.getArrayKey(nextKey);
                if (arrayKey) {
                    key = arrayKey;
                }

                if (nextArrayKey) {
                    isArray = true;
                }

                if (obj[key]) {
                    obj = obj[key];
                } else {
                    if (isArray) {
                        obj[key] = [];
                    } else {
                        obj[key] = {};
                    }
                    obj = obj[key];
                }
            }
            obj[segs[ln - 1]] = value;
        }
    }]);

    return ReactPathLink;
})();

exports['default'] = ReactPathLink;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});