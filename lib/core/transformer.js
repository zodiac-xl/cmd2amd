'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _fileutil = require('fileutil');

var _fileutil2 = _interopRequireDefault(_fileutil);

var _concatRegexp = require('concat-regexp');

var _concatRegexp2 = _interopRequireDefault(_concatRegexp);

var _easyFile = require('easy-file');

var _easyFile2 = _interopRequireDefault(_easyFile);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _webpackStream = require('webpack-stream');

var _webpackStream2 = _interopRequireDefault(_webpackStream);

var _gulpLess = require('gulp-less');

var _gulpLess2 = _interopRequireDefault(_gulpLess);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

var _gulpWrapper = require('gulp-wrapper');

var _gulpWrapper2 = _interopRequireDefault(_gulpWrapper);

var _gulpWatch = require('gulp-watch');

var _gulpWatch2 = _interopRequireDefault(_gulpWatch);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babel = require("babel-core");

var l = function l(file) {

    console.log('------------------s');
    console.log('cmd2amd failed：<br/>' + file);
    console.log('------------------e');
};

var distPath = void 0;
var sourcePath = void 0;
var rootPath = void 0;
var externals = void 0;
var needPackRegExp = void 0;
var modulePrefix = void 0;
var template = void 0;
var loadedMap = {};
var moduleEffectMap = {}; //文件增加的时候会影像 引用他的文件
var needWatch = false;

if (!template) {
    _easyFile2.default.read(_path2.default.join(__dirname, './template.js'), function (contents) {
        template = contents;
    });
}

var callFirst = false;
function callFirstTime(fn) {
    if (!callFirst) {
        fn();
        callFirst = true;
    }
}

function doTransform(options) {

    distPath = options.distPath;
    sourcePath = options.sourcePath;
    rootPath = options.rootPath;
    externals = options.externals || {};
    needPackRegExp = options.needPackRegExp || [];
    modulePrefix = options.modulePrefix || '';
    needWatch = options.needWatch || false;

    _del2.default.sync(distPath);

    if (needWatch) {
        (0, _gulpWatch2.default)(sourcePath + '/**', function (file, e) {
            var filePath = file.path;
            switch (file.event) {
                case 'add':
                    l('file ' + file.event + ': ' + filePath);

                    try {
                        babelAndAmd(filePath, distPath);
                    } catch (e) {
                        l(file, 'file');
                    }
                    break;
            }
        });
    }

    var files = _fileutil2.default.list(sourcePath, {
        excludeDirectory: true, //不包含文件夹
        matchFunction: function matchFunction(item) {
            return item.name.match(/(.)(jsx|js)/);
        }
    });
    files.forEach(function (file) {
        try {
            babelAndAmd(file, distPath);
        } catch (e) {
            l(file);
        }
    });
}

function babelAndAmd(filePath, distPath) {

    var ext = _path2.default.parse(filePath).ext;

    //修正文件名后缀
    if (!ext) {
        if (pathExists.sync(filePath + '.jsx')) {
            filePath += '.jsx';
        } else {
            filePath += '.js';
        }
    }

    var distFile = _path2.default.join(distPath, (0, _util.pathAbsolute)(rootPath, filePath.replace('.jsx', '.js')));

    //判断是否需要解析
    if (loadedMap[filePath]) {
        return;
    }

    if (needWatch && loadedMap[filePath] == undefined) {
        (0, _gulpWatch2.default)(filePath, function (file, e) {
            var filePath = file.path;
            l('file ' + file.event + ': ' + filePath);
            switch (file.event) {
                case 'add':
                case 'change':
                    if (file.event == 'add') {
                        var effectFiles = moduleEffectMap[filePath];
                        effectFiles && effectFiles.forEach(function (effectFile) {
                            loadedMap[effectFile] = false;
                            babelAndAmd(effectFile, distPath);
                        });
                    }
                    loadedMap[filePath] = false;
                    babelAndAmd(filePath, distPath);
                    break;
                case 'unlink':
                    delete loadedMap[filePath];
                    var distFile = _path2.default.join(distPath, (0, _util.pathAbsolute)(rootPath, filePath));
                    _del2.default.sync(distFile);
                    break;
            }
        });
    }

    loadedMap[filePath] = true;

    //for less and css
    if (ext == '.less') {
        _gulp2.default.src(filePath).pipe((0, _gulpLess2.default)({})).pipe((0, _gulpRename2.default)(function (path1) {
            path1.extname = ".css";
        })).pipe(_gulp2.default.dest(_path2.default.dirname(distFile)));
        return;
    } else if (ext == '.css') {
        _easyFile2.default.read(filePath, function (contents) {
            _easyFile2.default.write(distFile, contents, 'utf8');
        });
        return;
    }

    //for nodeModule
    var needPack = false;

    try {
        //for custom js
        babel.transformFile(filePath, {
            "presets": ["es2015", 'react', "stage-0"],
            plugins: ["transform-es2015-modules-amd"],
            resolveModuleSource: function resolveModuleSource(source, filename) {
                var moduleName = null;
                var realPaths = (0, _util.getModulePath)(source, filename, rootPath);
                realPaths.forEach(function (item) {
                    moduleEffectMap[item] = moduleEffectMap[item] || [];
                    moduleEffectMap[item].push(filePath);
                    babelAndAmd(item, distPath);
                });
                moduleName = _path2.default.relative(_path2.default.dirname(filename), realPaths[0]).replace(/\.(js|jsx)$/, '');
                return moduleName;
            }
        }, function (err, result) {
            //result; // => { code, map, ast }
            if (err) {
                l(filePath);
                return;
            }
            var code = result.code;
            _easyFile2.default.write(distFile, code, 'utf8');
        });
    } catch (e) {
        l(filePath);
    }
}

exports.default = doTransform;