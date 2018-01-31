'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _gulpIntercept = require('gulp-intercept');

var _gulpIntercept2 = _interopRequireDefault(_gulpIntercept);

var _gulpWatch = require('gulp-watch');

var _gulpWatch2 = _interopRequireDefault(_gulpWatch);

var _pathExists = require('path-exists');

var _pathExists2 = _interopRequireDefault(_pathExists);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babel = require("babel-core");

var log = console.log;

//报警和错误在最后统一输出
var moduleWarningMessage = [];
var errorMessage = [];

var l = function l(file) {

    console.log('------------------s');
    console.log(file);
    console.log('------------------e');
};

var distPath = void 0;
var sourcePath = void 0;
var rootPath = void 0;
var externals = void 0;
var needPackRegExp = void 0;
var modulePrefix = void 0;
var moduleRoot = void 0;
var loadedMap = {};
var moduleEffectMap = {}; //文件增加的时候会影响 引用他的文件
var needWatch = false;
var sourceMaps = false;
var ignore = [];
var callFirst = false;
var working = {
    map: {},
    isFirst: true,
    callBack: null,
    start: function start(path) {
        working.map[path] = true;
        if (working.isFirst) {
            console.log('------cmd2amd work start------');
            working.isFirst = false;
        }
    },
    end: function end(path) {
        delete working.map[path];
        if (working.workEnd()) {

            if (moduleWarningMessage.length) {
                log(_chalk2.default.yellow('------warning  message------'));
                moduleWarningMessage.forEach(function (item, i) {
                    var filename = item.filename,
                        source = item.source;

                    if (i < 9) {
                        i = '0' + (i + 1);
                    }
                    log(i + '--------------------------');
                    log('file: ' + filename);
                    log('source: ' + _chalk2.default.red(source));
                    log('not found\n');
                });
                log(_chalk2.default.yellow('------warning  message------\n'));
            }

            console.log('------cmd2amd work end------');
            working.callBack && working.callBack();
            working.callBack = null;
        }
    },
    workEnd: function workEnd() {
        return !(0, _keys2.default)(working.map).length;
    }
};
function callFirstTime(fn) {
    if (!callFirst) {
        fn();
        callFirst = true;
    }
}

function doTransform(options, callBack) {

    working.callBack = callBack;

    distPath = options.distPath;
    sourcePath = options.sourcePath;
    rootPath = options.rootPath;
    externals = options.externals || {};
    needPackRegExp = options.needPackRegExp || [];
    modulePrefix = options.modulePrefix || '';
    moduleRoot = options.moduleRoot || '';
    needWatch = options.needWatch || false;
    sourceMaps = options.sourceMaps || false;
    ignore = options.ignore || [];

    _del2.default.sync(distPath);

    if (needWatch) {
        (0, _gulpWatch2.default)(sourcePath + '/**', function (file) {
            var pass = false;

            ignore.some(function (item) {
                if (new RegExp(item).test(file.path)) {
                    pass = true;
                    return true;
                }
            });
            if (pass) {
                return;
            }

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
            log(e);
        }
    });
}

function getDistFile(filePath) {
    var ext = _path2.default.parse(filePath).ext;
    //修正文件名后缀
    if (!ext) {
        if (_pathExists2.default.sync(filePath + '.jsx')) {
            filePath += '.jsx';
        } else {
            filePath += '.js';
        }
    }
    var distFile = (0, _util.pathAbsolute)(rootPath, filePath.replace('.jsx', '.js'));
    if (distFile) {
        distFile = _path2.default.join(distPath, distFile);
    }
    return distFile;
}

