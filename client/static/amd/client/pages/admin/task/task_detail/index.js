'use strict';

define(["/amd/client/components/layout/page-transition-layout.js"], function (ref_0) {

    var cmd2amdModules = {"../../../../components/layout/page-transition-layout":{"index":0,"path":"client/components/layout/page-transition-layout.js"}};
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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsLayoutPageTransitionLayout = cmd2amdLoadModule('../../../../components/layout/page-transition-layout');

var _componentsLayoutPageTransitionLayout2 = _interopRequireDefault(_componentsLayoutPageTransitionLayout);

var TaskDetail = (function (_Page) {
  _inherits(TaskDetail, _Page);

  function TaskDetail() {
    _classCallCheck(this, _TaskDetail);

    _get(Object.getPrototypeOf(_TaskDetail.prototype), 'constructor', this).apply(this, arguments);
  }

  var _TaskDetail = TaskDetail;
  TaskDetail = (0, _componentsLayoutPageTransitionLayout.page)(TaskDetail) || TaskDetail;
  return TaskDetail;
})(_componentsLayoutPageTransitionLayout2['default']);

exports['default'] = TaskDetail;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});