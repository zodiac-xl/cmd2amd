'use strict';

define(["/amd/client/components/layout/page-layout.js","/amd/client/components/business/visit-log/list/index.js"], function (ref_0,ref_1) {

    var cmd2amdModules = {"../../../components/layout/page-layout":{"index":0,"path":"client/components/layout/page-layout.js"},"../../../components/business/visit-log/list":{"index":1,"path":"client/components/business/visit-log/list/index.js"}};
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

var _componentsLayoutPageLayout = cmd2amdLoadModule('../../../components/layout/page-layout');

var _componentsLayoutPageLayout2 = _interopRequireDefault(_componentsLayoutPageLayout);

var _componentsBusinessVisitLogList = cmd2amdLoadModule('../../../components/business/visit-log/list');

var _componentsBusinessVisitLogList2 = _interopRequireDefault(_componentsBusinessVisitLogList);

var VisitLogListPage = (function (_Page) {
    _inherits(VisitLogListPage, _Page);

    function VisitLogListPage() {
        _classCallCheck(this, _VisitLogListPage);

        _get(Object.getPrototypeOf(_VisitLogListPage.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(VisitLogListPage, [{
        key: 'renderMain',
        value: function renderMain() {
            return React.createElement(_componentsBusinessVisitLogList2['default'], null);
        }
    }]);

    var _VisitLogListPage = VisitLogListPage;
    VisitLogListPage = (0, _componentsLayoutPageLayout.page)(VisitLogListPage) || VisitLogListPage;
    return VisitLogListPage;
})(_componentsLayoutPageLayout2['default']);

exports['default'] = VisitLogListPage;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});