function babelAndAmd(filePath, distPath) {
    var ext = _path2.default.parse(filePath).ext;
    var distFile = getDistFile(filePath);

    if (!distFile) {
        return;
    }

    //判断是否需要解析
    if (loadedMap[filePath]) {
        return;
    }

    if (needWatch && loadedMap[filePath] == undefined) {
        (0, _gulpWatch2.default)(filePath, function (file) {
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
                    var _distFile = _path2.default.join(distPath, (0, _util.pathAbsolute)(rootPath, filePath));
                    _del2.default.sync(_distFile);
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
    if (!_pathExists2.default.sync(filePath)) {
        return;
    }

    try {

        needPackRegExp.some(function (item) {
            if (new RegExp(item).test(filePath)) {
                needPack = true;
                return true;
            }
        });

        if (needPack) {
            working.start(filePath);
            _gulp2.default.src(filePath).pipe((0, _webpackStream2.default)({
                module: {
                    loaders: [{
                        test: /\.js/,
                        loader: 'babel',
                        query: {
                            presets: ['es2015', 'react', 'stage-0'],
                            plugins: ["transform-runtime", "transform-decorators-legacy", "add-module-exports"]
                        },
                        exclude: /node_modules\/[^(@myfe)]/
                    }, { test: /\.css$/, loader: "style-loader!css-loader" }, { test: /\.less$/, loader: "style-loader!css-loader!less-loader" }, { test: /\.json$/, loader: 'json' }, { test: /\.jpe?g$|\.gif$|\.png|\.ico$/, loader: 'file?name=[name].[ext]' }, { test: /\.eot$|\.ttf$|\.svg$|\.woff2?$/, loader: 'file?name=[name].[ext]' }]
                },
                externals: externals,
                output: {
                    library: 'packedModule',
                    libraryTarget: 'var'
                }
            })).pipe((0, _gulpIntercept2.default)(function (file) {
                var contents = file.contents.toString();
                contents = contents.replace(/sourceMappingURL=/g, '');
                file.contents = new Buffer(contents);
                return file;
            })).pipe((0, _gulpWrapper2.default)({
                header: 'define(function(){\n',
                footer: '\n return packedModule;\n})'
            })).pipe((0, _gulpRename2.default)(_path2.default.basename(filePath))).pipe(_gulp2.default.dest(_path2.default.dirname(distFile))).on('end', function (callback) {
                working.end(filePath);
                callback && callback();
            });

            return;
        }

        //for custom js
        working.start(filePath);
        babel.transformFile(filePath, {
            sourceMaps: sourceMaps,
            "presets": ["es2015", "react", "stage-0"],
            plugins: ["transform-runtime", "transform-decorators-legacy", "add-module-exports", "transform-es2015-modules-amd"],
            resolveModuleSource: function resolveModuleSource(source, filename) {
                var moduleName = '';
                if (externals[source]) {
                    moduleName = source;
                } else {
                    (function () {
                        var realPaths = (0, _util.getModulePath)(source, filename, rootPath);

                        var existFile = null;
                        realPaths.some(function (item) {
                            if (_pathExists2.default.sync(item)) {
                                existFile = item;
                            }
                            return existFile;
                        });

                        //检测到单个文件 则只监控此文件；如果没人找到任何文件则监控所有可能得到文件，并warning
                        if (existFile) {
                            realPaths = [existFile];
                        } else {
                            moduleWarningMessage.push({
                                filename: filename,
                                source: source
                            });
                        }

                        realPaths.forEach(function (item) {
                            moduleEffectMap[item] = moduleEffectMap[item] || [];
                            moduleEffectMap[item].push(filePath);
                            babelAndAmd(item, distPath);
                            loadedMap[item] = true;
                        });
                        moduleName = (0, _util.pathAbsolute)(moduleRoot, getDistFile(realPaths[0]));
                        if (/\.(css|less)$/.test(moduleName)) {
                            moduleName = moduleName.replace(/\.less$/, '.css');
                            moduleName = 'css!' + moduleName;
                        }
                    })();
                }
                return moduleName;
            }
        }, function (err, result) {
            //result; // => { code, map, ast }
            if (err) {
                l(filePath);
                log(err);
                return;
            }
            var code = result.code;

            if (sourceMaps) {
                code += '\n //# sourceMappingURL=' + _path2.default.basename(distFile) + '.map';
                _easyFile2.default.write(distFile + '.map', (0, _stringify2.default)(result.map), 'utf8');
            }
            _easyFile2.default.write(distFile, code, 'utf8');
            working.end(filePath);
        });
    } catch (e) {
        l(filePath);
        log(e);
    }
}

exports.default = doTransform;
module.exports = exports['default'];