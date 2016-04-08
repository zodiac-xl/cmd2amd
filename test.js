import gulp         from 'gulp'
const gbabel = require('gulp-babel-compile');
import path         from 'path'
import del          from 'del'
import config       from 'config'
import fu           from 'fileutil';
import _            from 'lodash'
import fs           from 'fs'
import ef           from 'easy-file'
import pathExists   from 'path-exists';
var rename = require('gulp-rename');


var wrapamd = require('gulp-wrap-amd');

import esformatter  from 'esformatter';
var less = require('gulp-less');

var webpack = require('gulp-webpack');
let root = path.join(config.path.client, '../');

let concat = require('concat-regexp')

let babel = require("babel-core");


let l = function (str, des) {

    console.log('------------------s');
    des && console.log(des + ":");
    console.log(str);
    console.log('------------------e');
};


function pathAbsolute(dirname, path) {
    let pattern = new RegExp(dirname, 'g');
    pattern.exec(path);
    let lastIndex = pattern.lastIndex;
    let result = null;
    if (lastIndex) {
        result = path.substr(lastIndex);
    }
    return result;
}

let makeAMD = function (fnStr, modules) {


    let rs = `define([modulesPath],function(modulesName){ \n var module = {}; \n var exports ={}; \n ${fnStr} \n })`;
    let modulesPath = [];
    let modulesName = [];

    fnStr = fnStr || '';

    modules && modules.forEach(function (module) {
        modulesPath.push(module.path || '');
        modulesName.push(module.name || '');
    });

    modulesPath = modulesPath.map(function (item) {
        let rs = '/amd/' + item + '';
        if(path.parse(item).ext == '.less'){
            rs = rs.replace('.less','');
            rs = 'css!'+rs;
        }
        rs = '"' + rs + '"';
        return rs;
    })
    modulesPath.join(',');
    modulesName.join(',');

    rs = rs.replace('modulesPath', modulesPath);
    rs = rs.replace('modulesName', modulesName);

    return rs;
}


let distPath = config.path.client + '/static/amd';
gulp.task('b', function (cb) {

    del.sync(distPath);
    del.sync(path.join(root, 'amd'));

    let files = fu.list(config.path.client + '/pages', {
        excludeDirectory: true, //不包含文件夹
        matchFunction: function (item) {
            return item.name.match(/(.)jsx/);
        }
    });
    //files = files.splice(0, 2);
    files.forEach(function (file) {
        try {
            babelAndAmd({filePath: file, isNodeModule: false}, distPath);
        } catch (e) {
            l(file, 'file');
            console.log(e);
        }
    })
});


var loadedmap = {};

