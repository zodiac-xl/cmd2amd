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

function getModulePath(filePath, relatePath, nodeModuleDir) {

    if (/([.]\/)/.test(filePath)) {
        //自定义模块
        filePath = _path2['default'].resolve(relatePath, filePath);
    } else {
        filePath = _path2['default'].join(nodeModuleDir, 'node_modules', filePath);

        var pk = _path2['default'].join(filePath, 'package.json');

        if (_pathExists2['default'].sync(pk)) {
            //如果有package.json 尝试解析得到main
            var pkJSON = require(pk);
            var main = pkJSON.main;
            if (main && _pathExists2['default'].sync(_path2['default'].join(filePath, main))) {
                filePath = _path2['default'].join(filePath, main);
            }
        }
    }
    var parseRs = _path2['default'].parse(filePath);
    var ext = parseRs.ext;

    if (ext && ext != '.js' && ext != '.jsx' && ext != '.less' && ext != '.css') {
        //未知后缀加上ext 设置空 （针对 a.a.v）
        ext = null;
    }

    if (!ext) {
        //如果没有后缀 有可能是文件下index.js 或者本身加上.js
        if (_pathExists2['default'].sync(_path2['default'].join(filePath, 'index.js'))) {
            //
            filePath = _path2['default'].join(filePath, 'index.js');
        } else {
            filePath = filePath + '.js';
        }
    }

    if (!_pathExists2['default'].sync(filePath)) {
        console.log('relatePath' + relatePath);

        console.error('not fount' + filePath);

        filePath = null;
    }

    return filePath;
}

exports['default'] = {
    pathAbsolute: pathAbsolute,
    makeAMD: makeAMD,
    getModulePath: getModulePath
};
module.exports = exports['default'];