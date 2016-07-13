'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pathExists = require('path-exists');

var _pathExists2 = _interopRequireDefault(_pathExists);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _easyFile = require('easy-file');

var _easyFile2 = _interopRequireDefault(_easyFile);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

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

function getModulePath(source, relatePath, rootPath) {
    var rs = [];
    var realPath = null;
    var isNodeMoudle = false;
    if (/([.]\/)/.test(source)) {
        //自定义模块
        realPath = _path2.default.resolve(_path2.default.dirname(relatePath), source);
    } else {
        isNodeMoudle = true;
        if (/node_modules/.test(relatePath)) {
            //如果引用者是node module中的文件 他引用的node module模块应该根据他的package来决定
            var pathArr = relatePath.split('node_modules');
            var _thisRoot = pathArr.slice(0, pathArr.length - 1);
            //尝试从它的上一级node_modules拿取  如果没有则直接去根目录拿取
            if (_pathExists2.default.sync(_path2.default.join(_thisRoot, 'node_modules', source))) {
                //如果它自身带这个模块
                rootPath = _thisRoot;
            }
        }

        realPath = _path2.default.join(rootPath, 'node_modules', source);

        if (!_pathExists2.default.sync(realPath)) {} else {
            //如果有package.json 尝试解析得到main
            var pk = _path2.default.join(realPath, 'package.json');
            if (_pathExists2.default.sync(pk)) {
                var pkJSON = require(pk);
                var main = pkJSON.main;
                if (main && _pathExists2.default.sync(_path2.default.join(realPath, main))) {

                    realPath = _path2.default.join(realPath, main);
                }
            } else {
                realPath = _path2.default.join(realPath, 'index.js');
            }
        }
    }

    if (!_path2.default.parse(realPath).ext) {
        var realJS = realPath + '.js';
        var realJSX = realPath + '.jsx';
        var realIndex = realPath + '/index.js';
        if (_pathExists2.default.sync(realJS)) {
            rs.push(realJS);
        } else if (_pathExists2.default.sync(realJSX)) {
            rs.push(realJSX);
        } else if (_pathExists2.default.sync(realIndex)) {
            rs.push(realIndex);
        } else {
            if (!isNodeMoudle) {
                rs.push(realJS);
                rs.push(realJSX);
                rs.push(realIndex);
            } else {
                rs.push(realIndex);
            }
        }
    } else {
        rs.push(realPath);
    }

    return rs;
}

module.exports = {
    pathAbsolute: pathAbsolute,
    getModulePath: getModulePath
};