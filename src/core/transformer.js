import path         from 'path'
import del          from 'del'
import fu           from 'fileutil';
import concat       from 'concat-regexp';
import ef           from 'easy-file'
import _            from 'lodash';

import gulp         from 'gulp'
import webpack      from 'gulp-webpack';
import less         from 'gulp-less';
import rename       from 'gulp-rename';
import wrapper      from 'gulp-wrapper';


let babel = require("babel-core");

import {pathAbsolute,makeAMD,getModulePath} from './util';


let l = function (str, des) {

    console.log('------------------s');
    des && console.log(des + ":");
    console.log(str);
    console.log('------------------e');
};

let distPath;
let sourcePath;
let rootPath;
let externals;
let needPackRegExp;
let loadedMap = {};

function doTransform(options) {

    distPath = options.distPath;
    sourcePath = options.sourcePath;
    rootPath = options.rootPath;
    externals = options.externals ||{};
    needPackRegExp = options.needPackRegExp || [];


    del.sync(distPath);
    let files = fu.list(sourcePath, {
        excludeDirectory: true, //不包含文件夹
        matchFunction: function (item) {
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
    })
}

function babelAndAmd(distFilePath, distPath) {

    let sourceFilePath = distFilePath
    let filePath = sourceFilePath;
    let ext = path.parse(filePath).ext;

    //判断是否需要解析
    if (!filePath || loadedMap[filePath]) {
        return;
    } else {
        loadedMap[filePath] = true;
    }


    //修正文件名后缀
    if (!ext) {
        filePath += '.js';
        sourceFilePath += '.js';
    } else if (ext == '.jsx') {
        filePath = filePath.replace('.jsx', '.js');
    }


    let distFile = path.join(distPath, pathAbsolute(rootPath, filePath));


    //for less and css
    if (ext == '.less') {
        gulp.src(sourceFilePath)
            .pipe(less({}))
            .pipe(rename(function (path1) {
                path1.extname = ".css";
            }))
            .pipe(gulp.dest(path.dirname(distFile)));
        return;
    } else if (ext == '.css') {
        ef.read(sourceFilePath, function (contents) {
            ef.write(distFile, contents, 'utf8');
        });
        return;
    }


    //for nodeModule
    let needPack = false;

    if (!_.isArray(needPackRegExp)) {
        needPackRegExp = [needPackRegExp];
    }
    needPackRegExp.some(function (item) {
        if ((new RegExp(item)).test(sourceFilePath)) {
            needPack = true;
            return true;
        }
    })

    if (needPack) {
        gulp.src(sourceFilePath)
            .pipe(webpack(
                {
                    module: {
                        loaders: [
                            {
                                test: /\.js/,
                                loader: 'babel?cacheDirectory&stage=0',
                                exclude: /(node_modules\/[^(@myfe)]|min\.js)/
                            },
                            { test: /\.css$/, loader: "style-loader!css-loader"  },
                            { test: /\.less$/,loader: "style-loader!css-loader!less-loader"},
                            { test: /\.json$/, loader: 'json' },
                            { test: /\.jpe?g$|\.gif$|\.png|\.ico$/, loader: 'file?name=[name].[ext]' },
                            { test: /\.eot$|\.ttf$|\.svg$|\.woff2?$/, loader: 'file?name=[name].[ext]' }
                        ]
                    },
                    externals: externals,
                    output: {
                        library: 'packedModule',
                        libraryTarget: 'var'
                    },
                }
            ))
            .pipe(wrapper(
                {
                    header: 'define(function(){\n',
                    footer: '\n return packedModule;\n})'
                }
            ))
            .pipe(rename(path.basename(filePath)))
            .pipe(gulp.dest(path.dirname(distFile)));
        return;
    }


    //for custom js
    babel.transformFile(sourceFilePath, {
        stage: 0
    }, function (err, result) {
        //result; // => { code, map, ast }
        if (err) {
            console.log(err)
            return;
        }

        if (/define\.amd/.test(result.code)) {//本来就是amd或者umd 返回
            ef.write(distFile, result.code, 'utf8');
            return;
        }


        let modules = [];
        let arrSource = result.code.split(/(\n|\r)/);
        let arrRs = arrSource.map(function (item) {
            let rs = item;
            let defineP1 = concat(/require[(]('|")([^('|")]*)('|")[)]/);
            let defineP2 = concat(/^(var|require)/);
            let reference = null;
            let modulePath = null;

            if (defineP1.test(item) && defineP2.test(item)) { //解析依赖
                let refAndModuleP = concat(/([\S]*)[\s]*=[\s]*/, /require[(]('|")([^('|")]*)('|")[)]/);//nameP  moudleP
                let moduleP = concat(/require[(]('|")([^('|")]*)('|")[)]/);

                if (refAndModuleP.test(item)) { //has reference
                    reference = RegExp.$1;
                    modulePath = RegExp.$3;
                } else if (moduleP.test(item)) {
                    modulePath = RegExp.$2;
                }

                //过滤设置的不打包的window对象
                if (externals[modulePath]) {
                    rs = reference ? `var ${reference} =${externals[modulePath]}` : '';
                    return rs;

                }
                let fileDistPath = getModulePath(modulePath, path.dirname(filePath), rootPath)
                //loop 循环解析依赖
                modulePath && babelAndAmd(fileDistPath, distPath);

                modules.push({
                    name: reference || 'amd_notDefined',
                    path: pathAbsolute(rootPath, fileDistPath)
                });

                rs = '';
            } else if (/module.exports/.test(item)) {//重构返回值

                let moduleP = concat(/require[(]('|")([^('|")]*)('|")[)]/);

                if (moduleP.test(item)) { //返回值为依赖
                    //module.exports = require('./lib/React') or  module.exports.a = require('./lib/React')
                    modulePath = RegExp.$2;
                    reference = null;

                    if (/^module.exports.([\w]+)/.test(item)) {
                        reference = RegExp.$1;
                    }


                    //过滤设置的不打包的window对象
                    if (externals[modulePath]) {
                        rs = reference ? `var ${reference} =${externals[modulePath]}` : '';
                        return rs;
                    }

                    let fileDistPath = getModulePath(modulePath, path.dirname(filePath), rootPath)

                    modules.push({
                        name: reference || 'amd_notDefined',
                        path: pathAbsolute(rootPath, fileDistPath)
                    });

                    //loop 循环解析依赖
                    modulePath && babelAndAmd(fileDistPath, distPath);
                }
            }
            return rs;
        });


        //amd 返回值
        arrRs.push(`\n return (!module.exports)?(exports['default']||exports):module.exports;\n`);

        let amdRs = makeAMD(arrRs.join(''), modules);
        ef.write(distFile, amdRs, 'utf8');
    });
}


export default doTransform;

