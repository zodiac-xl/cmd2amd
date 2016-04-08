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

function makeAMD(fnStr, modules) {

    var rs = 'define([modulesPath],function(modulesName){ \n var module = {}; \n var exports ={}; \n ' + fnStr + ' \n })';
    var modulesPath = [];
    var modulesName = [];

    fnStr = fnStr || '';

    modules && modules.forEach(function (module) {
        modulesPath.push(module.path || '');
        modulesName.push(module.name || '');
    });

    modulesPath = modulesPath.map(function (item) {
        var rs = '/amd/' + item + '';
        if (_path2['default'].parse(item).ext == '.less') {
            rs = rs.replace('.less', '');
            rs = 'css!' + rs;
        }
        rs = '"' + rs + '"';
        return rs;
    });
    modulesPath.join(',');
    modulesName.join(',');

    rs = rs.replace('modulesPath', modulesPath);
    rs = rs.replace('modulesName', modulesName);

    return rs;
}

function getModulePath(filePath, relatePath, rootPath) {

    if (/([.]\/)/.test(filePath)) {
        //自定义模块
        filePath = _path2['default'].resolve(relatePath, filePath);
    } else {
        filePath = _path2['default'].join(rootPath, 'node_modules', filePath);

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