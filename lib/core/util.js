'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pathExists = require('path-exists');

var _pathExists2 = _interopRequireDefault(_pathExists);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _easyFile = require('easy-file');

var _easyFile2 = _interopRequireDefault(_easyFile);

var template = undefined;

function pathAbsolute(dirname, path) {
    var pattern = new RegExp(dirname, 'g');
    pattern.exec(path);
    var lastIndex = pattern.lastIndex;
    var result = null;
    if (lastIndex) {
        result = path.substr(lastIndex);
    }
    return result;
}

function makeAMD(fnStr, modules, modulePrefix, template) {

    var rs = template;
    var modulesPath = [];
    var modulesName = [];

    fnStr = fnStr || '';

    var browserModules = {};
    modules && modules.forEach(function (module, i) {
        var name = Object.keys(module)[0];
        browserModules[name] = module[name];
    });

    modules && modules.forEach(function (module, i) {
        var name = Object.keys(module)[0];
        if (!module[name].path) {
            return;
        }
        modulesPath.push(module[name].path);
        modulesName.push('ref_' + i);
    });

    modulesPath = modulesPath.map(function (item) {
        var rs = _path2['default'].join(modulePrefix, item);
        if (_path2['default'].parse(item).ext == '.less') {
            rs = rs.replace('.less', '.css');
            rs = 'css!' + rs;
        }
        rs = '"' + rs + '"';

        return rs;
    });
    modulesPath.join(',');
    modulesName.join(',');

    fnStr = fnStr.replace(/\$/g, 'a-b-c-d');
    rs = rs.replace('dependsPlaceholder', modulesPath);
    rs = rs.replace('refersPlaceholder', modulesName);
    rs = rs.replace('cmd2amdModulesPlaceholder', JSON.stringify(browserModules));
    rs = rs.replace('callbackPlaceholder', fnStr);
    rs = rs.replace(/a-b-c-d/g, '$');

    return rs;
}

function getModulePath(filePath, relatePath, rootPath) {

    if (/([.]\/)/.test(filePath)) {
        //自定义模块
        filePath = _path2['default'].resolve(relatePath, filePath);
    } else {
        if (/node_modules/.test(relatePath)) {
            //如果引用者是node module中的文件 他引用的node module模块应该根据他的package来决定
            var _thisRoot = relatePath.split('node_modules')[0];
            if (_pathExists2['default'].sync(_path2['default'].join(_thisRoot, 'node_modules', filePath))) {
                //如果它自身带这个模块
                rootPath = _thisRoot;
            }
        }

        filePath = _path2['default'].join(rootPath, 'node_modules', filePath);

        var pk = _path2['default'].join(filePath, 'package.json');

        if (_pathExists2['default'].sync(pk)) {
            //如果有package.json 尝试解析得到main
            var pkJSON = require(pk);
            var main = pkJSON.main;
            if (main && _pathExists2['default'].sync(_path2['default'].join(filePath, main))) {
                filePath = _path2['default'].join(filePath, main);
            }
        } else {}
    }
    var parseRs = _path2['default'].parse(filePath);
    var ext = parseRs.ext;

    if (ext && ext != '.js' && ext != '.jsx' && ext != '.less' && ext != '.css') {
        //未知后缀加上ext 设置空 （针对 a.a.v）
        ext = null;
    }

    if (!ext) {
        //如果没有后缀 有可能是文件下index.js 或者本身加上.js
        var files = [_path2['default'].join(filePath, 'index.js'), filePath + '.js'];
        if (_pathExists2['default'].sync(files[0])) {
            filePath = files.splice(0, 1);
        } else if (_pathExists2['default'].sync(files[1])) {
            filePath = files.splice(1, 1);
        } else {
            console.error('not fount:' + filePath);
            filePath = files;
        }
    } else {
        filePath = [filePath];
    }

    return filePath;
}

exports['default'] = {
    pathAbsolute: pathAbsolute,
    makeAMD: makeAMD,
    getModulePath: getModulePath
};
module.exports = exports['default'];