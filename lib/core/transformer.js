'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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

var _gulpWebpack = require('gulp-webpack');

var _gulpWebpack2 = _interopRequireDefault(_gulpWebpack);

var _gulpLess = require('gulp-less');

var _gulpLess2 = _interopRequireDefault(_gulpLess);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

var _gulpWrapper = require('gulp-wrapper');

var _gulpWrapper2 = _interopRequireDefault(_gulpWrapper);

var _gulpWatch = require('gulp-watch');

var _gulpWatch2 = _interopRequireDefault(_gulpWatch);

var _util = require('./util');

var babel = require("babel");

var l = function l(str, des) {

    console.log('------------------s');
    des && console.log(des + ":");
    console.log(str);
    console.log('------------------e');
};

var distPath = undefined;
var sourcePath = undefined;
var rootPath = undefined;
var externals = undefined;
var needPackRegExp = undefined;
var modulePrefix = undefined;
var template = undefined;
var loadedMap = {};
var moduleEffectMap = {}; //文件增加的时候会影像 引用他的文件
var needWatch = false;

if (!template) {
    _easyFile2['default'].read(_path2['default'].join(__dirname, './template.js'), function (contents) {
        template = contents;
    });
}

function doTransform(options) {

    distPath = options.distPath;
    sourcePath = options.sourcePath;
    rootPath = options.rootPath;
    externals = options.externals || {};
    needPackRegExp = options.needPackRegExp || [];
    modulePrefix = options.modulePrefix || '';
    needWatch = options.needWatch || false;

    _del2['default'].sync(distPath);

    if (needWatch) {
        (0, _gulpWatch2['default'])(sourcePath + '/**', function (file, e) {
            var filePath = file.path;
            switch (file.event) {
                case 'add':
                    l('file ' + file.event + ': ' + filePath);

                    try {
                        babelAndAmd(filePath, distPath);
                    } catch (e) {
                        l(file, 'file');
                        console.log(e);
                    }
                    break;
            }
        });
    }

    var files = _fileutil2['default'].list(sourcePath, {
        excludeDirectory: true, //不包含文件夹
        matchFunction: function matchFunction(item) {
            return item.name.match(/(.)(jsx|js)/);
        }
    });
    files.forEach(function (file) {
        try {
            babelAndAmd(file, distPath);
        } catch (e) {
            l(file, 'file');
            console.log(e);
        }
    });
}

function babelAndAmd(filePath, distPath) {

    var ext = _path2['default'].parse(filePath).ext;

    //修正文件名后缀
    if (!ext) {
        filePath += '.js';
    }

    var distFile = _path2['default'].join(distPath, (0, _util.pathAbsolute)(rootPath, filePath.replace('.jsx', '.js')));

    //判断是否需要解析
    if (loadedMap[filePath]) {
        return;
    }

    if (needWatch && loadedMap[filePath] == undefined) {
        (0, _gulpWatch2['default'])(filePath, function (file, e) {
            var filePath = file.path;
            l('file ' + file.event + ': ' + filePath);
            switch (file.event) {
                case 'add':
                case 'change':
                    if (file.event == 'add') {
                        var effectFile = moduleEffectMap[filePath];
                        if (effectFile) {
                            loadedMap[effectFile] = false;
                            babelAndAmd(effectFile, distPath);
                        }
                    }
                    loadedMap[filePath] = false;
                    babelAndAmd(filePath, distPath);
                    break;
                case 'unlink':
                    delete loadedMap[filePath];
                    var distFile = _path2['default'].join(distPath, (0, _util.pathAbsolute)(rootPath, filePath));
                    _del2['default'].sync(distFile);
                    break;
            }
        });
    }

    loadedMap[filePath] = true;

    //for less and css
    if (ext == '.less') {
        _gulp2['default'].src(filePath).pipe((0, _gulpLess2['default'])({})).pipe((0, _gulpRename2['default'])(function (path1) {
            path1.extname = ".css";
        })).pipe(_gulp2['default'].dest(_path2['default'].dirname(distFile)));
        return;
    } else if (ext == '.css') {
        _easyFile2['default'].read(filePath, function (contents) {
            _easyFile2['default'].write(distFile, contents, 'utf8');
        });
        return;
    }

    //for nodeModule
    var needPack = false;

    try {
        needPackRegExp.some(function (item) {
            if (new RegExp(item).test(filePath)) {
                needPack = true;
                return true;
            }
        });

        if (needPack) {
            _gulp2['default'].src(filePath).pipe((0, _gulpWebpack2['default'])({
                module: {
                    loaders: [{
                        test: /\.js/,
                        loader: 'babel?cacheDirectory&stage=0',
                        exclude: /(node_modules\/[^(@myfe)]|min\.js)/
                    }, { test: /\.css$/, loader: "style-loader!css-loader" }, { test: /\.less$/, loader: "style-loader!css-loader!less-loader" }, { test: /\.json$/, loader: 'json' }, { test: /\.jpe?g$|\.gif$|\.png|\.ico$/, loader: 'file?name=[name].[ext]' }, { test: /\.eot$|\.ttf$|\.svg$|\.woff2?$/, loader: 'file?name=[name].[ext]' }]
                },
                externals: externals,
                output: {
                    library: 'packedModule',
                    libraryTarget: 'var'
                }
            })).pipe((0, _gulpWrapper2['default'])({
                header: 'define(function(){\n',
                footer: '\n return packedModule;\n})'
            })).pipe((0, _gulpRename2['default'])(_path2['default'].basename(filePath))).pipe(_gulp2['default'].dest(_path2['default'].dirname(distFile)));
            return;
        }

        //for custom js
        babel.transformFile(filePath, {
            stage: 0
        }, function (err, result) {
            //result; // => { code, map, ast }
            if (err) {
                console.log(err);
                return;
            }
            var code = result.code;

            if (/define\.amd/.test(code)) {
                //本来就是amd或者umd 返回
                _easyFile2['default'].write(distFile, code, 'utf8');
                return;
            }

            var modules = [];
            var moduleIndex = 0;
            if (/require/.test(code)) {
                (function () {
                    //需要define
                    code = code.replace(/require\(/gim, 'cmd2amdLoadModule(');
                    var arr = code.split(/cmd2amdLoadModule[(]('|")([^('|")]*)('|")[)]/gim);
                    arr.forEach(function (item, i) {
                        if (i % 4 == 0 && i + 2 <= arr.length) {
                            var _name = arr[i + 2];
                            var obj = {};

                            if (externals[_name]) {
                                obj[_name] = {
                                    external: externals[_name],
                                    index: null,
                                    path: null
                                };
                            } else {
                                var fileDistPath = (0, _util.getModulePath)(_name, _path2['default'].dirname(filePath), rootPath);
                                fileDistPath.forEach(function (item) {
                                    moduleEffectMap[item] = filePath;
                                    babelAndAmd(item, distPath);
                                });

                                obj[_name] = {
                                    external: externals[_name],
                                    index: moduleIndex,
                                    path: (0, _util.pathAbsolute)(rootPath, fileDistPath[0])
                                };
                                moduleIndex++;
                            }

                            modules.push(obj);
                        }
                    });
                })();
            }
            var amdRs = (0, _util.makeAMD)(code, modules, modulePrefix, template);

            _easyFile2['default'].write(distFile, amdRs, 'utf8');
        });
    } catch (e) {
        console.log(e.message);
    }
}

exports['default'] = doTransform;
module.exports = exports['default'];