function babelAndAmd(module, distPath) {

    let file = module.filePath;
    let isNodeModule = module.isNodeModule;
    //all type css less js jsx
    if (!file) {
        return;
    }
    let ext = path.parse(file).ext;
    let filePath = file;

    if (!ext) {
        filePath += '.js';
    } else {
        if (ext == '.less') {
        } else if (ext == '.css') {
        } else {
            filePath = filePath.replace('.jsx', '.js');
        }
    }
    var distFile = path.join(distPath, pathAbsolute(root, filePath));

    if (loadedmap[file]) {
        return;
    }
    loadedmap[file] = true;
    const jsLoader = 'babel?cacheDirectory&stage=0';

    if (isNodeModule) {
        gulp.src(file)
            //.pipe(gbabel({
            //    presets: ['react']
            //}))
            .pipe(webpack(
                {
                    module: {
                        loaders: [
                            {test: /\.js/, loader: jsLoader, exclude: /(node_modules\/[^(@myfe)]|min\.js)/}
                        ]
                    },
                    output: {},
                    externals: {
                        "jquery": "jQuery",
                        "react": "React",
                        "react-dom": "ReactDOM"
                    }
                }
            ))
            .pipe(wrapamd())

            .pipe(rename(path.basename(file)))
            //.pipe(gulp.dest(path.join(root,'amd')));
            .pipe(gulp.dest(path.dirname(distFile)));
        return;
    }

    if (ext == '.less') {
        gulp.src(file)
            .pipe(less({
            }))
            .pipe(rename(function(path1){
                path1.extname = ".css";
            }))
            .pipe(gulp.dest(path.dirname(distFile)));
        return;
    } else if (ext == '.css') {
        ef.read(file, function (contents) {
            ef.write(distFile, contents, 'utf8');
        })
        return;
    }

    //js jsx
    babel.transformFile(file, {
        stage: 0
    }, function (err, result) {
        //result; // => { code, map, ast }
        if (err) {
            return;
        }

        if (!/exports/.test(result.code)) {//本来就是amd
            ef.write(distFile, result.code, 'utf8');
            return;
        }


        let modules = [];
        let arrSource = result.code.split(/(\n|\r)/);
        let arrRs = arrSource.map(function (item) {
            let rs = item;
            let defineP1 = concat(/require[(]('|")([^('|")]*)('|")[)]/);
            let defineP2 = concat(/^(var|require)/);

            if (defineP1.test(item) && defineP2.test(item)) { //has reference

                let reference = null;
                let modulePath = null;

                let refAndModuleP = concat(/([\S]*)[\s]*=[\s]*/, /require[(]('|")([^('|")]*)('|")[)]/);//nameP  moudleP
                let moduleP = concat(/require[(]('|")([^('|")]*)('|")[)]/);


                if (refAndModuleP.test(item)) { //has reference
                    reference = RegExp.$1;
                    modulePath = RegExp.$3;
                } else if (moduleP.test(item)) {
                    modulePath = RegExp.$2;
                }


                if (filterMiniModule(modulePath)) {
                    rs = reference ? `var ${reference} =${filterMiniModule(modulePath)}` : '';

                    return rs;

                }
                //loop
                modulePath && babelAndAmd(getModulePath(modulePath, path.dirname(file)), distPath);

                //if (!/less/.test(modulePath)) {


                modules.push({
                    name: reference || 'amd_notDefined',
                    path: pathAbsolute(root,getModulePath(modulePath, path.dirname(file)).filePath )
                })
                //}

                rs = '';
            } else if (/module.exports/.test(item)) {

                let moduleP = concat(/require[(]('|")([^('|")]*)('|")[)]/);

                if (moduleP.test(item)) {//module.exports = require('./lib/React') or  module.exports.a = require('./lib/React')
                    let modulePath = RegExp.$2;
                    let reference = null;
                    if (/^module.exports.([\w]+)/.test(item)) {
                        reference = RegExp.$1;
                    }

                    if (filterMiniModule(modulePath)) {
                        rs = reference ? `var ${reference} =${filterMiniModule(modulePath)}` : '';

                        return rs;

                    }
                    modules.push({
                        name: reference || 'amd_notDefined',
                        path: pathAbsolute(root, getModulePath(modulePath, path.dirname(file)).filePath)
                    })
                    modulePath && babelAndAmd(getModulePath(modulePath, path.dirname(file)), distPath);
                    //rs = reference ? `return {reference:${reference}}` : '';


                } else if (/^module.exports =/) {
                }

                //rs += `\n if(exports['default']){ return exports['default'];}else{  return module.exports } \n `;


            }
            return rs;
        })
        arrRs.push(`\n return (!module.exports)?(exports['default']||exports):module.exports;\n`)

        let amdRs = makeAMD(arrRs.join(''), modules);


        ef.write(distFile, amdRs, 'utf8');
    });
}


function getModulePath(filePath, relatePath) {
    let isNodeModule = false;
    if (/([.]\/)/.test(filePath)) {//自定义模块
        try {
            filePath = path.resolve(relatePath, filePath);
        } catch (e) {
            console.log(relatePath, filePath)
        }


    } else {//node_modules
        isNodeModule = true;
        filePath = path.join(root, 'node_modules', filePath);

        let pk = path.join(filePath, 'package.json');
        if (pathExists.sync(pk)) {
            let pkJSON = require(pk);
            let main = pkJSON.main;
            if (main && pathExists.sync(path.join(filePath, main))) {
                filePath = path.join(filePath, main);
            }
        }
    }


    let parseRs = path.parse(filePath);
    if (!parseRs.ext) {
        if (pathExists.sync(path.join(filePath, 'index.js'))) {
            filePath = path.join(filePath, 'index.js');
        } else {
            filePath = filePath + '.js';
        }
    } else if (parseRs.ext != '.js' && parseRs.ext != '.jsx' && parseRs.ext != '.less' && parseRs.ext != '.css') {
        filePath = filePath + '.js';
    }
    if (!pathExists.sync(filePath)) {
        console.error('not fount' + filePath);
        filePath = null;

    }
    return {filePath: filePath, isNodeModule: isNodeModule}
}


function filterMiniModule(name) {

    var externals = {
        "jquery": "window.jQuery",
        "react": "window.React",
        "react-dom": "window.ReactDOM"
    }
    return externals[name];
}


gulp.task('t', function (cb) {
    const jsLoader = 'babel?cacheDirectory&stage=0';

    var file = path.join(root, 'test.js');
    var distFile = path.join(root, 'test');
    gulp.src(file)
        //.pipe(gbabel({
        //    presets: ['react']
        //}))
        .pipe(webpack(
            {
                module: {
                    loaders: [
                        {test: /\.js/, loader: jsLoader, exclude: /(node_modules\/[^(@myfe)]|min\.js)/}
                    ]
                },
                output: {},
                externals: {
                    "jquery": "jQuery",
                    "react": "React11111",
                    "react-dom": "ReactDOM"
                }
            }
        ))
        .pipe(wrapamd())
        .pipe(rename(path.basename(file)))
        .pipe(gulp.dest(path.join(root, 'amd')));
    //.pipe(gulp.dest(path.dirname(distFile)));
});



gulp.task('tt', function (cb) {
    console.log(require(path.join(root, 'test.js')))
});