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
var binaryArr2int = function binaryArr2int(binarymap, binaryLength) {
    //maxLength =20
    var num2 = '00000000000000000000'.slice(-binaryLength);

    num2 = num2.split('');
    binarymap.forEach(function (item) {
        if (binaryLength < item) {
            console.log('binarymap2int 中binaryLength设置错误');
        }
        num2[binaryLength - item] = 1;
    });
    num2 = num2.join('');
    return parseInt(num2, 2).toString(10);
};

//竞对，"type"为4-动态售价时生效，其余传0。二进制表示，
// 第n位分别代表：1-"豆瓣",2-"时光网",5-"格瓦拉",7-"QQ",8-"点评",9-"微信",10-"糯米", 11-"淘宝"。
// 例如11100010000=1808表示"淘宝","糯米","微信","格瓦拉"。

//11100010000  to [11,10,9,5]
var int2binaryArr = function int2binaryArr(num10, binaryLength) {
    //maxLength =20
    var binaryArr = [];
    var num2 = parseInt(num10).toString(2);

    num2 = num2.split('');

    var num2L = num2.length;
    num2.forEach(function (item, index) {
        if (item == 1) {
            binaryArr.push(num2L - index);
        }
    });
    return binaryArr;
};
exports['default'] = {
    binaryArr2int: binaryArr2int,
    int2binaryArr: int2binaryArr
};
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});